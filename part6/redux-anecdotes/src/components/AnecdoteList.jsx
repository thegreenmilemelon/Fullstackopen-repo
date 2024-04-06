import { useDispatch, useSelector } from "react-redux";
import { votes } from "../reducers/anecdoteReducer";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleVote }) => (
  <div key={anecdote.id}>
    <div>{anecdote.content}</div>
    <div>
      has {anecdote.votes}
      <button onClick={handleVote}>vote</button>
    </div>
  </div>
);

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdote = useSelector((state) => {
    if (state.filter === null) {
      return state.anecdotes;
    }
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    );
  });

  const handleVote = (id) => {
    dispatch(votes(id));
    dispatch(
      setNotification(
        `you voted '${anecdote.find((a) => a.id === id).content}'`
      )
    );

    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  const orderedAnecdotes = [...anecdote].sort((a, b) => b.votes - a.votes);
  return (
    <div>
      {orderedAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => handleVote(anecdote.id)}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
