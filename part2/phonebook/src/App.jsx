import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    const uniquePerson = persons.find((person) => person.name === newName);
    if (uniquePerson) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");

    console.table(persons);
  };

  const handleChange = (event) => {
    console.log("some changes");

    if (event.target.id === "name") {
      setNewName(event.target.value);
    } else if (event.target.id === "number") {
      setNewNumber(event.target.value);
    }
  };

  const handleFilter = (event) => {
    const filterText = event.target.value;
    setFilterValue(filterText);
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredPersons(filteredPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <p>
        filter shown with:{" "}
        <input
          id="filter"
          value={filterValue}
          type="text"
          onChange={handleFilter}
        />
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="name">Name: </label>
            <input id="name" value={newName} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="number">Phone Number: </label>
            <input
              id="number"
              type="number"
              value={newNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        Debug: {newName} {newNumber}
      </div>
      {filteredPersons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
