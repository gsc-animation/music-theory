/**
 * Module 5, Submodule 5.2: Chỗ ngắt (Cadences)
 */
import type { Submodule } from '../types'

export const SUBMODULE_5_2: Submodule = {
  id: '5.2',
  title: 'Chỗ ngắt',
  description: 'Phân biệt 4 loại cadence: Perfect, Plagal, Half, Deceptive',
  sections: ['theory', 'grandStaff', 'abcDemo'],
  theoryContent: `
## 1. Cadence là gì?

### Định nghĩa

**Cadence** (Chỗ ngắt) là cách **kết thúc** một câu nhạc - giống như dấu chấm câu trong văn viết.

> 📝 Cadence = "Dấu câu" của âm nhạc!

| Loại | Cảm giác | Dấu câu tương đương |
|------|----------|---------------------|
| Perfect | Kết thúc! | Dấu chấm **( . )** |
| Plagal | Bình yên | Dấu phẩy **( , )** |
| Half | Chờ đợi | Dấu hỏi **( ? )** |
| Deceptive | Bất ngờ | Dấu chấm than **( ! )** |

---

## 2. Perfect Cadence (V → I) 🏠

### "Authentic Cadence" - Về nhà!

> **V → I** (hoặc V7 → I)
>
> Trong C: **G(7) → C**

{{abc:Perfect Cadence: G7 → C|X:1
M:4/4
L:1/2
K:C
[GBdf] [CEGc]|]}}

### Cảm giác

- Hoàn toàn **kết thúc** 🏁
- "Đóng cửa", "về đích"
- Dùng ở **cuối bài** hoặc cuối đoạn lớn

> 🎬 Như cảnh cuối phim - "THE END"!

---

## 3. Plagal Cadence (IV → I) 🙏

### "Amen Cadence" - Bình yên

> **IV → I**
>
> Trong C: **F → C**

{{abc:Plagal Cadence: F → C|X:1
M:4/4
L:1/2
K:C
[FAc] [CEG]|]}}

### Cảm giác

- **Trang nghiêm**, bình yên
- "Amen" ở cuối thánh ca
- Ít căng thẳng hơn Perfect

### Sử dụng

- Kết thúc nhạc nhà thờ
- Outro Rock/Pop: "Let It Be", "Hey Jude"

---

## 4. Half Cadence (? → V) ❓

### "Imperfect Cadence" - Chưa xong!

> **Bất kỳ chord nào → V**
>
> Trong C: **... → G**

{{abc:Half Cadence: Ends on V|X:1
M:4/4
L:1/2
K:C
[CEG] [DFA] | [GBd]2|]}}

### Cảm giác

- **Dấu hỏi** ❓
- "Chờ đợi", "To be continued..."
- Nghe không trọn vẹn, muốn có câu tiếp

### Sử dụng

- Cuối phrase đầu (antecedent phrase)
- Tạo tension, listener muốn nghe tiếp

---

## 5. Deceptive Cadence (V → vi) 😮

### "Surprise!" - Lừa đảo

> **V → vi** (thay vì V → I như expected)
>
> Trong C: **G → Am** (thay vì G → C)

{{abc:Deceptive Cadence: G → Am (surprise!)|X:1
M:4/4
L:1/2
K:C
[GBdf] [Ace]|]}}

### Cảm giác

- **Bất ngờ!** 😮
- "Đáng lẽ về C nhưng lại sang Am"
- Plot twist âm nhạc

### Sử dụng

- Kéo dài bài hát
- Tạo surprise effect
- Đổi từ Major sang minor mood

---

## 6. So sánh 4 Cadences

| Cadence | Chords | Cảm giác | Ký hiệu |
|---------|--------|----------|---------|
| **Perfect** | V → I | Kết thúc | 🏠 |
| **Plagal** | IV → I | Bình yên | 🙏 |
| **Half** | ? → V | Chờ đợi | ❓ |
| **Deceptive** | V → vi | Bất ngờ | 😮 |

---

## 7. Authentic vs Plagal

### Khác biệt cảm xúc

**Perfect/Authentic (V→I)**:
- Mạnh mẽ, dứt khoát
- V7 có **tritone** → cần resolution

**Plagal (IV→I)**:
- Nhẹ nhàng, bình thản
- Không có tension mạnh

{{abc:Perfect vs Plagal so sánh|X:1
M:4/4
L:1/2
K:C
"Perfect" [GBdf] [CEGc] | "Plagal" [FAc] [CEG]|]}}

---

## 8. Ứng dụng trong bài hát

### Kết thúc mạnh mẽ

Dùng **Perfect Cadence** (V7 → I)

### Kết thúc nhẹ nhàng

Dùng **Plagal Cadence** (IV → I)

### Tạo suspense

Dùng **Half Cadence** (... → V) ở giữa bài

### Bất ngờ/Kéo dài

Dùng **Deceptive Cadence** (V → vi)

---

## 🎯 Tóm tắt

1. **Perfect (V→I)**: Kết thúc dứt khoát - "THE END"
2. **Plagal (IV→I)**: Bình yên - "Amen"
3. **Half (?→V)**: Chờ đợi - "To be continued..."
4. **Deceptive (V→vi)**: Bất ngờ - "Plot twist!"
5. Cadence = Dấu câu của âm nhạc

> 💡 **Mẹo**: Nghe cuối đoạn nhạc, xác định 2 chord cuối = biết cadence!
  `,
  abcDemos: [
    {
      id: '5.2.1',
      title: 'Perfect Cadence',
      description: 'V → I = "The End". G7 (với tritone B-F) resolve về C Major. Đây là cadence mạnh nhất, dứt khoát nhất. Dùng ở cuối bài!',
      abc: `X:1
M:4/4
L:1/2
K:C
[GBdf] [CEGc]|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '5.2.2',
      title: 'Plagal "Amen"',
      description: 'IV → I = peaceful ending. F → C không có tension như V→I. Thường nghe trong thánh ca kết thúc bằng "A-men". Cũng phổ biến trong Rock ballad!',
      abc: `X:1
M:4/4
L:1/2
K:C
[FAc] [CEG]|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '5.2.3',
      title: 'Half Cadence',
      description: '→ V = "To be continued..." Kết thúc trên chord V (G), không về I. Listener cảm thấy "chưa xong", muốn nghe tiếp. Dùng để tạo suspense!',
      abc: `X:1
M:4/4
L:1/2
K:C
[CEG] [DFA] | [GBd]2|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '5.2.4',
      title: 'Deceptive Surprise',
      description: 'V → vi = "Plot twist!" Đáng lẽ G7 → C (expected), nhưng đi về Am (surprise!). Dùng để kéo dài bài hoặc tạo unexpected emotional shift.',
      abc: `X:1
M:4/4
L:1/2
K:C
[GBdf] [Ace]|]`,
      interactive: true,
      playable: true,
    },
  ],
  exercises: [{ type: 'chord', questionCount: 5 }],
}
