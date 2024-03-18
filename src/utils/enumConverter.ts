import {
	EmployeeConfirmationLevel,
	EmployeePost,
	EmployeeRating,
	EmployeeSourceType,
	RobokassaAccountType
} from "__generated__/types";
import { YesNo } from "../types/types";

function ConvertFromYesNo(yesNo: YesNo): string {
	let result;

	switch (yesNo) {
		case YesNo.Yes:
			result = "Да";
			break;
		case YesNo.No:
			result = "Нет";
			break;
	}

	return result;
}

function ConvertToYesNo(yesNo: string): YesNo {
	let result;

	switch (yesNo) {
		case "Да":
			result = YesNo.Yes;
			break;
		case "Нет":
			result = YesNo.No;
			break;
		default:
			result = YesNo.No;
			break;
	}

	return result;
}

function ConvertFromEmployeeRating(employeeRating: EmployeeRating): string {
	let result;

	switch (employeeRating) {
		case EmployeeRating.None:
			result = "0";
			break;
		case EmployeeRating.One:
			result = "1";
			break;
		case EmployeeRating.Two:
			result = "2";
			break;
		case EmployeeRating.Three:
			result = "3";
			break;
		case EmployeeRating.Four:
			result = "4";
			break;
		case EmployeeRating.Five:
			result = "5";
			break;
	}

	return result;
}

function ConvertToEmployeeRating(employeeRating: string): EmployeeRating {
	let result;

	switch (employeeRating) {
		case "0":
			result = EmployeeRating.None;
			break;
		case "1":
			result = EmployeeRating.One;
			break;
		case "2":
			result = EmployeeRating.Two;
			break;
		case "3":
			result = EmployeeRating.Three;
			break;
		case "4":
			result = EmployeeRating.Four;
			break;
		case "5":
			result = EmployeeRating.Five;
			break;
		default:
			result = EmployeeRating.None;
			break;
	}

	return result;
}

function ConvertFromEmployeePost(employeePost: EmployeePost): string {
	let result;

	switch (employeePost) {
		case EmployeePost.None:
			result = "Не сотрудник";
			break;
		case EmployeePost.Administrator:
			result = "Администратор";
			break;
		case EmployeePost.Loader:
			result = "Исполнитель";
			break;
		case EmployeePost.Driver:
			result = "Водитель";
			break;
		case EmployeePost.HrManager:
			result = "Менеджер по персоналу";
			break;
		case EmployeePost.Operator:
			result = "Оператор";
			break;
		case EmployeePost.Head:
			result = "Руководитель";
			break;
	}

	return result;
}

function ConvertToEmployeePost(employeePost: string): EmployeePost {
	let result;

	switch (employeePost) {
		case "Не сотрудник":
			result = EmployeePost.None;
			break;
		case "Администратор":
			result = EmployeePost.Administrator;
			break;
		case "Исполнитель":
			result = EmployeePost.Loader;
			break;
		case "Водитель":
			result = EmployeePost.Driver;
			break;
		case "Менеджер по персоналу":
			result = EmployeePost.HrManager;
			break;
		case "Оператор":
			result = EmployeePost.Operator;
			break;
		case "Руководитель":
			result = EmployeePost.Head;
			break;
		default:
			result = EmployeePost.None;
			break;
	}

	return result;
}

function ConvertFromEmployeeConfirmationLevel(
	employeeConfirmationLevel: EmployeeConfirmationLevel
): string {
	let result;

	switch (employeeConfirmationLevel) {
		case EmployeeConfirmationLevel.None:
			result = "Не подтвержден";
			break;
		case EmployeeConfirmationLevel.DocumentsConfirmed:
			result = "Принял условия бота";
			break;
		case EmployeeConfirmationLevel.ConfirmedByHrManager:
			result = "Подтвержден менеджером по персоналу";
			break;
		case EmployeeConfirmationLevel.Verified:
			result = "Верифицирован";
			break;
	}

	return result;
}

function ConvertToEmployeeConfirmationLevel(
	employeeConfirmationLevel: string
): EmployeeConfirmationLevel {
	let result;

	switch (employeeConfirmationLevel) {
		case "Не подтвержден":
			result = EmployeeConfirmationLevel.None;
			break;
		case "Принял условия бота":
			result = EmployeeConfirmationLevel.DocumentsConfirmed;
			break;
		case "Подтвержден менеджером по персоналу":
			result = EmployeeConfirmationLevel.ConfirmedByHrManager;
			break;
		case "Верифицирован":
			result = EmployeeConfirmationLevel.Verified;
			break;
		default:
			result = EmployeeConfirmationLevel.None;
			break;
	}

	return result;
}

function ConvertFromEmployeeSourceType(
	employeeSourceType: EmployeeSourceType
): string {
	let result;

	switch (employeeSourceType) {
		case EmployeeSourceType.None:
			result = "Не указан";
			break;
		case EmployeeSourceType.Vk:
			result = "Вконтакте";
			break;
		case EmployeeSourceType.Avito:
			result = "Авито";
			break;
		case EmployeeSourceType.Recommendation:
			result = "Рекомендация";
			break;
	}

	return result;
}

function ConvertToEmployeeSourceType(
	employeeSourceType: string
): EmployeeSourceType {
	let result;

	switch (employeeSourceType) {
		case "Не указан":
			result = EmployeeSourceType.None;
			break;
		case "Вконтакте":
			result = EmployeeSourceType.Vk;
			break;
		case "Авито":
			result = EmployeeSourceType.Avito;
			break;
		case "Рекомендация":
			result = EmployeeSourceType.Recommendation;
			break;
		default:
			result = EmployeeSourceType.None;
			break;
	}

	return result;
}

function ConvertFromRobokassaAccountType(
	robokassaAccountType: RobokassaAccountType
): string {
	let result;

	switch (robokassaAccountType) {
		case RobokassaAccountType.None:
			result = "Не указан";
			break;
		case RobokassaAccountType.KazanFirstAccount:
			result = "Первый аккаунт Казани";
			break;
		case RobokassaAccountType.KazanSecondAccount:
			result = "Второй аккаунт Казани";
			break;
		case RobokassaAccountType.NnFirstAccount:
			result = "Первый аккаунт НН";
			break;
		case RobokassaAccountType.TestAccount:
			result = "Тестовый";
			break;
	}

	return result;
}

function ConvertToRobokassaAccountType(
	robokassaAccountType: string
): RobokassaAccountType {
	let result;

	switch (robokassaAccountType) {
		case "Не указан":
			result = RobokassaAccountType.None;
			break;
		case "Первый аккаунт Казани":
			result = RobokassaAccountType.KazanFirstAccount;
			break;
		case "Второй аккаунт Казани":
			result = RobokassaAccountType.KazanSecondAccount;
			break;
		case "Первый аккаунт НН":
			result = RobokassaAccountType.NnFirstAccount;
			break;
		case "Тестовый":
			result = RobokassaAccountType.TestAccount;
			break;
		default:
			result = RobokassaAccountType.None;
			break;
	}

	return result;
}

export {
	ConvertFromYesNo,
	ConvertToYesNo,
	ConvertFromEmployeeRating,
	ConvertToEmployeeRating,
	ConvertFromEmployeePost,
	ConvertToEmployeePost,
	ConvertFromEmployeeConfirmationLevel,
	ConvertToEmployeeConfirmationLevel,
	ConvertFromEmployeeSourceType,
	ConvertToEmployeeSourceType,
	ConvertFromRobokassaAccountType,
	ConvertToRobokassaAccountType
};
