"use client";

import React, { useEffect, useState } from "react";
import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table";
import { RefreshCwIcon, UserRoundPlusIcon } from "lucide-react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "ui/table";
import { DataTablePagination } from "ui/table/pagination";
import { DataTableViewOptions } from "ui/table/columnToggle";
import { Button } from "ui/button";
import { ClearFiltersButton } from "ui/table/clearFiltersButton";
import { DebouncedInput } from "ui/table/debouncedInput";
import { Filter } from "ui/table/filter";
import { toast } from "ui/use-toast";
import { TableColumns } from "components/employees/tableColumns";
import useEmployeesSuspenseQuery from "./useEmployeesSuspenseQuery";
import { FakeAny } from "common/types/FakeAny";
import EmployeeForm from "../employeeForm/employeeForm";

export function EmployeesTable<TData, TValue>() {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});

	/*const [pagination, setPagination] = useState({ take: 10, skip: 0 });
    const [filter, setFilter] = useState({});
    const [totalCount, setTotalCount] = useState(0);*/

	const query = useEmployeesSuspenseQuery({
		/*take: pagination.take,
        skip: pagination.skip,
        where: filter,*/
	});

	const employees = (query?.data as FakeAny).employees;
	let data = employees.items;
	const columns = TableColumns as ColumnDef<TData, TValue>[];

	/*useEffect(() => {
        setTotalCount(employees.totalCount);

        const pageInfo = employees.pageInfo;
    }, [employees.pageInfo, employees.totalCount, query]);*/

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			globalFilter,
		},
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		columnResizeMode: "onChange",
	});

	async function handleRefresh() {
		const refetch = await query.refetch();
		const employees = (refetch?.data as FakeAny).employees;

		data = employees.items;

		toast({
			title: "Обновление данных:",
			variant: "success",
			description: (
				<div>
					{"Данные успешно обновлены!"}
				</div>
			)
		});
	}

	return (
		<div className="px-2">
			<div className="relative w-full flex flex-1 items-center justify-between space-x-2 py-3">
				<EmployeeForm
					isReadOnly={false}
					trigger={
						<Button type="button" variant="outline">
							<UserRoundPlusIcon className="w-5 h-5" />
							<div className="ml-2 hidden md:block">Добавить</div>
						</Button>
					}
				/>
				<Button type="button" variant="outline" onClick={handleRefresh}>
					<RefreshCwIcon className="w-5 h-5" />
					<div className="ml-2 hidden md:block">Обновить</div>
				</Button>
				<DebouncedInput
					value={globalFilter ?? ""}
					onChange={(value) => setGlobalFilter(String(value))}
					placeholder="Поиск по всем колонкам..."
				/>
				<div className="flex items-center space-x-2">
					<ClearFiltersButton table={table} />
					<DataTableViewOptions table={table} />
				</div>
			</div>
			<div className="rounded-md border w-full h-fit shadow-2xl dark:shadow-white">
				<Table>
					<TableCaption className="text-left ml-[52rem] font-bold">
						Данные о сотрудниках
					</TableCaption>
					<TableHeader className="justify-center h-20">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											key={header.id}
											colSpan={header.colSpan}
										>
											{header.isPlaceholder ? null : (
												<div
													className="space-y-2"
													onMouseDown={header.getResizeHandler()}
													onTouchStart={header.getResizeHandler()}
												>
													{flexRender(
														header.column.columnDef
															.header,
														header.getContext(),
													)}
													{header.column.getCanFilter() ? (
														<Filter
															column={
																header.column
															}
														/>
													) : null}
													{/*header.column.getIsResizing() ? ( // TODO: не работает измение ширины
                                                        <div
                                                            className="absolute opacity-0 top-0 right-0 h-[100%] w-5
                                                                bg-red-500 cursor-col-resize select-none touch-none
                                                                hover:opacity-100"
                                                        />
                                                    ) : null*/}
												</div>
											)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={
										row.getIsSelected() && "selected"
									}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-left"
								>
									<div className="ml-[50rem] text-2xl">
										Данные отсутствуют.
									</div>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<DataTablePagination table={table} />
		</div>
	);
}
