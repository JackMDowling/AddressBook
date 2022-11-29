import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddUser = () => {
  // Might not need these just send field value on Submit?
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  useEffect(() => {}, []);

  const changeFName = () => {
    setFirstName(document.getElementById('fName').value);
    console.log(firstName);
  };
  const changeLName = () => {
    setLastName(document.getElementById('lName').value);
    console.log(lastName);
  };
  const changeZip = () => {
    setZipcode(document.getElementById('zip').value);
    console.log(zipcode);
  };

  const handleAddUser = async () => {
    console.log(firstName, lastName, zipcode);
    if (!firstName || !lastName || !zipcode) {
      console.log('i quit!');
      return;
    }
    axios
      .post('/addUser', {
        firstName,
        lastName,
        zipcode,
      })
      .then((res) => {
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
      <input type="text" id="zip" placeholder="Zip Code" onChange={changeZip} />
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
};

export default AddUser;
