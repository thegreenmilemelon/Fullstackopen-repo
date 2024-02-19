import "./App.css";

function Header({ course }) {
  return <h1>{course}</h1>;
}

function Total({ total }) {
  return <p>Number of exercises {total}</p>;
}

function Content({ name, exercise }) {
  return (
    <div>
      <p>
        {name} {exercise}
      </p>
    </div>
  );
}

function App() {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };
  return (
    <div>
      <Header course="Half Stack application development" />
      <Content name={part1.name} exercise={part1.exercises} />
      <Content name={part2.name} exercise={part2.exercises} />
      <Content name={part3.name} exercise={part3.exercises} />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  );
}

export default App;
