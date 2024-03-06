import NextAuth from "next-auth";
import { AuthConfig } from "configs/auth";

const handler = NextAuth(AuthConfig);

export { handler as GET, handler as POST };
