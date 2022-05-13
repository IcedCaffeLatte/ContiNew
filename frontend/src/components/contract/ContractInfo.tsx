import ContractTerms from "./ContractTerms";
import { Input, RadioInput } from "./Input";
import { Label } from "./Label";
import { Section } from "./Section";

function ContractInfo() {
	return (
		<>
			<h2>&#91;임차인의 임대차계약 현황&#93;</h2>
			<Section>
				<Label>계약종류</Label>
				<Label htmlFor="전세">전세</Label>
				<RadioInput type="radio" id="전세" name="saleType" />
				<Label htmlFor="월세">월세</Label>
				<RadioInput type="radio" id="월세" name="saleType" />
				<Label>임차보증금</Label>
				<Input />
				<Label>관리비</Label>
				<Input />
				<Label>계약 기간</Label>
				<Input type="date" />
				<Input type="date" />
			</Section>
			<h2>&#91;계약내용&#93;</h2>
			<p>제1조&#40;권리금의 지급&#41; 신규임차인은 임차인에게 다음과 같이 권리금을 지급한다.</p>
			<Section>
				<Label>총 권리금</Label>
				<Input />
				<Label>계약금</Label>
				<Input />
				<Label>중도금</Label>
				<Input />
				<Label>중도금 기간</Label>
				<Input type="date" />
				<Input type="date" />
				<Label>잔금</Label>
				<Input />
				<Label>잔금 기간</Label>
				<Input type="date" />
				<Input type="date" />
			</Section>
			<ContractTerms />
		</>
	);
}

export default ContractInfo;