


import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline, IoArrowForwardOutline, IoShirtOutline, IoSettingsOutline } from 'react-icons/io5'
import { FcSearch } from 'react-icons/fc'
import { BiMenuAltLeft } from 'react-icons/bi'
import Media from './hook/Media';
import { statusContext } from '../context/StatusProvider';
const SearchBar = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = React.useState('')
    const [searchSong, setSearchSong] = React.useState()
    const [searchArtists, setSearchArtists] = React.useState()
    const {setStatusSidebarMenu}=React.useContext(statusContext)
    const typingTimeOutRef = React.useRef(null)
    const handleSearch = (e) => {
        let value = e.target.value
        setSearchValue(value)
        if (typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current)
        }
        typingTimeOutRef.current = setTimeout(() => {
            axios.get('http://localhost:3001/api/page/search/' + value)
                .then(data => {
                    const songs = data.data.songs
                    const artists = data.data.artists
                    setSearchSong(songs)
                })
        }, 300)
    }
    const handleBlur=(()=>{
        if (typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current)
        }
        typingTimeOutRef.current = setTimeout(() => {
            setSearchValue('')
        }, 300)
    })
    const handleGoBack=()=>{
        navigate(-1)
    }
    const handleGoForward=()=>{
        navigate(1)
    }
    return (
        <div className='search__area'>
            <div className="togge-menu" onClick={()=>setStatusSidebarMenu(true)} >
                <BiMenuAltLeft/>
            </div>
            <div className='navigation'>
                <IoArrowBackOutline  onClick={handleGoBack} />
                <IoArrowForwardOutline onClick={handleGoForward} />
            </div>
            <div className={`search ${searchValue && 'active'}`}>
                <FcSearch className='btn-search' />
                <input type="text" placeholder='tìm kiếm bài hát ,nghệ sĩ' onChange={handleSearch} value={searchValue} onBlur={handleBlur} />
                {searchValue &&
                    <div className='search-result'>
                        <h3>Gợi ý cho bạn</h3>
                        {searchSong &&
                            searchSong.map((song, index) => {
                                return (
                                    <div key={index}>
                                        <Media index={index + 1}
                                            option={false}
                                            song={song}
                                            songs={searchSong}
                                            albumId={'KU94KSKK'} />
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
            <div className='setting'>
                <IoShirtOutline title='chủ đề' />
                <IoSettingsOutline title='cài đặt' />
            </div>
        </div>
    );
}

export default SearchBar;
