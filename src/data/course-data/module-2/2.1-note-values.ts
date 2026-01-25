/**
 * Module 2, Submodule 2.1: Giá trị nốt nhạc (Note Values)
 *
 * Learning Journey:
 * 1. Passive: Note Value Tree - branching from whole to smaller notes
 * 2. Guided: Interactive metronome - click along with each note type
 * 3. Interactive: Fill the Bar - drag notes to complete a 4/4 measure
 * 4. Milestone: Play correct rhythm pattern for 8 bars
 *
 * Skipped: Game Journey (to be implemented later)
 */
import type { Submodule } from '../types'

export const SUBMODULE_2_1: Submodule = {
  id: '2.1',
  title: 'Giá trị nốt nhạc',
  description: 'Nhận biết 5 loại nốt: Tròn, Trắng, Đen, Móc đơn, Móc kép và tỷ lệ độ dài',
  sections: ['theory', 'grandStaff', 'abcDemo'],
  theoryContent: `
## 1. Giá trị nốt nhạc là gì?

### Định nghĩa

**Giá trị nốt** (Note Value) cho biết **một nốt kéo dài bao lâu**. Trong âm nhạc, không chỉ có cao độ (nốt gì) mà còn có **độ dài** (bao lâu).

> 🎵 Nếu cao độ là "NÓT GÌ" thì giá trị nốt là "BAO LÂU"!

### Đơn vị đo: Phách (Beat)

**Phách** là đơn vị đo thời gian cơ bản trong âm nhạc. Giống như nhịp tim đập đều đều, phách giúp ta đếm nhịp: 1 - 2 - 3 - 4...

---

## 2. Nốt tròn & Nốt trắng

### Nốt tròn (Whole Note) ○

- **Giá trị**: 4 phách (chiếm cả ô nhịp 4/4)
- **Hình dạng**: Đầu nốt rỗng, KHÔNG có thân
- **Đếm**: 1 - 2 - 3 - 4

{{abc:Nốt tròn: Giữ suốt 4 phách|X:1
M:4/4
L:1/1
K:C
C|]}}

> ⏱️ Khi nhìn thấy nốt tròn, đếm đều "1-2-3-4" rồi mới chuyển sang nốt tiếp theo!

### Nốt trắng (Half Note) 𝅗𝅥

- **Giá trị**: 2 phách (2 nốt trắng = 1 ô nhịp 4/4)
- **Hình dạng**: Đầu nốt rỗng, CÓ thân
- **Đếm**: 1 - 2

{{abc:Nốt trắng: Giữ 2 phách|X:1
M:4/4
L:1/2
K:C
C D|]}}

{{abc:2 nốt trắng = 1 ô nhịp 4/4|X:1
M:4/4
L:1/2
K:C
C E | G B|]}}

---

## 3. Nốt đen - "Nhịp tim" của âm nhạc ♩

### Nốt đen (Quarter Note)

- **Giá trị**: 1 phách = đơn vị đếm cơ bản
- **Hình dạng**: Đầu nốt ĐẶC (tô đen), có thân
- **Đếm**: 1, 2, 3, 4 (mỗi số = 1 nốt đen)

{{abc:Nốt đen: 1 phách mỗi nốt|X:1
M:4/4
L:1/4
K:C
C D E F|]}}

> 💓 Nốt đen giống như **nhịp tim** của bài hát - mỗi lần metronome click = 1 nốt đen!

### So sánh với nốt tròn

**4 nốt đen = 1 nốt tròn**

{{abc:4 nốt đen = 1 ô nhịp|X:1
M:4/4
L:1/4
K:C
C D E F | G A B c|]}}

---

## 4. Nốt móc đơn & Móc kép ♪ 𝅘𝅥𝅯

### Nốt móc đơn (Eighth Note) ♪

- **Giá trị**: 1/2 phách (nhanh gấp đôi nốt đen)
- **Hình dạng**: Đầu nốt đặc, có thân, có **1 đuôi** (flag)
- **Đếm**: 1-và-2-và-3-và-4-và (8 nốt trong 1 ô 4/4)

{{abc:Nốt móc đơn: 8 nốt trong 1 ô nhịp|X:1
M:4/4
L:1/8
K:C
CDEF GABC|]}}

> 📝 Khi có nhiều nốt móc liền nhau, đuôi được nối thành **vạch ngang (beam)** để dễ đọc!

### Nốt móc kép (Sixteenth Note) 𝅘𝅥𝅯

- **Giá trị**: 1/4 phách (nhanh gấp đôi móc đơn)
- **Hình dạng**: Đầu nốt đặc, có thân, có **2 đuôi**
- **Đếm**: 1-e-và-a-2-e-và-a... (16 nốt trong 1 ô 4/4)

{{abc:Nốt móc kép: 16 nốt trong 1 ô nhịp|X:1
M:4/4
L:1/16
K:C
CDEF GABc defg abc'|]}}

---

## 5. Cây giá trị nốt (Note Value Tree) 🌳

### Tỷ lệ chia đôi

Mỗi loại nốt có giá trị **bằng một nửa** loại nốt trước đó:

\`\`\`
       1 Nốt Tròn (4 phách)
           │
     ┌─────┴─────┐
  2 Nốt Trắng (2 phách mỗi nốt)
     │           │
   ┌─┴─┐       ┌─┴─┐
 4 Nốt Đen (1 phách mỗi nốt)
   │   │       │   │
  ├─┤ ├─┤     ├─┤ ├─┤
 8 Nốt Móc đơn (1/2 phách)
 │││││││││││││││
16 Nốt Móc kép (1/4 phách)
\`\`\`

### Bảng tổng hợp

| Loại nốt | Giá trị (phách) | Số lượng trong 1 ô 4/4 | Đặc điểm hình dạng |
|----------|-----------------|------------------------|---------------------|
| **Tròn** ○ | 4 | 1 | Đầu rỗng, không thân |
| **Trắng** 𝅗𝅥 | 2 | 2 | Đầu rỗng, có thân |
| **Đen** ♩ | 1 | 4 | Đầu đặc, có thân |
| **Móc đơn** ♪ | 1/2 | 8 | Đầu đặc, 1 đuôi |
| **Móc kép** 𝅘𝅥𝅯 | 1/4 | 16 | Đầu đặc, 2 đuôi |

> 🔢 **Công thức**: 1 Tròn = 2 Trắng = 4 Đen = 8 Móc đơn = 16 Móc kép

---

## 6. Beam (Vạch nối)

### Tại sao cần Beam?

Khi có nhiều nốt móc liền nhau, thay vì viết từng đuôi riêng lẻ, ta nối chúng bằng **vạch ngang (beam)** để dễ đọc hơn.

{{abc:Nốt rời vs Nốt có beam|X:1
M:4/4
L:1/8
K:C
C D E F G A B c|]}}

### Quy tắc nhóm beam

- Thường nhóm theo **phách** để dễ đếm
- Trong 4/4: thường nhóm 2 hoặc 4 nốt móc đơn
- Beam giúp nhìn ra "nhóm nhịp" ngay lập tức

---

## 7. Kết hợp các loại nốt

### Mix Quarter & Eighth

{{abc:Kết hợp: Nốt đen + Nốt móc đơn|X:1
M:4/4
L:1/8
K:C
C2 DE F2 GA | B2 cd e2 fg|]}}

Trong ví dụ trên:
- C2 = nốt đen (2 × 1/8 = 1/4 = 1 phách)
- DE = 2 móc đơn (1/2 + 1/2 = 1 phách)

### Đếm nhịp kết hợp

> **1** - và - **2** - và - **3** - và - **4** - và
> 
> Chữ in đậm = phách chính, "và" = phách phụ

---

## 🎯 Tóm tắt

1. **Giá trị nốt** = độ dài của nốt nhạc (bao nhiêu phách)
2. Có 5 loại nốt chính: Tròn → Trắng → Đen → Móc đơn → Móc kép
3. Mỗi loại nốt = **1/2 giá trị** của loại trước đó
4. **Nốt đen** = 1 phách = đơn vị cơ bản của việc đếm nhịp
5. **Beam** giúp nhóm các nốt móc để dễ đọc hơn

> 💡 **Mẹo nhớ**: "Tròn-Trắng-Đen-Móc" như bóng đèn tắt dần: từ "rỗng" đến "đặc" rồi thêm "đuôi"!
  `,
  abcDemos: [
    {
      id: '2.1.1',
      title: 'Cây giá trị nốt',
      description:
        'Animation chia nhánh từ nốt tròn xuống các nốt nhỏ hơn. Mỗi nốt tròn = 2 trắng = 4 đen = 8 móc đơn. Quy tắc chia đôi này là nền tảng của toàn bộ hệ thống nhịp điệu!',
      abc: `X:1
M:4/4
L:1/1
K:C
C |]`,
      interactive: true,
      playable: true,
    },
    {
      id: '2.1.2',
      title: '4 nốt đen = 1 ô nhịp',
      description:
        'Pattern cơ bản nhất: C-D-E-F trong nhịp 4/4. Mỗi nốt đen chiếm 1 phách, 4 nốt điền đầy 1 ô nhịp. Đây là nền tảng của hầu hết nhạc Pop/Rock!',
      abc: `X:1
M:4/4
L:1/4
K:C
C D E F|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '2.1.3',
      title: 'Kết hợp Quarter & Eighth',
      description:
        'Kết hợp nốt đen và móc đơn trong cùng ô nhịp: nốt đen = 1 phách, 2 móc đơn = 1 phách. Tổng vẫn bằng 4 phách. Đây là pattern phổ biến nhất trong nhạc đại chúng!',
      abc: `X:1
M:4/4
L:1/8
K:C
C2 DE F2 GA|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '2.1.4',
      title: '16th Note Rush',
      description:
        'Demo nốt móc kép tốc độ cao: 16 nốt trong 1 ô nhịp! Đây là kỹ thuật "chạy ngón" thường thấy trong solo piano, violin, và nhạc cổ điển.',
      abc: `X:1
M:4/4
L:1/16
K:C
CDEF GABc defg abc'|]`,
      interactive: true,
      playable: true,
    },
  ],
  exercises: [
    {
      type: 'rhythm',
      questionCount: 5,
    },
  ],
}
