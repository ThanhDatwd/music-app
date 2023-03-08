import React from 'react';
import TitleApp from '../hook/TitleApp';
import Video from '../hook/Video';

const MvOfSinger = () => {
    return (
        <div>
            <TitleApp title={'MV của ca sĩ '}/>
            <div className="mvOfSinger">
                <Video/>
            </div>
        </div>
    );
}

export default MvOfSinger;
