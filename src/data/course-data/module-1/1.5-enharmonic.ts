/**
 * Module 1, Submodule 1.5: Nốt đồng âm (Enharmonic Equivalents)
 *
 * Learning Journey:
 * 1. Passive: Mystery of the black key - two names, one sound
 * 2. Guided: Carousel through all enharmonic pairs
 * 3. Interactive: Toggle between sharp/flat naming
 * 4. Milestone: Understand context for naming choice
 *
 * Skipped: Game Journey (to be implemented later)
 */
import type { Submodule } from '../types'

export const SUBMODULE_1_5: Submodule = {
  id: '1.5',
  title: 'Nốt đồng âm',
  description: 'Hiểu khái niệm "Một nốt có nhiều tên gọi" - C# = Db, F# = Gb...',
  sections: ['theory', 'piano', 'guitar', 'abcDemo'],
  theoryContent: `
## 1. Bí ẩn của Phím Đen 🔮

### Một phím, hai tên gọi

Hãy nhìn phím đen nằm giữa C và D. Phím này có tên gì?

{{piano:Phím đen giữa C và D - Gọi tên gì?|C4,C#4,D4}}

**Câu trả lời**: Phím đen này có **HAI tên**!

- **Góc nhìn 1**: Nếu ta đi **từ C lên** → nâng C lên nửa cung → **C#** (C Sharp)
- **Góc nhìn 2**: Nếu ta đi **từ D xuống** → hạ D xuống nửa cung → **Db** (D Flat)

{{abc:C# và Db - Cùng âm thanh!|X:1
L:1/2
K:C clef=treble
^C _D|]}}

> 🔔 **Kết luận**: C# và Db là **một phím**, **một âm thanh**, nhưng **hai tên gọi**!



{{quiz:Phím đen giữa C và D có bao nhiêu tên gọi?|1 tên;*2 tên;3 tên|Mỗi phím đen có 2 tên: một tên thăng (Sharp) và một tên giáng (Flat)}}

{{quiz:C# và Db khác nhau như thế nào?|Khác âm thanh;Khác phím đàn;*Cùng âm thanh, khác tên gọi|C# và Db là cùng một phím, cùng âm thanh, chỉ khác tên gọi!}}

---

## 2. Khái niệm Nốt Đồng Âm (Enharmonic)

### Định nghĩa

**Nốt đồng âm (Enharmonic)** là các nốt có **cùng cao độ** (cùng tần số, cùng âm thanh) nhưng được **viết khác tên**.

{{piano:C# = Db (Nốt đồng âm)|C#4,Db4}}

> 🎵 Khi bạn bấm phím đen giữa C và D, âm thanh HOÀN TOÀN GIỐNG NHAU dù bạn gọi nó là C# hay Db!



{{quiz:Nốt đồng âm (Enharmonic) là gì?|Nốt có cao độ khác nhau;*Nốt có cùng cao độ nhưng khác tên;Nốt viết giống nhau|Nốt đồng âm = cùng cao độ, cùng tần số, nhưng được viết bằng tên khác nhau}}

---

## 3. Các cặp đồng âm của 5 phím đen

Trong 1 quãng tám có **5 phím đen**, mỗi phím có 2 tên:

{{piano:5 phím đen = 10 tên gọi!|C#4,D#4,F#4,G#4,A#4}}

| Phím đen # | Tên Thăng (Sharp) | Tên Giáng (Flat) | Ghi chú |
|------------|-------------------|------------------|---------|
| 1 | **C#** | **Db** | Giữa C và D |
| 2 | **D#** | **Eb** | Giữa D và E |
| 3 | **F#** | **Gb** | Giữa F và G |
| 4 | **G#** | **Ab** | Giữa G và A |
| 5 | **A#** | **Bb** | Giữa A và B |

### Minh họa từng cặp

{{piano:Cặp 1: C# = Db|C#4}}

{{piano:Cặp 2: D# = Eb|D#4}}

{{piano:Cặp 3: F# = Gb|F#4}}

{{piano:Cặp 4: G# = Ab|G#4}}

{{piano:Cặp 5: A# = Bb|A#4}}



{{quiz:Trong 1 quãng tám có bao nhiêu phím đen?|4;*5;6|Có 5 phím đen trong 1 quãng tám, mỗi phím có 2 tên gọi = 10 tên}}

{{quiz:Nốt đồng âm của F# là gì?|Fb;*Gb;G#|F# = Gb (phím đen giữa F và G)}}

{{quiz:Nốt đồng âm của Bb là gì?|B#;Ab;*A#|Bb = A# (phím đen giữa A và B)}}

---

## 4. Trường hợp đặc biệt: E#, Fb, B#, Cb

### Nốt khó: Khi phím trắng có tên "lạ"

Nhớ lại bài 1.4: E-F và B-C là nửa cung (không có phím đen giữa).

Điều này dẫn đến những trường hợp đặc biệt:

{{piano:E# = F (cùng phím!)|E4,F4}}

| Phương trình | Giải thích |
|--------------|------------|
| **E# = F** | E thăng lên nửa cung = F |
| **Fb = E** | F giáng xuống nửa cung = E |
| **B# = C** | B thăng lên nửa cung = C |
| **Cb = B** | C giáng xuống nửa cung = B |

{{abc:E# và F - Nghe giống hệt!|X:1
L:1/2
K:C clef=treble
^E F|]}}

{{abc:B# và C - Cùng một nốt!|X:1
L:1/2
K:C clef=treble
^B c|]}}

> 🤯 **Điểm gây "sốc"**: E# và F là CÙNG MỘT PHÍM TRẮNG! B# và C cũng vậy!



{{quiz:E# bằng nốt nào?|E;*F;F#|E thăng lên nửa cung = F (vì E-F vốn chỉ cách nhau nửa cung)}}

{{quiz:B# bằng nốt nào?|B;Bb;*C|B thăng lên nửa cung = C (vì B-C vốn chỉ cách nhau nửa cung)}}

{{quiz:Fb bằng nốt nào?|F;*E;Eb|F giáng xuống nửa cung = E (vì E-F vốn chỉ cách nhau nửa cung)}}

---

## 5. Tại sao cần hai tên? (Ngữ cảnh sử dụng)

### Quy tắc thang âm: Mỗi dòng kẻ = 1 chữ cái

Trong một thang âm, mỗi bậc phải là một **chữ cái khác nhau**. Không được lặp lại chữ cái!

**Ví dụ: Thang âm F Major**

Thang âm F Major cần các nốt: F - G - A - ? - C - D - E - F

Bậc thứ 4 phải là chữ **B** (không được dùng A# vì đã có A ở bậc 3)!

{{abc:F Major Scale - Dùng Bb, không phải A#!|X:1
L:1/4
K:F
F G A B | c d e f|]}}

> ✏️ **Quy tắc**: F - G - A - **Bb** - C - D - E - F ✅
>
> Nếu viết: F - G - A - **A#** - C - D - E - F ❌ (Lặp chữ A!)

### Quy tắc hướng đi

- **Giai điệu đi LÊN** → thường dùng **#** (thăng)
- **Giai điệu đi XUỐNG** → thường dùng **b** (giáng)

{{abc:Đi lên: C → C# → D (dùng thăng)|X:1
L:1/4
K:C clef=treble
C ^C D|]}}

{{abc:Đi xuống: D → Db → C (dùng giáng)|X:1
L:1/4
K:C clef=treble
D _D C|]}}



{{quiz:Trong thang âm F Major, bậc thứ 4 phải viết là gì?|A#;*Bb;B|Phải viết Bb vì không được lặp chữ cái A (đã có ở bậc 3)}}

{{quiz:Khi giai điệu đi LÊN, thường dùng dấu gì?|*Thăng (#);Giáng (b);Bình (♮)|Giai điệu đi lên thường dùng dấu thăng (#)}}

{{quiz:Khi giai điệu đi XUỐNG, thường dùng dấu gì?|Thăng (#);*Giáng (b);Bình (♮)|Giai điệu đi xuống thường dùng dấu giáng (b)}}

---

## 6. Bảng tổng hợp Nốt đồng âm

### Phím đen (5 cặp)

| Sharp | Flat | Vị trí trên Piano |
|-------|------|-------------------|
| C# | Db | Phím đen giữa C-D |
| D# | Eb | Phím đen giữa D-E |
| F# | Gb | Phím đen giữa F-G |
| G# | Ab | Phím đen giữa G-A |
| A# | Bb | Phím đen giữa A-B |

### Phím trắng (4 trường hợp đặc biệt)

| Nốt "lạ" | Nốt thường | Giải thích |
|----------|------------|------------|
| E# | F | E + nửa cung = F |
| Fb | E | F - nửa cung = E |
| B# | C | B + nửa cung = C |
| Cb | B | C - nửa cung = B |



{{quiz:Cb bằng nốt nào?|C;C#;*B|C giáng xuống nửa cung = B (vì B-C vốn chỉ cách nhau nửa cung)}}

{{quiz:Tổng cộng có bao nhiêu cặp nốt đồng âm (cả phím đen và phím trắng)?|5 cặp;7 cặp;*9 cặp|5 cặp phím đen + 4 trường hợp phím trắng (E#=F, Fb=E, B#=C, Cb=B) = 9 cặp}}

---

## 🎯 Tóm tắt

1. **Nốt đồng âm** = Cùng âm thanh, khác tên gọi
2. Mỗi phím đen có **2 tên** (Sharp và Flat)
3. **E# = F, B# = C, Fb = E, Cb = B** là các trường hợp đặc biệt
4. Lựa chọn tên phụ thuộc vào **ngữ cảnh**:
   - Không được lặp chữ cái trong thang âm
   - Đi lên dùng #, đi xuống dùng b

> 💡 **Mẹo nhớ**: Mỗi phím trên đàn có thể có nhiều "biệt danh", nhưng chỉ có một âm thanh!
  `,
  abcDemos: [
    {
      id: '1.5.1',
      title: 'Các cặp Enharmonic',
      description:
        'Nghe các cặp nốt đồng âm: C#/Db, D#/Eb, F#/Gb, G#/Ab. Mỗi cặp chơi 2 nốt liên tiếp - bạn sẽ nghe GIỐNG HỆT NHAU vì đó là cùng một phím đen!',
      abc: `X:1
M:4/4
L:1/2
K:C
^C _D | ^D _E | ^F _G | ^G _A |]`,
      interactive: true,
      playable: true,
    },
    {
      id: '1.5.2',
      title: 'E# = F và B# = C',
      description:
        'Hai trường hợp đặc biệt nhất: E# nghe giống hệt F, B# nghe giống hệt C. Điều này xảy ra vì E-F và B-C vốn chỉ cách nhau nửa cung (không có phím đen giữa).',
      abc: `X:1
M:4/4
L:1/2
K:C
^E F | ^B c |]`,
      interactive: true,
      playable: true,
    },
    {
      id: '1.5.3',
      title: 'Fb = E và Cb = B',
      description:
        'Trường hợp ngược lại: Fb là E giáng xuống nửa cung = vẫn là phím E. Cb là C giáng xuống nửa cung = phím B. Những tên gọi "lạ" này xuất hiện trong một số giọng phức tạp như Gb Major hoặc Cb Major.',
      abc: `X:1
M:4/4
L:1/2
K:C
_F E | _C B,|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '1.5.4',
      title: 'Ngữ cảnh: Đi lên vs Đi xuống',
      description:
        'Khi giai điệu đi LÊN, ta thường viết # (thăng): C → C# → D. Khi đi XUỐNG, ta viết b (giáng): D → Db → C. Dù C# và Db là cùng phím, cách viết giúp người đọc hiểu hướng đi của giai điệu!',
      abc: `X:1
M:4/4
L:1/4
K:C
C ^C D z | D _D C z|]`,
      interactive: true,
      playable: true,
    },
  ],
  exercises: [
    {
      type: 'note-id',
      notes: ['C#4', 'Db4', 'D#4', 'Eb4', 'F#4', 'Gb4', 'G#4', 'Ab4', 'A#4', 'Bb4'],
      questionCount: 5,
    },
  ],
}
