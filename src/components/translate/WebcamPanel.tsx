import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface WebcamPanelProps {
  onFrame?: (ts: number) => void;
}

export const WebcamPanel = ({ onFrame }: WebcamPanelProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    let stream: MediaStream;
    const enable = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (e) {
        console.error('Webcam error', e);
      }
    };
    enable();
    return () => {
      if (stream) stream.getTracks().forEach(t => t.stop());
    };
  }, [active]);

  useEffect(() => {
    let raf = 0;
    const draw = (time: number) => {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      if (!canvas || !video) { raf = requestAnimationFrame(draw); return; }
      const ctx = canvas.getContext('2d');
      if (!ctx) { raf = requestAnimationFrame(draw); return; }
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      // Example pose overlay placeholder (animated ring)
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.strokeStyle = `hsl(${time/40 % 360} 80% 60%)`;
      ctx.lineWidth = 4;
      const r = 30 + Math.sin(time/400)*10;
      ctx.beginPath();
      ctx.arc(canvas.width*0.5, canvas.height*0.5, r, 0, Math.PI*2);
      ctx.stroke();
      onFrame?.(time);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [onFrame]);

  return (
    <div className="relative rounded-lg overflow-hidden border bg-card">
      <div className="aspect-video w-full bg-muted" aria-label="Webcam preview">
        <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      </div>
      <div className="p-3 flex justify-end gap-2">
        <Button variant={active ? 'destructive' : 'hero'} onClick={() => setActive(v => !v)}>
          {active ? 'Stop Camera' : 'Start Camera'}
        </Button>
      </div>
    </div>
  );
};
