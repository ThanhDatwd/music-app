
import React, { memo } from 'react';
import './media.css'
import { IoCaretUpOutline, IoCaretDownOutline, IoPlaySharp } from 'react-icons/io5'
import { BsThreeDots } from 'react-icons/bs'
import { AiOutlineYoutube, AiTwotoneHeart, AiOutlineHeart ,AiOutlinePlus} from 'react-icons/ai'
import { IoMusicalNotesOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { songContext } from '../../../context/SongProvider';
import { userContext } from '../../../context/UserProvider';
import { ToastApp, HandleChangeFavoriteSong } from '../SideEffect';
import BoxContent from '../BoxContent';
import { Tooltip } from 'antd';


const Media = ({ check=true, listChecked = [], handleCheck = false, add=false,
                option = true, rank, prevRank = 2, currentRank = 1, column=false,
                index, song = {}, songs = [], albumId,album={} }) => {
    const [isFavorite, setIsFavorite] = React.useState(false)
    const { loginSt, user, setUser } = React.useContext(userContext)
    const { setPlaylist, playlist,
        curentSong, setCurentSong,
        setSongIndex, songIndex,
        curentSongSt, setCurentSongSt,
        setCurentAlbum } = React.useContext(songContext)

    const { songName, poster, mainArtist, combinedArt = [], songId } = song
    const { artistSlug, artistName } = mainArtist[0]

    const songPrefix_rank = (prevRank, currentRank) => {
        let asc = true
        let sort = 0
        if (Number(prevRank) > Number(currentRank)) {
            asc = true
            sort = Number(prevRank) - Number(currentRank)
        }
        else {
            asc = false;
            sort = Number(currentRank) - Number(prevRank)
        }
        return (
            <> 
              <div className='song-prefix'>
                <span className={'rank rank-' + index}>{index}</span>
                <div className='sort'>
                    {asc ? <IoCaretUpOutline className="sort-up" />
                        : <IoCaretDownOutline className="sort-down" />}
                    <span className='sort-num'>{sort}</span>
                </div>
              </div>
            </>
        )
    }
    const setSongPlaying = React.useCallback(() => {
        const songsHistory = JSON.parse(localStorage.getItem('recentlySongs')) || []
        const playlistHistory = JSON.parse(localStorage.getItem('recentlyPlaylists')) || []
        // XÉT BÀI HÁT VÀO PHẦN LỊCH SỬ
        if (curentSong?.songId) {
            if (songsHistory.length <= 0 || songsHistory.includes(curentSong.songId) == false) {
                songsHistory.push(curentSong.songId)
                localStorage.setItem('recentlySongs', JSON.stringify(songsHistory))
            }
            //kiểm tra bài hát hiện tại có nằm trong lịch sủ 
            if (songsHistory.includes(song.songId)) {
                let newSongsHistory = songsHistory.filter((songId) => {
                    return songId != song.songId
                })
                localStorage.setItem('recentlySongs', JSON.stringify(newSongsHistory))
            }
        }
        // XÉT ALBUM VÀO PHẦN LỊCH SỬ 
        if (albumId) {
            if (playlistHistory.length < 0 || playlistHistory.includes(albumId) == false) {
                playlistHistory.push(albumId)
                localStorage.setItem('recentlyPlaylists', JSON.stringify(playlistHistory))

            }
        }

        setPlaylist(songs)
        setCurentSong(song)
        setSongIndex(index - 1)
        setCurentAlbum(albumId)
        if (curentSongSt === false) {
            setCurentSongSt(true)
        }
        else {
            if (songId === curentSong?.songId) {
                setCurentSongSt(false)
            }
            else {
                setCurentSongSt(true)
            }
        }
    }, [curentSong, curentSongSt])

    // PHẦN CẬP NHẬT DANH MỤC YÊU THÍCH 
    const handleChangeFavoriteSong = () => {
        const status = HandleChangeFavoriteSong(songId, isFavorite, loginSt, user)
        status.then(res => {
            setUser({ ...user, favoriteSongs: res })
            setIsFavorite(!isFavorite)
        })
    }
    // KIỂM TRA BÀI HÁT CÓ ĐƯỢC CHECK KHÔNG 
    const handleMediaCheck = (songId) => {
        if (typeof handleCheck == 'function') {
            handleCheck(songId)
        }
    }
    // UPDTAE BÀI HÁT VÀO PLAYLIST
    const handleAddToPlaylist= async ()=>{
            if (loginSt && user && album.albumId) {
                album.songId.push(songId)
                console.log(`albums/${album.albumId}`)
                console.log(album.songId)
                if (user.myPlayList.includes(album.albumId)) {
                     await axios.put(`albums/${album.albumId}`,{songId:album.songId})
                                 .then(res=>{
                                    console.log(res.data)
                                    ToastApp('success','Thêm thành công bài hát vào playlist')
                                 })
                }
            }
    }
    React.useEffect(() => {
        if (loginSt && user) {
            if (user.favoriteSongs.includes(songId)) {
                setIsFavorite(true)
            }
        }
    }, [loginSt, user])
    return (
        <div className={curentSong?.songId === songId ? 'media active' : 'media'} >
            <div className={column?"media__left column":'media__left'} >
                {rank&&songPrefix_rank(prevRank, currentRank)}
                {check&&
                    <div className={listChecked?.length > 0 ? 'song-prefix check' : 'song-prefix'} >
                        <IoMusicalNotesOutline className='icon-song' />
                        <input
                            type="checkbox"
                            className='mediaCheck' value={songId}
                            checked={listChecked?.includes(songId)}
                            onChange={() => handleMediaCheck(songId)}
                        />
                </div>}
                <div className='song__thumb' onClick={() => setSongPlaying()}>
                    {curentSongSt ? <><img className='song__thumb-icon play' src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif" alt="" />
                        <IoPlaySharp className='song__thumb-icon pause' /></>
                        :
                        <IoPlaySharp className='song__thumb-icon pause' />
                    }
                    <img src={poster} alt="" />
                </div>
                <div className='song__info'>
                    <Link to={''}><h5>{songName}</h5></Link>
                    <div className='singer__info'>
                        <BoxContent name={artistSlug}>
                            <Link to={'/nghe-si/' + artistSlug} className="singer">{artistName}</Link>
                        </BoxContent>
                        {combinedArt === [] ? '' : combinedArt.map((item, index) => {
                            return (
                                <span key={index}>
                                    <BoxContent name={item.artistSlug}>
                                        <Link to={'/nghe-si/' + item.artistSlug} className="singer">,{" "+item.artistName}</Link>
                                    </BoxContent>
                                </span>
                            )
                        })}
                    </div>
                </div>
            </div>
            {option &&
                <>
                    <div className='media__content'>
                        <a href='' className="album__info">{songName} (singer)</a >
                    </div>
                    <div className="media__right">
                        <div className='media__option'>
                            <AiOutlineYoutube className='media__option-icon mv' title='mv' />
                            {isFavorite ? <AiTwotoneHeart onClick={() => handleChangeFavoriteSong()} className='media__option-icon' title='Xóa khỏi thư viện' /> :
                                          <AiOutlineHeart onClick={() => handleChangeFavoriteSong()} className='media__option-icon' title='Thêm vào thư viện' />
                            }
                            {add===true?<Tooltip title='Thên vào playlist'>
                                           <AiOutlinePlus className='media__option-icon'
                                                          onClick={handleAddToPlaylist}
                                                          />
                                        </Tooltip>
                                       :<BsThreeDots className='media__option-icon' title='khác' />
                            }
                            
                        </div>
                        <div className="duration">05:00</div>
                    </div>
                </>
            }
        </div>
    );
}

export default memo(Media);
