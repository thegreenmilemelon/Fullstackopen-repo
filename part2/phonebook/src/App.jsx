import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = { name: newName };
    const uniquePerson = persons.find((person) => person.name === newName);
    if (uniquePerson) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      return;
    }
    setPersons(persons.concat(newPerson));
    setNewName("");

    console.table(persons);
  };

  const handleChange = (event) => {
    console.log("some changes");
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input id="name" value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>Debug: {newName}</div>
      {persons.map((person) => (
        <div key={person.name}>{person.name}</div>
      ))}
    </div>
  );
};

export default App;
