
import React, { useEffect, useState, useCallback } from "react";
import {useSession} from "next-auth/react";
import { useRecoilState } from 'recoil';
import { debounce } from "lodash";

import { currentTrackIdState,isPlayingState} from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import useSongInfo from "../hooks/usesongInfo";
import { ArrowsRightLeftIcon, ArrowUturnLeftIcon, BackwardIcon, ForwardIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';

import{PauseCircleIcon, PlayCircleIcon} from "@heroicons/react/24/solid";

function Player() {
    
  const spotifyApi = useSpotify();
  const {data:session,status}=useSession();
  const [currentTrackId,setCurrentIdTrack] = useRecoilState(currentTrackIdState);
  const [isPlaying,setIsPlaying] = useRecoilState(isPlayingState);
  const [volume,setVolume] = useState(50);
  const songInfo = useSongInfo();

  const fetchCurrentSong =() =>{
    if(!songInfo){
        spotifyApi.getMyCurrentPlayingTrack().then ((data)=>{
            console.log("Now playing:",data.body?.item);
            setCurrentIdTrack(data.body?.item.id);

        spotifyApi.getMyCurrentPlaybackState().then ((data)=>{
            setIsPlaying(data.body?.is_playing);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
    }
  };

   const handlePlayPause =()=>{
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
     if(data.body.is_playing){
      spotifyApi.pause();
      setIsPlaying(false);
     }else{
      spotifyApi.play();
      setIsPlaying(true);
     }
    })
    .catch((err) => console.log(err));
  };
  
  useEffect(()=>{
    if(spotifyApi.getAccessToken() && !currentTrackId){
      fetchCurrentSong();
      setVolume(50);
    }
  },[currentTrackIdState,spotifyApi,session])

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debounceAdjustVolume(volume);
    }
  }, [volume]);

  const debounceAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => console.log(err));
    }, 500),
    []
  );


  return (
    
    <div className='h-24 bg-gradient-to-b from-black to-gray-900 text-white 
    grid grid-cols-3 text-xs md:text-base px-2 md:px-8 border-t-[0.1px] border-gray-700'>

    {/* left */}
    <div className='flex items-center space-x-4'>
    <img className='hidden md:inline h-10 w-10'
    src={songInfo?.album?.images?.[0]?.url}
    alt=''
    />
     <div>
          <h3>{songInfo?.name}</h3>
          <p className="text-gray-400 text-xs">{songInfo?.artists?.[0]?.name}</p>
        </div>
    </div>
   
   {/* center */}
   <div className='flex items-center justify-evenly'>
    <ArrowsRightLeftIcon  className='button'/>
    <BackwardIcon className='button' />
    {isPlaying?(
      <PauseCircleIcon onClick={handlePlayPause} className='button w-10 h-10' />)
      :(<PlayCircleIcon onClick={handlePlayPause}  className='button w-10 h-10' />)
    }
    <ForwardIcon className='button' />
    <ArrowUturnLeftIcon  className='button ' />
   </div>

    {/* right */}
    <div className='flex items-center space-x-3 md:space-x-4 justify-end pr-5'>
    <SpeakerWaveIcon  onClick={() => volume > 0 && setVolume(volume - 10)}
    className='button ' />
    <input 
    className="w-14 md:w-28"
    type="range"
    value={volume}
    onChange={(e) => setVolume(Number(e.target.value))}
    min={0}
    max={100} />

    <SpeakerWaveIcon onClick={() => volume < 100 && setVolume(volume + 10)}
    className='button' />
  

   </div>
  </div>
    
   
  
  )
}

export default Player
