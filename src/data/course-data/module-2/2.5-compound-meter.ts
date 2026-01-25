/**
 * Module 2, Submodule 2.5: Nhịp ghép (Compound Meter)
 *
 * Learning Journey:
 * 1. Passive: Animation comparing 3/4 vs 6/8 - same notes, different grouping
 * 2. Guided: Count "1-2-3, 1-2-3" for 6/8 vs "1-2-3" for 3/4
 * 3. Interactive: Toggle between straight 8ths and swung 8ths
 * 4. Milestone: Play jig (6/8) and blues shuffle (12/8)
 *
 * Skipped: Game Journey (to be implemented later)
 */
import type { Submodule } from '../types'

export const SUBMODULE_2_5: Submodule = {
  id: '2.5',
  title: 'Nhịp ghép',
  description: 'Hiểu nhịp 6/8 và cảm giác "triplet feel", phân biệt nhịp đơn và nhịp ghép',
  sections: ['theory', 'grandStaff', 'abcDemo'],
  theoryContent: `
## 1. Nhịp ghép (Compound Meter) là gì?

### Định nghĩa

**Nhịp ghép** là nhịp mà mỗi phách chính được **chia làm 3 phần** (thay vì 2 như nhịp đơn).

| Loại nhịp | Chia phách | Cảm giác |
|-----------|------------|----------|
| **Nhịp đơn** (Simple) | Chia 2 | "1-và" |
| **Nhịp ghép** (Compound) | Chia 3 | "1-và-a" |

> 🎵 Nhịp ghép tạo cảm giác "lắc lư", "dập dình" đặc trưng!

---

## 2. Nhịp 6/8 cơ bản

### Cấu trúc

- **6 móc đơn** trong mỗi ô nhịp
- **NHƯNG** nhóm thành **2 nhịp chính × 3 nốt**
- Cảm giác: "**1**-2-3, **1**-2-3" (2 accent chính)

{{abc:Nhịp 6/8: 2 nhóm × 3 móc đơn|X:1
M:6/8
L:1/8
K:C
CDE FGA | Bcd efg|]}}

### Đếm nhịp

> **1** - và - a - **2** - và - a
>
> (Nhấn mạnh 1 và 2, các "và-a" nhẹ hơn)

### Ứng dụng

- **Jig** (Irish/Celtic music)
- **Tarantella** (Italian)
- **Barcarolle** (Venetian gondola songs)
- Nhiều bài hát Pop ballad!

---

## 3. 3/4 vs 6/8 - Khác biệt then chốt!

### Cùng số nốt, KHÁC cách nhóm!

Cả 3/4 và 6/8 đều có thể chứa 6 móc đơn trong 1 ô nhịp. Nhưng cách **nhóm** hoàn toàn khác!

### So sánh trực quan

| Đặc điểm | **3/4** (Nhịp đơn) | **6/8** (Nhịp ghép) |
|----------|-------------------|---------------------|
| Số phách chính | 3 phách | 2 phách |
| Mỗi phách chia | 2 (nhịp đơn) | 3 (nhịp ghép) |
| Cách nhóm 6 móc | 2 + 2 + 2 | 3 + 3 |
| Cảm giác | "**1**-2-**3**" | "**1**-và-a-**2**-và-a" |
| Phong cách | Waltz | Jig, Barcarolle |

### Ví dụ 3/4 (Waltz)

{{abc:3/4: Nhịp Waltz (3 phách chính)|X:1
M:3/4
L:1/8
K:C
CD EF GA | BC DE FG|]}}

### Ví dụ 6/8 (Jig)

{{abc:6/8: Nhịp Jig (2 nhóm × 3)|X:1
M:6/8
L:1/8
K:C
CDE FGA | BCD EFG|]}}

> ⚠️ **Nhìn giống nhau nhưng nghe KHÁC!** 3/4 nhấn 3 lần, 6/8 nhấn 2 lần.

---

## 4. 9/8 và 12/8

### Nhịp 9/8

- **9 móc đơn** = **3 nhóm × 3**
- Cảm giác: "**1**-và-a-**2**-và-a-**3**-và-a"

{{abc:9/8: 3 nhóm × 3 móc đơn|X:1
M:9/8
L:1/8
K:C
CDE FGA Bcd|]}}

### Nhịp 12/8 - Blues Shuffle! 🎸

- **12 móc đơn** = **4 nhóm × 3**
- Đây chính là **Blues feel**!
- Cảm giác: "**1**-và-a-**2**-và-a-**3**-và-a-**4**-và-a"

{{abc:12/8: Blues Shuffle (4 nhóm × 3)|X:1
M:12/8
L:1/8
K:C
CCC EEE | GGG ccc | CCC EEE | GGG ccc|]}}

> 🎵 **Blues/Rock classics**: "Stormy Monday", "Slow Ride", nhiều bài của B.B. King!

### Công thức chung

> **Số ở trên ÷ 3 = Số phách chính**
>
> - 6 ÷ 3 = 2 phách
> - 9 ÷ 3 = 3 phách
> - 12 ÷ 3 = 4 phách

---

## 5. Triplet Feel & Swing

### Triplet (Nốt ba)

Trong nhịp đơn, khi bạn muốn chia phách làm 3 thay vì 2, bạn dùng **triplet**:

{{abc:Triplet: Chia 1 phách thành 3 nốt|X:1
M:4/4
L:1/4
K:C
(3CDE (3FGA | (3Bcd (3efg|]}}

> 📝 Số 3 ở trên = "3 nốt trong thời gian của 2"

### Swing Feel

**Swing** = Biến "straight 8ths" thành "triplet feel":

- **Straight 8ths**: 1-và-2-và... (đều nhau)
- **Swung 8ths**: 1--và-2--và... (dài-ngắn-dài-ngắn)

> 🎷 **Jazz essential!** Swing làm cho nhạc "bounce" và có groove!

---

## 6. Nhận biết Simple vs Compound

### Quy tắc đơn giản

| Số trên | Loại nhịp | Ví dụ |
|---------|-----------|-------|
| 2, 3, 4 | **Simple** (Nhịp đơn) | 2/4, 3/4, 4/4 |
| 6, 9, 12 | **Compound** (Nhịp ghép) | 6/8, 9/8, 12/8 |

### Kiểm tra bằng phép chia

- **Chia được cho 3** (và > 3) → Compound
- **Không chia được cho 3** → Simple

---

## 7. Ứng dụng thực tế

### Jig (6/8) - Irish Music

{{abc:Irish Jig trong 6/8|X:1
M:6/8
L:1/8
K:G
GAB dBG | ABc BAG | GAB dBG | ABc d3|]}}

### Blues (12/8)

{{abc:Blues Pattern trong 12/8|X:1
M:12/8
L:1/8
K:C
C2C E2E G2G E2E | C2C E2E G2G c3|]}}

---

## 🎯 Tóm tắt

1. **Nhịp ghép** = Mỗi phách chia làm 3 (không phải 2)
2. **6/8** = 2 phách × 3 móc = "1-và-a, 2-và-a"
3. **3/4 vs 6/8**: Cùng 6 nốt, khác cách nhóm (2+2+2 vs 3+3)
4. **12/8** = Blues/Shuffle feel phổ biến
5. **Swing** = Biến straight 8ths thành triplet feel
6. Số trên chia được cho 3 (6, 9, 12) → Compound meter

> 💡 **Mẹo nhận biết**: Nếu nghe thấy "lắc lư" như sóng biển → có thể là 6/8!
  `,
  abcDemos: [
    {
      id: '2.5.1',
      title: '3/4 vs 6/8',
      description:
        'Same notes, different grouping. 3/4 nhấn 3 lần mỗi ô (waltz), 6/8 nhấn 2 lần (jig). Nghe và cảm nhận sự khác biệt - dù cùng số nốt nhưng "feel" hoàn toàn khác!',
      abc: `X:1
M:6/8
L:1/8
K:C
CDE FGA | BCD EFG|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '2.5.2',
      title: '12/8 Blues Shuffle',
      description:
        'Classic blues feel: 12 móc đơn nhóm thành 4 × 3. Đây là nền tảng của hàng ngàn bài Rock và Blues kinh điển. Pattern "dài-ngắn-dài" tạo groove đặc trưng!',
      abc: `X:1
M:12/8
L:1/8
K:C
C2C E2E G2G E2E | C2C E2E G2G c3|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '2.5.3',
      title: 'Straight vs Swing',
      description:
        'Toggle giữa 2 styles: Straight 8ths = đều như robot, Swing 8ths = "bounce" như jazz. Cùng nốt nhưng khác timing - swing kéo nốt đầu dài hơn, nốt sau ngắn lại.',
      abc: `X:1
M:4/4
L:1/8
K:C
CDEF GABB | cBAG FEDC|]`,
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
