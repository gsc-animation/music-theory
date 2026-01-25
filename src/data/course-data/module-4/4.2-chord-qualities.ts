/**
 * Module 4, Submodule 4.2: Tính chất hợp âm (Chord Qualities)
 *
 * Learning Journey:
 * 1. Passive: Animation comparing C Major (happy) vs C minor (sad)
 * 2. Guided: "Emotion Matcher" - hear chord, choose matching emoji
 * 3. Interactive: Toggle between 4 qualities: Major, minor, dim, aug
 * 4. Milestone: Distinguish 4 chord types by ear in 80% cases
 *
 * Skipped: Game Journey (to be implemented later)
 */
import type { Submodule } from '../types'

export const SUBMODULE_4_2: Submodule = {
  id: '4.2',
  title: 'Tính chất hợp âm',
  description: 'Phân biệt 4 tính chất: Major, Minor, Diminished, Augmented',
  sections: ['theory', 'piano', 'abcDemo'],
  theoryContent: `
## 1. Tại sao cần "Tính chất" hợp âm?

### Cùng Root, khác cảm xúc

Cả hai đều bắt đầu từ C, nhưng:

{{abc:C Major (vui) vs C minor (buồn)|X:1
L:1/1
K:C
[CEG] | [C_EG]|]}}

- **C Major**: Vui tươi, sáng sủa 😄
- **C minor**: Buồn bã, u tối 😢

> 🎭 **Tính chất (Quality)** quyết định "cảm xúc" của hợp âm!

---

## 2. Bốn tính chất cơ bản

### Bảng tổng hợp

| Tính chất | Công thức | Cảm xúc | Ký hiệu |
|-----------|-----------|---------|---------|
| **Major** | M3 + m3 | Vui, sáng 😄 | C, CM, Cmaj |
| **Minor** | m3 + M3 | Buồn, sâu 😢 | Cm, Cmin, C- |
| **Diminished** | m3 + m3 | Căng thẳng, sợ 😱 | Cdim, C° |
| **Augmented** | M3 + M3 | Mơ hồ, lơ lửng ☁️ | Caug, C+ |

---

## 3. Major vs Minor

### Major Triad (Hợp âm Trưởng)

- **Công thức**: Major 3rd + minor 3rd
- **Semitones**: 4 + 3 = 7 (quãng 5 đúng)
- **Cảm xúc**: Vui, tươi sáng, hoàn chỉnh

{{abc:C Major: C-E-G|X:1
L:1/1
K:C
[CEG]|]}}

{{piano:C Major|C4,E4,G4}}

### Minor Triad (Hợp âm Thứ)

- **Công thức**: minor 3rd + Major 3rd
- **Semitones**: 3 + 4 = 7 (vẫn quãng 5 đúng!)
- **Cảm xúc**: Buồn, sâu lắng, u tối

{{abc:C minor: C-Eb-G|X:1
L:1/1
K:Cm
[C_EG]|]}}

{{piano:C minor|C4,Eb4,G4}}

### Khác biệt duy nhất: Bậc 3!

> 💡 Major → Minor: Hạ bậc 3 xuống **1 semitone**!

---

## 4. Diminished Triad (Hợp âm Giảm) 😱

### Công thức

- **m3 + m3** = Hai quãng 3 THỨ chồng lên nhau
- Tổng = **6 semitones** (Tritone!)

{{abc:C diminished: C-Eb-Gb|X:1
L:1/1
K:C
[C_E_G]|]}}

{{piano:C diminished: Có tritone!|C4,Eb4,Gb4}}

### Âm thanh & Cảm xúc

- **Căng thẳng tột độ** 😱
- "Scary chord" - dùng trong nhạc phim kinh dị
- Không ổn định, cần "giải quyết" về chord khác

> 🎬 Khi nghe chord diminished, bạn biết điều gì đó "đáng sợ" sắp xảy ra!

---

## 5. Augmented Triad (Hợp âm Tăng) ☁️

### Công thức

- **M3 + M3** = Hai quãng 3 TRƯỞNG chồng lên nhau
- Tổng = **8 semitones** (lớn hơn quãng 5 đúng)

{{abc:C augmented: C-E-G#|X:1
L:1/1
K:C
[CE^G]|]}}

{{piano:C augmented: G# cao hơn G|C4,E4,G#4}}

### Âm thanh & Cảm xúc

- **Mơ hồ, lơ lửng** ☁️
- "Dreamy chord" - không có resolution rõ ràng
- Thường dùng trong nhạc Jazz, Impressionist

> 🌊 Augmented nghe như đám mây trôi - không biết sẽ đi đâu!

---

## 6. So sánh trực quan

### Trên Piano

| Chord | Nốt | Khoảng cách |
|-------|-----|-------------|
| **C Major** | C - E - G | 4 + 3 = 7 semitones |
| **C minor** | C - E♭ - G | 3 + 4 = 7 semitones |
| **C dim** | C - E♭ - G♭ | 3 + 3 = 6 semitones |
| **C aug** | C - E - G# | 4 + 4 = 8 semitones |

### Điểm khác biệt

- **Major ↔ minor**: Chỉ khác bậc 3 (E vs E♭)
- **Major ↔ aug**: Chỉ khác bậc 5 (G vs G#)
- **minor ↔ dim**: Chỉ khác bậc 5 (G vs G♭)

---

## 7. Emotion Mapping

### Liên kết tính chất với cảm xúc

| Tính chất | Emoji | Cảnh nghe | Ví dụ thể loại |
|-----------|-------|-----------|----------------|
| **Major** | 😄 | Ngày nắng đẹp | Pop, Country |
| **minor** | 😢 | Trời mưa buồn | Ballad, R&B |
| **dim** | 😱 | Cảnh rùng rợn | Horror, Thriller |
| **aug** | ☁️ | Mơ màng, siêu thực | Jazz, Art music |

### Audio A/B Test

Click để nghe từng loại từ cùng Root (C):

{{piano:C Major (vui)|C4,E4,G4}}
{{piano:C minor (buồn)|C4,Eb4,G4}}
{{piano:C dim (sợ)|C4,Eb4,Gb4}}
{{piano:C aug (mơ)|C4,E4,G#4}}

---

## 8. Ứng dụng thực tế

### Trong bản nhạc

- **Major**: Phần chorus vui, victory moment
- **minor**: Verse buồn, reflection
- **dim**: Transition căng thẳng, leading đến V chord
- **aug**: Jazz voicing, chromatic movement

### Chord tự nhiên trong Scale

Trong C Major scale:
- I, IV, V = **Major** (C, F, G)
- ii, iii, vi = **minor** (Dm, Em, Am)
- vii° = **diminished** (B°)

---

## 🎯 Tóm tắt

1. **Major** (M3 + m3): Vui tươi 😄 - Ký hiệu: C, CM
2. **minor** (m3 + M3): Buồn bã 😢 - Ký hiệu: Cm, C-
3. **diminished** (m3 + m3): Căng thẳng 😱 - Ký hiệu: Cdim, C°
4. **augmented** (M3 + M3): Mơ hồ ☁️ - Ký hiệu: Caug, C+
5. Major → minor: Hạ bậc 3 xuống 1 semitone
6. Tính chất quyết định "mood" của hợp âm

> 💡 **Mẹo**: Nhớ emoji! Major 😄, minor 😢, dim 😱, aug ☁️
  `,
  abcDemos: [
    {
      id: '4.2.1',
      title: 'Major vs Minor',
      description:
        'Side-by-side C vs Cm: Major (C-E-G) = vui như mặt trời, Minor (C-Eb-G) = buồn như mưa. Chỉ 1 nốt khác (E vs Eb) nhưng cảm xúc hoàn toàn đối lập!',
      abc: `X:1
M:4/4
L:1/1
K:C
[CEG] | [C_EG]|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '4.2.2',
      title: 'Diminished "Scary"',
      description:
        'C dim: C-Eb-Gb - Horror movie chord! Có tritone (6 semitones) trong chord tạo căng thẳng tột độ. Dùng trong nhạc phim kinh dị, thriller.',
      abc: `X:1
M:4/4
L:1/1
K:C
[C_E_G]|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '4.2.3',
      title: 'Augmented "Dreamy"',
      description:
        'C aug: C-E-G# - Floating, unresolved. Chord này không biết đi đâu, tạo cảm giác lơ lửng, mơ màng. Phổ biến trong Jazz và nhạc Art.',
      abc: `X:1
M:4/4
L:1/1
K:C
[CE^G]|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '4.2.4',
      title: 'Quality Toggle',
      description:
        'Switch giữa cả 4: C → Cm → Cdim → Caug. Cùng root C, khác tính chất, khác cảm xúc. Đây là sức mạnh của harmony!',
      abc: `X:1
M:4/4
L:1/1
K:C
[CEG] | [C_EG] | [C_E_G] | [CE^G]|]`,
      interactive: true,
      playable: true,
    },
  ],
  exercises: [
    {
      type: 'chord',
      questionCount: 5,
    },
  ],
}
