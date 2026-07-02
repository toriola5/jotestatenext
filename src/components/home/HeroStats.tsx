"use client";

import { useEffect, useRef, useState } from "react";
import { Home, MapPin, TrendingUp } from "lucide-react";

const stats = [
  { icon: Home, value: 500, suffix: "+", label: "Properties" },
  { icon: MapPin, value: 20, suffix: "+", label: "Cities" },
  { icon: TrendingUp, value: 98, suffix: "%", label: "Client Satisfaction" },
];

function useCountUp(target: number, duration = 1500, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [target, duration, active]);

  return count;
}

function StatItem({
  icon: Icon,
  value,
  suffix,
  label,
}: (typeof stats)[0]) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const count = useCountUp(value, 1500, active);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <div className="flex items-center justify-center gap-1.5 mb-1">
        <Icon size={16} className="text-[var(--primary)]" />
        <p className="text-2xl font-bold text-white">
          {count}
          {suffix}
        </p>
      </div>
      <p className="text-gray-400 text-xs">{label}</p>
    </div>
  );
}

export default function HeroStats() {
  return (
    <div className="mt-16 flex items-center gap-10">
      {stats.map((s) => (
        <StatItem key={s.label} {...s} />
      ))}
    </div>
  );
}
