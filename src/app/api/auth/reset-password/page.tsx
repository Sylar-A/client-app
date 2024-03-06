// без этого падает пре-билд страницы
export const dynamic = "force-dynamic";

import ResetPasswordForm from "components/auth/resetPasswordForm";

export default function ResetPassword() {
	return <ResetPasswordForm />;
}
