/**
 * Module 4, Submodule 4.3: Hợp âm trong giọng (Diatonic Chords)
 */
import type { Submodule } from '../types'

export const SUBMODULE_4_3: Submodule = {
  id: '4.3',
  title: 'Hợp âm trong giọng',
  description: 'Xây dựng 7 hợp âm từ 7 bậc của âm giai và quy luật I-ii-iii-IV-V-vi-vii°',
  sections: ['theory', 'abcDemo'],
  theoryContent: `
## 1. Diatonic Chords là gì?

### Định nghĩa

**Diatonic Chords** là các hợp âm được xây dựng chỉ từ các nốt **trong một âm giai** (scale).

> 🎵 Mỗi bậc của scale = một hợp âm → 7 bậc = 7 hợp âm!

{{quiz:Diatonic Chords là gì?|Hợp âm có 7 nốt;*Hợp âm xây từ các nốt trong âm giai;Hợp âm ngoài âm giai|Diatonic = chỉ dùng nốt trong scale để xây hợp âm}}

---

## 2. Xây dựng từ C Major Scale

### Quy trình

1. Lấy 7 nốt của C Major: C-D-E-F-G-A-B
2. Từ **mỗi nốt**, chồng quãng 3 lên
3. Chỉ dùng nốt **trong scale**

### Kết quả: 7 hợp âm

| Bậc | Root | Hợp âm | Tính chất |
|-----|------|--------|-----------|
| I | C | C-E-G | **Major** |
| ii | D | D-F-A | **minor** |
| iii | E | E-G-B | **minor** |
| IV | F | F-A-C | **Major** |
| V | G | G-B-D | **Major** |
| vi | A | A-C-E | **minor** |
| vii° | B | B-D-F | **diminished** |

{{abc:7 Diatonic Chords trong C Major|X:1
M:4/4
L:1/2
K:C
[CEG] [DFA] | [EGB] [FAc] | [GBd] [Ace] | [Bdf]2|]}}

---

## 3. Quy luật M-m-m-M-M-m-dim

### Pattern bất biến

Trong **MỌI** giọng trưởng:

> **I - ii - iii - IV - V - vi - vii°**
> 
> **M - m - m - M - M - m - dim**

| Số La Mã | Tính chất | Ghi nhớ |
|----------|-----------|---------|
| **I, IV, V** | Major (chữ hoa) | "3 anh cả" |
| **ii, iii, vi** | minor (chữ thường) | "3 em út" |
| **vii°** | diminished | "Nốt lẻ" |

{{quiz:Pattern tính chất của 7 hợp âm trong giọng Trưởng là gì?|M-M-M-M-M-M-M;*M-m-m-M-M-m-dim;m-m-m-m-m-m-M|M-m-m-M-M-m-dim. I, IV, V = Major; ii, iii, vi = minor; vii° = dim}}

---

## 4. "3 Anh Cả" - Primary Chords

### I, IV, V

Ba hợp âm **quan trọng nhất** trong bất kỳ giọng nào:

| Bậc | Tên gọi | Vai trò |
|-----|---------|---------|
| **I** | Tonic | "Nhà" - điểm khởi đầu/kết thúc |
| **IV** | Subdominant | "Đi xa" - tạo movement |
| **V** | Dominant | "Muốn về" - dẫn về I |

{{abc:I-IV-V-I trong C Major|X:1
M:4/4
L:1/1
K:C
[CEG] | [FAc] | [GBd] | [CEG]|]}}

> 🎸 Hàng ngàn bài hát chỉ dùng 3 hợp âm này!

{{quiz:"3 Anh Cả" - Primary Chords là những bậc nào?|ii, iii, vi;*I, IV, V;I, II, III|I (Tonic), IV (Subdominant), V (Dominant) là 3 hợp âm quan trọng nhất}}

---

## 5. Ví dụ: G Major Diatonic

| Bậc | Hợp âm | Nốt |
|-----|--------|-----|
| I | **G** | G-B-D |
| ii | **Am** | A-C-E |
| iii | **Bm** | B-D-F# |
| IV | **C** | C-E-G |
| V | **D** | D-F#-A |
| vi | **Em** | E-G-B |
| vii° | **F#dim** | F#-A-C |

{{abc:Diatonic Chords trong G Major|X:1
M:4/4
L:1/2
K:G
[GBd] [Ace] | [Bd^f] [ceg] | [d^fa] [egb] | [^fac]2|]}}

---

## 6. Tại sao vii° là Diminished?

### Phân tích

Trong C Major, bậc 7 = B:
- B → D = m3 (3 semitones)
- D → F = m3 (3 semitones)
- B → F = **Tritone** (6 semitones)!

{{abc:B diminished: Có tritone B-F|X:1
L:1/1
K:C
[Bdf]|]}}

> 😱 vii° luôn diminished vì nó chứa **tritone** giữa bậc 7 và bậc 4!

---

## 7. Ứng dụng: Chọn hợp âm đệm

### Biết giọng → Biết hợp âm khả dụng

Nếu bài hát ở **C Major**, bạn có thể dùng:
- C, Dm, Em, F, G, Am (tránh Bdim trừ khi cần tension)

### Chord Substitution

Các chord cùng chức năng có thể thay thế nhau:
- Tonic: I, iii, vi
- Subdominant: ii, IV
- Dominant: V, vii°

---

## 🎯 Tóm tắt

1. **Diatonic chords** = hợp âm xây từ scale
2. 7 bậc → **7 hợp âm**
3. Pattern: **M-m-m-M-M-m-dim**
4. **I, IV, V** = Primary chords (quan trọng nhất)
5. **vii°** luôn diminished (có tritone)

> 💡 **Mẹo**: Nhớ "**1-4-5** là đại ca, **2-3-6** là thứ nhỏ, **7** là dim!"
  `,
  abcDemos: [
    {
      id: '4.3.1',
      title: 'Building Diatonic Chords',
      description:
        'Animation step-by-step: Từ mỗi nốt trong C Major, chồng quãng 3 lên. Kết quả: 7 hợp âm với pattern M-m-m-M-M-m-dim.',
      abc: `X:1
M:4/4
L:1/2
K:C
[CEG] [DFA] | [EGB] [FAc] | [GBd] [Ace] | [Bdf]2|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '4.3.2',
      title: 'I-IV-V Primary Chords',
      description:
        '3 hợp âm chính: I (Tonic - nhà), IV (Subdominant - đi xa), V (Dominant - muốn về). Đủ để đệm hàng ngàn bài hát!',
      abc: `X:1
M:4/4
L:1/1
K:C
[CEG] | [FAc] | [GBd] | [CEG]|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '4.3.3',
      title: 'vii° Diminished',
      description:
        'Bdim trong C Major: B-D-F chứa tritone (B-F = 6 semitones). Đây là chord "căng thẳng nhất" trong scale, thường dẫn về I.',
      abc: `X:1
M:4/4
L:1/1
K:C
[Bdf] | [CEG]|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '4.3.4',
      title: 'Key of G Diatonic',
      description:
        'G-Am-Bm-C-D-Em-F#dim: Cùng pattern M-m-m-M-M-m-dim, chỉ khác nốt. Quy luật này hoạt động cho MỌI giọng trưởng!',
      abc: `X:1
M:4/4
L:1/2
K:G
[GBd] [Ace] | [Bd^f] [ceg] | [d^fa] [egb]|]`,
      interactive: true,
      playable: true,
    },
  ],
  exercises: [{ type: 'chord', questionCount: 5 }],
}
