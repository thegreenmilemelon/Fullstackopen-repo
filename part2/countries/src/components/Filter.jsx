import React from "react";

function Filter({ filterCountry, onChange }) {
  return (
    <>
      <label htmlFor="country">find countries: </label>
      <input
        id="country"
        type="text"
        value={filterCountry}
        onChange={onChange}
      />
    </>
  );
}

export default Filter;
