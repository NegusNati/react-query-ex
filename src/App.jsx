import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useQuery } from "@tanstack/react-query";

function App() {
  //  const {} = useQuery({
  //     queryKey: ['todos'],
  //     queryFn: () => wait(1000).then(() => fetch('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX').then(res => res.json()))
  //  })
  const { data, isLoading, error } = useQuery({
    queryKey: ["thisKey"],
    queryFn: () => wait(2000).then(() => "Hello"),
  });

  if (isLoading) return <h2>it is loading</h2>;

  if (error) {
    return <h2>Something went wrong {error.message}</h2>;
  }

  return <h1>{data} </h1>;
}

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default App;
