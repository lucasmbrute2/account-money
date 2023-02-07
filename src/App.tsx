import { ThemeProvider } from "styled-components";
import { TransactionsProvier } from "./contexts/TransactionsContext";
import { Transactions } from "./pages/Transactions";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

export function App() {
    return (
        <div className="App">
            <ThemeProvider theme={defaultTheme}>
                <GlobalStyle />
                <TransactionsProvier>
                    <Transactions />
                </TransactionsProvier>
            </ThemeProvider>
        </div>
    );
}
