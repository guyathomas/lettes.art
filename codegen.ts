import "dotenv/config";
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  documents: "./app/models/contentful/*.graphql",
  generates: {
    "app/models/contentful/__generated__/": {
      preset: "client",
      schema: [
        {
          [`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`]:
            {
              headers: {
                Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN}`,
              },
            },
        },
      ],
      plugins: ["typescript"],
    },
    "./graphql.schema.json": {
      schema: [
        {
          [`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`]:
            {
              headers: {
                Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN}`,
              },
            },
        },
      ],
      plugins: ["introspection"],
    },
  },
};

export default config;
