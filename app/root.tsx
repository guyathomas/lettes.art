import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";

import globals from "./globals.css?url";
import { themeSessionResolver } from "./sessions.server";
import clsx from "clsx";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: globals },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request);
  return {
    theme: getTheme(),
  };
}

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const data = useLoaderData<typeof loader>();
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      {children}
    </ThemeProvider>
  );
};

function App() {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();
  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Meta />
        <Links />
      </head>
      <body className="min-h-full">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  return (
    <ThemeWrapper>
      <App />
    </ThemeWrapper>
  );
}
