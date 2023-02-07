import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { TransactionContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { SearchForm } from "./components/SearchForm";
import { useContextSelector } from "use-context-selector";

import {
    PriceHightlight,
    TransacationsTable,
    TransactionsContainer,
} from "./styles";

export function Transactions() {
    const transactionsList = useContextSelector(
        TransactionContext,
        (context) => context.transactionsList
    );

    return (
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SearchForm />
                <TransacationsTable>
                    <tbody>
                        {transactionsList.map((transaction) => (
                            <tr key={transaction.id}>
                                <td width="50%">{transaction.description}</td>
                                <td>
                                    <PriceHightlight variant={transaction.type}>
                                        {transaction.type === "outcome" && "- "}
                                        {priceFormatter.format(
                                            transaction.price
                                        )}
                                    </PriceHightlight>
                                </td>
                                <td>{transaction.category}</td>
                                <td>
                                    {dateFormatter.format(transaction.price)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </TransacationsTable>
            </TransactionsContainer>
        </div>
    );
}
