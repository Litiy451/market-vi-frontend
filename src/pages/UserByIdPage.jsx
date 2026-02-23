import { useState } from 'react'
import { usersApi } from '../api/usersApi'

export default function UserByIdPage() {
  const [id, setId] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [edit, setEdit] = useState({ name: '', email: '' })

  const load = async () => {
    setError('')
    setUser(null)
    try {
      const u = await usersApi.getById(id)
      setUser(u)
      setEdit({ name: u.name ?? '', email: u.email ?? '' })
    } catch (e) {
      setError(e.message)
    }
  }

  const save = async () => {
    setError('')
    try {
      const updated = await usersApi.update(id, { ...user, ...edit })
      setUser(updated)
    } catch (e) {
      setError(e.message)
    }
  }

  const remove = async () => {
    setError('')
    try {
      const deleted = await usersApi.remove(id)
      setUser(deleted) // у тебя delete возвращает User
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: '40px auto', display: 'grid', gap: 12 }}>
      <h2>Пользователь по ID</h2>

      <div style={{ display: 'flex', gap: 8 }}>
        <input placeholder="id" value={id} onChange={(e) => setId(e.target.value)} />
        <button onClick={load} disabled={!id}>Загрузить</button>
      </div>

      {error && <div style={{ color: 'crimson' }}>{error}</div>}

      {user && (
        <div style={{ display: 'grid', gap: 10, padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
          <div><b>Текущие данные:</b></div>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{JSON.stringify(user, null, 2)}</pre>

          <div><b>Редактирование:</b></div>
          <input
            placeholder="name"
            value={edit.name}
            onChange={(e) => setEdit({ ...edit, name: e.target.value })}
          />
          <input
            placeholder="email"
            value={edit.email}
            onChange={(e) => setEdit({ ...edit, email: e.target.value })}
          />

          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={save}>Сохранить (PUT)</button>
            <button onClick={remove}>Удалить (DELETE)</button>
          </div>
        </div>
      )}
    </div>
  )
}