


import React from 'react';
import { BsThreeDots } from 'react-icons/bs'
import Media from '../main/hook/Media';
import { statusContext } from '../context/StatusProvider';
import './sidebarPlaying.css'
import ListPlaying from './listPlaying';
import ListRecently from './listRecently';

const SidebarPlaying = () => {
    const {statusSidebarRight,setStatusSidebarRight,handelEffectClose}= React.useContext(statusContext)
    const [stListPlaying,setStListPlaying] =React.useState(true)
    const sidebarPlaying=React.useRef()
    React.useEffect(()=>{
        let cleanup = handelEffectClose(sidebarPlaying.current,setStatusSidebarRight)
        return ()=>{
            cleanup()
        }
     },[])
    return (
        <div ref={sidebarPlaying} className={statusSidebarRight?'sidebarPlaying active':'sidebarPlaying'}>
            <div className='header'>
                <div className='option_display'>
                     <button onClick={()=>setStListPlaying(true)}
                             className={stListPlaying?'active':''}
                             >Danh sách phát</button>
                     <button onClick={()=>setStListPlaying(false)}
                             className={stListPlaying?'':'active'}
                             >Nghe gần đây</button>
                </div>
                <BsThreeDots/>
            </div>
             <div className='list-playing'>
                 {
                     stListPlaying?<ListPlaying />: <ListRecently/>
                 }
                 
             </div>
        </div>
    );
}

export default SidebarPlaying;
