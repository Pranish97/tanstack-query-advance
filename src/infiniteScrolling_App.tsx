import axios from "axios";
import "./App.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment } from "react/jsx-runtime";
import type { Post } from "./types";

const getPostsInfinite = async ({ pageParams = 0 }: { pageParams: number }) => {
  const limit = 10;
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${pageParams}`
  );
  return response.data;
};

function App() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["infinitePosts"],
    queryFn: getPostsInfinite,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPage) => {
      const limit = 10;
      if (lastPage.length === limit) {
        return allPage.length * limit;
      }
      return undefined;
    },
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <div>
      <h1>Infinite Post</h1>
      {data?.pages.map((page, i) => (
        <Fragment key={i + 1}>
          {page.map((post: Post) => (
            <div
              key={post.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "10px 0",
              }}
            >
              <strong>
                {post.id} {post.title}
              </strong>
              <p>{post.body}</p>
            </div>
          ))}
        </Fragment>
      ))}
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "No More Posts"}
      </button>

      <div style={{margin: "20px", fontSize:".8erm", color:"#666"}}>
        <p>Has Next Page: {hasNextPage ? "Yes" : "No"}</p>
        <p>Is Fetching Next Page: {isFetchingNextPage ? "Yes" : "No"}</p>
        <p>Total Page fetched: {data.pages.length}</p>
        <p>
            Total Posts: {data?.pages.reduce((acc, page) => acc + page.length, 0)}
        </p>
      </div>
    </div>
  );
}

export default App;
