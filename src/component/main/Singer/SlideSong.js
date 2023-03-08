

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";


// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";


// import required modules
import { EffectCards, Autoplay } from "swiper";

export default function SlideSong({ songsOfSinger = [] }) {
  return (
    <div className="slideSongOfSinger">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards, Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >

        {
          songsOfSinger == [] ? '' : songsOfSinger.map((song, index) => {
            return (
              <SwiperSlide className="slide-song-card" key={index} >
                <img src={song.poster} alt="" />
              </SwiperSlide>
            )
          })
        }

      </Swiper>
    </div>
  );
}