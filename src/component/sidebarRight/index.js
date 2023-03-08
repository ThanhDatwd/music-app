


import React from 'react';
import './sidebarRight.css'
import Currentsong from './CurrentSong';
import FavArtist from './FavArtist';
import Shortcut from './Shortcut';
import { statusContext } from '../context/StatusProvider';


const SidebarRight = () => {
    const {statusSidebarRight,setStatusSidebarRight}= React.useContext(statusContext)

    return (
        <div className={statusSidebarRight?'sidebarRight__container':'sidebarRight__container active'}>
            <div className='sidebarRight'>
                <Shortcut />
                <FavArtist />
                <Currentsong />
            </div>
        </div>
    );
}

export default SidebarRight;
