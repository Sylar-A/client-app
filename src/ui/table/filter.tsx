import { Column } from "@tanstack/react-table";
import { DebouncedInput } from "./debouncedInput";

export function Filter({ column }: { column: Column<any, unknown> }) {
	return (
		<div className="flex justify-center">
			<DebouncedInput
				type="text"
				value={(column.getFilterValue() ?? "") as string | number}
				onChange={(value) => column.setFilterValue(value)}
				placeholder="Поиск..."
				className="w-fit -mx-3.5 -mb-1.5"
			/>
		</div>
	);
}
