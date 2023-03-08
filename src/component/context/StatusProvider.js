

import React, { Children } from 'react';
export const statusContext=React.createContext()
export default function StatusProvider({ children }) {
    const [statusSidebarRight,setStatusSidebarRight]=React.useState(false)
    const [statusSidebarMenu,setStatusSidebarMenu]=React.useState(false)
    // HÀM XỬ LÝ ĐÓNG 
    const handelEffectClose=(element,method)=>{
        let handelSiteEffect = (e)=>{
            if(element){
                if (!element.contains(e.target)) {
                    method(false);
                }
            }
        }
        document.addEventListener('mousedown',handelSiteEffect)
        return ()=>{
            document.removeEventListener('mousedown',handelSiteEffect)
        }
    }
   
    return (
        <statusContext.Provider value={{  
                                        statusSidebarRight,setStatusSidebarRight,
                                        statusSidebarMenu,setStatusSidebarMenu,
                                        handelEffectClose
                                    }}>
            {children}
        </statusContext.Provider>
    );
}

