import React, { useRef, useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';

const Slider = () => {
  const [index, setIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const camryImage = `${process.env.PUBLIC_URL}/assets/images/Toyota_Camry.jpg`;
  const corollaImage = `${process.env.PUBLIC_URL}/assets/images/Toyota_Corolla.jpg`;
  const rav4Image = `${process.env.PUBLIC_URL}/assets/images/Toyota_RAV4.jpg`;

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && videoElement) {
        videoElement.play().catch((error) => {
          console.log('Video playback failed:', error);
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (videoElement) {
      videoElement.addEventListener('ended', handleVideoEnd);
      videoElement.play().catch((error) => {
        console.log('Video playback failed:', error);
      });
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('ended', handleVideoEnd);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleVideoEnd = () => {
    setIndex(1);
    setIsVideoPlaying(false);
  };

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
    if (selectedIndex === 0 && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video playback failed:', error);
      });
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (index === 0 && videoElement && !isVideoPlaying) {
      videoElement.play().then(() => {
        setIsVideoPlaying(true);
      }).catch((error) => {
        console.log('Video playback failed:', error);
      });
    }
  }, [index, isVideoPlaying]);

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <div className="video-container">
          <video ref={videoRef} className="d-block w-100" style={{ height: '690px' }} muted autoPlay loop>
            <source src={`${process.env.PUBLIC_URL}/assets/images/Mercedes.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={camryImage} alt="Toyota Camry" />
        <Carousel.Caption>
          <h3>Elegance Meets Performance</h3>
          <p>Experience the perfect blend of sophistication and power with the Toyota Camry. Designed for those who appreciate a smooth ride paired with dynamic efficiency.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={corollaImage} alt="Toyota Corolla" />
        <Carousel.Caption>
          <h3>Compact Yet Mighty</h3>
          <p>The Toyota Corolla offers reliability and style in a compact package. Ideal for navigating the urban jungle with ease and comfort.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={rav4Image} alt="Toyota RAV4" />
        <Carousel.Caption>
          <h3>Adventure Awaits</h3>
          <p>Ready for every journey, the Toyota RAV4 brings robust performance and versatility to your adventures. Tackle any terrain with confidence and style.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
