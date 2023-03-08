

import React from 'react';
import { FiHeart } from 'react-icons/fi'

const Menucollection = () => {
    return (
        <div className='menuCollection'>
            <h4>Your Collection</h4>
            <article className='menuCollection__items'>
                <div className='menuCollection__item menu__item'>
                    <li>
                        <FiHeart />
                        playlist song
                    </li>
                </div>
                <div className='menuCollection__item menu__item'>
                    <li>
                        <FiHeart />
                        your song
                    </li>
                </div>
                <div className='menuCollection__item menu__item'>
                    <li>
                        <FiHeart />
                        Artists
                    </li>
                </div>
            </article>
        </div>
    );
}

export default Menucollection;
