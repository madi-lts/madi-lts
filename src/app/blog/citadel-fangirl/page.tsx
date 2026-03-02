'use client'

import { useEffect } from 'react'

type CitadelData = {
  categories: Record<string, {
    description: string
    paints: Record<string, string>
  }>
}

const CITADEL_DATA: CitadelData = { "categories": { "Base": { "description": "High-pigment paints designed for solid coverage in one or two coats. The starting point for most painting schemes.", "paints": { "#231F20": "Abaddon Black", "#F4A500": "Averland Sunset", "#7A5C2E": "Balthasar Gold", "#7D4C3C": "Bugman's Glow", "#0D2219": "Caliban Green", "#2E4A22": "Castellan Green", "#8BA8A0": "Celestra Grey", "#E8E8E8": "Corax White", "#7A7B4A": "Death Guard Green", "#3D2B1C": "Dryad Bark", "#C0BCB5": "Grey Seer", "#0C3535": "Incubi Darkness", "#6E8878": "Ionrach Skin", "#122156": "Kantor Blue", "#5C100C": "Khorne Red", "#727272": "Leadbelcher", "#1C3B6E": "Macragge Blue", "#3D3F42": "Mechanicus Standard Grey", "#8B1A1A": "Mephiston Red", "#5E2C18": "Mournfang Brown", "#351E4A": "Naggaroth Night", "#988678": "Rakarth Flesh", "#AE7C28": "Retributor Armour", "#341208": "Rhinox Hide", "#52697A": "Russ Grey", "#7C2248": "Screamer Pink", "#604E30": "Steel Legion Drab", "#234822": "Waaagh! Flesh", "#E8D8A8": "Wraithbone", "#7E5E1C": "XV-88", "#9A8848": "Zandri Dust" } }, "Layer": { "description": "Thinner than Base paints, used to build highlights and fine detail over a base coat.", "paints": { "#8C8C8C": "Administratum Grey", "#264878": "Alaitoc Blue", "#1A3882": "Altdorf Guard Blue", "#C89838": "Auric Armour Gold", "#7A5420": "Balor Brown", "#8A7060": "Baneblade Brown", "#C07840": "Bestigor Flesh", "#B06848": "Bloodreaver Flesh", "#C07858": "Cadian Fleshtone", "#3A5898": "Calgar Blue", "#8A4828": "Deathclaw Brown", "#C898C8": "Dechala Lilac", "#F0D840": "Dorn Yellow", "#501818": "Doombull Brown", "#607840": "Elysian Green", "#E850A8": "Emperor's Children", "#404848": "Eshin Grey", "#C02018": "Evil Sunz Scarlet", "#7898B8": "Fenrisian Grey", "#E86020": "Fire Dragon Bright", "#E8D818": "Flash Gitz Yellow", "#E878B0": "Fulgrim Pink", "#A0E098": "Gauss Blaster Green", "#704888": "Genestealer Purple", "#4870B8": "Hoeth Blue", "#604878": "Hormagaunt Purple", "#989898": "Ironbreaker", "#206040": "Kabalite Green", "#A89070": "Karak Stone", "#D8A880": "Kislev Flesh", "#C89040": "Liberator Gold", "#C8C0A8": "Longbeard Grey", "#406030": "Loren Forest", "#4898D8": "Lothern Blue", "#E8A088": "Lugganath Orange", "#50C830": "Moot Green", "#A8A8A0": "Necron Compound", "#A8B858": "Nurgling Green", "#888048": "Ogryn Camo", "#C84888": "Pink Horror", "#5A1878": "Phoenician Purple", "#987840": "Runelord Brass", "#D8C890": "Screaming Skull", "#609848": "Skarsnik Green", "#B89050": "Skullcrusher Brass", "#988898": "Slaanesh Grey", "#D84818": "Squig Orange", "#D0D0D0": "Stormhost Silver", "#4A7830": "Straken Green", "#38A868": "Sybarite Green", "#A08848": "Tallarn Sand", "#C09030": "Tau Light Ochre", "#3878C8": "Teclis Blue", "#1A5880": "Thousand Sons Blue", "#E86018": "Troll Slayer Orange", "#783828": "Tuskgor Fur", "#D0D8D0": "Ulthuan Grey", "#C8A070": "Ungor Flesh", "#C8A878": "Ushabti Bone", "#602878": "Warlord Purple", "#706880": "Warpfiend Grey", "#408840": "Warpstone Glow", "#F8F8F8": "White Scar", "#D83018": "Wild Rider Red", "#481868": "Xereus Purple", "#E8C018": "Yriel Yellow", "#C09848": "Zamesi Desert" } }, "Shade": { "description": "Ink-like washes that flow into recesses to create natural shading and depth.", "paints": { "#3D2010": "Agrax Earthshade", "#3E2111": "Agrax Earthshade Gloss", "#3D4820": "Athonian Camoshade", "#1A4020": "Biel-Tan Green", "#500020": "Carroburg Crimson", "#C07800": "Casandora Yellow", "#103028": "Coelia Greenshade", "#101840": "Drakenhof Nightshade", "#301040": "Druchii Violet", "#A03000": "Fuegan Orange", "#0F0F0F": "Nuln Oil", "#101010": "Nuln Oil Gloss", "#602818": "Reikland Fleshshade", "#612919": "Reikland Fleshshade Gloss", "#5A3800": "Seraphim Sepia" } }, "Dry": { "description": "Crumbly, low-moisture paints designed specifically for drybrushing techniques to quickly add highlights and texture.", "paints": { "#B03020": "Astorath Red", "#D87098": "Changeling Pink", "#786050": "Desolate Brown", "#E0B8A0": "Eldar Flesh", "#A8C0D0": "Etherium Blue", "#E8E060": "Hexos Palesun", "#C0B8A0": "Longbeard Grey", "#C0A8C8": "Lucius Lilac", "#F0F0F0": "Praxeti White", "#C05818": "Ryza Rust", "#B89040": "Sigmarite", "#6888A8": "Stormfang", "#786040": "Sylvaneth Bark", "#C0A880": "Terminatus Stone", "#D8C888": "Tyrant Skull", "#A8A090": "Underhive Ash" } }, "Contrast": { "description": "A single-coat paint that combines base colour, shade, and highlight. Designed for fast painting over a light primer such as Wraithbone or Grey Seer.", "paints": { "#5080B0": "Aethermatic Blue", "#9A7830": "Aggaros Dunes", "#207860": "Akhelian Green", "#D0D8D8": "Apothecary White", "#D8A818": "Bad Moon Yellow", "#1A1A28": "Black Templar", "#A01818": "Blood Angels Red", "#F0EEE8": "Contrast Medium", "#1A4028": "Dark Angels Green", "#A86040": "Darkoath Flesh", "#701010": "Flesh Tearers Red", "#C87848": "Fyreslayer Flesh", "#603818": "Gore-grunta Fur", "#607080": "Gryph-charger Grey", "#C05820": "Gryph-hound Orange", "#C09070": "Guilliman Flesh", "#D89818": "Imperial Fist", "#1A6050": "Kroxigor Scales", "#0A2848": "Leviadon Blue", "#601878": "Luxion Purple", "#C03800": "Magmadroth Flame", "#487840": "Mantis Warriors Green", "#304820": "Militarum Green", "#C89020": "Nazdreg Yellow", "#608878": "Nighthaunt Gloom", "#486030": "Ork Flesh", "#788050": "Plaguebearer Flesh", "#482060": "Shyish Purple", "#B09040": "Skeleton Horde", "#786030": "Snakebite Leather", "#587898": "Space Wolves Grey", "#1A3878": "Talassar Blue", "#207868": "Terradon Turquoise", "#1A3888": "Ultramarines Blue", "#901848": "Volupus Pink", "#309020": "Warp Lightning", "#3A2818": "Wyldwood" } }, "Technical": { "description": "Specialty effect paints including texture paints for basing, atmospheric effects, and unique finishes.", "paints": { "#7A5A38": "Agrellan Badland", "#6A4828": "Agrellan Earth", "#F8F8F8": "Ard Coat", "#A89060": "Armageddon Dust", "#C0A870": "Armageddon Dunes", "#606060": "Astrogranite", "#485050": "Astrogranite Debris", "#7A0000": "Blood for the Blood God", "#F0EEE8": "Contrast Medium", "#1848A0": "Gemstone: Soulstone Blue", "#A01828": "Gemstone: Spiritstone Red", "#109840": "Gemstone: Waystone Green", "#F5F5F0": "Lahmian Medium", "#6A2818": "Martian Ironcrust", "#581808": "Martian Ironearth", "#201808": "Mordant Earth", "#70A898": "Nihilakh Oxide", "#688030": "Nurgle's Rot", "#4A3820": "Stirland Battlemire", "#5A4828": "Stirland Mud", "#00A8A8": "Tesseract Glow", "#302808": "Typhus Corrosion", "#E0E8F0": "Valhallan Blizzard" } }, "Air": { "description": "Pre-thinned paints formulated for use with an airbrush. Covers many of the same colours as the Base and Layer ranges.", "paints": { "#231F20": "Abaddon Black Air", "#F4A500": "Averland Sunset Air", "#7A5C2E": "Balthasar Gold Air", "#0D2219": "Caliban Green Air", "#2E4A22": "Castellan Green Air", "#8BA8A0": "Celestra Grey Air", "#E8E8E8": "Corax White Air", "#7A7B4A": "Death Guard Green Air", "#C02018": "Evil Sunz Scarlet Air", "#C0BCB5": "Grey Seer Air", "#989898": "Ironbreaker Air", "#122156": "Kantor Blue Air", "#5C100C": "Khorne Red Air", "#727272": "Leadbelcher Air", "#1C3B6E": "Macragge Blue Air", "#3D3F42": "Mechanicus Standard Grey Air", "#8B1A1A": "Mephiston Red Air", "#5E2C18": "Mournfang Brown Air", "#351E4A": "Naggaroth Night Air", "#AE7C28": "Retributor Armour Air", "#7C2248": "Screamer Pink Air", "#D0D0D0": "Stormhost Silver Air", "#1A5880": "Thousand Sons Blue Air", "#234822": "Waaagh! Flesh Air", "#E8D8A8": "Wraithbone Air", "#9A8848": "Zandri Dust Air" } } } }

const CITADEL_STYLES = `
.citadel-root * { box-sizing: border-box; }
.citadel-root {
  font-family: system-ui, sans-serif;
  color: #fafaf9;
  width: 540px;
  max-width: 100%;
  margin-top: 2rem;
}
.citadel-root .controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}
.citadel-root .controls label {
  font-size: 12px;
  color: #78716c;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
}
.citadel-root select {
  flex: 1;
  background: #1c1917;
  color: #fafaf9;
  border: 1px solid #44403c;
  border-radius: 6px;
  padding: 7px 10px;
  font-size: 13px;
  cursor: pointer;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2378716c' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  padding-right: 28px;
}
.citadel-root select:focus { border-color: #a8a29e; }
.citadel-root .tabs {
  display: flex;
  gap: 2px;
}
.citadel-root .tab-btn {
  padding: 8px 20px;
  background: #1c1917;
  color: #78716c;
  border: 1px solid #292524;
  border-bottom: none;
  border-radius: 6px 6px 0 0;
  cursor: pointer;
  font-size: 13px;
  font-family: system-ui, sans-serif;
}
.citadel-root .tab-btn:hover { color: #a8a29e; }
.citadel-root .tab-btn.active {
  background: #1c1917;
  color: #fafaf9;
  border-color: #44403c;
}
.citadel-root .picker-box {
  background: #1c1917;
  border: 1px solid #44403c;
  border-radius: 0 8px 8px 8px;
  padding: 16px;
}
.citadel-root .tab-panel { display: none; }
.citadel-root .tab-panel.active { display: block; }
.citadel-root canvas {
  display: block;
  cursor: crosshair;
  touch-action: none;
  border-radius: 4px;
  max-width: 100%;
}
.citadel-root .slider-wrap { margin-top: 12px; }
.citadel-root .color-display {
  margin-top: 14px;
  display: grid;
  grid-template-columns: 80px 1fr 80px;
  align-items: center;
  gap: 12px;
  background: #1c1917;
  border: 1px solid #44403c;
  border-radius: 8px;
  padding: 14px;
}
.citadel-root .swatch-col { text-align: center; }
.citadel-root .swatch {
  width: 64px;
  height: 64px;
  border-radius: 6px;
  border: 2px solid #44403c;
  margin: 0 auto 5px;
}
.citadel-root .swatch-label {
  font-size: 10px;
  color: #57534e;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.citadel-root .swatch-hex {
  font-family: 'Courier New', monospace;
  font-size: 11px;
  color: #78716c;
  margin-top: 3px;
}
.citadel-root .match-col { min-width: 0; }
.citadel-root .match-name {
  font-size: 15px;
  font-weight: 600;
  color: #a8a29e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.citadel-root .match-name:hover { opacity: 0.7; }
.citadel-root .match-category {
  font-size: 10px;
  color: #57534e;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
}
.citadel-root .match-hex {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  color: #78716c;
  margin-top: 6px;
  cursor: pointer;
}
.citadel-root .match-hex:hover { opacity: 0.7; }
.citadel-root #matchHex2 { cursor: pointer; }
.citadel-root #matchHex2:hover { opacity: 0.7; }
.citadel-root .match-delta {
  font-size: 10px;
  color: #44403c;
  margin-top: 3px;
}
.citadel-root .img-upload-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}
.citadel-root .img-upload-btn {
  padding: 7px 14px;
  background: #292524;
  color: #a8a29e;
  border: 1px solid #44403c;
  border-radius: 6px;
  font-size: 13px;
  font-family: system-ui, sans-serif;
  cursor: pointer;
}
.citadel-root .img-upload-btn:hover { color: #fafaf9; }
.citadel-root #imgUpload { display: none; }
.citadel-root .img-hint {
  font-size: 12px;
  color: #57534e;
}
`

export default function CitadelFangirlPage() {
  useEffect(() => {
    const CW = 508, CH = 508
    const CX = CW / 2, CY = CH / 2
    const RING_O = 238, RING_I = 186
    const TRI_R = 168
    const DISC_R = 238

    function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
      r /= 255; g /= 255; b /= 255
      const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min
      const v = max
      const s = max === 0 ? 0 : d / max
      let h = 0
      if (d !== 0) {
        if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60
        else if (max === g) h = ((b - r) / d + 2) * 60
        else h = ((r - g) / d + 4) * 60
      }
      return [h, s, v]
    }

    function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
      h = ((h % 360) + 360) % 360
      const i = Math.floor(h / 60)
      const f = h / 60 - i
      const p = v * (1 - s)
      const q = v * (1 - f * s)
      const t = v * (1 - (1 - f) * s)
      const table: [number, number, number][] = [[v, t, p], [q, v, p], [p, v, t], [p, q, v], [t, p, v], [v, p, q]]
      const [r, g, b] = table[i]
      return [r * 255, g * 255, b * 255]
    }

    function hexToRgb(hex: string): [number, number, number] {
      return [
        parseInt(hex.slice(1, 3), 16),
        parseInt(hex.slice(3, 5), 16),
        parseInt(hex.slice(5, 7), 16),
      ]
    }

    function rgbToHex(r: number, g: number, b: number): string {
      return '#' + [r, g, b]
        .map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0'))
        .join('')
    }

    function linearise(c: number): number {
      c /= 255
      return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    }

    function rgbToLab(r: number, g: number, b: number): [number, number, number] {
      const rl = linearise(r), gl = linearise(g), bl = linearise(b)
      const X = (rl * 0.4124564 + gl * 0.3575761 + bl * 0.1804375) / 0.95047
      const Y = (rl * 0.2126729 + gl * 0.7151522 + bl * 0.0721750) / 1.00000
      const Z = (rl * 0.0193339 + gl * 0.1191920 + bl * 0.9503041) / 1.08883
      const f = (t: number) => t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116
      const fx = f(X), fy = f(Y), fz = f(Z)
      return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)]
    }

    function deltaE(a: [number, number, number], b: [number, number, number]): number {
      return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2)
    }

    interface Paint {
      hex: string
      name: string
      category: string
      lab: [number, number, number]
    }

    const ALL_PAINTS: Paint[] = []
    for (const [cat, catData] of Object.entries(CITADEL_DATA.categories)) {
      for (const [hex, name] of Object.entries(catData.paints)) {
        ALL_PAINTS.push({ hex, name, category: cat, lab: rgbToLab(...hexToRgb(hex)) })
      }
    }

    let filteredPaints = [...ALL_PAINTS]

    const catSelect = document.getElementById('catSelect') as HTMLSelectElement
    // Clear any options added by a previous effect run (React strict mode)
    while (catSelect.options.length > 1) catSelect.remove(1)
    for (const cat of Object.keys(CITADEL_DATA.categories)) {
      const opt = document.createElement('option')
      opt.value = cat
      opt.textContent = cat
      catSelect.appendChild(opt)
    }

    const onCatChange = (e: Event) => {
      const v = (e.target as HTMLSelectElement).value
      filteredPaints = v === 'All' ? ALL_PAINTS : ALL_PAINTS.filter(p => p.category === v)
      updateDisplay()
    }
    catSelect.addEventListener('change', onCatChange)

    function findClosest(hex: string) {
      if (!filteredPaints.length) return null
      const lab = rgbToLab(...hexToRgb(hex))
      let best: Paint | null = null, bestD = Infinity
      for (const p of filteredPaints) {
        const d = deltaE(lab, p.lab)
        if (d < bestD) { bestD = d; best = p }
      }
      return { paint: best!, dE: bestD }
    }

    const state = { h: 0, s: 1, v: 1 }

    function currentHex(): string {
      return rgbToHex(...hsvToRgb(state.h, state.s, state.v))
    }

    function updateDisplay() {
      const hex = currentHex()
      document.getElementById('selSwatch')!.style.background = hex
      document.getElementById('selHex')!.textContent = hex.toUpperCase()
      const result = findClosest(hex)
      if (result) {
        const { paint, dE } = result
        document.getElementById('matchName')!.textContent = paint.name
        document.getElementById('matchCat')!.textContent = paint.category
        document.getElementById('matchHex')!.textContent = paint.hex.toUpperCase()
        document.getElementById('matchDelta')!.textContent = `\u0394E\u00a0=\u00a0${dE.toFixed(1)}`
        document.getElementById('matchSwatch')!.style.background = paint.hex
        document.getElementById('matchHex2')!.textContent = paint.hex.toUpperCase()
      }
    }

    function drawHandle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
      ctx.beginPath()
      ctx.arc(x, y, r, 0, 2 * Math.PI)
      ctx.strokeStyle = 'rgba(255,255,255,0.9)'
      ctx.lineWidth = 2.5
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(x, y, r - 2.5, 0, 2 * Math.PI)
      ctx.strokeStyle = 'rgba(0,0,0,0.7)'
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    function bary(
      px: number, py: number,
      v0: { x: number, y: number },
      v1: { x: number, y: number },
      v2: { x: number, y: number }
    ): [number, number, number] {
      const d = (v1.y - v2.y) * (v0.x - v2.x) + (v2.x - v1.x) * (v0.y - v2.y)
      const a = ((v1.y - v2.y) * (px - v2.x) + (v2.x - v1.x) * (py - v2.y)) / d
      const b = ((v2.y - v0.y) * (px - v2.x) + (v0.x - v2.x) * (py - v2.y)) / d
      return [a, b, 1 - a - b]
    }

    function clampBary(a: number, b: number, c: number): [number, number, number] {
      a = Math.max(0, a); b = Math.max(0, b); c = Math.max(0, c)
      const s = a + b + c || 1
      return [a / s, b / s, c / s]
    }

    function triVerts() {
      const rad = state.h * Math.PI / 180
      return [
        { x: CX + TRI_R * Math.cos(rad), y: CY + TRI_R * Math.sin(rad) },
        { x: CX + TRI_R * Math.cos(rad + 2 * Math.PI / 3), y: CY + TRI_R * Math.sin(rad + 2 * Math.PI / 3) },
        { x: CX + TRI_R * Math.cos(rad + 4 * Math.PI / 3), y: CY + TRI_R * Math.sin(rad + 4 * Math.PI / 3) },
      ]
    }

    function drawWheel() {
      const canvas = document.getElementById('wheelCanvas') as HTMLCanvasElement
      const ctx = canvas.getContext('2d')!
      const img = ctx.createImageData(CW, CH)
      const d = img.data
      const [v0, v1, v2] = triVerts()
      const [hr, hg, hb] = hsvToRgb(state.h, 1, 1)
      const tX0 = Math.max(0, Math.floor(Math.min(v0.x, v1.x, v2.x)))
      const tX1 = Math.min(CW - 1, Math.ceil(Math.max(v0.x, v1.x, v2.x)))
      const tY0 = Math.max(0, Math.floor(Math.min(v0.y, v1.y, v2.y)))
      const tY1 = Math.min(CH - 1, Math.ceil(Math.max(v0.y, v1.y, v2.y)))
      for (let y = 0; y < CH; y++) {
        for (let x = 0; x < CW; x++) {
          const dx = x - CX, dy = y - CY
          const dist = Math.sqrt(dx * dx + dy * dy)
          const i = (y * CW + x) * 4
          if (dist >= RING_I && dist <= RING_O) {
            const hue = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360
            const [r, g, b] = hsvToRgb(hue, 1, 1)
            d[i] = r; d[i + 1] = g; d[i + 2] = b; d[i + 3] = 255
          } else if (x >= tX0 && x <= tX1 && y >= tY0 && y <= tY1) {
            const [a, b, c] = bary(x, y, v0, v1, v2)
            if (a >= -0.001 && b >= -0.001 && c >= -0.001) {
              d[i] = a * hr + b * 255
              d[i + 1] = a * hg + b * 255
              d[i + 2] = a * hb + b * 255
              d[i + 3] = 255
            }
          }
        }
      }
      ctx.putImageData(img, 0, 0)
      const ra = state.h * Math.PI / 180
      const rm = (RING_I + RING_O) / 2
      drawHandle(ctx, CX + rm * Math.cos(ra), CY + rm * Math.sin(ra), 11)
      const ba = state.s * state.v
      const bb = (1 - state.s) * state.v
      const bc = 1 - state.v
      drawHandle(ctx,
        ba * v0.x + bb * v1.x + bc * v2.x,
        ba * v0.y + bb * v1.y + bc * v2.y,
        9)
    }

    function drawDisc() {
      const canvas = document.getElementById('discCanvas') as HTMLCanvasElement
      const ctx = canvas.getContext('2d')!
      const img = ctx.createImageData(CW, CH)
      const d = img.data
      for (let y = 0; y < CH; y++) {
        for (let x = 0; x < CW; x++) {
          const dx = x - CX, dy = y - CY
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist <= DISC_R) {
            const hue = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360
            const sat = dist / DISC_R
            const [r, g, b] = hsvToRgb(hue, sat, state.v)
            const i = (y * CW + x) * 4
            d[i] = r; d[i + 1] = g; d[i + 2] = b; d[i + 3] = 255
          }
        }
      }
      ctx.putImageData(img, 0, 0)
      const ra = state.h * Math.PI / 180
      drawHandle(ctx,
        CX + state.s * DISC_R * Math.cos(ra),
        CY + state.s * DISC_R * Math.sin(ra),
        11)
    }

    function drawSlider() {
      const canvas = document.getElementById('sliderCanvas') as HTMLCanvasElement
      const ctx = canvas.getContext('2d')!
      const SW = canvas.width, SH = canvas.height
      const [hr, hg, hb] = hsvToRgb(state.h, state.s, 1)
      const grad = ctx.createLinearGradient(0, 0, SW, 0)
      grad.addColorStop(0, '#000')
      grad.addColorStop(1, `rgb(${Math.round(hr)},${Math.round(hg)},${Math.round(hb)})`)
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, SW, SH)
      const hx = Math.max(SH / 2, Math.min(SW - SH / 2, state.v * SW))
      ctx.beginPath()
      ctx.arc(hx, SH / 2, SH / 2 - 2, 0, 2 * Math.PI)
      ctx.strokeStyle = 'rgba(255,255,255,0.9)'
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(hx, SH / 2, SH / 2 - 4, 0, 2 * Math.PI)
      ctx.strokeStyle = 'rgba(0,0,0,0.7)'
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    function canvasXY(canvas: HTMLCanvasElement, e: MouseEvent | TouchEvent): [number, number] {
      const r = canvas.getBoundingClientRect()
      const cl = (e as TouchEvent).touches
        ? (e as TouchEvent).touches[0]
        : (e as MouseEvent)
      return [
        (cl.clientX - r.left) * (canvas.width / r.width),
        (cl.clientY - r.top) * (canvas.height / r.height),
      ]
    }

    let wheelDrag: string | null = null

    function wheelDown(e: MouseEvent | TouchEvent) {
      const canvas = document.getElementById('wheelCanvas') as HTMLCanvasElement
      const [x, y] = canvasXY(canvas, e)
      const dx = x - CX, dy = y - CY, dist = Math.sqrt(dx * dx + dy * dy)
      if (dist >= RING_I - 10 && dist <= RING_O + 10) {
        wheelDrag = 'ring'
      } else if (dist < RING_I) {
        wheelDrag = 'tri'
      }
      if (wheelDrag) { wheelApply(x, y); drawWheel(); updateDisplay(); e.preventDefault() }
    }

    function wheelMove(e: MouseEvent | TouchEvent) {
      if (!wheelDrag) return
      const canvas = document.getElementById('wheelCanvas') as HTMLCanvasElement
      const [x, y] = canvasXY(canvas, e)
      wheelApply(x, y)
      drawWheel()
      updateDisplay()
      e.preventDefault()
    }

    function wheelApply(x: number, y: number) {
      const dx = x - CX, dy = y - CY
      if (wheelDrag === 'ring') {
        state.h = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360
      } else {
        const [v0, v1, v2] = triVerts()
        let [a, b, c] = bary(x, y, v0, v1, v2);
        [a, b, c] = clampBary(a, b, c)
        state.v = Math.min(1, a + b)
        state.s = state.v > 1e-6 ? Math.min(1, a / state.v) : 0
      }
    }

    let discDrag: string | null = null
    let imgDrag = false
    let currentImg: HTMLImageElement | null = null
    let imgX = 254, imgY = 254

    function drawImagePicker() {
      const canvas = document.getElementById('imageCanvas') as HTMLCanvasElement
      const ctx = canvas.getContext('2d')!
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (!currentImg) {
        ctx.fillStyle = '#292524'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#57534e'
        ctx.font = '14px system-ui, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('Upload an image to pick colours', canvas.width / 2, canvas.height / 2)
        ctx.textAlign = 'left'
        return
      }
      const scale = Math.min(canvas.width / currentImg.naturalWidth, canvas.height / currentImg.naturalHeight)
      const iw = currentImg.naturalWidth * scale
      const ih = currentImg.naturalHeight * scale
      const ox = (canvas.width - iw) / 2
      const oy = (canvas.height - ih) / 2
      ctx.drawImage(currentImg, ox, oy, iw, ih)
      drawHandle(ctx, imgX, imgY, 11)
    }

    function imagePickerApply(x: number, y: number) {
      const canvas = document.getElementById('imageCanvas') as HTMLCanvasElement
      imgX = Math.max(0, Math.min(canvas.width - 1, x))
      imgY = Math.max(0, Math.min(canvas.height - 1, y))
      const ctx = canvas.getContext('2d')!
      const px = ctx.getImageData(Math.round(imgX), Math.round(imgY), 1, 1).data
      const [h, s, v] = rgbToHsv(px[0], px[1], px[2])
      state.h = h; state.s = s; state.v = v
    }

    function discDown(e: MouseEvent | TouchEvent) {
      discDrag = 'disc'
      const [x, y] = canvasXY(document.getElementById('discCanvas') as HTMLCanvasElement, e)
      discApply(x, y)
      drawDisc(); drawSlider(); updateDisplay()
      e.preventDefault()
    }

    function sliderDown(e: MouseEvent | TouchEvent) {
      discDrag = 'slider'
      const [x] = canvasXY(document.getElementById('sliderCanvas') as HTMLCanvasElement, e)
      sliderApply(x)
      drawDisc(); drawSlider(); updateDisplay()
      e.preventDefault()
    }

    function discMove(e: MouseEvent | TouchEvent) {
      if (!discDrag) return
      if (discDrag === 'disc') {
        const [x, y] = canvasXY(document.getElementById('discCanvas') as HTMLCanvasElement, e)
        discApply(x, y)
      } else {
        const [x] = canvasXY(document.getElementById('sliderCanvas') as HTMLCanvasElement, e)
        sliderApply(x)
      }
      drawDisc(); drawSlider(); updateDisplay()
      e.preventDefault()
    }

    function discApply(x: number, y: number) {
      const dx = x - CX, dy = y - CY
      state.h = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360
      state.s = Math.max(0, Math.min(1, Math.sqrt(dx * dx + dy * dy) / DISC_R))
    }

    function sliderApply(x: number) {
      state.v = Math.max(0, Math.min(1, x / (document.getElementById('sliderCanvas') as HTMLCanvasElement).width))
    }

    function imgDown(e: MouseEvent | TouchEvent) {
      if (!currentImg) return
      imgDrag = true
      const [x, y] = canvasXY(document.getElementById('imageCanvas') as HTMLCanvasElement, e)
      imagePickerApply(x, y)
      drawImagePicker()
      updateDisplay()
      e.preventDefault()
    }

    function imgMove(e: MouseEvent | TouchEvent) {
      if (!imgDrag || !currentImg) return
      const [x, y] = canvasXY(document.getElementById('imageCanvas') as HTMLCanvasElement, e)
      imagePickerApply(x, y)
      drawImagePicker()
      updateDisplay()
      e.preventDefault()
    }

    const wheelCanvas = document.getElementById('wheelCanvas') as HTMLCanvasElement
    const discCanvas = document.getElementById('discCanvas') as HTMLCanvasElement
    const sliderCanvas = document.getElementById('sliderCanvas') as HTMLCanvasElement
    const imageCanvas = document.getElementById('imageCanvas') as HTMLCanvasElement

    wheelCanvas.addEventListener('mousedown', wheelDown as EventListener)
    wheelCanvas.addEventListener('touchstart', wheelDown as EventListener, { passive: false })
    discCanvas.addEventListener('mousedown', discDown as EventListener)
    discCanvas.addEventListener('touchstart', discDown as EventListener, { passive: false })
    sliderCanvas.addEventListener('mousedown', sliderDown as EventListener)
    sliderCanvas.addEventListener('touchstart', sliderDown as EventListener, { passive: false })
    imageCanvas.addEventListener('mousedown', imgDown as EventListener)
    imageCanvas.addEventListener('touchstart', imgDown as EventListener, { passive: false })

    const handleMouseMove = (e: MouseEvent) => { wheelMove(e); discMove(e); imgMove(e) }
    const handleTouchMove = (e: TouchEvent) => { wheelMove(e); discMove(e); imgMove(e) }
    const handleMouseUp = () => { wheelDrag = null; discDrag = null; imgDrag = false }
    const handleTouchEnd = () => { wheelDrag = null; discDrag = null; imgDrag = false }

    window.addEventListener('mousemove', handleMouseMove as EventListener)
    window.addEventListener('touchmove', handleTouchMove as EventListener, { passive: false })
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchend', handleTouchEnd)

    const imgUploadBtn = document.getElementById('imgUploadBtn') as HTMLButtonElement
    const imgUploadInput = document.getElementById('imgUpload') as HTMLInputElement

    const onImgUploadBtnClick = () => imgUploadInput.click()
    const onImgUpload = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (ev) => {
        const img = new Image()
        img.onload = () => {
          currentImg = img
          imgX = 254; imgY = 254
          drawImagePicker()
          imagePickerApply(imgX, imgY)
          updateDisplay()
          document.getElementById('imgHint')!.textContent = file.name
        }
        img.src = ev.target!.result as string
      }
      reader.readAsDataURL(file)
    }

    imgUploadBtn.addEventListener('click', onImgUploadBtnClick)
    imgUploadInput.addEventListener('change', onImgUpload)

    document.querySelectorAll('.citadel-root .tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.citadel-root .tab-btn').forEach(b => b.classList.remove('active'))
        document.querySelectorAll('.citadel-root .tab-panel').forEach(p => p.classList.remove('active'))
        btn.classList.add('active')
        const tab = (btn as HTMLElement).dataset.tab!
        document.getElementById(tab + '-panel')!.classList.add('active')
        if (tab === 'wheel') drawWheel()
        else if (tab === 'disc') { drawDisc(); drawSlider() }
        else drawImagePicker()
      })
    })

    drawWheel()
    drawDisc()
    drawSlider()
    drawImagePicker()
    updateDisplay()

    function copyText(el: HTMLElement) {
      const text = el.textContent?.trim() ?? ''
      if (!text || text === '—') return
      navigator.clipboard.writeText(text).then(() => {
        const orig = el.textContent
        el.textContent = 'Copied!'
        setTimeout(() => {
          if (el.textContent === 'Copied!') el.textContent = orig
        }, 800)
      })
    }

    const matchNameEl = document.getElementById('matchName') as HTMLElement
    const matchHexEl = document.getElementById('matchHex') as HTMLElement
    const matchHex2El = document.getElementById('matchHex2') as HTMLElement

    const onNameClick = () => copyText(matchNameEl)
    const onHexClick = () => copyText(matchHexEl)
    const onHex2Click = () => copyText(matchHex2El)

    matchNameEl.addEventListener('click', onNameClick)
    matchHexEl.addEventListener('click', onHexClick)
    matchHex2El.addEventListener('click', onHex2Click)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove as EventListener)
      window.removeEventListener('touchmove', handleTouchMove as EventListener)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchend', handleTouchEnd)
      wheelCanvas.removeEventListener('mousedown', wheelDown as EventListener)
      wheelCanvas.removeEventListener('touchstart', wheelDown as EventListener)
      discCanvas.removeEventListener('mousedown', discDown as EventListener)
      discCanvas.removeEventListener('touchstart', discDown as EventListener)
      sliderCanvas.removeEventListener('mousedown', sliderDown as EventListener)
      sliderCanvas.removeEventListener('touchstart', sliderDown as EventListener)
      imageCanvas.removeEventListener('mousedown', imgDown as EventListener)
      imageCanvas.removeEventListener('touchstart', imgDown as EventListener)
      imgUploadBtn.removeEventListener('click', onImgUploadBtnClick)
      imgUploadInput.removeEventListener('change', onImgUpload)
      catSelect.removeEventListener('change', onCatChange)
      matchNameEl.removeEventListener('click', onNameClick)
      matchHexEl.removeEventListener('click', onHexClick)
      matchHex2El.removeEventListener('click', onHex2Click)
    }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CITADEL_STYLES }} />
      <article className="post font-[family-name:var(--font-lora)] italic mb-8">
        <h1>Citadel Fangirl</h1>
        <h2>March 1, 2026</h2>
        <p>
          An interactive colour picker for matching custom colours to the Citadel
          paint range, using perceptual colour distance (ΔE) in CIELAB space.
          Drag the hue ring or the saturation/value triangle to pick a colour —
          the closest Citadel paint updates in real time. Filter by paint category
          to narrow the match pool.
        </p>
      </article>

      <div className="citadel-root">
        <div className="controls">
          <label htmlFor="catSelect">Category:</label>
          <select id="catSelect">
            <option value="All">All Categories</option>
          </select>
        </div>

        <div className="tabs">
          <button className="tab-btn active" data-tab="wheel">Colour Wheel</button>
          <button className="tab-btn" data-tab="disc">Colour Disc</button>
          <button className="tab-btn" data-tab="image">Image Picker</button>
        </div>

        <div className="picker-box">
          <div className="tab-panel active" id="wheel-panel">
            <canvas id="wheelCanvas" width={508} height={508} />
          </div>
          <div className="tab-panel" id="disc-panel">
            <canvas id="discCanvas" width={508} height={508} />
            <div className="slider-wrap">
              <canvas id="sliderCanvas" width={508} height={30} />
            </div>
          </div>
          <div className="tab-panel" id="image-panel">
            <div className="img-upload-row">
              <input type="file" id="imgUpload" accept="image/*" />
              <button className="img-upload-btn" id="imgUploadBtn">Upload Image</button>
              <span className="img-hint" id="imgHint">No image loaded</span>
            </div>
            <canvas id="imageCanvas" width={508} height={508} />
          </div>
        </div>

        <div className="color-display">
          <div className="swatch-col">
            <div className="swatch" id="selSwatch" />
            <div className="swatch-label">Selected</div>
            <div className="swatch-hex" id="selHex">#000000</div>
          </div>
          <div className="match-col">
            <div className="match-name" id="matchName" title="Click to copy name">—</div>
            <div className="match-category" id="matchCat" />
            <div className="match-hex" id="matchHex" title="Click to copy hex" />
            <div className="match-delta" id="matchDelta" />
          </div>
          <div className="swatch-col">
            <div className="swatch" id="matchSwatch" />
            <div className="swatch-label">Closest</div>
            <div className="swatch-hex" id="matchHex2" title="Click to copy hex" />
          </div>
        </div>
      </div>
    </>
  )
}
