

import React from 'react';
import Main from './main';
import SidebarLeft from './sidebarLeft';
import SidebarRight from './sidebarRight';
import './index.css'
import moment from 'moment';
import { songContext } from './context/SongProvider'
import { userContext } from './context/UserProvider';
import axios from 'axios';
import SidebarPlaying from './sidebarPlaying';

const AppMuic = () => {
    moment.locale('vi')
    const { curentSong,setSongsListened,setRecentlyPlaylists } = React.useContext(songContext)
    const {loginSt,user,setLoginSt, setUser } = React.useContext(userContext)
    React.useEffect(() => {
        axios.post('user/info')
            .then(res => {
                if (res) {
                    const data = res.data
                    setLoginSt(true)
                    setUser(data)
                }
                else {
                    setLoginSt(false)
                }
            })
    }, [])
    React.useEffect(async () => {
        const songsId = JSON.parse(localStorage.getItem('recentlySongs')) || []
        const playlistId=JSON.parse(localStorage.getItem('recentlyPlaylists')) || []
        console.log(playlistId)
        if (songsId.length > 0) {
           await axios.post('songs/many', {data:songsId})
                .then(res => {
                    setSongsListened(res.data)
                })
        }
        if (playlistId.length > 0) {
           await axios.post('albums/many', {data:playlistId})
                .then(res => {
                    console.log(res.data)
                    setRecentlyPlaylists(res.data)
                })
        }

    },[curentSong])

    return (
        <div className='app container'>
            <SidebarLeft />
            <Main />
            <SidebarRight />
            <SidebarPlaying />
        </div>
    );
}

export default AppMuic;
