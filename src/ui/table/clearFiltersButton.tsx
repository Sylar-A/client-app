"use client";

import { Table } from "@tanstack/react-table";
import { Button } from "ui/button";
import { ClearOutlined } from "@ant-design/icons";

interface DataTableViewOptionsProps<TData> {
	table: Table<TData>;
}

export function ClearFiltersButton<TData>({
	table
}: DataTableViewOptionsProps<TData>) {
	return (
		<Button
			variant="outline"
			size="default"
			className="ml-auto"
			onClick={() => {
				table.getAllColumns().forEach((column) => {
					column.setFilterValue(null);
				});

				table.setGlobalFilter(null);
			}}
		>
			<ClearOutlined style={{ fontSize: "16px" }} />
			<div className="ml-2 hidden md:block">Очистить все фильтры</div>
		</Button>
	);
}
