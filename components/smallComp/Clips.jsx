"use client";
import { useRef, useState } from "react";
import { Cover } from "../ui/cover";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa"; // FontAwesome Icons

const Clips = () => {
  // Create refs for each video element
  const videoRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [isMuted, setIsMuted] = useState([true, true, true, true]); // Mute state for each video

  // Function to handle video play on hover
  const handleMouseEnter = (index) => {
    videoRefs[index].current.play();
  };

  // Function to handle video pause on hover out
  const handleMouseLeave = (index) => {
    videoRefs[index].current.pause();
  };

  // Function to toggle mute for each video
  const toggleMute = (index) => {
    const updatedMutedState = [...isMuted];
    updatedMutedState[index] = !updatedMutedState[index]; // Toggle the mute state for the clicked video
    setIsMuted(updatedMutedState);
    videoRefs[index].current.muted = updatedMutedState[index]; // Apply the mute/unmute to the video
  };

  return (
    <div className="mx-auto h-full container">
      <header className="text-end py-10 px-3">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
          SMIU <Cover>Short</Cover>
        </h1>
      </header>
      <div className="relative w-full">
        <div className="flex flex-row px-2 justify-start gap-4 pl-4 container mx-auto overflow-x-scroll overscroll-x-auto scroll-smooth [scrollbar-width:none]">
          
          {/* Video 1 */}
          <div
            className="relative rounded-3xl"
            onMouseEnter={() => handleMouseEnter(0)}
            onMouseLeave={() => handleMouseLeave(0)}
          >
            <video
              ref={videoRefs[0]}
              className="object-cover h-96 min-w-[200px] w-[200px] md:min-w-[384px] md:w-[384px] md:h-[640px] bg-black rounded-3xl"
              loop
              muted={isMuted[0]} // Apply the mute state to video
            >
              <source src="/video/vd1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Volume Button */}
            <button
              className="absolute bottom-4 left-4 text-white bg-background/1 backdrop-blur p-2 rounded-full"
              onClick={() => toggleMute(0)}
            >
              {isMuted[0] ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
            </button>
          </div>

          {/* Video 2 */}
          <div
            className="relative rounded-3xl"
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={() => handleMouseLeave(1)}
          >
            <video
              ref={videoRefs[1]}
              className="object-cover h-96 min-w-[200px] w-[200px] md:min-w-[384px] md:w-[384px] md:h-[640px] bg-black rounded-3xl"
              loop
              muted={isMuted[1]}
            >
              <source src="/video/vd2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button
              className="absolute bottom-4 left-4 text-white bg-background/1 backdrop-blur p-2 rounded-full"
              onClick={() => toggleMute(1)}
            >
              {isMuted[1] ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
            </button>
          </div>

          {/* Video 3 */}
          <div
            className="relative rounded-3xl"
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={() => handleMouseLeave(2)}
          >
            <video
              ref={videoRefs[2]}
              className="object-cover h-96 min-w-[200px] w-[200px] md:min-w-[384px] md:w-[384px] md:h-[640px] bg-black rounded-3xl"
              loop
              muted={isMuted[2]}
            >
              <source src="/video/vd3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button
              className="absolute bottom-4 left-4 text-white bg-background/1 backdrop-blur p-2 rounded-full"
              onClick={() => toggleMute(2)}
            >
              {isMuted[2] ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
            </button>
          </div>

          {/* Video 4 */}
          <div
            className="relative rounded-3xl"
            onMouseEnter={() => handleMouseEnter(3)}
            onMouseLeave={() => handleMouseLeave(3)}
          >
            <video
              ref={videoRefs[3]}
              className="object-cover h-96 min-w-[200px] w-[200px] md:min-w-[384px] md:w-[384px] md:h-[640px] bg-black rounded-3xl"
              loop
              muted={isMuted[3]}
            >
              <source src="/video/vd4.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button
              className="absolute bottom-4 left-4 text-white bg-background/1 backdrop-blur p-2 rounded-full"
              onClick={() => toggleMute(3)}
            >
              {isMuted[3] ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clips;
