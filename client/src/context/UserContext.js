import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    return <UserContext.Provider value={{ name, phone, setName, setPhone }}>
        {props.children}
    </UserContext.Provider>
}

export default UserContextProvider;