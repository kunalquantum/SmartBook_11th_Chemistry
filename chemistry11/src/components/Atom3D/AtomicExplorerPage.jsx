import { useState } from 'react'
import Atom3D from './Atom3D'
import { ATOM_DATA } from './AtomData'
import ReactionMixer from './ReactionMixer'

export default function AtomicExplorerPage() {
    const [selElement, setSelElement] = useState(ATOM_DATA[0])
    const [mixA, setMixA] = useState(ATOM_DATA[0]) // Hydrogen
    const [mixB, setMixB] = useState(ATOM_DATA[7]) // Oxygen

    return (
        <div style={{ padding: '24px 32px', maxWidth: 1000, margin: '0 auto', height: '100%', overflowY: 'auto' }}>
            {/* Header */}
            <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--bg2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                        🔭
                    </div>
                    <div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text1)', letterSpacing: '-0.5px' }}>3D Atomic Explorer</div>
                        <div style={{ fontSize: 13, color: 'var(--text3)', marginTop: 4 }}>Dedicated Interactive Sandbox for Subatomic Mathematical Visualization</div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '14px 18px', background: 'rgba(55,138,221,0.08)', border: '1px solid rgba(55,138,221,0.25)', borderRadius: 12, marginBottom: 24, fontSize: 13, fontFamily: 'var(--mono)', color: 'var(--text2)', lineHeight: 1.7 }}>
                <strong style={{ color: 'var(--blue)' }}>Full 3D Engine Setup:</strong> Select any of the first 20 elements to structurally instantiate them. You can freely rotate the models 360°, toggle quantum visualization layers (Bohr Orbits vs Probability Clouds), and isolate structural energy levels.
            </div>

            {/* Element Picker Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 8, marginBottom: 24 }}>
                {ATOM_DATA.map(el => (
                    <button key={el.z} onClick={() => setSelElement(el)} style={{
                        padding: '8px 4px', borderRadius: 8, fontSize: 14,
                        fontFamily: 'var(--mono)', cursor: 'pointer', fontWeight: 700,
                        background: selElement.z === el.z ? 'var(--blue)' : 'var(--bg3)',
                        color: selElement.z === el.z ? '#fff' : 'var(--text2)',
                        border: `1px solid ${selElement.z === el.z ? 'var(--blue)' : 'var(--border)'}`,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                        transition: 'all 0.15s'
                    }}>
                        <span style={{ fontSize: 18 }}>{el.sym}</span>
                        <span style={{ fontSize: 9, opacity: 0.8, fontWeight: 400 }}>Z = {el.z}</span>
                    </button>
                ))}
            </div>

            {/* 3D Viewer Main Canvas */}
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, marginBottom: 40 }}>
                <Atom3D z={selElement.z} mass={selElement.mass} symbol={selElement.sym} name={selElement.name} />
            </div>

            {/* Reaction Sandbox Section */}
            <div style={{ borderTop: '2px dashed var(--border)', paddingTop: 40, paddingBottom: 60 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    <div style={{ fontSize: 20 }}>🧪</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text1)' }}>Molecular Synthesizer Sandbox</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 20, alignItems: 'center', marginBottom: 24 }}>
                    {/* Selector A */}
                    <div style={{ padding: 16, background: 'var(--bg2)', borderRadius: 12, border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: 10, color: 'var(--text3)', marginBottom: 12, fontFamily: 'var(--mono)' }}>REACTANT A</div>
                        <select 
                            value={mixA.z} 
                            onChange={(e) => setMixA(ATOM_DATA.find(x => x.z === parseInt(e.target.value)))}
                            style={{ width: '100%', padding: 8, background: 'var(--bg3)', border: '1px solid var(--border)', color: '#fff', borderRadius: 6, fontFamily: 'var(--mono)' }}
                        >
                            {ATOM_DATA.map(el => <option key={el.z} value={el.z}>{el.sym} - {el.name}</option>)}
                        </select>
                    </div>

                    <div style={{ fontSize: 24, color: 'var(--text3)', fontWeight: 300 }}>+</div>

                    {/* Selector B */}
                    <div style={{ padding: 16, background: 'var(--bg2)', borderRadius: 12, border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: 10, color: 'var(--text3)', marginBottom: 12, fontFamily: 'var(--mono)' }}>REACTANT B</div>
                        <select 
                            value={mixB.z} 
                            onChange={(e) => setMixB(ATOM_DATA.find(x => x.z === parseInt(e.target.value)))}
                            style={{ width: '100%', padding: 8, background: 'var(--bg3)', border: '1px solid var(--border)', color: '#fff', borderRadius: 6, fontFamily: 'var(--mono)' }}
                        >
                            {ATOM_DATA.map(el => <option key={el.z} value={el.z}>{el.sym} - {el.name}</option>)}
                        </select>
                    </div>
                </div>

                <ReactionMixer atomA={mixA} atomB={mixB} />
            </div>
        </div>
    )
}
