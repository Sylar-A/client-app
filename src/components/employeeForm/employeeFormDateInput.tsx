import * as React from "react";
import moment from "moment";
import { CalendarOutlined } from "@ant-design/icons";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { ru } from "date-fns/locale";
import { Button } from "ui/button";
import { Calendar } from "ui/calendar";
import { SelectTrigger } from "ui/select";
import { FormControl } from "ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "ui/popover";

interface EmployeeFormDateInputProps
	extends ControllerRenderProps<FieldValues, string> {
	disabled: boolean;
}

const EmployeeFormDateInput = React.forwardRef<
	React.ElementRef<typeof SelectTrigger>,
	EmployeeFormDateInputProps
>(({ disabled, ...props }, ref) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<FormControl>
					<Button
						variant="ghost"
						className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm
                            ring-offset-white focus-visible:outline-none focus-visible:ring-2
                            focus-visible:ring-offset-2 disabled:opacity-50
                            dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300"
						disabled={disabled}
					>
						<span>
							{!props.value
								? ""
								: moment(props.value).format("DD.MM.YYYY")}
						</span>
						<CalendarOutlined className="ml-2 h-4 w-4 disabled:opacity-50" />
					</Button>
				</FormControl>
			</PopoverTrigger>
			<PopoverContent align="center">
				<Calendar
					selected={props.value}
					onDayClick={props.onChange}
					disabled={disabled}
					locale={ru}
				/>
			</PopoverContent>
		</Popover>
	);
});
EmployeeFormDateInput.displayName = "EmployeeFormDateInput";

export default EmployeeFormDateInput;
