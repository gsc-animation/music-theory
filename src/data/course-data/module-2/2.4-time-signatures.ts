/**
 * Module 2, Submodule 2.4: Nhịp đơn (Simple Time Signatures)
 *
 * Learning Journey:
 * 1. Passive: Animation explaining top/bottom number meanings
 * 2. Guided: Listen to 3 familiar songs → guess if it's 4/4, 3/4, or 2/4
 * 3. Interactive: Metronome switching between time signatures
 * 4. Milestone: Distinguish and tap correct strong/weak beats for all 3 types
 *
 * Skipped: Game Journey (to be implemented later)
 */
import type { Submodule } from '../types'

export const SUBMODULE_2_4: Submodule = {
  id: '2.4',
  title: 'Nhịp đơn',
  description: 'Hiểu ý nghĩa số trên/dưới và phân biệt nhịp 4/4, 3/4, 2/4',
  sections: ['theory', 'abcDemo'],
  theoryContent: `
## 1. Time Signature là gì?

### Hai con số bí ẩn

Ở đầu mỗi bản nhạc, bạn sẽ thấy **2 con số xếp chồng** như phân số. Đây là **Time Signature** (Chỉ số nhịp).

\`\`\`
  4   ← Số trên: Số phách trong 1 ô nhịp
  4   ← Số dưới: Loại nốt = 1 phách
\`\`\`

### Giải mã

| Vị trí | Ý nghĩa | Ví dụ 4/4 |
|--------|---------|-----------|
| **Số trên** | Số phách trong mỗi ô nhịp | 4 phách mỗi ô |
| **Số dưới** | Loại nốt được tính là 1 phách | 4 = Nốt đen |

### Số dưới phổ biến

| Số | Loại nốt = 1 phách |
|----|-------------------|
| **2** | Nốt trắng (Half note) |
| **4** | Nốt đen (Quarter note) |
| **8** | Nốt móc đơn (Eighth note) |

{{quiz:Số trên trong Time Signature cho biết điều gì?|Loại nốt = 1 phách;*Số phách trong 1 ô nhịp;Tốc độ bài hát|Số trên = số phách mỗi ô nhịp. Ví dụ: 4/4 có 4 phách mỗi ô}}

{{quiz:Trong nhịp 4/4, số 4 ở dưới có nghĩa là gì?|4 phách mỗi ô;*Nốt đen = 1 phách;4 ô nhịp|Số dưới cho biết loại nốt được tính là 1 phách. 4 = Nốt đen}}

---

## 2. Nhịp 4/4 - "Common Time"

### Đặc điểm

- **4 phách** trong mỗi ô nhịp
- **Nốt đen** = 1 phách
- Ký hiệu thay thế: **C** (Common Time)

{{abc:Nhịp 4/4: 4 phách mỗi ô|X:1
M:4/4
L:1/4
K:C
C D E F | G A B c|]}}

> 🎵 **Phổ biến nhất!** Hầu hết nhạc Pop, Rock, R&B, Hip-hop đều dùng 4/4.

### Đếm nhịp

> **1** - 2 - 3 - 4 | **1** - 2 - 3 - 4
>
> (Phách 1 mạnh nhất)

{{quiz:Nhịp nào là phổ biến nhất trong nhạc Pop và Rock?|2/4;3/4;*4/4|4/4 (Common Time) là nhịp phổ biến nhất trong hầu hết nhạc đại chúng}}

---

## 3. Nhịp 3/4 - "Waltz Time"

### Đặc điểm

- **3 phách** trong mỗi ô nhịp
- **Nốt đen** = 1 phách
- Cảm giác "dập dình" 1-2-3, 1-2-3

{{abc:Nhịp 3/4: 3 phách mỗi ô (Waltz)|X:1
M:3/4
L:1/4
K:C
C D E | F G A | B c d|]}}

> 💃 **Waltz!** The Blue Danube, các điệu luân vũ, nhạc dân gian châu Âu.

### Đếm nhịp

> **1** - 2 - 3 | **1** - 2 - 3
>
> (Nhấn mạnh phách 1, nhẹ phách 2-3)

{{quiz:Nhịp 3/4 thường dùng cho loại nhạc nào?|March (hành khúc);*Waltz (luân vũ);Pop/Rock|3/4 có cảm giác "dập dình" 1-2-3, rất đặc trưng của Waltz}}

---

## 4. Nhịp 2/4 - "March Time"

### Đặc điểm

- **2 phách** trong mỗi ô nhịp
- **Nốt đen** = 1 phách
- Cảm giác "trái-phải" như đi diễu hành

{{abc:Nhịp 2/4: 2 phách mỗi ô (March)|X:1
M:2/4
L:1/4
K:C
C D | E F | G A | B c|]}}

> 🎺 **March!** Nhạc hành quân, polka, một số nhạc dân gian.

### Đếm nhịp

> **1** - 2 | **1** - 2 | **TRÁI** - phải | **TRÁI** - phải

---

## 5. Phách mạnh & Phách nhẹ (Strong & Weak Beats)

### Quy tắc quan trọng

**Phách 1 luôn MẠNH nhất** trong mọi nhịp!

### Bảng phách mạnh/nhẹ

| Nhịp | Phách 1 | Phách 2 | Phách 3 | Phách 4 |
|------|---------|---------|---------|---------|
| **4/4** | 🔴 Mạnh | ⚪ Nhẹ | 🟠 Vừa | ⚪ Nhẹ |
| **3/4** | 🔴 Mạnh | ⚪ Nhẹ | ⚪ Nhẹ | - |
| **2/4** | 🔴 Mạnh | ⚪ Nhẹ | - | - |

### Visualize với kích thước

**4/4**: ● ○ ◐ ○ (Mạnh - Nhẹ - Vừa - Nhẹ)

**3/4**: ● ○ ○ (Mạnh - Nhẹ - Nhẹ)

**2/4**: ● ○ (Mạnh - Nhẹ)

> 🥁 Drummer và bassist thường nhấn mạnh phách 1 để tạo "nền móng" cho bản nhạc!

{{quiz:Trong mọi loại nhịp, phách nào LUÔN mạnh nhất?|Phách cuối cùng;*Phách 1;Phách giữa|Phách 1 luôn là Downbeat - phách mạnh nhất trong ô nhịp}}

{{quiz:Trong nhịp 4/4, phách nào được coi là "vừa vừa"?|Phách 2;*Phách 3;Phách 4|4/4: Phách 1 mạnh, 3 vừa (downbeat phụ), 2 và 4 nhẹ}}

---

## 6. Downbeat & Upbeat

### Downbeat - Phách xuống

**Downbeat** là phách ĐẦU TIÊN của mỗi ô nhịp - phách mạnh nhất.

- Tay chỉ huy đánh XUỐNG
- Thường là lúc hợp âm đổi
- Bass drum thường đánh ở đây

### Upbeat (Anacrusis) - Phách lấy đà

**Upbeat** là nốt/phách TRƯỚC ô nhịp đầu tiên - dùng để "lấy đà".

{{abc:Upbeat: Nốt G là phách lấy đà|X:1
M:4/4
L:1/4
K:C
G | C D E F | G A B c|]}}

> 🎤 Nhiều bài hát bắt đầu bằng upbeat: "Oh **say** can you **see**..." (phách 4 là upbeat).

---

## 7. Cảm nhận nhịp qua bài hát

### Nhịp 4/4 (Pop/Rock)

- "We Will Rock You" - Queen
- "Shape of You" - Ed Sheeran
- Hầu hết mọi bài Pop!

### Nhịp 3/4 (Waltz)

- "The Blue Danube" - Strauss
- "My Favorite Things" - Sound of Music
- "Kiss From a Rose" - Seal

### Nhịp 2/4 (March/Polka)

- "Stars and Stripes Forever"
- Nhạc diễu hành quân đội
- Polka truyền thống

---

## 🎯 Tóm tắt

1. **Số trên** = Số phách trong ô nhịp
2. **Số dưới** = Loại nốt = 1 phách (4 = đen, 2 = trắng, 8 = móc)
3. **4/4** = 4 phách, phổ biến nhất (Pop/Rock)
4. **3/4** = 3 phách, Waltz (1-2-3, 1-2-3)
5. **2/4** = 2 phách, March (trái-phải)
6. **Phách 1** luôn là phách **MẠNH NHẤT**

> 💡 **Mẹo nhận biết**: 
> - Nghe thấy "dập dình" → 3/4
> - Nghe thấy "hành quân" → 2/4
> - Còn lại → khả năng cao là 4/4!
  `,
  abcDemos: [
    {
      id: '2.4.1',
      title: 'Time Signature Explainer',
      description:
        'Giải thích số trên/dưới với animation. Số 4 ở trên = 4 phách mỗi ô. Số 4 ở dưới = nốt đen được đếm là 1 phách. Đơn giản vậy thôi!',
      abc: `X:1
M:4/4
L:1/4
K:C
C D E F | G A B c|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '2.4.2',
      title: '4/4 vs 3/4 vs 2/4',
      description:
        'So sánh 3 loại nhịp với cùng giai điệu. Chú ý sự khác biệt: 4/4 ổn định như pop, 3/4 dập dình như waltz, 2/4 gọn gàng như march. Cảm giác hoàn toàn khác nhau!',
      abc: `X:1
M:4/4
L:1/4
K:C
C D E F | G2 E2 |]`,
      interactive: true,
      playable: true,
    },
    {
      id: '2.4.3',
      title: 'Strong/Weak Beat Demo',
      description:
        'Visual với dot size khác nhau: phách 1 lớn nhất (mạnh), các phách khác nhỏ hơn (nhẹ). Trong 4/4: phách 3 "vừa vừa" vì nó là downbeat phụ của nửa sau ô nhịp.',
      abc: `X:1
M:4/4
L:1/4
K:C
C G, C G, | C G, C G,|]`,
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
