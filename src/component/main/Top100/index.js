

import React from 'react';
import axios from 'axios'
import {songContext} from '../../context/SongProvider'
const Top100 = () => {
   const {songs}=React.useContext(songContext)
   const {setSongs}=React.useContext(songContext)
   const [a,setA]=React.useState([1,2,4,5,7])

    React.useEffect(()=>{
        try {
            axios.get('http://localhost:3001/api/songs')
                 .then(data=>{
                     setSongs(prevSong=>data.data)
                     
                     
                 })
        } catch (error) {
            
        }
        
    },[])
    const handelCheck=()=>{
        songs==[]? console.log('không có dữ liệu'): console.log('có')

    }
    return (
        <div className='top100' >
            { songs==[]? '': songs.map((song,index)=>{
              return <li key={index}>
                   {console.log(song)}
                   {`${song.songName}`}
                </li>
            })}
            <button onClick={handelCheck}>check</button>
        </div>
    );
}

export default Top100;
