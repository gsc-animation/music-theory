/**
 * Module 5, Submodule 5.5: Cường độ & Kỹ thuật diễn tấu (Dynamics & Articulation)
 */
import type { Submodule } from '../types'

export const SUBMODULE_5_5: Submodule = {
  id: '5.5',
  title: 'Cường độ & Kỹ thuật diễn tấu',
  description: 'Đọc ký hiệu dynamics (pp-ff), crescendo, staccato, legato',
  sections: ['theory', 'grandStaff', 'abcDemo'],
  theoryContent: `
## 1. Dynamics là gì?

### Định nghĩa

**Dynamics** (Cường độ) chỉ **độ to/nhỏ** của âm thanh - một trong những yếu tố biểu cảm quan trọng nhất.

> 🔊 Dynamics = "Volume control" của âm nhạc!

---

## 2. Ký hiệu Dynamic Levels

### Bảng 6 mức chính

| Ký hiệu | Tên | Ý nghĩa | Volume |
|---------|-----|---------|--------|
| **pp** | pianissimo | Rất nhỏ | 🔇🔇 |
| **p** | piano | Nhỏ | 🔇 |
| **mp** | mezzo-piano | Hơi nhỏ | 🔈 |
| **mf** | mezzo-forte | Hơi to | 🔉 |
| **f** | forte | To | 🔊 |
| **ff** | fortissimo | Rất to | 🔊🔊 |

### Extreme dynamics

- **ppp**: pianississimo (cực nhỏ)
- **fff**: fortississimo (cực to)
- **sfz**: sforzando (đột ngột to)

---

## 3. Crescendo & Decrescendo

### Crescendo (<)

**Crescendo** = To **dần lên** 📈

Ký hiệu: <────────

> Từ p → f, từ nhỏ đến to dần dần

### Decrescendo (>)

**Decrescendo** (hay Diminuendo) = Nhỏ **dần đi** 📉

Ký hiệu: ────────>

> Từ f → p, từ to đến nhỏ dần dần

### "Hairpin" Dynamics

Ký hiệu < > trông như cái kẹp tóc, nên gọi là hairpin!

---

## 4. Articulation là gì?

### Định nghĩa

**Articulation** (Kỹ thuật diễn tấu) chỉ **cách chơi** từng nốt - ngắt hay liền, mạnh hay nhẹ.

> 🎹 Cùng nốt C, nhưng cách chơi khác = âm thanh khác!

---

## 5. Các ký hiệu Articulation

### Staccato (chấm)

**Staccato** = Ngắt tiếng, nảy, gọn

- Ký hiệu: Chấm tròn **dưới** (hoặc trên) đầu nốt
- Chơi **ngắn hơn** giá trị viết (khoảng 50%)
- Cảm giác: Nhảy, bouncy

### Legato (slur)

**Legato** = Liền tiếng, mượt mà

- Ký hiệu: Đường cong nối nhiều nốt (slur)
- Chơi **không ngắt** giữa các nốt
- Cảm giác: Flowing, smooth

### Accent (>)

**Accent** = Nhấn mạnh

- Ký hiệu: Dấu > trên đầu nốt
- Chơi **to hơn** các nốt xung quanh
- Cảm giác: Emphasis, punch

### Tenuto (−)

**Tenuto** = Giữ đủ giá trị

- Ký hiệu: Gạch ngang − trên đầu nốt
- Chơi **đủ dài**, không rút ngắn
- Cảm giác: Sustained, full value

---

## 6. So sánh Staccato vs Legato

| Đặc điểm | Staccato | Legato |
|----------|----------|--------|
| Độ dài nốt | Ngắn, 50% | Đầy đủ, 100% |
| Khoảng cách | Có gaps | Không gaps |
| Cảm giác | Bouncy, light | Smooth, connected |
| Ví dụ | March, upbeat pop | Ballad, strings |

---

## 7. Kết hợp Dynamics & Articulation

### Ví dụ thực tế

\`\`\`
pp legato → cresc. → f staccato
\`\`\`

Nhỏ + mượt → To dần → To + nảy

### Storytelling

- **Verse**: mp, legato (nhẹ nhàng kể chuyện)
- **Pre-Chorus**: crescendo (build up)
- **Chorus**: f, accent (bùng nổ!)
- **Bridge**: p, tenuto (sâu lắng)
- **Last Chorus**: ff (max energy!)

---

## 8. Ký hiệu khác

### Fermata (𝄐)

**Fermata** = Dừng lại, giữ lâu hơn bình thường

- "Bird's eye" hoặc "dấu mắt"
- Người chỉ huy quyết định khi nào tiếp

### Breath mark (,)

**Breath mark** = Chỗ lấy hơi

- Dấu phẩy nhỏ
- Cho singers và wind players

---

## 🎯 Tóm tắt

1. **pp → p → mp → mf → f → ff** (nhỏ → to)
2. **Crescendo** (<): To dần lên
3. **Decrescendo** (>): Nhỏ dần đi
4. **Staccato**: Ngắn, nảy
5. **Legato**: Liền, mượt
6. **Accent**: Nhấn mạnh

> 💡 **Mẹo**: Dynamics + Articulation = "Giọng nói" của music!
  `,
  abcDemos: [
    {
      id: '5.5.1',
      title: 'Volume Slider',
      description: 'pp → ff interactive: Từ pianissimo (rất nhỏ) đến fortissimo (rất to). 6 mức dynamics cơ bản. Cảm nhận sự khác biệt về volume!',
      abc: `X:1
M:4/4
L:1/4
K:C
!pp! C D E F | !mf! G A B c | !ff! c B A G|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '5.5.2',
      title: 'Crescendo Wave',
      description: '< animation with audio: Bắt đầu nhỏ (p), to dần (cresc.), đến đỉnh (f). Crescendo tạo tension, build-up. Kỹ thuật quan trọng trong mọi thể loại!',
      abc: `X:1
M:4/4
L:1/4
K:C
!p! C D !<! E F | G A B !f! c|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '5.5.3',
      title: 'Staccato vs Legato',
      description: 'Same melody, different feel: Staccato (ngắt, bouncy) vs Legato (liền, smooth). Articulation thay đổi hoàn toàn character của melody!',
      abc: `X:1
M:4/4
L:1/4
K:C
"Staccato" .C .D .E .F | "Legato" (CDEF)|]`,
      interactive: true,
      playable: true,
    },
  ],
  exercises: [{ type: 'note-id', notes: ['C4', 'E4', 'G4'], questionCount: 5 }],
}
