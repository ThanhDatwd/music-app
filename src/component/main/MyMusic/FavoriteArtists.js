


import React from 'react';
import Artist from '../hook/Artist';
import TitleApp from '../hook/TitleApp';

const FavoriteArtists = ({artists=[]}) => {
    return (
        <div>
            <TitleApp title='Nghệ Sĩ'/>
            <div className='artists'>
            {
                    artists === [] ? '' : artists.map((artist, index) => {
                        return (
                            <div key={index}>
                                <Artist singer={artist.artistName}
                                    image={artist.avatar}
                                    follower={artist.follower}
                                    link={artist.artistSlug} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default FavoriteArtists;
