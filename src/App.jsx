import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════
   PERK SOLAR — Full Rebuild with Media
   Geist-style design system (matching tapcardapp.com)
   ═══════════════════════════════════════════════════════ */

// ─── IMAGE MAP ──────────────────────────────
// ─── VISUAL PANELS (CSS-only, no external images) ────
const VISUALS = {
  // Heroes & general
  solar:       { bg: "linear-gradient(135deg, #1a1205 0%, #2d1f0a 40%, #1a1510 100%)", accent: "#ef4444", img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80" },
  commercial:  { bg: "linear-gradient(135deg, #0f1520 0%, #1a1025 40%, #151520 100%)", accent: "#f97316", img: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=1200&q=80" },
  residential: { bg: "linear-gradient(135deg, #151a10 0%, #1a2010 40%, #151815 100%)", accent: "#ef4444", img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80" },
  battery:     { bg: "linear-gradient(135deg, #101520 0%, #0f1a25 40%, #101518 100%)", accent: "#22c55e", img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=80" },
  ev:          { bg: "linear-gradient(135deg, #151018 0%, #1a1020 40%, #151015 100%)", accent: "#3b82f6", img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&q=80" },
  about:       { bg: "linear-gradient(135deg, #1a1510 0%, #201a10 40%, #1a1510 100%)", accent: "#f97316", img: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?w=1200&q=80" },
  contact:     { bg: "linear-gradient(135deg, #150f10 0%, #1a1015 40%, #151015 100%)", accent: "#ef4444", img: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1200&q=80" },
  // PV system types
  pvRooftop:   { bg: "linear-gradient(135deg, #1a1508 0%, #251a0a 40%, #1a1508 100%)", accent: "#ef4444", img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1200&q=80" },
  pvGround:    { bg: "linear-gradient(135deg, #0f1a08 0%, #152010 40%, #0f1508 100%)", accent: "#22c55e", img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80" },
  pvCarport:   { bg: "linear-gradient(135deg, #15100a 0%, #201510 40%, #15100a 100%)", accent: "#f97316", img: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=1200&q=80" },
  pvCommercial:{ bg: "linear-gradient(135deg, #0a0f1a 0%, #10152a 40%, #0a0f18 100%)", accent: "#3b82f6", img: "https://images.unsplash.com/photo-1611365892117-00ac6b4a4c54?w=1200&q=80" },
  // Battery brands
  tesla:       { bg: "linear-gradient(135deg, #101015 0%, #1a1520 40%, #101015 100%)", accent: "#ef4444", img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=80" },
  enphase:     { bg: "linear-gradient(135deg, #0f1518 0%, #15202a 40%, #0f1518 100%)", accent: "#3b82f6", img: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=1200&q=80" },
  sigenergy:   { bg: "linear-gradient(135deg, #151510 0%, #1a2018 40%, #151510 100%)", accent: "#22c55e", img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80" },
  // Misc
  worker:      { bg: "linear-gradient(135deg, #1a1205 0%, #2a1a0a 40%, #1a1205 100%)", accent: "#f97316", img: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?w=1200&q=80" },
  sandiego:    { bg: "linear-gradient(135deg, #0a1520 0%, #15202a 40%, #0a1520 100%)", accent: "#3b82f6", img: "https://images.unsplash.com/photo-1538964173425-93640e4e4c5b?w=1200&q=80" },
};

function SolarPanelSVG({ w = "100%", h = 200, accent = "#ef4444" }) {
  return <svg width={w} height={h} viewBox="0 0 400 200" fill="none" style={{ display: "block" }}>
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a1025"/><stop offset="100%" stopColor="#0f0f15"/></linearGradient>
      <linearGradient id="panelG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={accent} stopOpacity="0.3"/><stop offset="100%" stopColor={accent} stopOpacity="0.1"/></linearGradient>
      <linearGradient id="sunG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f97316"/><stop offset="100%" stopColor="#ef4444"/></linearGradient>
    </defs>
    <rect width="400" height="200" fill="url(#sky)"/>
    <circle cx="340" cy="40" r="24" fill="url(#sunG)" opacity="0.8"/>
    <circle cx="340" cy="40" r="36" fill={accent} opacity="0.08"/>
    <circle cx="340" cy="40" r="52" fill={accent} opacity="0.03"/>
    {[0,1,2,3,4,5].map(i => <rect key={i} x={40 + i * 58} y={100} width={50} height={70} rx="3" fill="url(#panelG)" stroke={accent} strokeOpacity="0.2" strokeWidth="1" transform={`rotate(-15, ${65 + i * 58}, 135)`}/>)}
    {[0,1,2,3,4,5].map(i => <><line key={`h${i}`} x1={42 + i * 58} y1={118} x2={88 + i * 58} y2={118} stroke={accent} strokeOpacity="0.15" strokeWidth="0.5" transform={`rotate(-15, ${65 + i * 58}, 135)`}/><line key={`v${i}`} x1={65 + i * 58} y1={102} x2={65 + i * 58} y2={168} stroke={accent} strokeOpacity="0.15" strokeWidth="0.5" transform={`rotate(-15, ${65 + i * 58}, 135)`}/></>)}
    <line x1="0" y1="185" x2="400" y2="185" stroke={accent} strokeOpacity="0.1" strokeWidth="1"/>
    <rect x="0" y="185" width="400" height="15" fill={accent} opacity="0.03"/>
  </svg>;
}

function BatterySVG({ w = "100%", h = 200, accent = "#22c55e" }) {
  return <svg width={w} height={h} viewBox="0 0 400 200" fill="none" style={{ display: "block" }}>
    <defs>
      <linearGradient id="batBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#101520"/><stop offset="100%" stopColor="#0a0f15"/></linearGradient>
      <linearGradient id="batFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={accent}/><stop offset="100%" stopColor={accent} stopOpacity="0.5"/></linearGradient>
    </defs>
    <rect width="400" height="200" fill="url(#batBg)"/>
    {[0,1,2].map(i => <g key={i} transform={`translate(${60 + i * 110}, 30)`}>
      <rect width="80" height="140" rx="8" fill="#1a1f28" stroke={accent} strokeOpacity="0.2" strokeWidth="1.5"/>
      <rect x="28" y="-6" width="24" height="8" rx="3" fill="#1a1f28" stroke={accent} strokeOpacity="0.2" strokeWidth="1"/>
      <rect x="8" y={140 - 20 - (i + 1) * 30} width="64" height={(i + 1) * 30 + 12} rx="4" fill="url(#batFill)" opacity={0.3 + i * 0.15}/>
      <text x="40" y="105" textAnchor="middle" fill={accent} fontSize="11" fontFamily="var(--fm)" opacity="0.7">{(i + 1) * 33}%</text>
    </g>)}
    {[0,1,2,3].map(i => <circle key={i} cx={50 + i * 100} cy={190} r="2" fill={accent} opacity={0.3 + i * 0.1}/>)}
  </svg>;
}

function EVChargeSVG({ w = "100%", h = 200, accent = "#3b82f6" }) {
  return <svg width={w} height={h} viewBox="0 0 400 200" fill="none" style={{ display: "block" }}>
    <defs>
      <linearGradient id="evBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#12101a"/><stop offset="100%" stopColor="#0a0a10"/></linearGradient>
    </defs>
    <rect width="400" height="200" fill="url(#evBg)"/>
    <rect x="160" y="20" width="80" height="130" rx="10" fill="#1a1a25" stroke={accent} strokeOpacity="0.25" strokeWidth="1.5"/>
    <rect x="170" y="35" width="60" height="40" rx="6" fill={accent} opacity="0.1"/>
    <text x="200" y="62" textAnchor="middle" fill={accent} fontSize="18" fontFamily="var(--fm)" fontWeight="700" opacity="0.8">EV</text>
    <rect x="185" y="90" width="30" height="8" rx="4" fill={accent} opacity="0.25"/>
    <rect x="185" y="105" width="30" height="8" rx="4" fill={accent} opacity="0.15"/>
    <path d="M200 155 L200 180" stroke={accent} strokeOpacity="0.3" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="200" cy="185" r="4" fill={accent} opacity="0.2"/>
    <polygon points="195,130 205,130 202,142 208,142 198,158 200,146 194,146" fill={accent} opacity="0.4"/>
    {[80, 320].map(x => <rect key={x} x={x} y="60" width="40" height="80" rx="6" fill="#1a1a25" stroke={accent} strokeOpacity="0.12" strokeWidth="1"/>)}
  </svg>;
}

function VisualPanel({ type = "solar", height = 260, label }) {
  const v = VISUALS[type] || VISUALS.solar;
  const isBat = type.includes("batter") || type === "tesla" || type === "enphase" || type === "sigenergy";
  const isEV = type === "ev";
  const SVG = isBat ? BatterySVG : isEV ? EVChargeSVG : SolarPanelSVG;
  const [imgOk, setImgOk] = useState(true);
  return <div style={{ borderRadius: 16, overflow: "hidden", background: v.bg, position: "relative", height }}>
    {v.img && imgOk ? <img src={v.img} alt={label || type} onError={() => setImgOk(false)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : <SVG h={height} accent={v.accent} />}
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, rgba(9,9,11,0.7) 100%)", pointerEvents: "none" }}/>
    {label && <div style={{ position: "absolute", bottom: 16, left: 20, fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "0.5px", textTransform: "uppercase", fontFamily: "var(--fm)" }}>{label}</div>}
  </div>;
}

// ─── ROUTING ────────────────────────────────
function useRouter() {
  const [path, setPath] = useState(window.location.hash.slice(1) || "/");
  useEffect(() => { const h = () => setPath(window.location.hash.slice(1) || "/"); window.addEventListener("hashchange", h); return () => window.removeEventListener("hashchange", h); }, []);
  return path;
}
function nav(to) { window.location.hash = to; window.scrollTo({ top: 0, behavior: "smooth" }); }
function L({ to, children, className, style, onClick }) {
  return <a href={`#${to}`} className={className} style={style} onClick={e => { e.preventDefault(); nav(to); onClick?.(); }}>{children}</a>;
}

// ─── ANIMATION ──────────────────────────────
function useInView(t = 0.1) {
  const ref = useRef(null); const [v, setV] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: t }); o.observe(el); return () => o.disconnect(); }, [t]);
  return [ref, v];
}
function R({ children, className = "", delay = 0, dir = "up" }) {
  const [ref, v] = useInView(0.08);
  const t = { up: "translateY(40px)", down: "translateY(-30px)", left: "translateX(40px)", right: "translateX(-40px)", scale: "scale(0.95)" };
  return <div ref={ref} className={className} style={{ opacity: v ? 1 : 0, transform: v ? "none" : t[dir], transition: `opacity 0.8s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.8s cubic-bezier(.16,1,.3,1) ${delay}s` }}>{children}</div>;
}

// ─── TOKENS ─────────────────────────────────
const C = {
  bg: "#09090b", sf: "#111113", card: "#18181b",
  border: "#27272a", borderH: "#3f3f46",
  text: "#e4e4e7", muted: "#71717a", subtle: "#52525b",
  accent: "#ef4444", accent2: "#f97316", accentH: "#f87171", accentM: "#ef444430", accentG: "#ef444415",
  grad: "linear-gradient(135deg, #ef4444, #f97316)",
  gradAnim: "linear-gradient(135deg, #ef4444, #f97316, #ef4444, #f97316)",
  white: "#fafafa", green: "#22c55e",
};

// ─── ICONS ──────────────────────────────────
const I = {
  sun: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
  bat: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="1" y="6" width="18" height="12" rx="2"/><path d="M23 13v-2M6 10v4M10 10v4"/></svg>,
  zap: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  ph: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  ml: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>,
  pin: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  clk: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  sh: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  star: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="none"><defs><linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ef4444"/><stop offset="100%" stopColor="#f97316"/></linearGradient></defs><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#sg)"/></svg>,
  arr: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>,
  chk: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="url(#cg)" strokeWidth="3" strokeLinecap="round"><defs><linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ef4444"/><stop offset="100%" stopColor="#f97316"/></linearGradient></defs><path d="M20 6 9 17l-5-5"/></svg>,
  menu: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>,
  x: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>,
  hm: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>,
  bld: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/></svg>,
};

// ─── CSS ────────────────────────────────────
function CSS() { return <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  :root{--f:'Inter',system-ui,-apple-system,sans-serif;--fm:ui-monospace,'SF Mono',monospace}
  *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
  body{font-family:var(--f);-webkit-font-smoothing:antialiased}
  ::selection{background:${C.accentM};color:${C.white}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
  @keyframes gd{0%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,-20px) scale(1.05)}66%{transform:translate(-20px,15px) scale(0.95)}100%{transform:translate(0,0) scale(1)}}
  @keyframes gp{0%,100%{opacity:.4}50%{opacity:.8}}
  @keyframes hp{0%{transform:scale(1.05)}100%{transform:scale(1.15)}}
  @keyframes sh{0%{background-position:-200% 0}100%{background-position:200% 0}}
  @keyframes gradPulse{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
  @keyframes logoPulse{0%,100%{box-shadow:0 0 12px #ef444440}50%{box-shadow:0 0 24px #ef444460,0 0 48px #f9731620}}
  @keyframes borderGlow{0%,100%{border-color:#ef444425}50%{border-color:#f9731640}}
  @keyframes fd{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:none}}
  @keyframes imgReveal{from{opacity:0;transform:scale(1.05)}to{opacity:1;transform:scale(1)}}
  .gorb{animation:gd 12s ease-in-out infinite,gp 6s ease-in-out infinite;position:absolute;border-radius:50%;filter:blur(60px);pointer-events:none;z-index:0}
  .clft{transition:transform .3s,border-color .3s,box-shadow .3s}
  .clft:hover{transform:translateY(-4px);border-color:${C.borderH};box-shadow:0 12px 40px -12px rgba(0,0,0,.4)}
  .cshm{position:relative;overflow:hidden}
  .cshm::after{content:'';position:absolute;inset:0;background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,.02) 45%,rgba(255,255,255,.04) 50%,rgba(255,255,255,.02) 55%,transparent 60%);background-size:200% 100%;animation:sh 8s linear infinite;pointer-events:none;border-radius:inherit}
  .bglow{background:${C.grad};box-shadow:0 0 20px ${C.accentM},0 0 40px #f9731615}
  .bglow:hover{box-shadow:0 0 30px ${C.accentM},0 0 60px #f9731630}
  .grad-btn{background:${C.gradAnim};background-size:300% 300%;animation:gradPulse 4s ease infinite}
  .logo-icon{animation:logoPulse 3s ease-in-out infinite}
  .badge-glow{animation:borderGlow 3s ease-in-out infinite}
  .glass{background:rgba(9,9,11,.8);backdrop-filter:blur(20px) saturate(1.5);-webkit-backdrop-filter:blur(20px) saturate(1.5)}
  .imgc{border-radius:16px;overflow:hidden;position:relative}
  .imgc img{width:100%;height:100%;object-fit:cover;transition:transform .6s cubic-bezier(.16,1,.3,1);display:block}
  .imgc:hover img{transform:scale(1.04)}
  .imgc::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,rgba(9,9,11,.4) 100%);pointer-events:none}
  .dn{display:flex}.mn{display:none !important}
  @media(max-width:1024px){.dn{display:none !important}.mn{display:flex !important}}
  input,textarea,select{font-family:var(--f)}a{text-decoration:none}
  input:focus,textarea:focus,select:focus{outline:none;border-color:${C.accent}60 !important;box-shadow:0 0 0 3px ${C.accentG}}
`}</style>; }

// ─── SHARED COMPONENTS ──────────────────────
const btn = v => v === "p"
  ? { display:"inline-flex",alignItems:"center",gap:8,padding:"14px 28px",background:C.grad,color:C.white,borderRadius:10,fontWeight:600,fontSize:14,border:"none",cursor:"pointer",transition:"all .3s",letterSpacing:"-.01em" }
  : { display:"inline-flex",alignItems:"center",gap:8,padding:"14px 28px",background:"transparent",color:C.text,borderRadius:10,fontWeight:500,fontSize:14,border:`1px solid ${C.border}`,cursor:"pointer",transition:"all .3s" };

function Badge({children}){return <div className="badge-glow" style={{display:"inline-flex",alignItems:"center",gap:6,padding:"5px 14px",background:"linear-gradient(135deg,#ef444412,#f9731612)",border:`1px solid #ef444425`,borderRadius:100,fontSize:11,color:C.accent,letterSpacing:"1px",fontWeight:600,marginBottom:20,textTransform:"uppercase",fontFamily:"var(--fm)"}}>{children}</div>}

function Gorb({color=C.accent,size=400,top,left,right,bottom,d=0}){return <div className="gorb" style={{width:size,height:size,background:`radial-gradient(circle,${color}18 0%,${color}05 40%,transparent 70%)`,top,left,right,bottom,animationDelay:`${d}s`}}/>}

function SH({badge,title,sub,center}){return <R><div style={{textAlign:center?"center":"left",marginBottom:44}}>
  {badge&&<Badge>{badge}</Badge>}
  <h2 style={{fontSize:"clamp(1.8rem,3.5vw,2.6rem)",fontWeight:700,color:C.white,marginBottom:14,letterSpacing:"-.025em",lineHeight:1.15,maxWidth:center?640:"none",margin:center?"0 auto 14px":undefined}}>{title}</h2>
  {sub&&<p style={{fontSize:15,color:C.muted,lineHeight:1.7,maxWidth:center?560:560,margin:center?"0 auto":undefined,textAlign:center?"center":"left"}}>{sub}</p>}
</div></R>}

function FC({icon,title,desc,i=0}){return <R delay={i*.08}><div className="clft cshm" style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:28,height:"100%"}}>
  <div style={{width:40,height:40,borderRadius:10,background:"linear-gradient(135deg,#ef444418,#f9731618)",display:"flex",alignItems:"center",justifyContent:"center",color:C.accent,marginBottom:16}}>{icon}</div>
  <h3 style={{fontSize:16,fontWeight:600,color:C.white,marginBottom:8,letterSpacing:"-.01em"}}>{title}</h3>
  <p style={{fontSize:14,color:C.muted,lineHeight:1.65}}>{desc}</p>
</div></R>}

function CI({text}){return <div style={{display:"flex",gap:10,alignItems:"flex-start",padding:"6px 0"}}>
  <div style={{minWidth:20,height:20,borderRadius:6,background:"linear-gradient(135deg,#ef444418,#f9731618)",display:"flex",alignItems:"center",justifyContent:"center",marginTop:2}}>{I.chk}</div>
  <span style={{fontSize:14,color:C.muted,lineHeight:1.55}}>{text}</span>
</div>}

function RC({quote,author,d=0}){return <R delay={d}><div className="clft cshm" style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:24}}>
  <div style={{display:"flex",gap:2,marginBottom:12}}>{[1,2,3,4,5].map(i=><span key={i}>{I.star}</span>)}</div>
  <p style={{fontSize:14,color:C.text,fontStyle:"italic",lineHeight:1.7,marginBottom:16}}>"{quote}"</p>
  <p style={{fontSize:13,fontWeight:600,color:C.white}}>{author}</p><p style={{fontSize:12,color:C.subtle}}>Google Review</p>
</div></R>}

function NC({num,title,desc,to,vtype,d=0}){const inner=<div className="clft cshm" style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,overflow:"hidden",height:"100%",cursor:to?"pointer":"default"}}>
  {vtype&&<VisualPanel type={vtype} height={160} label={title}/>}
  <div style={{padding:24}}>
    <div style={{fontSize:36,fontWeight:800,color:"#ef444430",marginBottom:10,fontFamily:"var(--fm)",lineHeight:1}}>{num}</div>
    <h3 style={{fontSize:16,fontWeight:600,color:C.white,marginBottom:8}}>{title}</h3>
    <p style={{fontSize:14,color:C.muted,lineHeight:1.6}}>{desc}</p>
    {to&&<div style={{marginTop:14,color:C.accent,fontSize:13,fontWeight:600,display:"flex",alignItems:"center",gap:6}}>View service {I.arr}</div>}
  </div>
</div>;return <R delay={d}>{to?<L to={to} style={{display:"block"}}>{inner}</L>:inner}</R>}

function ImgSection({type="solar",height=360,label}){return <R direction="scale"><VisualPanel type={type} height={height} label={label}/></R>}

function BatteryCard({tag,title,desc,features,vtype="battery",d=0}){return <section style={{borderTop:`1px solid ${C.border}`,position:"relative",overflow:"hidden"}}>
  <Gorb color={C.accent} size={300} top="10%" right="-5%" d={d}/>
  <div style={{maxWidth:1200,margin:"0 auto",padding:"100px 24px",position:"relative",zIndex:1}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))",gap:40,alignItems:"center"}}>
      <R><div>
        <Badge>{tag}</Badge>
        <h2 style={{fontSize:"clamp(1.5rem,2.8vw,2rem)",fontWeight:700,color:C.white,letterSpacing:"-.02em",marginBottom:14}}>{title}</h2>
        <p style={{fontSize:14,color:C.muted,lineHeight:1.7,marginBottom:20}}>{desc}</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>{features.map(f=><span key={f} style={{padding:"8px 16px",background:C.card,border:`1px solid ${C.border}`,borderRadius:100,fontSize:13,color:C.text,fontWeight:500}}>{f}</span>)}</div>
      </div></R>
      <R delay={0.15}><VisualPanel type={vtype} height={300}/></R>
    </div>
  </div>
</section>}

function StatBar({stats,glass}){return <R delay={.35}><div style={{display:"flex",gap:1,marginTop:56,background:glass?"rgba(255,255,255,.06)":C.border,borderRadius:14,overflow:"hidden",maxWidth:720}}>
  {stats.map((s,i)=><div key={i} style={{flex:1,background:glass?"rgba(24,24,27,.7)":C.card,padding:"20px 16px",textAlign:"center",backdropFilter:glass?"blur(12px)":"none"}}>
    <div style={{fontSize:10,color:C.accent,fontWeight:600,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:4,fontFamily:"var(--fm)"}}>{s.l}</div>
    <div style={{fontSize:14,color:C.white,fontWeight:500}}>{s.v}</div>
  </div>)}
</div></R>}

function CTA({badge,title,sub}){return <section style={{background:C.sf,borderTop:`1px solid ${C.border}`}}>
  <div style={{maxWidth:1200,margin:"0 auto",padding:"100px 24px",textAlign:"center"}}>
    <R><Badge>{badge}</Badge>
      <h2 style={{fontSize:"clamp(1.6rem,3vw,2.4rem)",fontWeight:700,color:C.white,maxWidth:600,margin:"0 auto 14px",letterSpacing:"-.02em"}}>{title}</h2>
      <p style={{fontSize:15,color:C.muted,maxWidth:520,margin:"0 auto 28px",lineHeight:1.7}}>{sub}</p>
      <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
        <L to="/contact" className="bglow" style={btn("p")}>Get a Quote {I.arr}</L>
        <a href="tel:+16193341212" style={btn("o")}>{I.ph} Talk to a Solar Specialist</a>
      </div>
    </R>
  </div>
</section>}

// ─── HERO ───────────────────────────────────
function Hero({badge,title,sub,pLabel,pTo,sLabel,sHref,sTo,stats,heroType,full}){
  const heroImgs = {
    solar: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80",
    commercial: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=1920&q=80",
    residential: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80",
    battery: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1920&q=80",
    ev: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1920&q=80",
    about: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?w=1920&q=80",
    contact: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1920&q=80",
    solutions: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1920&q=80",
  };
  const heroBgs = {
    solar: "linear-gradient(135deg, #1a0f05 0%, #2a1508 30%, #1a1005 60%, #0f0a05 100%)",
    commercial: "linear-gradient(135deg, #0a0f1a 0%, #15102a 30%, #0f0a1a 60%, #0a0a10 100%)",
    residential: "linear-gradient(135deg, #0f1a0a 0%, #152010 30%, #0f1a0a 60%, #0a100a 100%)",
    battery: "linear-gradient(135deg, #0a101a 0%, #0f1525 30%, #0a1018 60%, #0a0a10 100%)",
    ev: "linear-gradient(135deg, #100a1a 0%, #1a1025 30%, #100a18 60%, #0a0a0f 100%)",
    about: "linear-gradient(135deg, #1a1510 0%, #251a0f 30%, #1a1510 60%, #0f0f0a 100%)",
    contact: "linear-gradient(135deg, #1a0a0f 0%, #251015 30%, #1a0a10 60%, #0f0a0a 100%)",
    solutions: "linear-gradient(135deg, #151005 0%, #201508 30%, #151005 60%, #0a0a05 100%)",
  };
  const [imgOk, setImgOk] = useState(true);
  const bg = heroBgs[heroType] || heroBgs.solar;
  const heroImg = heroImgs[heroType];
  const isBat = heroType==="battery"; const isEV = heroType==="ev";
  const SVGFallback = isBat?BatterySVG:isEV?EVChargeSVG:SolarPanelSVG;
  const svgAccent = isBat?"#22c55e":isEV?"#3b82f6":"#ef4444";

  return <section style={{padding:full?0:"140px 0 80px",minHeight:full?"100vh":"auto",display:full?"flex":"block",flexDirection:"column",justifyContent:"flex-end",position:"relative",overflow:"hidden",background:bg}}>
    {/* Background: try real image, fall back to SVG */}
    <div style={{position:"absolute",inset:0,zIndex:0}}>
      {heroImg && imgOk ? <img src={heroImg} alt="" onError={()=>setImgOk(false)} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 40%"}}/> : <div style={{opacity:full?1:0.3}}><SVGFallback w="100%" h="100%" accent={svgAccent}/></div>}
    </div>
    {/* Gradient overlays */}
    <div style={{position:"absolute",inset:0,zIndex:1,background:full?"linear-gradient(180deg,rgba(9,9,11,.2) 0%,rgba(9,9,11,.08) 20%,rgba(9,9,11,.45) 55%,rgba(9,9,11,.97) 100%)":"linear-gradient(180deg,rgba(9,9,11,.5) 0%,rgba(9,9,11,.8) 50%,rgba(9,9,11,.97) 100%)"}}/>
    <div style={{position:"absolute",inset:0,zIndex:1,background:"linear-gradient(90deg,rgba(9,9,11,.65) 0%,transparent 60%)"}}/>
    <Gorb color={C.accent} size={500} top="-10%" left="20%"/>
    <Gorb color="#f97316" size={400} top="10%" right="5%" d={1}/>
    {full&&<Gorb color="#ef4444" size={300} bottom="20%" left="60%" d={2}/>}
    <div style={{maxWidth:1200,margin:"0 auto",padding:full?"160px 24px 72px":"0 24px",position:"relative",zIndex:2}}>
      <R><Badge>{badge}</Badge></R>
      <R delay={.08}><h1 style={{fontSize:full?"clamp(2.6rem,5.5vw,4.2rem)":"clamp(2.2rem,4.5vw,3.4rem)",fontWeight:700,lineHeight:1.08,letterSpacing:"-.03em",color:C.white,marginBottom:22,maxWidth:800}}>{title}</h1></R>
      <R delay={.15}><p style={{fontSize:16,lineHeight:1.7,color:"rgba(228,228,231,.75)",marginBottom:32,maxWidth:540}}>{sub}</p></R>
      <R delay={.22}><div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        {pTo&&<L to={pTo} className="bglow grad-btn" style={btn("p")}>{pLabel} {I.arr}</L>}
        {sHref?<a href={sHref} style={btn("o")}>{I.ph} {sLabel}</a>:sTo?<L to={sTo} style={btn("o")}>{sLabel} {I.arr}</L>:null}
      </div></R>
      {stats&&<StatBar stats={stats} glass={!!heroType}/>}
    </div>
  </section>;
}

// ─── HEADER ─────────────────────────────────
function Header(){
  const[sc,setSc]=useState(false);const[op,setOp]=useState(false);
  useEffect(()=>{const h=()=>setSc(window.scrollY>30);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h)},[]);
  const nv=[{l:"Home",t:"/"},{l:"Commercial",t:"/commercial-solar"},{l:"Residential",t:"/residential-solar"},{l:"PV Solar",t:"/pv-solar"},{l:"Batteries",t:"/batteries"},{l:"EV Chargers",t:"/ev-chargers"},{l:"About",t:"/about"},{l:"Contact",t:"/contact"}];
  return <><CSS/>
    <div className={sc?"glass":""} style={{position:"fixed",top:0,left:0,right:0,zIndex:100,borderBottom:`1px solid ${sc?C.border:"transparent"}`,transition:"all .4s"}}>
      <div style={{background:C.grad,padding:"5px 0",textAlign:"center",fontSize:12,fontWeight:500,color:C.white,letterSpacing:".01em"}}>Residential, commercial, and non-profit solar in San Diego since 2005</div>
      <div style={{maxWidth:1360,margin:"0 auto",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
        <L to="/" style={{display:"flex",alignItems:"center",gap:10}}>
          <div className="logo-icon" style={{width:32,height:32,borderRadius:8,background:C.grad,display:"flex",alignItems:"center",justifyContent:"center",color:C.white}}>{I.sun}</div>
          <span style={{fontSize:17,fontWeight:700,color:C.white,letterSpacing:"-.02em"}}>Perk Solar</span>
        </L>
        <nav className="dn" style={{gap:2,alignItems:"center"}}>{nv.map(n=><L key={n.t} to={n.t} style={{padding:"7px 14px",fontSize:13,color:C.muted,borderRadius:8,transition:"all .2s",fontWeight:500}}>{n.l}</L>)}</nav>
        <div className="dn" style={{gap:10,alignItems:"center"}}>
          <a href="tel:+16193341212" style={{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 16px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,color:C.text,fontWeight:500}}>{I.ph} 619-334-1212</a>
          <L to="/contact" className="bglow grad-btn" style={{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 18px",background:C.grad,borderRadius:8,fontSize:13,color:C.white,fontWeight:600}}>Get a Free Quote</L>
        </div>
        <button className="mn" onClick={()=>setOp(!op)} style={{background:"none",border:"none",color:C.white,cursor:"pointer",padding:6}}>{op?I.x:I.menu}</button>
      </div>
    </div>
    {op&&<div style={{position:"fixed",inset:0,zIndex:99,background:"rgba(9,9,11,.97)",paddingTop:120,display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
      {nv.map(n=><L key={n.t} to={n.t} onClick={()=>setOp(false)} style={{padding:"12px 32px",fontSize:16,color:C.text,fontWeight:500}}>{n.l}</L>)}
      <div style={{marginTop:20,display:"flex",flexDirection:"column",gap:12,width:"80%",maxWidth:300}}>
        <a href="tel:+16193341212" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"12px 24px",border:`1px solid ${C.border}`,borderRadius:10,color:C.text,fontWeight:500}}>{I.ph} 619-334-1212</a>
        <L to="/contact" onClick={()=>setOp(false)} className="bglow grad-btn" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"12px 24px",background:C.grad,borderRadius:10,color:C.white,fontWeight:600}}>Get a Free Quote</L>
      </div>
    </div>}
  </>;
}

// ─── FOOTER ─────────────────────────────────
function Footer(){return <footer style={{background:C.sf,borderTop:`1px solid ${C.border}`}}>
  <div style={{maxWidth:1200,margin:"0 auto",padding:"80px 24px 60px"}}><R>
    <div className="cshm" style={{background:`linear-gradient(135deg,${C.card},#1a1710)`,border:`1px solid ${C.border}`,borderRadius:20,padding:"56px 40px",textAlign:"center",position:"relative",overflow:"hidden"}}>
      <Gorb color={C.accent} size={300} top="-30%" right="-10%"/>
      <Badge>Southern California Solar Partner</Badge>
      <h2 style={{fontSize:"clamp(1.6rem,3vw,2.4rem)",fontWeight:700,color:C.white,marginBottom:12,letterSpacing:"-.02em"}}>Commercial solar, battery storage, and EV charging delivered with local accountability.</h2>
      <p style={{fontSize:15,color:C.muted,maxWidth:540,margin:"0 auto 28px",lineHeight:1.7}}>Perk Solar supports businesses, property owners, and homeowners with professional installation, tighter communication, and long-term energy planning across Southern California.</p>
      <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}><L to="/contact" className="bglow" style={btn("p")}>Get a Quote {I.arr}</L><a href="tel:+16193341212" style={btn("o")}>{I.ph} Talk to a Specialist</a></div>
    </div>
  </R></div>
  <div style={{borderTop:`1px solid ${C.border}`}}>
    <div style={{maxWidth:1200,margin:"0 auto",padding:"48px 24px 32px",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:36}}>
      <div>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}><div className="logo-icon" style={{width:28,height:28,borderRadius:7,background:C.grad,display:"flex",alignItems:"center",justifyContent:"center",color:C.white}}>{I.sun}</div><span style={{fontSize:15,fontWeight:700,color:C.white}}>Perk Solar</span></div>
        <div style={{display:"flex",flexDirection:"column",gap:8,fontSize:13,color:C.muted}}>
          <span style={{display:"flex",alignItems:"center",gap:6}}>{I.pin} El Cajon / San Diego, CA</span>
          <a href="tel:+16193341212" style={{display:"flex",alignItems:"center",gap:6,color:C.muted}}>{I.ph} 619-334-1212</a>
          <a href="mailto:operations@perksolar.com" style={{display:"flex",alignItems:"center",gap:6,color:C.muted}}>{I.ml} operations@perksolar.com</a>
          <span style={{display:"flex",alignItems:"center",gap:6}}>{I.sh} CA License 920995</span>
          <span style={{display:"flex",alignItems:"center",gap:6}}>{I.clk} Mon-Fri 8-5, Sat 8-12</span>
        </div>
      </div>
      <div><h4 style={{color:C.white,fontSize:12,fontWeight:600,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:14}}>Services</h4>{[["Commercial Solar","/commercial-solar"],["Residential Solar","/residential-solar"],["PV Solar","/pv-solar"],["Batteries","/batteries"],["EV Chargers","/ev-chargers"]].map(([l,t])=><L key={t} to={t} style={{display:"block",color:C.muted,fontSize:13,padding:"3px 0"}}>{l}</L>)}</div>
      <div><h4 style={{color:C.white,fontSize:12,fontWeight:600,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:14}}>Company</h4>{[["About","/about"],["Solutions","/solutions"],["Contact","/contact"]].map(([l,t])=><L key={t} to={t} style={{display:"block",color:C.muted,fontSize:13,padding:"3px 0"}}>{l}</L>)}<h4 style={{color:C.white,fontSize:12,fontWeight:600,textTransform:"uppercase",letterSpacing:"1.5px",marginTop:18,marginBottom:10}}>Social</h4><div style={{fontSize:13,color:C.muted}}>Facebook · Instagram · X</div></div>
      <div><h4 style={{color:C.white,fontSize:12,fontWeight:600,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:14}}>Start a Project</h4><p style={{fontSize:13,color:C.muted,marginBottom:14,lineHeight:1.6}}>Ready for solar, batteries, or EV charging?</p><L to="/contact" className="bglow" style={{...btn("p"),fontSize:13,padding:"10px 20px"}}>Get a Free Quote</L></div>
    </div>
    <div style={{maxWidth:1200,margin:"0 auto",borderTop:`1px solid ${C.border}`,padding:"16px 24px",textAlign:"center",fontSize:12,color:C.subtle}}>© 2026 Perk Solar Inc. Serving Southern California.</div>
  </div>
</footer>}

// ═══════════════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════════════

function HomePage(){return <div>
  <Hero full heroType="solar" badge="Since 2005 · Residential, Commercial & Non-Profit" title="Solar, batteries, and EV charging for homes and businesses." sub="Perk Solar has been providing residential, commercial, and non-profit solar in San Diego since 2005, with battery storage and EV charger installation available for homes, businesses, and property owners across Southern California." pLabel="Get a Free Quote" pTo="/contact" sLabel="Talk to a Solar Specialist" sHref="tel:+16193341212" stats={[{l:"Since",v:"2005"},{l:"Google Rating",v:"5.0 ★"},{l:"Service Area",v:"Southern CA"}]}/>

  <section style={{maxWidth:1200,margin:"0 auto",padding:"0 24px 40px"}}><R><div style={{display:"flex",flexWrap:"wrap",gap:8}}>
    {["Residential Solar","Commercial Solar","Non-Profit Projects","Battery Resilience","EV Infrastructure","Tesla Expertise"].map(t=><span key={t} style={{padding:"6px 16px",background:C.card,border:`1px solid ${C.border}`,borderRadius:100,fontSize:13,color:C.muted,fontWeight:500}}>{t}</span>)}
  </div></R></section>

  {/* PV Solar with images */}
  <section style={{maxWidth:1200,margin:"0 auto",padding:"100px 24px",borderTop:`1px solid ${C.border}`}}>
    <SH badge="PV Solar" title="Rooftop, ground-mount, carport, and commercial PV delivery." sub="Perk Solar builds rooftop, ground-mount, carport, and commercial PV systems with the local permitting experience and installation quality needed for long-term performance."/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16}}>
      <NC num="01" title="PV rooftop solar" desc="Versatile rooftop PV systems engineered around real property conditions, clean permitting, and installation quality." vtype="pvRooftop" d={0}/>
      <NC num="02" title="Ground-mount PV" desc="Custom ground-mount arrays for sites with usable land, built for sun exposure, durability, and long-term output." vtype="pvGround" d={.08}/>
      <NC num="03" title="Solar carports" desc="Covered parking structures combining clean power generation with shaded vehicle protection." vtype="pvCarport" d={.16}/>
      <NC num="04" title="Commercial PV" desc="Turnkey commercial PV systems tailored to operating goals, project economics, and minimal disruption." vtype="pvCommercial" d={.24}/>
    </div>
    <R delay={.3}><div style={{marginTop:28}}><L to="/pv-solar" style={btn("o")}>Explore PV Solar {I.arr}</L></div></R>
  </section>

  {/* Why Perk Solar with image */}
  <section style={{background:C.sf,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,position:"relative",overflow:"hidden"}}>
    <Gorb color={C.accent} size={400} bottom="-20%" right="-10%" d={2}/>
    <div style={{maxWidth:1200,margin:"0 auto",padding:"100px 24px",position:"relative",zIndex:1}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(400px,1fr))",gap:40,alignItems:"center",marginBottom:48}}>
        <div><SH badge="Why Perk Solar" title="A local solar company serving homes, businesses, and nonprofits since 2005." sub="Long-term local service, top-quality materials, careful installation, and support for both residential and commercial energy projects."/></div>
        <ImgSection type="worker" height={320} label="Solar Installation"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:16}}>
        <FC icon={I.clk} title="Serving San Diego since 2005" desc="Nearly two decades of local installation experience across residential, commercial, and non-profit properties." i={0}/>
        <FC icon={I.sh} title="Top-quality solar materials" desc="Proven equipment and careful system design to support strong long-term performance." i={1}/>
        <FC icon={I.bat} title="Battery and EV support" desc="Battery storage and EV charging so homeowners and businesses can plan energy upgrades with one team." i={2}/>
        <FC icon={I.pin} title="Local permitting knowledge" desc="Hands-on experience across San Diego jurisdictions for smoother project approvals." i={3}/>
      </div>
    </div>
  </section>

  {/* Funding */}
  <section style={{maxWidth:1200,margin:"0 auto",padding:"100px 24px"}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:40,alignItems:"start"}}>
      <div>
        <SH badge="Funding Options" title="Flexible solar funding can make the project easier to start."/>
        <R delay={.1}><div className="cshm" style={{background:`linear-gradient(135deg,${C.card},#1a1710)`,border:`1px solid ${C.border}`,borderRadius:16,padding:28,marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
            <div><div style={{fontSize:28,fontWeight:800,color:C.accent,fontFamily:"var(--fm)"}}>70%</div><div style={{fontSize:12,color:C.muted}}>Customer prepays</div></div>
            <div style={{textAlign:"right"}}><div style={{fontSize:28,fontWeight:800,color:C.green,fontFamily:"var(--fm)"}}>30%</div><div style={{fontSize:12,color:C.muted}}>Partners cover</div></div>
          </div>
          <div style={{height:6,borderRadius:3,background:C.border,overflow:"hidden"}}><div style={{width:"70%",height:"100%",background:`linear-gradient(90deg,#ef4444,#f97316)`,borderRadius:3}}/></div>
        </div></R>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {[{t:"Up-front cost relief",d:"Prepaid structures that reduce how much the customer carries at the start."},{t:"No conventional monthly loan cycle",d:"Avoid pushing the project into a long-term monthly debt pattern."},{t:"Energy savings without interest-heavy drag",d:"Cleaner financing helps the project feel productive from day one."},{t:"Best handled through direct project review",d:"Availability depends on property type, partner terms, and current program fit."}].map((it,i)=><R key={i} delay={i*.08}><div className="clft" style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:22}}>
          <h4 style={{fontSize:15,fontWeight:600,color:C.white,marginBottom:6}}>{it.t}</h4>
          <p style={{fontSize:13,color:C.muted,lineHeight:1.6}}>{it.d}</p>
        </div></R>)}
        <R delay={.35}><L to="/contact" className="bglow" style={btn("p")}>See If Your Property Qualifies {I.arr}</L></R>
      </div>
    </div>
  </section>

  {/* Solutions banner */}
  <section style={{background:C.sf,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,position:"relative",overflow:"hidden"}}>
    <Gorb color="#f59e0b" size={350} top="-20%" left="20%" d={3}/>
    <div style={{maxWidth:1200,margin:"0 auto",padding:"80px 24px",position:"relative",zIndex:1}}>
      <R><div className="clft cshm" style={{background:`linear-gradient(135deg,${C.card},#1a1510)`,border:`1px solid ${C.border}`,borderRadius:18,padding:"36px 32px",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:24}}>
        <div><Badge>Solutions</Badge><h2 style={{fontSize:"clamp(1.3rem,2.5vw,1.6rem)",fontWeight:700,color:C.white,marginBottom:6}}>Need a cleaner route into the right Perk Solar service?</h2><p style={{fontSize:14,color:C.muted}}>Compare commercial solar, residential solar, battery storage, and EV charging in one place.</p></div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}><L to="/solutions" className="bglow" style={btn("p")}>View All Solutions {I.arr}</L><L to="/contact" style={btn("o")}>Get a Quote</L></div>
      </div></R>
    </div>
  </section>

  {/* Battery Storage with images */}
  <section style={{maxWidth:1200,margin:"0 auto",padding:"100px 24px"}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:40,alignItems:"center"}}>
      <div>
        <SH badge="Battery Storage" title="Battery options backed by real installation experience." sub="Perk Solar highlights Tesla battery systems while also supporting Enphase, Pointguard, retrofits, rebate guidance, and EV-ready whole-home energy planning."/>
        <R delay={.15}><div className="clft" style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:24}}>
          <Badge>Tesla Battery Systems</Badge>
          <p style={{fontSize:14,color:C.muted,lineHeight:1.6}}>Tesla-focused battery expertise remains a key differentiator for homeowners and businesses looking for premium backup and energy management.</p>
        </div></R>
      </div>
      <ImgSection type="tesla" height={380} label="Battery Storage"/>
    </div>
  </section>

  {/* Reviews */}
  <section style={{background:C.sf,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,position:"relative",overflow:"hidden"}}>
    <Gorb color={C.accent} size={350} bottom="-15%" left="40%" d={2}/>
    <div style={{maxWidth:1200,margin:"0 auto",padding:"100px 24px",position:"relative",zIndex:1}}>
      <SH badge="Google Reviews" title="What customers are saying on Google." sub="5.0 stars across 33 Google reviews, with recurring praise for honest guidance, clean work, and long-term system performance." center/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:16}}>
        <RC quote="absolutely wonderful experience" author="Tracy Spreier" d={0}/>
        <RC quote="great job of designing and installing solar panels" author="Shannon Smith" d={.08}/>
        <RC quote="got us back on track in no time" author="Davin Griffith" d={.16}/>
        <RC quote="performed flawlessly ever since" author="Richard Odiorne" d={.24}/>
      </div>
    </div>
  </section>

  <CTA badge="Start Here" title="Talk with Perk Solar about solar, batteries, or EV charging." sub="Reach out for rooftop solar, commercial solar, battery storage, EV chargers, and local installation support for your home, business, or nonprofit property."/>
</div>}

// ─── COMMERCIAL ─────────────────────────────
function CommercialPage(){return <div>
  <Hero heroType="commercial" badge="Commercial Solar" title="Solar strategies built around operating costs, load profile, and project economics." sub="Perk Solar works with businesses and commercial property owners across Southern California to design PV systems that reduce utility spend, improve budget certainty, and support long-term asset performance." pLabel="Get a Commercial Quote" pTo="/contact" sLabel="Call to Discuss Your Site" sHref="tel:+16193341212" stats={[{l:"Since 2005",v:"San Diego experience"},{l:"Turnkey",v:"Design → Install"},{l:"Battery Ready",v:"Storage + EV planning"}]}/>
  <section style={{maxWidth:1200,margin:"0 auto",padding:"100px 24px",borderTop:`1px solid ${C.border}`}}><SH badge="Commercial Value" title="Where commercial solar creates leverage." sub="The strongest commercial projects usually start with economics, expand into resilience, and then account for future electrical growth."/><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:16}}><FC icon={I.zap} title="Lower utility spend" desc="Offset expensive daytime consumption and reduce exposure to long-term utility rate increases." i={0}/><FC icon={I.sun} title="Support long-term ROI" desc="Approach project sizing with a view toward total property value and lifecycle returns." i={1}/><FC icon={I.bat} title="Improve resilience" desc="Layer storage where continuity, load control, or backup capability materially improves the project case." i={2}/><FC icon={I.zap} title="Prepare for electrification" desc="Make room for EV charging, electrified loads, and future site upgrades." i={3}/></div></section>

  <section style={{maxWidth:1200,margin:"0 auto",padding:"0 24px 80px"}}><ImgSection type="commercial" height={400} label="Commercial Solar"/></section>

  <section style={{background:C.sf,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,position:"relative",overflow:"hidden"}}><Gorb color={C.accent} size={350} top="-15%" right="5%" d={1.5}/><div style={{maxWidth:1200,margin:"0 auto",padding:"100px 24px",position:"relative",zIndex:1}}><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:40,alignItems:"start"}}><SH badge="Project Fit" title="Well suited for Southern California properties that need a more strategic energy plan." sub="Perk Solar supports owner-operators, facilities teams, and property groups."/><div>{["Industrial and warehouse rooftops","Office and medical campuses","Retail, mixed-use, and hospitality sites","Multifamily and HOA common-area loads","Nonprofit and community-serving properties","Parking assets with EV charging potential"].map((t,i)=><R key={i} delay={i*.05}><CI text={t}/></R>)}</div></div></div></section>

  <section style={{maxWidth:1200,margin:"0 auto",padding:"100px 24px"}}><SH badge="Solar + Storage" title="Commercial solar gets stronger when storage and charging are part of the same plan."/><div className="clft" style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:28}}><h3 style={{fontSize:16,fontWeight:600,color:C.white,marginBottom:16}}>Plan the system around the property and how it actually uses energy.</h3><p style={{fontSize:14,color:C.muted,lineHeight:1.7,marginBottom:16}}>Solar, storage, and EV charging perform better when the scope reflects actual usage, utility pressure, resilience needs, and future electrical expansion.</p>{["Review load behavior before presenting system size as the only answer.","Identify where batteries could improve resilience or demand management.","Plan conduit, infrastructure, and electrical strategy for future charging expansion.","Keep stakeholder communication tighter through one integrated scope."].map((t,i)=><CI key={i} text={t}/>)}</div></section>
  <CTA badge="Commercial Inquiry" title="If the project has real operating impact, it deserves a more thoughtful solar proposal." sub="Use the quote flow to start a direct conversation about your facility, property, or portfolio."/>
</div>}

// ─── RESIDENTIAL ────────────────────────────
function ResidentialPage(){return <div>
  <Hero heroType="residential" badge="Residential Solar" title="Home solar designed to lower bills, clean up energy usage, and stay ready for storage." sub="Perk Solar designs residential solar systems for homeowners who want lower utility bills, professional installation, and a smart path to future storage." pLabel="Get a Home Solar Quote" pTo="/contact" sLabel="Talk to a Solar Specialist" sHref="tel:+16193341212" stats={[{l:"Homeowner Friendly",v:"Clear communication"},{l:"Battery Ready",v:"Storage from the start"},{l:"Clean Install",v:"Professional workmanship"}]}/>
  <section style={{maxWidth:1200,margin:"0 auto",padding:"100px 24px",borderTop:`1px solid ${C.border}`}}><SH badge="Homeowner Benefits" title="The residential offering stays practical and premium."/><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:16}}><FC icon={I.zap} title="Reduce monthly bills" desc="Match system design to household usage so savings are meaningful and predictable." i={0}/><FC icon={I.bat} title="Stay ready for backup power" desc="Keep battery storage part of the early conversation if outages or Tesla integration matter." i={1}/><FC icon={I.hm} title="Protect curb appeal" desc="A system that respects roof layout, home aesthetics, and finished look." i={2}/><FC icon={I.sh} title="Work with one team" desc="Design, permitting, installation, and storage planning through a single contractor." i={3}/></div></section>

  <section style={{maxWidth:1200,margin:"0 auto",padding:"0 24px 80px"}}><ImgSection type="residential" height={380} label="Residential Solar"/></section>

  <section style={{background:C.sf,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,position:"relative",overflow:"hidden"}}><Gorb color="#f59e0b" size={300} bottom="-10%" left="10%" d={2}/><div style={{maxWidth:1200,margin:"0 auto",padding:"100px 24px",position:"relative",zIndex:1}}><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:40,alignItems:"start"}}><SH badge="Best Fit" title="Good for homeowners who want a cleaner process and better long-term energy planning."/><div>{["Primary residences and family homes","Homes preparing for battery backup","Properties adding EV charging at the same time","Households with rising peak utility bills","Owners who want professional installation","Homeowners comparing storage-ready proposals"].map((t,i)=><R key={i} delay={i*.05}><CI text={t}/></R>)}</div></div></div></section>

  <section style={{maxWidth:1200,margin:"0 auto",padding:"100px 24px"}}><SH badge="Solar + Storage" title="Residential solar becomes more capable when storage is considered from day one."/><div className="clft" style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:28}}><h3 style={{fontSize:16,fontWeight:600,color:C.white,marginBottom:16}}>Plan the system around the property and how it actually uses energy.</h3>{["Keep Tesla and other battery pathways visible.","Coordinate the solar design with future storage and electrical expansion.","Avoid revisiting the whole system later for backup.","Stay premium and trustworthy while feeling approachable to families."].map((t,i)=><CI key={i} text={t}/>)}</div></section>
  <CTA badge="Residential Quote" title="Homeowners can still get a direct, premium-feeling quote experience." sub="If the goal is lower bills, storage readiness, or a more complete home energy setup."/>
</div>}

// ─── PV SOLAR ───────────────────────────────
function PVSolarPage(){const sys=[{id:"rooftop",b:"PV Rooftop Solar Systems",t:"Versatile rooftop PV systems shaped by real San Diego permitting and installation experience.",d:"Local projects move more smoothly when the installer knows diverse jurisdictions and the approval process.",vt:"pvRooftop"},{id:"ground",b:"Ground Mount PV Solar",t:"Ground-mount projects stay viable when there is enough land and the site can be optimized for sun exposure.",d:"A turnkey option for San Diego landowners with usable open space.",vt:"pvGround"},{id:"carport",b:"Carport PV Solar",t:"Solar carports combine energy production with shaded parking and stronger site utility.",d:"Practical for properties that need covered parking or are working around rooftops that are not ideal.",vt:"pvCarport"},{id:"commercial",b:"Commercial PV Solar",t:"Commercial PV is framed around operating costs, budget certainty, and lower disruption during installation.",d:"Comprehensive turnkey delivery matched to operational and financial goals.",vt:"pvCommercial"}];return <div>
  <Hero heroType="solar" badge="PV Solar" title="Rooftop, ground-mount, carport, and commercial PV systems for Southern California." sub="Perk Solar organizes its PV offering around four core system types, with local permitting knowledge, turnkey delivery, and installation quality." pLabel="Get a Free Quote" pTo="/contact" sLabel="Call Perk Solar" sHref="tel:+16193341212" stats={[{l:"Rooftop",v:"Residential + property"},{l:"Ground-Mount",v:"Land-rich sites"},{l:"Carports + Commercial",v:"Larger sites"}]}/>
  {sys.map((s,i)=><section key={s.id} style={{borderTop:`1px solid ${C.border}`,background:i%2===1?C.sf:"transparent",position:"relative",overflow:"hidden"}}>
    <div style={{maxWidth:1200,margin:"0 auto",padding:"100px 24px",position:"relative",zIndex:1}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(380px,1fr))",gap:40,alignItems:"center",direction:i%2===1?"rtl":"ltr"}}>
        <div style={{direction:"ltr"}}><R><Badge>{s.b}</Badge><h2 style={{fontSize:"clamp(1.6rem,3vw,2.2rem)",fontWeight:700,color:C.white,maxWidth:560,letterSpacing:"-.02em",marginBottom:14}}>{s.t}</h2><p style={{fontSize:15,color:C.muted,maxWidth:480,lineHeight:1.7}}>{s.d}</p></R></div>
        <div style={{direction:"ltr"}}><ImgSection type={s.vt} height={300} label={s.b}/></div>
      </div>
    </div>
  </section>)}
  <CTA badge="PV Solar Quote" title="Start with the right system type instead of a generic proposal." sub="Use the quote form for rooftop, ground-mount, carport, and commercial PV projects."/>
</div>}

// ─── BATTERIES ──────────────────────────────
function BatteriesPage(){return <div>
  <Hero heroType="battery" badge="Battery Storage" title="Battery storage for backup power, smarter energy control, and whole-home planning." sub="Perk Solar supports battery planning with rebate guidance, Tesla and Enphase certifications, Pointguard and Sigenergy options, and retrofit work." pLabel="Discuss Battery Storage" pTo="/contact" sLabel="Call to Discuss Options" sHref="tel:+16193341212" stats={[{l:"Tesla + Enphase",v:"Battery-certified"},{l:"Retrofit Ready",v:"Add storage anytime"},{l:"EV Aware",v:"Whole-home planning"}]}/>
  <section style={{maxWidth:1200,margin:"0 auto",padding:"100px 24px",borderTop:`1px solid ${C.border}`}}><SH badge="Battery Directory" title="Battery planning at Perk Solar is broader than one product page." sub="Storage is framed around certifications, partner fit, retrofit value, and long-term energy behavior."/><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16}}><FC icon={I.zap} title="Rebate navigation" desc="Navigate SGIP and San Diego Community Power battery programs." i={0}/><FC icon={I.sh} title="Tesla and Enphase certifications" desc="Battery certified with recommendations tied to the property." i={1}/><FC icon={I.bat} title="Retrofits and whole-home planning" desc="Retrofit work, EV charging, smart electrical upgrades, and resilience planning." i={2}/></div></section>

  <BatteryCard tag="Tesla Powerwall" title="Tesla Powerwall 3 stays a strong option for premium backup and cleaner system expansion." desc="Tesla Powerwall stores energy from solar or the grid, supports outage protection, and gives customers a cleaner path to expansion." features={["Energy savings","Solar day and night","Usage monitoring","Backup protection","Lower grid reliance","Easy expansion"]} vtype="tesla" d={0}/>
  <BatteryCard tag="Enphase IQ Battery" title="Enphase stays compelling for modular, LFP-based residential storage." desc="The IQ Battery 10C starts with 10 kWh and can expand. Lithium Iron Phosphate chemistry supports a safer, future-ready foundation." features={["Powerful","Compact","Modular","Easy to install","Safe","Reliable"]} vtype="enphase" d={1.5}/>
  <BatteryCard tag="Sigenergy / Pointguard" title="Pointguard and Sigenergy expand into all-in-one home energy management." desc="Sigenergy combines inverter, battery PCS, battery packs, EMS, and optional bidirectional EV charging in one modular system." features={["5-in-1 design","Intelligent dispatch","Backup protection","Peak-hour control","Bidirectional EV","Modular"]} vtype="sigenergy" d={3}/>

  <section style={{maxWidth:1200,margin:"0 auto",padding:"100px 24px",borderTop:`1px solid ${C.border}`}}><SH badge="Residential Solutions" title="Storage increasingly belongs inside a wider whole-home energy modernization plan."/><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:16}}>{[{t:"The battery pivot",d:"Capture midday solar production and use it later when utility rates are highest."},{t:"Retrofitting for ROI",d:"Adding storage later can preserve the value of an existing solar install."},{t:"Whole-home electrification",d:"Battery systems make more sense when planned alongside EV charging."},{t:"VPP-ready conversations",d:"Some platforms can support grid services and virtual power plant participation."}].map((it,i)=><FC key={i} icon={I.zap} title={it.t} desc={it.d} i={i}/>)}</div></section>
  <CTA badge="Battery Consultation" title="If resilience or smarter home energy control matters, start with storage planning." sub="Compare Tesla, Enphase, Pointguard, retrofit pathways, and the role a battery should play."/>
</div>}

// ─── EV CHARGERS ────────────────────────────
function EVChargersPage(){return <div>
  <Hero heroType="ev" badge="EV Chargers" title="EV charging infrastructure designed for fleets, workplaces, multifamily sites, and homes." sub="Perk Solar keeps EV charging in the same conversation as solar and storage so the property's electrical strategy stays coordinated." pLabel="Plan an EV Charging Project" pTo="/contact" sLabel="Explore Battery Storage" sTo="/batteries" stats={[{l:"Commercial Ready",v:"Workplace, fleet, multifamily"},{l:"Home Supported",v:"Residential charging"},{l:"Infrastructure First",v:"Capacity planning"}]}/>
  <section style={{maxWidth:1200,margin:"0 auto",padding:"100px 24px",borderTop:`1px solid ${C.border}`}}><SH badge="Charging Goals" title="EV charging is now part of long-term property planning."/><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:16}}><FC icon={I.bld} title="Support workplace charging" desc="Create a cleaner experience for staff, guests, or tenants." i={0}/><FC icon={I.zap} title="Plan for fleets" desc="Assess how charging, solar, and storage can work together." i={1}/><FC icon={I.hm} title="Make multifamily sites competitive" desc="Clearer path to modern charging capability for residents." i={2}/><FC icon={I.zap} title="Simplify home charging" desc="Residential chargers alongside home solar, storage, and service capacity." i={3}/></div></section>

  <section style={{maxWidth:1200,margin:"0 auto",padding:"0 24px 80px"}}><ImgSection type="ev" height={380} label="EV Charging"/></section>

  <section style={{background:C.sf,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,position:"relative",overflow:"hidden"}}><Gorb color={C.accent} size={350} bottom="-20%" right="5%" d={2}/><div style={{maxWidth:1200,margin:"0 auto",padding:"100px 24px",position:"relative",zIndex:1}}><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:40,alignItems:"start"}}><SH badge="Use Cases" title="Useful for properties where electrification is already arriving."/><div>{["Workplace and office parking","Fleet depots and service operations","Retail and hospitality parking assets","Multifamily and HOA communities","Homes pairing EV charging with solar or storage","Properties upgrading electrical capacity for future growth"].map((t,i)=><R key={i} delay={i*.05}><CI text={t}/></R>)}</div></div></div></section>

  <section style={{maxWidth:1200,margin:"0 auto",padding:"100px 24px"}}><SH badge="Integrated Energy Planning" title="Charging works better when planned with solar and storage instead of after them."/><div className="clft" style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:28}}><h3 style={{fontSize:16,fontWeight:600,color:C.white,marginBottom:16}}>Plan the system around the property and how it actually uses energy.</h3>{["Coordinate charger placement, electrical capacity, and long-term expansion.","Use solar generation and battery storage to support a thoughtful energy profile.","Keep recommendations practical for businesses while supporting homeowners.","Present Perk Solar as an energy infrastructure partner, not only a panel installer."].map((t,i)=><CI key={i} text={t}/>)}</div></section>
  <CTA badge="EV Charging Consultation" title="If the property needs charging, plan it as part of the full energy picture." sub="Evaluate the charger project and how it should interact with solar, storage, and future growth."/>
</div>}

// ─── ABOUT ──────────────────────────────────
function AboutPage(){return <div>
  <Hero heroType="about" badge="About Perk Solar" title="Serving San Diego homes, businesses, and nonprofits since 2005." sub="Perk Solar is a local solar installation company serving residential, commercial, and non-profit properties with PV solar, battery storage, and EV charging." pLabel="Book a Consultation" pTo="/contact" sLabel="Call Now" sHref="tel:+16193341212" stats={[{l:"Since 2005",v:"Established history"},{l:"El Cajon / San Diego",v:"Local base"},{l:"All Property Types",v:"Homes + Businesses + Non-Profits"}]}/>
  <section style={{maxWidth:1200,margin:"0 auto",padding:"100px 24px",borderTop:`1px solid ${C.border}`}}>
    <SH badge="Company Story" title="A local installer with a long operating history gives customers more confidence."/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(380px,1fr))",gap:40,alignItems:"center",marginBottom:48}}>
      <R><div className="cshm" style={{background:`linear-gradient(135deg,${C.card},#1a1710)`,border:`1px solid ${C.border}`,borderRadius:18,padding:"40px 36px"}}>
        <h3 style={{fontSize:"clamp(1.3rem,2.5vw,1.7rem)",fontWeight:700,color:C.white,marginBottom:14}}>Perk Solar is a real San Diego solar company with long-term local experience.</h3>
        <p style={{fontSize:14,color:C.muted,lineHeight:1.7,marginBottom:10}}>Trusted local service, proven materials, and systems designed for reliable long-term performance.</p>
        <p style={{fontSize:14,color:C.muted,lineHeight:1.7}}>Verify the business through its published phone number, email, location, and contractor license.</p>
      </div></R>
      <ImgSection type="sandiego" height={320} label="San Diego, CA"/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:16}}>
      <FC icon={I.clk} title="Since 2005" desc="Providing residential, commercial, and non-profit solar in San Diego since 2005." i={0}/>
      <FC icon={I.sh} title="Top-quality materials" desc="Proven solar materials for reliable long-term performance." i={1}/>
      <FC icon={I.zap} title="Local electrical expertise" desc="C-10 licensing, local permitting, and hands-on installation knowledge." i={2}/>
      <FC icon={I.bat} title="Battery and EV support" desc="Battery storage and EV charging solutions for homes and businesses." i={3}/>
    </div>
  </section>
  <section style={{background:C.sf,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,position:"relative",overflow:"hidden"}}><Gorb color={C.accent} size={350} bottom="-15%" left="30%" d={2}/><div style={{maxWidth:1200,margin:"0 auto",padding:"100px 24px",position:"relative",zIndex:1}}><SH badge="Google Reviews" title="Customer feedback consistently points to professionalism and follow-through." sub="5.0 stars across 33 Google reviews." center/><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:16}}><RC quote="absolutely wonderful experience" author="Tracy Spreier" d={0}/><RC quote="great job of designing and installing solar panels" author="Shannon Smith" d={.08}/><RC quote="got us back on track in no time" author="Davin Griffith" d={.16}/><RC quote="performed flawlessly ever since" author="Richard Odiorne" d={.24}/></div></div></section>
  <CTA badge="Next Step" title="If you want a local solar company with real installation experience, start here." sub="Use the contact page for residential solar, commercial solar, batteries, EV chargers, and local quote requests."/>
</div>}

// ─── SOLUTIONS ──────────────────────────────
function SolutionsPage(){return <div>
  <Hero heroType="solar" badge="Solutions" title="Choose the Perk Solar path that fits the property, the load, and the goal." sub="Compare the core service paths for commercial solar, residential solar, battery storage, and EV charging before diving deeper." pLabel="Get a Free Quote" pTo="/contact" sLabel="Talk to a Solar Specialist" sHref="tel:+16193341212" stats={[{l:"Commercial + Residential",v:"Both audiences"},{l:"Battery + EV Ready",v:"Storage + charging"},{l:"Southern California",v:"San Diego experience"}]}/>
  <section style={{maxWidth:1200,margin:"0 auto",padding:"100px 24px",borderTop:`1px solid ${C.border}`}}><SH badge="Service Paths" title="Four core routes, each with a direct next step."/><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16}}>
    <NC num="01" title="Commercial Solar" desc="Turnkey solar for operating-cost reduction, long-term ROI, and energy resilience." to="/commercial-solar" vtype="pvCommercial" d={0}/>
    <NC num="02" title="Residential Solar" desc="Homeowner-friendly solar designed for performance, aesthetics, and backup-readiness." to="/residential-solar" vtype="pvRooftop" d={.08}/>
    <NC num="03" title="Battery Storage" desc="Tesla-centered and battery-certified expertise for outage protection and control." to="/batteries" vtype="tesla" d={.16}/>
    <NC num="04" title="EV Chargers" desc="Workplace, fleet, multifamily, and home charging for today and tomorrow." to="/ev-chargers" vtype="ev" d={.24}/>
  </div></section>
  <section style={{background:C.sf,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,position:"relative",overflow:"hidden"}}><Gorb color="#f59e0b" size={300} top="-10%" right="15%" d={1}/><div style={{maxWidth:1200,margin:"0 auto",padding:"100px 24px",position:"relative",zIndex:1}}><SH badge="How To Choose" title="The right route usually follows the property type and the upgrade priority."/><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16}}><FC icon={I.bld} title="Commercial solar" desc="Operating-cost reduction, stronger long-term ROI, and property-level electrical planning." i={0}/><FC icon={I.hm} title="Residential solar" desc="Lower bills, cleaner installation, and a more storage-ready path." i={1}/><FC icon={I.bat} title="Battery and EV upgrades" desc="Best when resilience, electrification, and future energy flexibility all matter." i={2}/></div></div></section>
  <section style={{maxWidth:1200,margin:"0 auto",padding:"60px 24px"}}><R><div className="clft cshm" style={{background:`linear-gradient(135deg,${C.card},#1a1510)`,border:`1px solid ${C.border}`,borderRadius:18,padding:"32px 28px",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:24}}><div><Badge>Need More Detail?</Badge><h3 style={{fontSize:17,fontWeight:600,color:C.white,marginBottom:6}}>PV system types have their own dedicated page too.</h3><p style={{fontSize:14,color:C.muted}}>Rooftop, ground-mount, carport, or commercial PV — the PV Solar page goes deeper.</p></div><div style={{display:"flex",gap:10,flexWrap:"wrap"}}><L to="/pv-solar" className="bglow" style={btn("p")}>Explore PV Solar {I.arr}</L><L to="/contact" style={btn("o")}>Request a Quote</L></div></div></R></section>
  <CTA badge="Next Step" title="Once the route is clear, the quote process can stay focused and straightforward." sub="Start with commercial solar, residential solar, battery storage, EV chargers, or PV system planning."/>
</div>}

// ─── CONTACT ────────────────────────────────
function ContactPage(){const[f,sF]=useState({name:"",company:"",email:"",phone:"",pt:"",city:"",tl:"",ub:"",details:""});const[sent,sS]=useState(false);const inp={width:"100%",padding:"12px 16px",background:C.sf,border:`1px solid ${C.border}`,borderRadius:10,color:C.text,fontSize:14,transition:"all .2s"};return <div>
  <Hero heroType="contact" badge="Contact & Quote" title="Get a quote, book a consultation, or talk directly to a Perk Solar specialist." sub="Call, email, or request a quote for residential solar, commercial solar, battery storage, or EV charger installation." pLabel="Jump to Quote Form" pTo="/contact" sLabel="Call Now" sHref="tel:+16193341212" stats={[{l:"Since 2005",v:"Serving San Diego"},{l:"License 920995",v:"Licensed installer"},{l:"All Projects",v:"Residential + Commercial"}]}/>
  <section style={{maxWidth:1200,margin:"0 auto",padding:"100px 24px",borderTop:`1px solid ${C.border}`}}><SH badge="Reach Perk Solar" title="Call, email, or request a quote." sub="If you already know what you need, reach out directly."/><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:16}}>{[{icon:I.ph,label:"Phone",value:"619-334-1212",href:"tel:+16193341212"},{icon:I.ml,label:"Email",value:"operations@perksolar.com",href:"mailto:operations@perksolar.com"},{icon:I.pin,label:"Location",value:"El Cajon / San Diego, CA"},{icon:I.sh,label:"License",value:"CA Contractors License 920995"}].map((c,i)=><R key={i} delay={i*.08}><div className="clft" style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:22}}><div style={{width:36,height:36,borderRadius:9,background:"linear-gradient(135deg,#ef444418,#f9731618)",display:"flex",alignItems:"center",justifyContent:"center",color:C.accent,marginBottom:12}}>{c.icon}</div><div style={{fontSize:11,color:C.subtle,textTransform:"uppercase",letterSpacing:"1px",marginBottom:4,fontFamily:"var(--fm)"}}>{c.label}</div>{c.href?<a href={c.href} style={{color:C.white,fontWeight:600,fontSize:14}}>{c.value}</a>:<span style={{color:C.white,fontWeight:600,fontSize:14}}>{c.value}</span>}</div></R>)}</div><R delay={.3}><div style={{display:"flex",gap:24,marginTop:20,flexWrap:"wrap"}}><span style={{display:"flex",alignItems:"center",gap:6,color:C.muted,fontSize:13}}>{I.clk} Mon-Fri 8-5 PM</span><span style={{display:"flex",alignItems:"center",gap:6,color:C.muted,fontSize:13}}>{I.clk} Sat 8-12 PM</span></div></R></section>
  <section id="quote-form" style={{background:C.sf,borderTop:`1px solid ${C.border}`}}><div style={{maxWidth:1200,margin:"0 auto",padding:"100px 24px"}}><SH badge="Project Intake" title="Request a quote" sub="Share project details and Perk Solar can review the scope, timing, and best next step."/>{sent?<R><div className="cshm" style={{background:`linear-gradient(135deg,${C.card},#1a1710)`,border:`1px solid ${C.border}`,borderRadius:18,padding:"56px 40px",textAlign:"center"}}><div style={{width:56,height:56,borderRadius:"50%",background:"linear-gradient(135deg,#ef444418,#f9731618)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}>{I.chk}</div><h3 style={{fontSize:22,fontWeight:700,color:C.white,marginBottom:10}}>Quote request received.</h3><p style={{fontSize:14,color:C.muted,maxWidth:400,margin:"0 auto"}}>Perk Solar will follow up soon. Call 619-334-1212 or email operations@perksolar.com.</p></div></R>:<R><div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:18,padding:32,maxWidth:680}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><input placeholder="Name" style={inp} value={f.name} onChange={e=>sF({...f,name:e.target.value})}/><input placeholder="Company" style={inp} value={f.company} onChange={e=>sF({...f,company:e.target.value})}/><input placeholder="Email" type="email" style={inp} value={f.email} onChange={e=>sF({...f,email:e.target.value})}/><input placeholder="Phone" type="tel" style={inp} value={f.phone} onChange={e=>sF({...f,phone:e.target.value})}/><select style={{...inp,appearance:"none"}} value={f.pt} onChange={e=>sF({...f,pt:e.target.value})}><option value="">Project type</option><option>Commercial Solar</option><option>Residential Solar</option><option>Battery Storage</option><option>EV Chargers</option><option>Solar + Storage</option></select><input placeholder="City" style={inp} value={f.city} onChange={e=>sF({...f,city:e.target.value})}/><input placeholder="Timeline" style={inp} value={f.tl} onChange={e=>sF({...f,tl:e.target.value})}/><input placeholder="Avg monthly utility bill" style={inp} value={f.ub} onChange={e=>sF({...f,ub:e.target.value})}/></div><textarea placeholder="Project details" rows={4} style={{...inp,marginTop:12,resize:"vertical"}} value={f.details} onChange={e=>sF({...f,details:e.target.value})}/><div style={{display:"flex",alignItems:"center",gap:14,marginTop:20,flexWrap:"wrap"}}><button onClick={()=>sS(true)} className="bglow" style={{...btn("p"),border:"none"}}>Send Quote Request {I.arr}</button><span style={{fontSize:13,color:C.subtle,fontFamily:"var(--fm)"}}>619-334-1212</span></div></div></R>}</div></section>
  <CTA badge="Ready to Talk?" title="Talk with Perk Solar about your home or business." sub="Reach out for solar installation, battery storage, EV charging, retrofit work, or a straightforward local quote."/>
</div>}

// ═══════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════
export default function App(){
  const path=useRouter();
  const routes={"/":HomePage,"/commercial-solar":CommercialPage,"/residential-solar":ResidentialPage,"/pv-solar":PVSolarPage,"/batteries":BatteriesPage,"/ev-chargers":EVChargersPage,"/about":AboutPage,"/solutions":SolutionsPage,"/contact":ContactPage};
  const Page=routes[path]||HomePage;
  return <div style={{background:C.bg,color:C.text,fontFamily:"var(--f)",minHeight:"100vh"}}><Header/><main><Page/></main><Footer/></div>;
}
