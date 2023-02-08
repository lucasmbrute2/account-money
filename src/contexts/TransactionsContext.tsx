import { ReactNode, useCallback, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

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

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);

    const getTransactions = useCallback(async (query?: string) => {
        const response = await api.get("/transactions", {
            params: {
                _sort: "createdAt",
                _order: "desc",
                q: query,
            },
        });
        setTransactionsList(response.data);
    }, []); //useCallback previne que essa função seja recriada sem de fato ter sofrido alguma alteração

    useEffect(() => {
        getTransactions();
    }, []);

    const createTransactions = useCallback(
        async (data: CreateTransactionInputs) => {
            const response = await api.post("/transactions", {
                ...data,
                createdAt: new Date(),
            });

            setTransactionsList((state) => [response.data, ...state]);
        },
        []
    );

    return (
        <TransactionContext.Provider
            value={{ transactionsList, getTransactions, createTransactions }}
        >
            {children}
        </TransactionContext.Provider>
    );
}
