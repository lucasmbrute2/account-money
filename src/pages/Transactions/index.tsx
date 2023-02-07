import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import {
    PriceHightlight,
    TransacationsTable,
    TransactionsContainer,
} from "./styles";

interface Transaction {
    id: number;
    description: string;
    type: "income" | "outcome";
    category: string;
    price: number;
    createdAt: Date;
}

export function Transactions() {
    const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);

    async function getTransactions() {
        const res = await fetch("http://localhost:3000/transactions");
        const payload = await res.json();
        setTransactionsList(payload);
    }

    useEffect(() => {
        getTransactions();
    }, []);

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
