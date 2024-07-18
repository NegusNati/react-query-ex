# React Query


## a simple excercise i used to learn React Query! 
you can try it too

- Clone the repo
```
git clone https://github.com/NegusNati/react-query-ex.git
```
- Run
```
npm install
```
- Run vite
```
npm run dev
```

Then just look in your browser at `http://localhost:5173/`.

Note:

uncomment each component you want to see in App.jsx form start to bottom, for CRUD operations 

```
function App() {
  // TODO: uncomment starting from TimeOutFetch to DeletePost one by one

   return <TimeOutFetch />
  // return <DisplayPosts />;
  // return <AddPost />;
  // return <UpdatePost />;
  //return <DeletePost />;
}
```



          **************************************



```
look into App.js file for better info

// read opreration
const { data, error, isLoading } = useQuery({
    queryKey: ["getPost"],
    queryFn: async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/1"
      );

      return response.data;
    },
  });

//create operation
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

//update operation
 const postMutation = useMutation({
    mutationKey: ["updatedPost"],
    mutationFn: async (updatedPost) => {
      const response = await axios.put(
        "https://jsonplaceholder.typicode.com/posts/1",
        updatedPost
      );
      return response.data;
    },
  });

//delete operation
const postMutation = useMutation({
    mutationKey: ["deletePost"],

    mutationFn: async () => {
      const response = await axios.delete(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      return response.data;
    },
  });


```


Example screens

- `useQuery()` to **Read** the posts
 <img src="https://github.com/user-attachments/assets/58aa934a-cc15-482d-9c9c-f3b7f7a5fdb4">


- `useMutuation()` to **Create** a post
 <img src="https://github.com/user-attachments/assets/7eb4c3e3-9011-4672-99cb-fa7a845399ec">

- `postMutation.isPending` in pending state
 <img src="https://github.com/user-attachments/assets/da2a3880-1189-4257-827b-f80401226a7a">

 - `postMutation.isSuccess` after successis returned
 <img src="https://github.com/user-attachments/assets/870c07f2-20ef-4614-b60b-5c07258db3a4">


- `useMutuation()` to **Update** a post, Before Update
 <img src="https://github.com/user-attachments/assets/0bfb5b1e-9e6e-414f-8929-faae75fc0550">

- `useMutuation()` to **Update** a post, After Update
 <img src="https://github.com/user-attachments/assets/f4d2e228-f903-4756-8ea2-5dbae3bd3db5">


- `useMutuation()` to **Delete** a post, Before Delete, we fetched the post using `useQuery()` and now we will just delete it.
 <img src="https://github.com/user-attachments/assets/1d83f5af-e65d-4734-9728-ccb6461bee06">
 
 - `useMutuation()` to **Delete** a post, After Deletion of the post.
 <img src="https://github.com/user-attachments/assets/9f7c427d-da1d-40c1-abb5-9ea21da28414">










Resources

- [The Docs](https://tanstack.com/query/latest/docs/framework/react/guides/queries)
- [Official Blog](https://tkdodo.eu/blog/practical-react-query)


💻 Follow me for more : 

- [Telegram](https://t.me/negusnatiChannel)



