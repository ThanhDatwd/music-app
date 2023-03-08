


import React from 'react';
import TitleApp from '../hook/TitleApp';
import Video from '../hook/Video';

const MvOfSinger = () => {
    return (
        <>
           <TitleApp title={'MV'} view={'/nghe-si'}/>
           <div className='mv-of-singer'>
               <Video/>
               <Video/>
               <Video/>
               <Video/>
           </div>
        </>
    );
}

export default MvOfSinger;
