


import React from 'react';
import Media from '../hook/Media';

const FavoriteSongs = ({ songs = [] }) => {
    return (
        <div>
            <div className='section-title'>
                <h3>Bài hát</h3>
            </div>
            {songs && songs.map((song,index) => {
                return (
                    <div key={index}>
                        <Media rank={false} song={song} songs={songs} />
                    </div>
                )
            })}
        </div>
    );
}

export default FavoriteSongs;
