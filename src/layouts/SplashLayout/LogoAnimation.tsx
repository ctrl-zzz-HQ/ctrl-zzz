import { useState, useRef, useEffect, useMemo } from 'react';
import logoAnimationWebm from '../../assets/Logo 500x500.webm';
import logoAnimationMov from '../../assets/Logo 500x500.mov';
import logoAnimationMp4 from '../../assets/Logo 500x500.mp4';

export default function LogoAnimation({ play, onEnded }: LogoAnimationProps) {

  const [playLogoAnimation, setPlayLogoAnimation] = useState<boolean>(true);
  const logoAnimationRef = useRef<HTMLVideoElement>(null);

  const isSafari = useMemo<boolean>(() => {
    const userAgent = window.navigator.userAgent;
    if (!userAgent.includes('Firefox')
      && !userAgent.includes('SamsungBrowser')
      && !userAgent.includes('Opera')
      && !userAgent.includes('OPR')
      && !userAgent.includes('Edg')
      && !userAgent.includes('Chrome')
      && userAgent.includes('Safari')) {
      return true;
    }
    return false;
  }, []);

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
        {isSafari && <source src={logoAnimationMov} type="video/quicktime"/>} {/* Safari - must be first to avoid playing WEBM without transparency */}
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
