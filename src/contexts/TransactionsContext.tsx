import { createContext, ReactNode, useEffect, useState } from "react";

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
}

export const TransactionContext = createContext({} as TransactionContextType);

interface TransactionsProviderProps {
    children: ReactNode;
}

export function TransactionsProvier({ children }: TransactionsProviderProps) {
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
        <TransactionContext.Provider value={{ transactionsList }}>
            {children}
        </TransactionContext.Provider>
    );
}
