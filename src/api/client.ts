import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

const client = axios.create({
  baseURL: "https://reqres.in/api",
});

const queryClient = new QueryClient();

export { client, queryClient };
