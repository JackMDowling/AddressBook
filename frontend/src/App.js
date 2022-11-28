import React, { useState, useEffect } from 'react';
import './App.css';
import AddUser from './components/AddUser';
import AddressList from './components/AddressList';
import Header from './components/Header';

function App() {
  const [addressList, setAddressList] = useState([]);

  // Placeholder GET

  useEffect(() => {}, [addressList]);

  useEffect(() => {
    async function getAddressList() {
      fetch('/list').then((res) =>
        res.json().then((data) => {
          console.log('data', data);
          setAddressList(data);
        })
      );
    }
    getAddressList();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React and flask</h1>
      </header>
      <Header />
      <AddUser />
      <AddressList {...addressList} />
    </div>
  );
}

export default App;
