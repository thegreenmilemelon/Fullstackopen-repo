/* eslint-disable react/prop-types */
const PersonForm = ({
  newName,
  newNumber,
  onNameChange,
  onNumberChange,
  onSubmit,
}) => (
  <form onSubmit={onSubmit}>
    <h3>Add a new person</h3>
    <div>
      <label htmlFor="name">Name:</label>
      <input id="name" value={newName} onChange={onNameChange} />
    </div>
    <div>
      <label htmlFor="number">Phone Number:</label>
      <input
        id="number"
        type="text"
        value={newNumber}
        onChange={onNumberChange}
      />
    </div>
    <button type="submit">Add</button>
  </form>
);

export default PersonForm;
