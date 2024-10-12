import React, { useState, useRef, useEffect } from 'react';

const VIDEO_SOURCES = [
  { src: '/assets/factory2.mp4', playbackRate: 0.7 },
  { src: '/assets/factory3.mp4', playbackRate: 1.5 },
] as const;

export default function Printer() {
  const [isVideo, setIsVideo] = useState(false);
  const [videoIndex, setVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageHeight, setImageHeight] = useState<number | null>(null);
  const preloadedVideosRef = useRef<{ [key: string]: HTMLVideoElement }>({});

  // Preload videos when component mounts
  useEffect(() => {
    // Create hidden video elements for each source
    VIDEO_SOURCES.forEach(({ src }) => {
      const video = document.createElement('video');
      video.src = src;
      video.preload = 'auto'; // Force preloading
      video.style.display = 'none';
      video.muted = true;

      // Store the preloaded video element
      preloadedVideosRef.current[src] = video;

      // Append to document to start preloading
      document.body.appendChild(video);
    });

    // Cleanup function to remove hidden videos
    return () => {
      Object.values(preloadedVideosRef.current).forEach((video) => {
        document.body.removeChild(video);
      });
    };
  }, []);

  const handleImageClick = () => {
    const newIndex = Math.floor(Math.random() * VIDEO_SOURCES.length);
    setVideoIndex(newIndex);
    setIsVideo(true);

    // Set playback rate after a short delay to ensure it's applied
    if (videoRef.current) {
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.playbackRate = VIDEO_SOURCES[newIndex].playbackRate;
        }
      }, 0);
    }
  };

  const handleVideoEnded = () => {
    setIsVideo(false);
  };

  const handleImageLoad = () => {
    if (imageRef.current) {
      setImageHeight(imageRef.current.clientHeight);
    }
  };

  return (
    <div
      style={{
        minHeight: imageHeight ? `${imageHeight}px` : 'auto',
        overflow: 'hidden',
      }}
    >
      {!isVideo ? (
        <img
          ref={imageRef}
          width="100%"
          src="/assets/factory0.png"
          alt="MemCoin"
          onLoad={handleImageLoad}
          onClick={handleImageClick}
          className="rounded-lg shadow-md cursor-pointer"
        />
      ) : (
        <video
          width="100%"
          ref={videoRef}
          src={VIDEO_SOURCES[videoIndex].src}
          autoPlay
          muted
          onEnded={handleVideoEnded}
          playsInline
          className="rounded-lg shadow-md"
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}
