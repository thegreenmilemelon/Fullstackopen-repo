const Filter = ({ value, onChange }) => (
  <div>
    <p>Filter shown with:</p>
    <input type="text" value={value} onChange={onChange} />
  </div>
);

export default Filter;
