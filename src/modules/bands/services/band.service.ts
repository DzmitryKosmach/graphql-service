import axios from "axios";
import "dotenv/config";
import { replaceIdAndToJson } from "../../../common/utils";

const client = axios.create({
  baseURL: process.env["BANDS_URL"],
  responseType: "json",
});

async function findAll(limit: string, offset: string) {
  const responseData = (
    await client.get("", {
      params: { limit, offset },
    })
  ).data;
  const { items } = responseData;
  return replaceIdAndToJson(items);
}

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

export const bandService = { findAll, findOneById, create, remove, update };
