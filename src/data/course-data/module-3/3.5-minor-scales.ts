/**
 * Module 3, Submodule 3.5: Âm giai thứ (The Minor Scales)
 *
 * Learning Journey:
 * 1. Passive: Animation comparing C Major (happy) vs A minor (sad)
 * 2. Guided: Scale Switcher - toggle between Natural, Harmonic, Melodic minor
 * 3. Interactive: Build 3 minor scale types from any note
 * 4. Milestone: Play A minor (all 3 forms) on Piano/Guitar
 *
 * Skipped: Game Journey (to be implemented later)
 */
import type { Submodule } from '../types'

export const SUBMODULE_3_5: Submodule = {
  id: '3.5',
  title: 'Âm giai thứ',
  description: 'Hiểu 3 dạng: Natural, Harmonic (nâng bậc 7), Melodic (nâng bậc 6+7)',
  sections: ['theory', 'piano', 'guitar', 'abcDemo'],
  theoryContent: `
## 1. Âm giai Thứ (Minor Scale) là gì?

### So sánh với Major

| Đặc điểm | Major (Trưởng) | Minor (Thứ) |
|----------|----------------|-------------|
| Âm hưởng | Vui tươi, sáng 😄 | Buồn bã, u tối 😢 |
| Quãng 3 | Major 3rd (4 semitones) | Minor 3rd (3 semitones) |
| Công thức | W-W-H-W-W-W-H | W-H-W-W-H-W-W |

{{abc:C Major (vui) vs A minor (buồn)|X:1
L:1/4
K:C
C D E F | G A B c || A, B, C D | E F G A|]}}

> 🎭 Cùng các nốt (không có dấu hóa), nhưng bắt đầu từ C = vui, từ A = buồn!

---

## 2. Natural Minor (Thứ tự nhiên)

### Công thức

> **W - H - W - W - H - W - W**

(Khác với Major: W-W-**H**-W-W-W-**H**)

### A Natural Minor

**A-B-C-D-E-F-G-A**: Toàn bộ phím trắng từ A!

{{abc:A Natural Minor Scale|X:1
L:1/4
K:Am
A, B, C D | E F G A|]}}

{{piano:A Natural Minor: Tất cả phím trắng từ A|A3,B3,C4,D4,E4,F4,G4,A4}}

### Bậc nửa cung

- Bậc 2→3 (B→C): Nửa cung
- Bậc 5→6 (E→F): Nửa cung

> 📝 Nhớ: Nửa cung ở vị trí **2-3** và **5-6** (khác với Major: 3-4 và 7-8)

---

## 3. Harmonic Minor (Thứ hòa âm)

### Vấn đề với Natural Minor

Trong Natural Minor, bậc 7 (G) cách bậc 8 (A) một **cung** → Không có "sức hút" về tonic.

### Giải pháp: Nâng bậc 7

> **Nâng bậc 7 lên nửa cung** để tạo "Leading Tone"

**A Harmonic Minor**: A-B-C-D-E-F-**G#**-A

{{abc:A Harmonic Minor: G → G#|X:1
L:1/4
K:Am
A, B, C D | E F ^G A|]}}

{{piano:A Harmonic Minor: Có G#|A3,B3,C4,D4,E4,F4,G#4,A4}}

### Đặc điểm

- Quãng **Aug 2** (F→G#): Âm hưởng "Trung Đông", "Ả Rập"
- Tạo hợp âm V (E Major) trong giọng A minor
- Rất phổ biến trong nhạc cổ điển và metal!

> 🎸 Metal guitarists love Harmonic Minor! 🤘

---

## 4. Melodic Minor (Thứ giai điệu)

### Vấn đề với Harmonic Minor

Quãng Aug 2 (F→G#) **khó hát** vì bước nhảy quá lớn.

### Giải pháp: Nâng cả bậc 6 VÀ 7 khi đi lên

**Đi LÊN**: Nâng bậc 6 và 7 (F→**F#**, G→**G#**)

**Đi XUỐNG**: Trở về Natural (G và F tự nhiên)

{{abc:A Melodic Minor: Khác khi lên và xuống|X:1
L:1/4
K:Am
A, B, C D | E ^F ^G A | G F E D | C B, A,2|]}}

### Tổng hợp 3 dạng

| Dạng | Bậc 6 | Bậc 7 | Đặc điểm |
|------|-------|-------|----------|
| **Natural** | F | G | Buồn, mộc mạc |
| **Harmonic** | F | **G#** | "Ả Rập", có leading tone |
| **Melodic ↑** | **F#** | **G#** | Mượt mà khi đi lên |
| **Melodic ↓** | F | G | = Natural minor |

---

## 5. Relative Major/Minor

### Cùng hóa biểu!

**Relative Major/Minor** là cặp giọng Major và Minor **dùng chung hóa biểu**.

| Major | Relative Minor | Hóa biểu |
|-------|----------------|----------|
| C Major | **A minor** | 0 dấu |
| G Major | **E minor** | 1# (F#) |
| F Major | **D minor** | 1♭ (B♭) |
| D Major | **B minor** | 2# |

### Cách tìm

> **Major xuống Minor 3rd (3 semitones) = Relative Minor**

Ví dụ: C → B → B♭ → A = **A minor**

{{abc:C Major và A minor: Cùng hóa biểu|X:1
L:1/4
K:C
C D E F G A B c | A, B, C D E F G A|]}}

---

## 6. Parallel Major/Minor

### Khác hóa biểu!

**Parallel Major/Minor** là cặp giọng Major và Minor **cùng tonic** (nốt chủ).

| Major | Parallel Minor | Khác biệt |
|-------|----------------|-----------|
| C Major | **C minor** | 3 flats cho C minor |
| G Major | **G minor** | 2 flats cho G minor |
| A Major | **A minor** | Bỏ 3 sharps |

{{abc:C Major vs C minor (Parallel)|X:1
L:1/4
K:C
C D E F G | z4 |
K:Cm
C D _E F G|]}}

> 🎹 Parallel minor tạo "bóng tối" cho cùng một key - dùng trong modulation!

---

## 7. Ứng dụng các dạng Minor

### Natural Minor

- Nhạc dân gian, folk
- Pop ballad buồn
- "Đơn giản, tự nhiên"

### Harmonic Minor

- Classical (đặc biệt Baroque)
- Metal, Neoclassical
- Middle Eastern vibes

### Melodic Minor

- Jazz improvisation
- Classical melodies
- Khi cần "mượt mà" đi lên

---

## 🎯 Tóm tắt

1. **Minor Scale** có âm hưởng buồn (quãng 3 thứ)
2. **Natural Minor**: W-H-W-W-H-W-W (tất cả phím trắng từ A)
3. **Harmonic Minor**: Nâng bậc 7 → tạo leading tone + Aug 2
4. **Melodic Minor**: Nâng bậc 6+7 khi đi lên, natural khi xuống
5. **Relative**: Cùng hóa biểu (C Major ↔ A minor)
6. **Parallel**: Cùng tonic (C Major ↔ C minor)

> 💡 **Mẹo**: A minor = "C Major buồn" - cùng nốt, khác điểm bắt đầu!
  `,
  abcDemos: [
    {
      id: '3.5.1',
      title: 'Natural Minor',
      description:
        'A minor (tự nhiên): Tất cả phím trắng từ A. Công thức W-H-W-W-H-W-W. Âm hưởng buồn, mộc mạc, tự nhiên. Đây là dạng minor "gốc" trong dân gian và folk music.',
      abc: `X:1
M:4/4
L:1/4
K:Am
A, B, C D | E F G A|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '3.5.2',
      title: 'Harmonic Minor',
      description:
        'G → G# (raised 7th): Tạo "leading tone" dẫn về tonic mạnh mẽ. Quãng Aug 2 (F→G#) tạo âm hưởng "Ả Rập/Trung Đông". Phổ biến trong Classical và Metal!',
      abc: `X:1
M:4/4
L:1/4
K:Am
A, B, C D | E F ^G A|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '3.5.3',
      title: 'Melodic Minor',
      description:
        'Khác khi đi lên (F#, G#) và đi xuống (natural). Jazz musicians thường dùng melodic minor đi lên cho cả hai chiều - gọi là "Jazz Melodic Minor".',
      abc: `X:1
M:4/4
L:1/4
K:Am
A, B, C D | E ^F ^G A | G F E D | C B, A,2|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '3.5.4',
      title: 'Relative Pairs: C Major ↔ A minor',
      description:
        'Comparison: Cả hai dùng chung hóa biểu (0 dấu), chỉ khác điểm bắt đầu. C Major bắt đầu từ C = vui. A minor bắt đầu từ A = buồn. Cùng "nguyên liệu", khác "món ăn"!',
      abc: `X:1
M:4/4
L:1/4
K:C
C D E F G A B c | A, B, C D E F G A|]`,
      interactive: true,
      playable: true,
    },
  ],
  exercises: [
    {
      type: 'note-id',
      notes: ['A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'G#4', 'A4'],
      questionCount: 5,
    },
  ],
}
