/**
 * Module 2, Submodule 2.2: Dấu lặng (Rests)
 *
 * Learning Journey:
 * 1. Passive: Compare music with and without rests - "Music needs to breathe"
 * 2. Guided: Metronome counting with silence highlights
 * 3. Interactive: Drag-drop rests into correct positions
 * 4. Milestone: Tap complex rhythm patterns with both notes and rests
 *
 * Skipped: Game Journey (to be implemented later)
 */
import type { Submodule } from '../types'

export const SUBMODULE_2_2: Submodule = {
  id: '2.2',
  title: 'Dấu lặng',
  description: 'Nhận biết 5 loại dấu lặng và vai trò của sự im lặng trong âm nhạc',
  sections: ['theory', 'abcDemo'],
  theoryContent: `
## 1. Dấu lặng là gì?

### Định nghĩa

**Dấu lặng** (Rest) là ký hiệu chỉ sự **im lặng** trong âm nhạc. Khi gặp dấu lặng, bạn **không chơi** nhưng vẫn **đếm nhịp**!

> 🤫 **Âm nhạc không chỉ là âm thanh** - sự im lặng cũng quan trọng không kém! Dấu lặng tạo "hơi thở" cho bản nhạc.

### Tại sao cần dấu lặng?

- Tạo **nhịp thở** cho giai điệu
- Tạo **điểm nhấn** và **syncopation**
- Phân biệt các **câu nhạc** với nhau
- Tạo **kịch tính** và **bất ngờ**

{{quiz:Khi gặp dấu lặng, bạn cần làm gì?|Chơi nốt nhẹ hơn;*Không chơi nhưng vẫn đếm nhịp;Bỏ qua không đếm|Dấu lặng = im lặng, nhưng vẫn phải đếm nhịp để giữ đúng tempo!}}

---

## 2. Dấu lặng tròn & Dấu lặng trắng

### Dấu lặng tròn (Whole Rest)

- **Giá trị**: 4 phách (nghỉ cả ô nhịp 4/4)
- **Hình dạng**: Hình chữ nhật nhỏ **treo** dưới dòng kẻ thứ 4
- **Nhớ**: "Hình hộp nặng nên **rớt xuống**"

{{abc:Dấu lặng tròn: Nghỉ 4 phách|X:1
M:4/4
L:1/1
K:C
z|]}}

> 💡 **Mẹo nhớ**: Whole rest treo **dưới** dòng kẻ (như túi nặng treo xuống).

### Dấu lặng trắng (Half Rest)

- **Giá trị**: 2 phách
- **Hình dạng**: Hình chữ nhật nhỏ **nằm** trên dòng kẻ thứ 3
- **Nhớ**: "Hình mũ nằm trên đầu"

{{abc:Dấu lặng trắng: Nghỉ 2 phách|X:1
M:4/4
L:1/2
K:C
z C|]}}

> 💡 **Phân biệt**: 
> - Whole rest: treo DƯỚI dòng kẻ (nặng → rớt)
> - Half rest: nằm TRÊN dòng kẻ (nhẹ hơn → nổi)

{{quiz:Dấu lặng tròn (Whole Rest) có vị trí như thế nào trên khuông nhạc?|Nằm trên dòng kẻ;*Treo dưới dòng kẻ;Ở giữa 2 dòng kẻ|Whole rest "nặng" nên treo xuống dưới dòng kẻ. Half rest "nhẹ" hơn nên nổi lên trên!}}

{{quiz:Dấu lặng trắng có giá trị bằng bao nhiêu phách?|1 phách;*2 phách;4 phách|Dấu lặng trắng = 2 phách, tương ứng với nốt trắng}}

---

## 3. Dấu lặng đen & Dấu lặng móc

### Dấu lặng đen (Quarter Rest)

- **Giá trị**: 1 phách
- **Hình dạng**: Giống chữ "Z" xoắn hoặc "sấm sét"
- **Phổ biến nhất**: Thường gặp trong các pattern chơi-nghỉ

{{abc:Pattern chơi-nghỉ với dấu lặng đen|X:1
M:4/4
L:1/4
K:C
C z D z|]}}

> 📝 Đếm: 1 (chơi) - 2 (nghỉ) - 3 (chơi) - 4 (nghỉ)

### Dấu lặng móc đơn (Eighth Rest)

- **Giá trị**: 1/2 phách
- **Hình dạng**: Giống số "7" với chấm tròn

{{abc:Pattern với dấu lặng móc đơn|X:1
M:4/4
L:1/8
K:C
Cz Dz Ez Fz|]}}

### Dấu lặng móc kép (Sixteenth Rest)

- **Giá trị**: 1/4 phách
- **Hình dạng**: Giống số "7" với 2 chấm tròn

{{quiz:Dấu lặng đen có hình dạng giống gì?|Hình chữ nhật;Số 7;*Chữ Z xoắn / sấm sét|Dấu lặng đen trông giống chữ "Z" xoắn hoặc hình sấm sét}}

{{quiz:Dấu lặng móc đơn có giá trị bằng bao nhiêu phách?|1/4 phách;*1/2 phách;1 phách|Lặng móc đơn = 1/2 phách, như nốt móc đơn}}

---

## 4. Bảng so sánh 5 loại dấu lặng

| Loại | Giá trị | Hình dạng | Nốt tương ứng |
|------|---------|-----------|---------------|
| **Lặng tròn** | 4 phách | ▬ (treo dưới dòng 4) | Nốt tròn |
| **Lặng trắng** | 2 phách | ▬ (nằm trên dòng 3) | Nốt trắng |
| **Lặng đen** | 1 phách | ⚡ (chữ Z xoắn) | Nốt đen |
| **Lặng móc đơn** | 1/2 phách | 7 với 1 chấm | Nốt móc đơn |
| **Lặng móc kép** | 1/4 phách | 7 với 2 chấm | Nốt móc kép |

> 🔗 **Quy tắc quan trọng**: Mỗi loại dấu lặng có giá trị BẰNG CHÍNH XÁC với loại nốt tương ứng!

{{quiz:Dấu lặng đen tương ứng với loại nốt nào?|Nốt trắng;*Nốt đen;Nốt móc đơn|Tên dấu lặng = tên nốt tương ứng. Lặng đen = Nốt đen = 1 phách}}

---

## 5. Quy tắc điền đầy ô nhịp

### Tổng giá trị phải bằng nhịp

Trong mỗi ô nhịp, **tổng giá trị của nốt + dấu lặng** phải bằng đúng số phách quy định.

**Ví dụ trong nhịp 4/4:**

{{abc:Nốt trắng + Lặng trắng = 4 phách|X:1
M:4/4
L:1/2
K:C
C z|]}}

Giải thích: C (2 phách) + z (2 phách) = 4 phách ✅

{{abc:3 nốt đen + 1 lặng đen = 4 phách|X:1
M:4/4
L:1/4
K:C
C D E z|]}}

Giải thích: C + D + E (3 phách) + z (1 phách) = 4 phách ✅

{{quiz:Trong nhịp 4/4, nếu có 1 nốt trắng (2 phách), bạn cần thêm gì để điền đầy ô nhịp?|1 dấu lặng đen;*1 dấu lặng trắng hoặc 2 dấu lặng đen;1 dấu lặng tròn|2 phách còn lại = 1 lặng trắng (2) hoặc 2 lặng đen (1+1)}}

---

## 6. Syncopation với dấu lặng

### Tạo Groove!

Khi dấu lặng rơi vào phách mạnh (phách 1 hoặc 3), nó tạo ra **syncopation** - cảm giác "lệch nhịp" rất funky!

{{abc:Syncopation cơ bản - Nghỉ ở phách 1|X:1
M:4/4
L:1/4
K:C
z D E F | z A G E|]}}

> 🎸 **Syncopation** là kỹ thuật quan trọng trong Jazz, Funk, và R&B. Nó tạo cảm giác "groove" bằng cách nhấn vào những phách "không ngờ"!

### Off-beat Rhythm

{{abc:Off-beat: Chơi ở phách "và"|X:1
M:4/4
L:1/8
K:C
zC zD zE zF|]}}

Đếm: (nghỉ)-**VÀ**-(nghỉ)-**VÀ**-(nghỉ)-**VÀ**-(nghỉ)-**VÀ**

---

## 7. "Hơi thở" trong giai điệu

### So sánh: Có và không có dấu lặng

**Không có dấu lặng** (ngột ngạt):

{{abc:Giai điệu không có dấu lặng|X:1
M:4/4
L:1/4
K:C
C D E F | G A B c|]}}

**Có dấu lặng** (thở được):

{{abc:Giai điệu có dấu lặng - "Hơi thở"|X:1
M:4/4
L:1/4
K:C
C D E z | G A B z|]}}

> 🎤 Với ca sĩ, dấu lặng là lúc họ **hít thở**. Với nhạc cụ, dấu lặng tạo **không gian** cho âm thanh "bay".

---

## 🎯 Tóm tắt

1. **Dấu lặng** = ký hiệu cho sự im lặng (nhưng vẫn đếm nhịp!)
2. 5 loại dấu lặng tương ứng với 5 loại nốt
3. **Whole rest** treo dưới, **Half rest** nằm trên
4. Tổng nốt + lặng trong ô nhịp phải bằng đúng số phách
5. Dấu lặng tạo **hơi thở**, **syncopation**, và **groove**!

> 💡 **Nhớ**: "Âm nhạc cần im lặng như cuộc sống cần nghỉ ngơi!"
  `,
  abcDemos: [
    {
      id: '2.2.1',
      title: 'Bảng so sánh 5 loại dấu lặng',
      description:
        'Visual reference với âm thanh "im lặng" tương ứng. Lặng tròn = 4 phách, Lặng trắng = 2 phách, Lặng đen = 1 phách. Nhớ: dấu lặng có giá trị bằng nốt cùng tên!',
      abc: `X:1
M:4/4
L:1/4
K:C
C z z z|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '2.2.2',
      title: '"Hơi thở" trong giai điệu',
      description:
        'So sánh 2 versions: với và không có rests. Version có dấu lặng nghe "thoáng" hơn, có thời gian để âm thanh "bay đi" trước khi nốt tiếp theo bắt đầu.',
      abc: `X:1
M:4/4
L:1/4
K:C
C D E z | G A B z|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '2.2.3',
      title: 'Syncopation cơ bản',
      description:
        'Jazz/Funk pattern với off-beat rests. Khi nghỉ ở phách mạnh (1, 3) và chơi ở phách yếu, ta tạo ra "groove" - cảm giác lắc lư, đung đưa!',
      abc: `X:1
M:4/4
L:1/8
K:C
zC zD zE zF | zG zA zB zc|]`,
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
