import { useState, useRef, useEffect } from 'react';

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
        <source src={require('/public/videos/Logo 500x500.webm')} type="video/webm"/>
        <source src={require('/public/videos/Logo 500x500.mp4')} type="video/mp4" onError={() => setPlayLogoAnimation(false)}/>
      </video>
    </div>
  );
}

interface LogoAnimationProps {
  play: boolean;
  onEnded: () => void;
}
