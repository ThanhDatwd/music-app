

import React from 'react';
import './newSongs.css'
import { IoPlanetOutline } from 'react-icons/io5'
import Media from '../hook/Media';
import axios from 'axios';
import TitleApp from '../hook/TitleApp';
const NewSongs = ({rank=true,limit=100}) => {
    const [songs, setSongs] = React.useState([])

    React.useEffect(() => {
        axios.get(`songs/?limit=${limit}`)
            .then(data => setSongs(data.data))
    }, [])
    return (
        <div className='newSongs__items'>
            <TitleApp title={'Nhạc mới phát hành'}/>
            {songs.length == 0 ? '' :
                songs.map((song, index) => {
                    return (
                        <div key={index}>
                            <Media
                                index={index+1}
                                rank={rank} prevRank={song.oldRank} currentRank={song.newRank}
                                song={song}
                                songs={songs}
                            />
                        </div>
                    )
                })

            }
        </div>

    );
}

export default NewSongs;
