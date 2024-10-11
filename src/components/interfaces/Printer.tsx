import React, { useState, useRef, useEffect } from 'react';

export default function Printer() {
  const [isVideo, setIsVideo] = useState(false);
  const [videoSrc, setVideoSrc] = useState(''); // State to store the video source
  const [playbackRate, setPlaybackRate] = useState(1); // State to store playback speed
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleImageClick = () => {
    const randomValue = Math.random();
    let selectedVideoSrc, selectedPlaybackRate;

    if (randomValue < 0.5) {
      selectedVideoSrc = './public/assets/factory2.mp4';
      selectedPlaybackRate = 0.7;
    } else {
      selectedVideoSrc = './public/assets/factory3.mp4';
      selectedPlaybackRate = 1.5;
    }

    setVideoSrc(selectedVideoSrc);
    setPlaybackRate(selectedPlaybackRate);
    setIsVideo(true);
  };

  const handleVideoEnded = () => {
    setIsVideo(false);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [isVideo]);

  return (
    <section
      id="about"
      className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl"
    >
      {/* <h2 className="mb-4 text-2xl font-bold">Printer go brrr</h2> */}
      {!isVideo ? (
        <img
          width="100%"
          src="./public/assets/factory0.png"
          alt="MemCoin"
          onClick={handleImageClick}
          className="mt-4 rounded-lg shadow-md cursor-pointer"
        />
      ) : (
        <video
          width="100%"
          ref={videoRef}
          src={videoSrc} // Use the randomly selected video source
          autoPlay
          muted
          onEnded={handleVideoEnded}
          playsInline
          className="rounded-lg shadow-md"
        >
          Your browser does not support the video tag.
        </video>
      )}
    </section>
  );
}
