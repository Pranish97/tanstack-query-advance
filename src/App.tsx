import { useState } from "react";
import "./App.css";
import { useAddPost } from "./hooks/useAddPost";
import { useUsers } from "./hooks/useUsers";
import type { User } from "./types";

function App() {
  const { data: users, isLoading } = useUsers();
  const {
    mutate: addPost,
    isPending,
    isSuccess,
  } = useAddPost();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPost({ title, body, userId });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create a Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title"
          />
        </div>

        <div>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        </div>

        <div>
          <select
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
          >
            {users?.map((user: User) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={isPending}>
          {isPending ? "Adding..." : isSuccess ? "Added" : "Add Post"}
        </button>
        {isSuccess && (
          <p style={{ color: "green" }}>Post Submitted Successfully!</p>
        )}

        <hr />
        <h3>Users</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {users?.map((user: User) => (
              <li key={user.id}>
                {user.name} ({user.email})
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}

export default App;
