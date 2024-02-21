import React, { useState } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";

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
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const uniquePerson = persons.find((person) => person.name === newName);
    if (uniquePerson) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }

    setPersons((prevPersons) => [...prevPersons, newPerson]);
    setNewName("");
    setNewNumber("");

    setFilteredPersons((prevFilteredPersons) => [
      ...prevFilteredPersons,
      newPerson,
    ]);
  };

  const handleChange = (event) => {
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

      <Filter value={filterValue} onChange={handleFilter} />

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleChange}
        onNumberChange={handleChange}
        onSubmit={handleSubmit}
      />

      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
