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
	VisibilityState
} from "@tanstack/react-table";
import { RefreshCwIcon, UserRoundPlusIcon } from "lucide-react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "ui/table";
import { DataTablePagination } from "ui/table/pagination";
import { DataTableViewOptions } from "ui/table/columnToggle";
import { Button } from "ui/button";
import { ClearFiltersButton } from "ui/table/clearFiltersButton";
import { DebouncedInput } from "ui/table/debouncedInput";
import { Filter } from "ui/table/filter";
import { toast } from "ui/use-toast";
import TableColumns from "components/employees/tableColumns";
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
	const columns = TableColumns({ onAfterSubmit: handleRefresh }) as ColumnDef<
		TData,
		TValue
	>[];

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
			globalFilter
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
		defaultColumn: {
			enableResizing: true
		}
	});

	async function handleRefresh() {
		const refetch = await query.refetch();
		const employees = (refetch?.data as FakeAny).employees;

		data = employees.items;

		toast({
			title: "Обновление данных:",
			variant: "success",
			description: <div>{"Данные успешно обновлены!"}</div>
		});
	}

	return (
		<div className="px-2">
			<div className="relative w-full flex flex-1 items-center justify-between space-x-2 py-2">
				<EmployeeForm
					isReadOnly={false}
					onAfterSubmit={handleRefresh}
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
			<Table
				{...{
					style: {
						width: table.getCenterTotalSize()
					}
				}}
			>
				<TableCaption>Данные о сотрудниках</TableCaption>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead
									key={header.id}
									colSpan={header.colSpan}
								>
									<div className="flex flex-col justify-between">
										{flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
										{header.column.getCanFilter() ? (
											<Filter column={header.column} />
										) : null}
										{
											<div
												{...{
													onDoubleClick: () =>
														header.column.resetSize(),
													onMouseDown:
														header.getResizeHandler(),
													onTouchStart:
														header.getResizeHandler(),
													className: `absolute top-0 right-0 h-[100%] w-1 cursor-col-resize 
												select-none touch-none ${table.options.columnResizeDirection}`,
													style: {
														transform:
															header.column.getIsResizing()
																? `translateX(${table.getState().columnSizingInfo.deltaOffset}px)`
																: ""
													}
												}}
											/>
										}
									</div>
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										key={cell.id}
										style={{ width: cell.column.getSize() }}
									>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
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
			<DataTablePagination table={table} />
		</div>
	);
}
