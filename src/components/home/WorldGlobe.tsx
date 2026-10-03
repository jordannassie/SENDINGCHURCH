"use client";

import { useEffect, useRef } from "react";
import { Users } from "lucide-react";

type City = {
  name: string;
  lat: number;
  lon: number;
  label: string;
};

type Vec = { x: number; y: number; z: number };

const CITIES: City[] = [
  { name: "Frisco, TX", lat: 33.15, lon: -96.82, label: "Meeting together" },
  { name: "London, UK", lat: 51.51, lon: -0.13, label: "Meeting together" },
  { name: "Tokyo, Japan", lat: 35.68, lon: 139.69, label: "Meeting together" },
  { name: "Nairobi, Kenya", lat: -1.29, lon: 36.82, label: "Meeting together" },
  { name: "São Paulo, Brazil", lat: -23.55, lon: -46.63, label: "Meeting together" },
];

function toVector(lat: number, lon: number): Vec {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return {
    x: Math.sin(phi) * Math.cos(theta),
    y: Math.cos(phi),
    z: Math.sin(phi) * Math.sin(theta),
  };
}

function rotateY(point: Vec, angle: number): Vec {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: point.x * cos - point.z * sin,
    y: point.y,
    z: point.x * sin + point.z * cos,
  };
}

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
    let land: Vec[][] = [];

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

    const loadLand = fetch("/world-land.json")
      .then((response) => response.json())
      .then((rings: number[][][]) => {
        land = rings.map((ring) =>
          ring.map(([lon, lat]) => toVector(lat, lon)),
        );
      })
      .catch(() => {
        land = [];
      });

    const drawRing = (
      ring: Vec[],
      angle: number,
      radius: number,
      cx: number,
      cy: number,
    ) => {
      let drawing = false;
      for (const point of ring) {
        const rotated = rotateY(point, angle);
        if (rotated.z < 0.04) {
          drawing = false;
          continue;
        }
        const x = cx + rotated.x * radius;
        const y = cy - rotated.y * radius;
        if (!drawing) {
          context.moveTo(x, y);
          drawing = true;
        } else {
          context.lineTo(x, y);
        }
      }
    };

    const draw = (time: number) => {
      const angle = time * 0.00012;
      const radius = Math.min(width, height) * 0.34;
      const cx = width / 2;
      const cy = height / 2 + 8;

      context.clearRect(0, 0, width, height);
      context.save();
      context.beginPath();
      context.arc(cx, cy, radius, 0, Math.PI * 2);
      context.fillStyle = "#0b0b0b";
      context.fill();
      context.clip();

      context.beginPath();
      for (const ring of land) {
        drawRing(ring, angle, radius, cx, cy);
      }
      context.fillStyle = "rgba(255, 255, 255, 0.16)";
      context.fill();
      context.strokeStyle = "rgba(255, 255, 255, 0.42)";
      context.lineWidth = 1;
      context.stroke();
      context.restore();

      context.beginPath();
      context.arc(cx, cy, radius + 1.5, 0, Math.PI * 2);
      context.strokeStyle = "rgba(255, 106, 0, 0.55)";
      context.lineWidth = 1.5;
      context.stroke();

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

    void loadLand;
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
        className="relative mx-auto h-[520px] w-full max-w-[980px] overflow-visible sm:h-[620px]"
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
