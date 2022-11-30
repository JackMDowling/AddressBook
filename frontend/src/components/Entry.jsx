import React, { useState, useEffect, useContext } from 'react';
import { FunctionContext } from '../App';
import axios from 'axios';
import './Modal.css';

const Entry = (props) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { id, first_name, last_name, address, city, state, zip } = props.entry;
  const toggleRender = useContext(FunctionContext);
  useEffect(() => {}, []);

  const toggleModal = () => {
    setConfirmDelete(!confirmDelete);
  };

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
      <button className="button" onClick={toggleModal}>
        Delete
      </button>

      {confirmDelete && (
        <>
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              <h2>Are You Sure?</h2>
              <p>If you delete this entry you won't be able to undo it!</p>
              <button
                className="confirmButton"
                onClick={(e) => handleDelete(e, id)}
              >
                Yes, I'm Sure!
              </button>
              <button className="exitButton" onClick={toggleModal}>
                No, Wait!
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Entry;
