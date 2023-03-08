

import React from 'react';
import { Avatar, Typography } from 'antd';
import { HiChevronRight } from 'react-icons/hi'
import { Link } from 'react-router-dom';
import { userContext } from '../context/UserProvider';

const User = () => {
const{loginSt,user}=React.useContext(userContext)
const styleLogined = (<Link to='mymusic' className='user'>
                            <div className='user__info'>
                                <img src={user?.avatar} alt="" />
                                <h4>{user?.userName}</h4>
                            </div>
                            <HiChevronRight />
                      </Link>)
const styleNotLogin = (<Link to='login' className='user'>
                            ĐĂNG NHẬP
                            <HiChevronRight />
                       </Link>)
    return (

        <div className='sideBarLeft__user'>
            {loginSt==true?styleLogined:styleNotLogin}
        </div>
    );
}

export default User;
