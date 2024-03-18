import React, { useEffect, useState, useRef, useCallback } from "react";
//import { PaginationInput } from "__generated__/types";
import { NextRouter, useRouter } from "next/router";

import { FakeAny } from "common/types/FakeAny";
//import { defaultPagination } from "common/constants";

export function useLocalStorageState<S>(
	nameItemStorage: string,
	initialState: S | (() => S)
): [S, React.Dispatch<React.SetStateAction<S>>] {
	const [state, setState] = React.useState<S>(initialState);

	React.useEffect(() => {
		let storageData = localStorage?.getItem(nameItemStorage);
		storageData = storageData ? JSON.parse(storageData) : null;
		setState(storageData as FakeAny);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		localStorage.setItem(
			nameItemStorage,
			JSON.stringify((state as FakeAny) || initialState)
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	return [state, setState];
}

export function usePrevious<T>(value: T): T {
	const ref: FakeAny = useRef<T>();

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref.current;
}

export function useRouterUrlHash(): [string, NextRouter] {
	const router = useRouter();
	const urlHash = /#([a-z0-9_]+)/i.exec(router.asPath)?.[1] || "";

	return [urlHash, router];
}
/*
type usePaginationHookReturnType = [
    PaginationInput,
    (value: React.SetStateAction<PaginationInput>) => void,
    () => void,
];

export function usePagination(
    paginationSettings = defaultPagination,
): usePaginationHookReturnType {
    const [pagination, setPagination] =
        useState<PaginationInput>(paginationSettings);

    const onResetPage = useCallback(
        () => setPagination((x: FakeAny) => ({ ...x, offset: 0 })),
        [],
    );

    return [pagination, setPagination, onResetPage];
}
*/

const flatten = (array: FakeAny[], childKey: string): FakeAny => {
	return array?.reduce(
		// eslint-disable-next-line default-param-last
		(res = [], { key, ...rest }) =>
			res.concat(key).concat(flatten(rest[childKey], childKey)),
		[]
	);
};

export function useLoading<TResult, TData>(
	callback: (data?: TData | undefined) => Promise<TResult>,
	initialState = false
) {
	const [isLoading, setIsLoading] = useState(initialState);

	const handleCallback: (data?: TData | undefined) => Promise<TResult> =
		useCallback(
			async (data: TData | undefined) => {
				try {
					setIsLoading(true);
					const result = await callback(data);
					setIsLoading(false);
					return result;
				} catch (ex) {
					setIsLoading(false);
					throw ex;
				}
			},
			[callback]
		);

	return { isLoading, load: handleCallback };
}
