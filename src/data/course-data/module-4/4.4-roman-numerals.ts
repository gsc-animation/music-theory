/**
 * Module 4, Submodule 4.4: Ký hiệu số La Mã (Roman Numeral Analysis)
 */
import type { Submodule } from '../types'

export const SUBMODULE_4_4: Submodule = {
  id: '4.4',
  title: 'Ký hiệu số La Mã',
  description: 'Hiểu tại sao dùng số La Mã (transpose dễ dàng) và Nashville Number System',
  sections: ['theory', 'grandStaff', 'abcDemo'],
  theoryContent: `
## 1. Tại sao dùng số La Mã?

### Vấn đề

Cùng một bài hát, nhưng:
- Ca sĩ A muốn hát ở C Major: C-G-Am-F
- Ca sĩ B muốn hát ở G Major: G-D-Em-C

### Giải pháp: Số La Mã!

Thay vì viết tên hợp âm cụ thể, viết **bậc**:

> **I - V - vi - IV**

Áp dụng cho BẤT KỲ giọng nào!

---

## 2. Quy tắc viết

### Chữ hoa vs Chữ thường

| Ký hiệu | Tính chất | Ví dụ trong C |
|---------|-----------|---------------|
| **I, IV, V** (hoa) | Major | C, F, G |
| **ii, iii, vi** (thường) | minor | Dm, Em, Am |
| **vii°** | diminished | Bdim |

### Ký hiệu đặc biệt

- **°** = diminished (C°)
- **+** = augmented (C+)
- **7** = seventh chord (V7)

---

## 3. Nashville Number System

### Phổ biến trong studio

Thay vì viết I-ii-iii-IV, Nashville system dùng số Ả Rập:

> **1 - 5 - 6m - 4**

Nốt thứ được đánh dấu "m": 6m = vi (Am trong C)

### Ưu điểm

- Nhanh hơn khi ghi chép
- Dễ đọc real-time
- Transpose ngay lập tức

---

## 4. I-V-vi-IV - "The Axis"

### Progression phổ biến nhất thế giới

{{abc:I-V-vi-IV trong C Major: C-G-Am-F|X:1
M:4/4
L:1/1
K:C
[CEG] | [GBd] | [Ace] | [FAc]|]}}

{{abc:I-V-vi-IV trong G Major: G-D-Em-C|X:1
M:4/4
L:1/1
K:G
[GBd] | [D^FA] | [EGB] | [CEG]|]}}

### Nghe giống hệt về "tình cảm"!

Dù chữ cái khác nhau, **cảm xúc** giống nhau vì quan hệ giữa các bậc không đổi.

---

## 5. Transpose dễ dàng

### Công thức

1. Biết progression ở giọng A: A-E-F#m-D
2. Chuyển thành số: **I-V-vi-IV**
3. Áp dụng cho giọng mới (E): E-B-C#m-A

### Bảng chuyển đổi nhanh

| Bậc | C | G | D | A | E | F | Bb |
|-----|---|---|---|---|---|---|-----|
| I | C | G | D | A | E | F | Bb |
| IV | F | C | G | D | A | Bb | Eb |
| V | G | D | A | E | B | C | F |
| vi | Am | Em | Bm | F#m | C#m | Dm | Gm |

---

## 6. Phân tích bài hát

### "Let It Be" - Beatles

Progression: C - G - Am - F

Phân tích: **I - V - vi - IV** (trong C Major)

### "Someone Like You" - Adele

Progression: A - E - F#m - D

Phân tích: **I - V - vi - IV** (trong A Major)

> 🎵 Cùng progression, khác giọng, khác bài hát!

---

## 🎯 Tóm tắt

1. **Số La Mã** đại diện cho BẬC, không phải tên hợp âm cụ thể
2. **Chữ hoa** = Major, **Chữ thường** = minor
3. **I-V-vi-IV** = Progression "huyền thoại"
4. Transpose: Giữ nguyên số, đổi giọng
5. **Nashville system**: 1-5-6m-4 (nhanh gọn)

> 💡 **Mẹo**: Học bằng số = 1 lần học, chơi được MỌI giọng!
  `,
  abcDemos: [
    {
      id: '4.4.1',
      title: 'Roman Numeral Chart',
      description: 'I-ii-iii-IV-V-vi-vii° reference. Chữ hoa = Major, chữ thường = minor, ° = diminished. Đây là "ngôn ngữ chung" của nhạc sĩ toàn thế giới!',
      abc: `X:1
M:4/4
L:1/2
K:C
[CEG] [DFA] | [EGB] [FAc] | [GBd] [Ace] | [Bdf]2|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '4.4.2',
      title: 'I-V-vi-IV in C, G, D',
      description: 'Same progression, 3 keys: C(C-G-Am-F), G(G-D-Em-C), D(D-A-Bm-G). Nghe giống nhau về "feel" vì quan hệ giữa các bậc không đổi!',
      abc: `X:1
M:4/4
L:1/1
K:C
"C" [CEG] [GBd] [Ace] [FAc] |
K:G
"G" [GBd] [D^FA] [EGB] [CEG] |]`,
      interactive: true,
      playable: true,
    },
    {
      id: '4.4.3',
      title: 'Transposer Tool',
      description: 'Interactive key change: Nhập progression bằng số, chọn giọng, hệ thống tự động hiện tên hợp âm. Transpose trong 1 giây!',
      abc: `X:1
M:4/4
L:1/1
K:D
[D^FA] | [A^CE] | [B,DF] | [GBd]|]`,
      interactive: true,
      playable: true,
    },
  ],
  exercises: [{ type: 'chord', questionCount: 5 }],
}
