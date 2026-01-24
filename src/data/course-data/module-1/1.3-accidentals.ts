/**
 * Module 1, Submodule 1.3: Accidentals (Dấu hóa)
 *
 * Learning Journey:
 * 1. Passive: Animation showing notes "half-stepping" up (Sharp) or down (Flat)
 * 2. Guided: Multi-instrument visualization (Piano, Guitar, Flute)
 * 3. Interactive: Toggle between Sharp/Flat naming for same black key
 * 4. Milestone: Play melody where accidental changes the "mood"
 *
 * Game Suite (3-Tier):
 * - ⭐ Accidental Spotter: Visual recognition on staff
 * - ⭐⭐ Black Key Ninja: Dual-instrument speed game (Piano + Guitar)
 * - ⭐⭐⭐ The Editor: Add accidentals to match audio
 */
import type { Submodule } from '../types'

export const SUBMODULE_1_3: Submodule = {
  id: '1.3',
  title: 'Dấu hóa (Accidentals)',
  description: 'Dấu thăng (♯), Dấu giáng (♭), và Dấu bình (♮) - Phím đen trên Piano',
  sections: ['theory', 'grandStaff', 'piano', 'guitar', 'abcDemo', 'practice'],
  theoryContent: `
## 1. Dấu hóa là gì? (What are Accidentals?)

**Dấu hóa** là những ký hiệu đặc biệt dùng để thay đổi cao độ của một nốt nhạc. Có 3 loại dấu hóa chính:

| Ký hiệu | Tên gọi | Chức năng |
|:-------:|:--------|:----------|
| ♯ | Dấu thăng (Sharp) | Nâng nốt lên **nửa cung** |
| ♭ | Dấu giáng (Flat) | Hạ nốt xuống **nửa cung** |
| ♮ | Dấu bình (Natural) | Hủy bỏ dấu thăng/giáng trước đó |

> 💡 **Nửa cung (Semitone)** là khoảng cách nhỏ nhất giữa 2 nốt liền kề trên đàn.

---

## 2. Dấu Thăng (Sharp - ♯)

Dấu thăng nâng nốt lên **nửa cung** - tức là di chuyển sang **phím bên phải** trên Piano.

{{abc:C đi lên C Sharp|X:1
L:1/2
K:C
C ^C|]}}

### Vị trí trên các nhạc cụ:

{{piano:Nốt C và C♯ trên Piano|C4,C#4}}

{{guitar:Nốt C và C♯ trên Guitar|C3,C#3,C4,C#4}}

{{flute:Nốt C và C♯ trên Sáo|C5,C#5}}

> 📝 **Quy tắc viết**: Dấu ♯ viết **trước** nốt nhạc trên khuông, nhưng đọc **sau** tên nốt.
> Ví dụ: Viết "♯C" nhưng đọc "C Sharp" (Đô thăng)

### Các ví dụ về Dấu Thăng:

{{abc:F đi lên F♯|X:1
L:1/2
K:C
F ^F|]}}

{{piano:F và F♯ - Phím đen bên phải F|F4,F#4}}

{{guitar:F và F♯ trên Guitar|F3,F#3,F4,F#4}}

---

## 3. Dấu Giáng (Flat - ♭)

Dấu giáng hạ nốt xuống **nửa cung** - tức là di chuyển sang **phím bên trái** trên Piano.

{{abc:D đi xuống D Flat (Db)|X:1
L:1/2
K:C
D _D|]}}

### Vị trí trên các nhạc cụ:

{{piano:Nốt D và D♭ trên Piano|D4,Db4}}

{{guitar:Nốt D và D♭ trên Guitar|D3,Db3,D4,Db4}}

{{flute:Nốt D và D♭ trên Sáo|D5,Db5}}

### Các ví dụ về Dấu Giáng:

{{abc:B đi xuống B♭|X:1
L:1/2
K:C
B _B|]}}

{{piano:B và B♭ - Phím đen bên trái B|B3,Bb3,B4,Bb4}}

{{guitar:B và B♭ trên Guitar|B2,Bb2,B3,Bb3}}

---

## 4. Dấu Bình (Natural - ♮)

Dấu bình hủy bỏ dấu thăng hoặc giáng trước đó, đưa nốt trở về trạng thái **tự nhiên**.

{{abc:Từ C♯ trở về C tự nhiên|X:1
L:1/2
K:C
^C =C|]}}

{{piano:C♯ trở về C Natural|C#4,C4}}

{{guitar:C♯ trở về C Natural trên Guitar|C#3,C3,C#4,C4}}

{{flute:C♯ trở về C Natural trên Sáo|C#5,C5}}

---

## 5. Phím Đen = 2 Tên Gọi! 🎹

Mỗi **phím đen** trên Piano có thể được gọi bằng 2 tên khác nhau:

{{piano:5 Phím đen trong 1 quãng tám|C#4,D#4,F#4,G#4,A#4}}

{{guitar:Các nốt thăng/giáng trên Guitar (Octave 3-4)|C#3,D#3,F#3,G#3,A#3,C#4,D#4,F#4,G#4,A#4}}

| Phím đen # | Tên Sharp | Tên Flat | Ghi chú |
|:-----------|:----------|:---------|:--------|
| 1 | C♯ | D♭ | Giữa C và D |
| 2 | D♯ | E♭ | Giữa D và E |
| 3 | F♯ | G♭ | Giữa F và G |
| 4 | G♯ | A♭ | Giữa G và A |
| 5 | A♯ | B♭ | Giữa A và B |

> 🔔 **Hai nốt có cùng âm thanh nhưng khác tên gọi** được gọi là **nốt đồng âm (Enharmonic)**.
> Sẽ học kỹ hơn ở bài 1.5!

---

## 6. Trường hợp đặc biệt: E-F và B-C

Có 2 cặp nốt tự nhiên **không có phím đen** ở giữa:

{{piano:E-F và B-C không có phím đen giữa|E4,F4,B4,C5}}

| Cặp nốt | Khoảng cách | Đặc điểm |
|:--------|:------------|:---------|
| E → F | Nửa cung | Không có phím đen giữa! |
| B → C | Nửa cung | Không có phím đen giữa! |

### Hệ quả thú vị:
- **E♯ = F** (cùng một phím!)
- **F♭ = E** (cùng một phím!)
- **B♯ = C** (cùng một phím!)
- **C♭ = B** (cùng một phím!)

{{abc:E♯ chính là F!|X:1
L:1/2
K:C
^E F|]}}

---

## 7. Quy tắc về Ô nhịp (Bar Rule)

> ⚠️ **Quan trọng**: Dấu hóa chỉ có hiệu lực trong **ô nhịp hiện tại**.

{{abc:Dấu hóa trong ô nhịp|X:1
M:4/4
L:1/4
K:C
C ^C G C | C G A B |]}}

Trong ví dụ trên:
- **Ô nhịp 1**: Nốt C thứ 2 là C♯ (có dấu thăng), nốt C cuối cũng là C♯ (theo quy tắc ô nhịp)
- **Ô nhịp 2**: Nốt C đầu tiên là C **tự nhiên** (sang ô nhịp mới, dấu hóa tự hết)

---

## 8. Hóa Biểu - Key Signature 🎼

**Hóa biểu** là các dấu thăng (♯) hoặc giáng (♭) được viết **ngay đầu khuông nhạc**, sau khóa Sol/Fa.

{{abc:Hóa biểu G Major (1 dấu thăng F♯)|X:1
M:4/4
L:1/4
K:G
G A B c | d e ^f g |]}}

### Ý nghĩa của Hóa Biểu:

Khi bạn thấy dấu ♯ hoặc ♭ ở **đầu khuông nhạc**:
- **Tất cả** các nốt trên dòng/khe đó trong **toàn bài** đều phải chơi thăng/giáng
- Không cần viết dấu hóa trước mỗi nốt - tiết kiệm và gọn gàng!

> 💡 Ví dụ: Nếu có ♯ trên vạch F ở đầu khuông, **mọi nốt F** trong bản nhạc đều là **F♯**!

{{piano:F và F♯ - Hóa biểu làm F thành F♯ suốt bài|F4,F#4}}

### So sánh: Có và Không có Hóa Biểu

Nếu **không có** hóa biểu, bạn phải viết dấu ♯ trước **mỗi** nốt F:

{{abc:Không có hóa biểu - Viết ♯ trước mỗi F|X:1
M:4/4
L:1/4
K:C
G A B c | d e ^F G | A B c d | e ^F G A |]}}

Nếu **có** hóa biểu (F♯), bạn chỉ cần viết 1 lần ở đầu:

{{abc:Có hóa biểu - Tất cả F đều là F♯|X:1
M:4/4
L:1/4
K:G
G A B c | d e F G | A B c d | e F G A |]}}

### ✨ Dấu Bình (♮) trở nên quan trọng!

Trong bản nhạc có **hóa biểu**, dấu bình **Natural (♮)** được dùng để:
- **Hủy bỏ tạm thời** dấu thăng/giáng trong hóa biểu
- Đưa nốt về trạng thái **tự nhiên** chỉ trong **ô nhịp đó**

{{abc:Dùng dấu bình để hủy hóa biểu tạm thời|X:1
M:4/4
L:1/4
K:G
G A B c | d e =F G | A B F G |]}}

Ở đây:
- Hóa biểu có F♯
- Nốt **=F** (có dấu bình) trở về F tự nhiên trong ô nhịp 2
- Sang ô nhịp 3, F lại là F♯ (theo hóa biểu)

> 🔔 **Nhớ**: Dấu bình chỉ có hiệu lực trong **ô nhịp hiện tại**!

---

## 🎮 Sẵn sàng cho Thử thách!

Bây giờ bạn đã hiểu về dấu hóa, hãy thử sức với các game:

1. **Soi Dấu Hóa** ⭐: Nhìn nốt trên khuông, đoán đúng tên nốt có dấu hóa
2. **Ninja Phím Đen** ⭐⭐: Thi tốc độ bấm đúng phím đen trên Piano hoặc Guitar!
3. **Biên Tập Viên** ⭐⭐⭐: Nghe giai điệu và thêm dấu hóa đúng vào khuông nhạc
  `,
  staffAbc: `X:1
T:Chromatic Adventure
C:Music Theory Demo
M:4/4
L:1/4
K:C
%%staves {1 2}
V:1 clef=treble name="Treble"
C ^C D ^D | E F ^F G | ^G A ^A B | c z z z |
V:2 clef=bass name="Bass"
C,, z D,, z | E,, F,, z G,, | z A,, z B,, | C, z z z |`,
  abcDemos: [
    {
      id: '1.3.1',
      title: 'Dãy nốt Thăng (Sharps)',
      description:
        'Các nốt cơ bản và phiên bản thăng của chúng. Lắng nghe cách nốt thăng nghe "cao hơn một chút" so với nốt gốc. Trên Piano, mỗi dấu thăng là phím đen bên phải nốt gốc.',
      abc: `X:1
M:4/4
L:1/4
K:C
C ^C D ^D | E F ^F G | ^G A ^A B |]`,
      interactive: true,
      playable: true,
    },
    {
      id: '1.3.2',
      title: 'Dãy nốt Giáng (Flats)',
      description:
        'Các nốt cơ bản và phiên bản giáng của chúng. Lắng nghe cách nốt giáng nghe "thấp hơn một chút" so với nốt gốc. Trên Piano, mỗi dấu giáng là phím đen bên trái nốt gốc.',
      abc: `X:1
M:4/4
L:1/4
K:C
D _D E _E | G _G A _A | B _B c |]`,
      interactive: true,
      playable: true,
    },
    {
      id: '1.3.3',
      title: 'Dấu Bình (Naturals)',
      description:
        'Dấu bình (♮) hủy bỏ dấu thăng/giáng trước đó. Ở đây bạn thấy C♯ quay về C tự nhiên, và B♭ quay về B tự nhiên.',
      abc: `X:1
M:4/4
L:1/4
K:C
C ^C =C z | B _B =B z |]`,
      interactive: true,
      playable: true,
    },
    {
      id: '1.3.4',
      title: '5 Phím đen trong 1 Octave',
      description:
        'Tất cả 5 phím đen (C♯, D♯, F♯, G♯, A♯) được thể hiện trên khuông nhạc. Mỗi phím đen này còn có tên gọi khác (D♭, E♭, G♭, A♭, B♭) - chúng là các nốt đồng âm!',
      abc: `X:1
M:4/4
L:1/4
K:C
^C ^D ^F ^G | ^A z z z |]`,
      interactive: true,
      playable: true,
    },
    {
      id: '1.3.5',
      title: 'Quy tắc Ô nhịp',
      description:
        'Dấu hóa chỉ có hiệu lực trong ô nhịp hiện tại. Ở ô nhịp 1, tất cả nốt F đều là F♯. Sang ô nhịp 2, F trở về tự nhiên trừ khi có dấu thăng mới.',
      abc: `X:1
M:4/4
L:1/4
K:C
C ^F G F | C F G F |]`,
      interactive: true,
      playable: true,
    },
    {
      id: '1.3.6',
      title: 'Enharmonic: E♯ = F',
      description:
        'Trường hợp đặc biệt: E♯ và F là cùng một phím! Vì giữa E và F không có phím đen, nên E nâng lên nửa cung chính là F. Tương tự, B♯ = C.',
      abc: `X:1
M:4/4
L:1/2
K:C
^E F | ^B c |]`,
      interactive: true,
      playable: true,
    },
  ],
  exercises: [
    {
      type: 'accidental-game',
      gameType: 'module-1.3',
      questionCount: 10,
    },
  ],
}
