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
  useEffect(() => {
    setFirstName(first_name);
    setLastName(last_name);
    setZipcode(zipcode);
    setAddress(address);
    setCity(city);
    setStateCode(state);
  }, []);

  const handleEdit = (
    id,
    firstName,
    lastName,
    zipCodeState,
    cityState,
    addressState,
    stateCode
  ) => {
    if (
      !firstName ||
      !lastName ||
      !zipCodeState ||
      !address ||
      !cityState ||
      !stateCode
    ) {
      console.log('Incomplete Parameters');
      return false;
    }
    axios
      .post('/editEntry', {
        id,
        firstName,
        lastName,
        zipcode: zipCodeState,
        city: cityState,
        address: addressState,
        state: stateCode,
      })
      .then((res) => {
        console.log(res);
        toggleRender();
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return true;
  };

  const changeInput = () => {
    setFirstName(document.getElementById('fNameModal').value);
    setLastName(document.getElementById('lNameModal').value);
    setZipcode(document.getElementById('zipModal').value);
    setCity(document.getElementById('cityModal').value);
    setAddress(document.getElementById('addressModal').value);
    let stateText = document.getElementById('stateModal').value.toUpperCase();
    setStateCode(stateText);
  };
  return (
    <div className="modal">
      <div onClick={toggleModal} className="overlay"></div>
      <div className="modal-content">
        <h2>Edit Contact Details</h2>
        <div className="editInputs">
          <input
            type="text"
            id="fNameModal"
            placeholder="First Name"
            value={firstName}
            maxLength="15"
            onChange={changeInput}
          />
          <input
            type="text"
            id="lNameModal"
            placeholder="Last Name"
            value={lastName}
            maxLength="15"
            onChange={changeInput}
          />
          <input
            type="text"
            id="addressModal"
            placeholder="Address"
            value={addressState}
            maxLength="30"
            onChange={changeInput}
          />
          <input
            type="text"
            id="cityModal"
            placeholder="City"
            maxLength="20"
            onChange={changeInput}
            value={cityState}
          />
          <input
            type="text"
            id="stateModal"
            placeholder="State"
            maxLength="2"
            onChange={changeInput}
            value={stateCode}
          />
          <input
            type="text"
            id="zipModal"
            placeholder="Zip Code"
            maxLength="5"
            onChange={changeInput}
            value={zipCodeState}
          />
        </div>
        <br />
        <button
          className="addUserButton"
          onClick={(e) => {
            const canClose = handleEdit(
              id,
              firstName,
              lastName,
              zipCodeState,
              cityState,
              addressState,
              stateCode
            );
            if (canClose) {
              toggleModal(e);
            }
          }}
        >
          Save
        </button>
        <button className="editButton" onClick={toggleModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditModal;
