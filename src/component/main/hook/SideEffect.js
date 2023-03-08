import React, { memo } from 'react';
import { userContext } from '../../context/UserProvider';
import { songContext } from '../../context/SongProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ToastApp = (method, message) => {
    const notify = () => {
        switch (method) {
            case 'success':
                toast.success(message);
                break;
            case 'error':
                toast.error(message);
                break;
            case 'warning':
                toast.warn(message);
                break;
            case 'info':
                toast.info(message);
                break;

            default:
                toast("Thông báo từ ứng trình phát nhạc");
                break;
        }
    };

    notify()
    return (
        'chào bạn'
    )
}
const HandleChangeFavoriteSong = async (songId, status, loginSt = false, user) => {
    let newSongs = []
    const handle = async (data, message) => {
        newSongs = await axios.put('user/update',
            { songs: data })
            .then((res) => {
                res.data.acknowledged === true ? ToastApp('success', message) : console.log('Thêm bài hát thất bại')
                return data
            })
    }
    if (loginSt === true) {
        let favoriteSongs = user.favoriteSongs
        if (favoriteSongs.includes(songId) === false) {
            favoriteSongs.push(songId)
            handle(favoriteSongs, 'Đã thêm bài hát vào thư viện')
        }
        else {
            let newFS = favoriteSongs.filter(song => {
                return song !== songId
            })
            handle(newFS, 'Đã xóa bài hát khỏi thư viên')
        }
    }
    else {
        ToastApp('error', 'Vui lòng đăng nhập để thực hiện chức năng này!!!')
    }
    return newSongs;
}
//PHẦN THÊM NGHỆ SĨ VÀO DANH SÁCH YÊU THÍCH
const HandleChangeFavoriteArtist = async (aritistId, follower = 0, status, loginSt = false, user) => {
    let newArtists = []
    const handle = async (data,newfollower,message) => {
        newArtists = await axios.put('user/update',
            { artists: data })
            .then(async (res) => {
                if (res.data.acknowledged === true) {
                    await axios.put(`artist/${aritistId}`,
                        { follower:newfollower})
                        .then(res => {
                            res.data.acknowledged === true ? ToastApp('success', message)
                                                           : ToastApp('warning', 'Thêm bài hát thất bại')
                        })
                }
                return data
            })
    }
    if (loginSt === true) {
        let favoriteArtists = user.favoriteArtists
        if (favoriteArtists.includes(aritistId) === false) {
            favoriteArtists.push(aritistId)
            const newfollower=Number(follower) + 1 
            handle(favoriteArtists,newfollower,'Đã theo dõi nghệ sĩ này ')
        }
        else {
            let newFA = favoriteArtists.filter(artist => {
                return artist !== aritistId
            })
            const newfollower=Number(follower) - 1 
            handle(newFA,newfollower,'Đã bỏ theo dõi nghệ sĩ này ')
            
        }
    }
    else {
        ToastApp('error', 'Vui lòng đăng nhập để thực hiện chức năng này!!!')
    }
    return newArtists;
}
export {
    ToastApp,
    HandleChangeFavoriteSong,
    HandleChangeFavoriteArtist
}
