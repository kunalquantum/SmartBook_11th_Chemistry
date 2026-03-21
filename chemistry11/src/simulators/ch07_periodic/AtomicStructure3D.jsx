import { useState } from 'react'
import Atom3D from '../../components/Atom3D/Atom3D'
import { ATOM_DATA } from '../../components/Atom3D/AtomData'

export default function AtomicStructure3D() {
    const [selElement, setSelElement] = useState(ATOM_DATA[0])

    return (
        <div>
            <div style={{ padding: '10px 14px', background: 'rgba(29,158,117,0.08)', border: '1px solid rgba(29,158,117,0.25)', borderRadius: 8, marginBottom: 14, fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--text2)', lineHeight: 1.7 }}>
                <strong style={{ color: 'var(--teal)' }}>3D Atomic Explorer:</strong> Select an element below to visualise its protons, neutrons, and orbiting electrons. The logic is strictly separated into Nucleus and Shell generators for modularity!
            </div>

            {/* Element Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6, marginBottom: 14 }}>
                {ATOM_DATA.map(el => (
                    <button key={el.z} onClick={() => setSelElement(el)} style={{
                        padding: '8px', borderRadius: 8, fontSize: 14,
                        fontFamily: 'var(--mono)', cursor: 'pointer', fontWeight: 700,
                        background: selElement.z === el.z ? 'var(--teal)' : 'var(--bg3)',
                        color: selElement.z === el.z ? '#fff' : 'var(--text2)',
                        border: `1px solid ${selElement.z === el.z ? 'var(--teal)' : 'var(--border)'}`,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4
                    }}>
                        <span style={{ fontSize: 16 }}>{el.sym}</span>
                        <span style={{ fontSize: 9, opacity: 0.7, fontWeight: 400 }}>Z = {el.z}</span>
                    </button>
                ))}
            </div>

            {/* 3D Viewer */}
            <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', borderRadius: 12, padding: 16 }}>
                <Atom3D z={selElement.z} mass={selElement.mass} symbol={selElement.sym} name={selElement.name} />
            </div>
        </div>
    )
}
