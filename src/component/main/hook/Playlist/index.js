


import React, { memo } from 'react';

import { Link } from 'react-router-dom';
import {BsPlayCircle,BsThreeDots} from 'react-icons/bs'
import {AiOutlineClose} from 'react-icons/ai'
import './playlist.css'

const Playlist = ({image='',name='',auth,slug=''}) => {
    return (
        <Link to={'/album/'+slug} className='playlist-item '>
            <div className='playlist-item-thumb'>
                <img src={image} alt="" />
                <div className='playlist-item-option'>
                    <AiOutlineClose />
                    <BsPlayCircle />
                    <BsThreeDots />
                </div>
            </div>
            <div className='playlist-item-content'>
                <h3>{name}</h3>
                {auth&& <div className='auth-list'>
                          <Link to={'/nghe-si'}>{auth}</Link>,
                        </div>}
                
            </div>
        </Link>
    );
}

export default memo(Playlist);
