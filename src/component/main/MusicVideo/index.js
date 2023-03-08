import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Tooltip } from 'antd';
import { GrPlayFill } from 'react-icons/gr'
import { HiOutlineVolumeUp } from 'react-icons/hi'
import { BiSend } from 'react-icons/bi'
import { IoSettingsOutline, IoCloseSharp } from 'react-icons/io5'
import { MdOutlineFitScreen } from 'react-icons/md'
import './musicvideo.css'
import MvOfSinger from './mvOfSinger';
const MusicVideo = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1)
    }
    return (
        <div className='music-video-page'>
            <div className='music-video__container'>
                <div className='music-video__main'>
                    <div className='video-play video-main-left'>
                        <div className='artist-main'>
                            <div className='artist-info'>
                                <Avatar size='large' />
                                <div>
                                    <h4>Sơn Tùng Mtp</h4>
                                    <span>200 Follow</span>
                                </div>
                            </div>
                            <div className='artist-action'>
                                <button>follow</button>
                                <IoCloseSharp className='icon-close' onClick={handleGoBack} />
                            </div>
                        </div>
                        {/* phần  tên bài hát  */}
                        <div className='song-main'>
                            <span className='song-main__name'> có chắc đây là yêu </span>
                            <span className='song-main__viewer'>112K view</span>
                        </div>
                        {/* Phần video  */}
                        <div className='video-main'>
                            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/1jx-BcAu5i4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <div className='video-main__control'>
                            <GrPlayFill className='icon' />
                            <div className='video-main__progress-bar'>
                                <input type="range" value='0' step="0.01" min="0" max="100" />
                            </div>
                            <HiOutlineVolumeUp className='icon' />
                            <IoSettingsOutline className='icon' />
                            <MdOutlineFitScreen className='icon' />
                        </div>
                    </div>
                    <div className='video-main-right'>
                        <div className='close-bar' title="Đóng">
                            <IoCloseSharp className='icon' onClick={handleGoBack} />
                        </div>
                        {/* Phần comment bài hát */}
                        <div className='video-comment'>
                            <div className='video-comment__header'>
                                  comment <span></span>
                            </div>
                                <div className='video-comment__read'>
                                    <div className='video-comment__read-item'>
                                        <Avatar className='avatar' />
                                        <div className="content">
                                            <p> bài hát rất tuyệt vời chúc bạn luôn thành công trong những dự án tới </p>
                                            <div>
                                                <span className='author'>Thành đạt</span>
                                                <span className='date'>6/5/2022</span>
                                            </div>
                                        </div>
                                    </div>
                                  
                                </div>
                            <div className='video-comment__write'>
                                <input type="text"
                                    name=''
                                    placeholder='Viết bình luận...' />
                                <BiSend className='icon' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='music-video__list'>
                    <MvOfSinger/>
                </div>
            </div>

        </div>
    );
}

export default MusicVideo;
