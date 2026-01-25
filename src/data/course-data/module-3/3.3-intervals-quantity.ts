/**
 * Module 3, Submodule 3.3: Quãng - Số lượng (Intervals - Quantity)
 *
 * Learning Journey:
 * 1. Passive: Animation counting interval from C to E: C(1)-D(2)-E(3) = 3rd
 * 2. Guided: Click 2 notes on staff → system auto-counts and shows result
 * 3. Interactive: "Interval Spotter" - see 2 notes → guess interval number
 * 4. Milestone: Count intervals from 2nd to Octave in speed game
 *
 * Skipped: Game Journey (to be implemented later)
 */
import type { Submodule } from '../types'

export const SUBMODULE_3_3: Submodule = {
  id: '3.3',
  title: 'Quãng - Số lượng',
  description: 'Đếm quãng bằng cách đếm TẤT CẢ các nốt (bao gồm cả nốt đầu)',
  sections: ['theory', 'abcDemo'],
  theoryContent: `
## 1. Quãng (Interval) là gì?

### Định nghĩa

**Quãng (Interval)** là khoảng cách về cao độ giữa hai nốt nhạc.

- **Melodic interval**: Hai nốt chơi **nối tiếp** (giai điệu)
- **Harmonic interval**: Hai nốt chơi **cùng lúc** (hòa âm)

> 🎵 Quãng là "nguyên liệu" của giai điệu và hòa âm!

{{quiz:Quãng (Interval) là gì?|Tên của nốt;*Khoảng cách về cao độ giữa 2 nốt;Độ dài của nốt|Quãng = khoảng cách cao độ giữa 2 nốt nhạc}}

---

## 2. Cách đếm quãng

### Quy tắc vàng: Đếm CẢ nốt đầu!

> **Đếm TẤT CẢ các nốt từ nốt đầu đến nốt cuối, bao gồm cả hai!**

### Ví dụ: C lên E

\`\`\`
C   D   E
1   2   3  → Quãng 3 (Third)
\`\`\`

{{abc:C lên E = Quãng 3|X:1
L:1/2
K:C
C E|]}}

### Sai lầm phổ biến

❌ **Sai**: Đếm "bước đi" (C→D là 1, D→E là 2 → "Quãng 2")

✅ **Đúng**: Đếm "số nốt" (C=1, D=2, E=3 → "Quãng 3")

{{quiz:Khi đếm quãng, nốt đầu được tính là bao nhiêu?|0;*1;2|Đếm cả nốt đầu là 1! C(1)→D(2)→E(3) = Quãng 3}}

{{quiz:C lên G là quãng mấy?|4;*5;6|C(1)-D(2)-E(3)-F(4)-G(5) = Quãng 5}}

---

## 3. Các quãng cơ bản (2nd đến 8ve)

### Quãng 2 (Second)

- **Pattern**: Dòng-Khe liền kề
- **Âm thanh**: Bước đi gần, căng thẳng

{{abc:Quãng 2: C-D|X:1
L:1/2
K:C
C D|]}}

### Quãng 3 (Third)

- **Pattern**: Dòng-Dòng hoặc Khe-Khe kế tiếp
- **Âm thanh**: "Người tuyết" - nền tảng của hợp âm

{{abc:Quãng 3: C-E|X:1
L:1/2
K:C
C E|]}}

### Quãng 4 (Fourth)

- **Pattern**: Skip 1 dòng/khe
- **Âm thanh**: "Here Comes The Bride"

{{abc:Quãng 4: C-F|X:1
L:1/2
K:C
C F|]}}

### Quãng 5 (Fifth)

- **Pattern**: Skip 2 dòng/khe
- **Âm thanh**: Power chord! "Star Wars"

{{abc:Quãng 5: C-G|X:1
L:1/2
K:C
C G|]}}

### Quãng 6 (Sixth)

- **Pattern**: Rất rộng
- **Âm thanh**: "My Bonnie lies over..."

{{abc:Quãng 6: C-A|X:1
L:1/2
K:C
C A|]}}

### Quãng 7 (Seventh)

- **Pattern**: Rộng nhất trước octave
- **Âm thanh**: Căng thẳng, cần giải quyết

{{abc:Quãng 7: C-B|X:1
L:1/2
K:C
C B|]}}

### Quãng 8 (Octave)

- **Pattern**: Như sinh đôi - cùng tên, khác tầng
- **Âm thanh**: Hoàn hảo, đồng nhất

{{abc:Quãng 8: C-c (octave)|X:1
L:1/2
K:C
C c|]}}

{{quiz:Quãng 5 (C→G) có âm thanh đặc trưng gì?|Buồn bã;*Mạnh mẽ như Power chord;Căng thẳng|Quãng 5 là nền tảng của Power chord trong Rock!}}

---

## 4. Bảng tổng hợp

| Quãng | Số nốt | Ví dụ | Pattern trên khuông |
|-------|--------|-------|---------------------|
| **Unison** | 1 | C-C | Cùng vị trí |
| **2nd** | 2 | C-D | Liền kề (dòng↔khe) |
| **3rd** | 3 | C-E | Skip 1 (dòng↔dòng) |
| **4th** | 4 | C-F | Skip 2 |
| **5th** | 5 | C-G | Skip 3 |
| **6th** | 6 | C-A | Skip 4 |
| **7th** | 7 | C-B | Skip 5 |
| **Octave** | 8 | C-c | Skip 6 (cùng tên) |

---

## 5. Nhận dạng trực quan trên khuông

### "Người tuyết" Pattern

Khi 2 nốt đều nằm trên **dòng** hoặc đều nằm trong **khe**:

- Dòng↔Dòng liền kề = **Quãng 3**
- Khe↔Khe liền kề = **Quãng 3**

{{abc:Quãng 3: Cả hai trên dòng|X:1
L:1/2
K:C
E G|]}}

### "Lệch nhau" Pattern

Khi 1 nốt trên dòng, 1 nốt trong khe:

- Liền kề = **Quãng 2** (hoặc quãng chẵn)

{{abc:Quãng 2: Dòng-Khe liền kề|X:1
L:1/2
K:C
E F|]}}

---

## 6. Melodic vs Harmonic Interval

### Melodic Interval (Quãng giai điệu)

Hai nốt chơi **lần lượt** - tạo thành giai điệu.

{{abc:Melodic: C rồi đến G|X:1
L:1/2
K:C
C G|]}}

### Harmonic Interval (Quãng hòa âm)

Hai nốt chơi **cùng lúc** - tạo thành hòa âm.

{{abc:Harmonic: C và G cùng lúc|X:1
L:1/2
K:C
[CG]2|]}}

> 🎹 Melodic = Ngang (theo thời gian), Harmonic = Dọc (cùng thời điểm)

{{quiz:Melodic interval và Harmonic interval khác nhau ở điểm nào?|Số nốt;*Cách chơi (nối tiếp vs cùng lúc);Cao độ|Melodic = nối tiếp (giai điệu), Harmonic = cùng lúc (hòa âm)}}

---

## 7. Đếm nhanh: Mẹo thực hành

### Sử dụng bàn tay

- Nốt đầu = ngón cái (1)
- Đếm lên từng ngón
- Nốt cuối = số ngón = quãng

### Đếm trên khuông

1. Đánh dấu nốt đầu = 1
2. Đếm mỗi dòng + khe cho đến nốt cuối
3. Số cuối cùng = tên quãng

---

## 🎯 Tóm tắt

1. **Quãng** = Khoảng cách giữa 2 nốt
2. Đếm **TẤT CẢ** các nốt (bao gồm cả nốt đầu = 1)
3. C→D = 2, C→E = 3, C→F = 4, C→G = 5...
4. **Melodic** = nối tiếp, **Harmonic** = cùng lúc
5. Pattern: Dòng↔Dòng hoặc Khe↔Khe = quãng lẻ (3, 5, 7)

> 💡 **Mẹo**: Quãng 3 trông như "người tuyết" - 2 hình tròn chồng lên nhau!
  `,
  abcDemos: [
    {
      id: '3.3.1',
      title: 'Interval Counting',
      description:
        'Animation đếm từng bước: C(1) → D(2) → E(3) = Quãng 3. Lưu ý: luôn đếm nốt đầu là 1, không phải 0! Đây là sai lầm phổ biến nhất của người học.',
      abc: `X:1
M:4/4
L:1/2
K:C
C E | C G |]`,
      interactive: true,
      playable: true,
    },
    {
      id: '3.3.2',
      title: 'Interval Gallery',
      description:
        'Tất cả quãng từ 2nd đến 8ve: 2nd (C-D), 3rd (C-E), 4th (C-F), 5th (C-G), 6th (C-A), 7th (C-B), 8ve (C-c). Nghe và cảm nhận "màu sắc" của từng quãng!',
      abc: `X:1
M:4/4
L:1/4
K:C
C D C E | C F C G | C A C B | C c|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '3.3.3',
      title: 'Melodic vs Harmonic',
      description:
        'So sánh 2 cách chơi interval: Melodic (C rồi G - nối tiếp) vs Harmonic (C+G cùng lúc). Cùng quãng 5, nhưng melodic nghe như giai điệu, harmonic nghe như hợp âm!',
      abc: `X:1
M:4/4
L:1/2
K:C
C G | [CG]2 |]`,
      interactive: true,
      playable: true,
    },
  ],
  exercises: [
    {
      type: 'interval',
      questionCount: 5,
    },
  ],
}
