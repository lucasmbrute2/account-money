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

interface CreateTransactionInputs {
    description: string;
    price: number;
    category: string;
    type: "income" | "outcome";
}

interface TransactionContextType {
    transactionsList: Transaction[];
    getTransactions: (query?: string) => Promise<void>;
    createTransactions: (data: CreateTransactionInputs) => Promise<void>;
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
                _sort: "createdAt",
                _order: "desc",
                q: query,
            },
        });
        setTransactionsList(response.data);
    }

    useEffect(() => {
        getTransactions();
    }, []);

    async function createTransactions(data: CreateTransactionInputs) {
        const response = await api.post("/transactions", {
            ...data,
            createdAt: new Date(),
        });

        setTransactionsList((state) => [response.data, ...state]);
    }

    return (
        <TransactionContext.Provider
            value={{ transactionsList, getTransactions, createTransactions }}
        >
            {children}
        </TransactionContext.Provider>
    );
}
