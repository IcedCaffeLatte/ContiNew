import React from "react";
import Container from "./Container";
import styled from "styled-components";
import OptionIcon from "./OptionIcon";
import { HouseInfoProps } from "src/pages/article/[id]";

function OptionInfo({ houseInfo }: HouseInfoProps) {
	const optionName = [
		"에어컨",
		"세탁기",
		"TV",
		"냉장고",
		"가스레인지",
		"인덕션",
		"전자레인지",
		"책상",
		"주차장",
	];

	const optionFilename = [
		"aircon",
		"washing",
		"tv",
		"refrigerator",
		"stove",
		"induction",
		"microwave",
		"desk",
		"parking",
	];
	return (
		<Container title="옵션 정보">
			<Div>
				{houseInfo.options.map((option, idx) => (
					<OptionIcon
						key={idx}
						name={optionName[option - 1]}
						fileName={optionFilename[option - 1]}
					/>
				))}
			</Div>
		</Container>
	);
}

export default OptionInfo;

const Div = styled.div`
	display: flex;
`;
