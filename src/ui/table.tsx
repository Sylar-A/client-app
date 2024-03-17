import * as React from "react";

import { cn } from "utils/tailwindUtils";
import { FilterFn, RowData } from "@tanstack/table-core";

import {
	RankingInfo,
	rankItem,
	compareItems,
} from "@tanstack/match-sorter-utils";

declare module "@tanstack/table-core" {
	interface Column<TData extends RowData> {
		headerText: string;
	}
}
/*
declare module '@tanstack/table-core' {
    interface FilterFns {
        fuzzy: FilterFn<unknown>
    }
    interface FilterMeta {
        itemRank: RankingInfo
    }
}*/

const Table = React.forwardRef<
	HTMLTableElement,
	React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
	<div className="overflow-auto scrollbar">
		<table
			ref={ref}
			className={cn("caption-top text-sm border", className)}
			{...props}
		/>
	</div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<tbody
		ref={ref}
		className={cn("[&_tr:last-child]:border-0", className)}
		{...props}
	/>
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<tfoot
		ref={ref}
		className={cn(
			"border-t bg-zinc-100/50 font-medium [&>tr]:last:border-b-0 dark:bg-zinc-800/50",
			className,
		)}
		{...props}
	/>
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
	HTMLTableRowElement,
	React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
	<tr
		className={cn(
			"border transition-colors hover:bg-zinc-100 " +
				"data-[state=selected]:bg-zinc-100 dark:hover:bg-zinc-800 dark:data-[state=selected]:bg-zinc-800",
			className,
		)}
		{...props}
	/>
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
	HTMLTableCellElement,
	React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
	<th
		ref={ref}
		className={cn(
			"relative border-2 text-center align-middle font-medium text-zinc-500 bg-zinc-100 dark:bg-black " +
				"[&:has([role=checkbox])]:pr-0 dark:text-zinc-400 dark:border dark:border-zinc-500",
			className,
		)}
		{...props}
	/>
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
	HTMLTableCellElement,
	React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
	<td
		ref={ref}
		className={cn(
			"border-2 p-1 text-center align-middle [&:has([role=checkbox])]:pr-0 dark:border dark:border-zinc-500",
			className,
		)}
		{...props}
	/>
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
	HTMLTableCaptionElement,
	React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
	<caption
		ref={ref}
		className={cn(
			"mb-1 text-xl text-zinc-500 dark:text-zinc-400",
			className,
		)}
		{...props}
	/>
));
TableCaption.displayName = "TableCaption";

export {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
};
