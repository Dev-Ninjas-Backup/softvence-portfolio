"use client";

import { useEffect, useRef } from "react";
import createGlobe, { type Marker } from "cobe";
import { cn } from "@/lib/utils";

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.startsWith("#") ? hex.slice(1) : hex;
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((channel) => channel + channel)
          .join("")
      : clean;

  if (full.length !== 6) return [0.4, 0.65, 1];

  return [
    parseInt(full.slice(0, 2), 16) / 255,
    parseInt(full.slice(2, 4), 16) / 255,
    parseInt(full.slice(4, 6), 16) / 255,
  ];
}

export type GlobeMarker = {
  location: [number, number];
  size: number;
};

export type GlobeProps = {
  className?: string;
  theta?: number;
  phi?: number;
  dark?: number;
  scale?: number;
  diffuse?: number;
  mapSamples?: number;
  mapBrightness?: number;
  baseColor?: [number, number, number] | string;
  markerColor?: [number, number, number] | string;
  glowColor?: [number, number, number] | string;
  /** 1 is opaque. Lower (including slightly negative) lets the page show through. */
  opacity?: number;
  markers?: GlobeMarker[];
  enableZoom?: boolean;
  minScale?: number;
  maxScale?: number;
  zoomSensitivity?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

export function Globe({
  className,
  theta = 0.25,
  phi = 0,
  dark = 0,
  scale = 1.1,
  diffuse = 1.2,
  mapSamples = 16000,
  mapBrightness = 10,
  baseColor = "#ffffff",
  markerColor = "#3fd14b",
  glowColor = "#ffffff",
  opacity = 1,
  markers = [],
  enableZoom = true,
  minScale = 0.4,
  maxScale = 3.5,
  zoomSensitivity = 0.002,
  autoRotate = true,
  autoRotateSpeed = 0.003,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const markersKey = markers
    .map((marker) => `${marker.location[0]},${marker.location[1]},${marker.size}`)
    .join(";");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resolvedBase = typeof baseColor === "string" ? hexToRgb(baseColor) : baseColor;
    const resolvedMarker = typeof markerColor === "string" ? hexToRgb(markerColor) : markerColor;
    const resolvedGlow = typeof glowColor === "string" ? hexToRgb(glowColor) : glowColor;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const phiRef = { current: phi };
    const thetaRef = { current: theta };
    const targetScale = { current: scale };
    const currentScale = { current: scale };
    const dragging = { current: false };
    const last = { x: 0, y: 0 };
    const visible = { current: false };
    let globe: ReturnType<typeof createGlobe> | null = null;
    let frame = 0;
    let running = false;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const readSize = () => {
      const rect = canvas.getBoundingClientRect();
      return {
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      };
    };

    const ensureGlobe = () => {
      const next = readSize();
      if (next.width < 20 || next.height < 20) return null;

      if (!globe) {
        width = next.width;
        height = next.height;
        globe = createGlobe(canvas, {
          devicePixelRatio: dpr,
          width,
          height,
          phi: phiRef.current,
          theta: thetaRef.current,
          dark,
          scale: currentScale.current,
          diffuse,
          mapSamples,
          mapBrightness,
          baseColor: resolvedBase,
          markerColor: resolvedMarker,
          glowColor: resolvedGlow,
          opacity,
          offset: [0, 0],
          markers: markers as Marker[],
        });
        return globe;
      }

      return globe;
    };

    const paint = () => {
      const current = ensureGlobe();
      if (!current) return;

      const next = readSize();
      const sizeChanged = next.width !== width || next.height !== height;
      if (sizeChanged && next.width >= 20 && next.height >= 20) {
        width = next.width;
        height = next.height;
      }

      currentScale.current += (targetScale.current - currentScale.current) * 0.12;
      if (!dragging.current && autoRotate && !reduced) {
        phiRef.current += autoRotateSpeed;
      }

      current.update({
        phi: phiRef.current,
        theta: thetaRef.current,
        scale: currentScale.current,
        ...(sizeChanged ? { width, height } : {}),
      });
    };

    const loop = () => {
      if (!running) return;
      if (visible.current) paint();
      frame = window.requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      loop();
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(frame);
    };

    const onMouseDown = (event: MouseEvent) => {
      dragging.current = true;
      last.x = event.clientX;
      last.y = event.clientY;
      canvas.style.cursor = "grabbing";
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!dragging.current) return;
      const deltaX = event.clientX - last.x;
      const deltaY = event.clientY - last.y;
      phiRef.current += deltaX * 0.005;
      thetaRef.current = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, thetaRef.current - deltaY * 0.005),
      );
      last.x = event.clientX;
      last.y = event.clientY;
    };

    const endDrag = () => {
      dragging.current = false;
      canvas.style.cursor = "grab";
    };

    const onWheel = (event: WheelEvent) => {
      if (!enableZoom) return;
      if (!event.ctrlKey && !event.metaKey && !dragging.current) return;
      event.preventDefault();
      const next = targetScale.current + -event.deltaY * zoomSensitivity;
      targetScale.current = Math.max(minScale, Math.min(maxScale, next));
    };

    let touchDistance = 0;
    let touchScale = scale;

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        dragging.current = true;
        last.x = event.touches[0].clientX;
        last.y = event.touches[0].clientY;
      } else if (event.touches.length === 2 && enableZoom) {
        dragging.current = false;
        const dx = event.touches[0].clientX - event.touches[1].clientX;
        const dy = event.touches[0].clientY - event.touches[1].clientY;
        touchDistance = Math.hypot(dx, dy);
        touchScale = targetScale.current;
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 1 && dragging.current) {
        const deltaX = event.touches[0].clientX - last.x;
        const deltaY = event.touches[0].clientY - last.y;
        phiRef.current += deltaX * 0.005;
        thetaRef.current = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, thetaRef.current - deltaY * 0.005),
        );
        last.x = event.touches[0].clientX;
        last.y = event.touches[0].clientY;
      } else if (event.touches.length === 2 && enableZoom && touchDistance > 0) {
        event.preventDefault();
        const dx = event.touches[0].clientX - event.touches[1].clientX;
        const dy = event.touches[0].clientY - event.touches[1].clientY;
        const next = touchScale * (Math.hypot(dx, dy) / touchDistance);
        targetScale.current = Math.max(minScale, Math.min(maxScale, next));
      }
    };

    const onTouchEnd = () => {
      dragging.current = false;
      touchDistance = 0;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = Boolean(entry?.isIntersecting);
        if (visible.current) start();
        else stop();
      },
      { rootMargin: "150px" },
    );

    observer.observe(canvas);
    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", endDrag);
    canvas.addEventListener("mouseleave", endDrag);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("resize", paint);

    return () => {
      stop();
      observer.disconnect();
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", endDrag);
      canvas.removeEventListener("mouseleave", endDrag);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", paint);
      globe?.destroy();
    };
  }, [
    theta,
    phi,
    dark,
    scale,
    diffuse,
    mapSamples,
    mapBrightness,
    baseColor,
    markerColor,
    glowColor,
    opacity,
    markersKey,
    enableZoom,
    minScale,
    maxScale,
    zoomSensitivity,
    autoRotate,
    autoRotateSpeed,
  ]);

  return (
    <div className={cn("relative h-full min-h-[400px] w-full", className)}>
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={{ cursor: "grab" }}
        aria-hidden
      />
    </div>
  );
}
