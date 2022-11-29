import React, { useState, useEffect } from 'react';
import './App.css';
import AddUser from './components/AddUser';
import AddressList from './components/AddressList';
import Header from './components/Header';

function App() {
  const [addressList, setAddressList] = useState([]);

  useEffect(() => {
    async function getAddressList() {
      fetch('/list').then((res) =>
        res.json().then((data) => {
          setAddressList(data);
        })
      );
    }
    getAddressList();
  }, []);

  return (
    <div className="App">
      <Header />
      <AddUser />
      <AddressList {...addressList} />
    </div>
  );
}

export default App;
