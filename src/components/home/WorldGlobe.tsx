"use client";

import { useEffect, useRef } from "react";
import { Users } from "lucide-react";

type City = {
  name: string;
  lat: number;
  lon: number;
  label: string;
};

const CITIES: City[] = [
  { name: "Frisco, TX", lat: 33.15, lon: -96.82, label: "Meeting together" },
  { name: "London, UK", lat: 51.51, lon: -0.13, label: "Meeting together" },
  { name: "Tokyo, Japan", lat: 35.68, lon: 139.69, label: "Meeting together" },
  { name: "Nairobi, Kenya", lat: -1.29, lon: 36.82, label: "Meeting together" },
  { name: "São Paulo, Brazil", lat: -23.55, lon: -46.63, label: "Meeting together" },
];

function toVector(lat: number, lon: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return {
    x: Math.sin(phi) * Math.cos(theta),
    y: Math.cos(phi),
    z: Math.sin(phi) * Math.sin(theta),
  };
}

function rotateY(point: { x: number; y: number; z: number }, angle: number) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: point.x * cos - point.z * sin,
    y: point.y,
    z: point.x * sin + point.z * cos,
  };
}

function buildDots() {
  const dots: { x: number; y: number; z: number }[] = [];
  const rings = 42;
  for (let i = 0; i <= rings; i += 1) {
    const v = i / rings;
    const lat = 90 - v * 180;
    const count = Math.max(8, Math.round(Math.sin((v * Math.PI)) * 72));
    for (let j = 0; j < count; j += 1) {
      const lon = (j / count) * 360 - 180;
      dots.push(toVector(lat, lon));
    }
  }
  return dots;
}

const DOTS = buildDots();
const CITY_POINTS = CITIES.map((city) => ({
  ...city,
  point: toVector(city.lat, city.lon),
}));

export function WorldGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let frame = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const bounds = wrap.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = (time: number) => {
      const angle = time * 0.00012;
      const radius = Math.min(width, height) * 0.34;
      const cx = width / 2;
      const cy = height / 2 + 8;

      context.clearRect(0, 0, width, height);
      context.beginPath();
      context.arc(cx, cy, radius + 1.5, 0, Math.PI * 2);
      context.strokeStyle = "rgba(255, 106, 0, 0.55)";
      context.lineWidth = 1.5;
      context.stroke();

      for (const dot of DOTS) {
        const rotated = rotateY(dot, angle);
        if (rotated.z < -0.05) {
          continue;
        }
        const depth = (rotated.z + 1) / 2;
        context.fillStyle = `rgba(255, 255, 255, ${0.08 + depth * 0.28})`;
        context.beginPath();
        context.arc(
          cx + rotated.x * radius,
          cy - rotated.y * radius,
          0.7 + depth * 0.6,
          0,
          Math.PI * 2,
        );
        context.fill();
      }

      CITY_POINTS.forEach((city, index) => {
        const rotated = rotateY(city.point, angle);
        const visible = rotated.z > 0.05;
        const x = cx + rotated.x * radius;
        const y = cy - rotated.y * radius;
        const card = cardRefs.current[index];

        if (visible) {
          context.beginPath();
          context.fillStyle = "#ff6a00";
          context.arc(x, y, 3.4, 0, Math.PI * 2);
          context.fill();
        }

        if (card) {
          card.style.opacity = visible ? "1" : "0";
          card.style.transform = `translate(${x}px, ${y}px) translate(-50%, -118%)`;
        }
      });

      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="bg-black">
      <div className="mx-auto max-w-[1220px] px-5 pt-16">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-white/45">
          Around the world
        </p>
        <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          People meeting everywhere.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65">
          Ordinary believers gathering in cities, villages, and homes to share
          Jesus and start simple churches.
        </p>
      </div>

      <div
        ref={wrapRef}
        className="relative mx-auto h-[520px] w-full max-w-[980px] sm:h-[620px]"
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        {CITIES.map((city, index) => (
          <div
            key={city.name}
            ref={(node) => {
              cardRefs.current[index] = node;
            }}
            className="pointer-events-none absolute top-0 left-0 opacity-0 transition-opacity duration-300"
          >
            <div className="min-w-[168px] rounded-2xl bg-[#171717] px-4 py-3 text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fff4ec] text-[var(--sending-orange)]">
                  <Users size={14} />
                </span>
                <p className="text-sm font-medium leading-snug">{city.label}</p>
              </div>
              <p className="mt-2 text-[11px] tracking-[0.14em] uppercase text-white/45">
                {city.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
