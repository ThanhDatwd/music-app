


import React, { Fragment, memo } from 'react';
import SongCard from '../hook/SongCard';
import axios from 'axios';
import TitleApp from '../hook/TitleApp';


import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/grid";
import "swiper/css/pagination";



// import required modules
import { Grid, Pagination } from "swiper";
import NewSongs from '../NewSongs';

const NewRelease = () => {
    const [newRelease, setNewRelease] = React.useState([])
    React.useEffect(() => {
        axios.get('http://localhost:3001/api/songs/?limit=10')
            .then(res => {
                setNewRelease(res.data)
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <div className='newRelease'>
            <div className='newRelease-desktop'>
                <TitleApp title='Mới phát hành' view={'nhac-moi'} />
                <Swiper
                    slidesPerView={3}
                    spaceBetween={20}
                    autoplay={{
                        delay: 9000,
                        disableOnInteraction: false,
                    }}
                    grid={{
                        rows: 1,
                    }}
                    modules={[Grid, Autoplay]}
                    className="mySwiper2"
                >
                    {newRelease === [] ? '' : newRelease.map((s, i) => {
                        return (
                            <SwiperSlide key={i}>
                                <SongCard rank={i + 1} song={s} />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>

            <div className='newReleaseMb'>
               <NewSongs rank={false} limit={10}/>
            </div>
        </div>

    );
}
export default memo(NewRelease);
