import SetPasswordForm from "components/auth/setPasswordForm";

export default function ChangePassword({
	params
}: {
	params: { token: string; telegramId: number };
}) {
	return (
		<SetPasswordForm
			token={params.token}
			telegramPrivateChatId={params.telegramId}
		/>
	);
}
