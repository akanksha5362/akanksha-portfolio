"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const PhoneScene = dynamic(() => import("./PhoneScene"), { ssr: false });

function StaticIllustration() {
  return (
    <svg
      viewBox="0 0 320 420"
      className="w-full h-full max-w-[280px] mx-auto"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0A0F0D" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect
        x="40"
        y="20"
        width="200"
        height="380"
        rx="28"
        fill="#0D1310"
        stroke="#1E3A5F"
        strokeWidth="2"
      />
      <rect x="56" y="44" width="168" height="332" rx="14" fill="url(#screenGrad)" />
      {[110, 150, 190, 230, 270].map((y, i) => (
        <rect
          key={y}
          x="72"
          y={y}
          width={i % 2 === 0 ? 136 : 96}
          height="18"
          rx="9"
          fill={i % 2 === 0 ? "#10B981" : "#22D3EE"}
          opacity="0.55"
        />
      ))}
      <circle cx="140" cy="70" r="4" fill="#22D3EE" />
    </svg>
  );
}

export default function HeroVisual() {
  const reducedMotion = useReducedMotion();
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setCanRender3D(Boolean(gl) && !reducedMotion);
    } catch {
      setCanRender3D(false);
    }
  }, [reducedMotion]);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px]">
      <div className="absolute inset-0 rounded-full bg-emerald/10 blur-[100px]" />
      {canRender3D ? <PhoneScene /> : <StaticIllustration />}
    </div>
  );
}
