import "styled-components"; //iremos extender a tipagem que já existe no styled components e não sobrescrever
import { defaultTheme } from "../styles/themes/default";

type ThemeType = typeof defaultTheme;

declare module "styled-components" {
    export interface DefaultTheme extends ThemeType {}
}
