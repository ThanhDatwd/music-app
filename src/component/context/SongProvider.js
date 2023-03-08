import React, { Children, memo } from 'react';
export const songContext=React.createContext()
export default memo(function SongProvider({ children }) {
    const [playlist, setPlaylist] = React.useState([]);
    const [curentSong, setCurentSong] = React.useState();
    const [songIndex, setSongIndex] = React.useState(0);
    const [curentSongSt,setCurentSongSt]=React.useState(false)
    const [curentAlbum,setCurentAlbum]=React.useState(0)
    const [songsListened,setSongsListened]=React.useState([])
    const [recentlyPlaylists,setRecentlyPlaylists]=React.useState([])
    return (
        <songContext.Provider value={{  
                                        playlist, setPlaylist,
                                        curentSong, setCurentSong,
                                        songIndex, setSongIndex,
                                        curentAlbum,setCurentAlbum,
                                        curentSongSt,setCurentSongSt,
                                        songsListened,setSongsListened,
                                        recentlyPlaylists,setRecentlyPlaylists
                                    }}>
            {children}
        </songContext.Provider>
    );
})

