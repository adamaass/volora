import { useState, useEffect, useRef } from "react";
import {
  Plane, ChevronDown, ChevronUp, Shield, Clock,
  ArrowRight, Star, Zap,
  Heart, BrainCircuit, Radar,
  Lock, Send,
} from "lucide-react";
import { sendToTallyAndRedirect } from "../utils/tally.js";

/* ═══════════════════════════════════════════
   FONTS
   ═══════════════════════════════════════════ */
const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=General+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap";
if (!document.querySelector(`link[href="${FONT_HREF}"]`)) {
  const fontLink = document.createElement("link");
  fontLink.href = FONT_HREF;
  fontLink.rel = "stylesheet";
  document.head.appendChild(fontLink);
}

/* ═══════════════════════════════════════════
   STYLES
   ═══════════════════════════════════════════ */
const STYLE_PAGE_ID = "volora-genz-page-styles";
if (!document.querySelector(`style#${STYLE_PAGE_ID}`)) {
  const css = document.createElement("style");
  css.id = STYLE_PAGE_ID;
  css.textContent = `
  html{scroll-behavior:smooth}
  body{overflow-x:hidden;-webkit-font-smoothing:antialiased}

  @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
  @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(255,107,74,.25)}50%{box-shadow:0 0 0 12px rgba(255,107,74,0)}}
  @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
  @keyframes wiggle{0%,100%{transform:rotate(0deg)}25%{transform:rotate(-2deg)}75%{transform:rotate(2deg)}}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:.4}}
  @keyframes gradient{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
  @keyframes pop{0%{transform:scale(.95);opacity:0}60%{transform:scale(1.02)}100%{transform:scale(1);opacity:1}}

  .fade-up{animation:fadeUp .6s cubic-bezier(.22,1,.36,1) both}

  .cta-main{
    position:relative;overflow:hidden;cursor:pointer;
    transition:all .25s cubic-bezier(.22,1,.36,1);
  }
  .cta-main::after{
    content:'';position:absolute;inset:0;
    background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,.2) 50%,transparent 70%);
    background-size:200% 100%;animation:shimmer 3s ease-in-out infinite;
  }
  .cta-main:hover{transform:translateY(-2px) scale(1.02);box-shadow:0 12px 32px -8px rgba(255,107,74,.3)}
  .cta-main:active{transform:translateY(0) scale(.98)}

  .deal-card{transition:transform .3s cubic-bezier(.22,1,.36,1),box-shadow .3s ease}
  .deal-card:hover{transform:translateY(-4px);box-shadow:0 16px 40px -12px rgba(0,0,0,.08)}

  .faq-body{overflow:hidden;transition:max-height .4s cubic-bezier(.22,1,.36,1),opacity .3s ease,padding .3s ease}

  .marquee-wrap{overflow:hidden}
  .marquee-track{display:flex;width:max-content;animation:marquee 32s linear infinite}

  .progress-bar{background:linear-gradient(90deg,#FF6B4A,#FF8A6A,#FF6B4A);background-size:200% 100%;animation:gradient 3s ease infinite}

  .live-dot{width:7px;height:7px;border-radius:50%;background:#FF6B4A;animation:blink 2s ease-in-out infinite}

  .tag-bounce:hover{animation:wiggle .4s ease}

  ::selection{background:#FF6B4A;color:#fff}

  @media(max-width:640px){
    .hero-h1{font-size:2rem !important;line-height:1.12 !important}
    .hero-sub{font-size:.92rem !important}
    .section-title{font-size:1.65rem !important}
  }
`;
  document.head.appendChild(css);
}

/* ═══════════════════════════════════════════
   THEME — Gen Z warm, light, chill
   ═══════════════════════════════════════════ */
const T = {
  bg: "#FAFAF7",
  white: "#FFFFFF",
  black: "#1A1A1A",
  text: "#2D2D2D",
  textMid: "#5A5A5A",
  textLight: "#8E8E8E",
  textMuted: "#B0B0B0",

  coral: "#FF6B4A",
  coralLight: "#FFF0EC",
  coralDark: "#E85535",

  peach: "#FFE8D6",
  mint: "#E8F5EE",
  mintDark: "#2EA66A",
  sky: "#EBF4FF",
  skyDark: "#3B82F6",
  lavender: "#F0EDFF",
  lavDark: "#7C6BF0",
  lemon: "#FFF9E6",
  lemonDark: "#D4A020",

  border: "#EBEBEB",
  borderLight: "#F5F5F3",
  cardBg: "#FFFFFF",
  heroBg: "#FEFCF9",
};

const serif = "'Instrument Serif', Georgia, serif";
const sans = "'General Sans', 'Outfit', system-ui, -apple-system, sans-serif";

/* ═══════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════ */
function useInView(threshold = .12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function useCountdown(ms) {
  const [end] = useState(() => Date.now() + ms);
  const [left, setLeft] = useState(ms);
  useEffect(() => { const id = setInterval(() => setLeft(Math.max(0, end - Date.now())), 1000); return () => clearInterval(id); }, [end]);
  return { h: Math.floor(left / 36e5), m: Math.floor((left % 36e5) / 6e4), s: Math.floor((left % 6e4) / 1e3) };
}

/* ═══════════════════════════════════════════
   SMALL COMPONENTS
   ═══════════════════════════════════════════ */
function AiBadge({ style: sx }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      background: T.lavender, borderRadius: 50, padding: "4px 10px", ...sx,
    }}>
      <BrainCircuit size={11} color={T.lavDark} />
      <span style={{ fontFamily: sans, fontSize: 10.5, fontWeight: 600, color: T.lavDark, letterSpacing: ".02em" }}>IA</span>
    </span>
  );
}

function Btn({ children, href, large, style: sx }) {
  return (
    <a href={href || "#pricing"} className="cta-main" style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
      background: T.coral, color: "#fff", fontFamily: sans,
      fontWeight: 600, fontSize: large ? 16 : 14, letterSpacing: ".01em",
      padding: large ? "15px 34px" : "11px 24px",
      borderRadius: 14, border: "none", textDecoration: "none",
      animation: large ? "pulse 2.5s ease-in-out infinite" : "none", ...sx,
    }}>{children}</a>
  );
}

function TimerBox({ value, label }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      background: T.coralLight, borderRadius: 10, padding: "8px 12px", minWidth: 48,
    }}>
      <span style={{ fontFamily: sans, fontWeight: 700, fontSize: 20, color: T.coral, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
        {String(value).padStart(2, "0")}
      </span>
      <span style={{ fontFamily: sans, fontSize: 9, fontWeight: 500, color: T.textLight, textTransform: "uppercase", letterSpacing: ".08em", marginTop: 2 }}>
        {label}
      </span>
    </div>
  );
}

function SectionTag({ children, emoji }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: T.coralLight, borderRadius: 50, padding: "6px 14px", marginBottom: 14,
    }}>
      {emoji && <span style={{ fontSize: 13 }}>{emoji}</span>}
      <span style={{ fontFamily: sans, fontSize: 11.5, fontWeight: 600, color: T.coral, letterSpacing: ".03em" }}>
        {children}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      backdropFilter: "blur(16px) saturate(1.5)",
      WebkitBackdropFilter: "blur(16px) saturate(1.5)",
      background: scrolled ? "rgba(250,250,247,.88)" : "rgba(254,252,249,.7)",
      borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent",
      transition: "all .35s ease",
    }}>
      <div style={{
        maxWidth: 1040, margin: "0 auto", padding: "12px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: T.coral,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Plane size={16} color="#fff" strokeWidth={2.5} style={{ transform: "rotate(-45deg)" }} />
          </div>
          <span style={{ fontFamily: serif, fontWeight: 400, fontSize: 22, color: T.black, letterSpacing: "-.01em" }}>
            Volora
          </span>
          <AiBadge />
        </div>
        <a href="#" style={{ fontFamily: sans, fontSize: 13, fontWeight: 500, color: T.textLight, textDecoration: "none" }}>
          Connexion
        </a>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════
   URGENCY BAR
   ═══════════════════════════════════════════ */
function UrgencyBar() {
  const total = 200;
  const [taken, setTaken] = useState(153);
  const remaining = total - taken;
  const pct = (taken / total) * 100;
  useEffect(() => {
    const id = setInterval(() => { if (Math.random() > .65) setTaken(p => Math.min(p + 1, total - 4)); }, 22000);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ background: T.text, padding: "9px 20px" }}>
      <div style={{
        maxWidth: 480, margin: "0 auto",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: sans, fontSize: 12, color: "rgba(255,255,255,.7)", fontWeight: 500 }}>
          <Zap size={12} color={T.coral} fill={T.coral} />
          Offre Fondateur — <strong style={{ color: "#fff" }}>{remaining} places</strong> restantes
        </div>
        <div style={{ width: "100%", maxWidth: 280, height: 4, borderRadius: 10, background: "rgba(255,255,255,.1)", overflow: "hidden" }}>
          <div className="progress-bar" style={{ width: `${pct}%`, height: "100%", borderRadius: 10, transition: "width 1s ease" }} />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */
function Hero() {
  const { h, m, s } = useCountdown(24 * 36e5);
  const [members, setMembers] = useState(153);
  useEffect(() => {
    const id = setInterval(() => { if (Math.random() > .6) setMembers(p => p + 1); }, 18000 + Math.random() * 20000);
    return () => clearInterval(id);
  }, []);
  return (
    <section style={{
      background: T.heroBg, paddingTop: 100, paddingBottom: 64,
      position: "relative", overflow: "hidden",
    }}>
      {/* Soft gradient blobs */}
      <div style={{ position: "absolute", top: -80, right: -60, width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,74,.05) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, left: -40, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,107,240,.04) 0%, transparent 60%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 660, margin: "0 auto", padding: "0 24px", textAlign: "center", position: "relative", zIndex: 2 }}>

        {/* Tag */}
        <div className="fade-up">
          <SectionTag emoji="✈️">Offre de lancement · Places limitées</SectionTag>
        </div>

        {/* Headline */}
        <h1 className="hero-h1 fade-up" style={{
          fontFamily: serif, fontWeight: 400, fontSize: 48, lineHeight: 1.1,
          color: T.black, letterSpacing: "-.02em", marginBottom: 14,
          animationDelay: ".06s",
        }}>
          Ne payez <span style={{ fontStyle: "italic", color: T.coral }}>plus jamais</span><br />
          le prix fort pour vos<br />billets d'avion.
        </h1>

        {/* Timer */}
        <div className="fade-up" style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          marginBottom: 22, animationDelay: ".1s",
        }}>
          <span style={{ fontFamily: sans, fontSize: 12, color: T.textLight, fontWeight: 500 }}>L'offre expire dans</span>
          <div style={{ display: "flex", gap: 6 }}>
            <TimerBox value={h} label="h" />
            <TimerBox value={m} label="min" />
            <TimerBox value={s} label="sec" />
          </div>
        </div>

        {/* Sub */}
        <p className="hero-sub fade-up" style={{
          fontFamily: sans, fontSize: 16, lineHeight: 1.65, color: T.textMid,
          maxWidth: 500, margin: "0 auto 30px", fontWeight: 400,
          animationDelay: ".16s",
        }}>
          Notre <strong style={{ color: T.text }}>IA propriétaire</strong> scanne 500+ compagnies 24h/24
          pour détecter les erreurs de prix et les promos secrètes <em>avant tout le monde</em>.
        </p>

        {/* CTA */}
        <div className="fade-up" style={{ animationDelay: ".22s" }}>
          <Btn large>
            Profiter de l'offre — 4,99€
            <ArrowRight size={16} strokeWidth={2.5} />
          </Btn>
        </div>

        {/* Social proof */}
        <div className="fade-up" style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          marginTop: 24, animationDelay: ".28s",
        }}>
          <div style={{ display: "flex" }}>
            {["🧑‍💻", "👩‍🎨", "🧑‍✈️", "👩‍💼"].map((emoji, i) => (
              <div key={i} style={{
                width: 28, height: 28, borderRadius: "50%", background: [T.peach, T.sky, T.lavender, T.mint][i],
                border: `2px solid ${T.heroBg}`, marginLeft: i > 0 ? -7 : 0,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, zIndex: 4 - i,
              }}>{emoji}</div>
            ))}
          </div>
          <span style={{ fontFamily: sans, fontSize: 13, color: T.textLight, fontWeight: 500 }}>
            Déjà <strong style={{ color: T.text, fontVariantNumeric: "tabular-nums" }}>{members}</strong> voyageurs inscrits
          </span>
        </div>

        {/* Trust */}
        <div className="fade-up" style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 18,
          flexWrap: "wrap", animationDelay: ".32s",
        }}>
          {[
            { icon: Shield, t: "Paiement Stripe" },
            { icon: Lock, t: "Données protégées" },
            { icon: Heart, t: "Zéro spam" },
          ].map((x, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <x.icon size={12} color={T.textMuted} />
              <span style={{ fontFamily: sans, fontSize: 11, color: T.textMuted, fontWeight: 500 }}>{x.t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   MARQUEE
   ═══════════════════════════════════════════ */
function Marquee() {
  const items = [
    "🇺🇸 Paris → New York 98€",
    "🇦🇪 Lyon → Dubaï 47€",
    "🇲🇦 Paris → Marrakech 19€",
    "🇬🇷 Marseille → Athènes 32€",
    "🇵🇹 Toulouse → Lisbonne 24€",
    "🇮🇸 Nantes → Reykjavik 63€",
    "🇮🇹 Nice → Rome 14€",
    "🇪🇸 Bordeaux → Barcelone 18€",
  ];
  const all = [...items, ...items];
  return (
    <div className="marquee-wrap" style={{
      background: T.white, borderTop: `1px solid ${T.border}`,
      borderBottom: `1px solid ${T.border}`, padding: "12px 0",
    }}>
      <div className="marquee-track">
        {all.map((d, i) => (
          <span key={i} style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, color: T.text, whiteSpace: "nowrap", padding: "0 22px" }}>
            {d}
            <span style={{ color: T.coral, margin: "0 8px", fontSize: 8, verticalAlign: "middle" }}>●</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   HOW IT WORKS
   ═══════════════════════════════════════════ */
function HowItWorks() {
  const [ref, vis] = useInView();
  const steps = [
    { icon: Radar, bg: T.sky, color: T.skyDark, emoji: "🔍", title: "L'IA scanne tout", desc: "Notre IA analyse en continu les tarifs de 500+ compagnies et détecte les anomalies de prix en millisecondes." },
    { icon: Send, bg: T.coralLight, color: T.coral, emoji: "⚡", title: "Alerte instantanée", desc: "Dès qu'un deal dingue apparaît, vous recevez un email avec le prix, la destination et le lien direct." },
    { icon: Plane, bg: T.mint, color: T.mintDark, emoji: "🛫", title: "Vous décollez", desc: "Réservez en 2 clics sur le site de la compagnie. Zéro commission. Le deal est à vous." },
  ];
  return (
    <section ref={ref} style={{ background: T.bg, padding: "72px 24px" }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <SectionTag emoji="🤖">Comment ça marche</SectionTag>
          <h2 className="section-title" style={{
            fontFamily: serif, fontWeight: 400, fontSize: 36, color: T.black,
            letterSpacing: "-.02em", lineHeight: 1.15,
          }}>
            Trois étapes. <span style={{ fontStyle: "italic", color: T.coral }}>Zéro effort.</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
          {steps.map((s, i) => (
            <div
              key={i}
              className={vis ? "fade-up" : ""}
              style={{
                opacity: vis ? 1 : 0, animationDelay: `${i * .12}s`,
                background: T.white, borderRadius: 20, border: `1px solid ${T.border}`,
                padding: "30px 24px", textAlign: "center",
                transition: "border-color .3s, transform .3s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.coral + "30"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 16, background: s.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 18px", fontSize: 24,
              }}>{s.emoji}</div>
              <h3 style={{ fontFamily: sans, fontWeight: 600, fontSize: 16, color: T.text, marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontFamily: sans, fontSize: 13.5, lineHeight: 1.6, color: T.textMid }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   DEALS
   ═══════════════════════════════════════════ */
function DealShowcase() {
  const [ref, vis] = useInView();
  const deals = [
    { from: "Paris CDG", to: "New York JFK", flag: "🇺🇸", price: 98, was: 580, airline: "Norse Atlantic", tag: "Erreur de prix", tagBg: "#FEE2E2", tagColor: "#DC2626", date: "15 – 22 juin", cls: "Économique", pct: "83" },
    { from: "Lyon LYS", to: "Dubaï DXB", flag: "🇦🇪", price: 47, was: 420, airline: "Wizz Air", tag: "Erreur de prix", tagBg: "#FEE2E2", tagColor: "#DC2626", date: "8 – 15 oct", cls: "Économique", pct: "89" },
    { from: "Paris ORY", to: "Marrakech RAK", flag: "🇲🇦", price: 19, was: 180, airline: "Ryanair", tag: "Vente flash", tagBg: T.lavender, tagColor: T.lavDark, date: "3 – 10 mai", cls: "Économique", pct: "89" },
    { from: "Marseille MRS", to: "Athènes ATH", flag: "🇬🇷", price: 32, was: 240, airline: "Transavia", tag: "Promo secrète", tagBg: T.lemon, tagColor: T.lemonDark, date: "1 – 8 sept", cls: "Économique", pct: "87" },
    { from: "Toulouse TLS", to: "Lisbonne LIS", flag: "🇵🇹", price: 24, was: 195, airline: "easyJet", tag: "Vente flash", tagBg: T.lavender, tagColor: T.lavDark, date: "12 – 19 nov", cls: "Économique", pct: "88" },
    { from: "Nantes NTE", to: "Reykjavik KEF", flag: "🇮🇸", price: 63, was: 380, airline: "PLAY", tag: "Erreur de prix", tagBg: "#FEE2E2", tagColor: "#DC2626", date: "20 – 27 oct", cls: "Économique", pct: "83" },
  ];
  return (
    <section ref={ref} style={{ background: T.white, padding: "72px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <SectionTag emoji="🔥">Deals récents</SectionTag>
          <h2 className="section-title" style={{
            fontFamily: serif, fontWeight: 400, fontSize: 36, color: T.black,
            letterSpacing: "-.02em", lineHeight: 1.15,
          }}>
            Détectés par notre IA,<br /><span style={{ fontStyle: "italic", color: T.coral }}>la semaine dernière.</span>
          </h2>
          <p style={{ fontFamily: sans, fontSize: 14, color: T.textMid, marginTop: 8 }}>
            De vrais deals envoyés à nos membres. Vérifiés, réservables, exceptionnels.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {deals.map((d, i) => (
            <div
              key={i}
              className={`deal-card ${vis ? "fade-up" : ""}`}
              style={{ opacity: vis ? 1 : 0, animationDelay: `${i * .08}s`, background: T.white, borderRadius: 18, border: `1px solid ${T.border}`, overflow: "hidden" }}
            >
              {/* Top bar */}
              <div style={{ padding: "14px 16px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span className="tag-bounce" style={{
                    display: "inline-block", background: d.tagBg, borderRadius: 8, padding: "3px 8px",
                    fontFamily: sans, fontSize: 10.5, fontWeight: 700, color: d.tagColor,
                    textTransform: "uppercase", letterSpacing: ".03em",
                  }}>{d.tag}</span>
                </div>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 3,
                  background: T.lavender, borderRadius: 6, padding: "3px 7px",
                  fontFamily: sans, fontSize: 9, fontWeight: 600, color: T.lavDark,
                }}>
                  <BrainCircuit size={9} /> IA
                </span>
              </div>

              {/* Airline */}
              <div style={{ padding: "0 16px 6px", fontFamily: sans, fontSize: 12, color: T.textLight, fontWeight: 500 }}>
                {d.airline} · {d.cls}
              </div>

              {/* Route */}
              <div style={{ padding: "4px 16px 14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: sans, fontWeight: 600, fontSize: 14.5, color: T.text, flex: 1 }}>{d.from}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <div style={{ width: 16, height: 1, background: T.border }} />
                    <Plane size={12} color={T.coral} />
                    <div style={{ width: 16, height: 1, background: T.border }} />
                  </div>
                  <span style={{ fontFamily: sans, fontWeight: 600, fontSize: 14.5, color: T.text, flex: 1, textAlign: "right" }}>
                    {d.to} {d.flag}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div style={{
                padding: "12px 16px", background: T.bg, borderTop: `1px solid ${T.border}`,
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Clock size={11} color={T.textLight} />
                  <span style={{ fontFamily: sans, fontSize: 11.5, color: T.textLight }}>{d.date}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{
                    fontFamily: sans, fontSize: 11, color: T.textMuted, textDecoration: "line-through",
                  }}>{d.was}€</span>
                  <span style={{
                    fontFamily: sans, fontWeight: 700, fontSize: 22, color: T.text,
                  }}>{d.price}€</span>
                  <span style={{
                    background: T.mint, borderRadius: 6, padding: "2px 6px",
                    fontFamily: sans, fontSize: 10.5, fontWeight: 700, color: T.mintDark,
                  }}>−{d.pct}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PRICING
   ═══════════════════════════════════════════ */
function Pricing() {
  const [ref, vis] = useInView();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const features = [
    { emoji: "📬", text: "Tous les deals premium par email" },
    { emoji: "⚡", text: "Alertes erreurs de prix en temps réel" },
    { emoji: "📍", text: "Deals personnalisés par aéroport" },
    { emoji: "🥇", text: "Accès prioritaire (avant la liste d'attente)" },
    { emoji: "🔒", text: "Tarif fondateur verrouillé à vie" },
    { emoji: "💸", text: "Satisfait ou remboursé, sans condition" },
  ];

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);

    if (window.ttq) {
      if (email.trim()) {
        const buf = await crypto.subtle.digest('SHA-256',
          new TextEncoder().encode(email.trim().toLowerCase()));
        const hashed = Array.from(new Uint8Array(buf))
          .map(b => b.toString(16).padStart(2, '0')).join('');
        window.ttq.identify({ email: hashed });
      }
      window.ttq.track('InitiateCheckout', {
        contents: [{
          content_id: "volora_fondateur",
          content_type: "product",
          content_name: "Volora Accès Fondateur"
        }],
        value: 5,
        currency: "EUR"
      });
    }

    await new Promise(r => setTimeout(r, 300));
    await sendToTallyAndRedirect(email.trim());
  };

  return (
    <section ref={ref} id="pricing" style={{ background: T.bg, padding: "72px 24px" }}>
      <div style={{ maxWidth: 440, margin: "0 auto", textAlign: "center" }}>
        <SectionTag emoji="☕">Tarif</SectionTag>
        <h2 className="section-title" style={{
          fontFamily: serif, fontWeight: 400, fontSize: 36, color: T.black,
          letterSpacing: "-.02em", lineHeight: 1.15,
        }}>
          Accès à vie pour le<br /><span style={{ fontStyle: "italic", color: T.coral }}>prix d'un café.</span>
        </h2>
        <p style={{ fontFamily: sans, fontSize: 14, color: T.textMid, marginTop: 8, marginBottom: 32 }}>
          Rentabilisé dès votre premier voyage.
        </p>

        {/* Card */}
        <div className={vis ? "fade-up" : ""} style={{
          opacity: vis ? 1 : 0,
          background: T.white, borderRadius: 24, padding: "36px 28px 32px",
          border: `2px solid ${T.coral}20`,
          boxShadow: "0 8px 40px -12px rgba(255,107,74,.08)",
        }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            background: T.coralLight, borderRadius: 50, padding: "5px 12px", marginBottom: 22,
          }}>
            <Star size={12} color={T.coral} fill={T.coral} />
            <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 700, color: T.coral, textTransform: "uppercase", letterSpacing: ".04em" }}>
              Fondateur
            </span>
          </div>

          {/* Price */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 6 }}>
            <span style={{ fontFamily: sans, fontSize: 16, color: T.textMuted, textDecoration: "line-through", fontWeight: 500 }}>49€/an</span>
            <span style={{ fontFamily: serif, fontWeight: 400, fontSize: 64, color: T.text, lineHeight: 1, letterSpacing: "-.03em" }}>4,99€</span>
          </div>
          <p style={{ fontFamily: sans, fontSize: 13, color: T.textLight, marginBottom: 28 }}>
            Paiement unique · Accès à vie
          </p>

          {/* Features */}
          <div style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
            {features.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 15, width: 22, textAlign: "center", flexShrink: 0 }}>{f.emoji}</span>
                <span style={{ fontFamily: sans, fontSize: 13.5, color: T.textMid, lineHeight: 1.4 }}>{f.text}</span>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleEmailSubmit}
            style={{
              display: "block", width: "100%", margin: 0, textAlign: "left",
            }}
          >
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@email.com"
              required
              autoComplete="email"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "14px 16px",
                marginBottom: 12,
                borderRadius: 14,
                border: `1px solid ${T.border}`,
                fontFamily: sans,
                fontSize: 15,
                color: T.text,
                background: T.white,
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              className="cta-main"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                width: "100%",
                background: T.coral,
                color: "#fff",
                fontFamily: sans,
                fontWeight: 600,
                fontSize: 16,
                letterSpacing: ".01em",
                padding: "15px 34px",
                borderRadius: 14,
                border: "none",
                cursor: loading ? "wait" : "pointer",
                animation: "pulse 2.5s ease-in-out infinite",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Redirection..." : (
                <>
                  Rejoindre les Fondateurs — 4,99€
                  <ArrowRight size={16} strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, marginTop: 14 }}>
            <Shield size={11} color={T.textMuted} />
            <span style={{ fontFamily: sans, fontSize: 11, color: T.textMuted }}>
              Paiement sécurisé par Stripe
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════ */
function FAQ() {
  const [open, setOpen] = useState(null);
  const items = [
    { q: "Comment l'IA détecte-t-elle les deals ?", a: "Notre IA propriétaire surveille en temps réel les tarifs de 500+ compagnies aériennes. Elle identifie les erreurs de prix et les promos non relayées en quelques millisecondes. Vous recevez l'alerte avant que le prix soit corrigé." },
    { q: "Combien d'emails vais-je recevoir ?", a: "En moyenne 3 à 5 par semaine, uniquement quand un deal en vaut vraiment la peine. Chaque alerte est vérifiée par notre équipe. Zéro spam — promis. 🤞" },
    { q: "Le paiement de 4,99€ est-il sécurisé ?", a: "100%. Le paiement est traité par Stripe (le même que Spotify, Amazon…). Vos données bancaires ne passent jamais par nos serveurs. Remboursement sans condition dans les 30 jours." },
    { q: "Pourquoi 4,99€ et pas plus ?", a: "On lance Volora et on cherche nos 200 premiers ambassadeurs. Le tarif passera à 49€/an ensuite. En rejoignant maintenant, vous verrouillez le prix fondateur de 4,99€ à vie. Deal ? 🤝" },
    { q: "Puis-je choisir mes aéroports ?", a: "Oui ! Dès l'inscription. Paris, Lyon, Marseille, Toulouse, Nantes, Nice, Bordeaux… Vous ne recevez que les deals qui partent de chez vous." },
  ];
  return (
    <section style={{ background: T.white, padding: "72px 24px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <SectionTag emoji="💬">FAQ</SectionTag>
          <h2 className="section-title" style={{
            fontFamily: serif, fontWeight: 400, fontSize: 36, color: T.black, letterSpacing: "-.02em",
          }}>
            Vos questions, <span style={{ fontStyle: "italic", color: T.coral }}>nos réponses.</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{
                background: isOpen ? T.coralLight : T.bg,
                borderRadius: 14, overflow: "hidden",
                border: `1px solid ${isOpen ? T.coral + "20" : "transparent"}`,
                transition: "all .3s ease",
              }}>
                <button onClick={() => setOpen(isOpen ? null : i)} style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                  gap: 12, padding: "16px 18px", border: "none", background: "none", cursor: "pointer", textAlign: "left",
                }}>
                  <span style={{ fontFamily: sans, fontWeight: 600, fontSize: 14, color: T.text, lineHeight: 1.4 }}>{it.q}</span>
                  <div style={{
                    width: 26, height: 26, borderRadius: 8, flexShrink: 0,
                    background: isOpen ? T.coral : T.border,
                    display: "flex", alignItems: "center", justifyContent: "center", transition: "all .25s",
                  }}>
                    {isOpen
                      ? <ChevronUp size={13} color="#fff" strokeWidth={2.5} />
                      : <ChevronDown size={13} color={T.textLight} strokeWidth={2.5} />}
                  </div>
                </button>
                <div className="faq-body" style={{
                  maxHeight: isOpen ? 260 : 0, opacity: isOpen ? 1 : 0,
                  padding: isOpen ? "0 18px 16px" : "0 18px",
                }}>
                  <p style={{ fontFamily: sans, fontSize: 13.5, lineHeight: 1.65, color: T.textMid }}>{it.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section style={{
      background: T.text, padding: "64px 24px", textAlign: "center",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,74,.06) 0%, transparent 55%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 480, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <span style={{ fontSize: 36, display: "block", marginBottom: 16 }}>✈️</span>
        <h2 style={{
          fontFamily: serif, fontWeight: 400, fontSize: 30, color: "#fff",
          letterSpacing: "-.02em", lineHeight: 1.2, marginBottom: 12,
        }}>
          Votre prochain vol à prix cassé<br />est déjà dans <span style={{ fontStyle: "italic", color: T.coral }}>notre radar.</span>
        </h2>
        <p style={{ fontFamily: sans, fontSize: 14, color: "rgba(255,255,255,.5)", marginBottom: 28, lineHeight: 1.6 }}>
          Rejoignez les fondateurs et laissez l'IA bosser pour vous.
        </p>
        <Btn large href="#pricing">
          Profiter de l'offre — 4,99€
          <ArrowRight size={16} strokeWidth={2.5} />
        </Btn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ background: T.bg, borderTop: `1px solid ${T.border}`, padding: "24px 24px" }}>
      <div style={{
        maxWidth: 960, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: T.coral, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Plane size={10} color="#fff" strokeWidth={2.5} style={{ transform: "rotate(-45deg)" }} />
          </div>
          <span style={{ fontFamily: serif, fontSize: 15, color: T.textLight }}>Volora</span>
        </div>
        <div style={{ display: "flex", gap: 16, fontFamily: sans, fontSize: 11.5, color: T.textMuted }}>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>CGV</a>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Confidentialité</a>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Contact</a>
        </div>
        <span style={{ fontFamily: sans, fontSize: 11, color: T.textMuted }}>
          Fait avec ❤️ à Paris · © 2026 Volora
        </span>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   APP
   ═══════════════════════════════════════════ */
export default function VoloraGenZ() {
  useEffect(() => {
    if (window.ttq) {
      window.ttq.track('ViewContent', {
        contents: [{
          content_id: "volora_fondateur",
          content_type: "product",
          content_name: "Volora Accès Fondateur"
        }],
        value: 5,
        currency: "EUR"
      });
    }
  }, []);

  return (
    <div style={{ fontFamily: sans, background: T.bg, minHeight: "100vh", overflowX: "hidden" }}>
      <Navbar />
      <UrgencyBar />
      <Hero />
      <Marquee />
      <HowItWorks />
      <DealShowcase />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
