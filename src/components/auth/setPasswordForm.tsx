"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import bcrypt from "bcryptjs";
import axiosClient from "../../axios/axiosClient";
import { z } from "zod";
import { Button } from "ui/button";
import { Input } from "ui/input";
import { toast } from "ui/use-toast";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "ui/form";

const formSchema = z
	.object({
		password: z
			.string()
			.regex(
				new RegExp(
					"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
				),
				{
					message:
						"Пароль должен иметь минимум 8 символов, хотя бы 1 букву, заглавную букву, символ и цифру"
				}
			),
		confirmPassword: z
			.string()
			.regex(
				new RegExp(
					"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
				),
				{
					message:
						"Пароль должен иметь минимум 8 символов, хотя бы 1 букву, заглавную букву, символ и цифру"
				}
			)
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Пароли не совпадают",
		path: ["confirmPassword"]
	});

interface SetPasswordFormProps {
	token: string;
	telegramPrivateChatId: number;
}

export default function SetPasswordForm({
	token,
	telegramPrivateChatId
}: SetPasswordFormProps) {
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			password: "",
			confirmPassword: ""
		}
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		debugger;
		const hashedPassword = await bcrypt.hash(data.password, 10);

		axiosClient
			.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/Login/SetPassword`, {
				params: {
					telegramPrivateChatId: Number(telegramPrivateChatId),
					password: hashedPassword,
					token: token
				},
				withCredentials: false
			})
			.then(() => {
				toast({
					title: "Пароль успешно обновлен!",
					variant: "success",
					description: (
						<div>
							Вы будете перенаправлены на страницу авторизации.
						</div>
					)
				});

				setTimeout(() => {
					router.push("/api/auth/signin");
				}, 3000);
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
	}

	return (
		<div className="w-96 p-4 border border-zinc-200 rounded-2xl space-y-4 mx-auto my-[8%] overscroll-y-auto">
			<div className="text-center border-b-4 pb-2 mx-4">
				Введите новый пароль:
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Пароль</FormLabel>
								<FormControl>
									<Input
										placeholder="Введите пароль..."
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Пароль</FormLabel>
								<FormControl>
									<Input
										placeholder="Повторите пароль..."
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className="mx-[28%]" type="submit">
						Сохранить пароль
					</Button>
				</form>
			</Form>
		</div>
	);
}
