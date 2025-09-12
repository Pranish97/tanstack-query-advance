import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const addPost = async (postData: {
  title: string;
  body: string;
  userId: number;
}) => {
  const response = await axios.post(
    `https://jsonplaceholder.typicode.com/posts`,
    postData
  );
  return response.data;
};


export const useAddPost = () => {
    return useMutation({
        mutationFn: addPost
    })
}