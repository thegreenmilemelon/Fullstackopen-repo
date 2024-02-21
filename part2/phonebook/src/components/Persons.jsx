const Persons = ({ persons }) => (
  <div>
    <h3>Numbers</h3>
    {persons.map((person) => (
      <div key={person.id}>
        {person.name} {person.number}
      </div>
    ))}
  </div>
);

export default Persons;
