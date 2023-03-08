


import React from 'react';
import { BsPlayCircle } from 'react-icons/bs'
import { IoCloseOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom';
import './video.css'
const Video = ({ thumb, avatar, song, singer, duration }) => {
    const a = 'sdad'
    return (
        <Link to={'/music-video/' + a} className='video'>
            <div className='video__thumb'>
                <img src="https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg" alt="" />
                <BsPlayCircle className='video-icon-play' />
                <IoCloseOutline className='video-icon-close' />
                <div className='video__duration'> 05:24</div>
            </div>
            <div className='video__content'>
                <div className='video__content-avatar'>
                    <img src="https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg" alt="" />
                </div>
                <div className='video__content-text'>
                    <h4>Anh Đợi được mà</h4>
                    <div className='auth-list'>
                        <Link to={'/nghe-si'}>MR.Siro</Link>
                    </div>
                    
                </div>
            </div>
        </Link>
    );
}

export default Video;
