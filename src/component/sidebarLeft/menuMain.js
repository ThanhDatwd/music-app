import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrendingUp, FiMusic } from 'react-icons/fi'
import { AiOutlineHome } from 'react-icons/ai'
import { BiNews } from 'react-icons/bi'
import { IoTrophyOutline, IoPlanetOutline } from 'react-icons/io5'


const Menumain = () => {
    return (
        <div className='menuMain'>
            <div className='menuMain__item menu__item'>
                <Link to='/detail'>
                    <li className='li'>
                        <AiOutlineHome />
                        Home
                    </li>
                </Link>
            </div>
            <div className='menuMain__item menu__item'>
                <Link to='/trending'>
                    <li className='li'>
                        <FiTrendingUp />
                        Trending
                    </li>
                </Link>

            </div>
            <div className='menuMain__item menu__item'>
                <Link to='nhac-moi'>
                    <li className='li'>
                        <FiMusic />
                        Nhạc mới
                    </li>
                </Link>
            </div>
            <div className='menuMain__item menu__item'>
                <Link to='top100'>
                    <li className='li'>
                        <IoTrophyOutline />
                        Top 100
                    </li>
                </Link>
            </div>
            <div className='menuMain__item menu__item'>
                <Link to='news'> 
                    <li className='li'>
                        <BiNews />
                        Tin tức
                    </li>
                </Link>
            </div>
        </div>
    );
}

export default Menumain;
