import { getServerSession } from "next-auth";
import { AuthConfig } from "configs/auth";

export default async function ProfilePage() {
	const session = await getServerSession(AuthConfig);

	return (
		<div>
			<h1 className="text-center py-2">
				Здесь будет страница данных о пользователе
			</h1>
		</div>
	);
}
