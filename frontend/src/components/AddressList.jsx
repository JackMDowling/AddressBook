/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Entry from './Entry';

const AddressList = (props) => {
  const [addresses, setAddresses] = useState([]);
  const addressList = Object.values(props);
  console.log(addresses);

  useEffect(() => {
    setAddresses(addressList);
  }, [props]);

  return (
    <div>
      {!addresses?.length ? (
        <p>Loading...</p>
      ) : (
        <div>
          {addresses.map((entry) => {
            return <Entry entry={entry} />;
          })}
        </div>
      )}
    </div>
  );
};

export default AddressList;
