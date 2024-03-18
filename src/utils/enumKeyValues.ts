function GetYesNo(): string[] {
	return ["Да", "Нет"];
}

function GetEmployeeGroupNumbers(): string[] {
	return ["0", "1", "2", "3", "4", "5"];
}

function GetEmployeeRatings(): string[] {
	return ["0", "1", "2", "3"];
}

function GetEmployeePosts(): string[] {
	return [
		"Не сотрудник",
		"Администратор",
		"Исполнитель",
		"Водитель",
		"Менеджер по персоналу",
		"Оператор",
		"Руководитель"
	];
}

function GetEmployeeConfirmationLevels(): string[] {
	return [
		"Не подтвержден",
		"Подтвердил документы",
		"Подтвержден менеджером по персоналу",
		"Верифицирован"
	];
}

function GetEmployeeSourceTypes(): string[] {
	return ["Не указан", "Вконтакте", "Авито", "Рекомендация"];
}

function GetRobokassaAccountTypes(): string[] {
	return [
		"Не указан",
		"Первый аккаунт Казани",
		"Второй аккаунт Казани",
		"Первый аккаунт НН",
		"Тестовый"
	];
}

export {
	GetYesNo,
	GetEmployeeGroupNumbers,
	GetEmployeeRatings,
	GetEmployeePosts,
	GetEmployeeConfirmationLevels,
	GetEmployeeSourceTypes,
	GetRobokassaAccountTypes
};
