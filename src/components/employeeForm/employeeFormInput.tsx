import * as React from "react";
import { Input, InputProps } from "ui/input";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "ui/tooltip";

interface EmployeeFormInputProps extends InputProps {
	key: string;
}

const EmployeeFormInput = React.forwardRef<
	HTMLInputElement,
	EmployeeFormInputProps
>(({ key, disabled, ...props }, ref) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Input
						id={key}
						className="text-center"
						disabled={disabled}
						onChange={props.onChange}
						ref={ref}
						{...props}
					/>
				</TooltipTrigger>
				{props.value ? (
					<TooltipContent>
						<p>{props.value}</p>
					</TooltipContent>
				) : (
					<></>
				)}
			</Tooltip>
		</TooltipProvider>
	);
});
EmployeeFormInput.displayName = "EmployeeFormInput";

export default EmployeeFormInput;
