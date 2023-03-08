

import React from 'react';
import SongCard from '../hook/SongCard';
import { Link, useParams } from 'react-router-dom';
import {BsDot} from 'react-icons/bs'
import axios from 'axios';

import './singer.css'
import SongOfSinger from './SongOfSinger';
import AlbumOfSinger from './AlbumOfSinger';
import MvOfSinger from './MvOfSinger';
import PlaylistJoin from './PlaylistJoin';
import { userContext } from '../../context/UserProvider';
import { HandleChangeFavoriteArtist, ToastApp } from '../hook/SideEffect';



const Singer = () => {
     
    const {loginSt,user,setUser}=React.useContext(userContext)
    const [isFavorite,setIsFavorite]=React.useState(false)
    
    const {name} = useParams()
    const [artist,setAtist]=React.useState({})
    const [songsOfArt,setSongsOfArt]=React.useState([])
    const [latestSong,setLatestSong]=React.useState()
    const [albums,setAlbums]=React.useState([])

    const handleChangeFavoriteArtist=()=>{
        const status = HandleChangeFavoriteArtist(artist?.artistId, artist?.follower , isFavorite, loginSt, user)
        status.then(res => {
            setUser({ ...user, favoriteArtists: res })
            setIsFavorite(!isFavorite)
        })
        // ToastApp('xin chào mọi người')
    }
    React.useEffect(()=>{
          axios.get("artist/"+name)
               .then(data=>{
                   setAtist(data.data.artist)
                   const songs=data.data.songs
                   const songSort=songs.sort((a, b) => (a.realease > b.realease) ? 1 : -1)
                   setSongsOfArt(
                        songSort.map(song=>{
                            return {...song,mainArtist:[data.data.artist]}
                        })
                   )
                   setLatestSong({...songs[0],mainArtist:[data.data.artist]})
               })
              
    },[name])
    React.useEffect(()=>{
        if (loginSt && user) {
            if (user.favoriteArtists.includes(artist.artistId)) {
                setIsFavorite(true)
            }
        }
    },[loginSt, user,artist])
    return (
        <>
            <div className='artist-hero'>
                <div className='artist-info'>
                    <h2 className='artist-info-name'>{artist.artistName}</h2>
                    <div className='artist-biography'>
                       {artist.biography}
                    </div>
                    <div className='artist-btn'>
                        <button className='btn btn-primary'>Phát nhạc</button>
                        <button className={isFavorite===true?'btn btn-primary':'btn'}
                                onClick={handleChangeFavoriteArtist}> {isFavorite===true?'ĐÃ QUAN TÂM':'QUAN TÂM'} <BsDot/> 
                                {artist.follower}
                        </button>
                                         
                        
                    </div> 
                    <div className='artist-lastSong'>
                        {latestSong&&<SongCard song={latestSong} />}
                    </div>
                </div>
                <div className='artist-image'>
                    <img src={artist.avatar} alt="" />
                </div>
            </div>
            <SongOfSinger SongOfSinger={songsOfArt} mainArt={artist}/>
            {albums.length>0?<AlbumOfSinger/>:''}
            <MvOfSinger/>
            <PlaylistJoin playlists={songsOfArt}/>
        </>

    );
}

export default Singer;
