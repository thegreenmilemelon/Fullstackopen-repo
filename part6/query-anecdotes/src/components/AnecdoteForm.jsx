import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "./request";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const anecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);

      queryClient.setQueryData(["anecdotes"], [...anecdotes, newAnecdote]);
    },
  });
  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    anecdoteMutation.mutate({ content, votes: 0 });
    console.log("new anecdote", content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
