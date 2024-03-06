"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
	FormMessage,
} from "ui/form";

interface AuthorizationFormProps {
	header: string;
}

const formSchema = z.object({
	telegramPrivateChatId: z.string().min(1, {
		message: "ID Телеграм не должен быть пустым!",
	}),
	password: z
		.string()
		.regex(
			new RegExp(
				"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$",
			),
			{
				message:
					"Пароль должен иметь минимум 8 символов, хотя бы 1 букву, заглавную букву, символ и цифру",
			},
		),
});

export default function AuthorizationForm({ header }: AuthorizationFormProps) {
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			telegramPrivateChatId: "",
			password: "",
		},
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		debugger;
		const result = await signIn("credentials", {
			telegramPrivateChatId: data.telegramPrivateChatId,
			password: data.password,
			redirect: false,
		});

		if (result && !result.error) {
			toast({
				title: "Авторизация:",
				variant: "success",
				description: <div>Успешно авторизованы.</div>,
			});

			router.push("/");
		} else {
			toast({
				title: "Внимание!",
				variant: "error",
				description: <div>Указан неверный ID Телеграм или пароль!</div>,
			});
		}
	}

	return (
		<div
			className="w-96 p-4 border border-zinc-200 rounded-2xl space-y-4 mx-auto my-[8%]
            overscroll-y-auto shadow dark:shadow-white"
		>
			<div className="text-center border-b-4 pb-2 mx-4">{header}</div>
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
								<FormDescription>
									{"Забыли пароль или еще не получили? "}
									<a
										target="_blank"
										className="text-blue-600 hover:font-bold cursor-pointer"
										onClick={(event) => {
											event.preventDefault();
											router.push(
												"/api/auth/reset-password",
											);
										}}
									>
										Получить ссылку через бота.
									</a>
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className="mx-[40%]" type="submit">
						Войти
					</Button>
				</form>
			</Form>
		</div>
	);
}
