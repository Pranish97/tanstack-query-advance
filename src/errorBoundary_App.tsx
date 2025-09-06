import axios from "axios";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

const getPosts = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts/1"
  );
  return response.data;
};

const ErrorFallBack = ({error} : {error: Error}) => {
    return (
        <div>
            <p>Something Went Wrong:</p>
            <pre>{error.message}</pre>
        </div>
    )
}



function App() {
    const {data:posts, error, isError, isLoading} = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
        retry: 1
    })

    if(isLoading){
        return <div>Loading...</div>
    }

     if(isError){
        return <div>Error: {error instanceof Error ? error.message : "An Error occured"}</div>
    }

  return <div>
  
  <h1>Post Viewers</h1>
  <ErrorBoundary FallbackComponent={ErrorFallBack}>
    {JSON.stringify(posts)}
  </ErrorBoundary>
  </div>;
}

export default App;
