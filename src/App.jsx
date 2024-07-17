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


function App() {
  const {
    isLoading,
    data: posts,
    error
  } = useQuery({
    queryKey: ["posts"],
    queryFn: retrivePosts,
    refetchIntervalInBackground: 2000,
    // refetchInterval: 1000,
    
  });

  if (isLoading) return <div>It is Loading fam!</div>;
  if(error) return <div>{error.message}</div>;

  return (
    <>
      {" "}
      {posts.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </> 
  );
}

// function wait(duration) {
//   return new Promise((resolve) => setTimeout(resolve, duration));
// }

export default App;
