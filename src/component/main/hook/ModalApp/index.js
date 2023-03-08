

import React, { memo } from 'react';
import './modalApp.css'
const ModalApp = ({status=false,children}) => {
    return (
        <div className={status?'modalApp active':'modalApp'}>
            <div className='modalAppLayer'></div>
            <div className='modalAppContent'>
               {children} 
            </div>
        </div>
    );
}

export default memo(ModalApp);
