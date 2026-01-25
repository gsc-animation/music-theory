/**
 * Module 2, Submodule 2.3: Nốt chấm & Dây liên (Dotted Notes & Ties)
 *
 * Learning Journey:
 * 1. Passive: Animation "Note + 50% = Dotted Note" formula
 * 2. Guided: Interactive calculator - select note → show dotted value
 * 3. Interactive: Distinguish Tie vs Slur via audio and visual comparison
 * 4. Milestone: Play music with both dotted notes and ties
 *
 * Skipped: Game Journey (to be implemented later)
 */
import type { Submodule } from '../types'

export const SUBMODULE_2_3: Submodule = {
  id: '2.3',
  title: 'Nốt chấm & Dây liên',
  description: 'Tính giá trị nốt chấm và phân biệt Tie (cùng pitch) với Slur (khác pitch)',
  sections: ['theory', 'grandStaff', 'abcDemo'],
  theoryContent: `
## 1. Nốt chấm (Dotted Notes)

### Quy tắc vàng: +50%

Khi thêm **dấu chấm** (dot) vào sau nốt, giá trị nốt được **tăng thêm 50%** (một nửa giá trị gốc).

> 🔢 **Công thức**: Nốt chấm = Giá trị gốc + 50% = Giá trị gốc × 1.5

### Ví dụ tính toán

| Loại nốt | Giá trị gốc | +50% | Giá trị chấm |
|----------|-------------|------|--------------|
| Nốt đen chấm | 1 phách | +0.5 | **1.5 phách** |
| Nốt trắng chấm | 2 phách | +1 | **3 phách** |
| Nốt tròn chấm | 4 phách | +2 | **6 phách** |
| Móc đơn chấm | 0.5 phách | +0.25 | **0.75 phách** |

---

## 2. Nốt đen chấm (Dotted Quarter)

### Giá trị: 1.5 phách

{{abc:Nốt đen chấm = 1.5 phách|X:1
M:4/4
L:1/8
K:C
C3 D C3 D|]}}

Trong ví dụ trên:
- **C3** = nốt đen chấm (1.5 phách = 3 × 1/8)
- **D** = móc đơn (0.5 phách = 1 × 1/8)
- Tổng: 1.5 + 0.5 = 2 phách ✅

> 🎵 Pattern "Nốt đen chấm + móc đơn" rất phổ biến trong nhạc Pop và Country!

---

## 3. Nốt trắng chấm (Dotted Half)

### Giá trị: 3 phách

{{abc:Nốt trắng chấm = 3 phách|X:1
M:4/4
L:1/4
K:C
C3 D|]}}

Trong ví dụ trên:
- **C3** = nốt trắng chấm (3 phách)
- **D** = nốt đen (1 phách)
- Tổng: 3 + 1 = 4 phách ✅

> 💡 Nốt trắng chấm thường dùng trong nhịp 3/4 (Waltz) vì nó điền đầy 1 ô nhịp!

---

## 4. Dây liên (Tie)

### Định nghĩa

**Dây liên (Tie)** là đường cong nối 2 nốt có **CÙNG cao độ**, biến chúng thành **1 âm thanh dài**.

{{abc:Tie: 2 nốt trắng cùng cao độ = 4 phách|X:1
M:4/4
L:1/2
K:C
C-C|]}}

> ⚠️ **Quan trọng**: Khi có tie, bạn chỉ **đánh 1 lần** nhưng **giữ tiếng** qua cả 2 nốt!

### Tie xuyên ô nhịp

Tie thường dùng để kéo dài nốt **qua vạch ô nhịp**:

{{abc:Tie xuyên qua vạch ô nhịp|X:1
M:4/4
L:1/2
K:C
CD | E-E | FG | A-A|]}}

### Tại sao cần Tie?

1. Kéo dài nốt qua ô nhịp (không thể dùng 1 nốt duy nhất)
2. Tạo giá trị "kỳ lạ" (ví dụ: 5 phách = 4 + 1 tie)
3. Thể hiện syncopation phức tạp

---

## 5. Tie vs Slur - Khác biệt quan trọng!

### So sánh trực quan

| Đặc điểm | **Tie** (Dây liên) | **Slur** (Dây luyến) |
|----------|-------------------|---------------------|
| Cao độ | **CÙNG** cao độ | **KHÁC** cao độ |
| Số lần đánh | 1 lần | Nhiều lần |
| Mục đích | Kéo dài âm thanh | Chơi legato (mượt) |
| Hình dạng | Đường cong nối 2 nốt CÙNG độ cao | Đường cong nối nhiều nốt KHÁC độ cao |

### Ví dụ Tie (cùng cao độ)

{{abc:TIE: C-C cùng cao độ, đánh 1 lần|X:1
M:4/4
L:1/4
K:C
C-C D E|]}}

### Ví dụ Slur (khác cao độ)

{{abc:SLUR: C-D-E khác cao độ, đánh 3 lần mượt mà|X:1
M:4/4
L:1/4
K:C
(CDE) F|]}}

> 🎹 **Slur** yêu cầu chơi **legato** - các nốt nối liền không có khoảng nghỉ giữa chúng.

---

## 6. Chấm đôi (Double Dot)

### Thêm 25% nữa!

Một số nốt có **2 dấu chấm** (double dot). Chấm thứ hai thêm **25%** giá trị gốc.

> 🔢 **Công thức**: Nốt chấm đôi = Gốc + 50% + 25% = Gốc × 1.75

| Loại nốt | Gốc | +50% | +25% | Tổng |
|----------|-----|------|------|------|
| Đen chấm đôi | 1 | +0.5 | +0.25 | **1.75 phách** |
| Trắng chấm đôi | 2 | +1 | +0.5 | **3.5 phách** |

> 💡 Chấm đôi ít gặp hơn chấm đơn, thường thấy trong nhạc cổ điển.

---

## 7. Ứng dụng thực tế

### Nhạc Waltz (3/4)

{{abc:Waltz: Nốt trắng chấm điền đầy ô 3/4|X:1
M:3/4
L:1/4
K:C
C3 | D3 | E3 | F3|]}}

### Nhạc Pop (Dotted Quarter Pattern)

{{abc:Pop rhythm với nốt đen chấm|X:1
M:4/4
L:1/8
K:C
C3 D E3 F | G3 A B3 c|]}}

---

## 🎯 Tóm tắt

1. **Nốt chấm** = Giá trị gốc + 50% (+nửa giá trị)
2. **Tie** = Nối 2 nốt **CÙNG cao độ** → 1 âm dài, đánh 1 lần
3. **Slur** = Nối nhiều nốt **KHÁC cao độ** → chơi legato, đánh nhiều lần
4. **Nốt đen chấm** = 1.5 phách (phổ biến nhất!)
5. **Nốt trắng chấm** = 3 phách (điền đầy ô nhịp 3/4)

> 💡 **Mẹo phân biệt Tie vs Slur**: Nhìn cao độ! Cùng cao độ = Tie, Khác cao độ = Slur.
  `,
  abcDemos: [
    {
      id: '2.3.1',
      title: 'Dotted Note Calculator',
      description:
        'Interactive: chọn loại nốt → hiện giá trị chấm. Nốt đen (1 phách) + 50% = 1.5 phách. Nốt trắng (2 phách) + 50% = 3 phách. Quy tắc "+50%" áp dụng cho mọi loại nốt!',
      abc: `X:1
M:4/4
L:1/8
K:C
C3 D E3 F | G3 A B3 c|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '2.3.2',
      title: 'Tie xuyên ô nhịp',
      description:
        'Demo tie xuyên ô nhịp: nốt E ở cuối ô 1 được tie với nốt E đầu ô 2. Bạn chỉ đánh E một lần nhưng giữ tiếng xuyên qua vạch nhịp - tổng cộng 4 phách!',
      abc: `X:1
M:4/4
L:1/2
K:C
CD | E-E | FG | A2|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '2.3.3',
      title: 'Tie vs Slur',
      description:
        'Side-by-side comparison với audio. Tie (C-C): cùng cao độ, đánh 1 lần. Slur (C-D-E): khác cao độ, đánh 3 lần nhưng mượt mà liền mạch (legato). Âm thanh hoàn toàn khác nhau!',
      abc: `X:1
M:4/4
L:1/4
K:C
C-C E G | (CDE) G|]`,
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
