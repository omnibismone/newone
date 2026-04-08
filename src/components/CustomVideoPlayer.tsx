import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

interface CustomVideoPlayerProps {
  youtubeId: string;
}

export default function CustomVideoPlayer({ youtubeId }: CustomVideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePlayPause = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPlaying(!playing);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setMuted(newVolume === 0);
  };

  const handleToggleMuted = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMuted(!muted);
  };

  const handleProgress = (state: { played: number }) => {
    setPlayed(state.played);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    if (playerRef.current) {
      playerRef.current.seekTo(parseFloat((e.target as HTMLInputElement).value));
    }
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  const Player = ReactPlayer as any;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-black group flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* The actual player */}
      <div className="absolute inset-0">
        <div className="w-full h-full scale-[1.15] origin-center">
          <Player
            ref={playerRef}
            url={`https://www.youtube.com/watch?v=${youtubeId}`}
            width="100%"
            height="100%"
            playing={playing}
            volume={volume}
            muted={muted}
            controls={false}
            light={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
            playIcon={
              <div className="w-20 h-20 bg-[#ff0099]/80 rounded-full flex items-center justify-center text-white backdrop-blur-sm hover:scale-110 transition-transform cursor-pointer shadow-[0_0_30px_rgba(255,0,153,0.5)] z-50">
                <Play size={40} className="ml-2" />
              </div>
            }
            onClickPreview={() => {
              setHasStarted(true);
              setPlaying(true);
            }}
            onPlay={() => {
              setHasStarted(true);
              setPlaying(true);
            }}
            onPause={() => setPlaying(false)}
            onProgress={(state: any) => handleProgress(state)}
            onDuration={handleDuration}
            config={{
              youtube: {
                playerVars: { 
                  modestbranding: 1, 
                  rel: 0, 
                  showinfo: 0, 
                  iv_load_policy: 3,
                  disablekb: 1,
                  origin: typeof window !== 'undefined' ? window.location.origin : ''
                }
              }
            } as any}
          />
        </div>
      </div>

      {/* Custom Overlay to catch clicks for play/pause AFTER started */}
      {hasStarted && (
        <div 
          className="absolute inset-0 z-10 cursor-pointer"
          onClick={handlePlayPause}
        />
      )}

      {/* Big Play Button Overlay when paused (after initial start) */}
      {hasStarted && !playing && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="w-20 h-20 bg-[#ff0099]/80 rounded-full flex items-center justify-center text-white backdrop-blur-sm shadow-[0_0_30px_rgba(255,0,153,0.5)]">
            <Play size={40} className="ml-2" />
          </div>
        </div>
      )}

      {/* Custom Controls */}
      {hasStarted && (
        <div 
          className={`absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 transition-opacity duration-300 ${isHovering || !playing ? 'opacity-100' : 'opacity-0'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Progress Bar */}
          <div className="w-full flex items-center mb-4 group/progress cursor-pointer relative h-2">
            <input
              type="range"
              min={0}
              max={0.999999}
              step="any"
              value={played}
              onChange={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
              className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-pointer"
            />
            <div className="absolute left-0 right-0 h-1 bg-white/30 rounded-full overflow-hidden group-hover/progress:h-1.5 transition-all">
              <div 
                className="h-full bg-[#ff0099]"
                style={{ width: `${played * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-6">
              <button onClick={handlePlayPause} className="hover:text-[#ff0099] transition-colors">
                {playing ? <Pause size={24} /> : <Play size={24} />}
              </button>
              
              <div className="flex items-center gap-2 group/volume">
                <button onClick={handleToggleMuted} className="hover:text-[#ff0099] transition-colors">
                  {muted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <div className="w-0 opacity-0 group-hover/volume:w-24 group-hover/volume:opacity-100 transition-all duration-300 overflow-hidden flex items-center">
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step="any"
                    value={muted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#ff0099]"
                  />
                </div>
              </div>

              <span className="text-sm font-mono opacity-80">
                {formatTime(played * duration)} / {formatTime(duration)}
              </span>
            </div>

            <button onClick={handleFullscreen} className="hover:text-[#ff0099] transition-colors">
              <Maximize size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
