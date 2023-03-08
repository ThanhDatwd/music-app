


import React from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { userContext } from '../context/UserProvider';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FavArtist = () => {
    const [favoriteArtists, setFavoriteArtists] = React.useState()
    const { loginSt, user } = React.useContext(userContext)
    React.useEffect(() => {
        if (user) {
            const artistsId = user.favoriteArtists

            axios.post('artist/many', { data: artistsId })
                .then(res => {
                    setFavoriteArtists(res.data)
                })
        }
    }, [user])
    return (
        <div className='FavArtist'>
            <h4>Favorite Artist</h4>
            <article className='FavArtist__items'>
                {
                    favoriteArtists&&favoriteArtists.length>0? favoriteArtists.map((artist,index) => {
                        return (
                            <Link to={'/nghe-si/' + artist.artistSlug} className='FavArtist__item' key={index} >
                                <img src={artist.avatar} alt="" />
                                <div className='FavArtist__item-text'>
                                    <h5>{artist.artistName}</h5>
                                    <small>{artist.follower} * Người theo dõi</small>
                                </div>
                                <BiDotsHorizontalRounded className='FavArtist__item-icons' />
                            </Link>)

                    }) : ''
                }
            </article>
            <div className='FavArtist__viewMore'>view more</div>
        </div>
    );
}

export default FavArtist;
