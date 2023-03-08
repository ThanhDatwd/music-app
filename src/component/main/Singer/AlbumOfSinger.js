

import React from 'react';
import Playlist from '../hook/Playlist';
import TitleApp from '../hook/TitleApp';

const AlbumOfSinger = ({albums=[]}) => {
    return (
        <>
           <TitleApp title={'Album'} view={'/nghe-si'}/>
           <div className='album-of-singer'>
                
           </div>
        </>
    );
}

export default AlbumOfSinger;
