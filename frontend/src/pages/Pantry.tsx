import React, { useEffect, useState } from 'react'
import { addPantry, getPantry } from '../api'

export default function Pantry() {
  const [list, setList] = useState<any[]>([])
  const [name, setName] = useState('')
  const [qty, setQty] = useState(1)
  const [unit, setUnit] = useState('unit')
  const [expiry, setExpiry] = useState('')

  const load = async () => setList(await getPantry())
  useEffect(()=>{ load() }, [])

  const save = async () => {
    await addPantry({ name, quantity: qty, unit, expiry: expiry || null })
    setName(''); setQty(1); setUnit('unit'); setExpiry('')
    load()
  }

  return (
    <div>
      <h2>Garde-manger</h2>
      <div style={{display:'grid', gridTemplateColumns:'1fr 120px 120px 160px auto', gap:8}}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)}/>
        <input type="number" value={qty} onChange={e=>setQty(parseFloat(e.target.value))}/>
        <input value={unit} onChange={e=>setUnit(e.target.value)}/>
        <input type="date" value={expiry} onChange={e=>setExpiry(e.target.value)}/>
        <button onClick={save}>Add</button>
      </div>
      <ul>
        {list.map(it=>(
          <li key={it.id}>{it.name} — {it.quantity} {it.unit} {it.expiry?`(expire: ${it.expiry})`:''}</li>
        ))}
      </ul>
    </div>
  )
}
