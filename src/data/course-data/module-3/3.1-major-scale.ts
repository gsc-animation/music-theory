/**
 * Module 3, Submodule 3.1: Thang âm trưởng (The Major Scale)
 *
 * Learning Journey:
 * 1. Passive: Animation "scale stairs" with W-W-H-W-W-W-H pattern
 * 2. Guided: Scale Builder - click each note following the formula
 * 3. Interactive: Build major scale from any note on Piano/Guitar
 * 4. Milestone: Play C Major, G Major, F Major consecutively
 *
 * Skipped: Game Journey (to be implemented later)
 */
import type { Submodule } from '../types'

export const SUBMODULE_3_1: Submodule = {
  id: '3.1',
  title: 'Thang âm trưởng',
  description: 'Hiểu công thức Cung-Cung-Nửa-Cung-Cung-Cung-Nửa (W-W-H-W-W-W-H)',
  sections: ['theory', 'piano', 'guitar', 'abcDemo'],
  theoryContent: `
## 1. Thang âm (Scale) là gì?

### Định nghĩa

**Thang âm (Scale)** là một chuỗi các nốt được sắp xếp theo thứ tự từ thấp đến cao (hoặc ngược lại), bắt đầu và kết thúc bằng nốt cùng tên.

> 🎼 Scale như "bảng chữ cái" của âm nhạc - mỗi giọng sử dụng một tập hợp nốt riêng!

### Thang âm Trưởng (Major Scale)

**Major Scale** có âm hưởng **vui tươi, sáng sủa, hoàn chỉnh**.

{{abc:Thang âm C Major - Âm hưởng vui tươi!|X:1
L:1/4
K:C
C D E F | G A B c|]}}

{{quiz:Thang âm Trưởng (Major Scale) có âm hưởng như thế nào?|Buồn bã, u ám;*Vui tươi, sáng sủa;Căng thẳng, kịch tính|Major Scale có âm hưởng vui tươi, hoàn chỉnh - khác với Minor (buồn)}}

---

## 2. Công thức "vàng" W-W-H-W-W-W-H

### Quy tắc bất biến

Mọi thang âm trưởng đều được xây dựng theo **một công thức duy nhất**:

> **W - W - H - W - W - W - H**
>
> W = Whole step (Cung)
> H = Half step (Nửa cung)

### Áp dụng vào C Major

| Bậc | 1→2 | 2→3 | 3→4 | 4→5 | 5→6 | 6→7 | 7→8 |
|-----|-----|-----|-----|-----|-----|-----|-----|
| Nốt | C→D | D→E | E→F | F→G | G→A | A→B | B→C |
| Khoảng cách | **W** | **W** | **H** | **W** | **W** | **W** | **H** |

{{piano:C Major: Toàn bộ phím trắng!|C4,D4,E4,F4,G4,A4,B4,C5}}

> 💡 **C Major đặc biệt**: Chỉ dùng phím trắng vì E-F và B-C vốn là nửa cung tự nhiên!

{{quiz:Công thức của thang âm trưởng là gì?|W-H-W-W-H-W-W;*W-W-H-W-W-W-H;H-W-W-W-H-W-W|W-W-H-W-W-W-H = Cung-Cung-Nửa-Cung-Cung-Cung-Nửa}}

{{quiz:Trong công thức W-W-H-W-W-W-H, "H" nghĩa là gì?|Whole step (Cung);*Half step (Nửa cung);High note|H = Half step = Nửa cung. W = Whole step = Cung}}

---

## 3. C Major - Thang âm "trắng tinh"

### Tại sao C Major là cơ bản nhất?

- Tất cả **7 nốt đều là phím trắng**
- Không có dấu hóa (sharps/flats)
- Dễ nhìn, dễ nhớ, dễ chơi

{{abc:C Major Scale - Đi lên và xuống|X:1
M:4/4
L:1/4
K:C
C D E F | G A B c | c B A G | F E D C|]}}

### Vị trí nửa cung

- **E → F** (bậc 3 → 4): Nửa cung thứ nhất
- **B → C** (bậc 7 → 8): Nửa cung thứ hai

{{piano:Nửa cung trong C Major: E-F và B-C|E4,F4,B4,C5}}

{{quiz:Trong âm giai C Major, nửa cung nằm ở vị trí nào?|Bậc 1→2 và 4→5;*Bậc 3→4 và 7→8;Bậc 2→3 và 5→6|Nửa cung luôn ở bậc 3→4 (E-F) và bậc 7→8 (B-C) trong mọi Major Scale}}

---

## 4. G Major - Cần F#

### Tại sao cần F#?

Khi bắt đầu từ G và áp dụng công thức W-W-H-W-W-W-H:

| Bậc | Nốt | Khoảng cách cần | Khoảng cách thực |
|-----|-----|-----------------|------------------|
| 6→7 | E→F | **W** (cung) | ❌ Chỉ có H (E-F là nửa cung!) |
| 6→7 | E→**F#** | **W** (cung) | ✅ E→F# = 1 cung |

{{abc:G Major Scale - Có F#|X:1
L:1/4
K:G
G A B c | d e ^f g|]}}

{{piano:G Major: G A B C D E F# G|G3,A3,B3,C4,D4,E4,F#4,G4}}

> 📝 **G Major có 1 dấu thăng**: F# (trong hóa biểu)

{{quiz:Tại sao G Major cần F# thay vì F?|Vì F nghe không hay;*Vì công thức yêu cầu 1 cung ở bậc 6→7, mà E-F chỉ là nửa cung;Vì F# dễ chơi hơn|E→F chỉ là nửa cung, nhưng công thức yêu cầu 1 cung → phải nâng F lên F#}}

---

## 5. F Major - Cần Bb

### Tại sao cần Bb?

Khi bắt đầu từ F:

| Bậc | Nốt | Khoảng cách cần | Khoảng cách thực |
|-----|-----|-----------------|------------------|
| 3→4 | A→B | **H** (nửa) | ❌ A-B = 1 cung! |
| 3→4 | A→**Bb** | **H** (nửa) | ✅ A→Bb = nửa cung |

{{abc:F Major Scale - Có Bb|X:1
L:1/4
K:F
F G A B | c d e f|]}}

{{piano:F Major: F G A Bb C D E F|F3,G3,A3,Bb3,C4,D4,E4,F4}}

> 📝 **F Major có 1 dấu giáng**: Bb (trong hóa biểu)

{{quiz:F Major cần dấu hóa gì?|F#;*Bb;C#|F Major cần Bb vì A→B là 1 cung, nhưng công thức yêu cầu nửa cung ở bậc 3→4}}

---

## 6. Các Scale phổ biến khác

### D Major (2 sharps: F#, C#)

{{abc:D Major Scale|X:1
L:1/4
K:D
D E ^F G | A B ^c d|]}}

### Bb Major (2 flats: Bb, Eb)

{{abc:Bb Major Scale|X:1
L:1/4
K:Bb
B c d e | f g a b|]}}

### Tăng dần số dấu hóa

| Giọng | Số dấu | Dấu hóa |
|-------|--------|---------|
| C Major | 0 | (không có) |
| G Major | 1# | F# |
| D Major | 2# | F#, C# |
| A Major | 3# | F#, C#, G# |
| F Major | 1♭ | B♭ |
| B♭ Major | 2♭ | B♭, E♭ |
| E♭ Major | 3♭ | B♭, E♭, A♭ |

---

## 7. Bậc của thang âm (Scale Degrees)

### Tên gọi các bậc

| Bậc | Số La Mã | Tên tiếng Anh | Tên tiếng Ý | Vai trò |
|-----|----------|---------------|-------------|---------|
| 1 | I | Tonic | Đô (Do) | Nốt chủ, "nhà" |
| 2 | II | Supertonic | Rê (Re) | Trên Tonic |
| 3 | III | Mediant | Mi (Mi) | Giữa Tonic và Dominant |
| 4 | IV | Subdominant | Fa (Fa) | Dưới Dominant |
| 5 | V | Dominant | Sol (So) | Quan trọng nhất sau Tonic |
| 6 | VI | Submediant | La (La) | Dưới Mediant (từ trên xuống) |
| 7 | VII | Leading Tone | Si (Ti) | Dẫn về Tonic |
| 8 | I (octave) | Tonic | Đô' (Do') | Quãng tám |

---

## 🎯 Tóm tắt

1. **Thang âm trưởng** = Chuỗi 8 nốt với âm hưởng vui tươi
2. **Công thức**: W-W-H-W-W-W-H (Cung-Cung-Nửa-Cung-Cung-Cung-Nửa)
3. **C Major** đặc biệt: Chỉ dùng phím trắng
4. **G Major**: Cần F# để giữ công thức
5. **F Major**: Cần Bb để giữ công thức
6. **Nửa cung** luôn ở vị trí bậc 3→4 và bậc 7→8

> 💡 **Mẹo nhớ công thức**: "**W**hole-**W**hole-**H**alf | **W**hole-**W**hole-**W**hole-**H**alf" (2-1 | 3-1)
  `,
  abcDemos: [
    {
      id: '3.1.1',
      title: 'C Major Scale',
      description:
        'All white keys! Highlight E-F và B-C là nửa cung - đây là 2 vị trí "đặc biệt" của công thức W-W-H-W-W-W-H. C Major là scale đầu tiên mọi người học vì không cần nhớ dấu hóa nào!',
      abc: `X:1
M:4/4
L:1/4
K:C
C D E F | G A B c|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '3.1.2',
      title: 'G Major với F#',
      description:
        'Demo why F must become F#: Khoảng cách E→F chỉ là nửa cung, nhưng công thức yêu cầu 1 cung ở vị trí bậc 6→7. Giải pháp: nâng F lên thành F#!',
      abc: `X:1
M:4/4
L:1/4
K:G
G A B c | d e ^f g|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '3.1.3',
      title: 'F Major với Bb',
      description:
        'Demo why B must become Bb: Khoảng cách A→B là 1 cung, nhưng công thức yêu cầu nửa cung ở vị trí bậc 3→4. Giải pháp: hạ B xuống thành Bb!',
      abc: `X:1
M:4/4
L:1/4
K:F
F G A B | c d e f|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '3.1.4',
      title: 'Scale Builder',
      description:
        'Interactive: chọn root note → auto-generate scale theo công thức W-W-H-W-W-W-H. Bắt đầu từ bất kỳ nốt nào, áp dụng công thức, và bạn có một Major Scale hoàn chỉnh!',
      abc: `X:1
M:4/4
L:1/4
K:D
D E ^F G | A B ^c d|]`,
      interactive: true,
      playable: true,
    },
  ],
  exercises: [
    {
      type: 'note-id',
      notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'],
      questionCount: 5,
    },
  ],
}
