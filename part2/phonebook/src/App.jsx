import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import axios from "axios";
import personObject from "./services/persons";

const App = () => {
  const [filterValue, setFilterValue] = useState("");
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    personObject.getAll().then((response) => {
      setPersons(response);
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
      id: Date.now().toString(),
    };
    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    const existingNumber = persons.find(
      (person) => person.number === newNumber
    );

    if (existingPerson && existingNumber) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    if (existingPerson) {
      if (existingPerson.number !== newNumber) {
        if (
          window.confirm(
            `${newNumber} is already added to phonebook, replace the old number with the new one?`
          )
        ) {
          personObject
            .update(existingPerson.id, { ...existingPerson, number: newNumber })
            .then((response) => {
              setPersons(
                persons.map((person) =>
                  person.id !== existingPerson.id ? person : response
                )
              );
              setNewName("");
              setNewNumber("");
            });
          return;
        }
      }
    }

    personObject.create(newPerson).then((response) => {
      setPersons([...persons, response]);
      setNewName("");
      setNewNumber("");
    });
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  const handleDestroyPerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personObject.destroy(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

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
      <Persons
        persons={filteredPersons}
        onDestroyPerson={handleDestroyPerson}
      />
    </div>
  );
};

export default App;
