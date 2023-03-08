

import React from 'react';
import { Routes,Route,Link } from 'react-router-dom';
import './main.css'
import Control from './ControlBar';
import SearchBar from './SearchBart';
import Home from './Home';
import NewSongs from './NewSongs';
import Album from './Album';
import MyMusic from './MyMusic';
import Trending from './Trending';
import Search from './Search';
import News from './News';
import MusicVideos from './MusicVideos';
import Singer from './Singer';
import Top100 from './Top100';
import MusicVideo from './MusicVideo';
import Login from '../Login';


const Main = () => {
    return (
        
        <div className='main__container'>
          <SearchBar/>
          <div className='components__render'>
          <Routes>
                  <Route path='/' element={<Home/>}/>
                  <Route path='/nhac-moi' element={<NewSongs/>}/>
                  <Route path='/album/' element={<Home/>}/>
                  <Route path='/album/:name' element={<Album/>}/>
                  <Route path='/mymusic' element={<MyMusic/>}/>
                  <Route path='/mymusic/library/:category' element={<MyMusic/>}/>
                  <Route path='/trending' element={<Trending/>}/>
                  <Route path='/tim-kiem' element={<Search/>}/>
                  <Route path='/tim-kiem/:value' element={<Search/>}/>
                  <Route path='/news' element={<News/>}/>
                  <Route path='/music-videos' element={<MusicVideos/>}/>
                  <Route path='/music-video/:name' element={<MusicVideo/>}/>
                  <Route path='/nghe-si/:name' element={<Singer/>}/>
                  <Route path='/top100' element={<Top100/>}/>
                  <Route path='/login' element={<Login/>}/>
          </Routes>
            
          </div>
          <Control/>
        </div>
    );
}

export default Main;
