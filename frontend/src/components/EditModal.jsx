/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { FunctionContext } from '../App';
import axios from 'axios';

const EditModal = (props) => {
  const [
    toggleModal,
    id,
    first_name,
    last_name,
    address,
    city,
    state,
    zipcode,
  ] = props.props;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [zipCodeState, setZipcode] = useState('');
  const [addressState, setAddress] = useState('');
  const [cityState, setCity] = useState('');
  const [stateCode, setStateCode] = useState('');

  const toggleRender = useContext(FunctionContext);

  const handleEdit = (
    e,
    id,
    firstName,
    lastName,
    zipCodeState,
    cityState,
    addressState,
    stateCode
  ) => {
    axios
      .post('/editEntry', {
        id,
        firstName,
        lastName,
        zipCodeState,
        cityState,
        addressState,
        stateCode,
      })
      .then((res) => {
        console.log(res);
        toggleRender();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeFName = () => {
    setFirstName(document.getElementById('fName').value);
  };
  const changeLName = () => {
    setLastName(document.getElementById('lName').value);
  };
  const changeZip = () => {
    setZipcode(document.getElementById('zip').value);
  };
  const changeCity = () => {
    setCity(document.getElementById('city').value);
  };
  const changeState = () => {
    let stateText = document.getElementById('state').value.toUpperCase();
    console.log(stateText);
    setStateCode(stateText);
  };
  const changeAddress = () => {
    setAddress(document.getElementById('address').value);
  };
  return (
    <div className="modal">
      <div onClick={toggleModal} className="overlay"></div>
      <div className="modal-content">
        <h2>Edit Contact Details</h2>
        <input
          type="text"
          id="fName"
          placeholder="First Name"
          defaultValue={first_name}
          maxLength="20"
          onChange={changeFName}
        />
        <input
          type="text"
          id="lName"
          placeholder="Last Name"
          defaultValue={last_name}
          maxLength="20"
          onChange={changeLName}
        />
        <input
          type="text"
          id="address"
          placeholder="Address"
          defaultValue={address}
          maxLength="30"
          onChange={changeAddress}
        />
        <input
          type="text"
          id="city"
          placeholder="City"
          maxLength="20"
          onChange={changeCity}
          defaultValue={city}
        />
        <input
          type="text"
          id="state"
          placeholder="State"
          maxLength="2"
          onChange={changeState}
          defaultValue={state}
        />
        <input
          type="text"
          id="zip"
          placeholder="Zip Code"
          maxLength="5"
          onChange={changeZip}
          defaultValue={zipcode}
        />
        <button
          className="confirmButton"
          onClick={(e) =>
            handleEdit(
              e,
              id,
              firstName,
              lastName,
              zipCodeState,
              cityState,
              addressState,
              stateCode
            )
          }
        >
          Save
        </button>
        <button className="exitButton" onClick={toggleModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditModal;
