


import React, { Fragment, memo } from 'react';
import Playlist from '../hook/Playlist';
import { songContext } from '../../context/SongProvider';
import TitleApp from '../hook/TitleApp';

const Recently = ({playlists=[]}) => {
    const {recentlyPlaylists} = React.useContext(songContext)
    return (
        <div className='recently'>
            <TitleApp title='Nghe gần đây'/>
            <div className='grid-slide' >
               {recentlyPlaylists===[]?'':recentlyPlaylists.map((p,i)=>{
                   return(
                       <Fragment key={i}>
                           <Playlist name={p.albumName} slug={p.albumSlug} image={p.thumbnail}/>
                       </Fragment>
                   )
               })}
            </div>
           
        </div>
    );
}
export default memo(Recently);
