/**
 * Module 5, Submodule 5.4: Cấu trúc bài hát (Song Structure)
 */
import type { Submodule } from '../types'

export const SUBMODULE_5_4: Submodule = {
  id: '5.4',
  title: 'Cấu trúc bài hát',
  description: 'Nhận biết Intro, Verse, Pre-Chorus, Chorus, Bridge, Outro',
  sections: ['theory', 'abcDemo'],
  theoryContent: `
## 1. Song Structure là gì?

### Định nghĩa

**Song Structure** là cách tổ chức các **phần (sections)** của bài hát - như bản vẽ kiến trúc cho âm nhạc.

> 🏠 Structure = "Thiết kế ngôi nhà" của bài hát!

---

## 2. Các Section cơ bản

### Intro (Phần mở đầu)

- **Vai trò**: Thiết lập tone, tempo, mood
- **Đặc điểm**: Thường instrumental
- **Độ dài**: 4-8 ô nhịp

### Verse (Đoạn lời)

- **Vai trò**: Kể câu chuyện
- **Đặc điểm**: Lời thay đổi, melody lặp
- **Energy**: Thấp hơn Chorus

### Pre-Chorus (Đoạn dẫn)

- **Vai trò**: Build-up, dẫn dắt lên Chorus
- **Đặc điểm**: Tension tăng dần
- **Cảm giác**: "Sắp bùng nổ!"

### Chorus (Điệp khúc)

- **Vai trò**: Cao trào, Hook chính
- **Đặc điểm**: Lời lặp, hát theo được
- **Energy**: Cao nhất! 🔥

### Bridge (Đoạn cầu)

- **Vai trò**: Thay đổi không khí
- **Đặc điểm**: Giai điệu/hòa âm mới lạ
- **Vị trí**: Sau Chorus 2, trước Final Chorus

### Outro (Phần kết)

- **Vai trò**: Kết thúc bài
- **Đặc điểm**: Fade out hoặc dứt khoát
- **Dư âm**: Để lại ấn tượng cuối

{{quiz:Section nào có energy CAO NHẤT trong bài hát?|Verse;Bridge;*Chorus|Chorus là cao trào, hook chính, energy cao nhất!}}

{{quiz:Pre-Chorus có vai trò gì?|Kết thúc bài;*Tạo build-up dẫn vào Chorus;Kể chuyện|Pre-Chorus tăng tension dần, dẫn listener vào Chorus}}

---

## 3. Cấu trúc phổ biến

### ABABCB Form

\`\`\`
Intro → Verse 1 → Chorus 
      → Verse 2 → Chorus 
      → Bridge → Chorus → Outro
\`\`\`

### Với Pre-Chorus

\`\`\`
Intro → Verse 1 → Pre-Chorus → Chorus 
      → Verse 2 → Pre-Chorus → Chorus 
      → Bridge → Chorus → Outro
\`\`\`

---

## 4. Energy Curve

### Đường cong năng lượng

\`\`\`
Energy
  ▲
10 │         ████████    ████████████
   │       ██             ████████████
 5 │     ██        ██████   
   │    █          █ Bridge
 3 │   █  Verse   █         
 1 │  █            
   └──────────────────────────────────▶ Time
    Intro  V1  Ch  V2  Ch  Br  Final
\`\`\`

### Nguyên tắc

- **Verse**: Thấp (kể chuyện)
- **Pre-Chorus**: Tăng dần (build-up)
- **Chorus**: Cao nhất (bùng nổ!)
- **Bridge**: Drop xuống rồi build lại
- **Final Chorus**: Cao nhất, có thể double!

{{quiz:Energy của Verse so với Chorus như thế nào?|Cao hơn Chorus;*Thấp hơn Chorus;Bằng Chorus|Verse thấp (kể chuyện), Chorus cao (bùng nổ)}}

---

## 5. Đặc điểm từng Section

| Section | Melody | Lyrics | Energy | Vai trò |
|---------|--------|--------|--------|---------|
| **Intro** | Gợi mở | (không) | 3/10 | Hook attention |
| **Verse** | Ngân nga | Thay đổi | 4/10 | Tell story |
| **Pre-Ch** | Ascending | Build up | 6-7/10 | Create tension |
| **Chorus** | Catchy! | Repeat | 10/10 | Memorable hook |
| **Bridge** | Mới lạ | Thay đổi | 5/10 | Refresh |
| **Outro** | Fade | Repeat/none | 2/10 | Closure |

---

## 6. Ví dụ phân tích

### "Someone Like You" - Adele

\`\`\`
Intro (piano) 
→ Verse 1 ("I heard that you...")
→ Pre-Chorus ("Old friend...")
→ Chorus ("Never mind I'll find...")
→ Verse 2 
→ Pre-Chorus 
→ Chorus 
→ Bridge ("Nothing compares...")
→ Chorus (key change!) 
→ Outro
\`\`\`

### "Shape of You" - Ed Sheeran

\`\`\`
Intro (riff)
→ Verse 1
→ Pre-Chorus
→ Chorus
→ Post-Chorus (na na na)
→ Verse 2
→ Pre-Chorus
→ Chorus
→ Post-Chorus
→ Bridge
→ Chorus
→ Outro
\`\`\`

---

## 7. Variations

### Double Chorus

Chơi Chorus **2 lần** ở cuối để tăng impact

### Key Change

Chuyển giọng lên **1/2 hoặc 1 cung** trước Final Chorus (truck driver modulation)

### Post-Chorus

Section ngắn sau Chorus, thường có hook/chant ("na na na", "oh oh oh")

### No Bridge

Một số bài không có Bridge, đi thẳng Chorus → Chorus

---

## 8. Mẹo viết Structure

### 1. Hook sớm

Đưa Chorus xuất hiện **trước 1 phút**

### 2. Contrast

Verse vs Chorus phải **khác biệt** rõ ràng

### 3. Bridge = Surprise

Bridge nên có cái gì **mới** (chord, melody, dynamics)

### 4. Repetition

Chorus lặp 3-4 lần → Listener nhớ!

---

## 🎯 Tóm tắt

1. **Intro**: Mở đầu, hook attention
2. **Verse**: Kể chuyện, energy thấp
3. **Pre-Chorus**: Build-up, tạo expectation
4. **Chorus**: Hook chính, energy max!
5. **Bridge**: Refresh, thay đổi không khí
6. **Outro**: Kết, để lại dư âm

> 💡 **Mẹo**: Chorus = "Thứ người ta nhớ", hãy làm nó memorable!
  `,
  abcDemos: [
    {
      id: '5.4.1',
      title: 'Song Structure Blocks',
      description:
        'Visual block diagram: Intro-Verse-Chorus-Verse-Chorus-Bridge-Chorus-Outro. Mỗi block là một "phòng" trong "ngôi nhà" bài hát.',
      abc: `X:1
M:4/4
L:1/4
K:C
"Verse" C D E F | "Chorus" G A B c|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '5.4.2',
      title: 'Energy Curve',
      description:
        'Verse (low) → Pre-Chorus (building) → Chorus (high!). Energy curve là "heartbeat" của bài hát. Contrast giữa các sections tạo drama!',
      abc: `X:1
M:4/4
L:1/4
K:C
"Low" C E G c | "Build" d e f g | "High!" a b c\' d\'|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '5.4.3',
      title: 'Song Analysis',
      description:
        'Real song breakdown: Nghe và xác định sections. Verse thường có melody thấp hơn, Chorus có hook catchy, Bridge có chords mới lạ.',
      abc: `X:1
M:4/4
L:1/4
K:C
C D E G | A G E C | c B A G | E D C2|]`,
      interactive: true,
      playable: true,
    },
  ],
  exercises: [{ type: 'note-id', notes: ['C4', 'E4', 'G4'], questionCount: 5 }],
}
