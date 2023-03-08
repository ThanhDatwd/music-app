

import React from 'react';
import { BsPlayCircleFill } from 'react-icons/bs'
import Media from '../hook/Media';

const Bxh = ({ songs = [], bxhName }) => {
    return (
        <div className='bxh'>
            {bxhName &&
                <header>
                    <h3>{bxhName}</h3>
                    <BsPlayCircleFill className='bxh-icon' />
                </header>
            }
            <div className='bxh-list'>
                {songs.length == 0 ? '' :
                    songs.map((song, index) => {
                        return (
                            <div key={index}>
                                <Media
                                    index={index + 1}
                                    rank={true} prevRank={song.oldRank} currentRank={index + 1}
                                    song={song}
                                    songs={songs}
                                />
                            </div>
                        )
                    })
                }
            </div>
            <footer>
                <button className='btn'>XEM THÊM</button>
            </footer>
        </div>

    );
}

export default Bxh;
