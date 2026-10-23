/** Generic multi-spoke wheel glyph used as the working wordmark icon. */
export function WheelMark({ className = "h-6 w-6" }: { className?: string }) {
  const spokes = Array.from({ length: 10 }, (_, i) => i * 36);
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none">
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="24" cy="24" r="17" stroke="currentColor" strokeOpacity=".35" strokeWidth="1" />
      {spokes.map((deg) => (
        <path
          key={deg}
          d="M24 24 L22.6 7.5 M24 24 L25.4 7.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          transform={`rotate(${deg} 24 24)`}
        />
      ))}
      <path d="M33 33.5a12.5 12.5 0 0 0 3.5-7" stroke="#A4FF21" strokeWidth="3" strokeLinecap="round" />
      <circle cx="24" cy="24" r="3.2" fill="currentColor" />
      <path d="M24 24 L15 33" stroke="#E63946" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
