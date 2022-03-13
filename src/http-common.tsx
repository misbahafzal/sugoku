import axios from "axios";

export const instance = axios.create({
  baseURL: "https://vast-chamber-17969.herokuapp.com",
  headers: {
    "Content-type": "application/json",
  },
});
