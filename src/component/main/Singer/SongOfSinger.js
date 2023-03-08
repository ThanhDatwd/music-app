


import React from 'react';
import Media from '../hook/Media';
import TitleApp from '../hook/TitleApp';
import SlideSong from './SlideSong';

const SongOfSinger = ({SongOfSinger=[],mainArt={}}) => {
    const songs=[]
    return (
        <div>
            <TitleApp title={'Bài hát nổi bật'} />
            <div className='song-of-singer'>
                <div className='song-of-singer__slide' >
                     <SlideSong songsOfSinger={SongOfSinger}/>
                </div>
                <div className='song-of-singer__list' >
                {
                       
                        SongOfSinger===[]?'':
                        SongOfSinger.map((song,index)=>{
                            // const songNew={...song,mainArtist:[mainArt]}
                            //       songs.push(songNew)
                            return(
                                <div key={index}>
                                    <Media index={index+1}
                                           song={song}
                                           songs={SongOfSinger}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default SongOfSinger;
