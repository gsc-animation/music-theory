/**
 * Module 5, Submodule 5.6: Chuyển giọng (Modulation)
 */
import type { Submodule } from '../types'

export const SUBMODULE_5_6: Submodule = {
  id: '5.6',
  title: 'Chuyển giọng',
  description: 'Phân biệt Direct vs Pivot Chord modulation và hiệu ứng tạo ra',
  sections: ['theory', 'abcDemo'],
  theoryContent: `
## 1. Modulation là gì?

### Định nghĩa

**Modulation** (Chuyển giọng) là việc **đổi key** (giọng) trong bài hát - từ C Major sang G Major chẳng hạn.

> 🚗 Modulation = "Sang số" trong âm nhạc!

### Tại sao modulate?

- Tăng **năng lượng** (key change lên)
- Thay đổi **mood** (Major → minor)
- Tạo **surprise** và giữ interest

{{quiz:Modulation là gì?|Thay đổi tempo;*Đổi key trong bài hát;Thay đổi volume|Modulation = chuyển từ key này sang key khác}}

---

## 2. Direct Modulation 🚛

### "Truck Driver's Gear Change"

**Direct Modulation** = Nhảy thẳng sang key mới, **không chuẩn bị**!

> Đang C Major → Bùm! → D Major (lên 1 cung)

### Đặc điểm

- **Đột ngột**, không báo trước
- Thường lên **+1/2 hoặc +1 cung**
- Gọi là "gear change" vì giống xe đổi số

### Ví dụ nổi tiếng

- "I Will Always Love You" - Whitney Houston (final chorus)
- "My Heart Will Go On" - Celine Dion
- "Love on Top" - Beyoncé (lên 4 lần liên tiếp!)

{{quiz:Direct Modulation hoạt động như thế nào?|Dùng pivot chord để chuyển mượt;*Nhảy thẳng sang key mới, không chuẩn bị;Dùng common tone|Direct = nhảy thẳng, không chuẩn bị, "truck driver gear change"}}

---

## 3. Pivot Chord Modulation

### Smooth Transition

**Pivot Chord** = Hợp âm thuộc **cả 2 giọng**, dùng làm "cầu nối".

### Ví dụ: C Major → G Major

| Chord | Trong C Major | Trong G Major |
|-------|---------------|---------------|
| **Am** | vi | ii |
| **Em** | iii | vi |
| **D** | II (borrowed) | V |

Am có thể là vi của C **HOẶC** ii của G → Pivot!

### Quy trình

1. Đang ở C Major: C - F - Am...
2. **Am** = pivot (vi của C, ii của G)
3. Am → D7 → G (ii-V-I trong G)
4. Bây giờ ở G Major!

{{quiz:Pivot Chord modulation hoạt động như thế nào?|Nhảy thẳng không chuẩn bị;*Dùng chord chung giữa 2 keys làm cầu nối;Tăng tempo|Pivot chord thuộc cả 2 keys, dùng làm "cầu nối" mượt mà}}

---

## 4. Common Modulation Types

### Lên nửa cung (+1 semitone)

| Từ | Đến | Effect |
|----|-----|--------|
| C | C#/Db | Dramatic lift! |
| G | Ab | Intense! |

### Lên một cung (+2 semitones)

| Từ | Đến | Effect |
|----|-----|--------|
| C | D | Bright, energetic |
| G | A | Fresh, uplifting |

### Relative Key (Major ↔ minor)

| Từ | Đến | Effect |
|----|-----|--------|
| C Major | A minor | Mood change (happy → sad) |
| A minor | C Major | Mood change (sad → hopeful) |

### Parallel Key (Major → minor cùng tonic)

| Từ | Đến | Effect |
|----|-----|--------|
| C Major | C minor | Dark color shift |
| A minor | A Major | Bright surprise |

---

## 5. Nhận biết Modulation

### Dấu hiệu

1. **Accidentals mới** xuất hiện (thêm #/♭)
2. **Cảm giác "mới mẻ"** - scale thay đổi
3. Chord progression **không còn diatonic** trong key cũ

### Ví dụ

Đang C Major, thấy **F#** xuất hiện → có thể đang modulate về G Major!

---

## 6. Modulation trong Pop Songs

### Vị trí phổ biến

- **Trước Final Chorus**: Tăng energy lên max!
- **Bridge → Chorus**: Tạo surprise effect
- **Sau solo**: Quay về với key mới

### "Love on Top" - Beyoncé

Bài hát modulate **4 lần** liên tiếp trong phần cuối:

\`\`\`
Bb → B → C → Db → D (!!!)
\`\`\`

Mỗi lần lên +1/2 cung = Energy ngày càng cao!

---

## 7. Modulation Detection

### Cách nhận biết khi nghe

1. **Cảm giác "lift"**: Bài hát đột nhiên "sáng hơn"
2. **Giọng ca khác**: Ca sĩ hát cao hơn
3. **Chord pattern lặp**: Cùng melody, khác cao độ

### Thử nghiệm

Nghe "I Will Always Love You", bấm nút khi bạn nghe key change!

---

## 8. Kỹ thuật Modulation

### Direct (dễ)

1. Kết thúc phrase ở key cũ
2. Bắt đầu phrase mới ở key mới (thường +1 cung)

### Pivot (smooth)

1. Tìm chord chung giữa 2 keys
2. Chơi pivot chord
3. Chơi V-I của key mới

### Common Tone (mượt nhất)

1. Giữ 1 nốt xuyên suốt
2. Chord thay đổi xung quanh nốt đó
3. Listener không nhận ra đổi key!

---

## 🎯 Tóm tắt

1. **Modulation** = Đổi key trong bài hát
2. **Direct**: Nhảy thẳng, đột ngột ("gear change")
3. **Pivot**: Dùng chord chung, mượt mà
4. **+1/2 cung hoặc +1 cung** = phổ biến nhất
5. **Effect**: Tăng energy, thay đổi mood, surprise

> 💡 **Mẹo**: Nghe "Love on Top" để hiểu power of modulation!
  `,
  abcDemos: [
    {
      id: '5.6.1',
      title: 'Gear Change Demo',
      description: 'Direct +1 step modulation: C Major → D Major. Không chuẩn bị, nhảy thẳng lên! Đây là "truck driver modulation" - đơn giản nhưng hiệu quả, rất phổ biến trong Pop ballad final chorus.',
      abc: `X:1
M:4/4
L:1/4
K:C
C D E G | c B A G |
K:D
D E ^F A | d ^c B A|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '5.6.2',
      title: 'Pivot Chord',
      description: 'Smooth transition: C Major → G Major qua Am (pivot). Am = vi của C VÀ ii của G. Am → D7 → G = ii-V-I trong G Major. Mượt mà, listener không shock!',
      abc: `X:1
M:4/4
L:1/2
K:C
[CEG] [FAc] | [Ace] [D^FA] |
K:G
[GBd] [ceg]|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '5.6.3',
      title: 'Relative Key Shift',
      description: 'C Major ↔ A minor: Cùng hóa biểu, khác tonic. Đây là modulation "tự nhiên nhất" vì hai keys share tất cả nốt. Mood change từ vui → buồn hoặc ngược lại.',
      abc: `X:1
M:4/4
L:1/4
K:C
C E G c | A, C E A|
K:Am
A, B, C D | E F G A|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '5.6.4',
      title: 'Famous Modulations',
      description: 'Real song examples: Whitney Houston "I Will Always Love You" modulates từ A → Bb → B ở final chorus. Mỗi lần lên = emotional boost mới! Modulation là công cụ cảm xúc mạnh mẽ.',
      abc: `X:1
M:4/4
L:1/4
K:A
A B c d |
K:Bb
B c d e |
K:B
B, ^C ^D E|]`,
      interactive: true,
      playable: true,
    },
  ],
  exercises: [{ type: 'note-id', notes: ['C4', 'D4', 'E4', 'G4', 'A4'], questionCount: 5 }],
}
