


import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { AiOutlineUserAdd } from 'react-icons/ai'
import { BsPlayCircle } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import './artist.css'

const Artist = ({ btn, singer, follower = 0, image, link }) => {
    const { name } = useParams()
    return (
        <Link to={'/nghe-si/' + link}>
            <div className='artist'>
                <div className='artist__avatar'>
                    <img className='img' src={image} alt="" />
                    <BsPlayCircle className='artist-icon-play' />
                </div>
                <div className='singerName' href="">{singer}</div>
                <div className='follower'>{follower} quan tâm</div>
                {
                    btn ? <button className='btn btn-primary'>
                        <AiOutlineUserAdd /> Quan Tâm
                    </button> : ''
                }

            </div>
        </Link>
    );
}

export default Artist;
