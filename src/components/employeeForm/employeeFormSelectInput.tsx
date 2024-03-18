import * as React from "react";
import { SelectProps } from "@radix-ui/react-select";
import { FormControl } from "ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "ui/select";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

interface EmployeeFormSelectInputProps
	extends ControllerRenderProps<FieldValues, string> {
	allValues: string[];
	disabled: boolean;
}

const EmployeeFormSelectInput = React.forwardRef<
	React.ElementRef<typeof SelectTrigger>,
	EmployeeFormSelectInputProps
>(({ name, allValues, disabled, ...props }, ref) => {
	return (
		<Select
			name={name}
			defaultValue={props.value}
			disabled={disabled}
			onValueChange={props.onChange}
		>
			<FormControl>
				<SelectTrigger ref={ref}>
					<SelectValue defaultValue={props.value} />
				</SelectTrigger>
			</FormControl>
			<SelectContent>
				{allValues.map((value) => (
					<SelectItem key={value} textValue={value} value={value}>
						{value}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
});
EmployeeFormSelectInput.displayName = "EmployeeFormSelectInput";

export default EmployeeFormSelectInput;
