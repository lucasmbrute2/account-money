import { SummaryCard, SummaryContainer } from "./styles";
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from "phosphor-react";
import { useContext } from "react";
import { TransactionContext } from "../../contexts/TransactionsContext";
import { priceFormatter } from "../../utils/formatter";
import { useSummary } from "../../hooks/useSumamry";

export function Summary() {
    const summaryTotal = useSummary();

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
