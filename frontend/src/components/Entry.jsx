import React, { useState, useEffect } from 'react';

const Entry = (props) => {
  const { id, first_name, last_name, address, city, state, zip } = props.entry;
  useEffect(() => {}, []);

  const handleDelete = (e, id) => {
    console.log(id);
  };
  const handleEdit = (e, id) => {
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
      <button className="button" onClick={(e) => handleEdit(e, id)}>
        Edit
      </button>
      <button className="button" onClick={(e) => handleDelete(e, id)}>
        Delete
      </button>
    </div>
  );
};

export default Entry;
