import React, { useEffect } from "react";
import { Input } from "ui/input";

export function DebouncedInput({
	value: initialValue,
	onChange,
	debounce = 0,
	...props
}: {
	value: string | number;
	onChange: (value: string | number) => void;
	debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
	const [value, setValue] = React.useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value);
		}, debounce);

		return () => clearTimeout(timeout);
	}, [debounce, onChange, value]);

	return (
		<Input
			{...props}
			value={value}
			onChange={(event) => setValue(event.target.value)}
		/>
	);
}
