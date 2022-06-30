import axios from "axios";
import "dotenv/config";
import { replaceIdAndToJson } from "../../../common/utils"

const client = axios.create({
  baseURL: process.env["GENRES_URL"],
  responseType: "json",
});

async function findAll() {
  const responseData = (await client.get("")).data;
  const { items } = responseData;    
  return replaceIdAndToJson(items);
}

async function findOneById(id: string) {
  const responseData = (await client.get(`/${id}`)).data;  
  return replaceIdAndToJson(responseData);
}

export { findAll, findOneById };
