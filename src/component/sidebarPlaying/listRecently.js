import React from 'react';
import { songContext } from '../context/SongProvider';
import Media from '../main/hook/Media';
const ListRecently = () => {
    const { songsListened, playlist,songIndex } = React.useContext(songContext)
    return (
        <div>
            {songsListened.length > 0 ?
                songsListened.map((song, index) => {
                    return (
                        <div key={index}>
                            <Media index={songIndex+1}
                                    song={song}
                                    songs={playlist}
                                    check={false}
                                />
                        </div>
                    )
                })
                : ''}
        </div>
    );
}

export default ListRecently;
