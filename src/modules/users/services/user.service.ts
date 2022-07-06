import axios from "axios";
import "dotenv/config";
import { replaceIdAndToJson } from "../../../common/utils";

const client = axios.create({
  baseURL: process.env["USERS_URL"],
  responseType: "json",
});

async function getJWT(email: string, password: string) {
  const postData = `{"email": "${email}", "password": "${password}"}`;
  const response = await client.post("/login", postData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { data } = response;
  return data;
}

async function findOneById(id: string) {
  const responseData = (await client.get(`/${id}`)).data;
  return replaceIdAndToJson(responseData);
}

async function create(reqData: Object) {
  const response = await client.post("/register", reqData, {
    headers: {
      "Content-Type": "application/json",      
    },
  });
  const { data } = response;  
  return replaceIdAndToJson(data);
}

export const userService = { getJWT, findOneById, create };
