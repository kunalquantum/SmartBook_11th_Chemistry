import { useState } from 'react'
import { GROUP14, CARBON_ALLOTROPES } from './helpers/groupData'
import ValueCard from '../../components/ui/ValueCard'

const SILICATES = [
    { name: 'Orthosilicate', formula: 'SiO₄⁴⁻', unit: 'Isolated tetrahedra', nSi: 1, example: 'Zircon, olivine', color: '#EF9F27' },
    { name: 'Pyrosilicate', formula: 'Si₂O₇⁶⁻', unit: '2 tetrahedra (corner)', nSi: 2, example: 'Thortveitite', color: '#1D9E75' },
    { name: 'Cyclosilicate', formula: '(SiO₃)ₙⁿ⁻', unit: 'Ring structure', nSi: 3, example: 'Beryl (Be₃Al₂Si₆O₁₈)', color: '#7F77DD' },
    { name: 'Chain silicate', formula: '(SiO₃²⁻)ₙ', unit: 'Infinite chain', nSi: '∞', example: 'Pyroxenes', color: '#D85A30' },
    { name: 'Sheet silicate', formula: '(Si₂O₅²⁻)ₙ', unit: '2D sheet', nSi: '∞', example: 'Micas, talc, clay', color: '#378ADD' },
    { name: '3D silicate', formula: '(SiO₂)ₙ', unit: '3D network', nSi: '∞', example: 'Quartz, feldspar', color: '#888780' },
]

const CO_CO2 = [
    {
        formula: 'CO', name: 'Carbon monoxide', ON: '+2', color: '#D85A30',
        prep: 'C + CO₂ → 2CO  (at high temp)',
        properties: ['Colourless, odourless, POISONOUS gas', 'Binds Hb 250× more strongly than O₂ → asphyxiation', 'Strong REDUCING agent', 'Ligand in transition metal carbonyls'],
        reactions: [
            { eq: 'CO + Hb → HbCO (carboxyhaemoglobin)', note: 'TOXIC — blocks O₂ transport' },
            { eq: 'CO + Cl₂ →(hν) COCl₂ (phosgene)', note: 'Highly toxic war gas' },
            { eq: 'CO + 3H₂ → CH₄ + H₂O', note: 'Methanation — Fischer-Tropsch' },
            { eq: 'Fe₂O₃ + 3CO → 2Fe + 3CO₂', note: 'Reducing agent in blast furnace' },
        ],
    },
    {
        formula: 'CO₂', name: 'Carbon dioxide', ON: '+4', color: '#1D9E75',
        prep: 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂  (lab method)',
        properties: ['Colourless gas, heavier than air', 'Non-toxic but asphyxiant in high concentration', 'Acidic oxide — dissolves in water', 'Solid CO₂ = dry ice (−78.5°C)'],
        reactions: [
            { eq: 'CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻', note: 'Weakly acidic solution — carbonic acid' },
            { eq: 'CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O', note: 'Limewater test — turns milky' },
            { eq: 'CO₂ + 2NaOH → Na₂CO₃ + H₂O', note: 'Absorbed by alkali' },
            { eq: 'CO₂ + C → 2CO  (Boudouard, ~1000°C)', note: 'Reduces to CO at high temperature' },
        ],
    },
]

export default function Group14Carbon() {
    const [mode, setMode] = useState('allotropes')
    const [selAllot, setSelAllot] = useState(0)
    const [selOxide, setSelOxide] = useState(0)
    const [selSilicate, setSelSilicate] = useState(0)
    const [selEl, setSelEl] = useState('C')
    const [trendProp, setTrendProp] = useState('AR')

    const TREND_DATA = {
        AR: { label: 'Atomic radius (pm)', vals: GROUP14.map(e => e.AR), max: 175 },
        IE1: { label: 'IE₁ (kJ/mol)', vals: GROUP14.map(e => e.IE1), max: 1086 },
        mp: { label: 'Melting point (°C)', vals: GROUP14.map(e => e.mp), max: 3550 },
    }
    const td = TREND_DATA[trendProp]
    const al = CARBON_ALLOTROPES[selAllot]
    const ox = CO_CO2[selOxide]
    const sil = SILICATES[selSilicate]
    const el = GROUP14.find(e => e.sym === selEl)

    return (
        <div>
            {/* Mode tabs */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                {[{ k: 'allotropes', l: 'Allotropes of C' }, { k: 'oxides', l: 'CO vs CO₂' }, { k: 'silicates', l: 'Silicates' }, { k: 'trends', l: 'Group 14 trends' }].map(opt => (
                    <button key={opt.k} onClick={() => setMode(opt.k)} style={{
                        flex: 1, padding: '5px 6px', borderRadius: 6, fontSize: 11,
                        fontFamily: 'var(--mono)', cursor: 'pointer',
                        background: mode === opt.k ? 'var(--gold)' : 'var(--bg3)',
                        color: mode === opt.k ? '#000' : 'var(--text2)',
                        border: `1px solid ${mode === opt.k ? 'var(--gold)' : 'var(--border2)'}`,
                    }}>{opt.l}</button>
                ))}
            </div>

            {/* ── ALLOTROPES ── */}
            {mode === 'allotropes' && (
                <div>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                        {CARBON_ALLOTROPES.map((a, i) => (
                            <button key={a.name} onClick={() => setSelAllot(i)} style={{
                                flex: 1, padding: '5px 4px', borderRadius: 6, fontSize: 10,
                                fontFamily: 'var(--mono)', cursor: 'pointer',
                                background: selAllot === i ? a.color : 'var(--bg3)',
                                color: selAllot === i ? '#000' : 'var(--text2)',
                                border: `1px solid ${selAllot === i ? a.color : 'var(--border)'}`,
                            }}>{a.name}</button>
                        ))}
                    </div>

                    <div style={{ padding: '14px 16px', background: `${al.color}12`, border: `1px solid ${al.color}35`, borderRadius: 10, marginBottom: 14 }}>
                        <div style={{ fontSize: 16, fontFamily: 'var(--mono)', fontWeight: 700, color: al.color, marginBottom: 4 }}>{al.name}</div>
                        <div style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--text3)', marginBottom: 8 }}>{al.formula}  ·  {al.hybridisation}</div>
                        <div style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--text2)', lineHeight: 1.7 }}>{al.structure}</div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
                        {[
                            { label: 'Hardness', val: al.hardness, col: 'var(--coral)' },
                            { label: 'Conductivity', val: al.conduct, col: 'var(--teal)' },
                            { label: 'Density', val: al.density ? `${al.density} g/cm³` : 'Single layer', col: 'var(--gold)' },
                            { label: 'Key uses', val: al.uses, col: al.color },
                        ].map(p => (
                            <div key={p.label} style={{ padding: '10px 14px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8 }}>
                                <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--text3)', marginBottom: 3 }}>{p.label}</div>
                                <div style={{ fontSize: 12, fontFamily: 'var(--mono)', color: p.col, lineHeight: 1.5 }}>{p.val}</div>
                            </div>
                        ))}
                    </div>

                    {/* Comparison table */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
                        {['Hardness', 'Conductivity'].map(prop => (
                            CARBON_ALLOTROPES.map((a, i) => (
                                <div key={`${prop}${i}`} style={{ display: prop === 'Hardness' && i === 0 ? 'block' : prop === 'Hardness' ? 'block' : i === 0 ? 'block' : 'block' }}>
                                    {/* handled below */}
                                </div>
                            ))
                        ))}
                    </div>
                </div>
            )}

            {/* ── CO vs CO₂ ── */}
            {mode === 'oxides' && (
                <div>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                        {CO_CO2.map((ox, i) => (
                            <button key={ox.formula} onClick={() => setSelOxide(i)} style={{
                                flex: 1, padding: '8px', borderRadius: 8, fontSize: 14,
                                fontFamily: 'var(--mono)', cursor: 'pointer', fontWeight: 700,
                                background: selOxide === i ? ox.color : 'var(--bg3)',
                                color: selOxide === i ? '#fff' : 'var(--text2)',
                                border: `1px solid ${selOxide === i ? ox.color : 'var(--border2)'}`,
                            }}>{ox.formula}</button>
                        ))}
                    </div>

                    <div style={{ padding: '12px 16px', background: `${ox.color}10`, border: `1px solid ${ox.color}30`, borderRadius: 10, marginBottom: 14 }}>
                        <div style={{ fontSize: 15, fontFamily: 'var(--mono)', fontWeight: 700, color: ox.color, marginBottom: 3 }}>{ox.name}</div>
                        <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--text3)', marginBottom: 6 }}>Oxidation state of C: {ox.ON}</div>
                        <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--text3)', lineHeight: 1.5, marginBottom: 6 }}><strong style={{ color: ox.color }}>Preparation:</strong> {ox.prep}</div>
                        {ox.properties.map((p, i) => (
                            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                                <span style={{ color: ox.color, fontSize: 12 }}>•</span>
                                <span style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--text2)' }}>{p}</span>
                            </div>
                        ))}
                    </div>

                    {ox.reactions.map((r, i) => (
                        <div key={i} style={{ padding: '10px 14px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, marginBottom: 6 }}>
                            <div style={{ fontSize: 12, fontFamily: 'var(--mono)', fontWeight: 700, color: ox.color }}>{r.eq}</div>
                            <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--text3)', marginTop: 3 }}>{r.note}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* ── SILICATES ── */}
            {mode === 'silicates' && (
                <div>
                    <div style={{ padding: '10px 14px', background: 'rgba(127,119,221,0.08)', border: '1px solid rgba(127,119,221,0.25)', borderRadius: 8, marginBottom: 14, fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--text2)', lineHeight: 1.7 }}>
                        <strong style={{ color: 'var(--purple)' }}>Silicates</strong> are built from SiO₄⁴⁻ tetrahedra sharing O corners. The degree of sharing determines the structure — from isolated units to 3D frameworks.
                    </div>

                    {/* Silicate selector */}
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                        {SILICATES.map((s, i) => (
                            <button key={s.name} onClick={() => setSelSilicate(i)} style={{
                                padding: '4px 10px', borderRadius: 20, fontSize: 10,
                                fontFamily: 'var(--mono)', cursor: 'pointer',
                                background: selSilicate === i ? s.color : 'var(--bg3)',
                                color: selSilicate === i ? '#000' : 'var(--text2)',
                                border: `1px solid ${selSilicate === i ? s.color : 'var(--border)'}`,
                            }}>{s.name}</button>
                        ))}
                    </div>

                    <div style={{ padding: '14px 16px', background: `${sil.color}12`, border: `1px solid ${sil.color}35`, borderRadius: 10, marginBottom: 14 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                            <div>
                                <div style={{ fontSize: 15, fontFamily: 'var(--mono)', fontWeight: 700, color: sil.color }}>{sil.name}</div>
                                <div style={{ fontSize: 13, fontFamily: 'var(--mono)', color: 'var(--text2)', marginTop: 2 }}>{sil.formula}</div>
                            </div>
                            <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--text3)', textAlign: 'right' }}>
                                Si atoms: {sil.nSi}<br />O shared per Si: {typeof sil.nSi === 'number' ? (sil.nSi === 1 ? 0 : sil.nSi === 2 ? 1 : 2) : '2-4'}
                            </div>
                        </div>
                        <div style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--text2)', marginBottom: 6 }}>{sil.unit}</div>
                        <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: sil.color }}>Examples: {sil.example}</div>
                    </div>

                    {/* Degree of polymerisation visual */}
                    <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--text3)', marginBottom: 8, letterSpacing: 1 }}>
                            DEGREE OF O-CORNER SHARING
                        </div>
                        {SILICATES.map((s, i) => (
                            <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, cursor: 'pointer' }}
                                onClick={() => setSelSilicate(i)}>
                                <span style={{ fontSize: 10, fontFamily: 'var(--mono)', color: s.color, minWidth: 80 }}>{s.name}</span>
                                <div style={{ flex: 1, height: 12, background: 'var(--bg3)', borderRadius: 6, overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${(i + 1) / 6 * 100}%`, background: s.color, borderRadius: 6, transition: 'width 0.3s' }} />
                                </div>
                                <span style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--text3)', minWidth: 60 }}>{s.formula}</span>
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
                                background: trendProp === k ? 'var(--teal)' : 'var(--bg3)',
                                color: trendProp === k ? '#fff' : 'var(--text2)',
                                border: `1px solid ${trendProp === k ? 'var(--teal)' : 'var(--border)'}`,
                            }}>{v.label}</button>
                        ))}
                    </div>

                    {GROUP14.map((e, i) => {
                        const v = td.vals[i]
                        return (
                            <div key={e.sym} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, cursor: 'pointer' }}
                                onClick={() => setSelEl(e.sym)}>
                                <div style={{ width: 28, height: 28, borderRadius: 6, background: `${e.color}20`, border: `1.5px solid ${e.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontFamily: 'var(--mono)', fontWeight: 700, color: e.color, flexShrink: 0 }}>
                                    {e.sym}
                                </div>
                                <div style={{ flex: 1, height: 20, background: 'var(--bg3)', borderRadius: 4, overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${(v / td.max) * 100}%`, background: e.sym === selEl ? e.color : `${e.color}60`, borderRadius: 4, display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
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
                <ValueCard label="Focus" value={mode} color="var(--gold)" highlight />
                <ValueCard label="C allotropes" value="Diamond/Graphite/C₆₀/Graphene" color="var(--teal)" />
                <ValueCard label="Inert pair" value="Sn²⁺, Pb²⁺ stable (not +4)" color="var(--coral)" />
            </div>
        </div>
    )
}