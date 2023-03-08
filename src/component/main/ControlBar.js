

import React, { Fragment } from 'react';
import { Tooltip } from 'antd';
import { AiOutlineHeart, AiOutlineYoutube } from 'react-icons/ai'
import { MdOutlineQueueMusic } from 'react-icons/md'
import { BsPauseCircle, BsPlayCircle } from 'react-icons/bs'
import { BiSkipPrevious, BiSkipNext, BiLoader } from 'react-icons/bi'
import { HiOutlineVolumeUp, HiOutlineVolumeOff } from 'react-icons/hi'
import { IoRefreshOutline, IoRepeatOutline } from 'react-icons/io5'
import { songContext } from '../context/SongProvider';
import { statusContext } from '../context/StatusProvider';
import { userContext } from '../context/UserProvider';
import { HandleChangeFavoriteSong, ToastApp } from './hook/SideEffect';

import axios from 'axios';


const Control = () => {
    let indexLoadTimeUpdate = React.useRef(0)
    const { loginSt, user, setUser } = React.useContext(userContext)
    const { playlist, setPlaylist,
        curentSong, setCurentSong,
        songIndex, setSongIndex,
        curentSongSt, setCurentSongSt, st } = React.useContext(songContext)

    const { statusSidebarRight, setStatusSidebarRight, handelEffectClose } = React.useContext(statusContext)
    const [songStatus, setSongStatus] = React.useState(false);
    const [soundStatus, setSoundStatus] = React.useState(true);
    const [isLoop, setIsLoop] = React.useState(false)
    const [isRepeat, setIsRepeat] = React.useState(false)
    const [isLoading,setIsLoading]=React.useState(true)
    const processRef = React.useRef()
    const processVolRef = React.useRef()
    const soundBar = React.useRef()
    const soundDot = React.useRef()
    const currentTimeRef = React.useRef()
    const endTimeref = React.useRef()
    const audio = React.useRef()
    const [isFavorite, setIsFavorite] = React.useState(false)

    const btnIsListPlaying = React.useRef()

    const handlePlay = () => {
        audio.current.play()

    }
    const handlePause = () => {
        audio.current.pause()
    }

    const handleTime = () => {
        processRef.current.value = audio.current.currentTime / audio.current.duration * 100

        let curentTimeMin = Math.floor(audio.current.currentTime / 60)
        let curentTimeSec = Math.floor(audio.current.currentTime % 60)
        if (curentTimeSec < 10) {
            curentTimeSec = `0${curentTimeSec}`
        }
        currentTimeRef.current.innerHTML = `${curentTimeMin}:${curentTimeSec}`

        let endTimeMin = Math.floor(audio.current.duration / 60)
        let endTimeSec = Math.floor(audio.current.duration % 60)
        if (endTimeSec < 10) {
            endTimeSec = `0${endTimeSec}`
        }
        endTimeref.current.innerHTML = `${endTimeMin}:${endTimeSec}`

        // UPDATE LƯỢT NGHE CỦA BÀI  HÁT KHI NGHE TRÊN 60% THỜI LƯỢNG
        if ((Math.floor(processRef.current.value)) == 60 && indexLoadTimeUpdate.current == 0) {
            indexLoadTimeUpdate.current += 1
            if (curentSong) {
                axios.put('songs/' + curentSong.songId)
                    .then(res => console.log(res.data))
            }
        }

    }
    const handleOnInPut = (e) => {
        const seekTime = audio.current.duration / 100 * e.target.value
        audio.current.currentTime = seekTime
        audio.current.play()
        setSongStatus(true)
    }
    const handleNextSong = () => {
        if (songIndex >= playlist.length - 1) {
            setSongIndex(0)
            setCurentSong(playlist[0])

        }
        else {
            setSongIndex(songIndex + 1)
            setCurentSong(playlist[songIndex + 1])
        }
        setCurentSongSt(true)
    }
    const handlePrevSong = () => {
        if (songIndex <= 0) {
            setSongIndex(playlist.length - 1)
            setCurentSong(playlist[playlist.length - 1])

        }
        else {
            setSongIndex(songIndex - 1)
            setCurentSong(playlist[songIndex - 1])
        }
        setCurentSongSt(true)
    }
    const handleOnPlay = () => {
        setCurentSongSt(true)
    }
    const handleOnPause = () => {
        setCurentSongSt(false)
    }
    const handleEnded = () => {
        if (isRepeat) {
            // handlePlay()
        }
        else {
            handleNextSong()
        }

    }
    const handleChangeVol = (e) => {
        let volume = e.target.value
        audio.current.volume = volume
        soundBar.current.style.width = `${volume * 100}%`
        soundDot.current.style.left = `${volume * 100}%`
        if (volume <= 0) {
            setSoundStatus(false)
        }
        else {
            setSoundStatus(true)
        }
    }
    // Ẩn hiện tab danh sách đang phát 
    const handleDisplaySidebar = () => {
        setStatusSidebarRight(!statusSidebarRight)
    }
    // Thay đổi trạng thái yêu thích
    const handleChangeFavoriteSong = () => {

        if (curentSong) {
            const status = HandleChangeFavoriteSong(curentSong.songId, isFavorite, loginSt, user)
            status.then(res => {
                setUser({ ...user, favoriteSongs: res })
                setIsFavorite(!isFavorite)
            })
        }
        else {
            ToastApp('error', 'Vui lòng chọn bài hát ')
        }
    }
    React.useEffect(() => {
        // Thay đổi trạng thái khi bài hát thay đổi 

        if (curentSongSt) {
            handlePlay()
            setSongStatus(true)
        }
        else {
            handlePause()
            setSongStatus(false)
        }
        if (loginSt && user) {
            if (user.favoriteSongs.includes(curentSong?.songId)) {
                setIsFavorite(true)
            }
        }
    }, [curentSong, curentSongSt])
    React.useEffect(()=>{
        setIsLoading(true)
    },[curentSong])
    return (
        <div className='controlBar'>
            {/* PHẦN HIỂN THỊ BÀI  HÁT  */}
            <div className='controllBar_infoSong'>
                <div className={curentSongSt ? "thumb active" : "thumb"}>
                    {curentSong && <img src={curentSong.poster} alt="" />}
                </div>
                <div className='info'>
                    {curentSong && <h5>{curentSong.songName}</h5>}
                    {curentSong && <li className='auth'>
                        {curentSong?.mainArtist[0]?.artistName + " "}
                        {curentSong.combinedArt.map((item, index) => {
                            return (
                                <Fragment key={index}>
                                    ,{item.artistName}
                                </Fragment>
                            )
                        })}
                    </li>}
                </div>
            </div>
            {/* PHẦN HIỂN THỊ CÁC NÚT ĐIỀU KHIỂN */}
            <div className='controlBar__buttons'>
                <div className='controlBar__option'>
                    <Tooltip title='thêm vào thư viện'>
                        <AiOutlineHeart
                            className={isFavorite ? 'controlBar__icon active' : 'controlBar__icon'}
                            onClick={handleChangeFavoriteSong} />
                    </Tooltip>
                    {/* danh sách đang phát  */}
                    <span ref={btnIsListPlaying}>
                        <Tooltip title='danh sách phát'>
                            <MdOutlineQueueMusic
                                className={statusSidebarRight ? 'controlBar__icon active' : 'controlBar__icon'}
                                onClick={handleDisplaySidebar}
                            />
                        </Tooltip>
                    </span>
                    <Tooltip title='mv'>
                        <AiOutlineYoutube className='controlBar__icon' />
                    </Tooltip>
                </div>
                <div className='controlBar__control'>
                    <IoRefreshOutline className={isRepeat ? 'btn-repeat active' : 'btn-repeat'} onClick={() => setIsRepeat(!isRepeat)} />
                    <BiSkipPrevious className='controlBar__icon' onClick={handlePrevSong} />
                    
                    {
                    isLoading===true?
                                <div className='play_loading'>
                                   <div class="spinner-1"></div>
                                </div>
                                :songStatus ? <BsPauseCircle
                                    className='controlBar__icon'
                                    onClick={() => {
                                        setSongStatus(false)
                                        handlePause()
                                    }}
                                />
                                    : <BsPlayCircle
                                        className='controlBar__icon'
                                        onClick={() => {
                                            setSongStatus(true)
                                            handlePlay()
                                        }} />}
                   
                    <BiSkipNext className='controlBar__icon next-song' onClick={handleNextSong} />
                    <IoRepeatOutline className={isLoop ? 'btn-loop active' : 'btn-loop'} onClick={() => setIsLoop(!isLoop)} />
                </div>
                {/* KHU VỰC ÂM LƯỢNG */}
                <span className='controlbar_sound'>
                    <Tooltip className='controlBar__sound' title='âm lượng'>
                        {soundStatus ? <HiOutlineVolumeUp className='controlBar__icon' /> : <HiOutlineVolumeOff className='controlBar__icon' />}
                        <>
                            <div id='sound'>
                                <input className="process_sound" onInput={handleChangeVol} ref={processVolRef} type="range" min="0" max="1" step="0.01" value="1" />
                                <div className="sound_bar" ref={soundBar}></div>
                                <div className="sound_dot" ref={soundDot}></div>
                            </div>
                        </>
                    </Tooltip>
                </span>
            </div>
            <div className='process__area'>
                <div className='process__area-Ctime' ref={currentTimeRef} >0:00</div>
                <div className='process__bar'>
                    <input className="process" type="range" ref={processRef} onInput={handleOnInPut} value='0' step="0.01" min="0" max="100" />
                    {/* <div className='process2'></div> */}
                </div>
                <div className='process__area-Etime' ref={endTimeref} >0:00</div>
            </div>
            <audio onTimeUpdate={handleTime}
                onCanPlay={() => {setIsLoading(false) }}
                // onLoadedData={()=>{setIsLoading(false) }}
                onPlay={handleOnPlay}
                onPause={handleOnPause}
                onEnded={handleEnded}
                ref={audio}
                src={curentSong ? curentSong.audio : "https://drive.google.com/uc?export=download&id=1a-yzLOeLpC7in_Oq2J_iDqCWSH7JashK"}>

            </audio>
        </div>

    );
}

export default Control;
