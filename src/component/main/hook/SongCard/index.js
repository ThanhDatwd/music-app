


import React, { memo } from 'react';
import {BsPlayCircle} from 'react-icons/bs'
import moment from 'moment';
import './songcard.css'
import { Link } from 'react-router-dom';

const SongCard = ({rank,song={}}) => {
    const { songName, poster, mainArtist, combinedArt=[],songId ,release} = song
    const {artistSlug='',artistName='' } = mainArtist[0]
    const date=moment(release).format('DD-MM-YYYY')
    return (
        <div className='songCard'>
            <div className='songCard__thumb'>
                <img className='img' src={poster} alt="" />
                <BsPlayCircle className='songCard__thumb-icon' />
            </div>
            <div className="songCard__content">
                <div className='song__info'>
                    <div className='song-name'>{songName}</div>
                    <Link to={'/nghe-si/' + artistSlug} className='singer-name'>{artistName}</Link>
                    {combinedArt === [] ? '' : combinedArt.map((item, index) => {
                        return (
                            <span key={index}>
                                , <Link to={'/nghe-si/' + item.artistSlug} className="singer-name">{item.artistName}</Link>
                            </span>
                        )
                    })}
                </div>
                <div className='release__info'>
                     {
                         rank?<div className='rank rank-1'>#{rank}</div>:''
                     }
                    <div className='dateRelease'>{date}</div>
                </div>
            </div>
        </div>
    );
}

export default memo(SongCard);
