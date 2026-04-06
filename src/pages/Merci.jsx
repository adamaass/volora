import { useEffect } from "react";
import { Plane } from "lucide-react";

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
    if (window.ttq) {
      window.ttq.track('CompleteRegistration', {
        contents: [{
          content_id: "volora_fondateur",
          content_type: "product",
          content_name: "Volora Accès Fondateur"
        }],
        value: 5,
        currency: "EUR"
      });
      window.ttq.track('Purchase', {
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

          {/* Info */}
          <div className="merci-fade" style={{ marginTop: 40, animationDelay: ".3s" }}>
            <div style={{
              background: T.white, borderRadius: 18, padding: "32px 24px",
              border: `1px solid ${T.border}`, textAlign: "center",
            }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>📩</div>
              <h3 style={{ fontFamily: sans, fontWeight: 700, fontSize: 17, color: T.text, marginBottom: 8 }}>
                On te tient au courant
              </h3>
              <p style={{ fontFamily: sans, fontSize: 14, color: T.textMid, lineHeight: 1.7, marginBottom: 16 }}>
                Tu recevras un email dès que l'application sera prête à être utilisée.
              </p>
              <p style={{ fontFamily: sans, fontSize: 14, color: T.textLight, lineHeight: 1.7, marginBottom: 12 }}>
                Pour toute question, contacte-nous sur WhatsApp&nbsp;:
              </p>
              <a href="https://wa.me/33689361268" target="_blank" rel="noopener" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#25D366", color: "#fff", fontFamily: sans, fontWeight: 600, fontSize: 14,
                padding: "12px 24px", borderRadius: 12, textDecoration: "none",
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                +33 6 89 36 12 68
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
