

import React from 'react';

export const albumContext =React.createContext()
const AlbumProvider = ({children}) => {
    const [listChecked, setListChecked] = React.useState([])
    const [selectAll,setSelectAll]=React.useState(false)
    return (
       <albumContext.Provider value={{
                                       listChecked, setListChecked,
                                       selectAll,setSelectAll
                                     }} >
                            {children}          

       </albumContext.Provider>
    );
}

export default AlbumProvider;
