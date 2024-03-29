import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import * as process from "process";

export function GetApolloClient(isAuth: boolean) {
	return registerApolloClient(() => {
		return new ApolloClient({
			cache: new InMemoryCache(),
			link: new HttpLink({
				// https://studio.apollographql.com/public/spacex-l4uc6p/
				uri: isAuth
					? process.env.NEXT_PUBLIC_AUTH_APOLLO_SERVER_URL
					: process.env.NEXT_PUBLIC_APOLLO_SERVER_URL
				// you can disable result caching here if you want to
				// (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
				// fetchOptions: { cache: "no-store" },
			})
		});
	});
}