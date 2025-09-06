import { queryOptions } from "@tanstack/react-query";
import type { User } from "../types";
import axios from "axios";

const getUsers = async (): Promise<User[]> => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
};

const getSinglePost = async (postId: number) => {
  const reponse = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  return reponse.data;
};

export const createUserQueryOptions = () => {
  return queryOptions({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};

export const createSinglePostQueryOptions = (postId: number) => {
  return queryOptions({
    queryKey: ["posts", postId],
    queryFn: () => getSinglePost(postId),
  });
};
