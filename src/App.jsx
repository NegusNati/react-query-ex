import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const retrivePosts = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
};
export function DisplayPosts() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["theePost"],
    queryFn: retrivePosts,
  });
  if (isLoading) return <div> Loading...</div>;
  if (error) return <div> The Error is {error.message}</div>;

  return (
    <div>
      {data.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </div>
  );
}

function App() {
  return <DisplayPosts />;
}

// function wait(duration) {
//   return new Promise((resolve) => setTimeout(resolve, duration));
// }

export default App;
