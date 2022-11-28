import React, { useState, useEffect } from 'react';

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
            return (
              <div>
                {entry.first_name +
                  ' ' +
                  entry.last_name +
                  ', ' +
                  entry.address +
                  ', ' +
                  entry.city +
                  ', ' +
                  entry.state +
                  ', ' +
                  entry.zip}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AddressList;
