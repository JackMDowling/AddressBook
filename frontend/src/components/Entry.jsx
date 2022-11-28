import React, { useState, useEffect } from 'react';

const Entry = (props) => {
  const { id, first_name, last_name, address, city, state, zip } = props.entry;
  useEffect(() => {}, []);

  const handleDelete = (e, id) => {
    e.preventDefault();
    console.log(id);
  };
  const handleEdit = (e, id) => {
    e.preventDefault();
    console.log(id);
  };

  return (
    <div>
      {first_name +
        ' ' +
        last_name +
        ', ' +
        address +
        ', ' +
        city +
        ', ' +
        state +
        ', ' +
        zip}
      <button className="button" onClick={handleEdit}>
        Edit
      </button>
      <button className="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Entry;
