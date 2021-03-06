import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import cookie from "react-cookies";
import styled from "styled-components";

function UserIcon() {
	const router = useRouter();
	const token = cookie.load("access_token");

	return (
		<>
			<FontAwesome
				icon={faUser}
				onClick={token ? () => router.push("/profile") : () => router.push("/account/signin")}
			/>
		</>
	);
}

const FontAwesome = styled(FontAwesomeIcon)`
	width: 2rem;
	height: 2rem;
	margin-right: 1.5rem;
	cursor: pointer;
`;

export default UserIcon;
