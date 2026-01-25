/**
 * Module 3, Submodule 3.4: Quãng - Tính chất (Intervals - Quality)
 *
 * Learning Journey:
 * 1. Passive: Animation comparing Major 3rd (happy) vs Minor 3rd (sad)
 * 2. Guided: "Semitone Counter" - count semitones to determine quality
 * 3. Interactive: Ear training with familiar songs for each interval
 * 4. Milestone: Identify P4, P5, M3, m3 by ear in 80% cases
 *
 * Skipped: Game Journey (to be implemented later)
 */
import type { Submodule } from '../types'

export const SUBMODULE_3_4: Submodule = {
  id: '3.4',
  title: 'Quãng - Tính chất',
  description: 'Phân biệt Perfect (1,4,5,8) vs Major/Minor (2,3,6,7)',
  sections: ['theory', 'abcDemo'],
  theoryContent: `
## 1. Tại sao cần "Tính chất" quãng?

### Vấn đề

Cùng là "Quãng 3" nhưng nghe KHÁC nhau:
- C → E: Vui vẻ, sáng sủa
- C → Eb: Buồn bã, u tối

{{abc:Major 3rd (C-E) vs Minor 3rd (C-Eb)|X:1
L:1/2
K:C
C E | C _E|]}}

> 🎭 **Tính chất (Quality)** cho ta biết quãng đó nghe "vui" hay "buồn"!

{{quiz:Tại sao cần biết "tính chất" của quãng?|Vì quãng có nhiều tên;*Vì cùng số quãng nhưng nghe khác nhau (vui/buồn);Vì muốn đánh số|Cùng là "quãng 3" nhưng C-E (vui) và C-Eb (buồn) nghe khác!}}

---

## 2. Hai nhóm quãng

### Nhóm Perfect (Đúng): 1, 4, 5, 8

Chỉ có các quãng 1 (Unison), 4, 5, 8 (Octave) mới được gọi là **Perfect**.

- Âm thanh: Trong trẻo, "rỗng", ổn định
- Không có Major/Minor

{{abc:Perfect Intervals: P1, P4, P5, P8|X:1
L:1/2
K:C
[CC] [CF] | [CG] [Cc]|]}}

### Nhóm Major/Minor: 2, 3, 6, 7

Các quãng 2, 3, 6, 7 có thể là **Major** (trưởng) hoặc **Minor** (thứ).

- Major: Lớn hơn, vui hơn
- Minor: Nhỏ hơn, buồn hơn

{{abc:Major vs Minor 3rd|X:1
L:1/2
K:C
C E | C _E|]}}

{{quiz:Quãng nào ONLY có tên "Perfect"?|2, 3, 6, 7;*1, 4, 5, 8;Tất cả quãng|Chỉ Unison(1), 4th, 5th, Octave(8) mới gọi là Perfect}}

---

## 3. Đếm Semitones

### Phương pháp xác định tính chất

Đếm số **nửa cung (semitones)** giữa 2 nốt:

| Quãng | Số semitones | Tên đầy đủ |
|-------|--------------|------------|
| **m2** | 1 | Minor 2nd |
| **M2** | 2 | Major 2nd |
| **m3** | 3 | Minor 3rd |
| **M3** | 4 | Major 3rd |
| **P4** | 5 | Perfect 4th |
| **A4/d5** | 6 | Tritone |
| **P5** | 7 | Perfect 5th |
| **m6** | 8 | Minor 6th |
| **M6** | 9 | Major 6th |
| **m7** | 10 | Minor 7th |
| **M7** | 11 | Major 7th |
| **P8** | 12 | Perfect Octave |

{{quiz:Major 3rd có bao nhiêu semitones?|3;*4;5|M3 = 4 semitones. Minor 3rd (m3) = 3 semitones}}

{{quiz:Perfect 5th có bao nhiêu semitones?|5;6;*7|P5 = 7 semitones (Power chord!)}}

---

## 4. Perfect Intervals chi tiết

### Perfect Unison (P1) - 0 semitones

Hai nốt **cùng cao độ**.

{{abc:Perfect Unison|X:1
L:1/2
K:C
[CC]2|]}}

### Perfect 4th (P4) - 5 semitones

- "Here Comes The Bride" 🎶
- Âm thanh: Mở, đang chờ đợi

{{abc:Perfect 4th: C → F|X:1
L:1/2
K:C
C F|]}}

### Perfect 5th (P5) - 7 semitones

- "Star Wars" theme 🌟
- Âm thanh: Power chord, mạnh mẽ

{{abc:Perfect 5th: C → G|X:1
L:1/2
K:C
C G|]}}

### Perfect Octave (P8) - 12 semitones

- "Somewhere Over The Rainbow" (đầu)
- Âm thanh: Đồng nhất hoàn hảo

{{abc:Perfect Octave: C → c|X:1
L:1/2
K:C
C c|]}}

---

## 5. Major vs Minor Intervals

### Major 3rd (M3) - 4 semitones

- **Vui, sáng** 😄
- "Oh When The Saints"
- Nền tảng của hợp âm Major

{{abc:Major 3rd: C → E (4 semitones)|X:1
L:1/2
K:C
C E|]}}

### Minor 3rd (m3) - 3 semitones

- **Buồn, sâu** 😢
- "Greensleeves"
- Nền tảng của hợp âm Minor

{{abc:Minor 3rd: C → Eb (3 semitones)|X:1
L:1/2
K:C
C _E|]}}

### Quy tắc chuyển đổi

> **Major - 1 semitone = Minor**
> **Minor + 1 semitone = Major**

{{quiz:Major 3rd trừ 1 semitone sẽ thành gì?|Major 2nd;*Minor 3rd;Perfect 4th|Major - 1 semitone = Minor. M3 (4) - 1 = m3 (3)}}

---

## 6. Tritone - Quãng "ma quỷ" 👹

### Augmented 4th / Diminished 5th = 6 semitones

- Còn gọi: "**Diabolus in Musica**" (Quỷ trong âm nhạc)
- Chia đôi Octave hoàn hảo (12 ÷ 2 = 6)
- Âm thanh: Căng thẳng tột độ, đáng sợ
- **The Simpsons** theme! 📺

{{abc:Tritone: C → F# (hoặc C → Gb)|X:1
L:1/2
K:C
C ^F|]}}

{{quiz:Tritone có bao nhiêu semitones?|5;*6;7|Tritone = 6 semitones, chia đôi octave (12÷2=6). Âm thanh "ma quỷ"!}}

---

## 7. Ear Training - Bài hát gợi nhớ

### Bảng các bài hát theo quãng

| Quãng | Bài hát | Ghi chú |
|-------|---------|---------|
| **m2** | "Jaws" theme | 🦈 Đáng sợ! |
| **M2** | "Happy Birthday" (đầu) | "Hap-py" |
| **m3** | "Greensleeves" | Buồn |
| **M3** | "Oh When The Saints" | Vui |
| **P4** | "Here Comes The Bride" | Cưới |
| **Tritone** | "The Simpsons" | Hài hước |
| **P5** | "Star Wars" | Epic! |
| **m6** | "Love Story" theme | Lãng mạn buồn |
| **M6** | "My Bonnie Lies Over" | Lãng mạn vui |
| **m7** | "Star Trek" theme | Sci-fi |
| **M7** | "Take On Me" (climax) | Pop |
| **P8** | "Somewhere Over Rainbow" | Dream |

---

## 8. Augmented & Diminished

### Tăng (Augmented - +)

- Perfect + 1 semitone = **Augmented**
- Major + 1 semitone = **Augmented**

{{abc:Augmented 5th: C → G#|X:1
L:1/2
K:C
C ^G|]}}

### Giảm (Diminished - °)

- Perfect - 1 semitone = **Diminished**
- Minor - 1 semitone = **Diminished**

{{abc:Diminished 5th: C → Gb|X:1
L:1/2
K:C
C _G|]}}

---

## 🎯 Tóm tắt

1. **Perfect** (1, 4, 5, 8): Trong trẻo, ổn định
2. **Major/Minor** (2, 3, 6, 7): Major = vui, Minor = buồn
3. **Major - 1 semitone = Minor** (và ngược lại)
4. **Tritone** (6 semitones): Căng thẳng nhất!
5. Dùng **đếm semitones** để xác định tính chất
6. Dùng **bài hát gợi nhớ** để nhận diện bằng tai

> 💡 **Mẹo**: M3 vs m3 quyết định "mood" vui/buồn của hợp âm và bài hát!
  `,
  abcDemos: [
    {
      id: '3.4.1',
      title: 'Major vs Minor 3rd',
      description:
        'Side-by-side comparison: M3 (C-E, 4 semitones) = vui vẻ, sáng sủa như mặt trời. m3 (C-Eb, 3 semitones) = buồn bã, u tối như mưa. Chỉ 1 semitone khác biệt, nhưng cảm xúc hoàn toàn đối lập!',
      abc: `X:1
M:4/4
L:1/2
K:C
C E | C _E|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '3.4.2',
      title: 'Perfect Intervals',
      description:
        'P1 (Unison), P4 (5 semitones), P5 (7 semitones), P8 (12 semitones). Các quãng "hoàn hảo" có âm thanh trong trẻo, ổn định như tảng đá. P5 là base của power chord trong rock!',
      abc: `X:1
M:4/4
L:1/2
K:C
[CC] [CF] | [CG] [Cc]|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '3.4.3',
      title: 'Tritone - "Diabolus in Musica"',
      description:
        'Quãng 6 semitones - chia đôi octave hoàn hảo. Thời Trung cổ bị cấm vì nghe "ma quỷ"! Ngày nay dùng trong nhạc phim kinh dị, jazz, và đặc biệt là theme The Simpsons!',
      abc: `X:1
M:4/4
L:1/2
K:C
C ^F | C _G|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '3.4.4',
      title: 'Interval Song Library',
      description:
        'Danh sách bài hát cho mỗi interval: P4 = "Here Comes The Bride", P5 = "Star Wars", M3 = "Oh When The Saints", m3 = "Greensleeves". Đây là cách drummer và bassist nhớ intervals!',
      abc: `X:1
M:4/4
L:1/4
K:C
C F C G | C E C _E|]`,
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
