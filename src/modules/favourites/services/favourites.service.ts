import axios from "axios";
import "dotenv/config";
import { replaceIdAndToJson } from "../../../common/utils";

const client = axios.create({
  baseURL: process.env["FAVOURITES_URL"],
  responseType: "json",
});

async function findOne(jwt: string) {
  const response = await client.get("", {
    headers: {
      Authorization: jwt,
    },
  });
  const responseData = response?.data;
  if (!responseData) {
    return null;
  }
  return replaceIdAndToJson(responseData);
}

async function addItem(reqData: Object, jwt: string) {
  const response = await client.put("/add", reqData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
  });
  const { data } = response;
  return replaceIdAndToJson(data);
} 

export const favouritesService = { findOne, addItem };
