import axios from "axios";
import "dotenv/config";
import { replaceIdAndToJson } from "../../../common/utils";

const client = axios.create({
  baseURL: process.env["GENRES_URL"],
  responseType: "json",
});

async function findAll() {  
  const response = await client.get("");
  const responseData = response.data;
  const { items } = responseData;  
  return replaceIdAndToJson(items);
}

async function findOneById(id: string) {
  const responseData = (await client.get(`/${id}`)).data;
  return replaceIdAndToJson(responseData);
}

async function create(reqData: Object, jwt: string) {
  const response = await client.post("", reqData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
  });
  const { data } = response;
  return replaceIdAndToJson(data);
}

async function remove(id: string, jwt: string) {
  const response = await client.delete(`/${id}`, {
    headers: {
      Authorization: jwt,
    },
  });
  const { data } = response;
  return replaceIdAndToJson(data);
}

async function update(id: string, reqData: Object, jwt: string) {
  const response = await client.put(`/${id}`, reqData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
  });
  const { data } = response;
  return replaceIdAndToJson(data);
}

export const genreService = { findAll, findOneById, create, remove, update };
