import "dotenv/config";
import type { RequestDocument } from "graphql-request";
import { request } from "graphql-request";
import type { GetArtCollectionQuery } from "./__generated__/graphql";
import GetArtCollection from "./GetArtCollection.graphql";

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_DELIVERY_API_ACCESS_TOKEN =
  process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN;

async function apiCall(
  query: RequestDocument,
  variables?: Record<string, unknown>,
) {
  if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_DELIVERY_API_ACCESS_TOKEN) {
    throw new Error(
      'Missing environment variable "CONTENTFUL_SPACE_ID" or "CONTENTFUL_DELIVERY_API_ACCESS"',
    );
  }
  const url = `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}/environments/master`;

  const requestHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${CONTENTFUL_DELIVERY_API_ACCESS_TOKEN}`,
  };

  return await request<GetArtCollectionQuery>({
    url,
    requestHeaders,
    document: query,
    variables,
  });
}

async function getArtCollection() {
  const response = await apiCall(GetArtCollection);
  return response.artCollection?.items;
}

export const contentfulClient = { getArtCollection };
