/**
 * Module 4, Submodule 4.5: Vòng quãng 5 (The Circle of Fifths)
 */
import type { Submodule } from '../types'

export const SUBMODULE_4_5: Submodule = {
  id: '4.5',
  title: 'Vòng quãng 5',
  description: 'Hiểu cấu trúc Circle of Fifths và sử dụng để xác định hóa biểu',
  sections: ['theory', 'abcDemo'],
  theoryContent: `
## 1. Circle of Fifths là gì?

### Định nghĩa

**Vòng quãng 5** là sơ đồ tổ chức 12 giọng Major (và minor) thành hình tròn, mỗi bước cách nhau **quãng 5 đúng**.

> 🔄 Như mặt đồng hồ với **C ở 12 giờ**!

{{quiz:Circle of Fifths có giọng nào ở vị trí 12 giờ?|G Major;*C Major;F Major|C Major ở 12 giờ với 0 dấu hóa}}

---

## 2. Cấu trúc vòng tròn

### Bố trí

\`\`\`
           C (0)
      F (1♭)   G (1#)
   B♭ (2♭)       D (2#)
  E♭ (3♭)         A (3#)
 A♭ (4♭)           E (4#)
  D♭ (5♭)         B (5#)
   G♭/F# (6♭/6#)
\`\`\`

### Quy tắc

- **Thuận chiều kim đồng hồ**: +1 sharp mỗi bước (C→G→D→A...)
- **Ngược chiều**: +1 flat mỗi bước (C→F→B♭→E♭...)

{{quiz:Khi đi THEO chiều kim đồng hồ trên Circle of Fifths, số dấu hóa thay đổi như thế nào?|+1 flat mỗi bước;*+1 sharp mỗi bước;Không đổi|Thuận chiều = +1# (C→G→D→A...). Ngược chiều = +1♭}}

---

## 3. Đi theo chiều kim đồng hồ = +#

### Thêm Sharp

| Bước | Giọng | Số # | Sharp mới |
|------|-------|------|-----------|
| 0 | C | 0 | - |
| 1 | **G** | 1 | F# |
| 2 | **D** | 2 | C# |
| 3 | **A** | 3 | G# |
| 4 | **E** | 4 | D# |
| 5 | **B** | 5 | A# |
| 6 | **F#** | 6 | E# |

### Cách nhớ

Mỗi bước đi = lên **quãng 5** (G là quãng 5 của C, D là quãng 5 của G...)

---

## 4. Đi ngược chiều = +♭

### Thêm Flat

| Bước | Giọng | Số ♭ | Flat mới |
|------|-------|------|----------|
| 0 | C | 0 | - |
| 1 | **F** | 1 | B♭ |
| 2 | **B♭** | 2 | E♭ |
| 3 | **E♭** | 3 | A♭ |
| 4 | **A♭** | 4 | D♭ |
| 5 | **D♭** | 5 | G♭ |
| 6 | **G♭** | 6 | C♭ |

### Cách nhớ

Mỗi bước ngược = lên **quãng 4** (F là quãng 4 của C...) hoặc xuống quãng 5.

---

## 5. Vòng trong: Relative Minor

### Minor song sinh

Mỗi giọng Major có một **Relative Minor** cùng hóa biểu:

| Major | Relative Minor | Hóa biểu |
|-------|----------------|----------|
| C | **Am** | 0 |
| G | **Em** | 1# |
| F | **Dm** | 1♭ |
| D | **Bm** | 2# |

### Vị trí trên vòng

- Major ở **vòng ngoài**
- Minor ở **vòng trong** (cùng vị trí)

{{quiz:Relative Minor của G Major là gì?|Dm;*Em;Am|G Major và Em cùng hóa biểu (1#). Minor ở vòng trong, cùng vị trí với Major}}

---

## 6. Công dụng thực tế

### 1. Xác định hóa biểu nhanh

Nhìn vị trí trên vòng = biết ngay mấy dấu #/♭

### 2. Tìm "hàng xóm" hòa hợp

Các giọng **kề nhau** trên vòng = dễ modulate:
- C ↔ G (chỉ khác 1 nốt: F vs F#)
- C ↔ F (chỉ khác 1 nốt: B vs B♭)

### 3. Progression phổ biến

**ii-V-I** = Di chuyển theo hướng thuận:
- Dm → G → C (D→G→C trên vòng)

---

## 7. Enharmonic Equivalents

### 6 giờ: Hai tên, một giọng

| Sharp name | Flat name | Số dấu |
|------------|-----------|--------|
| F# Major | G♭ Major | 6# / 6♭ |
| C# Major | D♭ Major | 7# / 5♭ |

---

## 🎯 Tóm tắt

1. **C ở 12 giờ** (0 dấu hóa)
2. **Thuận chiều** = +1# mỗi bước (G→D→A→E...)
3. **Ngược chiều** = +1♭ mỗi bước (F→B♭→E♭→A♭...)
4. **Vòng trong** = Relative Minor
5. Các giọng **hàng xóm** = dễ modulate

> 💡 **Mẹo**: In Circle of Fifths và dán lên tường - đây là "bản đồ" quan trọng nhất!
  `,
  abcDemos: [
    {
      id: '4.5.1',
      title: 'Circle Navigation',
      description:
        'Click để xoay vòng, hiện key info. C ở 12 giờ (0 dấu), G ở 1 giờ (1#), F ở 11 giờ (1♭). Đây là organization system quan trọng nhất trong nhạc lý!',
      abc: `X:1
M:4/4
L:1/4
K:C
C D E F | G A B c|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '4.5.2',
      title: 'Sharp Keys (right side)',
      description:
        'G(1#), D(2#), A(3#), E(4#), B(5#), F#(6#). Mỗi bước đi thuận = thêm 1 sharp theo thứ tự F-C-G-D-A-E-B.',
      abc: `X:1
M:4/4
L:1/4
K:A
A B c d | e f g a|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '4.5.3',
      title: 'Flat Keys (left side)',
      description:
        'F(1♭), B♭(2♭), E♭(3♭), A♭(4♭), D♭(5♭), G♭(6♭). Mỗi bước ngược = thêm 1 flat theo thứ tự B-E-A-D-G-C-F.',
      abc: `X:1
M:4/4
L:1/4
K:Eb
E F G A | B c d e|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '4.5.4',
      title: 'Relative Pairs',
      description:
        'Major + minor cùng vị trí: C/Am, G/Em, F/Dm... Cùng hóa biểu, khác tonic. Đây là cách chuyển mood vui→buồn một cách tự nhiên!',
      abc: `X:1
M:4/4
L:1/4
K:C
C E G c | A, C E A|]`,
      interactive: true,
      playable: true,
    },
  ],
  exercises: [{ type: 'note-id', notes: ['C4', 'G4', 'D4', 'F4', 'Bb4'], questionCount: 5 }],
}
