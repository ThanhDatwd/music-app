

import React from 'react';
import { BiSortAlt2, BiDotsHorizontalRounded } from 'react-icons/bi'
import { MdPlaylistAdd } from 'react-icons/md'
import axios from 'axios';
import './albumNav.css'
import { ToastApp } from '../SideEffect';
import { songContext } from '../../../context/SongProvider';
const AlbumNav = ({ listChecked = [] , selectAll=false, songs=[] ,handleSetSelectAll=false,
                    handleSort=false
                 }) => {
    const {playlist,setPlaylist}=React.useContext(songContext)
    const [sort,setSort] =React.useState(false)
    const handleCheck=()=>{
        if(typeof handleSetSelectAll=='function'){
           handleSetSelectAll()
        }
    }
    // PHẦN THÊM BÀI HÁT ĐÃ CHỌN VÀO DANH SÁCH ĐANG PHÁT
    const handleAddPlaying= async ()=>{
        let currentSongs=[]
        currentSongs=playlist.map((song)=>{
            return song.songId
        })
        console.log(playlist)
        let newListChecked= listChecked.filter(songCheck=>{
            return !currentSongs.includes(songCheck)
        })
        if(newListChecked.length>0){
            await axios.post('songs/many',{data:newListChecked})
                .then(res=>{
                    const songs=res.data||[]
                    console.log(songs)
                    if(songs.length>0){
                        setPlaylist(prevList=>[...prevList,...songs])
                        ToastApp('success',`Đã thêm ${songs.length} bài hát vào danh sách đang phát`)
                    }
                })
        }
    }
    const handleCheckSort=(method)=>{
        if(typeof handleSort=='function'){
            handleSort(method)
            setSort(false)
         }
    }
    return (
        <div className='albumNav'>
            <div className='albumNav-left'>
                {listChecked.length>0 
                            ?<div className='albumNav-left__check'>
                                <input type="checkbox" 
                                       checked={selectAll}
                                       onChange={handleCheck}
                                     />
                                <div className='albumNav-left__addPlaying'
                                     onClick={handleAddPlaying} >
                                    <MdPlaylistAdd className='icon'/>
                                    <div>Thêm vào danh sách phát</div>
                                </div>
                                <BiDotsHorizontalRounded className='albumNav-left__orther'/>
                            </div>
                            :<div className='albumNav-left__sort'>
                                    <BiSortAlt2 className='icon-sort' onClick={()=>setSort(!sort)} />
                                    <div>BÀI HÁT</div>
                                    {sort&&
                                        <div className='option-sort'>
                                            <li>Mặc định</li>
                                            <li onClick={()=>handleCheckSort('song')}>Tên bài hát {'(A - Z)'} </li>
                                            <li onClick={()=>handleCheckSort('singer')}>Tên Ca sĩ {'(A - Z)'} </li>
                                        </div>
                                    }
                            </div>
                }

            </div>
            <div className='albumNav-right'>
                THỜI GIAN
            </div>
        </div>
    );
}

export default AlbumNav;
