


import React from 'react';
import { Link } from 'react-router-dom';
import {songContext} from '../context/SongProvider';
const Currentsong = () => {
    const {playlist, setPlaylist,
        curentSong, setCurentSong,
        songIndex, setSongIndex}=React.useContext(songContext)
    const [poster,setPoster]=React.useState()
    const [songName,setSongName]=React.useState()
    const [mainSinger,setMainSinger]=React.useState()
    const [mainSingerLink,setMainSingerLink]=React.useState()
    const [combSinger,setCombSinger]=React.useState([])
    React.useEffect(()=>{
          setMainSinger(curentSong?.mainArtist[0]?.artistName) 
          setMainSingerLink(curentSong?.mainArtist[0]?.artistSlug)
          setPoster(curentSong?.poster)
          setSongName(curentSong?.songName)
          setCombSinger(curentSong?.combinedArt)
        
    },[curentSong])
    return (
        <div className='currentSong'>
            <div className='currentSong__image'>
                <img src={poster} alt="" />
            </div>
            <div className='currentSong__name-singer'>
               <Link to={'nghe-si/'+mainSingerLink}>{mainSinger}</Link>
               {combSinger&&combSinger.length>0?combSinger.map((item,index)=>{
                    return (
                        <span key={index}>
                            , <Link to={'/nghe-si/' + item.artistSlug}>{item.artistName}</Link>
                        </span>
                    )
               }):''}
            </div>
            <div className='currentSong__name-song'>
                {songName}
            </div>
        </div>
    );
}

export default Currentsong;
