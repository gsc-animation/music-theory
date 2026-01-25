/**
 * Module 2, Submodule 2.6: Nhịp độ & BPM (Tempo & BPM)
 *
 * Learning Journey:
 * 1. Passive: Animation comparing BPM with human heartbeat (60-100 BPM)
 * 2. Guided: Slider adjusting BPM from 40 (Largo) to 200 (Presto)
 * 3. Interactive: Listen to song → adjust metronome to match tempo
 * 4. Milestone: Hear and guess correct Italian tempo term
 *
 * Skipped: Game Journey (to be implemented later)
 */
import type { Submodule } from '../types'

export const SUBMODULE_2_6: Submodule = {
  id: '2.6',
  title: 'Nhịp độ & BPM',
  description: 'Hiểu BPM (Beats Per Minute) và các thuật ngữ tempo tiếng Ý',
  sections: ['theory', 'grandStaff', 'abcDemo'],
  theoryContent: `
## 1. BPM là gì?

### Định nghĩa

**BPM = Beats Per Minute** (Số phách trong 1 phút)

- **BPM cao** = Nhanh (nhiều phách mỗi phút)
- **BPM thấp** = Chậm (ít phách mỗi phút)

> 🎛️ BPM là "tốc độ" của bài nhạc - số lần metronome click trong 1 phút!

### So sánh với nhịp tim

| BPM | So với nhịp tim | Cảm giác |
|-----|----------------|----------|
| 40-60 | Chậm hơn nhịp tim | Rất bình tĩnh, thiền định |
| 60-100 | Gần bằng nhịp tim | Thoải mái, tự nhiên |
| 100-140 | Nhanh hơn nhịp tim | Năng động, phấn khích |
| 140+ | Gấp đôi nhịp tim | Cực nhanh, intense! |

> 💓 **Nhịp tim nghỉ ngơi**: 60-100 BPM. Bài nhạc trong range này cảm thấy "tự nhiên" nhất!

---

## 2. Thuật ngữ Tempo tiếng Ý

### Tại sao dùng tiếng Ý?

Âm nhạc cổ điển phương Tây phát triển mạnh ở Ý, nên các thuật ngữ gốc là tiếng Ý.

### Bảng thuật ngữ Tempo

| Thuật ngữ | BPM Range | Ý nghĩa | Tính cách |
|-----------|-----------|---------|-----------|
| **Grave** | 20-40 | Rất nặng nề | Trang nghiêm, u ám |
| **Largo** | 40-60 | Rộng, chậm | Trang nghiêm, oai vệ |
| **Adagio** | 60-76 | Thư thả | Dịu dàng, trữ tình |
| **Andante** | 76-108 | Bước đi | Vừa phải, đi bộ |
| **Moderato** | 108-120 | Trung bình | Cân bằng |
| **Allegro** | 120-168 | Vui vẻ | Nhanh, sôi động |
| **Vivace** | 168-176 | Sống động | Rất nhanh, tươi vui |
| **Presto** | 176-200 | Rất nhanh | Cực nhanh! |
| **Prestissimo** | 200+ | Nhanh nhất | "Chạy đua với thời gian" |

---

## 3. Các thuật ngữ phổ biến nhất

### Largo (40-60 BPM) 🐢

"Rộng rãi" - Chậm và trang nghiêm.

- **Handel's Largo** (từ opera Xerxes)
- Thường dùng cho nhạc tang lễ, nhạc cổ điển trang nghiêm

### Andante (76-108 BPM) 🚶

"Bước đi" - Như tốc độ đi bộ thong thả.

- Phổ biến trong nhạc cổ điển movement 2
- Nhạc nền, nhạc thư giãn

### Allegro (120-168 BPM) 🏃

"Vui vẻ" - Nhanh và tươi sáng.

- Hầu hết nhạc Pop (~120-130 BPM)
- Movement đầu và cuối sonata/symphony

### Presto (176-200 BPM) 🚀

"Rất nhanh" - Thử thách kỹ thuật!

- **Flight of the Bumblebee** (Rimsky-Korsakov)
- Solo virtuoso, đoạn climax

---

## 4. Tempo của các thể loại nhạc

### Pop & Rock

| Thể loại | BPM Range | Ví dụ |
|----------|-----------|-------|
| Ballad | 60-80 | "Someone Like You" |
| Pop | 100-130 | "Shape of You" (96), "Uptown Funk" (115) |
| Rock | 110-140 | "Back in Black" (92), "Enter Sandman" (123) |
| EDM | 128-150 | "Levels", "Clarity" |
| Drum & Bass | 160-180 | Jungle, DnB |

### Classical

| Thể loại | BPM Range | Ví dụ |
|----------|-----------|-------|
| Funeral March | 60-70 | Chopin's Marche funèbre |
| Waltz | 100-130 | The Blue Danube (180 cho nhanh) |
| Symphonic Allegro | 120-160 | Mozart Symphonies |
| Virtuoso Presto | 170-200+ | Liszt Hungarian Rhapsodies |

---

## 5. Thay đổi Tempo

### Accelerando (accel.) 📈

**Tăng tốc dần** - Ngày càng nhanh hơn.

> Dùng để tạo hưng phấn, dẫn đến climax!

### Ritardando (rit.) 📉

**Chậm dần** - Ngày càng chậm lại.

> Dùng ở cuối bài, tạo cảm giác kết thúc.

### Fermata (𝄐) ⏸️

**Ngừng lại** - Giữ nốt lâu hơn bình thường.

> "Dấu mắt" - Người chỉ huy quyết định khi nào tiếp!

### A Tempo

**Trở về tempo ban đầu** - Sau khi đã accel. hoặc rit.

---

## 6. Rubato - "Ăn cắp thời gian"

### Định nghĩa

**Rubato** (tiếng Ý: "đánh cắp") = Tự do co giãn tempo theo cảm xúc.

- Kéo dài một số nốt
- Rút ngắn nốt khác để "bù lại"
- Tổng thời gian vẫn gần bằng nhau

> 🎹 **Chopin** nổi tiếng với rubato - tay phải tự do, tay trái giữ tempo!

---

## 7. Metronome - Công cụ luyện tập

### Lịch sử

**Johann Maelzel** phát minh metronome hiện đại năm 1815. Beethoven là một trong những người đầu tiên ghi BPM cụ thể!

### Ký hiệu

> ♩ = 120

Nghĩa là: "Nốt đen = 120 BPM" (120 nốt đen mỗi phút)

### Mẹo luyện tập

1. **Bắt đầu CHẬM** (50-70% tempo đích)
2. Tăng dần 5-10 BPM khi đã thuần thục
3. **Đật mục tiêu tempo** và đánh dấu tiến độ

---

## 8. Câu nhớ thuật ngữ

> 💡 **Mẹo nhớ**: "**L**arge **A**nt, **A**nd **M**ice, **A**ll **V**ery **P**owerful"
>
> **L**argo - **A**dagio - **A**ndante - **M**oderato - **A**llegro - **V**ivace - **P**resto

Hoặc tiếng Việt:

> "**L**ười - **Ả**nh - **Ă**n - **M**ướp - **A**nh - **V**ẫn - **P**hải"

---

## 🎯 Tóm tắt

1. **BPM** = Beats Per Minute = Số phách mỗi phút
2. **Nhịp tim** ≈ 60-100 BPM → Nhạc trong range này cảm thấy tự nhiên
3. Thuật ngữ chính: **Largo** (chậm) → **Andante** (đi bộ) → **Allegro** (nhanh) → **Presto** (rất nhanh)
4. **Accelerando** = nhanh dần, **Ritardando** = chậm dần
5. **Rubato** = Co giãn tempo theo cảm xúc

> 💡 **Thực hành**: Mở metronome, set 60 BPM, cảm nhận nhịp tim. Sau đó tăng lên 120 BPM - cảm giác hoàn toàn khác!
  `,
  abcDemos: [
    {
      id: '2.6.1',
      title: 'BPM Slider Demo',
      description:
        'Interactive metronome với visual feedback. Từ 40 BPM (Largo - rất chậm) đến 200 BPM (Presto - cực nhanh). Cảm nhận sự khác biệt giữa các tốc độ!',
      abc: `X:1
M:4/4
L:1/4
K:C
C D E F | G A B c|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '2.6.2',
      title: 'Tempo Terms Flashcard',
      description:
        'Flashcard thuật ngữ tiếng Ý: Largo (40-60), Adagio (60-76), Andante (76-108), Moderato (108-120), Allegro (120-168), Vivace (168-176), Presto (176-200). Mỗi thuật ngữ có "tính cách" riêng!',
      abc: `X:1
M:4/4
L:1/4
K:C
C E G c | c G E C|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '2.6.3',
      title: 'Match the Tempo',
      description:
        'Nghe giai điệu mẫu → điều chỉnh metronome cho khớp. Exercise quan trọng giúp phát triển "internal clock" - cảm giác nhịp bên trong!',
      abc: `X:1
M:4/4
L:1/8
K:C
CDEF GABc | BAGF EDCB,|]`,
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
