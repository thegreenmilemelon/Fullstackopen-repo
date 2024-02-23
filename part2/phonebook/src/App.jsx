import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import axios from "axios";

const App = () => {
  const [filterValue, setFilterValue] = useState("");
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled data", response.data);
      setPersons(response.data);
    });
  }, []);

  const handleFilter = (event) => {
    setFilterValue(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: Date.now(),
    };
    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson) {
      alert(`Name "${newName}" already exists in the phonebook.`);
      return;
    }
    axios.post("http://localhost:3001/persons", newPerson).then((response) => {
      setPersons([...persons, newPerson]);
      setNewName("");
      setNewNumber("");
    });
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  useEffect(() => {
    console.log(`persons`, persons);
  }, [persons]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterValue} onChange={handleFilter} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={handleSubmit}
      />
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
