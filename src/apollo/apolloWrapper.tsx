"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import {
	NextSSRApolloClient,
	ApolloNextAppProvider,
	NextSSRInMemoryCache,
	SSRMultipartLink
} from "@apollo/experimental-nextjs-app-support/ssr";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { setVerbosity } from "ts-invariant";
import * as process from "process";

if (process.env.NODE_ENV === "development") {
	setVerbosity("debug");
	loadDevMessages();
	loadErrorMessages();
}

function makeClient() {
	const httpLink = new HttpLink({
		uri: process.env.NEXT_PUBLIC_APOLLO_SERVER_URL
	});

	return new NextSSRApolloClient({
		cache: new NextSSRInMemoryCache(),
		link:
			typeof window === "undefined"
				? ApolloLink.from([
						// in an SSR environment, if you use multipart features like
						// @defer, you need to decide how to handle these.
						// This strips all interfaces with a `@defer` directive from your queries.
						new SSRMultipartLink({
							stripDefer: true
						}),
						httpLink
					])
				: httpLink
	});
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
	return (
		<ApolloNextAppProvider makeClient={makeClient}>
			{children}
		</ApolloNextAppProvider>
	);
}
