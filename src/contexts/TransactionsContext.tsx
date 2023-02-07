import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
    id: number;
    description: string;
    type: "income" | "outcome";
    category: string;
    price: number;
    createdAt: Date;
}

interface TransactionContextType {
    transactionsList: Transaction[];
    getTransactions: (query?: string) => Promise<void>;
}

export const TransactionContext = createContext({} as TransactionContextType);

interface TransactionsProviderProps {
    children: ReactNode;
}

export function TransactionsProvier({ children }: TransactionsProviderProps) {
    const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);

    async function getTransactions(query?: string) {
        const response = await api.get("/transactions", {
            params: {
                q: query,
            },
        });
        setTransactionsList(response.data);
    }

    useEffect(() => {
        getTransactions();
    }, []);

    return (
        <TransactionContext.Provider
            value={{ transactionsList, getTransactions }}
        >
            {children}
        </TransactionContext.Provider>
    );
}
