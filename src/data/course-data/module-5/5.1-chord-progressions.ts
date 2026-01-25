/**
 * Module 5, Submodule 5.1: Tiến trình hợp âm phổ biến (Common Chord Progressions)
 */
import type { Submodule } from '../types'

export const SUBMODULE_5_1: Submodule = {
  id: '5.1',
  title: 'Tiến trình hợp âm phổ biến',
  description: 'Nhận biết các tiến trình Pop/Rock phổ biến và ii-V-I trong Jazz',
  sections: ['theory', 'piano', 'guitar', 'abcDemo'],
  theoryContent: `
## 1. Chord Progression là gì?

### Định nghĩa

**Chord Progression** (Tiến trình hợp âm) là chuỗi các hợp âm theo **thứ tự cố định**, tạo nên "bộ khung" hòa âm của bài hát.

> 🎵 Melody là "lời kể", Progression là "cốt truyện"!

{{quiz:Chord Progression là gì?|Một hợp âm duy nhất;*Chuỗi hợp âm theo thứ tự cố định;Giai điệu của bài hát|Progression = chuỗi hợp âm tạo nên "bộ khung" hòa âm}}

---

## 2. I-V-vi-IV - "The Pop Progression"

### Tiến trình phổ biến nhất thế giới!

> **I - V - vi - IV**
>
> Trong C: **C - G - Am - F**

{{abc:I-V-vi-IV trong C Major|X:1
M:4/4
L:1/1
K:C
[CEG] | [GBd] | [Ace] | [FAc]|]}}

### Bài hát sử dụng

- "Let It Be" - Beatles
- "No Woman No Cry" - Bob Marley
- "With or Without You" - U2
- "Poker Face" - Lady Gaga
- Hàng trăm bài khác!

> 🎤 "4 Chords Song" của Axis of Awesome chứng minh: 1 progression, vô số hits!

{{quiz:I-V-vi-IV trong C Major là progression nào?|C-F-Am-G;*C-G-Am-F;C-Am-F-G|I-V-vi-IV = C(I)-G(V)-Am(vi)-F(IV)}}

---

## 3. I-IV-V-I - "Blues/Rock/Folk"

### Three Chord Wonder

> **I - IV - V - I**
>
> Trong C: **C - F - G - C**

{{abc:I-IV-V-I cơ bản|X:1
M:4/4
L:1/1
K:C
[CEG] | [FAc] | [GBd] | [CEG]|]}}

### 12-Bar Blues

Biến thể kinh điển trong Blues:

\`\`\`
| I  | I  | I  | I  |
| IV | IV | I  | I  |
| V  | IV | I  | V  |
\`\`\`

{{abc:12-Bar Blues (đơn giản)|X:1
M:4/4
L:1/1
K:C
[CEG] | [CEG] | [CEG] | [CEG] | [FAc] | [FAc] | [CEG] | [CEG] | [GBd] | [FAc] | [CEG] | [GBd]|]}}

---

## 4. ii-V-I - "Jazz Essential"

### Cốt lõi của Jazz Harmony

> **ii7 - V7 - Imaj7**
>
> Trong C: **Dm7 - G7 - Cmaj7**

{{abc:ii-V-I trong C Major|X:1
M:4/4
L:1/2
K:C
[DFAc] [GBdf] | [CEGb]2|]}}

### Tại sao mạnh?

1. **Circle of Fifths**: D→G→C (di chuyển theo quãng 5)
2. **Tritone resolution**: G7 chứa B-F, resolve về C-E
3. **Voice leading mượt**: Các nốt di chuyển gần nhau

{{quiz:ii-V-I trong C Major là progression nào?|Am7-D7-Gmaj7;*Dm7-G7-Cmaj7;Em7-A7-Dmaj7|ii-V-I trong C = Dm7(ii)-G7(V)-Cmaj7(I)}}

---

## 5. vi-IV-I-V - "Sad/Epic Version"

### Bắt đầu bằng Minor

> **vi - IV - I - V**
>
> Trong C: **Am - F - C - G**

{{abc:vi-IV-I-V (Epic/Sad)|X:1
M:4/4
L:1/1
K:C
[Ace] | [FAc] | [CEG] | [GBd]|]}}

### Âm hưởng

- Sâu lắng, tráng lệ
- **Epic movie scores** (Hans Zimmer style)
- Ballad, power ballad

---

## 6. I-vi-IV-V - "50s Doo-Wop"

### Nhạc Oldies kinh điển

> **I - vi - IV - V**
>
> Trong C: **C - Am - F - G**

{{abc:50s Doo-Wop Progression|X:1
M:4/4
L:1/1
K:C
[CEG] | [Ace] | [FAc] | [GBd]|]}}

### Bài hát tiêu biểu

- "Stand By Me" - Ben E. King
- "Earth Angel" - The Penguins
- "Every Breath You Take" - The Police

---

## 7. I-IV-vi-V - "Optimistic Pop"

### Năng lượng tích cực

> **I - IV - vi - V**
>
> Trong C: **C - F - Am - G**

{{abc:Optimistic Pop progression|X:1
M:4/4
L:1/1
K:C
[CEG] | [FAc] | [Ace] | [GBd]|]}}

### Cảm xúc

- Lạc quan, hy vọng
- Phổ biến trong **Inspirational Pop**

---

## 8. Chord Sequencer - Tự tạo Progression

### Nguyên tắc cơ bản

1. **Bắt đầu** bằng **I** (hoặc vi)
2. **Kết thúc** bằng **V→I** (authentic) hoặc **I** 
3. **Giữa**: Thử các kết hợp ii, IV, vi
4. **Thử nghiệm**: Không có công thức sai!

### Ví dụ thử nghiệm

| # | Progression | Cảm xúc |
|---|-------------|---------|
| 1 | I-IV-V-I | Classic, đơn giản |
| 2 | I-V-vi-IV | Pop, universal |
| 3 | I-vi-ii-V | Jazzy, sophisticated |
| 4 | vi-IV-I-V | Epic, emotional |

---

## 🎯 Tóm tắt

1. **I-V-vi-IV**: Pop hits progression (C-G-Am-F)
2. **I-IV-V-I**: Blues/Rock/Folk cơ bản
3. **ii-V-I**: Jazz essential (Dm7-G7-Cmaj7)
4. **vi-IV-I-V**: Epic/Sad version
5. **12-Bar Blues**: Structure kinh điển
6. Progression quyết định "mood" và "style"!

> 💡 **Mẹo**: Học 4-5 progressions → đệm được hàng ngàn bài!
  `,
  abcDemos: [
    {
      id: '5.1.1',
      title: 'I-V-vi-IV Loop',
      description:
        'The 4 Chords progression: C-G-Am-F. Axis of Awesome đã chứng minh hàng trăm hit songs dùng CÙNG progression này. Universal và timeless!',
      abc: `X:1
M:4/4
L:1/1
K:C
[CEG] | [GBd] | [Ace] | [FAc]|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '5.1.2',
      title: '12-Bar Blues',
      description:
        'Classic blues structure: I-I-I-I, IV-IV-I-I, V-IV-I-V. 12 ô nhịp với pattern cố định. Nền tảng của Blues, Rock n Roll, và R&B!',
      abc: `X:1
M:4/4
L:1/1
K:C
[C,EG] | [C,EG] | [C,EG] | [C,EG] | [F,Ac] | [F,Ac] | [C,EG] | [C,EG] | [G,Bd] | [F,Ac] | [C,EG] | [G,Bd]|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '5.1.3',
      title: 'ii-V-I Jazz',
      description:
        'Dm7-G7-Cmaj7: Smooth Jazz resolution. Circle of Fifths movement tạo flow tự nhiên. Mọi Jazz standard đều có ii-V-I ở đâu đó!',
      abc: `X:1
M:4/4
L:1/2
K:C
[DFAc] [GBdf] | [CEGb]2|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '5.1.4',
      title: 'Axis Comparison',
      description:
        'Pop vs Sad versions: I-V-vi-IV (pop, starts on I) vs vi-IV-I-V (sad/epic, starts on vi). Cùng 4 chords, khác starting point, khác vibe!',
      abc: `X:1
M:4/4
L:1/1
K:C
"Pop" [CEG] [GBd] [Ace] [FAc] | "Sad" [Ace] [FAc] [CEG] [GBd]|]`,
      interactive: true,
      playable: true,
    },
  ],
  exercises: [{ type: 'chord', questionCount: 5 }],
}
