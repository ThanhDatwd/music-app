

import React, { Fragment } from 'react';
import { HiOutlinePlus } from 'react-icons/hi'
import ModalApp from '../hook/ModalApp';
import Playlist from '../hook/Playlist';
import {BsToggleOn,BsToggleOff} from 'react-icons/bs'
import {IoClose} from 'react-icons/io5'
import axios from 'axios';
import { userContext } from '../../context/UserProvider';
import { ToastApp } from '../hook/SideEffect';
import TitleApp from '../hook/TitleApp';


const FavoritePlaylists = ({ playlists = [] , all=true}) => { 

    const [playlistState,setPlayListState]=React.useState([])
    

    const {loginSt,user}=React.useContext(userContext)
    const [statusModal, setStatusModal] = React.useState(false)
    const [checkPuclicAddPlaylist,setCheckPuclicAddPlaylist]=React.useState(true)
    const [checkRandomAddPlaylist,setCheckRandomAddPlaylist]=React.useState(true)
    const [nameAddPlaylist,setNameAddPlaylist]=React.useState('')

    const handleModalStatus = () => {
        setStatusModal(!statusModal)
    }
    const handleCreatePlaylist= async ()=>{
       if(loginSt===true){
              await axios.post('http://localhost:3001/api/albums',
              {
                  data:{
                      name :nameAddPlaylist,
                      userId:user.userId,
                      isPuclic:checkPuclicAddPlaylist,
                      isRandom:checkRandomAddPlaylist
                  }
              })
              .then((res)=>{
                    console.log(res.data)
                    setNameAddPlaylist('')
                    handleModalStatus()
              })
         return
       }
       ToastApp('error','Vui lòng đăng nhập để thực hiện chức năng này !!!')
    }
    
   
    React.useEffect(()=>{
        if(all===false){
            const newlist=playlists.slice(0,4)
            setPlayListState(newlist)
            return
        }
        setPlayListState(playlists)


    },[playlists])
    return (
        <div className='mymusic__playlist'>
            <TitleApp title={'Playlist'}/>
            <div className='playlist'>
                {all&& <div className='playlist-item add' onClick={handleModalStatus}>
                         <HiOutlinePlus className='icon-plus' />
                         <h4>Tạo playlist mới</h4>
                       </div>}
                {playlists && 
                    playlistState.map((playlist, index) => {
                    return (
                        <Fragment key={index}>
                            <Playlist name={playlist.albumName} slug={playlist.albumSlug} image={playlist.thumbnail} />
                        </Fragment>
                    )
                })}
            </div>
            <ModalApp status={statusModal}>
                <div className='formAddPlaylist'  >
                    <IoClose className='btnClose' onClick={handleModalStatus}/>
                    <h3 className='title'>Tạo playlist mới </h3>
                    <input type="text" 
                           placeholder='Nhập tên Playlist'
                           value={nameAddPlaylist}
                           onChange={(e)=>setNameAddPlaylist(e.target.value)} />
                    <div className='formAddPlaylistCheck Public'>
                        <div className='text'>
                            <h4>Công Khai</h4>
                            <span>Mọi người có thể thấy playlist này</span>
                        </div>
                         {
                           checkPuclicAddPlaylist
                           ?
                           <BsToggleOn className='btnCheckIcon' onClick={()=>setCheckPuclicAddPlaylist(false)}/>
                           :
                           <BsToggleOff className='btnCheckIcon' onClick={()=>setCheckPuclicAddPlaylist(true)}/>
                         }
                    </div>
                    <div className='formAddPlaylistCheck PlayRandom'>
                        <div className='text'>
                            <h4>Phát ngẫu nhiên</h4>
                            <span>Luôn phát ngẫu nhiên tất cả bài hát </span>
                        </div>
                         {
                            checkRandomAddPlaylist
                            ?
                            <BsToggleOn className='btnCheckIcon' onClick={()=>setCheckRandomAddPlaylist(false)}/>
                            :
                            <BsToggleOff className='btnCheckIcon' onClick={()=>setCheckRandomAddPlaylist(true)}/>
                         }
                    </div>
                    <button disabled={nameAddPlaylist!==""?false:true} className='btn-primary btnCreate' onClick={handleCreatePlaylist} >TẠO MỚI</button>
                </div>
            </ModalApp>
        </div>
    );
}

export default FavoritePlaylists;
