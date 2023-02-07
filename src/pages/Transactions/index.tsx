import { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { TransactionContext } from "../../contexts/TransactionsContext";
import { SearchForm } from "./components/SearchForm";
import {
    PriceHightlight,
    TransacationsTable,
    TransactionsContainer,
} from "./styles";

export function Transactions() {
    const { transactionsList } = useContext(TransactionContext);

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
                                        {transaction.price}
                                    </PriceHightlight>
                                </td>
                                <td>{transaction.category}</td>
                                <td>{transaction.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </TransacationsTable>
            </TransactionsContainer>
        </div>
    );
}
