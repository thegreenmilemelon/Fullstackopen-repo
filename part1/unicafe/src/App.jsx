import { useState } from "react";

const Button = ({ onCick, text }) => {
  return (
    <>
      <button onClick={onCick}>{text}</button>{" "}
    </>
  );
};

const Statistic = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>Total: {good + neutral + bad}</p>
      <p>average: {(good - bad) / (good + neutral + bad)}</p>
      <p>positive: {(good / (good + neutral + bad)) * 100} %</p>
    </>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBAD] = useState(0);
  return (
    <>
      <h1>Give Feedback</h1>
      <Button onCick={() => setGood((g) => g + 1)} text="Good" />
      <Button onCick={() => setNeutral((n) => n + 1)} text="Neutral" />
      <Button onCick={() => setBAD((b) => b + 1)} text="Bad" />
      <h2>statistics</h2>
      <Statistic good={good} neutral={neutral} bad={bad} />
    </>
  );
}

export default App;
