/**
 * Module 1, Submodule 1.1: The Staff & Clefs
 *
 * Progressive curriculum:
 * 1. Empty staff (5 lines, 4 spaces)
 * 2. Treble Clef introduction
 * 3. Bass Clef introduction
 * 4. First notes: C, D, E
 * 5. Complete alphabet: F, G, A, B
 * 6. Line/space mnemonics
 * 7. Grand Staff
 */
import type { Submodule } from '../types'

export const SUBMODULE_1_1: Submodule = {
  id: '1.1',
  title: 'The Staff & Clefs',
  description: 'Understanding the 5 lines, Treble Clef (G Clef), and Bass Clef (F Clef)',
  sections: ['theory', 'piano', 'abcDemo'],
  theoryContent: `
## 1. Khuông nhạc (The Musical Staff)

Trước khi học các nốt nhạc, hãy hiểu nơi âm nhạc được viết. **Khuông nhạc** (còn gọi là "staff" hoặc "stave") giống như một chiếc thang cho âm nhạc:

- **5 dòng kẻ ngang** - đánh số từ 1 (dưới cùng) đến 5 (trên cùng)
- **4 khe** giữa các dòng - đánh số từ 1 (dưới cùng) đến 4 (trên cùng)

Mỗi dòng và mỗi khe đại diện cho một cao độ khác nhau. Nốt càng **cao** khi di chuyển lên trên, và càng **thấp** khi di chuyển xuống dưới.

{{abc:Khuông nhạc trống - 5 Dòng & 4 Khe|X:1
L:1/4
K:C clef=treble
x4|]}}

> 💡 **Hãy nghĩ như một chiếc thang**: Bậc cao hơn = âm thanh cao hơn!

{{quiz:Khuông nhạc có bao nhiêu dòng kẻ?|4 dòng;*5 dòng;6 dòng|Khuông nhạc có 5 dòng kẻ ngang, đánh số từ 1 (dưới) đến 5 (trên)}}

---

## 2. Khóa Sol (Treble Clef / G Clef)

**Khóa nhạc** là ký hiệu ở đầu khuông nhạc cho biết tên các nốt. Các khóa khác nhau được dùng cho các nhạc cụ và giọng hát khác nhau.

**Khóa Sol** (còn gọi là **G Clef**) là khóa nhạc phổ biến nhất. Chú ý cách nó cuộn quanh **dòng thứ 2 từ dưới lên** - dòng đó là nốt **Sol (G)**.

{{abc:Khóa Sol - Chú ý dòng Sol|X:1
L:1/4
K:C clef=treble
x4|]}}

**Sử dụng cho:**
- 🎹 Tay phải của Piano
- 🎸 Guitar
- 🎺 Trumpet, Flute, Violin
- 🎤 Giọng Soprano và Alto

{{quiz:Khóa Sol cuộn quanh dòng thứ mấy?|Dòng thứ 1;*Dòng thứ 2;Dòng thứ 3|Khóa Sol cuộn quanh dòng thứ 2 - dòng đó là nốt Sol (G)}}

---

## 3. Khóa Fa (Bass Clef / F Clef)

**Khóa Fa** (còn gọi là **F Clef**) được dùng cho các âm thấp hơn. Chú ý hai chấm bao quanh **dòng thứ 4 từ dưới lên** - dòng đó là nốt **Fa (F)**.

{{abc:Khóa Fa - Chú ý dòng Fa|X:1
L:1/4
K:C clef=bass
x4|]}}

**Sử dụng cho:**
- 🎹 Tay trái của Piano
- 🎻 Cello, Contrabass
- 🎤 Giọng Bass và Baritone
- 🎵 Tuba, Trombone

{{quiz:Khóa Fa có 2 chấm bao quanh dòng thứ mấy?|Dòng thứ 2;Dòng thứ 3;*Dòng thứ 4|Khóa Fa có 2 chấm bao quanh dòng thứ 4 - dòng đó là nốt Fa (F)}}

---

## 4. Những nốt đầu tiên: Đô, Rê, Mi (C, D, E)

Âm nhạc chỉ sử dụng **7 tên chữ cái**: A, B, C, D, E, F, G - rồi lại lặp lại!

Hãy bắt đầu với 3 nốt đầu tiên dễ nhớ nhất:

### Đô giữa (Middle C)
**Middle C** là nốt "căn cứ địa" - nó nằm trên một dòng kẻ nhỏ giữa khuông Sol và khuông Fa.

{{abc:Middle C - Căn cứ địa của bạn|X:1
L:1/2
K:C clef=treble
C2|]}}

### Rê (D) - Một bước lên
**D** cao hơn C một bước. Nó nằm trong khe ngay dưới khuông.

{{abc:Nốt D - Một bước từ C|X:1
L:1/2
K:C clef=treble
D2|]}}

### Mi (E) - Thêm một bước nữa
**E** nằm trên dòng thứ 1 (dòng dưới cùng) của khuông khóa Sol.

{{abc:Nốt E - Dòng thứ 1|X:1
L:1/2
K:C clef=treble
E2|]}}

### C, D, E cùng nhau

{{abc:C D E - Ba nốt đầu tiên|X:1
L:1/2
K:C clef=treble
C D E z|]}}

{{quiz:Nốt E nằm ở đâu trên khuông khóa Sol?|Trong khe thứ 1;*Trên dòng thứ 1 (dưới cùng);Trên dòng thứ 2|Nốt E nằm trên dòng thứ 1 - dòng dưới cùng của khuông khóa Sol}}

---

## 5. Hoàn thành bảng chữ cái: Fa, Sol, La, Si (F, G, A, B)

Bây giờ hãy học 4 nốt còn lại để hoàn thành bảng chữ cái âm nhạc:

### Fa (F) - Khe thứ 1
**F** nằm trong khe thứ 1 của khuông khóa Sol.

{{abc:Nốt F - Khe thứ 1|X:1
L:1/2
K:C clef=treble
F2|]}}

### Sol (G) - Dòng thứ 2 (Dòng Khóa Sol!)
**G** nằm trên dòng thứ 2 - chính là dòng mà khóa Sol cuộn quanh!

{{abc:Nốt G - Dòng Khóa Sol|X:1
L:1/2
K:C clef=treble
G2|]}}

### La (A) - Khe thứ 2
**A** nằm trong khe thứ 2.

{{abc:Nốt A - Khe thứ 2|X:1
L:1/2
K:C clef=treble
A2|]}}

### Si (B) - Dòng thứ 3
**B** nằm trên dòng thứ 3 (dòng giữa).

{{abc:Nốt B - Dòng thứ 3|X:1
L:1/2
K:C clef=treble
B2|]}}

### F, G, A, B cùng nhau

{{abc:F G A B - Hoàn thành bảng chữ cái|X:1
L:1/2
K:C clef=treble
F G A B|]}}

### 🎉 Thang âm C đầy đủ!

{{abc:C D E F G A B C - Một quãng tám!|X:1
L:1/4
K:C clef=treble
C D E F | G A B c|]}}

{{quiz:Nốt G nằm trên dòng nào của khóa Sol?|Dòng thứ 1;*Dòng thứ 2 (dòng khóa Sol);Dòng thứ 3|Nốt G nằm trên dòng thứ 2 - chính là dòng mà khóa Sol cuộn quanh}}

---

## 6. Câu ghi nhớ (Mnemonics)

Bây giờ bạn đã biết các nốt, đây là một số mẹo ghi nhớ để nhớ nốt nào nằm trên dòng, nốt nào nằm trong khe:

### Nốt trên Dòng - Khóa Sol
**Các dòng (từ dưới lên):** E - G - B - D - F (Mi - Sol - Si - Rê - Fa)

> 📝 **"Every Good Boy Does Fine"** hoặc **"Mình Sẽ Sống Rất Fashion"**

{{abc:Nốt trên dòng - Khóa Sol|X:1
L:1/2
K:C clef=treble
E G B d f|]}}

### Nốt trong Khe - Khóa Sol
**Các khe (từ dưới lên):** F - A - C - E (Fa - La - Đô - Mi)

> 📝 **"FACE"** (ghép thành một từ!)

{{abc:Nốt trong khe - Khóa Sol|X:1
L:1/2
K:C clef=treble
F A c e|]}}

### Nốt trên Dòng - Khóa Fa
**Các dòng (từ dưới lên):** G - B - D - F - A (Sol - Si - Rê - Fa - La)

> 📝 **"Good Boys Do Fine Always"** hoặc **"Sống Sao Đẹp Fa La"**

{{abc:Nốt trên dòng - Khóa Fa|X:1
L:1/2
K:C clef=bass
G,, B,, D, F, A,|]}}

### Nốt trong Khe - Khóa Fa
**Các khe (từ dưới lên):** A - C - E - G (La - Đô - Mi - Sol)

> 📝 **"All Cows Eat Grass"** hoặc **"LA ĐÔ MI SOL"**

{{abc:Nốt trong khe - Khóa Fa|X:1
L:1/2
K:C clef=bass
A,, C, E, G,|]}}

{{quiz:Câu nhớ "FACE" giúp nhớ nốt nào trên khuông?|Các nốt trên dòng (E-G-B-D-F);*Các nốt trong khe (F-A-C-E);Tất cả các nốt|FACE là các nốt trong KHE của khóa Sol: F-A-C-E (Fa-La-Đô-Mi)}}

---

## 7. Khuông nhạc Lớn (Grand Staff)

Khi khóa Sol và khóa Fa được nối với nhau bằng một **ngoặc nhọn** (brace), chúng tạo thành **Grand Staff** (Khuông nhạc Lớn). Đây là dạng khuông dùng cho Piano vì nghệ sĩ piano chơi cả nốt cao và nốt thấp cùng lúc.

**Middle C** nằm trên một dòng kẻ phụ nhỏ ngay giữa hai khuông - đây là điểm giao nhau!

{{abc:Middle C - Điểm giao nhau|X:1
L:1/2
K:C clef=treble
C2|]}}

### 🎵 Ví dụ Grand Staff hoàn chỉnh

Bây giờ hãy xem và nghe tất cả các khái niệm này kết hợp lại! Đây là một bài dân ca Anh truyền thống được viết cho grand staff:

{{grandStaff:Bonny Green - Dân ca Anh truyền thống|X:1
T:Bonny Green
C:Traditional English Folk Song
R:Jig
O:Bucknell, England
Q:1/8=180
M:6/8
L:1/8
K:C
%%staves {1 2}
V:1 clef=treble name="Treble"
G | cBc ded | cBA GAB | cBc AGF | EFD C2 |
V:2 clef=bass name="Bass"
z | C,3 G,3 | A,3 E,3 | C,3 F,3 | G,3 C,2 |}}

Chú ý cách **khóa Sol** (khuông trên) mang giai điệu trong khi **khóa Fa** (khuông dưới) cung cấp hòa âm!

{{quiz:Grand Staff được tạo thành từ gì?|Chỉ có khóa Sol;Chỉ có khóa Fa;*Khóa Sol + Khóa Fa nối bằng ngoặc nhọn|Grand Staff = Khóa Sol (treble) + Khóa Fa (bass) được nối với nhau bằng ngoặc nhọn (brace)}}
  `,
  staffAbc: `X:1
T:Bonny Green
C:Traditional English Folk Song
R:Jig
O:Bucknell, England
Q:1/8=180
M:6/8
L:1/8
K:C
%%staves {1 2}
V:1 clef=treble name="Treble"
G | cBc ded | cBA GAB | cBc AGF | EFD C2 |
V:2 clef=bass name="Bass"
z | C,3 G,3 | A,3 E,3 | C,3 F,3 | G,3 C,2 |`,
  abcDemos: [
    {
      id: '1.1.0',
      title: 'Empty Treble Staff',
      description: 'The blank canvas - 5 lines ready for music',
      abc: `X:1
L:1/4
K:C clef=treble
x4|]`,
      interactive: false,
      playable: false,
    },
    {
      id: '1.1.0b',
      title: 'Empty Bass Staff',
      description: 'Bass clef with 5 lines for lower notes',
      abc: `X:1
L:1/4
K:C clef=bass
x4|]`,
      interactive: false,
      playable: false,
    },
    {
      id: '1.1.1a',
      title: 'C, D, E Notes',
      description: 'Your first three notes - the beginning of every scale',
      abc: `X:1
L:1/2
K:C clef=treble
C D E z|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '1.1.1b',
      title: 'F, G, A, B Notes',
      description: 'Complete the musical alphabet',
      abc: `X:1
L:1/2
K:C clef=treble
F G A B|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '1.1.1c',
      title: 'Complete C Scale',
      description: 'All 8 notes from C to C - one octave!',
      abc: `X:1
L:1/4
K:C clef=treble
C D E F | G A B c|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '1.1.2',
      title: 'Treble Clef Line Notes',
      description: 'E - G - B - D - F ("Every Good Boy Does Fine")',
      abc: `X:1
L:1/2
K:C clef=treble
E G B d f|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '1.1.3',
      title: 'Treble Clef Space Notes',
      description: 'F - A - C - E ("FACE")',
      abc: `X:1
L:1/2
K:C clef=treble
F A c e|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '1.1.4',
      title: 'Bass Clef Line Notes',
      description: 'G - B - D - F - A ("Good Boys Do Fine Always")',
      abc: `X:1
L:1/2
K:C clef=bass
G,, B,, D, F, A,|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '1.1.5',
      title: 'Bass Clef Space Notes',
      description: 'A - C - E - G ("All Cows Eat Grass")',
      abc: `X:1
L:1/2
K:C clef=bass
A,, C, E, G,|]`,
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
}
