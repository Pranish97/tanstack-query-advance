import axios from "axios";
import "./App.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Post } from "./types";

const getPosts = async (page = 1, limit = 10) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
  );
  return response.data;
};

function App() {
  const [page, setPage] = useState(1);
  const postPerPage = 10;

  const {
    data: posts,
    isPending,
    isError,
    error,
    refetch,
    isFetching,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["posts", page, postPerPage],
    queryFn: () => getPosts(page, postPerPage),
    placeholderData: (previousData) => previousData,
  });

  const handleNextPage = () => {
    if (posts && posts.length === postPerPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Posts (Page: {page})</h1>
      {isFetching && isPlaceholderData && <div>Loading....</div>}

      <ul>
        {posts.map((post: Post) => (
          <li>
            <h2>{post.title}</h2>
            <p>{post.body.substring(0, 50)}</p>
          </li>
        ))}
      </ul>

      <button onClick={handlePreviousPage} disabled={page === 1 || isFetching}>
        Previous Page
      </button>
      <button
        onClick={handleNextPage}
        disabled={(posts && posts.length < postPerPage) || isFetching}
      >
        Next Page
      </button>

      <div style={{ marginTop: "20px", fontSize: "0.8em", color: "#666" }}>
        <p>Is Fetching : {isFetching ? "Yes" : "No"}</p>
        <p>Is Placeholder Data : {isPlaceholderData ? "Yes" : "No"}</p>
      </div>
    </div>
  );
}

export default App;
