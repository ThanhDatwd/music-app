import React from 'react';
import { songContext } from '../context/SongProvider';
import Media from '../main/hook/Media';

const ListPlaying = () => {
    const { playlist, songIndex, 
            curentAlbum,} = React.useContext(songContext)
    return (
        <div>
            {playlist.length > 0 ?
                playlist.map((song, index) => {
                    if (index <= songIndex) {
                        return (
                            <div key={index}>
                                <Media index={index + 1}
                                    song={song}
                                    songs={playlist}
                                    albumId={curentAlbum} 
                                    check={false}/>
                            </div>
                        )
                    }
                })
                : ''}
            {/* Danh sách bài hát tiếp theo */}
            <div className='nextSongList'>
                <h4>Tiếp theo</h4>
                <p>Từ playlist <span className='playlistName'>Bài hát gây nghiện</span> </p>
                {playlist.length > 0 ?
                    playlist.map((song, index) => {
                        if (index > songIndex) {
                            return (
                                <div key={index}>
                                    <Media index={index + 1}
                                        song={song}
                                        songs={playlist}
                                        albumId={curentAlbum}
                                        check={false} />
                                </div>
                            )
                        }

                    })
                    : ''}
            </div>
        </div>
    );
}

export default ListPlaying;
