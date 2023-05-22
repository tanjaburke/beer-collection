import "../styles/global.css";
import "../styles/modal.css";

import { AppProps } from 'next/app';
import { BeerCollectionContextProvider } from "@/store/store";
import { ModalContextProvider } from "@/store/modalStore";
import { InputContextProvider } from "@/store/inputStore";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BeerCollectionContextProvider>
      <ModalContextProvider>
        <InputContextProvider>
        <Component {...pageProps} />
        </InputContextProvider>
      </ModalContextProvider>
    </BeerCollectionContextProvider>
  );
}
