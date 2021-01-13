import React from 'react';
import dummyData from './dummyData';

const Context = React.createContext({
    currentChar: "0-0-0",
    currentUser: 1,
    dummyData
})

export default Context;