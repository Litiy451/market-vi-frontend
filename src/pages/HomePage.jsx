import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productsApi } from "../api/productsApi";
import "./HomePage.css";

const CATEGORIES = ["Электроника", "Дом", "Спорт", "Одежда", "Аксессуары", "Детям"];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: "" });

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Электроника");

  useEffect(() => {
    loadAllProducts();
  }, []);

  async function loadAllProducts() {
    try {
      setStatus({ loading: true, error: "" });

      const list = await productsApi.getAll();
      setProducts(Array.isArray(list) ? list : []);
      setStatus({ loading: false, error: "" });
    } catch (e) {
      setProducts([]);
      setStatus({
        loading: false,
        error: e.message || "Ошибка загрузки товаров"
      });
    }
  }

  async function handleSearch() {
    try {
      setStatus({ loading: true, error: "" });

      const trimmedQuery = query.trim();

      if (!trimmedQuery) {
        await loadAllProducts();
        return;
      }

      const data = await productsApi.searchProducts({
        q: trimmedQuery,
        page: 0,
        size: 50
      });

      setProducts(Array.isArray(data.content) ? data.content : []);
      setStatus({ loading: false, error: "" });
    } catch (e) {
      setProducts([]);
      setStatus({
        loading: false,
        error: e.message || "Ошибка поиска товаров"
      });
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  }

  return (
    <div className="mv-page">
      <header className="mv-header">
        <div className="mv-brand">Market-VI</div>

        <nav className="mv-nav">
          <Link className="mv-navLink" to="/">Главная</Link>
          <Link className="mv-navLink" to="/login">Вход</Link>
          <Link className="mv-navLink" to="/register">Регистрация</Link>
        </nav>
      </header>

      <main className="mv-main">
        <section className="mv-hero">
          <div className="mv-heroLeft">
            <h1 className="mv-title">
              Market-VI — <span className="mv-subtitle">маркетплейс</span>
            </h1>
            <div className="mv-lead">Найди товары быстро: поиск, категории и подборки.</div>

            <div className="mv-searchRow">
              <input
                className="mv-input"
                placeholder="Поиск товаров..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="mv-btn mv-btnPrimary"
                onClick={handleSearch}
                type="button"
              >
                Найти
              </button>
            </div>

            <div className="mv-cats">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  className={"mv-cat" + (activeCategory === c ? " mv-catActive" : "")}
                  onClick={() => setActiveCategory(c)}
                  type="button"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <aside className="mv-heroRight">
            <div className="mv-pick">
              <div className="mv-pickBadge">-25%</div>
              <div className="mv-pickTop">
                <div className="mv-pickTitle">Техника для дома</div>
                <div className="mv-pickMeta">Подборка недели</div>
              </div>
              <div className="mv-pickText">Скидки на популярные товары</div>
              <button className="mv-btn mv-btnOutline" type="button">
                Смотреть подборку
              </button>
            </div>
          </aside>
        </section>

        <section className="mv-section">
          <div className="mv-sectionHead">
            <h2 className="mv-h2">Популярное</h2>
            <button
              className="mv-linkBtn"
              type="button"
              onClick={loadAllProducts}
            >
              Все товары →
            </button>
          </div>

          {status.loading && <div className="mv-info">Загрузка...</div>}
          {status.error && <div className="mv-error">{status.error}</div>}

          {!status.loading && !status.error && (
            <>
              <div className="mv-grid">
                {products.map((p) => (
                  <ProductCard key={p.id} p={p} />
                ))}
              </div>

              {!products.length && (
                <div className="mv-info">Ничего не найдено.</div>
              )}
            </>
          )}
        </section>

        <section className="mv-seller">
          <div>
            <div className="mv-sellerTitle">Продавцам</div>
            <div className="mv-sellerText">
              Начни продавать на Market-VI — загрузка товаров и управление заказами.
            </div>
          </div>
          <button className="mv-btn mv-btnPrimary" type="button">
            Стать продавцом
          </button>
        </section>
      </main>
    </div>
  );
}

function ProductCard({ p }) {
  const img = p.images?.[0];

  return (
    <div className="mv-card">
      <div className="mv-cardImg">
        {img ? <img src={img} alt={p.title} /> : <div className="mv-cardImgStub" />}
      </div>

      <div className="mv-cardBody">
        <div className="mv-cardTitle">{p.title}</div>
        <div className="mv-cardPrice">{formatPrice(p.price)} ₽</div>

        <div className="mv-cardBottom">
          <div className="mv-cardMeta">
            {p.amount > 0 ? `В наличии: ${p.amount}` : "Нет в наличии"}
          </div>
          <button className="mv-btn mv-btnSmall" type="button">
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}

function formatPrice(value) {
  if (value === null || value === undefined) return "";
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  return new Intl.NumberFormat("ru-RU").format(num);
}