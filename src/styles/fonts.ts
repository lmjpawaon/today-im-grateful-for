import { Lato, Raleway, Nunito } from "next/font/google";

export const lato = Lato({
    weight: ["100","300","400", "700", "900"],
    subsets: ["latin"],
    variable: "--font-lato"
});

export const raleway = Raleway({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    variable: "--font-raleway"
});

export const nunito = Nunito({
    weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-nunito"
});
