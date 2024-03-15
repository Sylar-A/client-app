"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "ui/dropdown-menu";

interface DataTableViewOptionsProps<TData> {
	table: Table<TData>;
}

export function DataTableViewOptions<TData>({
	table,
}: DataTableViewOptionsProps<TData>) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="default"
					className="ml-auto h-10"
				>
					<MixerHorizontalIcon className="h-5 w-5" />
					<div className="ml-2 hidden md:block">
						Видимость колонок
					</div>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="center"
				className="w-[187px] max-h-96 overflow-auto"
			>
				<DropdownMenuLabel>Видимость колонок</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{table
					.getAllColumns()
					.filter(
						(column) =>
							typeof column.accessorFn !== "undefined" &&
							column.getCanHide(),
					)
					.map((column) => {
						return (
							<DropdownMenuCheckboxItem
								key={column.id}
								checked={column.getIsVisible()}
								onCheckedChange={(value) =>
									column.toggleVisibility(value)
								}
								onSelect={event => event.preventDefault()}
							>
								{column.id}
							</DropdownMenuCheckboxItem>
						);
					})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
