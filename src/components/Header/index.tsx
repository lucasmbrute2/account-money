import { HeaderContent, HeaderContinar, NewTransactionButton } from "./styles";
import logoImage from "../../assets/logo.svg";
import * as Dialog from "@radix-ui/react-dialog";

export function Header() {
    return (
        <HeaderContinar>
            <HeaderContent>
                <img src={logoImage} alt="" />
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <NewTransactionButton>
                            Nova transação
                        </NewTransactionButton>
                    </Dialog.Trigger>

                    <Dialog.Portal>
                        <Dialog.Overlay />
                        <Dialog.Content>
                            <Dialog.Title>Nova transação</Dialog.Title>
                            <Dialog.Close />
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </HeaderContent>
        </HeaderContinar>
    );
}
