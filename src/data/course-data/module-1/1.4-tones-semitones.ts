/**
 * Module 1, Submodule 1.4: Cung và Nửa cung (Tones & Semitones)
 *
 * Learning Journey:
 * 1. Passive: Visual demonstration of semitone as smallest step
 * 2. Guided: Piano and Guitar visualization of half/whole steps
 * 3. Interactive: Counting steps between notes
 * 4. Milestone: Identify step types quickly
 *
 * Skipped: Game Journey (to be implemented later)
 */
import type { Submodule } from '../types'

export const SUBMODULE_1_4: Submodule = {
  id: '1.4',
  title: 'Cung và Nửa cung',
  description:
    'Phân biệt Nửa cung (Semitone) và Cung (Tone/Whole step), quy tắc "Mi-Fa" và "Si-Đô"',
  sections: ['theory', 'piano', 'guitar', 'abcDemo'],
  theoryContent: `
## 1. Nửa cung (Semitone / Half Step)

### Định nghĩa

**Nửa cung** (Semitone hoặc Half Step) là **khoảng cách ngắn nhất** giữa hai nốt liền kề trong hệ thống âm nhạc phương Tây.

{{piano:Nửa cung: Khoảng cách ngắn nhất|C4,C#4}}

> 🎹 **Trên Piano**: Nửa cung là khoảng cách từ bất kỳ phím nào đến phím **ngay bên cạnh** (dù là phím trắng hay phím đen).

### Ví dụ trên Piano

{{piano:C → C# (nửa cung)|C4,C#4}}

{{piano:E → F (nửa cung - không có phím đen)|E4,F4}}

{{piano:B → C (nửa cung - không có phím đen)|B3,C4}}

### Trên Guitar

{{guitar:Nửa cung trên Guitar = 1 ngăn phím (fret)|E2,F2}}

> 🎸 **Trên Guitar**: 1 ngăn phím (fret) = 1 nửa cung. Ví dụ: Dây E buông (E2) → Fret 1 (F2) = 1 nửa cung.



{{quiz:Nửa cung (Semitone) là khoảng cách như thế nào?|Bằng 2 phím trên piano;*Từ phím bất kỳ đến phím ngay kế bên;Từ phím trắng đến phím đen|Nửa cung là khoảng cách ngắn nhất - từ bất kỳ phím nào đến phím ngay bên cạnh}}

{{quiz:Trên Guitar, 1 nửa cung bằng bao nhiêu ngăn phím (fret)?|*1 fret;2 frets;3 frets|1 fret = 1 nửa cung trên Guitar}}

---

## 2. Hai cặp nửa cung đặc biệt: E-F và B-C

### Quy tắc quan trọng nhất!

Trên bàn phím Piano, hầu hết các phím trắng liền nhau đều có **1 phím đen ở giữa**. Nhưng có **2 cặp ngoại lệ**:

{{piano:E-F và B-C: Không có phím đen giữa!|E4,F4,B4,C5}}

| Cặp nốt | Khoảng cách | Đặc điểm |
|---------|-------------|----------|
| **E → F** | Nửa cung | Không có phím đen giữa |
| **B → C** | Nửa cung | Không có phím đen giữa |

> ⚠️ **Cực kỳ quan trọng**: Đây là 2 cặp nốt **tự nhiên** (phím trắng) chỉ cách nhau nửa cung. Tất cả các cặp phím trắng khác đều cách nhau 1 cung!

### Câu nhớ tiếng Việt

> 📝 **"Mi-Fa, Si-Đô"** - Hai cặp nửa cung tự nhiên!
> 
> (E = Mi, F = Fa, B = Si, C = Đô)

{{abc:E-F (Nửa cung tự nhiên)|X:1
L:1/2
K:C clef=treble
E F|]}}

{{abc:B-C (Nửa cung tự nhiên)|X:1
L:1/2
K:C clef=treble
B c|]}}



{{quiz:Cặp nốt nào SAU ĐÂY là nửa cung tự nhiên (không có phím đen giữa)?|C và D;*E và F;G và A|E-F và B-C là 2 cặp duy nhất không có phím đen giữa}}

{{quiz:Câu nhớ "Mi-Fa, Si-Đô" giúp nhớ điều gì?|Thứ tự 7 nốt nhạc;*Hai cặp nửa cung tự nhiên;Vị trí khóa Sol|Mi-Fa (E-F) và Si-Đô (B-C) là 2 cặp nốt tự nhiên chỉ cách nhau nửa cung}}

---

## 3. Cung (Tone / Whole Step)

### Định nghĩa

**Cung** (Tone hoặc Whole Step) = **2 nửa cung** cộng lại. Trên Piano, cung là khoảng cách khi bạn **bỏ qua 1 phím**.

{{piano:Cung: C → D (bỏ qua C#)|C4,D4}}

### Công thức

> 🔢 **1 Cung = 2 Nửa cung**
>
> Ví dụ: C → D = C → C# (nửa) + C# → D (nửa) = 1 cung

{{piano:C → C# → D (2 nửa cung = 1 cung)|C4,C#4,D4}}

### Ví dụ các cung

{{piano:C → D (1 cung)|C4,D4}}

{{piano:D → E (1 cung)|D4,E4}}

{{piano:F → G (1 cung)|F4,G4}}

{{piano:G → A (1 cung)|G4,A4}}

{{piano:A → B (1 cung)|A4,B4}}

> ⚠️ **Lưu ý**: E → F và B → C **KHÔNG PHẢI** là 1 cung! 
> - E → F = chỉ có nửa cung
> - B → C = chỉ có nửa cung

### Trên Guitar

{{guitar:Cung trên Guitar = 2 ngăn phím (frets)|E2,F#2}}

> 🎸 **Trên Guitar**: 2 ngăn phím = 1 cung. Ví dụ: Dây E buông → Fret 2 = 1 cung (E → F#).



{{quiz:1 Cung bằng bao nhiêu Nửa cung?|1;*2;3|1 Cung = 2 Nửa cung}}

{{quiz:Khoảng cách C → D là gì?|Nửa cung;*Cung|C → D có phím đen C# ở giữa, nên là 1 Cung (2 nửa cung)}}

{{quiz:Trên Guitar, 1 Cung bằng bao nhiêu frets?|1 fret;*2 frets;3 frets|2 frets = 1 Cung trên Guitar}}

---

## 4. Bảng tổng hợp: Khoảng cách giữa các nốt tự nhiên

Đây là khoảng cách giữa các cặp phím TRẮNG liền kề:

| Từ | Đến | Khoảng cách |
|----|-----|-------------|
| C | D | **Cung** (1 tone) |
| D | E | **Cung** (1 tone) |
| **E** | **F** | **Nửa cung** (½ tone) ⚡ |
| F | G | **Cung** (1 tone) |
| G | A | **Cung** (1 tone) |
| A | B | **Cung** (1 tone) |
| **B** | **C** | **Nửa cung** (½ tone) ⚡ |

> 💡 **Mẹo**: Trong 7 cặp nốt liền kề, có **5 cung** và **2 nửa cung** (E-F và B-C).



{{quiz:Trong 7 cặp nốt tự nhiên liền kề, có bao nhiêu cặp là nửa cung?|1;*2;3|Chỉ có 2 cặp nửa cung: E-F và B-C}}

{{quiz:Khoảng cách A → B là gì?|*Cung;Nửa cung|A → B cách nhau 1 Cung (có phím đen A# ở giữa)}}

---

## 5. Tại sao điều này quan trọng?

### Xây dựng Thang âm (Scale)

Thang âm Major (trưởng) được xây dựng từ pattern cố định của cung và nửa cung:

{{abc:Thang âm C Major - Chú ý E-F và B-C!|X:1
L:1/4
K:C clef=treble
C D E F | G A B c|]}}

**Pattern**: **C** - Cung - **C** - Cung - **Nửa** - Cung - Cung - Cung - **Nửa**

Hay viết ngắn gọn: **W-W-H-W-W-W-H** (W = Whole, H = Half)

### Hiểu Dấu hóa

Khi bạn thăng (#) một nốt, bạn nâng nó lên **nửa cung**.
Khi bạn giáng (♭) một nốt, bạn hạ nó xuống **nửa cung**.

{{piano:C → C# (thăng nửa cung)|C4,C#4}}

{{piano:D → Db (giáng nửa cung)|Db4,D4}}



{{quiz:Thang âm Major (trưởng) có pattern cung và nửa cung như thế nào?|H-H-W-H-H-H-W;*W-W-H-W-W-W-H;W-H-W-H-W-H-W|W-W-H-W-W-W-H (Cung-Cung-Nửa-Cung-Cung-Cung-Nửa)}}

{{quiz:Khi thăng (#) một nốt, bạn nâng nốt đó lên bao nhiêu?|1 Cung;*Nửa cung;2 Cung|Dấu thăng (#) nâng nốt lên nửa cung}}

---

## 🎯 Tóm tắt

| Khái niệm | Định nghĩa | Trên Piano | Trên Guitar |
|-----------|------------|------------|-------------|
| **Nửa cung** | Khoảng cách nhỏ nhất | Phím → phím kế | 1 fret |
| **Cung** | 2 nửa cung | Bỏ qua 1 phím | 2 frets |
| **E-F, B-C** | Ngoại lệ | Phím trắng liền = nửa cung | Cần nhớ! |
  `,
  abcDemos: [
    {
      id: '1.4.1',
      title: 'Nửa cung (Semitones)',
      description:
        'Di chuyển bằng nửa cung: mỗi bước nhỏ nhất có thể. C lên C#, rồi D, rồi D#... Đây là thang âm sắc (chromatic scale) - 12 nốt trong 1 quãng tám.',
      abc: `X:1
M:4/4
L:1/4
K:C
C ^C D ^D | E F ^F G |]`,
      interactive: true,
      playable: true,
    },
    {
      id: '1.4.2',
      title: 'Cung (Whole Steps)',
      description:
        'Di chuyển bằng cung: bỏ qua 1 phím mỗi lần. C → D → E → F# → G#... Đây là thang toàn cung (whole tone scale) - chỉ có 6 nốt, tạo cảm giác mơ màng, lơ lửng.',
      abc: `X:1
M:4/4
L:1/4
K:C
C D E ^F | ^G ^A c |]`,
      interactive: true,
      playable: true,
    },
    {
      id: '1.4.3',
      title: 'E-F và B-C: Nửa cung tự nhiên',
      description:
        'Hai cặp nốt đặc biệt: E-F và B-C. Dù đều là phím trắng, khoảng cách chỉ là nửa cung (không có phím đen giữa). Đây là nền tảng của toàn bộ hệ thống âm nhạc phương Tây!',
      abc: `X:1
M:4/4
L:1/2
K:C
E F | B c |]`,
      interactive: true,
      playable: true,
    },
    {
      id: '1.4.4',
      title: 'So sánh: Cung vs Nửa cung',
      description:
        'Nghe sự khác biệt: C→D là 1 cung (bước lớn), E→F là nửa cung (bước nhỏ). Cung nghe "xa" hơn, nửa cung nghe "gần" hơn. Pattern Cung-Cung-Nửa này chính là công thức của 3 nốt đầu tiên trong thang Major!',
      abc: `X:1
M:4/4
L:1/2
K:C
C D | E F |]`,
      interactive: true,
      playable: true,
    },
  ],
  exercises: [
    {
      type: 'note-id',
      notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'],
      questionCount: 5,
    },
  ],
  // Interleaved Progressive Pattern: Semitones (E-F, B-C) → Whole Steps → Mixed
  // Each level: Recognition → Recall → Application (9 games total, 195 XP)
  // NOTE: step-counter, build-a-step, string-walker don't exist yet - using placeholders
  games: [
    // ===== LEVEL 1: Semitones (E-F, B-C) =====
    {
      type: 'same-different', // Placeholder for step-counter
      labelVi: '🎵 Đếm Bước: Mức 1',
      descriptionVi: 'Nhận diện E-F, B-C (nửa cung)',
      config: {
        notes: ['E4', 'F4', 'B4', 'C5'],
        questionCount: 4,
        xpReward: 10,
      },
    },
    {
      type: 'instrument-match', // Placeholder for build-a-step
      labelVi: '🎹 Xây Bước: Mức 1',
      descriptionVi: 'Chơi nửa cung từ E, B',
      config: {
        notes: ['E4', 'F4', 'B4', 'C5'],
        questionCount: 4,
        xpReward: 15,
      },
    },
    {
      type: 'instrument-match', // Placeholder for string-walker
      labelVi: '🎸 Đi Dây: Mức 1',
      descriptionVi: '1 fret = nửa cung',
      config: {
        notes: ['E2', 'F2', 'B2', 'C3'],
        questionCount: 4,
        xpReward: 20,
      },
    },

    // ===== LEVEL 2: Whole Steps (C-D, F-G, A-B) =====
    {
      type: 'same-different', // Placeholder for step-counter
      labelVi: '🎵 Đếm Bước: Mức 2',
      descriptionVi: 'Nhận diện whole steps',
      config: {
        notes: ['C4', 'D4', 'F4', 'G4', 'A4', 'B4'],
        questionCount: 5,
        xpReward: 15,
      },
    },
    {
      type: 'instrument-match', // Placeholder for build-a-step
      labelVi: '🎹 Xây Bước: Mức 2',
      descriptionVi: 'Chơi cung từ C, F, A',
      config: {
        notes: ['C4', 'D4', 'F4', 'G4', 'A4', 'B4'],
        questionCount: 5,
        xpReward: 20,
      },
    },
    {
      type: 'instrument-match', // Placeholder for string-walker
      labelVi: '🎸 Đi Dây: Mức 2',
      descriptionVi: '2 frets = 1 cung',
      config: {
        notes: ['C3', 'D3', 'F3', 'G3', 'A3', 'B3'],
        questionCount: 5,
        xpReward: 25,
      },
    },

    // ===== LEVEL 3: Mix Semitone + Tone =====
    {
      type: 'same-different', // Placeholder for step-counter
      labelVi: '🎵 Đếm Bước: Mức 3',
      descriptionVi: 'Phân biệt nhanh cung / nửa cung',
      config: {
        notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
        questionCount: 6,
        xpReward: 20,
      },
    },
    {
      type: 'instrument-match', // Placeholder for build-a-step
      labelVi: '🎹 Xây Bước: Mức 3',
      descriptionVi: 'Xây 2-3 bước liên tiếp',
      config: {
        notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
        questionCount: 6,
        xpReward: 30,
      },
    },
    {
      type: 'instrument-match', // Placeholder for string-walker
      labelVi: '🎸 Đi Dây: Mức 3',
      descriptionVi: 'Đi 3-4 semitones',
      config: {
        notes: ['E2', 'F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3'],
        questionCount: 6,
        xpReward: 40,
      },
    },
  ],
}
