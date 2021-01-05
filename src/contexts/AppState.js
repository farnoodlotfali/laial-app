import React, { useState } from 'react';
import AppContext from './appContext';

const AppState = (props) => {
  const [showMusic, setShowMusic] = useState(false);
  const [showLeft, setShowLeft] = useState(false);
  const [showCenter, setShowCenter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState([]);
  const [listName, setListName] = useState('');
  const ChangeShowMusic = () => {
    setShowMusic(!showMusic);
  };

  const ChangeShowLeft = (newShowleft) => {
    setShowLeft(newShowleft);
  };
  const ChangeshowCenter = () => {
    if (showLeft) {
      ChangeShowLeft();
    }
    setShowCenter(!showCenter);
  };
  const ChangeLists = (newLists) => {
    setLists(newLists);
  };
  const ChangeListName = (name) => {
    setListName(name);
  };
  const removeLoading = () => {
    setLoading(!loading);
  };

  return (
    <AppContext.Provider
      value={{
        ChangeShowMusic,
        showMusic,
        ChangeShowLeft,
        showLeft,
        ChangeshowCenter,
        showCenter,
        ChangeLists,
        lists,
        removeLoading,
        loading,
        ChangeListName,
        listName,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
