import { useContextSelector } from "use-context-selector";
import { TransactionContext } from "../contexts/TransactionsContext";
import { useMemo } from "react";

export function useSummary() {
    const transactionsList = useContextSelector(
        TransactionContext,
        (context) => context.transactionsList
    );

    const summaryTotal = useMemo(() => {
        return transactionsList.reduce(
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
    }, [transactionsList]); // Esta variável só sera recriada quando a variável no array de depdendencias mudar.

    return summaryTotal;
}
