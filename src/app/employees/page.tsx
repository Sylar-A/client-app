// без этого падает пре-билд страницы
export const dynamic = "force-dynamic";

import { EmployeesTable } from "components/employees/employeesTable";

export default async function EmployeesListPage() {
	return <EmployeesTable />;
}
