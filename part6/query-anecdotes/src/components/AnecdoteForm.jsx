import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "./request";
import NoticationContext from "../NotificationContext";
import { useContext } from "react";

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NoticationContext);
  const queryClient = useQueryClient();
  const anecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);

      queryClient.setQueryData(["anecdotes"], [...anecdotes, newAnecdote]);
    },
    onError: (error) => {
      console.log(error);

      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: error.response.data.error,
      });

      setTimeout(() => {
        notificationDispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    },
  });
  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    anecdoteMutation.mutate({ content, votes: 0 });

    notificationDispatch({
      type: "SET_NOTIFICATION",
      payload: `a new anecdote ${content} created`,
    });

    setTimeout(() => {
      notificationDispatch({ type: "CLEAR_NOTIFICATION" });
    }, 5000);
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
