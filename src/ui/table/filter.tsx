import { Column } from "@tanstack/react-table";
import { Input } from "../input";

export function Filter({ column }: { column: Column<any, unknown> }) {
	return (
		<div className="flex justify-center">
			<Input
				value={(column.getFilterValue() ?? "") as string | number}
				onChange={(event) => {
					column.setFilterValue(event.target.value);
				}}
				className="bg-search dark:bg-white-search focus:bg-none bg-no-repeat bg-center h-6"
			/>
		</div>
	);
}
