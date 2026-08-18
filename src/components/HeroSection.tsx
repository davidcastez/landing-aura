import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FORM_DELAY_SECONDS = 60;

const HeroSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const allowedTimeRef = useRef(0);
  const checkIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Form delay timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }, FORM_DELAY_SECONDS * 1000);
    return () => clearTimeout(timer);
  }, []);

  // Load GHL form embed script
  useEffect(() => {
    if (!showForm) return;
    if (document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]')) return;
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    document.body.appendChild(script);
  }, [showForm]);

  // YouTube IFrame API - prevent seeking forward
  useEffect(() => {
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }

    const initPlayer = () => {
      playerRef.current = new (window as any).YT.Player("yt-player-etapa2", {
        events: {
          onStateChange: (event: any) => {
            if (event.data === 1) {
              // Playing
              setIsPlaying(true);
              if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
              checkIntervalRef.current = setInterval(() => {
                if (!playerRef.current?.getCurrentTime) return;
                const current = playerRef.current.getCurrentTime();
                if (current <= allowedTimeRef.current + 2) {
                  allowedTimeRef.current = Math.max(allowedTimeRef.current, current);
                } else {
                  playerRef.current.seekTo(allowedTimeRef.current, true);
                }
              }, 500);
            } else {
              setIsPlaying(false);
              if (checkIntervalRef.current) {
                clearInterval(checkIntervalRef.current);
                checkIntervalRef.current = null;
              }
            }
          },
        },
      });
    };

    if ((window as any).YT?.Player) {
      initPlayer();
    } else {
      (window as any).onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
    };
  }, []);

  // Toggle play/pause via API
  const handleVideoClick = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-24 text-center overflow-hidden">
      {/* Header with centered logo */}
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center py-5 sm:py-6">
        <img
          src="/aura-logo.png"
          alt="AURA"
          className="w-10 h-10 sm:w-14 sm:h-14"
        />
      </header>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative max-w-4xl lg:max-w-[1150px] xl:max-w-[1250px] 2xl:max-w-[1400px] font-display text-[2.25rem] sm:text-4xl md:text-[2.5rem] xl:text-[3.25rem] 2xl:text-6xl font-extrabold uppercase tracking-[-0.01em] sm:tracking-[0.02em] leading-[1.08] sm:leading-[1.15] text-balance mt-14 sm:mt-16 mb-6 sm:mb-8 text-foreground"
      >
        Ayudamos corredores y agencias inmobiliarias, a cerrar{" "}
        <span className="text-primary">de 5 a 8 ventas</span>{" "}
        mensuales en menos de 90 dias.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative max-w-2xl md:max-w-[880px] lg:max-w-[1050px] xl:max-w-[1150px] text-[1.0625rem] sm:text-lg xl:text-xl text-muted-foreground leading-relaxed mb-8 sm:mb-12"
      >
        Instala este nuevo sistema en tu negocio inmobiliario con el que te ayudaremos a{" "}
        <em className="font-bold italic underline text-black">captar y vender</em>{" "}
        propiedades sin malgastar tu tiempo, sin puerta fria, sin tener que caminar por horas y sin llamadas en frio, todo desde la comodidad tu casa u oficina
      </motion.p>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="flex flex-col items-center gap-2 text-primary"
      >
        <span className="font-display text-base sm:text-xl md:text-2xl font-black tracking-widest uppercase">
          Descubre como funciona el Metodo AURA
        </span>
        <ChevronDown className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} />
      </motion.div>

      {/* YouTube Video Embed - No seeking allowed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative w-[calc(100%+2rem)] -mx-4 max-w-none sm:w-full sm:mx-auto sm:max-w-[800px] mt-6 sm:mt-12"
      >
        <div
          id="lead-video"
          className="relative aspect-video w-full rounded-none sm:rounded-3xl overflow-hidden shadow-[0_20px_60px_-5px_rgba(111,0,255,0.3)]"
        >
          <iframe
            id="yt-player-etapa2"
            src="https://www.youtube.com/embed/OWorFLIbRoo?enablejsapi=1&rel=0&modestbranding=1&disablekb=1&fs=0"
            title="Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute inset-0 w-full h-full"
          />
          {/* Transparent overlay - blocks seek bar clicks, allows play/pause via our handler */}
          <div
            onClick={handleVideoClick}
            className="absolute inset-0 z-10 cursor-pointer"
            style={{ background: "transparent" }}
          />
        </div>
      </motion.div>

      {/* GHL Survey with 60s delay */}
      <div ref={formRef} className="relative z-20 w-full max-w-[800px] mt-8 sm:mt-12">
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 40, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <iframe
                src="https://api.leadconnectorhq.com/widget/survey/ONISXPtG8sQ4jDL2wWJ4"
                style={{ border: "none", width: "100%", minHeight: "600px", position: "relative", zIndex: 30 }}
                scrolling="no"
                id="ONISXPtG8sQ4jDL2wWJ4"
                title="survey"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HeroSection;
