


import React from 'react';
import './sidebarLeft.css'
import Menucollection from './menuCollection';
import Menumain from './menuMain';
import User from './user';
import { GrClose } from 'react-icons/gr'
import { statusContext } from '../context/StatusProvider';



const SidebarLeft = () => {
    const sideBarLeftRef=React.useRef()
    const {statusSidebarMenu,setStatusSidebarMenu,handelEffectClose}=React.useContext(statusContext)
    React.useEffect(()=>{
        let cleanup = handelEffectClose(sideBarLeftRef.current,setStatusSidebarMenu)
        return ()=>{
            cleanup()
        }
     },[])
    return (
        <div ref={sideBarLeftRef} className= {statusSidebarMenu?"sideBarLeft__container active":"sideBarLeft__container "}>
                <div className='sideBarLeft_close'
                     onClick={()=>setStatusSidebarMenu(false)}
                     >
                    <GrClose />
                </div>
            <div className='sideBarLeft'>
                <div className='app__logo'>Logo</div>
                <Menumain />
                <Menucollection />
                <User />
            </div>

        </div>
    );
}

export default SidebarLeft;
