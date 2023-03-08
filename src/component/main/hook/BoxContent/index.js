

import React from 'react';
import axios from 'axios';
import './boxContent.css'
import { Avatar, Input } from 'antd';
import { AiOutlineUserAdd } from 'react-icons/ai'
import Media from '../Media';
import BoxEmty from '../BoxEmty';

const BoxContent = ({ children, name = '' }) => {
    const songs=[]
    const boxContentRef = React.useRef()
    const boxRef = React.useRef()
    const { innerWidth: viewPortWidth, innerHeight: viewPortHeight } = window;
    const [boxPosition, setBoxPosition] = React.useState('')

    const [songOfSinger, setSongOfSinger] = React.useState([])
    const [singer,setSinger]=React.useState({})
    //HÀM HIỂN THỊ BOX
    const handleShowBox = () => {

        var scrollTop = document.body.scrollTop
        const distanceTop = boxContentRef.current.getBoundingClientRect().top
        const distanceBottom = boxContentRef.current.getBoundingClientRect().bottom
        const distanceLeft = boxContentRef.current.getBoundingClientRect().left
        const distanceRight = boxContentRef.current.getBoundingClientRect().right

        const boxHeight = boxRef.current.getBoundingClientRect().height
        const boxWidth = boxRef.current.getBoundingClientRect().width
        if ((distanceTop - 60) > boxHeight) {
            if (viewPortWidth - distanceLeft > boxWidth) {
                setBoxPosition('top-right')
            }
            else {
                setBoxPosition('top-left')
            }
        }
        else {
            if (viewPortWidth - distanceLeft > boxWidth) {
                setBoxPosition('bottom-right')
            }
            else {
                setBoxPosition('bottom-left')
            }
        }
        axios.get("artist/" + name)
        .then(res => {
                   const songs=res.data.songs
                   const songSort=songs.sort((a, b) => (a.realease > b.realease) ? 1 : -1)
                   setSongOfSinger(
                        songSort.map(song=>{
                            return {...song,mainArtist:[res.data.artist]}
                        })
                   )
                   setSinger(res.data.artist)

        })
    }
    return (
        <div className='boxContent' ref={boxContentRef}
            onMouseEnter={handleShowBox}>
            {children}
            <div className={`box ${boxPosition}`} ref={boxRef}  >
                <div className='boxArtistInfo'>
                    <img className='artistInfo__background' src={singer.avatar} alt="" />
                    <div className='artistInfo'>
                        <div className='artistInfo__header'>
                            <div className='artistInfo__headerLeft'>
                                <Avatar src={singer.avatar} />
                                <div className='name'>
                                    <h4>{singer.artistName}</h4>
                                    <span>{singer.follower} Quan tâm</span>
                                </div>
                            </div>
                            <div className='artistInfo__headerRight'>
                                <button className='btn btn-primary'>
                                    <AiOutlineUserAdd /> Quan Tâm
                                </button>
                            </div>
                        </div>
                        {/* Phần tiểu sử */}
                        <div className='biography'>
                            <span>
                                {singer.biography}
                            </span>
                            <span>Xem thêm</span>
                        </div>
                        {/* Hiển thị các sản phẩm của nghệ sĩ  */}
                        <div className='artistInfo__songs'>
                            <h3>Mới nhất</h3>
                            <div className='listNewSong'>
                                {
                                        
                                    songOfSinger === [] ? '' :
                                        songOfSinger.map((song, index) => {
                                            // const songNew = { ...song, mainArtist: [mainArtist] }
                                            return (
                                                <div key={index}>
                                                    <Media index={index + 1}
                                                        song={song}
                                                        songs={songOfSinger}
                                                        check={false}
                                                        option={false}
                                                        column={true} />
                                                </div>
                                            )
                                        })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
}

export default BoxContent;
