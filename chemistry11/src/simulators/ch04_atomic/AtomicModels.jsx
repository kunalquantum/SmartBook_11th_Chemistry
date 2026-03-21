import { useState, useEffect, useRef } from 'react'
import ValueCard from '../../components/ui/ValueCard'

const MODELS = [
    {
        id: 'thomson',
        name: "Thomson's Model",
        year: '1897',
        color: '#EF9F27',
        tagline: 'Plum pudding model',
        experiment: 'Cathode ray tube — discovered electrons',
        description: "J.J. Thomson proposed the atom as a sphere of uniform positive charge with electrons embedded like plums in a pudding. The atom is electrically neutral overall.",
        limitation: "Could not explain Rutherford's gold foil experiment results.",
        keyFact: "First model to include sub-atomic particles (electrons)",
    },
    {
        id: 'rutherford',
        name: "Rutherford's Model",
        year: '1911',
        color: '#D85A30',
        tagline: 'Nuclear model',
        experiment: 'Gold foil experiment — α particles',
        description: "Most α particles passed through gold foil undeflected. A few deflected at large angles. Rutherford concluded: atom has a tiny, dense, positively charged nucleus with electrons orbiting far away.",
        limitation: "Could not explain atomic spectra or why orbiting electrons don't lose energy and spiral into nucleus.",
        keyFact: "Nucleus is 10⁻¹⁵ m; atom is 10⁻¹⁰ m — nucleus is 100,000× smaller",
    },
    {
        id: 'bohr',
        name: "Bohr's Model",
        year: '1913',
        color: '#1D9E75',
        tagline: 'Quantised orbits',
        experiment: 'Hydrogen spectrum — discrete spectral lines',
        description: "Electrons orbit in fixed, quantised energy levels. They do not radiate energy while in an orbit. Energy is emitted or absorbed only when electrons jump between levels. Explains hydrogen spectrum perfectly.",
        limitation: "Works only for hydrogen. Fails for multi-electron atoms. Ignores wave nature of electron.",
        keyFact: "Eₙ = −13.6/n² eV · rₙ = n² × 0.529 Å",
    },
]

// --- Particle for gold foil ---
function useParticles(active) {
    const [particles, setParticles] = useState([])
    const rafRef = useRef(null), lastRef = useRef(null), tRef = useRef(0)

    useEffect(() => {
        if (!active) { setParticles([]); return }
        // spawn 12 alpha particles with different impact params
        const initial = Array.from({ length: 12 }, (_, i) => ({
            id: i,
            x: 0,
            y: 80 + (i - 5.5) * 18,
            vy: 0,
            speed: 1.4 + Math.random() * 0.4,
            impact: Math.abs(i - 5.5),  // 0 = head-on, 5.5 = glancing
            deflected: false,
            done: false,
        }))
        setParticles(initial)

        const step = ts => {
            if (!lastRef.current) lastRef.current = ts
            tRef.current += (ts - lastRef.current) / 1000
            lastRef.current = ts

            setParticles(prev => prev.map(p => {
                if (p.done) return p
                let { x, y, vy, speed, impact } = p
                x += speed
                // Deflect near nucleus (x≈180, y≈110)
                if (x > 150 && x < 200 && !p.deflected) {
                    const dy = y - 110
                    if (Math.abs(dy) < 30) {
                        // Strong deflection for head-on, slight for glancing
                        const deflectStrength = Math.max(0, (30 - Math.abs(dy)) / 30)
                        vy += deflectStrength * (dy < 0 ? -3 : 3) * (5 - impact * 0.5)
                        return { ...p, x, y, vy, deflected: true }
                    }
                }
                y += vy * 0.3
                vy *= 0.96
                if (x > 340) return { ...p, x, y, vy, done: true }
                return { ...p, x, y, vy }
            }))
            rafRef.current = requestAnimationFrame(step)
        }
        rafRef.current = requestAnimationFrame(step)
        return () => { cancelAnimationFrame(rafRef.current); lastRef.current = null }
    }, [active])

    return particles
}

export default function AtomicModels() {
    const [model, setModel] = useState('thomson')
    const [animating, setAnimating] = useState(false)
    const [bohrN, setBohrN] = useState(3)   // electron shell in Bohr
    const [tick, setTick] = useState(0)
    const rafBohr = useRef(null)
    const tBohr = useRef(0)
    const lastBohr = useRef(null)

    const particles = useParticles(model === 'rutherford' && animating)

    // Bohr orbital animation
    useEffect(() => {
        if (model !== 'bohr') return
        const step = ts => {
            if (!lastBohr.current) lastBohr.current = ts
            tBohr.current += (ts - lastBohr.current) / 1000
            lastBohr.current = ts
            setTick(p => p + 1)
            rafBohr.current = requestAnimationFrame(step)
        }
        rafBohr.current = requestAnimationFrame(step)
        return () => { cancelAnimationFrame(rafBohr.current); lastBohr.current = null }
    }, [model])

    const cur = MODELS.find(m => m.id === model)
    const t = tBohr.current

    // Bohr energy levels
    const bohrLevels = [1, 2, 3, 4, 5]
    const BOHR_CX = 200, BOHR_CY = 120
    const BOHR_R = (n) => 20 + n * 22

    // Thomson electron positions
    const thomsonElectrons = Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * 2 * Math.PI + t * 0.3
        const r = 40 + (i % 3) * 18
        return { x: 130 + r * Math.cos(angle), y: 120 + r * Math.sin(angle) }
    })

    return (
        <div>
            {/* Timeline selector */}
            <div style={{ position: 'relative', marginBottom: 24 }}>
                {/* Timeline line */}
                <div style={{
                    position: 'absolute', top: 20, left: 40, right: 40,
                    height: 2, background: 'var(--border2)',
                }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                    {MODELS.map(m => (
                        <button key={m.id} onClick={() => { setModel(m.id); setAnimating(false) }}
                            style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center',
                                gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: '0 8px',
                            }}>
                            {/* Circle on timeline */}
                            <div style={{
                                width: 40, height: 40, borderRadius: '50%',
                                background: model === m.id ? m.color : 'var(--bg3)',
                                border: `2px solid ${m.color}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 10, fontFamily: 'var(--mono)', fontWeight: 700,
                                color: model === m.id ? '#000' : m.color,
                                transition: 'all 0.2s',
                            }}>
                                {m.year.slice(2)}
                            </div>
                            <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: model === m.id ? m.color : 'var(--text3)', fontWeight: model === m.id ? 700 : 400 }}>
                                {m.year}
                            </div>
                            <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'var(--mono)', textAlign: 'center', maxWidth: 90 }}>
                                {m.name.split("'s")[0]}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Model title */}
            <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: cur.color, letterSpacing: 2, marginBottom: 4 }}>
                    {cur.year} · {cur.tagline.toUpperCase()}
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text1)', marginBottom: 6 }}>{cur.name}</div>
                <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>{cur.description}</div>
            </div>

            {/* Main visual */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 14 }}>

                {/* Atom diagram */}
                <div style={{ background: 'rgba(0,0,0,0.2)', border: `1px solid ${cur.color}30`, borderRadius: 12, padding: 12 }}>
                    <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: cur.color, letterSpacing: 2, marginBottom: 8 }}>
                        ⚗ {model === 'rutherford' ? 'GOLD FOIL EXPERIMENT' : 'ATOM MODEL'}
                    </div>

                    <svg viewBox="0 0 280 240" width="100%">

                        {/* ── THOMSON ── */}
                        {model === 'thomson' && (
                            <g>
                                {/* Positive sphere */}
                                <circle cx={130} cy={120} r={70}
                                    fill={`${cur.color}12`}
                                    stroke={cur.color} strokeWidth={1.5} strokeDasharray="6 3" />
                                <text x={130} y={50} textAnchor="middle"
                                    style={{ fontSize: 10, fill: `${cur.color}80`, fontFamily: 'var(--mono)' }}>
                                    uniform positive charge
                                </text>
                                {/* Electrons */}
                                {thomsonElectrons.map((e, i) => (
                                    <g key={i}>
                                        <circle cx={e.x} cy={e.y} r={6}
                                            fill="rgba(55,138,221,0.6)"
                                            stroke="#378ADD" strokeWidth={1.5} />
                                        <text x={e.x} y={e.y + 4} textAnchor="middle"
                                            style={{ fontSize: 7, fill: '#fff', fontFamily: 'var(--mono)' }}>e⁻</text>
                                    </g>
                                ))}
                                <text x={130} y={212} textAnchor="middle"
                                    style={{ fontSize: 9, fill: 'rgba(160,176,200,0.4)', fontFamily: 'var(--mono)' }}>
                                    electrons embedded in positive sphere
                                </text>
                            </g>
                        )}

                        {/* ── RUTHERFORD ── */}
                        {model === 'rutherford' && (
                            <g>
                                {/* Gold foil */}
                                <rect x={168} y={20} width={8} height={200}
                                    fill="rgba(239,159,39,0.2)"
                                    stroke="rgba(239,159,39,0.5)" strokeWidth={1} />
                                <text x={172} y={15} textAnchor="middle"
                                    style={{ fontSize: 8, fill: 'rgba(239,159,39,0.6)', fontFamily: 'var(--mono)' }}>gold</text>

                                {/* Nucleus */}
                                <circle cx={172} cy={110} r={7}
                                    fill="rgba(216,90,48,0.5)"
                                    stroke="var(--coral)" strokeWidth={1.5} />
                                <text x={172} y={128} textAnchor="middle"
                                    style={{ fontSize: 7, fill: 'var(--coral)', fontFamily: 'var(--mono)' }}>nucleus</text>

                                {/* Alpha particles */}
                                {particles.map(p => (
                                    <g key={p.id}>
                                        <circle cx={p.x} cy={p.y} r={4}
                                            fill={`${cur.color}80`}
                                            stroke={cur.color} strokeWidth={1} />
                                    </g>
                                ))}

                                {/* Source */}
                                <rect x={4} y={96} width={24} height={28}
                                    rx={3} fill="rgba(216,90,48,0.2)"
                                    stroke="var(--coral)" strokeWidth={1} />
                                <text x={16} y={115} textAnchor="middle"
                                    style={{ fontSize: 7, fill: 'var(--coral)', fontFamily: 'var(--mono)' }}>α src</text>

                                {/* Screen hint */}
                                <rect x={244} y={20} width={6} height={200}
                                    fill="rgba(29,158,117,0.15)"
                                    stroke="rgba(29,158,117,0.3)" strokeWidth={1} />
                                <text x={250} y={15} textAnchor="middle"
                                    style={{ fontSize: 8, fill: 'rgba(29,158,117,0.5)', fontFamily: 'var(--mono)' }}>screen</text>

                                <text x={140} y={225} textAnchor="middle"
                                    style={{ fontSize: 9, fill: 'rgba(160,176,200,0.4)', fontFamily: 'var(--mono)' }}>
                                    Most pass through — few deflect at large angles
                                </text>
                            </g>
                        )}

                        {/* ── BOHR ── */}
                        {model === 'bohr' && (
                            <g>
                                {/* Nucleus */}
                                <circle cx={BOHR_CX} cy={BOHR_CY} r={10}
                                    fill="rgba(216,90,48,0.4)"
                                    stroke="var(--coral)" strokeWidth={2} />
                                <text x={BOHR_CX} y={BOHR_CY + 4} textAnchor="middle"
                                    style={{ fontSize: 7, fill: 'var(--coral)', fontFamily: 'var(--mono)', fontWeight: 700 }}>p⁺</text>

                                {/* Orbits */}
                                {bohrLevels.map(n => (
                                    <g key={n}>
                                        <circle cx={BOHR_CX} cy={BOHR_CY} r={BOHR_R(n)}
                                            fill="none"
                                            stroke={n === bohrN ? `${cur.color}60` : 'rgba(255,255,255,0.07)'}
                                            strokeWidth={n === bohrN ? 1.5 : 0.8} />
                                        {/* n label */}
                                        <text
                                            x={BOHR_CX + BOHR_R(n) + 4}
                                            y={BOHR_CY + 4}
                                            style={{ fontSize: 8, fill: `rgba(160,176,200,0.3)`, fontFamily: 'var(--mono)' }}>
                                            n={n}
                                        </text>
                                    </g>
                                ))}

                                {/* Electron on selected orbit */}
                                {bohrLevels.map(n => {
                                    const speed = 1.5 / n
                                    const angle = t * speed
                                    const ex = BOHR_CX + BOHR_R(n) * Math.cos(angle)
                                    const ey = BOHR_CY + BOHR_R(n) * Math.sin(angle)
                                    if (n > 3) return null
                                    return (
                                        <g key={n}>
                                            <circle cx={ex} cy={ey} r={n === bohrN ? 7 : 5}
                                                fill={n === bohrN ? 'rgba(55,138,221,0.8)' : 'rgba(55,138,221,0.25)'}
                                                stroke="#378ADD" strokeWidth={n === bohrN ? 1.5 : 0.8} />
                                            {n === bohrN && (
                                                <text x={ex} y={ey + 3} textAnchor="middle"
                                                    style={{ fontSize: 6, fill: '#fff', fontFamily: 'var(--mono)' }}>e⁻</text>
                                            )}
                                        </g>
                                    )
                                })}

                                {/* Energy emission arrow when n changes */}
                                <text x={BOHR_CX} y={225} textAnchor="middle"
                                    style={{ fontSize: 9, fill: 'rgba(160,176,200,0.4)', fontFamily: 'var(--mono)' }}>
                                    Eₙ = −13.6/n² eV  ·  selected n={bohrN}:  {(-13.6 / bohrN ** 2).toFixed(3)} eV
                                </text>
                            </g>
                        )}
                    </svg>

                    {/* Bohr level picker */}
                    {model === 'bohr' && (
                        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 8 }}>
                            {bohrLevels.map(n => (
                                <button key={n} onClick={() => setBohrN(n)} style={{
                                    width: 32, height: 32, borderRadius: 6, fontSize: 11,
                                    fontFamily: 'var(--mono)', cursor: 'pointer',
                                    background: bohrN === n ? cur.color : 'var(--bg3)',
                                    color: bohrN === n ? '#000' : 'var(--text2)',
                                    border: `1px solid ${bohrN === n ? cur.color : 'var(--border)'}`,
                                }}>n={n}</button>
                            ))}
                        </div>
                    )}

                    {/* Rutherford play */}
                    {model === 'rutherford' && (
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 8 }}>
                            <button onClick={() => setAnimating(p => !p)} style={{
                                padding: '6px 18px', borderRadius: 6, fontSize: 11,
                                fontFamily: 'var(--mono)', cursor: 'pointer',
                                background: animating ? 'rgba(216,90,48,0.15)' : 'rgba(239,159,39,0.12)',
                                color: animating ? 'var(--coral)' : 'var(--gold)',
                                border: `1px solid ${animating ? 'rgba(216,90,48,0.3)' : 'rgba(239,159,39,0.3)'}`,
                            }}>{animating ? '⏸ Stop' : '▶ Fire α particles'}</button>
                        </div>
                    )}
                </div>

                {/* Info panel */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {/* Experiment */}
                    <div style={{ padding: '12px 14px', background: `${cur.color}10`, border: `1px solid ${cur.color}30`, borderRadius: 10 }}>
                        <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: cur.color, letterSpacing: 1.5, marginBottom: 6 }}>
                            KEY EXPERIMENT
                        </div>
                        <div style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--text1)', fontWeight: 600 }}>
                            {cur.experiment}
                        </div>
                    </div>

                    {/* Key fact */}
                    <div style={{ padding: '12px 14px', background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.2)', borderRadius: 10 }}>
                        <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--gold)', letterSpacing: 1.5, marginBottom: 6 }}>
                            KEY FACT
                        </div>
                        <div style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--gold)', lineHeight: 1.6 }}>
                            {cur.keyFact}
                        </div>
                    </div>

                    {/* Limitation */}
                    <div style={{ padding: '12px 14px', background: 'rgba(216,90,48,0.08)', border: '1px solid rgba(216,90,48,0.2)', borderRadius: 10 }}>
                        <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--coral)', letterSpacing: 1.5, marginBottom: 6 }}>
                            LIMITATION
                        </div>
                        <div style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--text2)', lineHeight: 1.6 }}>
                            {cur.limitation}
                        </div>
                    </div>

                    {/* Comparison timeline row */}
                    <div style={{ padding: '12px 14px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 10 }}>
                        <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--text3)', letterSpacing: 1.5, marginBottom: 8 }}>
                            MODELS COMPARED
                        </div>
                        {MODELS.map(m => (
                            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: m.color, flexShrink: 0 }} />
                                <span style={{ fontSize: 11, fontFamily: 'var(--mono)', color: model === m.id ? m.color : 'var(--text3)', fontWeight: model === m.id ? 700 : 400 }}>
                                    {m.year} — {m.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <ValueCard label="Scientist" value={cur.name.split("'s")[0]} color={cur.color} highlight />
                <ValueCard label="Year" value={cur.year} color="var(--text2)" />
                <ValueCard label="Model" value={cur.tagline} color={cur.color} />
                {model === 'bohr' && (
                    <ValueCard label={`E at n=${bohrN}`} value={`${(-13.6 / bohrN ** 2).toFixed(3)} eV`} color="var(--teal)" />
                )}
            </div>
        </div>
    )
}