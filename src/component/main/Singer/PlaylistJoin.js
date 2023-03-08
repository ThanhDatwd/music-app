


import React from 'react';
import Playlist from '../hook/Playlist';
import TitleApp from '../hook/TitleApp';

const PlaylistJoin = ({playlists=[]}) => {
    return (
        <>
        {playlists.length===0?'':
        <>
           <TitleApp title={'Xuất hiện trong'}/>
           <div className='mv-of-singer'>
              <Playlist/>
           </div>
        </>}
        
        
        </>
    );
}

export default PlaylistJoin;
