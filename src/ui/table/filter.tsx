import { Column } from "@tanstack/react-table";
import { DebouncedInput } from "./debouncedInput";

export function Filter({ column }: { column: Column<any, unknown> }) {
	return (
		<div className="flex justify-center">
			<DebouncedInput
				type="text"
				value={(column.getFilterValue() ?? "") as string | number}
				onChange={(value) => column.setFilterValue(value)}
				className="bg-search dark:bg-white-search focus:bg-none bg-no-repeat bg-center h-6"
			/>
		</div>
	);
}
