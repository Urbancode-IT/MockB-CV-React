import { useEffect, useRef, useState } from 'react';

const DESKTOP_WIDTH = 1280;

/** Renders children at a fixed desktop width, scaled to fit the parent — matches full preview layout. */
export default function ScaledDesktopPreview({ children, width = DESKTOP_WIDTH, revision = 0 }) {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [innerHeight, setInnerHeight] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return undefined;

    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const available = wrap.clientWidth || width;
        setScale(Math.min(1, available / width));
        setInnerHeight(inner.scrollHeight || 0);
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    ro.observe(inner);

    const imgs = inner.querySelectorAll('img');
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener('load', measure, { once: true });
    });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [width, revision]);

  return (
    <div
      ref={wrapRef}
      className="pm-scaled-preview"
      style={{ height: innerHeight ? Math.ceil(innerHeight * scale) : undefined }}
    >
      <div
        ref={innerRef}
        className="pm-scaled-preview__inner"
        style={{
          width,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
