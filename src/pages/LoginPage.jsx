import { useState } from "react";
import { authApi } from "../api/authApi";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: "", ok: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: "", ok: "" });
    try {
      await authApi.login(form);
      setStatus({ loading: false, error: "", ok: "Вход выполнен ✅" });
    } catch (err) {
      setStatus({ loading: false, error: err.message || "Ошибка", ok: "" });
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <h2>Вход</h2>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} />
        <input name="password" type="password" placeholder="Пароль" value={form.password} onChange={onChange} />
        <button disabled={status.loading}>
          {status.loading ? "Отправка..." : "Войти"}
        </button>
        {status.error && <div style={{ color: "crimson" }}>{status.error}</div>}
        {status.ok && <div style={{ color: "green" }}>{status.ok}</div>}
      </form>
    </div>
  );
}