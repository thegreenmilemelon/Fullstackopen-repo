import React from "react";

const Persons = ({ persons, onDestroyPerson }) => (
  <table className="persons-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Number</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {persons.map((person) => (
        <tr key={person.id}>
          <td>{person.name}</td>
          <td>{person.number}</td>
          <td>
            <button onClick={() => onDestroyPerson(person.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Persons;
