/**
 * Module 3, Submodule 3.6: Âm giai ngũ cung (The Pentatonic Scale)
 *
 * Learning Journey:
 * 1. Passive: Animation "5 black keys" on Piano = Major Pentatonic
 * 2. Guided: Compare Major Pentatonic vs Minor Pentatonic
 * 3. Interactive: Improvisation on Flute with Vietnamese folk backing
 * 4. Milestone: Create 8-bar melody using pentatonic scale
 *
 * Skipped: Game Journey (to be implemented later)
 */
import type { Submodule } from '../types'

export const SUBMODULE_3_6: Submodule = {
  id: '3.6',
  title: 'Âm giai ngũ cung',
  description: 'Xây dựng Major/Minor Pentatonic và ứng dụng trong nhạc Việt Nam, Blues',
  sections: ['theory', 'piano', 'guitar', 'flute', 'abcDemo'],
  theoryContent: `
## 1. Pentatonic là gì?

### Định nghĩa

**Pentatonic** (từ tiếng Hy Lạp "penta" = 5) là âm giai có **5 nốt** (thay vì 7 như Major/Minor thông thường).

> 🎹 **Bí mật**: 5 phím đen trên Piano tạo thành một Pentatonic scale!

{{piano:5 phím đen = Pentatonic!|Db4,Eb4,Gb4,Ab4,Bb4}}

### Tại sao đặc biệt?

- **Không có "nốt sai"** - mọi nốt đều hòa hợp
- Rất phổ biến trên **toàn thế giới**: châu Á, châu Phi, Celtic, Blues
- Dễ improvise (ứng tác) cho người mới

---

## 2. Major Pentatonic

### Công thức

Từ Major scale, **bỏ bậc 4 và 7**:

> **1 - 2 - 3 - 5 - 6** (bỏ 4 và 7)

Trong C Major: **C - D - E - G - A** (bỏ F và B)

{{abc:C Major Pentatonic|X:1
L:1/4
K:C
C D E G A | c A G E D C2|]}}

{{piano:C Major Pentatonic: C D E G A|C4,D4,E4,G4,A4}}

### Tại sao bỏ 4 và 7?

- Bậc 4 (F) và 7 (B) tạo **tension** (căng thẳng)
- Khi bỏ chúng → mọi nốt đều "nghe hay" với mọi hợp âm
- "Impossible to play wrong notes!"

---

## 3. Minor Pentatonic

### Công thức

Từ Natural Minor scale, **bỏ bậc 2 và 6**:

> **1 - ♭3 - 4 - 5 - ♭7** (bỏ 2 và 6)

Trong A Minor: **A - C - D - E - G** (bỏ B và F)

{{abc:A Minor Pentatonic|X:1
L:1/4
K:Am
A, C D E G | A G E D C A,2|]}}

{{piano:A Minor Pentatonic: A C D E G|A3,C4,D4,E4,G4}}

### Scale Guitar Solo #1! 🎸

**Minor Pentatonic** là scale quan trọng nhất cho guitar solo:
- Hendrix, Page, Clapton, SRV đều dùng
- "Pentatonic Box 1" là vị trí đầu tiên mọi guitarist học

{{guitar:Minor Pentatonic "Box 1"|A3,C4,D4,E4,G4,A4}}

---

## 4. Blues Scale

### Minor Pentatonic + "Blue Note"

Thêm **♭5** (Blue Note) vào Minor Pentatonic:

> **1 - ♭3 - 4 - ♭5 - 5 - ♭7**

Trong A: **A - C - D - E♭ - E - G**

{{abc:A Blues Scale (có Blue Note)|X:1
L:1/4
K:Am
A, C D _E =E G | A G =E _E D C A,2|]}}

> 🎷 **The Blue Note** (♭5) tạo cảm giác "đau đớn ngọt ngào" của Blues!

---

## 5. Pentatonic trong Nhạc Việt Nam 🇻🇳

### Hệ thống Hò - Xự - Xang - Xê - Cống

Âm nhạc truyền thống Việt Nam sử dụng thang ngũ cung với tên gọi riêng:

| Tên Việt | Tên Western | Vị trí (từ C) |
|----------|-------------|---------------|
| **Hò** | Do (C) | Bậc 1 |
| **Xự** | Re (D) | Bậc 2 |
| **Xang** | Mi (E) hoặc Fa (F) | Bậc 3 |
| **Xê** | Sol (G) | Bậc 5 |
| **Cống** | La (A) | Bậc 6 |

### Điệu Bắc vs Điệu Nam

| Điệu | Âm hưởng | Vùng miền | Đặc điểm |
|------|----------|-----------|----------|
| **Điệu Bắc** | Vui tươi, trang trọng | Miền Bắc | Xang = Mi (E) |
| **Điệu Nam** | Buồn, ai oán | Miền Nam/Trung | Xang = Fa (F), có rung/nhấn |

{{flute:Điệu Bắc (vui)|C4,D4,E4,G4,A4}}

{{flute:Điệu Nam (buồn)|C4,D4,F4,G4,A4}}

### Kỹ thuật đặc trưng

- **Rung** (Vibrato): Rung tay tạo sóng âm
- **Nhấn** (Bend): Nhấn lỗ tay để thay đổi cao độ
- **Luyến** (Slide): Trượt giữa các nốt

> 🎋 Sáo Trúc là nhạc cụ pentatonic xuất sắc!

---

## 6. "Không có nốt sai" - Improvisation!

### Tại sao Pentatonic dễ improvise?

1. **Không có tension notes** (4, 7 trong Major hoặc 2, 6 trong Minor)
2. Mọi nốt đều **hòa hợp** với các hợp âm phổ biến
3. **5 nốt ít hơn 7** → dễ nhớ, dễ chơi

### Thử ngay!

Với backing track trong C Major hoặc A Minor:
- Chơi BẤT KỲ nốt nào trong C Major Pentatonic
- Mọi thứ đều nghe "hay"!

### Call & Response (Xướng - Họa)

Kỹ thuật improvise cơ bản:
1. **Call**: Chơi 1 phrase ngắn
2. **Response**: "Trả lời" bằng phrase tương tự

{{abc:Call & Response Example|X:1
L:1/8
K:C
"Call" G2 E D C D | "Response" E2 G A G E|]}}

---

## 7. Relative Pentatonic

### C Major Pent = A Minor Pent

Giống như Major/Minor scales, Pentatonic cũng có **Relative pairs**:

| Major Pentatonic | Relative Minor Pent | Các nốt |
|------------------|---------------------|---------|
| C Major Pent | **A Minor Pent** | C-D-E-G-A |
| G Major Pent | **E Minor Pent** | G-A-B-D-E |
| F Major Pent | **D Minor Pent** | F-G-A-C-D |

> 💡 Cùng 5 nốt, khác điểm bắt đầu, khác "vibe"!

---

## 🎯 Tóm tắt

1. **Pentatonic** = 5 nốt (bỏ tension notes)
2. **Major Pent**: 1-2-3-5-6 (bỏ 4 và 7)
3. **Minor Pent**: 1-♭3-4-5-♭7 (bỏ 2 và 6)
4. **Blues Scale**: Minor Pent + ♭5 (Blue Note)
5. **Nhạc Việt**: Hò-Xự-Xang-Xê-Cống, Điệu Bắc (vui) vs Điệu Nam (buồn)
6. **Không có nốt sai** → Tốt nhất cho improvisation!

> 💡 **Mẹo**: Muốn solo ngay lập tức? Chơi 5 phím đen trên Piano với bất kỳ bài hát nào!
  `,
  abcDemos: [
    {
      id: '3.6.1',
      title: 'Major Pentatonic',
      description:
        '5 notes with no wrong notes! C-D-E-G-A - bỏ F (bậc 4) và B (bậc 7) để loại bỏ tension. Đây là scale của "Amazing Grace", "My Girl", và hầu hết nhạc Pop hook!',
      abc: `X:1
M:4/4
L:1/4
K:C
C D E G | A G E D | C2 z2|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '3.6.2',
      title: 'Minor Pentatonic',
      description:
        'Blues/Rock foundation: A-C-D-E-G. Scale quan trọng nhất cho guitar solo. Từ Hendrix đến Slash, từ B.B. King đến John Mayer - ai cũng dùng minor pentatonic!',
      abc: `X:1
M:4/4
L:1/4
K:Am
A, C D E | G A G E | D C A,2|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '3.6.3',
      title: '5 Black Keys',
      description:
        'Instant pentatonic on Piano! 5 phím đen tạo thành Db Major Pentatonic hoặc Bb Minor Pentatonic. Thử improvise trên phím đen với bất kỳ backing track nào - không thể sai!',
      abc: `X:1
M:4/4
L:1/4
K:Db
_D _E _G _A _B | _d _B _A _G _E _D2|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '3.6.4',
      title: 'Vietnamese Pentatonic',
      description:
        'Điệu Bắc (vui - với E) vs Điệu Nam (buồn - với F). Nhạc truyền thống Việt Nam dùng pentatonic với các kỹ thuật rung, nhấn, luyến độc đáo. Sáo Trúc là nhạc cụ pentatonic hoàn hảo!',
      abc: `X:1
M:4/4
L:1/4
K:C
"Điệu Bắc" C D E G A | "Điệu Nam" C D F G A|]`,
      interactive: true,
      playable: true,
    },
  ],
  exercises: [
    {
      type: 'note-id',
      notes: ['C4', 'D4', 'E4', 'G4', 'A4'],
      questionCount: 5,
    },
  ],
}
