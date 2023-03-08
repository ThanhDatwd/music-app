
import React from 'react';

const BoxEmty = ({title=''}) => {
    return (
        <div className='box-emty'>
            <img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/empty-album.png" alt="" />
            <h4>{title}</h4>
        </div>
    );
}

export default BoxEmty;
