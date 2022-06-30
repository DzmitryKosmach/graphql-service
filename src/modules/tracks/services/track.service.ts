import axios from "axios";
import "dotenv/config";

const client = axios.create({
  baseURL: process.env["TRACKS_URL"],
  responseType: "json",
});

async function findAll() {
  const response = await client.get("");
  return response.data as Object;
}

export { findAll };
