import { ReactNode } from "react";
import type { Metadata } from "next";
import RootLayout from "./rootLayout";

export const metadata: Metadata = {
	title: "Мастер груз",
	description: "Мастер груз",
};

export default async function Layout({ children }: { children: ReactNode }) {
	return <RootLayout>{children}</RootLayout>;
}
