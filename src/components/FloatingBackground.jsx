import React, { useEffect, useRef } from 'react';

export default function FloatingBackground({ isDreamy = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const stars = [];
    const sparkles = [];
    const count = window.innerWidth < 768 ? 25 : 40;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize floating stars
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 10 + 6,
        speedY: Math.random() * 0.8 + 0.3,
        speedX: Math.sin(Math.random() * Math.PI) * 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        color: isDreamy 
          ? `hsla(${Math.random() * 40 + 200}, 90%, 65%, `
          : `hsla(${Math.random() * 40 + 190}, 85%, 58%, `,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    // Initialize sparkles
    for (let i = 0; i < 25; i++) {
      sparkles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3.5 + 1,
        opacity: Math.random(),
        pulseSpeed: Math.random() * 0.03 + 0.01,
        increasing: Math.random() > 0.5,
      });
    }

    // Draw 4-point sparkling star shape on canvas (No hearts!)
    const drawStar = (x, y, size, color, opacity, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      const r = size;
      ctx.moveTo(0, -r);
      ctx.quadraticCurveTo(0, 0, r, 0);
      ctx.quadraticCurveTo(0, 0, 0, r);
      ctx.quadraticCurveTo(0, 0, -r, 0);
      ctx.quadraticCurveTo(0, 0, 0, -r);
      ctx.closePath();
      ctx.fillStyle = `${color}${opacity})`;
      ctx.shadowColor = 'rgba(56, 189, 248, 0.6)';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.restore();
    };

    const drawSparkle = (x, y, size, opacity) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
      ctx.shadowColor = 'rgba(245, 158, 11, 0.9)';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render & Update Sparkles
      sparkles.forEach((s) => {
        if (s.increasing) {
          s.opacity += s.pulseSpeed;
          if (s.opacity >= 1) s.increasing = false;
        } else {
          s.opacity -= s.pulseSpeed;
          if (s.opacity <= 0.1) s.increasing = true;
        }
        drawSparkle(s.x, s.y, s.size, s.opacity);
      });

      // Render & Update Stars
      stars.forEach((st) => {
        st.y -= st.speedY;
        st.x += Math.sin(st.y * 0.01) * 0.5;
        st.rotation += st.rotationSpeed;

        // Reset star if it moves above viewport
        if (st.y < -30) {
          st.y = canvas.height + 30;
          st.x = Math.random() * canvas.width;
        }

        drawStar(st.x, st.y, st.size, st.color, st.opacity, st.rotation);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDreamy]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
    />
  );
}
