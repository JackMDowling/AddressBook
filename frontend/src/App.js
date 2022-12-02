import React, { useState, useEffect, createContext } from 'react';
import './styles/App.css';
import AddUser from './components/AddUser';
import AddressList from './components/AddressList';

export const FunctionContext = createContext();

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
      <h3>The Book of Names</h3>
      <FunctionContext.Provider value={toggleRender}>
        <AddUser />
        <AddressList {...addressList} />
      </FunctionContext.Provider>
    </div>
  );
}

export default App;
