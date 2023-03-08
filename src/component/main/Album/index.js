


import React, { memo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Button, Col, Row, Tooltip, Typography } from 'antd';
import { IoHeartOutline, IoPlaySharp } from 'react-icons/io5';
import { GrEdit } from 'react-icons/gr'
import { BsThreeDots } from 'react-icons/bs'
import axios from 'axios';
import moment from 'moment';


import 'antd/dist/antd.css';
import './album.css'
import Media from '../hook/Media';
import Artist from '../hook/Artist';
import { songContext } from '../../context/SongProvider'
import { userContext } from '../../context/UserProvider';
import TitleApp from '../hook/TitleApp';
import BoxEmty from '../hook/BoxEmty'
import AlbumNav from '../hook/AlbumNav';


export const albumContext = React.createContext()
const Album = () => {
    const { curentSongSt, curentAlbum, songsListened, playlist, songIndex } = React.useContext(songContext)

    const { loginSt, user } = React.useContext(userContext)
    // console.log(playlist)
    const { name } = useParams()
    const [album, setAlbum] = React.useState({})
    const [medias, setMedias] = React.useState([])
    const [artists, setArtists] = React.useState([])
    const [listChecked, setListChecked] = React.useState([])
    const [selectAll, setSelectAll] = React.useState(false)
    const [createBy, setCreateBy] = React.useState({
        byUser: false,
        byAmin: true,
        userName: ''
    })
    const [updateAble, setUpdateAble] = React.useState(false)
    React.useEffect(() => {
        axios.get('albums/' + name)
            .then(data => {
                setAlbum(data.data.album)
                setMedias(data.data.songs)
                setArtists(data.data.artists)
            })
            .catch(err => console.log(err))
    }, [])
    const handleCheck = (id) => {
        let newListChecked = []
        const isChecked = listChecked.includes(id)
        if (isChecked) {
            newListChecked = listChecked?.filter(item => item !== id)
        }
        else {
            newListChecked = [...listChecked, id]
        }
        setListChecked(newListChecked)
        if (newListChecked.length === medias.length) {
            setSelectAll(true)
        } else {
            setSelectAll(false)
        }
    }
    const handleSetSelectAll = () => {
        const statusSelectAll = !selectAll
        setSelectAll(statusSelectAll)
        if (statusSelectAll == false) {
            setListChecked([])
        }
        else {
            const newListChecked = medias.map(song => {
                return song.songId
            })
            setListChecked(newListChecked)
        }
    }
    // HÀM SẮP XẾP BÀI HÁT TRONG ALBUM
    const handleSort = (sort) => {
        switch (sort) {
            case 'song':
                let newSortSong = medias.sort(function (a, b) {
                    const nameA = a.songName.toUpperCase(); // ignore upper and lowercase
                    const nameB = b.songName.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                })
                console.log('sắp xếp bài h')
                setMedias(prev => [...newSortSong])

                break;
            case 'singer':
                let newSortSinger = medias.sort(function (a, b) {
                    const nameA = a.songName.toUpperCase(); // ignore upper and lowercase
                    const nameB = b.songName.toUpperCase(); // ignore upper and lowercase
                    if (nameA > nameB) {
                        return -1;
                    }
                    if (nameA < nameB) {
                        return 1;
                    }
                    return 0;
                })
                setMedias(prev => [...newSortSinger])
                break;
            default:
                break;
        }
    }
    React.useEffect(() => {
        if (loginSt && user) {
            if (user.myPlayList.includes(album.albumId)) {
                setUpdateAble(true)
            }
        }
    }, [loginSt, user, album])
    return (
        <div className='album-page'>
            <Row className={curentAlbum && curentAlbum === album?.albumId && curentSongSt ? 'playlist active' : 'playlist'} >
                <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                    <div className='playlist__info-area'>
                        <div className='playlist__background'>
                            {/* <div className='playlist__background--layer'></div> */}
                            <img className='playlist__background--img' src={album.thumbnail} alt="" />
                            <div className='playlist__thumb'>
                                <IoPlaySharp className='playlist__thumb-icon pause' />
                                <img className='playlist__thumb-icon play' src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif" alt="" />
                                <img className='poster' src={album.thumbnail} alt="" />
                            </div>
                        </div>
                        <div className="playlist__info">
                            <h3>{album.albumName ?? ''} {updateAble && <GrEdit />}</h3>
                            <p className='playlist__info-update'>Cập nhật : {moment(album.updatedAt).format('DD/MM/YYYY')}</p>
                            {/* <p className='playlist__info-like'>Mr.siro vương anh tú và 18k người khác cùng thích</p> */}
                        </div>
                        <div className='playlist__action'>
                            <button className="btn btn-primary">phát ngẫu nhiên</button>
                            <div className='playlist__option'>
                                <Tooltip title='thêm vào thư viện'>
                                    <IoHeartOutline />
                                </Tooltip>
                                <Tooltip title='khác'>
                                    <BsThreeDots />
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={17} lg={17} xl={17} className='playlist__songs' >
                    <div className='playlist__preface'>
                        <Typography.Text strong>Lời tựa:</Typography.Text>
                        <span>{album.preface ?? ''}</span>
                    </div>
                    <AlbumNav listChecked={listChecked}
                        selectAll={selectAll}
                        handleSetSelectAll={handleSetSelectAll}
                        handleSort={handleSort} />
                    {
                        medias.length === 0 ?
                            <BoxEmty title='Chưa có bài hát nào trong playlist này ' />
                            : medias.map((media, index) => {
                                return (
                                    <div key={index}>
                                        <Media index={index + 1}
                                            song={media}
                                            songs={medias}
                                            albumId={album.albumId}
                                            handleCheck={handleCheck}
                                            listChecked={listChecked} />
                                    </div>
                                )
                            })
                    }
                    {/* DANH SÁCH GỢI Ý */}
                    {updateAble &&
                        <div className='recommend'>
                            <div className='recommendTitle'>
                                <h3>Danh sách gợi ý</h3>
                                <button className='btn btn-primary'>Làm mới</button>
                            </div>
                            <p>Dựa trên lịch sử nghe gần đây</p>
                            <div className='recommendList'>
                                {songsListened.length > 0?
                                    songsListened.map((song, index) => {
                                        if(album?.songId.includes(song.songId)===false){
                                            return (
                                                <div key={index}>
                                                    <Media index={songIndex + 1}
                                                        song={song}
                                                        songs={playlist}
                                                        album={album}
                                                        check={false}
                                                        add={true}
                                                    />
                                                </div>
                                            )
                                        }
                                    })
                                    : ''}
                            </div>
                        </div>}
                </Col>
            </Row>
            {/* <div className='album__artist'> */}
            <TitleApp title={"Nghệ sĩ tham gia"} />
            <div className='artists grid-slide'>
                {
                    artists === [] ? '' : artists.map((artist, index) => {
                        return (
                            <div key={index}>
                                <Artist singer={artist.artistName}
                                    image={artist.avatar} btn={true}
                                    follower={artist.follower}
                                    link={artist.artistSlug} />
                            </div>
                        )
                    })
                }
            </div>
            {/* </div> */}

        </div>
    );
}

export default Album;
