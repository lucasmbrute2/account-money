import { SummaryCard, SummaryContainer } from "./styles";
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from "phosphor-react";
import { useContext } from "react";
import { TransactionContext } from "../../contexts/TransactionsContext";
import { priceFormatter } from "../../utils/formatter";

export function Summary() {
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

    console.log(summaryTotal);

    return (
        <SummaryContainer>
            <SummaryCard>
                <header>
                    <span>Entradas</span>
                    <ArrowCircleUp size={32} color="#00b37e" />
                </header>

                <strong>{priceFormatter.format(summaryTotal.income)}</strong>
            </SummaryCard>
            <SummaryCard>
                <header>
                    <span>Saídas</span>
                    <ArrowCircleDown size={32} color="#f75a68" />
                </header>

                <strong>{priceFormatter.format(summaryTotal.outcome)}</strong>
            </SummaryCard>
            <SummaryCard variant="green">
                <header>
                    <span>Total</span>
                    <CurrencyDollar size={32} color="#fff" />
                </header>

                <strong>{priceFormatter.format(summaryTotal.total)}</strong>
            </SummaryCard>
        </SummaryContainer>
    );
}
