


import React from 'react';
import { BsDot } from 'react-icons/bs'
import './post.css'

const Comment = () => {
    return (
        <div className='post__comment-item'>
            <div className='post__avatar small'>
                <img src="https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg" alt="" />
            </div>
            <div className='post__comment-content'>
                <div className='post__comment-text'>
                    Bài này thực sự hay đối với mình vào lúc này nó diễn tả đúng cảm xúc của mình và tâm trạng
                </div>
                <div className='post__comment-action'>
                    <small>Thích</small>
                    <BsDot />
                    <small>Trả lời</small>
                </div>
            </div>
        </div>
    );
}

export default Comment;
