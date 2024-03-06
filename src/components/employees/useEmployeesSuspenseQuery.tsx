import { useSuspenseQuery } from "@apollo/client";
import {
	EmployeesQueryDocument,
	EmployeesQueryVariables,
} from "./__generated__/EmployeesQuery";

export default function useEmployeesSuspenseQuery({
	skip,
	take = 1000000,
	order,
	where,
}: EmployeesQueryVariables) {
	return useSuspenseQuery(EmployeesQueryDocument, {
		variables: {
			skip: skip,
			take: take,
			order: order,
			where: where,
		},
	});
}
