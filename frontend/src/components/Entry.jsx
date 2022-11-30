import React, { useState, useEffect, useContext } from 'react';
import { FunctionContext } from '../App';
import axios from 'axios';

const Entry = (props) => {
  const { id, first_name, last_name, address, city, state, zip } = props.entry;
  const toggleRender = useContext(FunctionContext);
  useEffect(() => {}, []);

  const handleDelete = (e, id) => {
    console.log(id);
    axios
      .post('/deleteEntry', {
        id,
      })
      .then((res) => {
        console.log(res);
        toggleRender();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEdit = (e, id) => {
    console.log(id);
  };

  return (
    <div className="addressEntry">
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
