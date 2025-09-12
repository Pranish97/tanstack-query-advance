import axios from "axios";
import "./App.css";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "./types";

const fetchUsers = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
};

const fetchUserById = async (id: number) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.data;
};

function App() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const handleMouseEnter = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: ["user", id],
      queryFn: () => fetchUserById(id),
      staleTime: 60 * 1000,
    });
  };

  const { data: selectedUser } = useQuery({
    queryKey: ["user", selectedUserId],
    queryFn: () => fetchUserById(selectedUserId!),
    enabled: !!selectedUserId,
  });

  if (isLoading) return <div>Loading....</div>;

  return <div style={{padding: "20px"}}>
    <h1>Users</h1>
    <ul>
        {users.map((user:User) => (
            <li key={user.id} onMouseEnter={() => handleMouseEnter(user.id)}
            onClick={() => setSelectedUserId(user.id)}
            style={{cursor: "pointer", marginBottom: "8px"}}
            >
                {user.name}
            </li>

            
        ))}

        {selectedUser && (
                <div style={{marginTop: "20px"}}>
                <h2>{selectedUser.name}</h2>
                <p>Email: {selectedUser.email}</p>
                <p>Phone: {selectedUser.phone}</p>
                <p>Website: {selectedUser.website}</p>
                </div>
            )}
    </ul>
  </div>;
}

export default App;
