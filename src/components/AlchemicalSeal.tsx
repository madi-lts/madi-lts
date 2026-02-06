export default function AlchemicalSeal() {
  const cx = 250;
  const cy = 250;
  const stroke = "#a8a29e";

  // Hexagram vertices (two overlapping triangles at r=200)
  const hexVertices = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60 - 90) * (Math.PI / 180);
    return { x: cx + 200 * Math.cos(angle), y: cy + 200 * Math.sin(angle) };
  });

  // Triangle 1: vertices 0, 2, 4 — Triangle 2: vertices 1, 3, 5
  const tri1 = [hexVertices[0], hexVertices[2], hexVertices[4]];
  const tri2 = [hexVertices[1], hexVertices[3], hexVertices[5]];
  const triPath = (pts: { x: number; y: number }[]) =>
    `M${pts[0].x},${pts[0].y}L${pts[1].x},${pts[1].y}L${pts[2].x},${pts[2].y}Z`;

  // Inner circle radius (inscribed inside the hexagram)
  const innerR = 173;

  // Tick marks around the outer ring (72 ticks, every 5°)
  const ticks = Array.from({ length: 72 }, (_, i) => {
    const deg = i * 5;
    const angle = deg * (Math.PI / 180);
    const isMajor = deg % 30 === 0;
    const outerR = 240;
    const innerTickR = isMajor ? 220 : 228;
    return {
      x1: cx + innerTickR * Math.cos(angle),
      y1: cy + innerTickR * Math.sin(angle),
      x2: cx + outerR * Math.cos(angle),
      y2: cy + outerR * Math.sin(angle),
      strokeWidth: isMajor ? 1.5 : 0.75,
    };
  });

  // 6 radial lines from center to inner circle at midpoint angles (30°, 90°, 150°, ...)
  const radials = Array.from({ length: 6 }, (_, i) => {
    const angle = ((i * 60 + 30) - 90) * (Math.PI / 180);
    return {
      x1: cx,
      y1: cy,
      x2: cx + innerR * Math.cos(angle),
      y2: cy + innerR * Math.sin(angle),
    };
  });

  // 6 arc segments between inner circle and hexagram edges
  const arcSegments = Array.from({ length: 6 }, (_, i) => {
    const startAngle = (i * 60 + 5) * (Math.PI / 180);
    const endAngle = (i * 60 + 55) * (Math.PI / 180);
    const r = 190;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    return `M${x1},${y1}A${r},${r} 0 0,1 ${x2},${y2}`;
  });

  return (
    <div
      className="fixed pointer-events-none select-none"
      style={{
        top: "-10%",
        right: "-10%",
        width: "60vw",
        maxWidth: "700px",
        opacity: 0.15,
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
        {/* Outer double circle */}
        <circle cx={cx} cy={cy} r={240} fill="none" stroke={stroke} strokeWidth={1.5} />
        <circle cx={cx} cy={cy} r={225} fill="none" stroke={stroke} strokeWidth={1} />

        {/* 72 tick marks */}
        {ticks.map((t, i) => (
          <line key={`tick-${i}`} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={stroke} strokeWidth={t.strokeWidth} />
        ))}

        {/* Hexagram (two overlapping triangles) */}
        <path d={triPath(tri1)} fill="none" stroke={stroke} strokeWidth={1.5} />
        <path d={triPath(tri2)} fill="none" stroke={stroke} strokeWidth={1.5} />

        {/* Inner inscribed circle */}
        <circle cx={cx} cy={cy} r={innerR} fill="none" stroke={stroke} strokeWidth={1} />

        {/* 6 small circles at hexagram vertices */}
        {hexVertices.map((v, i) => (
          <circle key={`vertex-${i}`} cx={v.x} cy={v.y} r={5} fill="none" stroke={stroke} strokeWidth={1} />
        ))}

        {/* 6 arc segments */}
        {arcSegments.map((d, i) => (
          <path key={`arc-${i}`} d={d} fill="none" stroke={stroke} strokeWidth={0.75} />
        ))}

        {/* 6 radial lines */}
        {radials.map((r, i) => (
          <line key={`radial-${i}`} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke={stroke} strokeWidth={0.75} />
        ))}

        {/* Center circle and dot */}
        <circle cx={cx} cy={cy} r={12} fill="none" stroke={stroke} strokeWidth={1} />
        <circle cx={cx} cy={cy} r={3} fill={stroke} />
      </svg>
    </div>
  );
}
