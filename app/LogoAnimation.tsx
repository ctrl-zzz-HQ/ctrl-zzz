import { useState, useRef, useEffect } from 'react';
import Video from 'next-video';
import logoAnimationWebm from '/videos/Logo 500x500.webm';
import logoAnimationMp4 from '/videos/Logo 500x500.mp4';

export default function LogoAnimation({ play, onEnded }: LogoAnimationProps) {

  const [playLogoAnimation, setPlayLogoAnimation] = useState<boolean>(true);
  const logoAnimationRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (play) {
      if (logoAnimationRef.current && playLogoAnimation) {
        logoAnimationRef.current.play();
      } else {
        onEnded(); // signal to end immediately
      }
    }
  }, [play, onEnded, playLogoAnimation]);

  return (
    <div className={`logo-wrapper ${play ? '' : 'd-none'}`}>
      <Video src={logoAnimationWebm} playsInline muted className="logo-animation" ref={logoAnimationRef} onEnded={onEnded} />
    </div>
  );
}

interface LogoAnimationProps {
  play: boolean;
  onEnded: () => void;
}
