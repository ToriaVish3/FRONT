export const AuroraRibbonHero = (): JSX.Element => {
  return (
    <div className="aurora-hero -z-10 pointer-events-none" aria-hidden="true">
      <div className="bg" />
      <div className="ribbon r1" />
      <div className="ribbon r2" />
      <div className="ribbon r3" />
      <div className="ribbon r4" />
      <div className="grain" />
      <style>{css}</style>
    </div>
  );
};

const css = `
:root{
  --bg0:#04050a;
  --bg1:#05081a;
  --blue:#4aa3ff;
  --ice:#a6c9ff;
  --vio:#8b6bff;
  --pink:#ff5ec9;
  --gold:#ffcc66;
  --cyan:#44ffd7;
}

.aurora-hero{
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: radial-gradient(1200px 700px at 60% 15%, #0a1340 0%, rgba(6,8,20,0.2) 45%, var(--bg0) 70%),
              radial-gradient(900px 700px at 70% 75%, #07122f 0%, rgba(5,7,18,0.15) 55%, var(--bg0) 78%),
              linear-gradient(180deg, var(--bg1), var(--bg0));
}

/* soft vignette + subtle depth */
.aurora-hero .bg{
  position:absolute; inset:-20%;
  background:
    radial-gradient(900px 500px at 55% 30%, rgba(74,163,255,0.18), transparent 60%),
    radial-gradient(700px 450px at 78% 55%, rgba(139,107,255,0.16), transparent 62%),
    radial-gradient(900px 700px at 35% 80%, rgba(68,255,215,0.10), transparent 65%),
    radial-gradient(1200px 900px at 50% 110%, rgba(0,0,0,0.85), rgba(0,0,0,0.95));
  filter: blur(0.5px);
  transform: translateZ(0);
}

/* shared ribbon layer */
.aurora-hero .ribbon{
  position:absolute;
  inset:-35% -25%;
  border-radius: 999px;
  mix-blend-mode: screen;
  opacity: 0.9;
  filter: blur(14px) saturate(1.25) contrast(1.05);
  transform: translateZ(0);
}

/* big top arc */
.aurora-hero .r1{
  top:-55%;
  left:-30%;
  width: 160%;
  height: 90%;
  transform: rotate(-8deg);
  background:
    linear-gradient(90deg,
      rgba(74,163,255,0.00) 0%,
      rgba(74,163,255,0.25) 18%,
      rgba(166,201,255,0.70) 34%,
      rgba(139,107,255,0.85) 48%,
      rgba(255,204,102,0.55) 58%,
      rgba(74,163,255,0.20) 72%,
      rgba(74,163,255,0.00) 100%),
    radial-gradient(closest-side at 40% 55%, rgba(74,163,255,0.55), transparent 70%);
  mask-image: radial-gradient(closest-side, #000 58%, transparent 78%);
  -webkit-mask-image: radial-gradient(closest-side, #000 58%, transparent 78%);
}

/* main diagonal ribbon */
.aurora-hero .r2{
  top:-10%;
  left: 10%;
  width: 140%;
  height: 120%;
  transform: rotate(18deg);
  background:
    linear-gradient(90deg,
      rgba(74,163,255,0.00) 0%,
      rgba(74,163,255,0.18) 14%,
      rgba(68,255,215,0.38) 28%,
      rgba(74,163,255,0.65) 42%,
      rgba(139,107,255,0.80) 54%,
      rgba(166,201,255,0.60) 66%,
      rgba(74,163,255,0.16) 80%,
      rgba(74,163,255,0.00) 100%),
    radial-gradient(closest-side at 55% 55%, rgba(255,94,201,0.20), transparent 75%);
  mask-image: radial-gradient(closest-side, #000 52%, transparent 76%);
  -webkit-mask-image: radial-gradient(closest-side, #000 52%, transparent 76%);
  opacity: 0.85;
}

/* thin light streak */
.aurora-hero .r3{
  top: 35%;
  left:-35%;
  width: 160%;
  height: 55%;
  transform: rotate(-6deg);
  filter: blur(10px) saturate(1.4);
  background:
    linear-gradient(90deg,
      rgba(74,163,255,0.00) 0%,
      rgba(74,163,255,0.10) 20%,
      rgba(166,201,255,0.55) 38%,
      rgba(74,163,255,0.25) 55%,
      rgba(74,163,255,0.06) 72%,
      rgba(74,163,255,0.00) 100%);
  mask-image: radial-gradient(closest-side, #000 38%, transparent 74%);
  -webkit-mask-image: radial-gradient(closest-side, #000 38%, transparent 74%);
  opacity: 0.65;
}

/* bottom-left glow sweep */
.aurora-hero .r4{
  top: 55%;
  left: -60%;
  width: 140%;
  height: 110%;
  transform: rotate(28deg);
  background:
    radial-gradient(closest-side at 35% 65%, rgba(74,163,255,0.75), transparent 72%),
    radial-gradient(closest-side at 55% 55%, rgba(139,107,255,0.30), transparent 78%),
    linear-gradient(90deg,
      rgba(74,163,255,0.00) 0%,
      rgba(74,163,255,0.28) 22%,
      rgba(68,255,215,0.18) 40%,
      rgba(74,163,255,0.00) 72%);
  mask-image: radial-gradient(closest-side, #000 48%, transparent 78%);
  -webkit-mask-image: radial-gradient(closest-side, #000 48%, transparent 78%);
  opacity: 0.9;
}

/* subtle film grain */
.aurora-hero .grain{
  position:absolute; inset:-40%;
  background-image:
    repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0 1px, rgba(0,0,0,0.015) 1px 2px),
    repeating-linear-gradient(90deg, rgba(255,255,255,0.010) 0 1px, rgba(0,0,0,0.010) 1px 2px);
  mix-blend-mode: overlay;
  opacity: 0.22;
  filter: blur(0.2px);
  pointer-events:none;
  transform: translateZ(0);
}
`;
