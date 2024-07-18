import { useForm } from  "react-hook-form";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

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
      {data.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </div>
  );
}

//useMutation ex=1
const postMutation = useMutation({
  mutationFn: async (newPost) => {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      newPost
    );
    return response.data;
  },
});

export const AddPost = () => {
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

  return (
    <div>
      <h2>Create Post</h2>
      <div>
        <form onSubmit={handleSubmit((data) => postMutation.mutate(data))}>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            {...register("title", { required: true })}
            id="title"
            placeholder="Enter title"
          />
          {errors.title && <p> {errors.title.message}</p>}
          <label htmlFor="body">Body</label>
          <textarea
            name="body"
            {...register("body", { required: true })}
            id="body"
            placeholder="Enter body"
          />
          {errors.body && <p> {errors.body.message}</p>}
          <button type="submit">Add Post</button>
        </form>
      </div>

      {/* <div className="form-control">
        <label htmlFor="title">Title</label>
        <input
          {...register("title", { required: true })}
          id="title"
          type="text"
          placeholder="Enter title"
        />
        {errors.title && <p>This field is required</p>}
      </div>
      <div className="form-control">
        <label htmlFor="body">Body</label>
        <textarea
          {...register("body", { required: true })}
          id="body"
          type="text"
          placeholder="Enter body"
        />
        {errors.body && <p>This field is required</p>}
        <button
          onClick={handleSubmit((data) => {
            postMutation.mutate(data);
          })}
        >
          Add Post
        </button>
      </div> */}
    </div>
  );
};

function App() {
  // return <TimeOutFetch />
  // return <DisplayPosts />;
  <AddPost />;
}

export default App;
