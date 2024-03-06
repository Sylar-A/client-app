"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";
import { CircleUserRound, InfoIcon, Moon, Sun } from "lucide-react";
import {
	HomeOutlined,
	LoginOutlined,
	LogoutOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Button } from "ui/button";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "ui/navigation-menu";

export function SiteNavigation() {
	const iconsSize = 20;
	const { theme, setTheme } = useTheme();
	const session = useSession();
	const isAuthenticated = session?.status == "authenticated";

	return (
		// если нужно будет сделать двигающийся навбар
		<div /*className="fixed bg-transparent z-20 w-full"*/>
			<div className="flex justify-between border-b">
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem title="На главную">
							<Link href="/" legacyBehavior passHref>
								<NavigationMenuLink
									className={navigationMenuTriggerStyle()}
								>
									<HomeOutlined
										style={{ fontSize: `${iconsSize}px` }}
									/>
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link href="/about" legacyBehavior passHref>
								<NavigationMenuLink
									className={navigationMenuTriggerStyle()}
								>
									<InfoIcon size={iconsSize} />
									<div className="pl-2 hidden md:block">
										О сайте
									</div>
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					</NavigationMenuList>
					{isAuthenticated ? (
						<NavigationMenuList>
							<NavigationMenuItem>
								<Link href="/employees" legacyBehavior passHref>
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
									>
										<UserOutlined
											style={{
												fontSize: `${iconsSize}px`,
											}}
										/>
										<div className="pl-2 hidden md:block">
											Сотрудники
										</div>
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						</NavigationMenuList>
					) : null}
					<NavigationMenuList>
						<NavigationMenuItem>
							<Button
								variant="ghost"
								size="icon"
								aria-label="Toggle Theme"
								className="shadow dark:shadow-white"
								title={
									theme === "dark"
										? "Ночной режим"
										: "Дневной режим"
								}
								onClick={() =>
									setTheme(
										theme === "dark" ? "light" : "dark",
									)
								}
							>
								<Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
								<Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100" />
							</Button>
						</NavigationMenuItem>
						{isAuthenticated ? (
							<NavigationMenuItem>
								<Link href="/profile" legacyBehavior passHref>
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
									>
										<CircleUserRound size={iconsSize} />
										<div className="pl-2 hidden md:block">
											Профиль
										</div>
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						) : null}
						<NavigationMenuItem>
							{isAuthenticated ? (
								<Link
									href="#"
									onClick={() =>
										signOut({
											callbackUrl: "/",
										})
									}
								>
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
									>
										<LogoutOutlined
											style={{
												fontSize: `${iconsSize}px`,
											}}
										/>
										<div className="pl-2 hidden md:block">
											Выйти
										</div>
									</NavigationMenuLink>
								</Link>
							) : (
								<Link href="/api/auth/signin" legacyBehavior passHref>
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
									>
										<LoginOutlined
											style={{
												fontSize: `${iconsSize}px`,
											}}
										/>
										<div className="pl-2 hidden md:block">
											Войти
										</div>
									</NavigationMenuLink>
								</Link>
							)}
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</div>
	);
}
