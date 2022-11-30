import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FunctionContext } from '../App';

const AddUser = (props) => {
  // Might not need these just send field value on Submit?
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');

  const toggleRender = useContext(FunctionContext)

  useEffect(() => {}, []);

  const changeFName = () => {
    setFirstName(document.getElementById('fName').value);
  };
  const changeLName = () => {
    setLastName(document.getElementById('lName').value);
  };
  const changeZip = () => {
    setZipcode(document.getElementById('zip').value);
  };
  const changeAddress = () => {
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
        toggleRender();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="addUserBar">
      <input
        type="text"
        id="fName"
        placeholder="First Name"
        onChange={changeFName}
      />
      <input
        type="text"
        id="lName"
        placeholder="Last Name"
        onChange={changeLName}
      />
      <input
        type="text"
        id="address"
        placeholder="Address"
        onChange={changeAddress}
      />
      <input type="text" id="zip" placeholder="Zip Code" onChange={changeZip} />
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
};

export default AddUser;
