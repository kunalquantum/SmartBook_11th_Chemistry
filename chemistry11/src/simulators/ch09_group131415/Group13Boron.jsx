import { useState } from 'react'
import { GROUP13 } from './helpers/groupData'
import ValueCard from '../../components/ui/ValueCard'

const COMPOUNDS = {
    'Borax': {
        formula: 'Na₂B₄O₇·10H₂O',
        color: '#7F77DD',
        structure: 'Contains [B₄O₅(OH)₄]²⁻ unit — 2 tetrahedral + 2 trigonal B',
        reactions: [
            { eq: 'Na₂B₄O₇ + H₂SO₄ + 5H₂O → 2NaHSO₄ + 4H₃BO₃', note: 'Acidified → boric acid' },
            { eq: 'Na₂B₄O₇·10H₂O →(heat) Na₂B₄O₇ + 10H₂O', note: 'Loses water on heating → glassy bead' },
            { eq: 'Na₂B₄O₇ + CoO → Co(BO₂)₂ + 2NaBO₂', note: 'Borax bead test — characteristic colour' },
        ],
        uses: ['Borax bead test (qualitative analysis)', 'Laundry detergent booster', 'Antiseptic', 'Glass/ceramics'],
        key: 'Borax bead test: different metal oxides give characteristic colours in molten borax bead.',
    },
    'Boric acid': {
        formula: 'H₃BO₃',
        color: '#1D9E75',
        structure: 'Planar B(OH)₃ units linked by H-bonds — layered structure',
        reactions: [
            { eq: 'H₃BO₃ + H₂O ⇌ [B(OH)₄]⁻ + H⁺', note: 'Lewis acid — accepts OH⁻ (not H⁺ donor!)' },
            { eq: '4H₃BO₃ →(heat) H₂B₄O₇ + 5H₂O', note: 'Dehydrates to tetraboric acid → borax on further heating' },
            { eq: 'H₃BO₃ + 3CH₃OH → B(OCH₃)₃ + 3H₂O', note: 'Trimethyl borate — burns green (flame test)' },
        ],
        uses: ['Mild antiseptic', 'Eye wash', 'Fireproofing wood', 'Manufacture of borosilicate glass'],
        key: 'Boric acid is a weak LEWIS acid — it accepts OH⁻ from water to form [B(OH)₄]⁻, not by donating H⁺.',
    },
    'Aluminium': {
        formula: 'Al',
        color: '#888780',
        structure: 'FCC metal — protected by thin Al₂O₃ layer (passivation)',
        reactions: [
            { eq: '4Al + 3O₂ → 2Al₂O₃', note: 'Oxide layer → passivation in air' },
            { eq: '2Al + 6HCl → 2AlCl₃ + 3H₂', note: 'Reacts with dilute acid' },
            { eq: '2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂', note: 'Reacts with base — amphoteric metal' },
            { eq: '2Al + Fe₂O₃ → Al₂O₃ + 2Fe (thermite)', note: 'Highly exothermic — welding rails' },
        ],
        uses: ['Aerospace (lightweight)', 'Food packaging (foil)', 'Electrical wires', 'Thermite welding'],
        key: 'Al is amphoteric — reacts with both acids and bases. The thermite reaction releases enormous heat.',
    },
    'Alums': {
        formula: 'MAl(SO₄)₂·12H₂O',
        color: '#D85A30',
        structure: 'M⁺[Al(H₂O)₆]³⁺ (SO₄²⁻)₂ — double salt with octahedral Al',
        reactions: [
            { eq: 'Al₂(SO₄)₃ + K₂SO₄ + 24H₂O → 2KAl(SO₄)₂·12H₂O', note: 'Potash alum formation' },
            { eq: 'KAl(SO₄)₂·12H₂O →(heat) K₂SO₄ + Al₂O₃ + SO₃ + H₂O', note: 'Thermal decomposition' },
        ],
        uses: ['Water purification (coagulation)', 'Mordant in dyeing', 'Baking powder', 'Styptic pencil'],
        key: 'In water purification, Al³⁺ hydrolyses to form Al(OH)₃ colloid that coagulates suspended particles.',
    },
}

const BORAX_BEAD_COLORS = [
    { metal: 'Co', hot: 'Blue', cold: 'Blue', hotCol: '#378ADD', coldCol: '#378ADD' },
    { metal: 'Cr', hot: 'Green', cold: 'Green', hotCol: '#1D9E75', coldCol: '#1D9E75' },
    { metal: 'Cu', hot: 'Green', cold: 'Blue', hotCol: '#1D9E75', coldCol: '#378ADD' },
    { metal: 'Fe', hot: 'Yellow', cold: 'Yellow', hotCol: '#EF9F27', coldCol: '#EF9F27' },
    { metal: 'Mn', hot: 'Violet', cold: 'Violet', hotCol: '#7F77DD', coldCol: '#7F77DD' },
    { metal: 'Ni', hot: 'Brown', cold: 'Grey', hotCol: '#D85A30', coldCol: '#888780' },
]

export default function Group13Boron() {
    const [compound, setCompound] = useState('Boric acid')
    const [mode, setMode] = useState('compound')   // compound | trends | boraxbead
    const [selEl, setSelEl] = useState('B')
    const [trendProp, setTrendProp] = useState('AR')

    const cp = COMPOUNDS[compound]
    const el = GROUP13.find(e => e.sym === selEl)

    const TREND_DATA = {
        AR: { label: 'Atomic radius (pm)', vals: GROUP13.map(e => e.AR), max: 170 },
        IE1: { label: 'IE₁ (kJ/mol)', vals: GROUP13.map(e => e.IE1), max: 800 },
        EN: { label: 'Electronegativity', vals: GROUP13.map(e => e.EN), max: 2.04 },
        mp: { label: 'Melting point (°C)', vals: GROUP13.map(e => e.mp), max: 2076 },
    }
    const td = TREND_DATA[trendProp]

    return (
        <div>
            {/* Mode tabs */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                {[{ k: 'compound', l: 'Compounds' }, { k: 'trends', l: 'Group 13 trends' }, { k: 'boraxbead', l: 'Borax bead test' }].map(opt => (
                    <button key={opt.k} onClick={() => setMode(opt.k)} style={{
                        flex: 1, padding: '6px', borderRadius: 6, fontSize: 12,
                        fontFamily: 'var(--mono)', cursor: 'pointer',
                        background: mode === opt.k ? 'var(--purple)' : 'var(--bg3)',
                        color: mode === opt.k ? '#fff' : 'var(--text2)',
                        border: `1px solid ${mode === opt.k ? 'var(--purple)' : 'var(--border2)'}`,
                    }}>{opt.l}</button>
                ))}
            </div>

            {/* ── COMPOUNDS ── */}
            {mode === 'compound' && (
                <div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                        {Object.keys(COMPOUNDS).map(k => (
                            <button key={k} onClick={() => setCompound(k)} style={{
                                padding: '4px 10px', borderRadius: 20, fontSize: 11,
                                fontFamily: 'var(--mono)', cursor: 'pointer',
                                background: compound === k ? COMPOUNDS[k].color : 'var(--bg3)',
                                color: compound === k ? '#000' : 'var(--text2)',
                                border: `1px solid ${compound === k ? COMPOUNDS[k].color : 'var(--border)'}`,
                            }}>{k}</button>
                        ))}
                    </div>

                    {/* Header */}
                    <div style={{ padding: '12px 16px', background: `${cp.color}12`, border: `1px solid ${cp.color}35`, borderRadius: 10, marginBottom: 14 }}>
                        <div style={{ fontSize: 15, fontFamily: 'var(--mono)', fontWeight: 700, color: cp.color, marginBottom: 3 }}>
                            {compound} — {cp.formula}
                        </div>
                        <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--text3)' }}>
                            {cp.structure}
                        </div>
                    </div>

                    {/* Key fact */}
                    <div style={{ padding: '10px 14px', background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.2)', borderRadius: 8, marginBottom: 14, fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--gold)', lineHeight: 1.6 }}>
                        ★ {cp.key}
                    </div>

                    {/* Reactions */}
                    <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--text3)', marginBottom: 8, letterSpacing: 1 }}>KEY REACTIONS</div>
                        {cp.reactions.map((r, i) => (
                            <div key={i} style={{ padding: '10px 14px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, marginBottom: 6 }}>
                                <div style={{ fontSize: 12, fontFamily: 'var(--mono)', fontWeight: 700, color: cp.color, marginBottom: 3 }}>{r.eq}</div>
                                <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--text3)' }}>{r.note}</div>
                            </div>
                        ))}
                    </div>

                    {/* Uses */}
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {cp.uses.map((u, i) => (
                            <div key={i} style={{ padding: '4px 12px', background: `${cp.color}12`, border: `1px solid ${cp.color}30`, borderRadius: 20, fontSize: 11, fontFamily: 'var(--mono)', color: cp.color }}>
                                {u}
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

                    {GROUP13.map((e, i) => {
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
                                <span style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--text3)', minWidth: 50 }}>{e.type}</span>
                            </div>
                        )
                    })}

                    {el && (
                        <div style={{ marginTop: 14, padding: '12px 14px', background: `${el.color}12`, border: `1px solid ${el.color}30`, borderRadius: 10 }}>
                            <div style={{ fontSize: 14, fontFamily: 'var(--mono)', fontWeight: 700, color: el.color, marginBottom: 4 }}>{el.name} ({el.sym})</div>
                            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                                {[['Z', el.Z], ['AR', `${el.AR} pm`], ['IE₁', `${el.IE1} kJ/mol`], ['EN', el.EN], ['MP', `${el.mp}°C`], ['Type', el.type]].map(([k, v]) => (
                                    <div key={k} style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--text2)' }}>
                                        <span style={{ color: 'var(--text3)' }}>{k}: </span><span style={{ color: el.color, fontWeight: 700 }}>{v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ── BORAX BEAD TEST ── */}
            {mode === 'boraxbead' && (
                <div>
                    <div style={{ padding: '10px 14px', background: 'rgba(127,119,221,0.08)', border: '1px solid rgba(127,119,221,0.25)', borderRadius: 8, marginBottom: 14, fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--text2)', lineHeight: 1.7 }}>
                        <strong style={{ color: 'var(--purple)' }}>Borax bead test:</strong> A platinum wire is dipped in borax, heated to form a clear bead (B₂O₃ glass), then dipped in metal oxide and reheated. The bead takes a characteristic colour that identifies the metal ion.
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        {BORAX_BEAD_COLORS.map(b => (
                            <div key={b.metal} style={{ padding: '12px 14px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 10 }}>
                                <div style={{ fontSize: 15, fontFamily: 'var(--mono)', fontWeight: 700, color: 'var(--text1)', marginBottom: 10 }}>
                                    {b.metal} oxide
                                </div>
                                <div style={{ display: 'flex', gap: 10 }}>
                                    <div style={{ flex: 1, textAlign: 'center' }}>
                                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: b.hotCol, margin: '0 auto 4px', opacity: 0.8, border: `2px solid ${b.hotCol}` }} />
                                        <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--text3)' }}>Hot</div>
                                        <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: b.hotCol, fontWeight: 700 }}>{b.hot}</div>
                                    </div>
                                    <div style={{ flex: 1, textAlign: 'center' }}>
                                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: b.coldCol, margin: '0 auto 4px', opacity: 0.8, border: `2px solid ${b.coldCol}` }} />
                                        <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--text3)' }}>Cold</div>
                                        <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: b.coldCol, fontWeight: 700 }}>{b.cold}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
                <ValueCard label="Focus" value={mode === 'compound' ? compound : mode === 'trends' ? el?.name || 'Group 13' : 'Borax bead test'} color="var(--purple)" highlight />
                <ValueCard label="Group 13 anomaly" value="B is metalloid, others metallic" color="var(--gold)" />
                <ValueCard label="Inert pair effect" value="Tl prefers +1 over +3" color="var(--coral)" />
            </div>
        </div>
    )
}