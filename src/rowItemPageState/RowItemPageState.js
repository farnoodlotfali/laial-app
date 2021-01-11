import React, { useState } from 'react';
import RowItemPageContext from './rowItemPageContext';

const RowItemPageState = (props) => {
  const [item, setItem] = useState(null);
  const changeItem = (url, media, person) => {
    setItem({
      url: url,
      media: media,
      person: person,
    });
  };
  return (
    <RowItemPageContext.Provider value={{ changeItem, item }}>
      {props.children}
    </RowItemPageContext.Provider>
  );
};

export default RowItemPageState;
