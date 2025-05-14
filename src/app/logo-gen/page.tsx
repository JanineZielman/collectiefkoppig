'use client'
import { useRef, useState, useEffect } from 'react';

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<string[]>([]); // for undo

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';

    const startDrawing = (e: MouseEvent) => {
      saveHistory(); // Save before drawing
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

  const saveHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const data = canvas.toDataURL();
    setHistory((prev) => [...prev.slice(-19), data]); // Keep last 20
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas || history.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const lastImage = history[history.length - 1];
    const img = new Image();
    img.src = lastImage;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };

    setHistory((prev) => prev.slice(0, -1));
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="drawing space-y-4">
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        className="border border-gray-400 rounded"
      />
      <div className="flex">
        <div onClick={handleUndo} className="px-4 py-2 bg-yellow-500 text-white rounded">
          Undo
        </div>
        <div onClick={downloadImage} className="px-4 py-2 bg-green-500 text-white rounded">
          Download
        </div>
      </div>
    </div>
  );
}
