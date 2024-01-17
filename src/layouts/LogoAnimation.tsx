import { useState, useRef, useEffect } from 'react';
import logoAnimationWebm from '../assets/Logo 500x500.webm';
import logoAnimationMp4 from '../assets/Logo 500x500.mp4';

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
      <video playsInline muted className="logo-animation" ref={logoAnimationRef} onEnded={onEnded}>
        <source src={logoAnimationWebm} type="video/webm"/>
        <source src={logoAnimationMp4} type="video/mp4" onError={() => setPlayLogoAnimation(false)}/>
      </video>
    </div>
  );
}

interface LogoAnimationProps {
  play: boolean;
  onEnded: () => void;
}
