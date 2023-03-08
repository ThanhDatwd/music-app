


import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import Media from '../hook/Media';
import Playlist from '../hook/Playlist';
import SongCard from '../hook/SongCard';
import TitleApp from '../hook/TitleApp';
import Video from '../hook/Video';
import './search.css'

const Search = () => {
    
    const {value}=useParams('')
    const [result,setResult]=React.useState()
    // React.useEffect(()=>{
    //     axios.get('http://localhost:3001/api/page/search/' + value)
    //          .then(data=>{
    //              const songs=data.data.songs
    //              console.log(data.data.songs)
    //              setResult({...songs[0],mainArtist:songs[0].mainArtist[0].artistName})
    //          })
    // },[value])
    // console.log(result)
    return (
        <div className='search-page'>
            <div className='search-result-area'>
                <TitleApp title={'Kết quả tìm kiếm:' + value}/>
                <div className='search-result-page'>
                    {/* {result&&<SongCard song={result} />} */}
                   
                </div>
            </div>
            <div className='search-song-area'>
                <TitleApp title={'Bài hát'}/>
                {/* <Media/> */}
            </div>
            <div className='search-playlist-area'>
                <TitleApp title={'playlist'}/>
                <div  className='playlists'>
                    <Playlist/>
                </div>
            </div>
            <div className='search-mv-area'>
                <TitleApp title={'MV'}/>
                <div className='videos'>
                    <Video/>
                </div>
            </div>
        </div>
    );
}

export default Search;
