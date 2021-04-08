import { createContext, useState, useEffect } from 'react';
import { auth } from '../services/firebase';

export const UserContext = createContext();

const UserContextProvider = props => {
    const [user, setUser] = useState(null);
    
      useEffect(() => {
        auth.onAuthStateChanged(userInfo => {
          setUser(userInfo);
        });
      }, []);

      return (
          <UserContext.Provider value={{user, setUser}}>
              {props.children}
          </UserContext.Provider>
      )
}

export default UserContextProvider;