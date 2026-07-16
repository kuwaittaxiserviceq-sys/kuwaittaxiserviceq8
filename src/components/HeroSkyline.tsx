export default function HeroSkyline() {
  return (
    <svg
      viewBox="0 0 1600 380"
      preserveAspectRatio="xMidYMax slice"
      className="h-52 w-full sm:h-64 lg:h-80"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="fadeTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#063f24" stopOpacity="0" />
          <stop offset="1" stopColor="#063f24" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a0a0a" stopOpacity="0" />
          <stop offset="1" stopColor="#0a0a0a" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id="towerGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#10b981" stopOpacity="0.35" />
          <stop offset="1" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4f4f5" />
          <stop offset="1" stopColor="#d4d4d8" />
        </linearGradient>
        <radialGradient id="headlightBeam" cx="0" cy="0.5" r="0.9">
          <stop offset="0" stopColor="#fef3c7" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fef3c7" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="taillightGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ce1126" stopOpacity="0.8" />
          <stop offset="1" stopColor="#ce1126" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* stars */}
      <g fill="#ffffff">
        <circle cx="120" cy="60" r="1.6" opacity="0.6" />
        <circle cx="260" cy="100" r="1.2" opacity="0.4" />
        <circle cx="420" cy="50" r="1.6" opacity="0.5" />
        <circle cx="640" cy="90" r="1.2" opacity="0.4" />
        <circle cx="980" cy="55" r="1.6" opacity="0.5" />
        <circle cx="1180" cy="95" r="1.2" opacity="0.4" />
        <circle cx="1380" cy="65" r="1.6" opacity="0.6" />
        <circle cx="1480" cy="110" r="1.2" opacity="0.4" />
      </g>

      {/* distant skyline */}
      <g fill="#ffffff" opacity="0.06">
        <rect x="40" y="210" width="46" height="120" />
        <rect x="100" y="180" width="34" height="150" />
        <rect x="150" y="230" width="60" height="100" />
        <rect x="960" y="220" width="40" height="110" />
        <rect x="1010" y="190" width="30" height="140" />
        <rect x="1060" y="240" width="55" height="90" />
        <rect x="1350" y="200" width="42" height="130" />
        <rect x="1400" y="235" width="60" height="95" />
      </g>

      {/* glow behind Kuwait Towers */}
      <circle cx="1060" cy="220" r="170" fill="url(#towerGlow)" />

      {/* Kuwait Towers silhouette */}
      <g fill="#052014">
        {/* small tower */}
        <rect x="990" y="250" width="10" height="80" rx="2" />
        <circle cx="995" cy="238" r="16" />
        {/* main tower */}
        <rect x="1074" y="150" width="14" height="180" rx="2" />
        <circle cx="1081" cy="185" r="30" />
        <circle cx="1081" cy="130" r="12" />
        <rect x="1077" y="108" width="8" height="24" />
      </g>

      {/* road */}
      <rect x="0" y="300" width="1600" height="80" fill="url(#roadGrad)" />
      <rect x="0" y="298" width="1600" height="3" fill="#18181b" />
      <g fill="#ffffff" opacity="0.35">
        <rect x="0" y="335" width="60" height="4" />
        <rect x="110" y="335" width="60" height="4" />
        <rect x="220" y="335" width="60" height="4" />
        <rect x="330" y="335" width="60" height="4" />
        <rect x="440" y="335" width="60" height="4" />
        <rect x="1050" y="335" width="60" height="4" />
        <rect x="1160" y="335" width="60" height="4" />
        <rect x="1270" y="335" width="60" height="4" />
        <rect x="1380" y="335" width="60" height="4" />
        <rect x="1490" y="335" width="60" height="4" />
      </g>

      {/* speed lines */}
      <g stroke="#10b981" strokeWidth="3" opacity="0.5" strokeLinecap="round">
        <line x1="100" y1="290" x2="170" y2="290" />
        <line x1="80" y1="305" x2="160" y2="305" />
      </g>

      {/* taxi */}
      <g transform="translate(190, 250)">
        <ellipse cx="60" cy="72" rx="90" ry="10" fill="#000000" opacity="0.35" />
        <circle cx="80" cy="6" r="30" fill="url(#taillightGlow)" />
        <circle cx="-30" cy="6" r="34" fill="url(#headlightBeam)" />

        {/* body */}
        <path
          d="M-8 40 C-8 24 4 14 22 14 L38 14 C44 2 56 -6 74 -6 L104 -6 C118 -6 128 2 132 14 L140 14 C150 14 156 22 156 32 L156 46 C156 54 150 60 142 60 L-2 60 C-10 60 -14 54 -14 46 Z"
          fill="url(#carBody)"
        />
        {/* cab roof */}
        <path
          d="M40 14 C46 -2 58 -12 76 -12 L100 -12 C114 -12 124 -2 128 14 Z"
          fill="#e4e4e7"
        />
        {/* windows */}
        <path
          d="M48 12 C53 1 62 -6 76 -6 L98 -6 C110 -6 118 1 121 12 Z"
          fill="#0a0a0a"
          opacity="0.75"
        />
        {/* taxi roof sign */}
        <rect x="76" y="-22" width="24" height="10" rx="2" fill="#0a6b3d" />
        {/* green stripe */}
        <rect x="-8" y="38" width="164" height="6" fill="#0a6b3d" />
        {/* headlight */}
        <circle cx="-6" cy="34" r="6" fill="#fef3c7" />
        {/* taillight */}
        <circle cx="146" cy="34" r="6" fill="#ce1126" />
        {/* wheels */}
        <circle cx="18" cy="62" r="16" fill="#18181b" />
        <circle cx="18" cy="62" r="6" fill="#71717a" />
        <circle cx="122" cy="62" r="16" fill="#18181b" />
        <circle cx="122" cy="62" r="6" fill="#71717a" />
      </g>

      <rect x="0" y="0" width="1600" height="140" fill="url(#fadeTop)" />
    </svg>
  );
}
