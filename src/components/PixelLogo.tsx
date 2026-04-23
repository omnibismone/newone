import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface PixelLogoProps {
  src: string;
  size?: number;
  color?: string;
  glowColor?: string;
}

export default function PixelLogo({ 
  src, 
  size = 400, 
  color = "#ffffff", 
  glowColor = "#ffffff" 
}: PixelLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: -1000, y: -1000 });
  const dotsRef = useRef<{ x: number; y: number; originalX: number; originalY: number; active: boolean }[]>([]);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      const aspect = img.width / img.height;
      let drawW = size;
      let drawH = size / aspect;
      if (drawH > size) {
        drawH = size;
        drawW = size * aspect;
      }

      tempCanvas.width = size;
      tempCanvas.height = size;
      
      tempCtx.imageSmoothingEnabled = true;
      tempCtx.imageSmoothingQuality = "high";
      
      const offsetX = (size - drawW) / 2;
      const offsetY = (size - drawH) / 2;
      
      tempCtx.drawImage(img, offsetX, offsetY, drawW, drawH);

      const imageData = tempCtx.getImageData(0, 0, size, size).data;
      const newDots = [];
      
      const step = 3; // Mật độ cơ bản

      for (let y = 0; y < size; y += step) {
        for (let x = 0; x < size; x += step) {
          // Tính toán "Trọng tâm" (Center of Mass) trong khối step x step
          // Điều này giúp các điểm di chuyển chính xác theo đường chéo của SVG
          // thay vì bị kẹt vào lưới ô vuông (gây hiện tượng bậc thang)
          let sumX = 0;
          let sumY = 0;
          let count = 0;
          let maxAlpha = 0;

          for (let sy = 0; sy < step; sy++) {
            for (let sx = 0; sx < step; sx++) {
              const px = x + sx;
              const py = y + sy;
              if (px >= size || py >= size) continue;

              const index = (py * size + px) * 4;
              const alpha = imageData[index + 3];

              if (alpha > 20) {
                sumX += px;
                sumY += py;
                count++;
                if (alpha > maxAlpha) maxAlpha = alpha;
              }
            }
          }

          if (count > 0) { 
            // Vị trí trung bình của các pixel đặc trong khối này
            const avgX = sumX / count;
            const avgY = sumY / count;

            newDots.push({
              x: avgX,
              y: avgY,
              originalX: avgX,
              originalY: avgY,
              alpha: maxAlpha / 255,
              active: true
            });
          }
        }
      }
      dotsRef.current = newDots;
    };
  }, [src, size]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mousePos = mousePosRef.current;

      dotsRef.current.forEach((dot: any) => {
        const dx = mousePos.x - dot.originalX;
        const dy = mousePos.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 120; 

        let currentSize = 0.7; 
        let baseOpacity = 0.12 * dot.alpha; // Mờ dần ở cạnh dựa trên alpha gốc
        let opacity = baseOpacity;
        let currentColor = color;

        if (dist < maxDist) {
          const ratio = 1 - dist / maxDist;
          currentSize = 0.7 + ratio * 1.5; 
          opacity = baseOpacity + ratio * (1 - baseOpacity); 
          currentColor = glowColor;
        }

        ctx.fillStyle = currentColor;
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(dot.originalX, dot.originalY, currentSize, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, glowColor]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    mousePosRef.current = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const handleMouseLeave = () => {
    mousePosRef.current = { x: -1000, y: -1000 };
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="pointer-events-auto cursor-none opacity-60 md:opacity-100"
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      />
    </div>
  );
}
