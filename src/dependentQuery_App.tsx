import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { createSinglePostQueryOptions, createUserQueryOptions } from "./queryOptions/createTodoQueryOptions";



function App() {
    const {data: users} = useQuery(createUserQueryOptions())

    const randomUserId = Math.floor(Math.random()* (users?.length || 0))

    const {data: posts, isSuccess}= useQuery({
        ...createSinglePostQueryOptions(randomUserId), 
        enabled: !!users,
    })
 
  return <div>
  <h2>Posts</h2>
  <div>
    {JSON.stringify(posts)}
  </div>
  <div>{isSuccess && <h3>Post is Successfully loaded</h3>}</div>
  </div>;
}

export default App;
