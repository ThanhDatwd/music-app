


   import React from 'react';
   import {BsMusicNoteBeamed} from 'react-icons/bs'
   import {RiBarChartHorizontalLine} from 'react-icons/ri'
   import {IoChevronDown} from 'react-icons/io5'
   import Video from '../hook/Video';
   import './musicvideos.css'
   
   const MusicVideos = () => {
       return (
           <div className='mv-page'>
               <div className='mv-page-option'>
                   <button className='btn btn-primary'> <BsMusicNoteBeamed/> TẤT CẢ <IoChevronDown/></button>
                   <button className='btn btn-primary'><RiBarChartHorizontalLine/> XEM NHIỀU <IoChevronDown/></button>
               </div>
               <div className="mv-page-videos">
                   <Video/>
                   <Video/>
                   <Video/>
                   <Video/>
               </div>
           </div>
       );
   }
   
   export default MusicVideos;
   