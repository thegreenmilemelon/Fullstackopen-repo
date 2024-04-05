import { useDispatch, useSelector } from "react-redux";
import { votes } from "../reducers/anecdoteReducer";

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
  const anecdote = useSelector((state) => state);

  const orderedAnecdotes = [...anecdote].sort((a, b) => b.votes - a.votes);
  return (
    <div>
      <h2>Anecdotes</h2>
      {orderedAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => dispatch(votes(anecdote.id))}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
