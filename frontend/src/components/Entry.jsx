import React, { useState, useContext } from 'react';
import { FunctionContext } from '../App';
import axios from 'axios';
import '../styles/Modal.css';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

const Entry = (props) => {
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const { id, first_name, last_name, address, city, state, zip } = props.entry;
  const toggleRender = useContext(FunctionContext);

  const toggleModal = (e) => {
    if (e.target.className === 'deleteButton') {
      setModalType('delete');
    }
    if (e.target.className === 'editButton') {
      setModalType('edit');
    }
    setModal(!modal);
  };

  const handleDelete = (e, id) => {
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

  return (
    <div className="addressEntry">
      <div style={{ display: 'flex' }}>
        <div style={{ width: '10em' }}>{first_name + ' ' + last_name}</div>
        <div style={{ color: '102,100,100' }}>
          {address + ', ' + city + ', ' + state + ', ' + zip}
        </div>
      </div>
      <div className="buttonContainer">
        <button className="editButton" onClick={toggleModal}>
          Edit
        </button>
        <button className="deleteButton" onClick={toggleModal}>
          Delete
        </button>
      </div>
      {modal && (
        <>
          <DeleteModal props={[toggleModal, handleDelete, id]} />
        </>
      )}
      {modal && modalType === 'edit' && (
        <>
          <EditModal
            props={[
              toggleModal,
              id,
              first_name,
              last_name,
              address,
              city,
              state,
              zip,
            ]}
          />
        </>
      )}
    </div>
  );
};

export default Entry;
