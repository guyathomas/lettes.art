import { FC } from "react";
import { AppProps } from "next/app";
import ThemeProvider from "context/ThemeProvider";
import AppLayout from "context/AppLayout";
import Head from "next/head";

const NextApp: FC<AppProps> = ({ Component, pageProps }) => {
  return <>
    <Head>
      <title>{`Lette's Art`}</title>
      <meta property="og:url" content="https://lettes.art" />
      <meta
        property="og:image"
        content={`https://images.ctfassets.net/k5e511oz03s5/5NCSVkZOrSzMySu4QAFz4a/eeb6738633327f0781c44cd2900c2455/36B708CF-067C-4677-8EC1-A5AB14C0212E_1_105_c.jpeg?w=600&fm=webp`}
      />
      <meta property="og:title" content={`Lette's Art`} key="ogtitle" />
    </Head>
    <StyledEngineProvider injectFirst>
      <ThemeProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ThemeProvider>
    </StyledEngineProvider>
  </>;
};

export default NextApp;
