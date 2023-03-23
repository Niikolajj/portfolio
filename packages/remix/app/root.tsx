// root.tsx
import React, { useContext, useEffect } from "react";
import Manrope200 from "@fontsource/manrope/200.css";
import Manrope700 from "@fontsource/manrope/700.css";
import Manrope400 from "@fontsource/manrope/400.css";
import { withEmotionCache } from "@emotion/react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type {
  MetaFunction,
  LinksFunction,
  ErrorBoundaryComponent,
} from "@remix-run/node"; // Depends on the runtime you choose
import BaseTheme from "./theme/BaseTheme";

import { ServerStyleContext, ClientStyleContext } from "./context";
import ErrorPage from "./components/page/ErrorPage";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "undefined.dev",
  viewport: "width=device-width,initial-scale=1",
});

export let links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: Manrope200,
    },
    {
      rel: "stylesheet",
      href: Manrope400,
    },
    {
      rel: "stylesheet",
      href: Manrope700,
    },
  ];
};
interface DocumentProps {
  children: React.ReactNode;
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
    }, []);

    return (
      <html lang="en">
        <head>
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);

export default function App() {
  return (
    <Document>
      <ChakraProvider theme={BaseTheme}>
        <Outlet />
      </ChakraProvider>
    </Document>
  );
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <html>
      <head>
        <title>Oh no! :(</title>
        <Meta />
        <Links />
      </head>
      <body>
        <ChakraProvider theme={BaseTheme}>
          <ErrorPage error={error} />
        </ChakraProvider>
        <Scripts />
      </body>
    </html>
  );
};
