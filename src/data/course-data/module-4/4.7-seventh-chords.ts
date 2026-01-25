/**
 * Module 4, Submodule 4.7: Hợp âm 7 (Seventh Chords)
 */
import type { Submodule } from '../types'

export const SUBMODULE_4_7: Submodule = {
  id: '4.7',
  title: 'Hợp âm 7',
  description: 'Phân biệt Maj7, min7, Dom7 và tiến trình ii-V-I trong Jazz',
  sections: ['theory', 'piano', 'guitar', 'abcDemo'],
  theoryContent: `
## 1. Seventh Chord là gì?

### Định nghĩa

**Seventh Chord** (Hợp âm 7) = Triad + thêm **1 nốt quãng 7** từ Root.

> 🧱 4 nốt thay vì 3: Root + 3rd + 5th + **7th**

{{abc:C Triad vs C7: Thêm nốt 7|X:1
L:1/1
K:C
[CEG] | [CEG_B]|]}}

{{quiz:Seventh Chord có bao nhiêu nốt?|3;*4;5|Seventh Chord = Triad (3 nốt) + nốt 7 = 4 nốt}}

---

## 2. Ba loại Seventh Chord phổ biến

| Loại | Công thức | Ký hiệu | Cảm xúc |
|------|-----------|---------|---------|
| **Major 7** | Major triad + M7 | Cmaj7, CM7, C△7 | Mơ màng, Jazz |
| **minor 7** | minor triad + m7 | Cm7, C-7 | Soul, R&B |
| **Dominant 7** | Major triad + m7 | C7 | Blues, căng thẳng |

{{quiz:Dominant 7 (C7) có công thức là gì?|Major triad + Major 7;*Major triad + minor 7;minor triad + minor 7|Dom7 = Major triad + minor 7. Đặc biệt: có tritone, căng thẳng!}}

---

## 3. Major 7 (Cmaj7)

### Công thức

**Major Triad + Major 7th** (11 semitones từ root)

- C-E-G (triad) + **B** (M7) = **Cmaj7**

{{abc:Cmaj7: C-E-G-B|X:1
L:1/1
K:C
[CEGB]|]}}

{{piano:Cmaj7|C4,E4,G4,B4}}

### Âm hưởng

- Mơ màng, mềm mại ☁️
- **Jazz, Lo-fi, Bossa Nova**
- Ổn định, không cần resolution

---

## 4. Minor 7 (Cm7)

### Công thức

**minor Triad + minor 7th** (10 semitones từ root)

- C-Eb-G (triad) + **Bb** (m7) = **Cm7**

{{abc:Cm7: C-Eb-G-Bb|X:1
L:1/1
K:Cm
[C_EG_B]|]}}

{{piano:Cm7|C4,Eb4,G4,Bb4}}

### Âm hưởng

- Buồn nhẹ, sâu lắng 🌙
- **Soul, R&B, Neo-Soul**
- D'Angelo, Erykah Badu style

---

## 5. Dominant 7 (C7)

### Công thức

**Major Triad + minor 7th** (ĐẶC BIỆT!)

- C-E-G (Major triad) + **Bb** (m7) = **C7**

{{abc:C7: C-E-G-Bb (có tritone!)|X:1
L:1/1
K:C
[CEG_B]|]}}

{{piano:C7 - Dominant chord|C4,E4,G4,Bb4}}

### Âm hưởng

- Căng thẳng muốn **resolution** ⚡
- Chứa **tritone** (E-Bb)!
- **Blues, Funk, Resolution V7→I**

### V7 → I: Cadence mạnh nhất

{{abc:G7 → C (Dominant resolution)|X:1
M:4/4
L:1/2
K:C
[GBd_f] [CEGc]|]}}

{{quiz:V7 → I được gọi là gì?|Plagal Cadence;*Authentic/Perfect Cadence;Deceptive Cadence|V7→I là Authentic Cadence - cadence mạnh nhất do tritone resolution}}

---

## 6. ii-V-I: Tiến trình Jazz

### "Cỗ máy thời gian Jazz"

Tiến trình quan trọng nhất trong Jazz:

> **Dm7 → G7 → Cmaj7** (trong C Major)
>
> **ii7 → V7 → Imaj7**

{{abc:ii-V-I trong C Major|X:1
M:4/4
L:1/2
K:C
[DFAc] [GBd_f] | [CEGb] z|]}}

### Tại sao hiệu quả?

- **Circle of Fifths movement**: D→G→C
- V7 chứa tritone → muốn resolve về I
- Âm thanh "sophisticated", jazzy

{{quiz:ii-V-I trong C Major là progression nào?|Cmaj7-G7-Dm7;Am7-D7-Gmaj7;*Dm7-G7-Cmaj7|ii-V-I trong C = Dm7 (ii) → G7 (V) → Cmaj7 (I)}}

---

## 7. Seventh Chords trên Guitar

### Shapes phổ biến

{{guitar:G7 Open Chord|G2,B2,D3,F3,G3,B3}}

{{guitar:C7 Open Chord|C3,E3,Bb3,C4,E4}}

{{guitar:Am7 Open Chord|A2,E3,G3,C4,E4}}

### Barre Chord 7ths

Guitarists thường dùng barre chord shapes cho 7th chords trong Jazz và Funk.

---

## 8. Diminished 7 & Half-Diminished

### Bonus: 2 loại khác

| Loại | Công thức | Ký hiệu | Ghi chú |
|------|-----------|---------|---------|
| **dim7** | dim triad + dim7 | C°7 | Symmetric, mystery |
| **half-dim** | dim triad + m7 | Cm7♭5, Cø7 | = minor 7 flat 5 |

{{abc:C diminished 7: Symmetric!|X:1
L:1/1
K:C
[C_E_G_B]|]}}

---

## 🎯 Tóm tắt

1. **Seventh Chord** = Triad + 7th (4 nốt)
2. **Maj7**: Major + M7 = Mơ màng (Cmaj7)
3. **min7**: minor + m7 = Soul (Cm7)
4. **Dom7**: Major + m7 = Blues/Resolution (C7)
5. **ii-V-I** = Dm7→G7→Cmaj7 = Jazz essential!
6. **V7→I** = Cadence mạnh nhất (có tritone resolution)

> 💡 **Mẹo**: Dom7 (C7) khác Maj7 (Cmaj7)! C7 = căng thẳng, Cmaj7 = mơ màng.
  `,
  abcDemos: [
    {
      id: '4.7.1',
      title: 'Maj7 vs min7 vs Dom7',
      description:
        'Side-by-side-by-side: Cmaj7 (C-E-G-B, mơ màng), Cm7 (C-Eb-G-Bb, buồn nhẹ), C7 (C-E-G-Bb, blues căng). Nốt 7 và 3 tạo sự khác biệt lớn!',
      abc: `X:1
M:4/4
L:1/2
K:C
[CEGB] [C_EG_B] | [CEG_B]2|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '4.7.2',
      title: 'V7 → I Resolution',
      description:
        'G7 → C: Tritone trong G7 (B-F) muốn resolve về C-E. Đây là "tension & release" mạnh nhất trong harmony. Blues, Rock, Pop đều dùng!',
      abc: `X:1
M:4/4
L:1/2
K:C
[GBd_f] [CEGc]|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '4.7.3',
      title: 'ii-V-I Loop',
      description:
        'Dm7 → G7 → Cmaj7: THE Jazz progression. Circle of Fifths movement (D→G→C). Mọi bài Jazz standard đều có ii-V-I. Essential knowledge!',
      abc: `X:1
M:4/4
L:1/2
K:C
[DFAc] [GBd_f] | [CEGb]2|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '4.7.4',
      title: '7th Chords on Guitar',
      description:
        'G7, C7, E7 open chords: Common trong Blues và Jazz. Dominant 7 chords tạo Blues feel ngay lập tức. Try G7→C7→G7!',
      abc: `X:1
M:4/4
L:1/2
K:G
[GBd_f] [CE_Gc] | [GBd_f]2|]`,
      interactive: true,
      playable: true,
    },
  ],
  exercises: [{ type: 'chord', questionCount: 5 }],
}
