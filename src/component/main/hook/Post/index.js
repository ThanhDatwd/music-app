

import {Input } from 'antd';
import React from 'react';
import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai'
import { BsDot } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import Comment from './Comment';
import './post.css'
const Post = ({auth,title ,content, date , }) => {
    const [comment,setComment] =React.useState(false)
    return (
        <div className='post'>
            <div className='post__head'>
                <div className='post__avatar'>
                    <img src="https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg" alt="" />
                </div>
                <div className='post-info'>
                    <div className='post-info-title'>
                        <Link to='/news' className='post-info-title' >Tên tác giả</Link>
                        <BsDot />
                        <span className='post-action-care'>Quan tâm</span>
                    </div>
                    <small>02.03/2022</small>
                </div>
            </div>
            <div className='post__content'>
                {content}
            </div>
            <div className='post__video'>
                <img src="https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg" alt="" />
            </div>
            <div className='post__action'>
                <div className='post__action-like'>
                    <AiOutlineHeart />
                    <small> 30</small>
                </div>
                <div className='post__action-comment'>
                    <AiOutlineComment onClick={()=>setComment(!comment)} />
                    <small> 30</small>
                </div>
            </div>
            <div className={comment?'post__comment active':'post__comment'}>
                <div className='post__comment-r'>
                   <Comment/>
                </div>
                <div className='post__comment-w'>
                    <div className='post__avatar small'>
                        <img src="https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg" alt="" />
                    </div>
                    <Input placeholder='Nhập bình luận' />
                </div>
            </div>
        </div>
    );
}

export default Post;
