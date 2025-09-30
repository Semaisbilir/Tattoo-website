import React, { useRef, useEffect, useState } from "react";

interface Props {
  bodyImageUrl: string;
  tattooImageUrl: string;
  onExport: (data: string) => void;
}

export const TattooCanvas = ({ bodyImageUrl, tattooImageUrl, onExport }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tattooPos, setTattooPos] = useState({ x: 150, y: 150 });
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0); // in degrees

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bodyImg = new Image();
    const tattooImg = new Image();
    let loaded = 0;

    bodyImg.crossOrigin = "anonymous";
    tattooImg.crossOrigin = "anonymous";

    const draw = () => {
      canvas.width = 512;
      canvas.height = 512;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bodyImg, 0, 0, canvas.width, canvas.height);

      const centerX = tattooPos.x + 50;
      const centerY = tattooPos.y + 50;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(scale, scale);
      ctx.drawImage(tattooImg, -50, -50, 100, 100);
      ctx.restore();

      onExport(canvas.toDataURL("image/png"));
    };

    bodyImg.onload = tattooImg.onload = () => {
      loaded++;
      if (loaded === 2) draw();
    };

    bodyImg.src = bodyImageUrl;
    tattooImg.src = tattooImageUrl;
  };

  useEffect(() => {
    drawCanvas();
  }, [bodyImageUrl, tattooImageUrl, tattooPos, scale, rotation]);

  // --- Drag handlers with offset ---
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // store offset relative to tattoo position
    setDragOffset({
      x: clickX - tattooPos.x,
      y: clickY - tattooPos.y,
    });

    setDragging(true);
  };

  const handleMouseUp = () => setDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setTattooPos({
      x: mouseX - dragOffset.x,
      y: mouseY - dragOffset.y,
    });
  };

  return (
    <div className="space-y-2">
      <canvas
        ref={canvasRef}
        className="border w-full rounded"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      />

      <div className="flex gap-4">
        <div>
          <label className="block text-sm font-medium">Scale</label>
          <input
            type="range"
            min={0.3}
            max={3}
            step={0.1}
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Rotation</label>
          <input
            type="range"
            min={-180}
            max={180}
            step={1}
            value={rotation}
            onChange={(e) => setRotation(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};
