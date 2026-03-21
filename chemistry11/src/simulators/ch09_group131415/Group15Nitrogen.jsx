import { useState, useEffect, useRef } from 'react'
import { GROUP15 } from './helpers/groupData'
import ChemSlider from '../../components/ui/ChemSlider'
import ValueCard from '../../components/ui/ValueCard'

const HABER_STEPS = [
    { label: 'N₂ + 3H₂ ⇌ 2NH₃', temp: '450°C', pressure: '200 atm', catalyst: 'Fe (with K₂O, Al₂O₃ promoters)', yield: '~15% per pass', color: '#1D9E75' },
]

const OSTWALD_STEPS = [
    { n: 1, eq: '4NH₃ + 5O₂ → 4NO + 6H₂O', note: 'Catalytic oxidation — Pt/Rh gauze, 850°C', col: '#EF9F27' },
    { n: 2, eq: '2NO + O₂ → 2NO₂', note: 'Oxidation of NO by air (no catalyst needed)', col: '#D85A30' },
    { n: 3, eq: '3NO₂ + H₂O → 2HNO₃ + NO', note: 'Absorption in water → dilute HNO₃', col: '#7F77DD' },
]

const P_ALLOTROPES = [
    { name: 'White phosphorus', formula: 'P₄', color: '#FAC775', toxic: true, mp: 44, conduct: false, structure: 'Tetrahedral P₄ units — very reactive', desc: 'Glows in dark (chemiluminescence). Stored under water. Extremely toxic. Burns spontaneously in air.' },
    { name: 'Red phosphorus', formula: 'Pₙ', color: '#D85A30', toxic: false, mp: 590, conduct: false, structure: 'Polymeric chain of P₄ units — much less reactive', desc: 'Safer form. Used in match box striking surface. Formed by heating white P at 250°C without air.' },
    { name: 'Black phosphorus', formula: 'Pₙ', color: '#444441', toxic: false, mp: 610, conduct: true, structure: 'Layered structure — similar to graphite', desc: 'Most stable allotrope. Semiconductor. Formed at very high pressure. Analogue of graphene.' },
]

export default function Group15Nitrogen() {
    const [mode, setMode] = useState('haber')
    const [temp, setTemp] = useState(450)
    const [pressure, setPressure] = useState(200)
    const [selStep, setSelStep] = useState(0)
    const [selAllot, setSelAllot] = useState(0)
    const [selEl, setSelEl] = useState('N')

    // Equilibrium yield estimate for Haber process (simplified)
    // At higher T: yield drops (exothermic), at higher P: yield rises
    const yieldPct = Math.max(5, Math.min(60,
        30 * (200 / pressure) * (400 / temp) * pressure / 200
    )).toFixed(1)

    const pa = P_ALLOTROPES[selAllot]
    const el = GROUP15.find(e => e.sym === selEl)

    const TREND_DATA = {
        AR: { label: 'Atomic radius (pm)', vals: GROUP15.map(e => e.AR), max: 143 },
        IE1: { label: 'IE₁ (kJ/mol)', vals: GROUP15.map(e => e.IE1), max: 1402 },
        EN: { label: 'Electronegativity', vals: GROUP15.map(e => e.EN), max: 3.04 },
    }
    const [trendProp, setTrendProp] = useState('AR')
    const td = TREND_DATA[trendProp]

    return (
        <div>
            {/* Mode tabs */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                {[{ k: 'haber', l: 'Haber process' }, { k: 'ostwald', l: 'Ostwald process' }, { k: 'phosphorus', l: 'P allotropes' }, { k: 'trends', l: 'Group 15 trends' }].map(opt => (
                    <button key={opt.k} onClick={() => setMode(opt.k)} style={{
                        flex: 1, padding: '5px 4px', borderRadius: 6, fontSize: 11,
                        fontFamily: 'var(--mono)', cursor: 'pointer',
                        background: mode === opt.k ? 'var(--teal)' : 'var(--bg3)',
                        color: mode === opt.k ? '#fff' : 'var(--text2)',
                        border: `1px solid ${mode === opt.k ? 'var(--teal)' : 'var(--border2)'}`,
                    }}>{opt.l}</button>
                ))}
            </div>

            {/* ── HABER PROCESS ── */}
            {mode === 'haber' && (
                <div>
                    <div style={{ padding: '10px 14px', background: 'rgba(29,158,117,0.08)', border: '1px solid rgba(29,158,117,0.25)', borderRadius: 8, marginBottom: 14, fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--text2)', lineHeight: 1.7 }}>
                        <strong style={{ color: 'var(--teal)' }}>N₂ + 3H₂ ⇌ 2NH₃</strong>  ΔH = −92 kJ/mol (exothermic, fewer moles of gas)
                        <br />Le Chatelier: high pressure and low temperature favour products — but too low T slows rate. Compromise: 450°C, 200 atm, Fe catalyst.
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
                        <ChemSlider label="Temperature" unit="°C" value={temp} min={200} max={700} step={10} onChange={setTemp} color="var(--coral)" />
                        <ChemSlider label="Pressure" unit=" atm" value={pressure} min={50} max={400} step={10} onChange={setPressure} color="var(--teal)" />
                    </div>

                    {/* Yield indicator */}
                    <div style={{ padding: '16px', background: 'var(--bg3)', border: '1px solid var(--border2)', borderRadius: 10, marginBottom: 14 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                            <div style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--text2)' }}>
                                Estimated NH₃ yield at {temp}°C, {pressure} atm
                            </div>
                            <div style={{ fontSize: 20, fontFamily: 'var(--mono)', fontWeight: 700, color: parseFloat(yieldPct) > 20 ? 'var(--teal)' : 'var(--gold)' }}>
                                ~{yieldPct}%
                            </div>
                        </div>
                        <div style={{ height: 16, background: 'rgba(0,0,0,0.2)', borderRadius: 8, overflow: 'hidden' }}>
                            <div style={{
                                height: '100%', borderRadius: 8,
                                width: `${yieldPct}%`,
                                background: parseFloat(yieldPct) > 20 ? 'var(--teal)' : parseFloat(yieldPct) > 10 ? 'var(--gold)' : 'var(--coral)',
                                transition: 'width 0.3s',
                            }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--text3)' }}>
                            <span>↑ T → rate ↑ but yield ↓ (Le Chatelier)</span>
                            <span>↑ P → yield ↑ (fewer moles)</span>
                        </div>
                    </div>

                    {/* Optimal conditions panel */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 14 }}>
                        {[
                            { label: 'Temperature', val: '450°C', note: 'Compromise', col: 'var(--coral)' },
                            { label: 'Pressure', val: '200 atm', note: 'High pressure', col: 'var(--teal)' },
                            { label: 'Catalyst', val: 'Fe', note: '+ K₂O, Al₂O₃', col: '#888780' },
                            { label: 'Yield/pass', val: '~15%', note: 'Recycled', col: 'var(--gold)' },
                        ].map(p => (
                            <div key={p.label} style={{ padding: '10px', background: `${p.col}10`, border: `1px solid ${p.col}30`, borderRadius: 8, textAlign: 'center' }}>
                                <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--text3)', marginBottom: 3 }}>{p.label}</div>
                                <div style={{ fontSize: 14, fontFamily: 'var(--mono)', fontWeight: 700, color: p.col }}>{p.val}</div>
                                <div style={{ fontSize: 9, fontFamily: 'var(--mono)', color: 'var(--text3)', marginTop: 2 }}>{p.note}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ padding: '10px 14px', background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.2)', borderRadius: 8, fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--text2)', lineHeight: 1.7 }}>
                        Ammonia is the starting material for fertilisers (urea, ammonium sulphate), nitric acid, explosives, and many industrial chemicals. The Haber process feeds ~40% of the world's population.
                    </div>
                </div>
            )}

            {/* ── OSTWALD PROCESS ── */}
            {mode === 'ostwald' && (
                <div>
                    <div style={{ padding: '10px 14px', background: 'rgba(216,90,48,0.08)', border: '1px solid rgba(216,90,48,0.25)', borderRadius: 8, marginBottom: 14, fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--text2)', lineHeight: 1.7 }}>
                        <strong style={{ color: 'var(--coral)' }}>Ostwald process</strong> converts NH₃ → HNO₃ in 3 steps. Starting material is ammonia (from Haber process).
                    </div>

                    <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                        {OSTWALD_STEPS.map((s, i) => (
                            <button key={i} onClick={() => setSelStep(i)} style={{
                                flex: 1, padding: '8px', borderRadius: 8, fontSize: 12,
                                fontFamily: 'var(--mono)', cursor: 'pointer', fontWeight: 700,
                                background: selStep === i ? s.col : 'var(--bg3)',
                                color: selStep === i ? '#fff' : 'var(--text2)',
                                border: `1px solid ${selStep === i ? s.col : 'var(--border)'}`,
                            }}>Step {s.n}</button>
                        ))}
                    </div>

                    {/* All steps — highlight selected */}
                    {OSTWALD_STEPS.map((s, i) => (
                        <div key={i} style={{
                            padding: '12px 16px', marginBottom: 8,
                            background: selStep === i ? `${s.col}15` : 'var(--bg3)',
                            border: `1px solid ${selStep === i ? s.col + '50' : 'var(--border)'}`,
                            borderRadius: 10, transition: 'all 0.2s', cursor: 'pointer',
                        }} onClick={() => setSelStep(i)}>
                            <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: s.col, letterSpacing: 1.5, marginBottom: 5 }}>
                                STEP {s.n}
                            </div>
                            <div style={{ fontSize: 13, fontFamily: 'var(--mono)', fontWeight: 700, color: selStep === i ? s.col : 'var(--text2)', marginBottom: 5 }}>
                                {s.eq}
                            </div>
                            {selStep === i && (
                                <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--text3)', lineHeight: 1.6 }}>
                                    {s.note}
                                </div>
                            )}
                        </div>
                    ))}

                    <div style={{ padding: '12px 16px', background: 'rgba(212,160,23,0.1)', border: '2px solid rgba(212,160,23,0.4)', borderRadius: 10, fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 700, color: 'var(--gold2)', textAlign: 'center', marginTop: 14 }}>
                        Net: NH₃ → HNO₃  (industrial nitric acid)
                    </div>

                    <div style={{ marginTop: 10, padding: '10px 14px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--text2)', lineHeight: 1.7 }}>
                        HNO₃ is used in: fertiliser production (ammonium nitrate), explosives (TNT, RDX), dyes, pharmaceuticals, and rocket propellant.
                    </div>
                </div>
            )}

            {/* ── PHOSPHORUS ALLOTROPES ── */}
            {mode === 'phosphorus' && (
                <div>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                        {P_ALLOTROPES.map((a, i) => (
                            <button key={a.name} onClick={() => setSelAllot(i)} style={{
                                flex: 1, padding: '6px', borderRadius: 6, fontSize: 11,
                                fontFamily: 'var(--mono)', cursor: 'pointer',
                                background: selAllot === i ? a.color : 'var(--bg3)',
                                color: selAllot === i ? '#000' : 'var(--text2)',
                                border: `1px solid ${selAllot === i ? a.color : 'var(--border)'}`,
                            }}>{a.name}</button>
                        ))}
                    </div>

                    <div style={{ padding: '14px 16px', background: `${pa.color}12`, border: `1px solid ${pa.color}35`, borderRadius: 10, marginBottom: 14 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <div style={{ fontSize: 15, fontFamily: 'var(--mono)', fontWeight: 700, color: pa.color, marginBottom: 3 }}>{pa.name}</div>
                                <div style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--text3)', marginBottom: 6 }}>{pa.formula}  ·  MP {pa.mp}°C</div>
                                <div style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--text2)', lineHeight: 1.6 }}>{pa.structure}</div>
                            </div>
                            {pa.toxic && (
                                <div style={{ padding: '4px 10px', background: 'rgba(216,90,48,0.15)', border: '1px solid rgba(216,90,48,0.4)', borderRadius: 20, fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--coral)', flexShrink: 0, marginLeft: 10 }}>
                                    ⚠ TOXIC
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={{ padding: '10px 14px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, marginBottom: 14, fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--text2)', lineHeight: 1.7 }}>
                        {pa.desc}
                    </div>

                    {/* Comparison table */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
                        {[{ label: 'Conductivity', fn: a => a.conduct ? 'Yes' : 'No' }, { label: 'Toxicity', fn: a => a.toxic ? 'Highly toxic' : 'Safe' }, { label: 'Melting pt', fn: a => `${a.mp}°C` }].map(row => (
                            <div key={row.label} style={{ padding: '8px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8 }}>
                                <div style={{ fontSize: 9, fontFamily: 'var(--mono)', color: 'var(--text3)', marginBottom: 6, letterSpacing: 1 }}>{row.label.toUpperCase()}</div>
                                {P_ALLOTROPES.map((a, i) => (
                                    <div key={a.name} style={{ fontSize: 11, fontFamily: 'var(--mono)', color: selAllot === i ? a.color : 'var(--text3)', marginBottom: 3 }}>
                                        {a.name.split(' ')[0]}: {row.fn(a)}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── TRENDS ── */}
            {mode === 'trends' && (
                <div>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                        {Object.entries(TREND_DATA).map(([k, v]) => (
                            <button key={k} onClick={() => setTrendProp(k)} style={{
                                flex: 1, padding: '5px', borderRadius: 6, fontSize: 11,
                                fontFamily: 'var(--mono)', cursor: 'pointer',
                                background: trendProp === k ? 'var(--blue,#378ADD)' : 'var(--bg3)',
                                color: trendProp === k ? '#fff' : 'var(--text2)',
                                border: `1px solid ${trendProp === k ? '#378ADD' : 'var(--border)'}`,
                            }}>{v.label}</button>
                        ))}
                    </div>

                    {GROUP15.map((e, i) => {
                        const v = td.vals[i]
                        const cols = ['#378ADD', '#EF9F27', '#7F77DD', '#7F77DD', '#888780']
                        return (
                            <div key={e.sym} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, cursor: 'pointer' }}
                                onClick={() => setSelEl(e.sym)}>
                                <div style={{ width: 28, height: 28, borderRadius: 6, background: `${cols[i]}20`, border: `1.5px solid ${cols[i]}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontFamily: 'var(--mono)', fontWeight: 700, color: cols[i], flexShrink: 0 }}>
                                    {e.sym}
                                </div>
                                <div style={{ flex: 1, height: 20, background: 'var(--bg3)', borderRadius: 4, overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${(v / td.max) * 100}%`, background: e.sym === selEl ? cols[i] : `${cols[i]}60`, borderRadius: 4, display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
                                        <span style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'rgba(0,0,0,0.7)', fontWeight: 700 }}>{v}</span>
                                    </div>
                                </div>
                                <span style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--text3)', minWidth: 60 }}>{e.type}</span>
                            </div>
                        )
                    })}

                    {el && (
                        <div style={{ marginTop: 14, padding: '12px 14px', background: `${el.color}12`, border: `1px solid ${el.color}30`, borderRadius: 10 }}>
                            <div style={{ fontSize: 14, fontFamily: 'var(--mono)', fontWeight: 700, color: el.color }}>{el.name} ({el.sym})</div>
                            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 6 }}>
                                {[['Z', el.Z], ['AR', `${el.AR} pm`], ['IE₁', `${el.IE1} kJ/mol`], ['EN', el.EN], ['MP', `${el.mp}°C`]].map(([k, v]) => (
                                    <span key={k} style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--text2)' }}>
                                        <span style={{ color: 'var(--text3)' }}>{k}: </span><span style={{ color: el.color, fontWeight: 700 }}>{v}</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
                <ValueCard label="N₂ stability" value="Bond energy 945 kJ/mol" color="#378ADD" highlight />
                <ValueCard label="Haber yield" value={`~${yieldPct}% at ${temp}°C, ${pressure}atm`} color="var(--teal)" />
                <ValueCard label="P allotropes" value="White > Red > Black (reactivity)" color="var(--coral)" />
            </div>
        </div>
    )
}