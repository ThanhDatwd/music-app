



import React, { memo } from 'react';
import {IoChevronForwardSharp,IoPlanetOutline}  from 'react-icons/io5'
import { Link } from 'react-router-dom';

const TitleApp = ({title,view}) => {
    return (
        <div className='section-title'>
            <h3>{title}</h3>
            {view?<Link to={view} className='discovery-btn'>TẤT CẢ <IoChevronForwardSharp /></Link>:<IoPlanetOutline />}
        </div>
    );
}

export default memo(TitleApp);
