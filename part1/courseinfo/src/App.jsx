import "./App.css";

function Header({ text }) {
  return <h1>{text}</h1>;
}

function Total({ total }) {
  return <p>Number of exercises {total}</p>;
}

// function Content({ parts, exercises }) {
//   return (
//     <p>
//       {parts} {exercises}
//     </p>
//   );
// }

// function App() {
//   const course = "Half Stack application development";
//   const part1 = "Fundamentals of React";
//   const exercises1 = 10;
//   const part2 = "Using props to pass data";
//   const exercises2 = 7;
//   const part3 = "State of a component";
//   const exercises3 = 14;

//   return (
//     <div>
//       <Header text={course} />
//       <Content parts={part1} exercises={exercises1} />
//       <Content parts={part2} exercises={exercises2} />
//       <Content parts={part3} exercises={exercises3} />
//       <Total total={exercises1 + exercises2 + exercises3} />
//     </div>
//   );
// }

// 1.2: course information

function Part({ name, exercises }) {
  return (
    <p>
      {name} {exercises}
    </p>
  );
}

function Content() {
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Part name={part1} exercises={exercises1} />
      <Part name={part2} exercises={exercises2} />
      <Part name={part3} exercises={exercises3} />
    </div>
  );
}

function App() {
  return (
    <div>
      <Header text="Half Stack application development" />
      <Content />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  );
}

export default App;
