import { HeaderContent, HeaderContinar, NewTransactionButton } from "./styles";
import logoImage from "../../assets/logo.svg";

export function Header() {
    return (
        <HeaderContinar>
            <HeaderContent>
                <img src={logoImage} alt="" />
                <NewTransactionButton>Nova transação</NewTransactionButton>
            </HeaderContent>
        </HeaderContinar>
    );
}
