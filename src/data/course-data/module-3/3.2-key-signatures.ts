/**
 * Module 3, Submodule 3.2: Hóa biểu (Key Signatures)
 *
 * Learning Journey:
 * 1. Passive: Animation sharps/flats appearing in FCGDAEB / BEADGCF order
 * 2. Guided: "Last Sharp + 1/2" and "Second-to-last Flat" rules with examples
 * 3. Interactive: Circle of Fifths - click key to see key signature
 * 4. Milestone: Identify key from any key signature in 10 seconds
 *
 * Skipped: Game Journey (to be implemented later)
 */
import type { Submodule } from '../types'

export const SUBMODULE_3_2: Submodule = {
  id: '3.2',
  title: 'Hóa biểu',
  description: 'Nhớ thứ tự dấu thăng/giáng và xác định giọng từ hóa biểu',
  sections: ['theory', 'abcDemo'],
  theoryContent: `
## 1. Hóa biểu (Key Signature) là gì?

### Định nghĩa

**Hóa biểu** là tập hợp các dấu thăng (♯) hoặc giáng (♭) được viết ở **đầu khuông nhạc**, ngay sau khóa nhạc.

{{abc:Ví dụ: Hóa biểu của G Major (1 sharp)|X:1
L:1/4
K:G
G A B c | d e f g|]}}

> 📝 Hóa biểu cho biết giọng (key) của bài nhạc và áp dụng cho **TOÀN BỘ** bài!

### Tại sao cần hóa biểu?

- Không phải viết dấu hóa trước **mỗi** nốt
- Nhìn là biết ngay "giọng gì"
- Tiết kiệm không gian, dễ đọc

{{quiz:Hóa biểu (Key Signature) là gì?|Dấu hóa viết trước mỗi nốt;*Dấu hóa ở đầu khuông, áp dụng cả bài;Tên của bài hát|Hóa biểu ở đầu khuông nhạc, áp dụng cho TOÀN BỘ bài}}

---

## 2. Thứ tự dấu thăng (Order of Sharps)

### Quy tắc bất biến

Dấu thăng **luôn** xuất hiện theo thứ tự:

> **F - C - G - D - A - E - B**

{{abc:Hóa biểu với 7 dấu thăng (C# Major)|X:1
L:1/4
K:C#
C D E F | G A B c|]}}

### Câu nhớ tiếng Anh

> "**F**ather **C**harles **G**oes **D**own **A**nd **E**nds **B**attle"

### Câu nhớ tiếng Việt

> "**F**a **Đ**ô **S**ol **R**ê **L**a **M**i **S**i" (theo thứ tự quãng 5)

{{quiz:Thứ tự dấu thăng là gì?|B-E-A-D-G-C-F;*F-C-G-D-A-E-B;C-G-D-A-E-B-F|F-C-G-D-A-E-B. Nhớ: "Father Charles Goes Down And Ends Battle"}}

---

## 3. Thứ tự dấu giáng (Order of Flats)

### Quy tắc: Ngược lại với sharps!

> **B - E - A - D - G - C - F**

Đọc ngược: F-C-G-D-A-E-B → B-E-A-D-G-C-F

{{abc:Hóa biểu với 7 dấu giáng (Cb Major)|X:1
L:1/4
K:Cb
C D E F | G A B c|]}}

### Câu nhớ tiếng Anh

> "**B**attle **E**nds **A**nd **D**own **G**oes **C**harles' **F**ather"

### Câu nhớ tiếng Việt

> "**S**i **M**i **L**a **R**ê **S**ol **Đ**ô **F**a" (ngược lại)

{{quiz:Thứ tự dấu giáng là gì?|*B-E-A-D-G-C-F;F-C-G-D-A-E-B;A-E-B-F-C-G-D|B-E-A-D-G-C-F (ngược với thứ tự dấu thăng)}}

---

## 4. Xác định giọng từ hóa biểu

### Quy tắc cho Sharp Keys

> **Dấu thăng cuối + nửa cung lên = Tên giọng Major**

| Số # | Dấu thăng | Dấu cuối | +½ cung | Giọng |
|------|-----------|----------|---------|-------|
| 1# | F# | F# | G | **G Major** |
| 2# | F#, C# | C# | D | **D Major** |
| 3# | F#, C#, G# | G# | A | **A Major** |
| 4# | F#, C#, G#, D# | D# | E | **E Major** |

### Quy tắc cho Flat Keys

> **Dấu giáng kế cuối = Tên giọng Major**

| Số ♭ | Dấu giáng | Kế cuối | Giọng |
|------|-----------|---------|-------|
| 2♭ | B♭, E♭ | B♭ | **B♭ Major** |
| 3♭ | B♭, E♭, A♭ | E♭ | **E♭ Major** |
| 4♭ | B♭, E♭, A♭, D♭ | A♭ | **A♭ Major** |

### Ngoại lệ cần nhớ

| Hóa biểu | Giọng | Ghi nhớ |
|----------|-------|---------|
| 0 dấu | **C Major** | "C = Clean" (không dấu) |
| 1♭ (B♭) | **F Major** | Không có "kế cuối" → nhớ riêng! |

{{quiz:Nếu hóa biểu có 3 dấu thăng (F#, C#, G#), giọng là gì?|G Major;*A Major;E Major|Dấu thăng cuối là G#, +1/2 cung = A → A Major}}

{{quiz:Nếu hóa biểu có 2 dấu giáng (B♭, E♭), giọng là gì?|E♭ Major;*B♭ Major;F Major|Dấu giáng kế cuối là B♭ → B♭ Major}}

---

## 5. Bảng tra cứu nhanh

### Sharp Keys (bên phải Circle of Fifths)

| Giọng | Số # | Các dấu thăng |
|-------|------|---------------|
| C Major | 0 | (không) |
| G Major | 1 | F# |
| D Major | 2 | F#, C# |
| A Major | 3 | F#, C#, G# |
| E Major | 4 | F#, C#, G#, D# |
| B Major | 5 | F#, C#, G#, D#, A# |
| F# Major | 6 | F#, C#, G#, D#, A#, E# |
| C# Major | 7 | Tất cả |

### Flat Keys (bên trái Circle of Fifths)

| Giọng | Số ♭ | Các dấu giáng |
|-------|------|---------------|
| C Major | 0 | (không) |
| F Major | 1 | B♭ |
| B♭ Major | 2 | B♭, E♭ |
| E♭ Major | 3 | B♭, E♭, A♭ |
| A♭ Major | 4 | B♭, E♭, A♭, D♭ |
| D♭ Major | 5 | B♭, E♭, A♭, D♭, G♭ |
| G♭ Major | 6 | B♭, E♭, A♭, D♭, G♭, C♭ |
| C♭ Major | 7 | Tất cả |

---

## 6. Circle of Fifths Preview

### Vòng tròn bậc 5

**Circle of Fifths** tổ chức tất cả 12 giọng thành vòng tròn:

- **C ở 12 giờ** (0 dấu)
- **Chiều kim đồng hồ**: +1# mỗi bước (G → D → A → E...)
- **Ngược chiều**: +1♭ mỗi bước (F → B♭ → E♭ → A♭...)

\`\`\`
        C (0)
    F (1♭)   G (1#)
  B♭ (2♭)     D (2#)
 E♭ (3♭)       A (3#)
A♭ (4♭)         E (4#)
 D♭ (5♭)       B (5#)
  G♭/F# (6♭/6#)
\`\`\`

> 🔄 Sẽ học chi tiết Circle of Fifths ở Module 4!

---

## 7. Vị trí dấu hóa trên khuông

### Sharp positions

Dấu thăng được viết trên các dòng/khe cố định:
- F# → dòng 5 (trên cùng)
- C# → khe 3
- G# → dòng 4...

### Flat positions

Dấu giáng theo thứ tự "ngược" trên khuông:
- B♭ → dòng 3 (giữa)
- E♭ → khe 4
- A♭ → dòng 2...

---

## 🎯 Tóm tắt

1. **Hóa biểu** = Dấu hóa ở đầu khuông, áp dụng cả bài
2. **Thứ tự thăng**: F-C-G-D-A-E-B ("Father Charles...")
3. **Thứ tự giáng**: B-E-A-D-G-C-F (ngược lại)
4. **Sharp keys**: Dấu cuối + ½ cung = Tên giọng
5. **Flat keys**: Dấu kế cuối = Tên giọng
6. **Ngoại lệ**: C Major (0 dấu), F Major (1♭)

> 💡 **Mẹo**: BEAD = Tiếng Anh là "hạt cườm" → B-E-A-D là 4 dấu giáng đầu tiên!
  `,
  abcDemos: [
    {
      id: '3.2.1',
      title: 'Order of Sharps Animation',
      description:
        'F-C-G-D-A-E-B lần lượt xuất hiện trên khuông nhạc. Mỗi sharp mới thêm vào = đổi sang giọng mới theo Circle of Fifths: C→G→D→A→E→B→F#→C#.',
      abc: `X:1
M:4/4
L:1/4
K:C#
C D E F | G A B c|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '3.2.2',
      title: 'Order of Flats Animation',
      description:
        'B-E-A-D-G-C-F lần lượt xuất hiện (ngược với sharps). Mỗi flat mới = đổi giọng theo Circle ngược chiều: C→F→Bb→Eb→Ab→Db→Gb→Cb.',
      abc: `X:1
M:4/4
L:1/4
K:Cb
C D E F | G A B c|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '3.2.3',
      title: 'Key ID Practice',
      description:
        'Flashcard random key signatures: Nhìn hóa biểu → áp dụng quy tắc → xác định giọng. Sharp keys: dấu cuối +½. Flat keys: dấu kế cuối. Thực hành để thành thạo!',
      abc: `X:1
M:4/4
L:1/4
K:A
A B c d | e f g a|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '3.2.4',
      title: 'Circle of Fifths',
      description:
        'Interactive circle: click vào bất kỳ giọng → hiện hóa biểu tương ứng. C ở 12 giờ, đi thuận tăng sharp, đi ngược tăng flat. Đây là "bản đồ" quan trọng nhất của nhạc lý!',
      abc: `X:1
M:4/4
L:1/4
K:G
G A B c | d e f g|]`,
      interactive: true,
      playable: true,
    },
  ],
  exercises: [
    {
      type: 'note-id',
      notes: ['C4', 'G4', 'D4', 'A4', 'E4', 'F4', 'Bb4', 'Eb4'],
      questionCount: 5,
    },
  ],
}
