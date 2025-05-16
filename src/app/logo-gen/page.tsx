'use client';
import { useRef, useState, useEffect } from 'react';

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';

    const getOffset = (e: TouchEvent | MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (e instanceof TouchEvent) {
        const touch = e.touches[0] || e.changedTouches[0];
        return {
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
        };
      } else {
        return {
          x: e.offsetX,
          y: e.offsetY,
        };
      }
    };

    const startDrawing = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      saveHistory();
      const { x, y } = getOffset(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
      setIsDrawing(true);
    };

    const draw = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      e.preventDefault();
      const { x, y } = getOffset(e);
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const stopDrawing = (e?: Event) => {
      if (!isDrawing) return;
      e?.preventDefault();
      setIsDrawing(false);
      ctx.closePath();
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchcancel', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
      canvas.removeEventListener('touchcancel', stopDrawing);
    };
  }, [isDrawing]);

  const saveHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const data = canvas.toDataURL();
    setHistory((prev) => [...prev.slice(-19), data]);
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

  const copyImageAndMail = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !navigator.clipboard?.write) {
      alert('Clipboard image copy not supported in this browser.');
      return;
    }
  
    try {
      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) =>
        canvas.toBlob((b) => b && resolve(b), 'image/png')
      );
  
      if (!blob) throw new Error('Could not create image blob');
  
      // Copy to clipboard as image
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
  
      // Open mail client
      const subject = encodeURIComponent('Logo');
      const body = encodeURIComponent('Hoihoi!\n\nIk heb iets moois getekend 😄\n\n Plak het hieronder (Ctrl+V of Cmd+V) om het te zien:\n\n');
      window.location.href = `mailto:info@collectiefkoppig.nl?subject=${subject}&body=${body}`;
    } catch (err) {
      console.error(err);
      alert('Failed to copy image. Make sure you’re using a supported browser.');
    }
  };
  

  return (
    <div className="drawing space-y-4">
      <canvas
        ref={canvasRef}
        width="400"
        height="400"
        className="border border-gray-400 rounded w-full h-auto touch-none"
      />
      <div className="flex gap-4 justify-center flex-wrap">
        <div onClick={handleUndo} className="px-4 py-2 bg-yellow-500 text-white rounded cursor-pointer">
          Undo
        </div>
        <div onClick={downloadImage} className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer">
          Download
        </div>
        <div
          onClick={copyImageAndMail}
          className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
        >
          Delen
        </div>
      </div>
    </div>
  );
}
