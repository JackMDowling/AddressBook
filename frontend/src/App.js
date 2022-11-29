import React, { useState, useEffect } from 'react';
import './App.css';
import AddUser from './components/AddUser';
import AddressList from './components/AddressList';
import Header from './components/Header';

function App() {
  const [addressList, setAddressList] = useState([]);
  const [renderToggle, setRenderToggle] = useState(1);

  const toggleRender = () => {
    setRenderToggle(renderToggle + 1);
  };
  async function getAddressList() {
    fetch('/list').then((res) =>
      res.json().then((data) => {
        setAddressList(data);
      })
    );
  }

  useEffect(() => {
    getAddressList();
  }, []);

  useEffect(() => {
    getAddressList();
  }, [renderToggle]);

  return (
    <div className="App">
      <Header />
      <AddUser toggleRender={toggleRender} />
      <AddressList {...addressList} />
    </div>
  );
}

export default App;
