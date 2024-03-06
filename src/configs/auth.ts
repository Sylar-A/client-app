import { AuthOptions, User } from "next-auth";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { getClient } from "apollo/apolloClient";
import { EmployeesQueryDocument } from "components/employees/__generated__/EmployeesQuery";
import { Employee } from "__generated__/types";

export const AuthConfig: AuthOptions = {
	providers: [
		Credentials({
			credentials: {
				telegramPrivateChatId: {
					label: "ID Телеграм",
					type: "long",
					required: true
				},
				password: {
					label: "Пароль",
					type: "password",
					required: true
				}
			},
			async authorize(credentials) {
				if (
					!credentials?.telegramPrivateChatId ||
					!credentials.password
				) {
					return null;
				}

				const query = await getClient().query({
					query: EmployeesQueryDocument,
					variables: {
						where: {
							telegramPrivateChatId: {
								eq: Number(credentials.telegramPrivateChatId),
							},
						},
					},
				});

				const items = query.data?.employees?.items;

				if (items.length !== 1) {
					return null;
				}

				const employee = items[0] as Employee;

				if (!employee || !employee.password) {
					return null;
				}

				const passwordMatches = await bcrypt.compare(
					credentials.password,
					employee.password,
				);

				if (!passwordMatches) {
					return null;
				}

				const { password, ...employeeWithoutPassword } = employee;

				return employeeWithoutPassword as User;
			},
		}),
	],
	pages: {
		signIn: "/api/auth/signin",
		newUser: "/api/auth/reset-password",
	},
	callbacks: {
		async session({ session, user, token }) {
			debugger;
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
				},
			};
		},
		async jwt({
			token,
			user,
			account,
			profile,
			isNewUser,
			session,
			trigger,
		}) {
			if (user) {
				return {
					...token,
					id: user.id,
				};
			}
			return token;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
	},
	debug: process.env.NODE_ENV === "development",
};
