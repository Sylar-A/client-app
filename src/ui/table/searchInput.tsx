import React from "react";
import { Column } from "@tanstack/react-table";
import { Input } from "ui/input";

interface SearchInputProps<TData, TValue> {
	column: Column<TData, TValue>;
}

export function SearchInput<TData, TValue>({
	column,
}: SearchInputProps<TData, TValue>) {
	return (
		<Input
			placeholder="Поиск"
			value={column.getFilterValue() as string}
			onChange={function (event) {
				column.setFilterValue(event.target.value);
			}}
			className="max-w-40"
		/>
	);
}
