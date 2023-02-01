import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import {
    PriceHightlight,
    TransacationsTable,
    TransactionsContainer,
} from "./styles";

export function Transactions() {
    return (
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
                <TransacationsTable>
                    <tbody>
                        <tr>
                            <td width="50%">Desenvolvimento do site</td>
                            <td>
                                <PriceHightlight variant="income">
                                    R$ 12.000,00
                                </PriceHightlight>
                            </td>
                            <td>venda</td>
                            <td>13/04/2022</td>
                        </tr>
                        <tr>
                            <td width="50%">Hamburguer</td>
                            <td>
                                <PriceHightlight variant="outcome">
                                    - R$ 50,40
                                </PriceHightlight>
                            </td>
                            <td>Alimentação</td>
                            <td>13/04/2022</td>
                        </tr>
                    </tbody>
                </TransacationsTable>
            </TransactionsContainer>
        </div>
    );
}
