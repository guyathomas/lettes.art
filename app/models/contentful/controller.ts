import 'dotenv/config'
import { request, RequestDocument } from 'graphql-request'
import {GetArtCollectionQuery} from './__generated__/graphql'
const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID
const CONTENTFUL_DELIVERY_API_ACCESS_TOKEN = process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN

import GetArtCollection from './GetArtCollection.graphql'

async function apiCall(query: RequestDocument, variables?: Parameters<typeof JSON.stringify>[0]) {
    const url = `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}/environments/master`;
    const requestHeaders = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${CONTENTFUL_DELIVERY_API_ACCESS_TOKEN}`,
    }
    return await request<GetArtCollectionQuery>({
      url,
      requestHeaders,
      document: query,
      variables,
    })
}

async function getArtCollection() {
    const response = await apiCall(GetArtCollection);
    return (await response).artCollection?.items
}


export const contentfulClient = { getArtCollection }