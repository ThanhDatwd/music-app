import React from 'react';
import './home.css'
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Recently from './Recently';
import NewRelease from './NewRelease';
import Newvideo from './NewVideo';
import Section from './Section';
import axios from 'axios';
import NewReleaseMb from './NewReleaseMb';
const Home = () => {
  const [sections,setSections]=React.useState([])
  React.useEffect(()=>{
    axios.get('page/home')
         .then(data=>{
            setSections(data.data)
         })
         .catch(err=>console.log(err))
  },[])
  
  return (
    <div className='home'>
      <Swiper
        // install Swiper modules
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={2}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        }}
        className="mySwiper"


        // onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide className='slide'>
          <img src="https://i.ytimg.com/vi/iwGuiSnr2Qc/maxresdefault.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className='slide'>
           <img src="https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className='slide'>Slide 3</SwiperSlide>
        <SwiperSlide className='slide'>Slide 4</SwiperSlide>
      </Swiper>

      <Recently/>
      <NewRelease/>
      <Newvideo/>
      {
        sections===[]?'':sections.map((section,index)=>{
          return(
            <div key={index}>
               <Section title={section.title} playlists={section.albums}/>
            </div>
          )
        })
      }
     
    </div>
  );
}

export default Home;
