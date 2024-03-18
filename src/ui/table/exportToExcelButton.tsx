import { Table } from "@tanstack/react-table";

interface ExportToExcelButtonProps<TData> {
	data: TData[];
	table: Table<TData>;
}
export function ExportToExcelButton<TData>({
	data,
	table
}: ExportToExcelButtonProps<TData>) {}
