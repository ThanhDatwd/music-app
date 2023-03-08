


import React, { Fragment } from 'react';
import Playlist from '../hook/Playlist';
import TitleApp from '../hook/TitleApp';

const Section = ({title='',playlists=[]}) => {
    return (

        <>
            <TitleApp title={title} view={'/top-100'}/>
            <div className='home-section' >
               {playlists===[]?'':playlists.map((p,i)=>{
                   return(
                       <Fragment key={i}>
                           <Playlist name={p.albumName} slug={p.albumSlug} image={p.thumbnail}/>
                       </Fragment>
                   )
               })}
            </div>
        </>
    );
}

export default Section;
