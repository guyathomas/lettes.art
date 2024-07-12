import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import graphQLCodegen from "vite-plugin-graphql-codegen";
import graphqlLoader from "vite-plugin-graphql-loader";

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
    graphQLCodegen(),
    graphqlLoader(),
  ],
});
