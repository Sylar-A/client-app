export { default } from "next-auth/middleware";

export const Config = {
	matcher: ["/profile", "/employees", "/employee/*", "/protected/:path*"],
};
