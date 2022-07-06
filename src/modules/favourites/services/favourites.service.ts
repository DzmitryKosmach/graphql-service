import axios from "axios";
import "dotenv/config";
import { replaceIdAndToJson } from "../../../common/utils";

const client = axios.create({
  baseURL: process.env["FAVOURITES_URL"],
  responseType: "json",
});


async function findOneById(id: string) {
  const response = await client.get(`/${id}`).catch(() => {
    return null;
  });
  const responseData = response?.data;
  if (!responseData) {
    return null;
  }
  return replaceIdAndToJson(responseData);
}

export const favouritesService = { findOneById };
