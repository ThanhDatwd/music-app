

import React from 'react';
import TitleApp from '../hook/TitleApp';
import Video from '../hook/Video';

const Newvideo = ({title=''}) => {
    return (
        <div>
            <TitleApp title={'MV Hot'} view='/music-videos'/>
            <div className='home-videos videos'>
                <Video/>
                <Video/>
                <Video/>
            </div>
        </div>
    );
}

export default Newvideo;
