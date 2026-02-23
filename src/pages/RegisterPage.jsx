import { useState } from 'react'
import { usersApi } from '../api/usersApi'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setResult(null)
    try {
      const user = await usersApi.create(form)
      setResult(user)
    } catch (err) {
      setError(err.message || 'Ошибка')
    }
  }

  return (
    <div style={{ maxWidth: 520, margin: '40px auto', display: 'grid', gap: 12 }}>
      <h2>Создать пользователя</h2>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 10 }}>
        <input name="name" placeholder="Имя" value={form.name} onChange={onChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} />
        <input name="password" type="password" placeholder="Пароль" value={form.password} onChange={onChange} />
        <button type="submit">Создать</button>
      </form>

      {error && <div style={{ color: 'crimson' }}>{error}</div>}

      {result && (
        <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
          <div><b>Создан:</b></div>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}