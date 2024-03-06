"use client";

import { ReactNode, useState } from "react";
import moment from "moment";
import { now } from "moment/moment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "ui/accordion";
import { DialogItem, DialogTitle } from "ui/dialog";
import { Button } from "ui/button";
import { Textarea } from "ui/textarea";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "ui/form";
import { toast } from "ui/use-toast";
import EmployeeFormInput from "./employeeFormInput";
import EmployeeFormSelectInput from "./employeeFormSelectInput";
import EmployeeFormDateInput from "./employeeFormDateInput";
import {
	Employee,
	EmployeeConfirmationLevel,
	EmployeePost,
	EmployeeRating,
	EmployeeSourceType,
	RobokassaAccountType,
} from "__generated__/types";
import {
	ConvertFromEmployeeConfirmationLevel,
	ConvertFromEmployeePost,
	ConvertFromEmployeeRating,
	ConvertFromEmployeeSourceType,
	ConvertFromRobokassaAccountType,
	ConvertFromYesNo,
	ConvertToEmployeeConfirmationLevel,
	ConvertToEmployeePost,
	ConvertToEmployeeRating,
	ConvertToEmployeeSourceType,
	ConvertToRobokassaAccountType,
} from "utils/enumConverter";
import {
	GetEmployeeConfirmationLevels,
	GetEmployeeGroupNumbers,
	GetEmployeePosts,
	GetEmployeeRatings,
	GetEmployeeSourceTypes,
	GetRobokassaAccountTypes,
	GetYesNo,
} from "utils/enumKeyValues";
import { useEmployeeMutation } from "./__generated__/CreateEmployeeMutation";
import { YesNo } from "types/types";

interface EmployeeFormProps {
	isReadOnly: boolean;
	employee?: Employee | undefined;
	trigger: ReactNode;
}

const formSchema = z.object({
	city: z
		.string({ required_error: "Город должен быть указан!" })
		.min(1, { message: "Город должен быть указан!" }),
	post: z.string(),
	lastName: z.ostring(),
	firstName: z
		.string({ required_error: "Имя должно быть указано!" })
		.min(1, { message: "Имя должно быть указано!" }),
	patronymic: z.ostring(),
	phoneNumbers: z
		.string({ required_error: "Номер телефона должен быть указан!" })
		.min(1, { message: "Номер телефона должен быть указан!" }),
	internalId: z.ostring(),
	telegramPrivateChatId: z.coerce
		.number({ invalid_type_error: "Необходимо ввести число!" })
		.optional()
		.nullish(),

	joinedDate: z.date().optional().nullish(),
	birthDate: z.date().optional().nullish(),
	age: z.coerce
		.number({ invalid_type_error: "Необходимо ввести число!" })
		.optional()
		.nullish(),
	district: z.ostring(),
	sourceType: z.ostring(),
	personalCar: z.ostring().nullish(),
	yearOfTruckIssue: z.coerce
		.number({ invalid_type_error: "Необходимо ввести число!" })
		.optional()
		.nullish(),
	robokassaAccountType: z.ostring(),

	groupNumber: z.ostring(),
	confidenceLevel: z.ostring(),
	punctualityLevel: z.ostring(),
	workQualityLevel: z.ostring(),
	ratingComment: z.ostring().nullish(),

	active: z.ostring(),
	blocked: z.ostring(),
	privateChatStarted: z.ostring(),
	confirmationLevel: z.ostring(),
	comment: z.ostring().nullish(),

	passportCountry: z.ostring(),
	passportSeries: z.coerce
		.number({ invalid_type_error: "Необходимо ввести число!" })
		.optional(),
	passportNumber: z.coerce
		.number({ invalid_type_error: "Необходимо ввести число!" })
		.optional(),
	passportSource: z.ostring(),
	passportDate: z.date().optional().nullish(),
	passportDivisionCode: z.ostring(),
});

export default function EmployeeForm({
	isReadOnly,
	employee,
	trigger,
}: EmployeeFormProps) {
	const [createEmployeeMutation] = useEmployeeMutation();
	const [open, setOpen] = useState(false);

	if (!employee) {
		employee = {
			id: 0,
			city: { name: "Казань" },
			currentTelegramChatId: 0,
			post: EmployeePost.Loader,
			active: true,
			blocked: false,
			privateChatStarted: false,
			joinedDate: moment(now()).toDate(),
			robokassaAccountType: RobokassaAccountType.None,
			confirmationLevel: EmployeeConfirmationLevel.None,
			ratings: {
				confidenceLevel: EmployeeRating.None,
				punctualityLevel: EmployeeRating.None,
				workQualityLevel: EmployeeRating.None,
			},
		} as Employee;
	}

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			city: employee.city?.name,
			post: ConvertFromEmployeePost(employee.post),
			lastName: employee.lastName ? employee.lastName : undefined,
			firstName: employee.firstName ? employee.firstName : undefined,
			patronymic: employee.patronymic ? employee.patronymic : undefined,
			phoneNumbers: employee.phoneNumbers
				?.map((value) => value.number)
				.join(", "),
			internalId: employee.internalId ? employee.internalId : undefined,
			telegramPrivateChatId: employee.telegramPrivateChatId,

			joinedDate: employee.joinedDate
				? moment(employee.joinedDate).toDate()
				: undefined,
			birthDate: employee.birthDate
				? moment(employee.birthDate).toDate()
				: undefined,
			age: employee.age as number | undefined,
			district: employee.district ? employee.district : undefined,
			sourceType: ConvertFromEmployeeSourceType(
				employee.sourceType || EmployeeSourceType.None,
			),
			personalCar: ConvertFromYesNo(
				employee.personalCar ? YesNo.Yes : YesNo.No,
			),
			yearOfTruckIssue: employee.yearOfTruckIssue as number | undefined,
			robokassaAccountType: ConvertFromRobokassaAccountType(
				employee.robokassaAccountType || RobokassaAccountType.None,
			),

			groupNumber: ConvertFromEmployeeRating(
				employee.groupNumber || EmployeeRating.None,
			),
			confidenceLevel: ConvertFromEmployeeRating(
				employee.ratings?.confidenceLevel || EmployeeRating.None,
			),
			punctualityLevel: ConvertFromEmployeeRating(
				employee.ratings?.punctualityLevel || EmployeeRating.None,
			),
			workQualityLevel: ConvertFromEmployeeRating(
				employee.ratings?.workQualityLevel || EmployeeRating.None,
			),
			ratingComment: employee.ratingComment as string | undefined,

			active: ConvertFromYesNo(employee.active ? YesNo.Yes : YesNo.No),
			blocked: ConvertFromYesNo(employee.blocked ? YesNo.Yes : YesNo.No),
			privateChatStarted: ConvertFromYesNo(
				employee.privateChatStarted ? YesNo.Yes : YesNo.No,
			),
			confirmationLevel: ConvertFromEmployeeConfirmationLevel(
				employee.confirmationLevel || EmployeeConfirmationLevel.None,
			),
			comment: employee.comment as string | undefined,

			passportCountry: employee.passport?.country,
			passportSeries: employee.passport?.series
				? Number(employee.passport?.series)
				: undefined,
			passportNumber: employee.passport?.number
				? Number(employee.passport?.number)
				: undefined,
			passportSource: employee.passport?.source,
			passportDate: employee.passport?.date
				? moment(employee.passport.date).toDate()
				: undefined,
			passportDivisionCode: employee.passport?.divisionCode,
		},
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		await createEmployeeMutation({
			variables: {
				createEmployeeInput: {
					id: employee?.id,
					city: {
						name: data.city,
					},
					post: ConvertToEmployeePost(data.post),
					active: data.active === ConvertFromYesNo(YesNo.Yes),
					blocked: data.blocked === ConvertFromYesNo(YesNo.Yes),
					telegramPrivateChatId: data.telegramPrivateChatId,
					firstName: data.firstName,
					lastName: data.lastName,
					patronymic: data.patronymic,
					age: data.age,
					internalId: data.internalId,
					comment: data.comment,
					ratingComment: data.ratingComment,
					ratings: {
						confidenceLevel: data.confidenceLevel
							? ConvertToEmployeeRating(data.confidenceLevel)
							: EmployeeRating.None,
						punctualityLevel: data.punctualityLevel
							? ConvertToEmployeeRating(data.punctualityLevel)
							: EmployeeRating.None,
						workQualityLevel: data.workQualityLevel
							? ConvertToEmployeeRating(data.workQualityLevel)
							: EmployeeRating.None,
					},
					groupNumber: data.groupNumber
						? ConvertToEmployeeRating(data.groupNumber)
						: EmployeeRating.None,
					confirmationLevel: data.confirmationLevel
						? ConvertToEmployeeConfirmationLevel(
								data.confirmationLevel,
							)
						: EmployeeConfirmationLevel.None,
					phoneNumbers: [
						{
							number: data.phoneNumbers,
						},
					],
					sourceType: data.sourceType
						? ConvertToEmployeeSourceType(data.sourceType)
						: EmployeeSourceType.None,
					personalCar:
						data.personalCar === ConvertFromYesNo(YesNo.Yes),
					yearOfTruckIssue: data.yearOfTruckIssue,
					passport:
						!data.passportCountry &&
						!data.passportSeries &&
						!data.passportNumber &&
						!data.passportDate &&
						!data.passportSource &&
						!data.passportDivisionCode
							? null
							: {
									country: data.passportCountry,
									series: data.passportSeries,
									number: data.passportNumber,
									date: data.passportDate,
									source: data.passportSource,
									divisionCode: data.passportDivisionCode,
								},
					robokassaAccountType: data.robokassaAccountType
						? ConvertToRobokassaAccountType(
								data.robokassaAccountType,
							)
						: RobokassaAccountType.None,
					joinedDate: data.joinedDate,
					birthDate: data.birthDate,
					district: data.district,
				},
			},
			onCompleted: (response) => {
				if (response.createOrUpdateEmployee.errorMessage) {
					toast({
						title: "Внимание!",
						variant: "error",
						description: (
							<div>
								{response.createOrUpdateEmployee.errorMessage}
							</div>
						),
					});
				} else {
					form.reset();

					const isNewEmployee = !employee?.id;

					toast({
						title: isNewEmployee
							? "Добавление сотрудника:"
							: "Изменение сотрудника:",
						variant: "success",
						description: (
							<div>
								{isNewEmployee
									? "Сотрудник успешно добавлен!"
									: "Данные по сотруднику успешно изменены!"}
							</div>
						),
					});
				}
			},
			onError: (response) => {
				toast({
					title: "Внимание!",
					variant: "error",
					description: <div>{response.message}</div>,
				});
			},
		});
	}

	return (
		<DialogItem trigger={trigger}>
			<DialogTitle className="text-center border-b pb-4 font-bold dark:border-white">
				Данные о сотруднике
			</DialogTitle>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="pr-2 wsm:max-h-[25rem] sm:max-h-[30rem] lg:max-h-[38rem] xl:max-h-[45rem] overflow-y-auto"
				>
					<Accordion
						className="grid grid-cols-5 gap-3 wsm:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3
                                    xl:grid-cols-3 2xl:grid-cols-5"
						type="multiple"
						defaultValue={[
							"item-1",
							"item-2",
							"item-3",
							"item-4",
							"item-5",
						]}
					>
						<AccordionItem value="item-1">
							<AccordionTrigger className="-mb-2 -mt-4">
								Основные сведения:
							</AccordionTrigger>
							<AccordionContent className="-mb-4">
								<FormField
									control={form.control}
									name="city"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>Город:</FormLabel>
											<FormControl>
												<EmployeeFormInput
													key="city"
													disabled={isReadOnly}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="post"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>Должность:</FormLabel>
											<EmployeeFormSelectInput
												allValues={GetEmployeePosts()}
												disabled={isReadOnly}
												{...field}
											/>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="lastName"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>Фамилия:</FormLabel>
											<FormControl>
												<EmployeeFormInput
													key="lastName"
													disabled={isReadOnly}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="firstName"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>Имя:</FormLabel>
											<FormControl>
												<EmployeeFormInput
													key="firstName"
													disabled={isReadOnly}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="patronymic"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>Отчество:</FormLabel>
											<FormControl>
												<EmployeeFormInput
													key="patronymic"
													disabled={isReadOnly}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="phoneNumbers"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>
												Номер телефона:
											</FormLabel>
											<FormControl>
												<EmployeeFormInput
													key="phoneNumbers"
													disabled={isReadOnly}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="internalId"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>
												Внутренний ID:
											</FormLabel>
											<FormControl>
												<EmployeeFormInput
													key="internalId"
													disabled={isReadOnly}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="telegramPrivateChatId"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>ID Телеграм:</FormLabel>
											<FormControl>
												<EmployeeFormInput
													key="telegramPrivateChatId"
													disabled={isReadOnly}
													{...field}
													value={
														field.value as
															| number
															| undefined
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2">
							<AccordionTrigger className="-mb-2 -mt-4">
								Дополнительные сведения:
							</AccordionTrigger>
							<AccordionContent className="-mb-4">
								<FormField
									control={form.control}
									name="joinedDate"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>
												Дата добавления:
											</FormLabel>
											<EmployeeFormDateInput
												disabled={isReadOnly}
												{...field}
											/>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="birthDate"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>
												Дата рождения:
											</FormLabel>
											<FormControl>
												<EmployeeFormDateInput
													disabled={isReadOnly}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="age"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>Возраст:</FormLabel>
											<FormControl>
												<EmployeeFormInput
													key="age"
													disabled={isReadOnly}
													{...field}
													value={
														field.value as
															| number
															| undefined
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="district"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>
												Район проживания:
											</FormLabel>
											<FormControl>
												<EmployeeFormInput
													key="district"
													disabled={isReadOnly}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="sourceType"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>
												Способ привлечения:
											</FormLabel>
											<EmployeeFormSelectInput
												allValues={GetEmployeeSourceTypes()}
												disabled={isReadOnly}
												{...field}
											/>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="personalCar"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>
												Наличие личного авто:
											</FormLabel>
											<EmployeeFormSelectInput
												allValues={GetYesNo()}
												disabled={isReadOnly}
												{...field}
											/>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="yearOfTruckIssue"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>
												Год выпуска авто:
											</FormLabel>
											<FormControl>
												<EmployeeFormInput
													key="yearOfTruckIssue"
													disabled={isReadOnly}
													{...field}
													value={
														field.value as
															| number
															| undefined
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="robokassaAccountType"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>
												Аккаунт робокассы:
											</FormLabel>
											<EmployeeFormSelectInput
												allValues={GetRobokassaAccountTypes()}
												disabled={isReadOnly}
												{...field}
											/>
											<FormMessage />
										</FormItem>
									)}
								/>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-3">
							<AccordionTrigger className="-mb-2 -mt-4">
								Рейтинг:
							</AccordionTrigger>
							<AccordionContent className="-mb-4">
								<FormField
									control={form.control}
									name="groupNumber"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>
												Группа (Рейтинг):
											</FormLabel>
											<EmployeeFormSelectInput
												allValues={GetEmployeeGroupNumbers()}
												disabled={isReadOnly}
												{...field}
											/>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="confidenceLevel"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>Доверие:</FormLabel>
											<EmployeeFormSelectInput
												allValues={GetEmployeeRatings()}
												disabled={isReadOnly}
												{...field}
											/>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="punctualityLevel"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>
												Пунктуальность:
											</FormLabel>
											<EmployeeFormSelectInput
												allValues={GetEmployeeRatings()}
												disabled={isReadOnly}
												{...field}
											/>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="workQualityLevel"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>
												Качество работ:
											</FormLabel>
											<EmployeeFormSelectInput
												allValues={GetEmployeeRatings()}
												disabled={isReadOnly}
												{...field}
											/>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="ratingComment"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>
												Комментарий к рейтингу:
											</FormLabel>
											<FormControl>
												<Textarea
													className="h-64"
													key="ratingComment"
													defaultValue={
														employee?.ratingComment ||
														""
													}
													disabled={isReadOnly}
													{...field}
													value={
														field.value as
															| string
															| undefined
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-4">
							<AccordionTrigger className="-mb-2 -mt-4">
								Статусы:
							</AccordionTrigger>
							<AccordionContent className="-mb-4">
								<FormField
									control={form.control}
									name="active"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>Активен:</FormLabel>
											<EmployeeFormSelectInput
												allValues={GetYesNo()}
												disabled={isReadOnly}
												{...field}
											/>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="blocked"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>Заблокирован:</FormLabel>
											<EmployeeFormSelectInput
												allValues={GetYesNo()}
												disabled={isReadOnly}
												{...field}
											/>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="privateChatStarted"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>
												Начал чат с ботом:
											</FormLabel>
											<FormControl>
												<EmployeeFormInput
													key="privateChatStarted"
													disabled={true}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="confirmationLevel"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>
												Уровень подтверждения:
											</FormLabel>
											<EmployeeFormSelectInput
												allValues={GetEmployeeConfirmationLevels()}
												disabled={isReadOnly}
												{...field}
											/>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="comment"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>Комментарий:</FormLabel>
											<FormControl>
												<Textarea
													className="h-64"
													key="comment"
													defaultValue={
														employee?.comment || ""
													}
													disabled={isReadOnly}
													{...field}
													value={
														field.value as
															| string
															| undefined
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-5">
							<AccordionTrigger className="-mb-2 -mt-4">
								Паспортные данные:
							</AccordionTrigger>
							<AccordionContent className="-mb-4">
								<FormField
									control={form.control}
									name="passportCountry"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>Паспорт:</FormLabel>
											<FormControl>
												<EmployeeFormInput
													key="passportCountry"
													disabled={isReadOnly}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="passportSeries"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>
												Серия паспорта:
											</FormLabel>
											<FormControl>
												<EmployeeFormInput
													key="passportSeries"
													disabled={isReadOnly}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="passportNumber"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>
												Номер паспорта:
											</FormLabel>
											<FormControl>
												<EmployeeFormInput
													key="passportNumber"
													disabled={isReadOnly}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="passportSource"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>Кем выдан:</FormLabel>
											<FormControl>
												<EmployeeFormInput
													key="passportSource"
													disabled={isReadOnly}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="passportDate"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>Дата выдачи:</FormLabel>
											<FormControl>
												<EmployeeFormDateInput
													disabled={isReadOnly}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="passportDivisionCode"
									render={({ field }) => (
										<FormItem className="pb-2 px-1">
											<FormLabel>
												Код подразделения:
											</FormLabel>
											<FormControl>
												<EmployeeFormInput
													key="passportDivisionCode"
													disabled={isReadOnly}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
					<div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
						<Button
							className="w-fit mt-2"
							type="submit"
							disabled={isReadOnly}
						>
							Сохранить изменения
						</Button>
					</div>
				</form>
			</Form>
		</DialogItem>
	);
}
