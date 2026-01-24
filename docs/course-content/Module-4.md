# 📚 Module 4: Hòa âm - Nền tảng (Harmony - The Core)

> Tài liệu này mô tả chi tiết nội dung các bài học về hòa âm cơ bản, áp dụng mô hình **UX Journey Pattern** đã được chứng minh hiệu quả từ Module 1.

---

## 4.1 Hợp âm ba nốt (Triads)

> 📋 **Chưa triển khai**: Sẽ được implement tại `src/data/course-data/module-4/4.1-triads.ts`

**UX Journey Pattern (4 bước):**

1. **Passive**: Animation "xếp chồng người tuyết" - 3 nốt chồng lên nhau
2. **Guided**: Chord Builder - chọn Root, auto-show 3rd và 5th
3. **Interactive**: Xây dựng C, G, F, Am trên Piano và Guitar
4. **Milestone**: Chơi được 4 hợp âm cơ bản liên tiếp (C-G-Am-F)

**Mục tiêu học tập (Learning Objectives):**

- Hiểu cấu trúc Triad: Root + 3rd + 5th
- Xây dựng hợp âm từ bất kỳ nốt nào
- Chơi được các hợp âm cơ bản trên Piano và Guitar

**Cấu trúc nội dung (`theoryContent`):**

#### Section 1: Khái niệm Chord (Hợp âm)

| Nội dung giảng dạy                       | Cách triển khai                  |
| :--------------------------------------- | :------------------------------- |
| Hợp âm = 3 nốt trở lên vang lên cùng lúc | Audio: 1 nốt đơn vs 3 nốt hợp âm |
| Triad = hợp âm cơ bản nhất (3 nốt)       | Visual: "người tuyết" 3 tầng     |
| Cảm giác "đầy đặn" của hòa âm            | So sánh giai điệu đơn vs có đệm  |

#### Section 2: Root, 3rd, 5th

| Thành phần         | Vai trò                   | Visual             |
| :----------------- | :------------------------ | :----------------- |
| **Root** (Nốt gốc) | Tên hợp âm, nằm dưới cùng | Highlight màu đỏ   |
| **3rd** (Quãng 3)  | Quyết định Major/Minor    | Highlight màu xanh |
| **5th** (Quãng 5)  | Tạo độ ổn định            | Highlight màu vàng |

#### Section 3: Xây dựng C Major Triad

| Nội dung giảng dạy         | Cách triển khai (Multi-instrument) |
| :------------------------- | :--------------------------------- | ------------------------- |
| Root = C, 3rd = E, 5th = G | `{{piano:C Major Chord             | C4,E4,G4}}`               |
| Chồng 2 quãng 3 lên nhau   | Animation xây từng nốt             |
| `{{guitar:C Major          | C3,E3,G3,C4,E4}}`                  | Guitar open chord diagram |

#### Section 4: G Major, F Major, A minor

| Hợp âm      | Nốt                      | Demo         |
| :---------- | :----------------------- | :----------- | ------------------------- | ------ |
| **G Major** | G - B - D                | `{{piano:... | G3,B3,D4}}`+`{{guitar:... | ...}}` |
| **F Major** | F - A - C                | `{{piano:... | F3,A3,C4}}`+`{{guitar:... | ...}}` |
| **A minor** | A - C - E (quãng 3 thứ!) | `{{piano:... | A3,C4,E4}}`               |

**ABC Demos (Interactive Examples):**

| ID    | Title                   | Mô tả nội dung              |
| :---- | :---------------------- | :-------------------------- |
| 4.1.1 | Triad Stacking          | Animation xếp 3 nốt         |
| 4.1.2 | C-G-Am-F Loop           | 4 chords progression        |
| 4.1.3 | Piano vs Guitar Voicing | Cùng hợp âm, khác cách đánh |

**Thiết kế Game (3-Tier Progression):**

| Cấp độ | Tên Game          | Mô tả Gameplay                      |
| :----- | :---------------- | :---------------------------------- |
| ⭐     | **Chord Note ID** | Hợp âm C gồm những nốt nào? (C-E-G) |
| ⭐⭐   | **Chord Builder** | Chọn Root → điền 3rd và 5th đúng    |
| ⭐⭐⭐ | **Chord Play**    | Chơi đúng chord trên Piano/Guitar   |

---

## 4.2 Tính chất hợp âm (Chord Qualities)

> 📋 **Chưa triển khai**: Sẽ được implement tại `src/data/course-data/module-4/4.2-chord-qualities.ts`

**UX Journey Pattern (4 bước):**

1. **Passive**: Animation so sánh C Major (vui 😄) vs C minor (buồn 😢)
2. **Guided**: "Emotion Matcher" - nghe hợp âm, chọn emoji phù hợp
3. **Interactive**: Toggle giữa 4 tính chất: Major, minor, dim, aug
4. **Milestone**: Phân biệt đúng 4 loại hợp âm bằng tai trong 80% cases

**Mục tiêu học tập (Learning Objectives):**

- Phân biệt 4 tính chất: Major, Minor, Diminished, Augmented
- Hiểu công thức interval cho mỗi loại
- Liên kết tính chất với cảm xúc (emotion mapping)

**Cấu trúc nội dung (`theoryContent`):**

#### Section 1: Major vs Minor

| Tính chất | Công thức                    | Cảm xúc      | Ký hiệu     |
| :-------- | :--------------------------- | :----------- | :---------- |
| **Major** | M3 + m3 (dưới lớn, trên nhỏ) | Vui, sáng 😄 | C, CM, Cmaj |
| **Minor** | m3 + M3 (dưới nhỏ, trên lớn) | Buồn, sâu 😢 | Cm, Cmin, c |

#### Section 2: Diminished & Augmented

| Tính chất      | Công thức               | Cảm xúc                | Ký hiệu  |
| :------------- | :---------------------- | :--------------------- | :------- |
| **Diminished** | m3 + m3 (2 quãng 3 nhỏ) | Căng thẳng, đáng sợ 😱 | Cdim, C° |
| **Augmented**  | M3 + M3 (2 quãng 3 lớn) | Mơ hồ, lơ lửng ☁️      | Caug, C+ |

#### Section 3: Audio Comparison

| Nội dung giảng dạy           | Cách triển khai        |
| :--------------------------- | :--------------------- |
| 4 buttons: C, Cm, Cdim, Caug | Click để nghe so sánh  |
| Emotion mapping với emoji    | Visual feedback        |
| Cùng Root, khác tính chất    | Highlight 3rd thay đổi |

**ABC Demos (Interactive Examples):**

| ID    | Title              | Mô tả nội dung       |
| :---- | :----------------- | :------------------- |
| 4.2.1 | Major vs Minor     | Side-by-side C vs Cm |
| 4.2.2 | Diminished "Scary" | Horror movie chord   |
| 4.2.3 | Augmented "Dreamy" | Floating, unresolved |
| 4.2.4 | Quality Toggle     | Switch between all 4 |

**Thiết kế Game (3-Tier Progression):**

| Cấp độ | Tên Game                          | Mô tả Gameplay                         |
| :----- | :-------------------------------- | :------------------------------------- |
| ⭐     | **Chord Quality ID**              | Nhìn nốt → Major, minor, dim, hay aug? |
| ⭐⭐   | **Ear Training: Major or Minor?** | Nghe → đoán tính chất                  |
| ⭐⭐⭐ | **Full Quality ID**               | Nghe → xác định cả 4 loại              |

---

## 4.3 Hợp âm trong giọng (Diatonic Chords)

> 📋 **Chưa triển khai**: Sẽ được implement tại `src/data/course-data/module-4/4.3-diatonic-chords.ts`

**UX Journey Pattern (4 bước):**

1. **Passive**: Animation "xây nhà tầng" - chồng quãng 3 lên từng bậc của scale
2. **Guided**: Xây dựng 7 hợp âm trong giọng C step-by-step
3. **Interactive**: Chord Finder - chọn giọng, xem tất cả diatonic chords
4. **Milestone**: Xác định đúng tất cả 7 hợp âm trong giọng G và F

**Mục tiêu học tập (Learning Objectives):**

- Xây dựng 7 hợp âm từ 7 bậc của âm giai
- Nhớ quy luật: I-ii-iii-IV-V-vi-vii° (M-m-m-M-M-m-dim)
- Nhận biết "3 anh cả" I, IV, V (Primary chords)

**Cấu trúc nội dung (`theoryContent`):**

#### Section 1: Xây dựng Diatonic Chords

| Nội dung giảng dạy                       | Cách triển khai           |
| :--------------------------------------- | :------------------------ |
| Lấy C Major Scale làm nền: C-D-E-F-G-A-B | 7 nốt hiển thị            |
| Chồng quãng 3 lên TỪNG nốt               | Animation "mọc" thêm nốt  |
| Chỉ dùng nốt TRONG âm giai               | ⚠️ "Stay within the key!" |

#### Section 2: 7 hợp âm trong giọng C

| Bậc  | Nốt   | Hợp âm   | Tính chất  | Giải thích               |
| :--- | :---- | :------- | :--------- | :----------------------- |
| I    | C-E-G | **C**    | Major      | Root chord               |
| ii   | D-F-A | **Dm**   | minor      | F tự nhiên (không có F#) |
| iii  | E-G-B | **Em**   | minor      | G tự nhiên               |
| IV   | F-A-C | **F**    | Major      | Subdominant              |
| V    | G-B-D | **G**    | Major      | Dominant                 |
| vi   | A-C-E | **Am**   | minor      | Relative minor           |
| vii° | B-D-F | **Bdim** | diminished | Tritone inside!          |

#### Section 3: Quy luật I-ii-iii-IV-V-vi-vii°

| Nội dung giảng dạy                    | Cách triển khai           |
| :------------------------------------ | :------------------------ |
| Mọi giọng Trưởng: **M-m-m-M-M-m-dim** | Bảng công thức            |
| Chữ hoa = Major, chữ thường = minor   | I vs ii                   |
| "3 anh cả" I, IV, V                   | Highlight 3 trụ cột chính |

**ABC Demos (Interactive Examples):**

| ID    | Title                    | Mô tả nội dung         |
| :---- | :----------------------- | :--------------------- |
| 4.3.1 | Building Diatonic Chords | Animation step-by-step |
| 4.3.2 | I-IV-V Primary Chords    | 3 hợp âm chính         |
| 4.3.3 | vii° Diminished          | The "spicy" chord      |
| 4.3.4 | Key of G Diatonic        | G-Am-Bm-C-D-Em-F#dim   |

**Thiết kế Game (3-Tier Progression):**

| Cấp độ | Tên Game              | Mô tả Gameplay                          |
| :----- | :-------------------- | :-------------------------------------- |
| ⭐     | **Diatonic Chord ID** | Bậc vi của C là gì? (Am)                |
| ⭐⭐   | **Quality Pattern**   | Điền M/m/dim cho I-ii-iii-IV-V-vi-vii°  |
| ⭐⭐⭐ | **Diatonic Builder**  | Điền các hợp âm còn thiếu trong giọng F |

---

## 4.4 Ký hiệu số La Mã (Roman Numeral Analysis)

> 📋 **Chưa triển khai**: Sẽ được implement tại `src/data/course-data/module-4/4.4-roman-numerals.ts`

**UX Journey Pattern (4 bước):**

1. **Passive**: Animation chuyển đổi C-G-Am-F → I-V-vi-IV (numbers không đổi khi đổi key)
2. **Guided**: Nashville Number System explanation
3. **Interactive**: Transposer tool - đổi key, giữ nguyên numbers
4. **Milestone**: Chơi I-V-vi-IV trong 3 giọng khác nhau (C, G, D)

**Mục tiêu học tập (Learning Objectives):**

- Hiểu tại sao dùng số La Mã (transpose dễ dàng)
- Đọc và viết Roman Numeral analysis
- Áp dụng Nashville Number System

**Cấu trúc nội dung (`theoryContent`):**

#### Section 1: Tại sao dùng số?

| Nội dung giảng dạy            | Cách triển khai                              |
| :---------------------------- | :------------------------------------------- |
| Số La Mã áp dụng cho MỌI tone | Animation Key change: C→G, numbers không đổi |
| Nashville Number System       | Sheet nhạc chỉ ghi số                        |
| Transpose dễ dàng             | Slider thay đổi Key                          |

#### Section 2: Quy tắc viết

| Ký hiệu                      | Ý nghĩa     | Ví dụ                   |
| :--------------------------- | :---------- | :---------------------- |
| **Chữ hoa** (I, IV, V)       | Major chord | I = C Major trong key C |
| **Chữ thường** (ii, iii, vi) | minor chord | vi = Am trong key C     |
| **° (vii°)**                 | diminished  | vii° = Bdim trong key C |

#### Section 3: I-V-vi-IV - "The Axis"

| Nội dung giảng dạy           | Cách triển khai                 |
| :--------------------------- | :------------------------------ | ----------- |
| Trong C: C → G → Am → F      | `{{piano:...                    | ...}}` loop |
| Trong G: G → D → Em → C      | Same progression, different key |
| Nghe giống hệt về "tình cảm" | Audio Compare button            |

**ABC Demos (Interactive Examples):**

| ID    | Title                | Mô tả nội dung                  |
| :---- | :------------------- | :------------------------------ |
| 4.4.1 | Roman Numeral Chart  | I-ii-iii-IV-V-vi-vii° reference |
| 4.4.2 | I-V-vi-IV in C, G, D | Same progression, 3 keys        |
| 4.4.3 | Transposer Tool      | Interactive key change          |

**Thiết kế Game (3-Tier Progression):**

| Cấp độ | Tên Game                   | Mô tả Gameplay                      |
| :----- | :------------------------- | :---------------------------------- |
| ⭐     | **Roman Convert**          | Am trong key C = ? (vi)             |
| ⭐⭐   | **Transpose Quiz**         | I-V-vi-IV trong G là gì? (G-D-Em-C) |
| ⭐⭐⭐ | **Roman Progression Play** | Chơi tiến trình I-IV-V trong key D  |

---

## 4.5 Vòng quãng 5 (The Circle of Fifths)

> 📋 **Chưa triển khai**: Sẽ được implement tại `src/data/course-data/module-4/4.5-circle-of-fifths.ts`

**UX Journey Pattern (4 bước):**

1. **Passive**: Animation vòng tròn xoay với C ở 12 giờ
2. **Guided**: Click vào giọng → hiện hóa biểu và relative minor
3. **Interactive**: Navigation game - di chuyển theo chiều kim đồng hồ/ngược chiều
4. **Milestone**: Xác định đúng vị trí và số dấu hóa cho 12 giọng

**Mục tiêu học tập (Learning Objectives):**

- Hiểu cấu trúc Circle of Fifths
- Sử dụng để xác định hóa biểu
- Nhận biết quan hệ giữa các giọng "hàng xóm"

**Cấu trúc nội dung (`theoryContent`):**

#### Section 1: Cấu trúc vòng tròn

| Nội dung giảng dạy                    | Cách triển khai             |
| :------------------------------------ | :-------------------------- |
| Giống mặt đồng hồ: **C ở 12 giờ**     | Interactive Circle          |
| Mỗi bước phải = Quãng 5 đúng (C→G→D)  | Animation chiều kim đồng hồ |
| Mỗi bước trái = Quãng 4 đúng (C→F→Bb) | Animation ngược chiều       |

#### Section 2: Chiều kim đồng hồ = Thêm

| Giọng     | Số # | Dấu thăng mới |
| :-------- | :--- | :------------ |
| C → **G** | 1#   | F#            |
| G → **D** | 2#   | C#            |
| D → **A** | 3#   | G#            |
| A → **E** | 4#   | D#            |

#### Section 3: Ngược chiều = Thêm ♭

| Giọng       | Số ♭ | Dấu giáng mới |
| :---------- | :--- | :------------ |
| C → **F**   | 1♭   | B♭            |
| F → **B♭**  | 2♭   | E♭            |
| B♭ → **E♭** | 3♭   | A♭            |
| E♭ → **A♭** | 4♭   | D♭            |

#### Section 4: Vòng trong = Relative Minor

| Nội dung giảng dạy                | Cách triển khai    |
| :-------------------------------- | :----------------- |
| A minor ở 12 giờ (dưới C Major)   | Inner circle       |
| Cùng hóa biểu với Major tương ứng | Link Major ↔ minor |

**ABC Demos (Interactive Examples):**

| ID    | Title                   | Mô tả nội dung               |
| :---- | :---------------------- | :--------------------------- |
| 4.5.1 | Circle Navigation       | Click để xoay, hiện key info |
| 4.5.2 | Sharp Keys (right side) | G, D, A, E, B, F#            |
| 4.5.3 | Flat Keys (left side)   | F, Bb, Eb, Ab, Db, Gb        |
| 4.5.4 | Relative Pairs          | Major + minor cùng vị trí    |

**Thiết kế Game (3-Tier Progression):**

| Cấp độ | Tên Game              | Mô tả Gameplay                       |
| :----- | :-------------------- | :----------------------------------- |
| ⭐     | **Circle Key ID**     | A Major ở đâu? Có mấy #? (3 giờ, 3#) |
| ⭐⭐   | **Circle Navigation** | Điền tên giọng còn thiếu trên vòng   |
| ⭐⭐⭐ | **Neighbor Keys**     | Giọng nào "hàng xóm" với E Major?    |

---

## 4.6 Đảo hợp âm (Chord Inversions)

> 📋 **Chưa triển khai**: Sẽ được implement tại `src/data/course-data/module-4/4.6-inversions.ts`

**UX Journey Pattern (4 bước):**

1. **Passive**: Animation C chord "xoay vòng" qua 3 vị trí (Root, 1st, 2nd)
2. **Guided**: Piano demo voice leading: C → F/C (giữ C làm bass)
3. **Interactive**: Inversion Switcher - click để đổi giữa các thế
4. **Milestone**: Chơi được I-IV-V với smooth voice leading

**Mục tiêu học tập (Learning Objectives):**

- Hiểu 3 vị trí: Root Position, 1st Inversion, 2nd Inversion
- Đọc được ký hiệu slash chord (C/E, C/G)
- Áp dụng voice leading để chuyển hợp âm mượt mà

**Cấu trúc nội dung (`theoryContent`):**

#### Section 1: Root Position

| Nội dung giảng dạy              | Cách triển khai                          |
| :------------------------------ | :--------------------------------------- |
| Root nằm dưới cùng (Bass)       | `{{abc:C E G}}` "Người tuyết đứng thẳng" |
| Cấu trúc: 3rd + 3rd (xếp chồng) | Visual building blocks                   |

#### Section 2: First Inversion

| Nội dung giảng dạy                       | Cách triển khai        |
| :--------------------------------------- | :--------------------- |
| Root chuyển lên octave, **3rd nằm bass** | `{{abc:E G c}}`        |
| Ký hiệu: **C/E** (C over E)              | Visual: nốt C lên trên |
| Âm hưởng: Nhẹ hơn, chưa ổn định          | Audio demo             |

#### Section 3: Second Inversion

| Nội dung giảng dạy                            | Cách triển khai        |
| :-------------------------------------------- | :--------------------- |
| 3rd chuyển tiếp, **5th nằm bass**             | `{{abc:G c e}}`        |
| Ký hiệu: **C/G** (C over G)                   | Visual: nốt E lên trên |
| Âm hưởng: Chơi vơi, thường dùng cadential 6/4 | Audio demo             |

#### Section 4: Voice Leading

| Nội dung giảng dạy                     | Cách triển khai            |
| :------------------------------------- | :------------------------- |
| Di chuyển các nốt **ít nhất có thể**   | Animation line nối nốt gần |
| C → F/C mượt hơn C → F (root position) | Side-by-side comparison    |
| "Đường đi ngắn nhất"                   | Visual path highlight      |

**ABC Demos (Interactive Examples):**

| ID    | Title                  | Mô tả nội dung                     |
| :---- | :--------------------- | :--------------------------------- |
| 4.6.1 | 3 Positions of C Chord | Root → 1st → 2nd inversion         |
| 4.6.2 | Slash Chord Notation   | C/E, C/G, F/A...                   |
| 4.6.3 | Voice Leading Demo     | C → F → G → C with smooth movement |

**Thiết kế Game (3-Tier Progression):**

| Cấp độ | Tên Game               | Mô tả Gameplay                            |
| :----- | :--------------------- | :---------------------------------------- |
| ⭐     | **Inversion ID**       | Nhìn nốt → Root, 1st, hay 2nd inversion?  |
| ⭐⭐   | **Inversion Play**     | Chơi C/G trên Piano                       |
| ⭐⭐⭐ | **Voice Leading Path** | Chọn inversions để tạo smooth progression |

---

## 4.7 Hợp âm 7 (Seventh Chords)

> 📋 **Chưa triển khai**: Sẽ được implement tại `src/data/course-data/module-4/4.7-seventh-chords.ts`

**UX Journey Pattern (4 bước):**

1. **Passive**: Animation so sánh triad (3 nốt) vs seventh (4 nốt)
2. **Guided**: 3 loại chính: Maj7 (mơ màng), min7 (buồn nhẹ), Dom7 (căng thẳng)
3. **Interactive**: ii-V-I progression builder trong Jazz
4. **Milestone**: Chơi được Dm7 → G7 → Cmaj7 trên Piano/Guitar

**Mục tiêu học tập (Learning Objectives):**

- Phân biệt 3 loại 7th chord phổ biến
- Hiểu vai trò của Dom7 trong cadence (V7 → I)
- Nhận biết ii-V-I, tiến trình quan trọng nhất trong Jazz

**Cấu trúc nội dung (`theoryContent`):**

#### Section 1: Major 7 (Maj7)

| Nội dung giảng dạy             | Cách triển khai       |
| :----------------------------- | :-------------------- |
| Triad trưởng + Quãng 7 trưởng  | `{{abc:C E G B}}`     |
| Âm hưởng: Mơ màng, Jazz, Lo-fi | Audio demo Lo-fi beat |
| Ký hiệu: Cmaj7, CM7, C△7       | Text overlays         |

#### Section 2: Minor 7 (min7)

| Nội dung giảng dạy            | Cách triển khai     |
| :---------------------------- | :------------------ |
| Triad thứ + Quãng 7 thứ       | `{{abc:C _E G _B}}` |
| Âm hưởng: Soul, R&B, buồn nhẹ | Audio demo R&B      |
| Ký hiệu: Cm7, C-7             | Text overlays       |

#### Section 3: Dominant 7 (Dom7)

| Nội dung giảng dạy                            | Cách triển khai       |
| :-------------------------------------------- | :-------------------- |
| Triad trưởng + Quãng 7 thứ (!)                | `{{abc:C E G _B}}`    |
| Quan trọng nhất: **V7 → I** (muốn giải quyết) | G7 → C demo           |
| Âm hưởng: Blues, Funk                         | Audio demo blues lick |

#### Section 4: ii-V-I trong Jazz

| Nội dung giảng dạy                             | Cách triển khai                 |
| :--------------------------------------------- | :------------------------------ |
| **Dm7 → G7 → Cmaj7** = "Cỗ máy thời gian Jazz" | Loop progression                |
| Circle of Fifths movement: D→G→C               | Highlight trên vòng quãng 5     |
| Voice leading: Nốt giữ, nốt chuyển             | Animation smooth voice movement |

**ABC Demos (Interactive Examples):**

| ID    | Title                | Mô tả nội dung                  |
| :---- | :------------------- | :------------------------------ |
| 4.7.1 | Maj7 vs min7 vs Dom7 | Side-by-side-by-side comparison |
| 4.7.2 | V7 → I Resolution    | G7 → C tension & release        |
| 4.7.3 | ii-V-I Loop          | The Jazz progression            |
| 4.7.4 | 7th Chords on Guitar | G7, C7, E7 open chords          |

**Thiết kế Game (3-Tier Progression):**

| Cấp độ | Tên Game          | Mô tả Gameplay                      |
| :----- | :---------------- | :---------------------------------- |
| ⭐     | **7th Type ID**   | Nghe → Maj7, min7, hay Dom7?        |
| ⭐⭐   | **Build the 7th** | Cho triad → thêm đúng nốt 7         |
| ⭐⭐⭐ | **ii-V-I Play**   | Chơi progression trong key được cho |

---
