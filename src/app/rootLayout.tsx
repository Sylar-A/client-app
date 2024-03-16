"use client";

import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { ApolloWrapper } from "apollo/apolloWrapper";
import { SiteNavigation } from "components/siteNavigation";
import { Providers } from "components/auth/providers";
import { Toaster } from "ui/toaster";
import "styles/globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="ru">
			<body className={inter.className}>
				<Providers>
					<ApolloWrapper>
						<ThemeProvider
							attribute="class"
							defaultTheme="light"
							enableSystem
						>
							<Toaster />
							<SiteNavigation />
							{children}
						</ThemeProvider>
					</ApolloWrapper>
				</Providers>
			</body>
		</html>
	);
}
