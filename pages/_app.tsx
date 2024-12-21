import "@fontsource/cedarville-cursive"; // Defaults to weight 400
import "@fontsource/cedarville-cursive/400.css"; // Specify weight
import "@/styles/globals.css";
import "@fontsource/mulish"; // Defaults to weight 400
import "@fontsource/mulish/400.css"; // Specify weight
import "@fontsource/mulish/400-italic.css"; // Specify weight and style
import type { AppProps } from "next/app";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { PrimeReactProvider } from 'primereact/api';


export default function App({ Component, pageProps }: AppProps) {
  return (<PrimeReactProvider>
    <Component {...pageProps} />
  </PrimeReactProvider>)
}
