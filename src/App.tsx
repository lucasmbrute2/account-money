import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

export function App() {
    return (
        <div className="App">
            <ThemeProvider theme={defaultTheme}>
                <GlobalStyle />
            </ThemeProvider>
        </div>
    );
}
