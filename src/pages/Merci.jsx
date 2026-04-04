import { useEffect } from "react";
import { Plane, ArrowRight, Check } from "lucide-react";

const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=General+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap";
if (!document.querySelector(`link[href="${FONT_HREF}"]`)) {
  const fontLink = document.createElement("link");
  fontLink.href = FONT_HREF;
  fontLink.rel = "stylesheet";
  document.head.appendChild(fontLink);
}

const STYLE_ID = "volora-merci-styles";
if (!document.querySelector(`style#${STYLE_ID}`)) {
  const css = document.createElement("style");
  css.id = STYLE_ID;
  css.textContent = `
  @keyframes checkScale{0%{transform:scale(0);opacity:0}60%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
  @keyframes confetti{0%{opacity:0;transform:translateY(-10px) rotate(0) scale(0)}15%{opacity:1;transform:translateY(0) rotate(60deg) scale(1)}100%{opacity:0;transform:translateY(60px) rotate(540deg) scale(.3)}}
  @keyframes drawCheck{from{stroke-dashoffset:36}to{stroke-dashoffset:0}}
  .merci-fade{animation:fadeUp .6s cubic-bezier(.22,1,.36,1) both}
  .merci-check{animation:checkScale .6s cubic-bezier(.34,1.56,.64,1) both}
  .merci-check-path{stroke-dasharray:36;stroke-dashoffset:36;animation:drawCheck .5s ease .4s forwards}
  .merci-confetti{position:absolute;width:8px;height:8px;border-radius:2px;animation:confetti 2s ease forwards;opacity:0}
  .merci-card{transition:transform .25s ease,box-shadow .25s ease}
  .merci-card:hover{transform:translateY(-3px);box-shadow:0 12px 30px -8px rgba(0,0,0,.07)}
  .merci-share{transition:transform .2s,box-shadow .2s}
  .merci-share:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.08)}
  `;
  document.head.appendChild(css);
}

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
  mint: "#E8F5EE",
  mintDark: "#2EA66A",
  sky: "#EBF4FF",
  lavender: "#F0EDFF",
  border: "#EBEBEB",
  heroBg: "#FEFCF9",
};

const serif = "'Instrument Serif', Georgia, serif";
const sans = "'General Sans', system-ui, -apple-system, sans-serif";

export default function Merci() {
  useEffect(() => {
    document.title = "Bienvenue chez Volora — Confirmation";
    // TODO: META PIXEL - Purchase Event
    // TODO: TIKTOK PIXEL - Purchase Event
    // TODO: STRIPE PURCHASE CONVERSION
  }, []);

  const steps = [
    {
      emoji: "💬",
      num: "01",
      title: "Rejoins la communauté",
      desc: "Retrouve les autres voyageurs fondateurs sur Discord pour des tips, des alertes et du partage.",
      action: { label: "Rejoindre le Discord", href: "#", bg: "#5865F2" },
    },
    {
      emoji: "📱",
      num: "02",
      title: "Suis-nous sur les réseaux",
      desc: "Deals en avant-première, coulisses de l'IA et témoignages de voyageurs.",
      links: [
        { label: "TikTok", href: "#" },
        { label: "Instagram", href: "#" },
      ],
    },
    {
      emoji: "🚀",
      num: "03",
      title: "Accès bêta",
      desc: "Tu recevras un email dès que la bêta sera prête. En tant que Fondateur, tu seras parmi les tout premiers.",
      badge: "Bêta prévue T3 2026",
    },
  ];

  return (
    <div style={{ fontFamily: sans, background: T.bg, minHeight: "100vh", overflowX: "hidden" }}>
      {/* Header */}
      <header style={{
        padding: "18px 20px",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10, background: T.coral,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Plane size={16} color="#fff" strokeWidth={2.5} style={{ transform: "rotate(-45deg)" }} />
        </div>
        <span style={{ fontFamily: serif, fontWeight: 400, fontSize: 22, color: T.black }}>
          Volora
        </span>
      </header>

      {/* Hero */}
      <section style={{
        background: T.heroBg, padding: "40px 24px 56px", textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -80, right: -60, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,74,.05) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: -40, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(46,166,106,.04) 0%, transparent 60%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 520, margin: "0 auto", position: "relative", zIndex: 2 }}>
          {/* Animated Check */}
          <div className="merci-fade" style={{ position: "relative", display: "inline-block", marginBottom: 28 }}>
            {[T.coral, "#2EA66A", "#F59E0B", "#3B82F6", "#E85535", "#7C6BF0"].map((c, i) => (
              <div key={i} className="merci-confetti" style={{
                background: c,
                top: [10, 0, 20, -5, 30, 5][i],
                [i % 2 === 0 ? "left" : "right"]: [-10, -8, -20, -18, -25, -25][i],
                animationDelay: `${0.5 + i * 0.1}s`,
              }} />
            ))}
            <div className="merci-check" style={{
              width: 72, height: 72, borderRadius: "50%",
              background: `linear-gradient(135deg, ${T.mintDark}, #34D399)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 8px 40px rgba(46,166,106,.25)",
            }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path className="merci-check-path" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <div className="merci-fade" style={{ animationDelay: ".15s" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              background: T.coralLight, borderRadius: 50, padding: "5px 14px", marginBottom: 14,
            }}>
              <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 600, color: T.coral, letterSpacing: ".03em" }}>
                PAIEMENT CONFIRMÉ
              </span>
            </div>

            <h1 style={{
              fontFamily: serif, fontWeight: 400, fontSize: "clamp(28px, 6vw, 44px)",
              color: T.black, letterSpacing: "-.02em", lineHeight: 1.15, marginBottom: 10,
            }}>
              Bienvenue chez les{" "}
              <span style={{ fontStyle: "italic", color: T.coral }}>Fondateurs</span> ✈️
            </h1>
            <p style={{ fontFamily: sans, fontSize: 16, color: T.textMid, lineHeight: 1.6, marginBottom: 6 }}>
              Tu es officiellement <strong style={{ color: T.text }}>Membre Fondateur</strong> de Volora.
            </p>
            <p style={{ fontFamily: sans, fontSize: 15, color: T.textLight, marginBottom: 16 }}>
              Ton accès à vie est confirmé.
            </p>

            {/* Order Number */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: T.white, border: `1px solid ${T.border}`, borderRadius: 50,
              padding: "8px 18px",
            }}>
              <span style={{ fontFamily: sans, fontSize: 13, color: T.textLight }}>Commande</span>
              <span style={{ fontFamily: sans, fontSize: 13, fontWeight: 700, color: T.coral, letterSpacing: ".04em" }}>#VLR-XXXX</span>
            </div>
          </div>

          {/* Steps */}
          <div style={{ marginTop: 48, textAlign: "left" }}>
            <p className="merci-fade" style={{
              fontFamily: sans, fontSize: 11, fontWeight: 600, letterSpacing: ".1em",
              color: T.coral, textTransform: "uppercase", textAlign: "center", marginBottom: 20,
              animationDelay: ".25s",
            }}>
              Prochaines étapes
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {steps.map((st, i) => (
                <div key={i} className={`merci-card merci-fade`} style={{
                  animationDelay: `${0.3 + i * 0.1}s`,
                  background: T.white, borderRadius: 18, padding: "22px 20px",
                  border: `1px solid ${T.border}`,
                }}>
                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: T.coralLight,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 22, flexShrink: 0,
                    }}>{st.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontFamily: sans, fontSize: 10, fontWeight: 600, letterSpacing: ".08em", color: T.coral, textTransform: "uppercase" }}>
                        Étape {st.num}
                      </span>
                      <h3 style={{ fontFamily: sans, fontWeight: 600, fontSize: 15, color: T.text, margin: "4px 0 6px" }}>{st.title}</h3>
                      <p style={{ fontFamily: sans, fontSize: 13.5, color: T.textMid, lineHeight: 1.6, marginBottom: st.action || st.links || st.badge ? 12 : 0 }}>{st.desc}</p>

                      {st.action && (
                        <a href={st.action.href} style={{
                          display: "inline-flex", alignItems: "center", gap: 6,
                          background: st.action.bg, color: "#fff",
                          fontFamily: sans, fontWeight: 600, fontSize: 13,
                          padding: "9px 18px", borderRadius: 10, textDecoration: "none",
                        }}>
                          {st.action.label}
                        </a>
                      )}

                      {st.links && (
                        <div style={{ display: "flex", gap: 8 }}>
                          {st.links.map((lk, j) => (
                            <a key={j} href={lk.href} style={{
                              display: "inline-flex", alignItems: "center", gap: 4,
                              background: T.text, color: "#fff",
                              fontFamily: sans, fontWeight: 600, fontSize: 12,
                              padding: "8px 14px", borderRadius: 8, textDecoration: "none",
                            }}>{lk.label}</a>
                          ))}
                        </div>
                      )}

                      {st.badge && (
                        <div style={{
                          display: "inline-flex", alignItems: "center", gap: 6,
                          background: T.mint, borderRadius: 8, padding: "6px 12px",
                        }}>
                          <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.mintDark, animation: "blink 2s ease-in-out infinite" }} />
                          <span style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: T.mintDark }}>{st.badge}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="merci-fade" style={{ marginTop: 44, animationDelay: ".65s" }}>
            <p style={{ fontFamily: sans, fontSize: 13, color: T.textLight, marginBottom: 14 }}>
              Partage la nouvelle avec tes amis voyageurs
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://twitter.com/intent/tweet?text=Je%20viens%20de%20rejoindre%20Volora%20en%20tant%20que%20Fondateur%20%E2%9C%88%EF%B8%8F%20L%27IA%20qui%20d%C3%A9tecte%20les%20vols%20%C3%A0%20prix%20cass%C3%A9%20%F0%9F%94%A5" target="_blank" rel="noopener" className="merci-share" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: T.text, color: "#fff", fontFamily: sans, fontWeight: 600, fontSize: 13,
                padding: "12px 22px", borderRadius: 12, textDecoration: "none",
              }}>
                Partager sur X
              </a>
              <a href="https://wa.me/?text=Je%20viens%20de%20rejoindre%20Volora%20%E2%9C%88%EF%B8%8F%20L%27IA%20qui%20trouve%20les%20vols%20pas%20chers%20avant%20tout%20le%20monde%20%F0%9F%94%A5" target="_blank" rel="noopener" className="merci-share" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#25D366", color: "#fff", fontFamily: sans, fontWeight: 600, fontSize: 13,
                padding: "12px 22px", borderRadius: 12, textDecoration: "none",
              }}>
                Partager sur WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
          <a href="/" style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: T.coral, textDecoration: "none" }}>
            ← Retour à l'accueil
          </a>
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
    </div>
  );
}
