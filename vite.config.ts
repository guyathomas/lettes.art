import { reactRouter } from "@react-router/dev/vite";
import { defineConfig, type PluginOption } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import graphQLCodegen from "vite-plugin-graphql-codegen";
import graphqlLoader from "vite-plugin-graphql-loader";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => ({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    // Only run codegen in dev mode when env vars are available
    command === "serve" && process.env.CONTENTFUL_SPACE_ID
      ? graphQLCodegen()
      : null,
    graphqlLoader(),
  ].filter(Boolean) as PluginOption[],
}));
