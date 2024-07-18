import { useForm } from "react-hook-form";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { us } from "react";

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

//useQuery ex=1, we simulate an async operation using wait function
export const TimeOutFetch = () => {
  //destructure useQuery
  const { data, error, isLoading, fetchStatus, isError, isRefetching } =
    useQuery({
      queryKey: ["timeoutPosts"], //the unique identifier for this request.
      queryFn: async () => {
        //what should run
        await wait(3000);
        return "Hello after 3 seconds";
      },
    });
  // console.log("before loading fetchStatus: ", fetchStatus , " & isError : ", isError, " isRefeching? :", isRefetching);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>The Error is {error.message}</div>;
  // console.log("after data fetchStatus: ", fetchStatus , " & isError : ", isError,  " isRefeching? :", isRefetching, " isLoading? :", isLoading);

  return <div>{data}</div>;
};

//useQuery ex=2
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
      <h1>useQuery example</h1>
      <h2>Posts </h2>
      {data.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </div>
  );
}

//useMutation ex=1 for post operation
//Add post
export const AddPost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      title: "",
    },
  });
  const postMutation = useMutation({
    mutationKey: ["newPost"],
    mutationFn: async (newPost) => {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        newPost
      );
      console.log(newPost);
      return response.data;
    },
  });
  
  return (
    <div className=" ">
      <div>
        <h1>useMutation example 1: Create</h1>
        <h2 className="text-2xl p-4">Posts </h2>
        <div className={" bg-stone-500 p-2 " + (postMutation.isIdle && " font-semibold ") + (postMutation.isSuccess&& " animate-pulse bg-green-400 ") + ( postMutation.isError && " animate-ping bg-red-400 ") + ( postMutation.isPending && " animate-bounce bg-yellow-400 ")} >
          {postMutation.isIdle && (
            <p>
              Click the button to add a post: it is in idle state until you add
              a post
            </p>
          )}
          {postMutation.isPending && <p>Adding post...</p>}
          {postMutation.isError && <p>Error adding post...</p>}
          {postMutation.isSuccess && (
            <p>Post added successfully : {postMutation.data.title}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-start mt-8 pt-8 ">
        <h2 className="text-2xl">Create a Post</h2>
        <div className="  ">
          <form
            onSubmit={handleSubmit((data) => postMutation.mutate(data))}
            className="flex flex-col gap-4"
          >
            <label htmlFor="title">Title</label>
            <input
              name="title"
              {...register("title", { required: true })}
              id="title"
              placeholder="Enter title"
              className="border-2 border-gray-300 p-2 rounded-md"
            />
            {errors.title && <p> {errors.title.message}</p>}
            <label htmlFor="body">Body</label>
            <textarea
              name="body"
              {...register("body", { required: true })}
              id="body"
              placeholder="Enter body"
              className="border-2 border-gray-300 p-2 rounded-md"
            />
            {errors.body && <p> {errors.body.message}</p>}
            <button type="submit">Add Post</button>
          </form>
        </div>
      </div>
    </div>
  );
};


//Update Post

export const UpdatePost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      body: "",
    },
  });
  const postMutation = useMutation({
    mutationKey: ["updatedPost"],
    mutationFn: async (updatedPost) => {
      const response = await axios.put(
        "https://jsonplaceholder.typicode.com/posts/1",
        updatedPost
      );
      console.log(updatedPost);
      return response.data;
    },
  });

  return (
    <div className=" ">
      <div>
        <h1>useMutation example 2 : Update</h1>
        <h2 className="text-2xl p-4">Posts </h2>
        <div className={" bg-stone-500 p-2 " + (postMutation.isIdle && " font-semibold ") + (postMutation.isSuccess&& " animate-pulse bg-green-400 ") + ( postMutation.isError && " animate-ping bg-red-400 ") + ( postMutation.isPending && " animate-bounce bg-yellow-400 ")} >
          {postMutation.isIdle && (
            <p>
              Click the button to Update the post: it is in idle state until you add
              a post
            </p>
          )}
          {postMutation.isPending && <p>Updateing post...</p>}
          {postMutation.isError && <p>Error Updateing post...</p>}
          {postMutation.isSuccess && (
            <p>Post updated successfully : {postMutation.data.title}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-start mt-8 pt-8 ">
        <h2 className="text-2xl">Update a Post</h2>
        <div className="  ">
          <form
            onSubmit={handleSubmit((data) => postMutation.mutate(data))}
            className="flex flex-col gap-4"
          >
            <label htmlFor="title">Title</label>
            <input
              name="title"
              {...register("title", { required: true })}
              id="title"
              placeholder="Enter title"
              className="border-2 border-gray-300 p-2 rounded-md"
            />
            {errors.title && <p> {errors.title.message}</p>}
            <label htmlFor="body">Body</label>
            <textarea
              name="body"
              {...register("body", { required: true })}
              id="body"
              placeholder="Enter body"
              className="border-2 border-gray-300 p-2 rounded-md"
            />
            {errors.body && <p> {errors.body.message}</p>}
            <button type="submit">Update Post</button>
          </form>
        </div>
      </div>
    </div>
  );
};

























function App() {
  // return <TimeOutFetch />
  // return <DisplayPosts />;
  // return <AddPost />;
  return <UpdatePost />;
}

export default App;
