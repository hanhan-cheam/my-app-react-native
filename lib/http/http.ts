import { config } from "@/const/config";
import { FetchWrapper } from "../fetch/fetch";


// const BASE_URL = process.env.WCS_BE_API_HOST_URL;

const BASE_URL = config.BASE_URL;

console.log("BASE_URL", BASE_URL)

export const httpApi = new FetchWrapper({
  baseUrl: `${BASE_URL}/v1/`,
});

export const httpApiV2 = new FetchWrapper({
  baseUrl: `${BASE_URL}/v2/`,
});

export const httpApiV3 = new FetchWrapper({
  baseUrl: `${BASE_URL}/v3/`,
});
