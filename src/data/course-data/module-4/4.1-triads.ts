/**
 * Module 4, Submodule 4.1: Hợp âm ba nốt (Triads)
 *
 * Learning Journey:
 * 1. Passive: Animation "snowman stacking" - 3 notes piled up
 * 2. Guided: Chord Builder - select Root, auto-show 3rd and 5th
 * 3. Interactive: Build C, G, F, Am on Piano and Guitar
 * 4. Milestone: Play 4 basic chords consecutively (C-G-Am-F)
 *
 * Skipped: Game Journey (to be implemented later)
 */
import type { Submodule } from '../types'

export const SUBMODULE_4_1: Submodule = {
  id: '4.1',
  title: 'Hợp âm ba nốt',
  description: 'Hiểu cấu trúc Triad: Root + 3rd + 5th',
  sections: ['theory', 'piano', 'guitar', 'abcDemo'],
  theoryContent: `
## 1. Hợp âm (Chord) là gì?

### Định nghĩa

**Hợp âm (Chord)** là 3 nốt hoặc nhiều hơn vang lên **cùng một lúc**.

{{abc:1 nốt đơn vs 3 nốt hợp âm|X:1
L:1/2
K:C
C [CEG]|]}}

> 🎵 1 nốt = **melody**, 3+ nốt cùng lúc = **harmony** (hòa âm)!

### So sánh cảm giác

- **1 nốt**: Đơn lẻ, "trống rỗng"
- **Hợp âm**: Đầy đặn, "hoàn chỉnh", có cảm xúc rõ ràng

---

## 2. Triad - Hợp âm cơ bản nhất

### Định nghĩa

**Triad** (hợp âm ba) là hợp âm gồm **đúng 3 nốt**, xếp chồng theo quãng 3.

> 🧊 Triad giống như **viên gạch cơ bản** của hòa âm!

### Cấu trúc "Người tuyết" ☃️

| Thành phần | Tên gọi | Vai trò |
|------------|---------|---------|
| Nốt dưới cùng | **Root** (Nốt gốc) | Đặt tên cho hợp âm |
| Nốt giữa | **3rd** (Quãng 3) | Quyết định Major/Minor |
| Nốt trên cùng | **5th** (Quãng 5) | Tạo độ ổn định |

{{abc:C Triad: C (root) + E (3rd) + G (5th)|X:1
L:1/1
K:C
[CEG]|]}}

---

## 3. Xây dựng C Major Triad

### Từng bước

1. **Root** = C (nốt chủ, đặt tên hợp âm)
2. **3rd** = E (quãng 3 trưởng từ C → 4 semitones)
3. **5th** = G (quãng 5 đúng từ C → 7 semitones)

{{piano:C Major Triad: C-E-G|C4,E4,G4}}

### Công thức

> **Root + Major 3rd + Minor 3rd = Major Triad**

- C → E = M3 (4 semitones)
- E → G = m3 (3 semitones)

---

## 4. G Major, F Major, A minor

### G Major Triad

{{abc:G Major: G-B-D|X:1
L:1/1
K:G
[GBd]|]}}

{{piano:G Major Triad|G3,B3,D4}}

### F Major Triad

{{abc:F Major: F-A-C|X:1
L:1/1
K:F
[FAc]|]}}

{{piano:F Major Triad|F3,A3,C4}}

### A Minor Triad

{{abc:A minor: A-C-E (quãng 3 THỨ!)|X:1
L:1/1
K:Am
[A,CE]|]}}

{{piano:A minor Triad (m3 + M3)|A3,C4,E4}}

> 🎭 A minor có quãng 3 **thứ** (3 semitones) thay vì quãng 3 trưởng → buồn!

---

## 5. Triads trên Guitar 🎸

### Open Chords

{{guitar:C Major Open Chord|C3,E3,G3,C4,E4}}

{{guitar:G Major Open Chord|G2,B2,D3,G3,B3,G4}}

{{guitar:Am Open Chord|A2,E3,A3,C4,E4}}

{{guitar:F Major (barre hoặc easy)|F3,A3,C4,F4}}

### Power Chord (Chỉ Root + 5th)

Power chord chỉ có 2 nốt (Root + 5th), không có 3rd:
- Không Major, không Minor
- Âm thanh "powerful", mạnh mẽ
- Dùng trong Rock/Metal

{{guitar:Power Chord: C5|C3,G3,C4}}

---

## 6. Progression cổ điển: C-G-Am-F

### "Axis of Awesome" Progression

Tiến trình phổ biến nhất trong Pop/Rock:

{{abc:C - G - Am - F (I-V-vi-IV)|X:1
M:4/4
L:1/1
K:C
[CEG] | [GBd] | [A,CE] | [FAc]|]}}

{{piano:C-G-Am-F Loop|C4,E4,G4,G4,B4,D5,A4,C5,E5,F4,A4,C5}}

> 🎤 Hàng trăm bài hit dùng progression này: "Let It Be", "No Woman No Cry", "With or Without You"...

---

## 7. Piano vs Guitar Voicing

### Cùng hợp âm, khác cách đánh

**Piano**: Thường đánh "close voicing" (các nốt gần nhau)

**Guitar**: Open chords có nốt rải rộng hơn, có thể lặp nốt

| Nhạc cụ | C Major voicing | Đặc điểm |
|---------|-----------------|----------|
| Piano | C-E-G | Compact, 3 nốt |
| Guitar | C-E-G-C-E | Rộng, 5 dây/nốt |

---

## 8. Bảng Triads cơ bản

| Tên | Nốt | Công thức | Ký hiệu |
|-----|-----|-----------|---------|
| **C Major** | C-E-G | R + M3 + m3 | C, CM, Cmaj |
| **D Major** | D-F#-A | R + M3 + m3 | D, DM |
| **E Major** | E-G#-B | R + M3 + m3 | E, EM |
| **F Major** | F-A-C | R + M3 + m3 | F, FM |
| **G Major** | G-B-D | R + M3 + m3 | G, GM |
| **A Major** | A-C#-E | R + M3 + m3 | A, AM |
| **A minor** | A-C-E | R + m3 + M3 | Am, A- |
| **D minor** | D-F-A | R + m3 + M3 | Dm, D- |
| **E minor** | E-G-B | R + m3 + M3 | Em, E- |

---

## 🎯 Tóm tắt

1. **Hợp âm** = 3+ nốt cùng lúc
2. **Triad** = Root + 3rd + 5th (3 nốt)
3. **Root** đặt tên, **3rd** quyết định vui/buồn, **5th** tạo ổn định
4. **Major Triad** = M3 + m3 (vui)
5. **Minor Triad** = m3 + M3 (buồn)
6. **C-G-Am-F** = Progression huyền thoại!

> 💡 **Mẹo**: Triad như "người tuyết" - 3 hình tròn xếp chồng!
  `,
  abcDemos: [
    {
      id: '4.1.1',
      title: 'Triad Stacking',
      description:
        'Animation xếp 3 nốt: Root (C) → 3rd (E) → 5th (G). Như xây người tuyết từ dưới lên! Công thức này hoạt động cho MỌI nốt gốc.',
      abc: `X:1
M:4/4
L:1/1
K:C
[CEG]|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '4.1.2',
      title: 'C-G-Am-F Loop',
      description:
        '4 chords progression phổ biến nhất thế giới! I-V-vi-IV trong C Major. Hàng trăm hit songs dùng sequence này: "Let It Be", "No Woman No Cry", "With or Without You"...',
      abc: `X:1
M:4/4
L:1/1
K:C
[CEG] | [GBd] | [A,CE] | [FAc]|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '4.1.3',
      title: 'Piano vs Guitar Voicing',
      description:
        'Cùng hợp âm C nhưng khác cách voiced: Piano thường compact (C-E-G), Guitar spread ra nhiều octave (C-E-G-C-E). Cả hai đều là "C Major"!',
      abc: `X:1
M:4/4
L:1/1
K:C
[CEG] | [C,E,G,CE]|]`,
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
