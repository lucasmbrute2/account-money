import { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionsContext";

export function useSummary() {
    const { transactionsList } = useContext(TransactionContext);

    const summaryTotal = transactionsList.reduce(
        (acc, curr) => {
            if (curr.type === "income") {
                acc.income += curr.price;
                acc.total += curr.price;
            } else {
                acc.outcome += curr.price;
                acc.total -= curr.price;
            }

            return acc;
        },
        { income: 0, outcome: 0, total: 0 }
    );

    return summaryTotal;
}
