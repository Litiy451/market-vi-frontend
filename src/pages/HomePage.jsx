// src/pages/HomePage.jsx
import { useMemo, useState } from "react";

export default function HomePage() {
  const [query, setQuery] = useState("");

  // Временно моковые товары (потом заменишь на API)
  const products = useMemo(
    () => [
      { id: 1, title: "Наушники Bluetooth", price: 2990, rating: 4.6, category: "Электроника" },
      { id: 2, title: "Кроссовки беговые", price: 5490, rating: 4.4, category: "Спорт" },
      { id: 3, title: "Кофемолка", price: 1990, rating: 4.2, category: "Дом" },
      { id: 4, title: "Рюкзак городской", price: 2590, rating: 4.7, category: "Аксессуары" },
      { id: 5, title: "Клавиатура механическая", price: 6990, rating: 4.8, category: "Электроника" },
      { id: 6, title: "Настольная лампа", price: 1490, rating: 4.1, category: "Дом" },
    ],
    []
  );

  const categories = useMemo(
    () => ["Электроника", "Дом", "Спорт", "Одежда", "Аксессуары", "Детям"],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.title.toLowerCase().includes(q));
  }, [products, query]);

  return (
    <div style={styles.page}>
      <Header />

      <main style={styles.main}>
        <section style={styles.hero}>
          <div>
            <h1 style={styles.h1}>Market-VI — маркетплейс</h1>
            <p style={styles.subtitle}>
              Найди товары быстро: поиск, категории и подборки.
            </p>

            <div style={styles.searchRow}>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск товаров…"
                style={styles.searchInput}
              />
              <button style={styles.searchBtn}>Найти</button>
            </div>

            <div style={styles.chips}>
              {categories.map((c) => (
                <button key={c} style={styles.chip} onClick={() => setQuery(c)}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.heroCard}>
            <div style={styles.heroCardTop}>
              <span style={styles.badge}>-25%</span>
              <span style={styles.muted}>Подборка недели</span>
            </div>
            <div style={styles.heroCardBody}>
              <div style={styles.heroCardTitle}>Техника для дома</div>
              <div style={styles.muted}>Скидки на популярные товары</div>
            </div>
            <button style={styles.primaryBtn}>Смотреть подборку</button>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.h2}>Популярное</h2>
            <button style={styles.linkBtn}>Все товары →</button>
          </div>

          <div style={styles.grid}>
            {filtered.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.banner}>
            <div>
              <div style={styles.bannerTitle}>Продавцам</div>
              <div style={styles.muted}>
                Начни продавать на Market-VI — загрузка товаров и управление заказами.
              </div>
            </div>
            <button style={styles.primaryBtn}>Стать продавцом</button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.containerRow}>
        <div style={styles.logo}>Market-VI</div>

        <nav style={styles.nav}>
          <a href="/" style={styles.navLink}>Главная</a>
          <a href="/login" style={styles.navLink}>Вход</a>
          <a href="/register" style={styles.navLink}>Регистрация</a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.containerRow}>
        <div style={styles.muted}>© {new Date().getFullYear()} Market-VI</div>
        <div style={styles.muted}>Демо-версия</div>
      </div>
    </footer>
  );
}

function ProductCard({ p }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardImg} />
      <div style={styles.cardBody}>
        <div style={styles.cardTitle}>{p.title}</div>
        <div style={styles.cardMeta}>
          <span style={styles.price}>{p.price.toLocaleString("ru-RU")} ₽</span>
          <span style={styles.rating}>★ {p.rating}</span>
        </div>
        <div style={styles.muted}>{p.category}</div>
        <button style={styles.secondaryBtn}>В корзину</button>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#0b1220", color: "#e5e7eb" },
  header: { borderBottom: "1px solid rgba(255,255,255,0.08)", position: "sticky", top: 0, backdropFilter: "blur(10px)", background: "rgba(11,18,32,0.7)", zIndex: 10 },
  footer: { borderTop: "1px solid rgba(255,255,255,0.08)", padding: "18px 0" },
  containerRow: { maxWidth: 1100, margin: "0 auto", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 },
  logo: { fontWeight: 800, letterSpacing: 0.3 },
  nav: { display: "flex", gap: 12, flexWrap: "wrap" },
  navLink: { color: "#cbd5e1", textDecoration: "none", fontSize: 14, padding: "6px 10px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)" },

  main: { maxWidth: 1100, margin: "0 auto", padding: "22px 16px 40px" },

  hero: { display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: 18, alignItems: "stretch" },
  h1: { margin: 0, fontSize: 42, lineHeight: 1.1 },
  subtitle: { marginTop: 10, marginBottom: 16, color: "#94a3b8" },

  searchRow: { display: "flex", gap: 10, marginBottom: 12 },
  searchInput: { flex: 1, padding: "12px 14px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", color: "#e5e7eb", outline: "none" },
  searchBtn: { padding: "12px 16px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.08)", color: "#e5e7eb", cursor: "pointer" },

  chips: { display: "flex", gap: 8, flexWrap: "wrap" },
  chip: { padding: "8px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", color: "#cbd5e1", cursor: "pointer", fontSize: 13 },

  heroCard: { borderRadius: 18, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", padding: 16, display: "flex", flexDirection: "column", gap: 12 },
  heroCardTop: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  badge: { fontSize: 12, padding: "4px 10px", borderRadius: 999, background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.35)", color: "#86efac" },
  heroCardBody: { flex: 1, display: "flex", flexDirection: "column", gap: 6 },
  heroCardTitle: { fontSize: 18, fontWeight: 700 },

  section: { marginTop: 26 },
  sectionHeader: { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 12 },
  h2: { margin: 0, fontSize: 20 },
  linkBtn: { background: "transparent", border: "none", color: "#93c5fd", cursor: "pointer" },

  grid: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14 },

  card: { borderRadius: 18, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)", overflow: "hidden" },
  cardImg: { height: 140, background: "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(168,85,247,0.18))" },
  cardBody: { padding: 12, display: "flex", flexDirection: "column", gap: 8 },
  cardTitle: { fontWeight: 700 },
  cardMeta: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  price: { fontWeight: 800 },
  rating: { color: "#fde68a" },

  primaryBtn: { padding: "10px 12px", borderRadius: 14, border: "1px solid rgba(59,130,246,0.6)", background: "rgba(59,130,246,0.25)", color: "#dbeafe", cursor: "pointer" },
  secondaryBtn: { padding: "10px 12px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "#e5e7eb", cursor: "pointer" },

  banner: { borderRadius: 18, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", padding: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 },
  bannerTitle: { fontSize: 18, fontWeight: 800 },

  muted: { color: "#94a3b8", fontSize: 13 },
};