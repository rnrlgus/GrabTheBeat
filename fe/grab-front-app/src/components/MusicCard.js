import React, { useState, useEffect, useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { FaAngleLeft, FaArrowRight } from 'react-icons/fa';
import { CgChevronDoubleLeft, CgChevronDoubleRight } from 'react-icons/cg';
import './MusicCard.css';

function MusicCard({ musicList, selectedMusic, handleMusicSelect }) {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // Initialize with 0 or the appropriate value
    const canPlayMusic = useRef(false);

    // window.addEventListener('onbeforeactivate',()=>{
    //     canPlayMusic.current=true;
        
    // });

    // useEffect(()=>{
    //     canPlayMusic.current=true;
    // });

    console.log(canPlayMusic.current);

    useEffect(() => {

        setTimeout(()=>{
            if (selectedMusic) {
                const audioElement = new Audio(selectedMusic.music_url);
                
                audioElement.volume=0.4;

                console.log('music playing');
                console.log(selectedMusic.music_url);
                audioElement.play();
    
                return () => {
                    audioElement.pause();
                    console.log('music pause');
                };
            }
        },500);


            // if (selectedMusic) {
            //     const audioElement = new Audio(selectedMusic.music_url);
            //     console.log(audioElement);
                
            //     audioElement.volume=0;

            //     setTimeout(() => {
            //         console.log('music playing');
            //         console.log(selectedMusic.music_url);
            //         audioElement.volume=0.4;
            //         audioElement.play();
            //     }, 1000);
    
            //     return () => {
            //         audioElement.pause();
            //         console.log('music pause');
            //     };
            // }
            
    }, [selectedMusic]);


    // const CustomPrevArrow = ({ onClick }) => (

        

    //     <div className="slick-arrow custom-prev-arrow" onClick={() => {
    //       handleMusicSelect(musicList[currentSlideIndex - 1]);
    //       onClick();
    //   }}>
    //         <CgChevronDoubleLeft />
    //     </div>
    // );
    function CustomPrevArrow ({ onClick }){
        let idx=musicList.length-1;
        if(currentSlideIndex!==0)idx=currentSlideIndex-1;
        // console.log(idx);
        // console.log(musicList[idx]);

        return(
            <div className="slick-arrow custom-prev-arrow" onClick={() => {
                handleMusicSelect(musicList[idx]);
                onClick();}}>
                <CgChevronDoubleLeft />
            </div>
        )
    };





    // const CustomNextArrow = ({ onClick }) => (
    //     <div className="slick-arrow custom-next-arrow" onClick={() => {
    //         handleMusicSelect(musicList[currentSlideIndex + 1]);
    //         onClick();
    //     }}>
    //         <CgChevronDoubleRight />
    //     </div>
    // );
    function CustomNextArrow ({ onClick }){
        let idx=0;
        if(currentSlideIndex!==musicList.length-1)idx=currentSlideIndex+1;

        return(
            <div className="slick-arrow custom-next-arrow" onClick={() => {
                handleMusicSelect(musicList[idx]);
                onClick();}}>
                <CgChevronDoubleRight />
            </div>
        )
    };





    try{
        console.log(selectedMusic.id);

    }   catch{

    }
    return (
        <div className="sliderContainer">
            <Slider
                slidesToShow={1}
                infinite={true}
                arrows={true}
                prevArrow={<CustomPrevArrow />}
                nextArrow={<CustomNextArrow />}
                className="musicCarousel"
                beforeChange={(oldIndex, newIndex) => {
                    setCurrentSlideIndex(newIndex);
                }}
            >
                {musicList.map((music) => (
                    <div key={music.id} onClick={() => handleMusicSelect(music)}>
                        <div className="musicCard">
                 
                                <img className="musicCardBackground" alt="noImage" src={music.pic_url} />
                            <h3>{music.title}</h3>
                            <p>Artist: {music.artist}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default MusicCard;
