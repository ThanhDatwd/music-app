

import React, { Children } from 'react';
export const userContext=React.createContext()
export default function UserProvider({ children }) {
    const [user,setUser]=React.useState()
    const [loginSt,setLoginSt]=React.useState(false)
    return (
        <userContext.Provider value={{  
                                        user,setUser,
                                        loginSt,setLoginSt            
                                    }}>
            {children}
        </userContext.Provider>
    );
}

