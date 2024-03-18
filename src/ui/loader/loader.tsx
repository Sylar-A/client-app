import { Loader2Icon } from "lucide-react";

export const Loader = () => {
	return (
		<div className="h-full w-full px-4 py-6 lg:px-8 flex justify-center items-center">
			<Loader2Icon
				size={40}
				className="text-muted-foreground animate-spin"
			/>
		</div>
	);
};
