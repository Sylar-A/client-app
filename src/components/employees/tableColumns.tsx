import React from "react";
import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "ui/button";
import { Checkbox } from "ui/checkbox";
import { DataTableColumnHeader } from "ui/table/columnHeader";
import {
	ConvertFromEmployeeConfirmationLevel,
	ConvertFromEmployeePost,
	ConvertFromEmployeeRating,
	ConvertFromEmployeeSourceType,
} from "utils/enumConverter";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "ui/dropdown-menu";
import EmployeeForm from "../employeeForm/employeeForm";

import { Employee } from "__generated__/types";

export const TableColumns: ColumnDef<Employee>[] = [
	{
		id: "Выбор",
		enableColumnFilter: false,
		enableGlobalFilter: false,
		enableSorting: false,
		size: 10,
		header: ({ table }) => (
			<Checkbox
				className="mx-2"
				checked={
					table.getIsAllPageRowsSelected()
					|| (table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) =>
					table.toggleAllPageRowsSelected(!!value)
				}
				aria-label="Select all"
				title="Выделить все"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				className="mr-2"
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				title="Выделить"
			/>
		),
	},
	{
		id: "Действия",
		enableColumnFilter: false,
		enableGlobalFilter: false,
		enableSorting: false,
		size: 10,
		header: () => (
			<Button variant="ghost" className="shadow-none p-1 h-[5rem]">
				Действия
			</Button>
		),
		cell: ({ row }) => {
			const employee = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuGroup>
							<DropdownMenuLabel>Действия</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() =>
									navigator.clipboard.writeText(
										employee.internalId || "",
									)
								}
							>
								Скопировать внутренний ID
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<EmployeeForm
								isReadOnly={true}
								employee={employee}
								trigger={
									<DropdownMenuItem
										onSelect={(event) => {
											event.preventDefault();
										}}
									>
										Просмотр
									</DropdownMenuItem>
								}
							/>
							<EmployeeForm
								isReadOnly={false}
								employee={employee}
								trigger={
									<DropdownMenuItem
										onSelect={(event) => {
											event.preventDefault();
										}}
									>
										Редактировать
									</DropdownMenuItem>
								}
							/>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
	{
		id: "Город",
		accessorFn: (row) => row.city && row.city.name,
		cell: info => info.getValue(),
		size: 75,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Город"
			/>
		),
	},
	{
		id: "Должность",
		accessorFn: (row) => ConvertFromEmployeePost(row.post),
		cell: info => info.getValue(),
		size: 110,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Должность"
			/>
		),
	},
	{
		id: "Дата добавления",
		accessorFn: (row) =>
			row.joinedDate && moment(row.joinedDate).format("DD.MM.YYYY"),
		cell: info => info.getValue(),
		size: 130,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Дата добавления"
			/>
		),
	},
	{
		id: "ID Телеграм",
		accessorFn: (row) =>
			row.telegramPrivateChatId && row.telegramPrivateChatId.toString(),
		cell: info => info.getValue(),
		size: 100,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="ID Телеграм"
			/>
		),
	},
	{
		id: "Внутренний ID",
		accessorKey: "internalId",
		cell: info => info.getValue(),
		size: 110,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Внутренний ID"
			/>
		),
	},
	{
		id: "Группа (Рейтинг)",
		accessorFn: (row) =>
			row.groupNumber && ConvertFromEmployeeRating(row.groupNumber),
		cell: info => info.getValue(),
		size: 100,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Группа (Рейтинг)"
			/>
		),
	},
	{
		id: "Личный рейтинг",
		accessorFn: (row) =>
			row.ratings &&
			`${ConvertFromEmployeeRating(row.ratings.confidenceLevel)}
			/${ConvertFromEmployeeRating(row.ratings.punctualityLevel)}
			/${ConvertFromEmployeeRating(row.ratings.workQualityLevel)}`,
		cell: info => info.getValue(),
		size: 100,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Личный рейтинг"
			/>
		),
	},
	{
		id: "Фамилия",
		accessorKey: "lastName",
		cell: info => info.getValue(),
		size: 100,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Фамилия"
			/>
		),
	},
	{
		id: "Имя",
		accessorKey: "firstName",
		cell: info => info.getValue(),
		size: 80,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Имя"
			/>
		),
	},
	{
		id: "Отчество",
		accessorKey: "patronymic",
		cell: info => info.getValue(),
		size: 100,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Отчество"
			/>
		),
	},
	{
		id: "Номер телефона",
		accessorFn: (row) =>
			row.phoneNumbers &&
			row.phoneNumbers.map((value) => value.number).join(", "),
		cell: info => info.getValue(),
		size: 100,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Номер телефона"
			/>
		),
	},
	{
		id: "Активен",
		accessorFn: (row) => (row.active ? "Да" : "Нет"),
		cell: info => info.getValue(),
		size: 100,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Активен"
			/>
		),
	},
	{
		id: "Заблокирован",
		accessorFn: (row) => (row.blocked ? "Да" : "Нет"),
		cell: info => info.getValue(),
		size: 130,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Заблокирован"
			/>
		),
	},
	{
		id: "Начал чат с ботом",
		accessorFn: (row) => (row.privateChatStarted ? "Да" : "Нет"),
		cell: info => info.getValue(),
		size: 130,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Начал чат с ботом"
			/>
		),
	},
	{
		id: "Уровень подтверждения",
		accessorFn: (row) =>
			ConvertFromEmployeeConfirmationLevel(row.confirmationLevel),
		cell: info => info.getValue(),
		size: 150,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Уровень подтверждения"
			/>
		),
	},
	{
		id: "Комментарий к личному рейтингу",
		accessorKey: "ratingComment",
		cell: info => info.getValue(),
		size: 400,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Комментарий к личному рейтингу"
			/>
		),
	},
	{
		id: "Комментарий",
		accessorKey: "comment",
		cell: info => info.getValue(),
		size: 400,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Комментарий"
			/>
		),
	},
	{
		id: "Район проживания",
		accessorKey: "district",
		cell: info => info.getValue(),
		size: 120,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Район проживания"
			/>
		),
	},
	{
		id: "Возраст",
		accessorKey: "age",
		cell: info => info.getValue(),
		size: 100,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Возраст"
			/>
		),
	},
	{
		id: "Дата рождения",
		accessorFn: (row) =>
			row.birthDate && moment(row.birthDate).format("DD.MM.YYYY"),
		cell: info => info.getValue(),
		size: 120,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Дата рождения"
			/>
		),
	},
	{
		id: "Способ привлечения",
		accessorFn: (row) =>
			row.sourceType && ConvertFromEmployeeSourceType(row.sourceType),
		cell: info => info.getValue(),
		size: 120,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Способ привлечения"
			/>
		),
	},
	{
		id: "Наличие личного авто",
		accessorFn: (row) => (row.personalCar ? "Да" : "Нет"),
		cell: info => info.getValue(),
		size: 150,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Наличие личного авто"
			/>
		),
	},
	{
		id: "Год выпуска авто",
		accessorKey: "yearOfTruckIssue",
		cell: info => info.getValue(),
		size: 140,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Год выпуска авто"
			/>
		),
	},
	{
		id: "Паспорт",
		accessorFn: (row) => (row.passport && row.passport.country),
		cell: info => info.getValue(),
		size: 100,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Паспорт"
			/>
		),
	},
	{
		id: "Серия паспорта",
		accessorFn: (row) =>
			row.passport && row.passport.series && row.passport.series.toString(),
		cell: info => info.getValue(),
		size: 120,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Серия паспорта"
			/>
		),
	},
	{
		id: "Номер паспорта",
		accessorFn: (row) =>
			row.passport && row.passport.number && row.passport.number.toString(),
		cell: info => info.getValue(),
		size: 120,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Номер паспорта"
			/>
		),
	},
	{
		id: "Кем выдан",
		accessorFn: (row) => row.passport && row.passport.source,
		cell: info => info.getValue(),
		size: 400,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Кем выдан"
			/>
		),
	},
	{
		id: "Дата выдачи",
		accessorFn: (row) =>
			row.passport && moment(row.passport.date).format("DD.MM.YYYY"),
		cell: info => info.getValue(),
		size: 150,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Дата выдачи"
			/>
		),
	},
	{
		id: "Код подразделения",
		accessorFn: (row) => row.passport && row.passport.divisionCode,
		cell: info => info.getValue(),
		size: 150,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Код подразделения"
			/>
		),
	},
];
