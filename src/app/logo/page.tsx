'use client'
import { useRef, useState, useEffect } from 'react';

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';

    const startDrawing = (e: MouseEvent) => {
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
      setIsDrawing(true);
    };

    const draw = (e: MouseEvent) => {
      if (!isDrawing) return;
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    };

    const stopDrawing = () => {
      setIsDrawing(false);
      ctx.closePath();
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
    };
  }, [isDrawing]);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="drawing">
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        className="border border-gray-400 rounded"
      />
      <div
        onClick={downloadImage}
        className="downloadButton"
      >
        Download
      </div>
    </div>
  );
}
