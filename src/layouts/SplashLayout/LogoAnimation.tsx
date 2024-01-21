import { useState, useRef, useEffect } from 'react';
import logoAnimationWebm from '../../assets/Logo 500x500.webm';
import logoAnimationMov from '../../assets/Logo 500x500.mov';
import logoAnimationMp4 from '../../assets/Logo 500x500.mp4';

export default function LogoAnimation({ play, onEnded }: LogoAnimationProps) {

  const [playLogoAnimation, setPlayLogoAnimation] = useState<boolean>(true);
  const logoAnimationRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (play) {
      if (logoAnimationRef.current && playLogoAnimation) {
        if (window.navigator.userAgent.includes('Firefox')) {
          // Required to consistently start from beginning on Firefox
          logoAnimationRef.current.load();
        }
        logoAnimationRef.current.play();
      } else {
        onEnded(); // signal to end immediately
      }
    }
  }, [play, onEnded, playLogoAnimation]);

  return (
    <div className={`logo-wrapper ${play ? '' : 'd-none'}`}>
      <video playsInline muted className="logo-animation" ref={logoAnimationRef} onStalled={onEnded} onEnded={onEnded}>
        <source src={logoAnimationMov} type="video/quicktime"/> {/* Safari - must be first to avoid playing WEBM without transparency */}
        <source src={logoAnimationWebm} type="video/webm"/> {/* Chrome/Firefox */}
        <source src={logoAnimationMp4} type="video/mp4" onError={() => setPlayLogoAnimation(false)}/> {/* Backup - no transparency */}
      </video>
    </div>
  );
}

interface LogoAnimationProps {
  play: boolean;
  onEnded: () => void;
}
