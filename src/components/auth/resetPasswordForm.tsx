"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getCsrfToken } from "next-auth/react";
import { z } from "zod";
import axiosClient from "../../axios/axiosClient";
import { Button } from "ui/button";
import { Input } from "ui/input";
import { toast } from "ui/use-toast";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "ui/form";
import { useEffect, useState } from "react";
import { Employee, EmployeePost } from "__generated__/types";
import useEmployeesSuspenseQuery from "../employees/useEmployeesSuspenseQuery";
import { FakeAny } from "common/types/FakeAny";

const formSchema = z.object({
	telegramPrivateChatId: z.string().min(1, {
		message: "ID Телеграм не должен быть пустым!"
	})
});

export default function ResetPasswordForm() {
	const [telegramPrivateChatId, setTelegramPrivateChatId] = useState(0);
	const [employee, setEmployee] = useState<Employee>();

	const query = useEmployeesSuspenseQuery({
		where: {
			telegramPrivateChatId: { eq: Number(telegramPrivateChatId) }
		}
	});

	useEffect(() => {
		if (!telegramPrivateChatId) {
			return;
		}

		const data = query?.data as FakeAny;

		if (data) {
			const employee = data.employees?.items[0];

			if (employee) {
				setEmployee(employee);
			} else {
				toast({
					title: "Ошибка!",
					variant: "error",
					description: (
						<div>
							Пользователь с указанным ID Телеграм не найден!
						</div>
					)
				});
			}
		}
	}, [query?.data, telegramPrivateChatId]);

	useEffect(() => {
		if (!employee) {
			return;
		}

		let errorMessages = [];

		if (!employee.privateChatStarted) {
			errorMessages.push("Пользователь не начал чат с ботом!");
		}

		if (employee.blocked) {
			errorMessages.push("Пользователь заблокирован!");
		}

		if (!employee.active) {
			errorMessages.push("Пользователь не активен!");
		}

		if (
			employee.post !== EmployeePost.Head
			&& employee.post !== EmployeePost.Operator
			&& employee.post !== EmployeePost.Administrator
			&& employee.post !== EmployeePost.HrManager
		) {
			errorMessages.push("Пользователь не имеет прав для сброса пароля!");
		}

		if (errorMessages.length > 0) {
			toast({
				title: "Ошибка!",
				variant: "error",
				description: <div>{errorMessages}</div>
			});
		} else {
			getCsrfToken().then((token) => {
				axiosClient
					.get(
						`${process.env.NEXT_PUBLIC_SERVER_URL}/Login/ResetPassword`,
						{
							params: {
								telegramPrivateChatId: Number(
									telegramPrivateChatId
								),
								link: `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/auth/set-password/`,
								token: token
							},
							withCredentials: false
						}
					)
					.then(() => {
						toast({
							title: "Запрос успешно отправлен!",
							variant: "success",
							description: (
								<div>
									Перейдите в чат с ботом для дальнейших
									действий.
								</div>
							)
						});
					})
					.catch((response) => {
						toast({
							title: "Ошибка!",
							variant: "error",
							description: (
								<div>
									{response.response
										? response.response.data.detail
										: response.message}
								</div>
							)
						});
					});
			});
		}
	}, [employee, telegramPrivateChatId]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			telegramPrivateChatId: ""
		}
	});

	function onSubmit(data: z.infer<typeof formSchema>) {
		setTelegramPrivateChatId(Number(data.telegramPrivateChatId));
	}

	return (
		<div className="w-96 p-4 border border-zinc-200 rounded-2xl space-y-4 mx-auto my-[10%]">
			<div className="text-center border-b-4 pb-2 mx-4">
				Введите ID Телеграм для того, чтобы бот прислал ссылку для
				изменения пароля:
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<FormField
						control={form.control}
						name="telegramPrivateChatId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ID Телеграм</FormLabel>
								<FormControl>
									<Input
										placeholder="Введите ID Телеграм..."
										{...field}
									/>
								</FormControl>
								<FormDescription>
									{"ID Телеграм можно получить через "}
									<a
										target="_blank"
										className="text-blue-600 hover:font-bold"
										href="https://t.me/TruckingSystemBot"
									>
										Телеграм бота.
									</a>
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className="mx-[35%]" type="submit">
						Отправить
					</Button>
				</form>
			</Form>
		</div>
	);
}
