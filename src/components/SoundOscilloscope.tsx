import { useEffect, useRef } from 'react';
import { retroAudio } from '../audio/soundSynthesizer';

interface SoundOscilloscopeProps {
  color?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function SoundOscilloscope({
  color = '#00F0FF',
  width = 160,
  height = 36,
  className = '',
}: SoundOscilloscopeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const bufferLength = retroAudio.analyser ? retroAudio.analyser.frequencyBinCount : 64;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      animationId = requestAnimationFrame(render);

      if (retroAudio.analyser) {
        retroAudio.analyser.getByteTimeDomainData(dataArray);
      } else {
        // Flat idle line if audio is inactive
        for (let i = 0; i < bufferLength; i++) {
          dataArray[i] = 128;
        }
      }

      ctx.clearRect(0, 0, width, height);

      // Background subtle grid
      ctx.fillStyle = 'rgba(10, 10, 20, 0.6)';
      ctx.fillRect(0, 0, width, height);

      // Draw audio waveform
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      ctx.beginPath();

      const sliceWidth = width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.lineTo(width, height / 2);
      ctx.stroke();
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [color, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`rounded border border-cyan-900/60 bg-black/40 shadow-inner ${className}`}
      title="Real-time Web Audio Waveform"
    />
  );
}
