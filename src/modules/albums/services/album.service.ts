import axios from "axios";
import "dotenv/config";

const client = axios.create({
  baseURL: process.env["ALBUMS_URL"],
});

const findAll = client.get("").then((response) => response.data);

export { findAll };
