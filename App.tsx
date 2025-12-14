import React, { useState, useEffect } from 'react';
import { TARGET_URL, APP_NAME_AR, CTA_TEXT, LOADING_TEXT } from './constants';
import { RippleButton } from './components/RippleButton';
import { Moon, MousePointerClick, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [touchPosition, setTouchPosition] = useState<{ x: number; y: number } | null>(null);

  const handleRedirect = () => {
    setIsRedirecting(true);
    // Slight delay to show the "active" state/animation before switching context
    setTimeout(() => {
      window.location.href = TARGET_URL;
    }, 300);
  };

  const handleGlobalClick = (e: React.MouseEvent | React.TouchEvent) => {
    // Record visual touch effect position
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }
    setTouchPosition({ x: clientX, y: clientY });
    
    handleRedirect();
  };

  // Reset visual effect after animation
  useEffect(() => {
    if (touchPosition) {
      const timer = setTimeout(() => setTouchPosition(null), 500);
      return () => clearTimeout(timer);
    }
  }, [touchPosition]);

  return (
    <div 
      onClick={handleGlobalClick}
      onTouchStart={handleGlobalClick}
      className="relative min-h-screen w-full overflow-hidden bg-emerald-50 cursor-pointer select-none group"
    >
      {/* Background Decor Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50vh] h-[50vh] bg-emerald-400/20 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60vh] h-[60vh] bg-teal-400/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 text-center">
        
        {/* Card Component */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl shadow-emerald-900/5 rounded-3xl p-8 md:p-12 max-w-md w-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-emerald-500/10">
            
          {/* Logo / Icon Area */}
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-3xl flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-8 animate-float border-4 border-white/20">
            {/* Islamic Moon Icon */}
            <Moon className="w-12 h-12 text-amber-100 fill-current transform -rotate-12" />
          </div>

          {/* Text Content */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-950 mb-4 tracking-tight">
            {APP_NAME_AR}
          </h1>
          
          <div className="text-emerald-800/80 text-lg mb-10 leading-relaxed font-medium flex flex-col gap-1">
            <p>السلام عليكم ورحمة الله وبركاته</p>
            <p>حياكم الله وبياكم..</p>
            <p>أهلاً وسهلاً بكم في تطبيق نور</p>
          </div>

          {/* Action Button (Visual cue) */}
          <div className="w-full pointer-events-none"> {/* pointer-events-none because the parent div handles the click */}
            {isRedirecting ? (
               <div className="flex items-center justify-center space-x-3 space-x-reverse text-emerald-600 animate-pulse">
                 <Zap className="w-6 h-6 fill-current text-amber-500" />
                 <span className="text-xl font-bold">{LOADING_TEXT}</span>
               </div>
            ) : (
              <RippleButton label={CTA_TEXT} />
            )}
          </div>
          
          {/* Helper Text */}
          <div className="mt-8 flex items-center justify-center text-emerald-600/50 text-sm space-x-2 space-x-reverse">
            <MousePointerClick className="w-4 h-4" />
            <span>يمكنك الضغط في أي مكان على الشاشة</span>
          </div>

        </div>
      </div>

      {/* Touch Ripple Effect */}
      {touchPosition && (
        <span 
          className="absolute rounded-full bg-emerald-500/30 animate-ping pointer-events-none"
          style={{
            left: touchPosition.x,
            top: touchPosition.y,
            width: '100px',
            height: '100px',
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}
    </div>
  );
};

export default App;