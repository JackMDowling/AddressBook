import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FunctionContext } from '../App';

const AddUser = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');

  const toggleRender = useContext(FunctionContext);

  useEffect(() => {}, []);

  const changeInput = () => {
    setFirstName(document.getElementById('fName').value);
    setLastName(document.getElementById('lName').value);
    setZipcode(document.getElementById('zip').value);
    setAddress(document.getElementById('address').value);
  };

  const handleAddUser = async () => {
    if (!firstName || !lastName || !zipcode || !address) {
      console.log('Incomplete Parameters');
      return;
    }
    axios
      .post('/addUser', {
        firstName,
        lastName,
        address,
        zipcode,
      })
      .then((res) => {
        setFirstName('');
        setLastName('');
        setAddress('');
        setZipcode('');
        toggleRender();
        console.log(res);
      })
      .catch((err) => {
        alert('Check to make sure the zipcode is correct');
        console.log(err);
      });
  };

  return (
    <div className="addUserBar">
      <input
        type="text"
        id="fName"
        placeholder="First Name"
        value={firstName}
        maxLength="20"
        onChange={changeInput}
      />
      <input
        type="text"
        id="lName"
        placeholder="Last Name"
        value={lastName}
        maxLength="20"
        onChange={changeInput}
      />
      <input
        type="text"
        id="address"
        placeholder="Address"
        value={address}
        maxLength="30"
        onChange={changeInput}
      />
      <input
        type="text"
        id="zip"
        placeholder="Zip Code"
        maxLength="5"
        onChange={changeInput}
        value={zipcode}
      />
      <button className="addUserButton" onClick={handleAddUser}>
        Add User
      </button>
    </div>
  );
};

export default AddUser;
