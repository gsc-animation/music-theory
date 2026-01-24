# 📚 Nội dung Khóa học Nhạc lý Cơ bản

> Tài liệu này mô tả chi tiết nội dung các module học, bao gồm mục tiêu, cấu trúc bài học, và các loại bài tập tương tác. Thiết kế theo mô hình **Khái niệm → Ví dụ → Thực hành** được chứng minh hiệu quả từ Module 1.1.

---

## Module 1: Nền tảng (Cao độ & Ký hiệu nhạc)

### 1.1 Khuông nhạc & Khóa nhạc (The Staff & Clefs)

**Mục tiêu học tập:**

- Hiểu cấu trúc khuông nhạc 5 dòng kẻ
- Nhận biết khóa Sol (Treble Clef) và khóa Fa (Bass Clef)
- Đọc các nốt nhạc cơ bản trên khuông nhạc

**Cấu trúc bài học chi tiết:**

#### Bước 1: Khuông nhạc trống (5 dòng, 4 khe)

| Nội dung giảng dạy                                 | Minh họa cần thực hiện                                 |
| -------------------------------------------------- | ------------------------------------------------------ |
| Giải thích khuông nhạc như "cái thang" cho âm nhạc | `{{abc}}` hiển thị 5 dòng kẻ trống, không có khóa nhạc |
| Đánh số dòng kẻ 1-5 từ dưới lên                    | Animation highlight từng dòng kẻ khi hover             |
| Đánh số 4 khe giữa các dòng                        | Animation highlight từng khe khi hover                 |
| Quy tắc: Cao hơn = âm cao hơn                      | Demo nốt di chuyển lên/xuống với âm thanh tương ứng    |

#### Bước 2: Giới thiệu Khóa Sol (Treble Clef)

| Nội dung giảng dạy                                                     | Minh họa cần thực hiện                             |
| ---------------------------------------------------------------------- | -------------------------------------------------- |
| Khóa Sol còn gọi là "G Clef"                                           | `{{abc}}` hiển thị khóa Sol trên khuông            |
| Vòng xoắn cuộn quanh dòng thứ 2 = nốt Sol                              | Animation vẽ khóa Sol từng nét, highlight dòng Sol |
| Liệt kê nhạc cụ dùng khóa Sol: Piano (tay phải), Guitar, Violin, Flute | Icon nhạc cụ kèm khuông nhạc khóa Sol              |

#### Bước 3: Giới thiệu Khóa Fa (Bass Clef)

| Nội dung giảng dạy                                          | Minh họa cần thực hiện                            |
| ----------------------------------------------------------- | ------------------------------------------------- |
| Khóa Fa còn gọi là "F Clef"                                 | `{{abc}}` hiển thị khóa Fa trên khuông            |
| Hai chấm bao quanh dòng thứ 4 = nốt Fa                      | Animation vẽ khóa Fa, highlight dòng Fa và 2 chấm |
| Liệt kê nhạc cụ dùng khóa Fa: Piano (tay trái), Cello, Tuba | Icon nhạc cụ kèm khuông nhạc khóa Fa              |

#### Bước 4: Các nốt đầu tiên - Đô, Rê, Mi (C, D, E)

| Nội dung giảng dạy                                            | Minh họa cần thực hiện                                        |
| ------------------------------------------------------------- | ------------------------------------------------------------- |
| Middle C (Đô giữa) - nốt nằm trên dòng kẻ phụ dưới khuông Sol | `{{abc:C}}` với animation pulse, click để phát âm thanh       |
| D (Rê) - nằm trong khe dưới dòng 1                            | `{{abc:D}}` với animation, liên kết Piano ảo highlight phím D |
| E (Mi) - nằm trên dòng 1 (dòng dưới cùng)                     | `{{abc:E}}` với animation, liên kết Piano ảo highlight phím E |
| Phát 3 nốt liên tiếp C-D-E                                    | `{{abc:C D E}}` playable, Piano ảo highlight theo tuần tự     |

#### Bước 5: Hoàn thiện bảng chữ cái - Fa, Sol, La, Si (F, G, A, B)

| Nội dung giảng dạy                    | Minh họa cần thực hiện                                          |
| ------------------------------------- | --------------------------------------------------------------- |
| F (Fa) - khe thứ 1                    | `{{abc:F}}` click để phát, Guitar ảo highlight Fret tương ứng   |
| G (Sol) - dòng thứ 2 (dòng khóa Sol!) | `{{abc:G}}` với ghi chú đặc biệt "Đây là dòng khóa Sol"         |
| A (La) - khe thứ 2                    | `{{abc:A}}` với animation                                       |
| B (Si) - dòng thứ 3                   | `{{abc:B}}` với animation                                       |
| Phát scale C-D-E-F-G-A-B-C            | `{{abc:C D E F G A B c}}` playable, cả 3 nhạc cụ highlight theo |

#### Bước 6: Câu nhớ cho dòng kẻ/khe (Mnemonics)

| Nội dung giảng dạy                                       | Minh họa cần thực hiện                            |
| -------------------------------------------------------- | ------------------------------------------------- |
| Khóa Sol - Dòng: "Every Good Boy Does Fine" (E-G-B-D-F)  | `{{abc:E G B d f}}` với text overlay từng chữ cái |
| Câu nhớ VN: "Mình Sẽ Sống Rất Fashion" (Mi-Sol-Si-Rê-Fa) | Text animation hiện từng từ khi nốt phát          |
| Khóa Sol - Khe: "FACE" (F-A-C-E)                         | `{{abc:F A c e}}` với text "FACE" highlight       |
| Khóa Fa - Dòng: "Good Boys Do Fine Always"               | `{{abc:G,, B,, D, F, A,}}` bass clef demo         |
| Khóa Fa - Khe: "All Cows Eat Grass"                      | `{{abc:A,, C, E, G,}}` bass clef demo             |

#### Bước 7: Khuông nhạc lớn (Grand Staff)

| Nội dung giảng dạy                              | Minh họa cần thực hiện                                         |
| ----------------------------------------------- | -------------------------------------------------------------- |
| Grand Staff = Treble + Bass nối bằng ngoặc nhọn | `{{abc}}` Grand Staff với brace, animation vẽ ngoặc            |
| Middle C nằm giữa 2 khuông trên dòng kẻ phụ     | Highlight Middle C với arrow chỉ "Meeting point"               |
| Bản nhạc minh họa cho Piano 2 tay               | Bản nhạc dân ca đơn giản (Bonny Green hoặc tương tự), playable |
| Liên kết với Piano ảo                           | Piano ảo full-size, highlight nốt theo bản nhạc khi play       |

**Câu nhớ (Mnemonics) - Tổng hợp:**

| Khóa nhạc    | Vị trí  | Tiếng Anh                              | Tiếng Việt                                   |
| ------------ | ------- | -------------------------------------- | -------------------------------------------- |
| Sol (Treble) | Dòng kẻ | "Every Good Boy Does Fine" (E-G-B-D-F) | "Mình Sẽ Sống Rất Fashion" (Mi-Sol-Si-Rê-Fa) |
| Sol (Treble) | Khe     | "FACE" (F-A-C-E)                       | "FA LA ĐÔ MI"                                |
| Fa (Bass)    | Dòng kẻ | "Good Boys Do Fine Always" (G-B-D-F-A) | "Sống Sao Đẹp Fa La"                         |
| Fa (Bass)    | Khe     | "All Cows Eat Grass" (A-C-E-G)         | "LA ĐÔ MI SOL"                               |

**Bài tập:**

| Loại              | Mô tả                                   | Độ khó |
| ----------------- | --------------------------------------- | ------ |
| `note-id`         | Xem nốt trên khuông → Chọn tên đúng     | ⭐     |
| `keyboard-play`   | Nghe tên nốt → Nhấn phím Piano đúng     | ⭐⭐   |
| `staff-placement` | Kéo thả nốt vào đúng vị trí trên khuông | ⭐⭐⭐ |

---

### 1.2 Tên nốt & Cao độ (Note Names & Pitch)

> ✅ **Đã triển khai**: Xem [`1.2-note-names.ts`](file:///Users/steve/INFCAP/gsc-animation/music-theory/src/data/course-data/module-1/1.2-note-names.ts)

**UX Journey Pattern (4 bước):**

1. **Passive**: Animation vòng lặp A-G-A
2. **Guided**: Tìm nốt C (nhóm 2 phím đen) và F (nhóm 3 phím đen)
3. **Interactive**: 6 dây Guitar buông với audio feedback
4. **Milestone**: Chơi tất cả nốt C trên Grand Staff

**Mục tiêu học tập (Learning Objectives):**

- Nhận biết 7 tên nốt nhạc (A-B-C-D-E-F-G).
- Xác định vị trí nốt trên bàn phím Piano, cần đàn Guitar, và Sáo Trúc.
- Hiểu khái niệm Quãng tám (Octave) và hệ thống ký hiệu khoa học (C3, C4, C5).
- Phân biệt cao độ Thấp (Low) và Cao (High).

**Cấu trúc nội dung (`theoryContent`):**

#### Section 1: Bảng chữ cái Âm nhạc

| Nội dung giảng dạy                                           | Cách triển khai                         |
| :----------------------------------------------------------- | :-------------------------------------- |
| 7 chữ cái: A-B-C-D-E-F-G, sau G quay lại A                   | `{{abc:...}}` animation vòng tròn 7 nốt |
| "Vòng tròn bất tận": ...E → F → G → **A** → B → C → D → E... | Blockquote giải thích với emoji 🔄      |

#### Section 2: Tìm nốt trên Bàn phím Piano

| Nội dung giảng dạy                                           | Cách triển khai (Multi-instrument) |
| :----------------------------------------------------------- | :--------------------------------- | -------------------------- | --------------------------- | -------- |
| **Tìm C**: Nhóm 2 phím đen → C ở bên trái                    | `{{piano:Tìm nốt C                 | C3,C4}}`+`{{guitar:...     | C2,C3,C4,C5}}`+`{{flute:... | C4,C5}}` |
| **Tìm F**: Nhóm 3 phím đen → F ở bên trái                    | `{{piano:...                       | F3,F4}}`+`{{guitar:...     | F2,F3,F4,F5}}`+`{{flute:... | F4,F5}}` |
| **Mẹo nhớ**: "2 phím đen = Đô", "3 phím đen = Fa"            | Blockquote với emoji 💡            |
| **Các nốt còn lại**: Từ C đếm lên D, E; từ F đếm lên G, A, B | `{{piano:7 nốt                     | C3,D3,E3,F3,G3,A3,B3,C4}}` |

#### Section 3: Nốt trên dây đàn Guitar

| Nội dung giảng dạy                                | Cách triển khai                        |
| :------------------------------------------------ | :------------------------------------- | -------------------- |
| 6 dây Guitar: Đếm từ dây mỏng (1) đến dây dày (6) | `{{guitar:6 Dây buông - Click để nghe! | E4,B3,G3,D3,A2,E2}}` |
| Tên dây buông: E-B-G-D-A-E                        | Danh sách dọc với âm thanh tương ứng   |
| **Câu nhớ VN**: "Em Bỏ Gấu Đi Ăn Eis" (EBGDAE)    | Blockquote với emoji 📝                |
| **Câu nhớ EN**: "Every Boy Gets Dinner At Eight"  | Blockquote với emoji 📝                |

#### Section 4: Quãng tám (Octave) & Middle C

| Nội dung giảng dạy                                                 | Cách triển khai                      |
| :----------------------------------------------------------------- | :----------------------------------- | ------------------------- | ----------- |
| **Khái niệm Octave**: Khoảng cách từ nốt đến nốt cùng tên gần nhất | `{{piano:Một quãng tám: C3 → C4      | C3,C4}}`+`{{guitar:...    | C3,C4}}`    |
| **Ký hiệu khoa học (Scientific Pitch Notation)**                   | Giải thích C2, C3, C4 = Middle C, C5 |
| **Quy ước quan trọng**: C4 = Middle C, A4 = 440 Hz                 | Blockquote ⚠️ với các bullet points  |
| **So sánh quãng tám**: Nốt E qua các octave                        | `{{piano:...                         | E3,E4,E5}}`+`{{guitar:... | E2,E3,E4}}` |
| **Quy tắc số tăng**: Số càng lớn = nốt càng cao                    | D3 < D4; G2 < G5                     |

**ABC Demos (Interactive Examples):**

| ID    | Title                | Mô tả nội dung                                                   |
| :---- | :------------------- | :--------------------------------------------------------------- |
| 1.2.1 | Bảng chữ cái Âm nhạc | Vòng tròn 7 nốt, giải thích sự lặp lại quãng tám                 |
| 1.2.2 | Tìm nốt C trên Piano | 4 nốt C (C3-C6) trên khuông, giải thích octave equivalence       |
| 1.2.3 | Tìm nốt F trên Piano | 4 nốt F (F3-F6), F4 là "mỏ neo" trên dòng kẻ thứ 1               |
| 1.2.4 | Ký hiệu 6 dây Guitar | 6 nốt E5-B3-G3-D3-A2-E2, giải thích Guitar viết cao hơn 1 octave |
| 1.2.5 | So sánh Quãng tám    | C3-C4-C5, giải thích tần số nhân đôi (261.63 Hz → 523.25 Hz)     |
| 1.2.6 | Thang âm C đầy đủ    | C Major Scale, giải thích whole step vs half step (E-F, B-C)     |

**Thiết kế Game (3-Tier Progression):**

| Cấp độ | Tên Game                                   | Mô tả Gameplay                                                                                                                                       |
| :----- | :----------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| ⭐     | **Octave Challenge** (Thử thách Quãng tám) | **Mục tiêu**: Nhận diện đúng chỉ số octave. <br> **Luật**: Show nốt trên Grand Staff (ví dụ nốt C rất cao). Chọn đáp án: "C3", "C4", hay "C5"?       |
| ⭐⭐   | **Find the Frequency** (Tìm tần số)        | **Mục tiêu**: Phản xạ vị trí trên nhạc cụ. <br> **Luật**: Ra lệnh "Hãy chơi C3!" → Học viên phải bấm đúng phím C3 trên Piano ảo (không được bấm C4). |
| ⭐⭐⭐ | **High/Low Battle** (Đấu trường Cao độ)    | **Mục tiêu**: So sánh cao độ. <br> **Luật**: Nghe/Xem 2 nốt (ví dụ E4 và G3). Hỏi "Nốt nào cao hơn?". Hoặc "Sắp xếp 3 nốt từ thấp đến cao".          |

---

### 1.3 Dấu hóa (Accidentals)

> ✅ **Đã triển khai**: Xem [`1.3-accidentals.ts`](file:///Users/steve/INFCAP/gsc-animation/music-theory/src/data/course-data/module-1/1.3-accidentals.ts)

**UX Journey Pattern (4 bước):**

1. **Passive**: Animation nốt "half-stepping" lên (Sharp) hoặc xuống (Flat)
2. **Guided**: Multi-instrument visualization (Piano, Guitar, Flute)
3. **Interactive**: Toggle giữa Sharp/Flat naming cho cùng một phím đen
4. **Milestone**: Chơi melody với accidental thay đổi "mood"

**Mục tiêu học tập (Learning Objectives):**

- Hiểu chức năng của Dấu thăng (♯), Dấu giáng (♭), Dấu bình (♮).
- Nhận biết các phím đen trên Piano và vị trí tương ứng trên Guitar/Flute.
- Hiểu quy tắc "Dấu hóa có hiệu lực trong 1 ô nhịp" (Bar Rule).
- Hiểu khái niệm Hóa biểu (Key Signature) và cách dùng dấu bình để hủy tạm thời.

**Cấu trúc nội dung (`theoryContent`) - 8 Sections:**

#### Section 1: Dấu hóa là gì?

| Nội dung giảng dạy                                               | Cách triển khai                         |
| :--------------------------------------------------------------- | :-------------------------------------- |
| 3 loại dấu hóa: Thăng (♯), Giáng (♭), Bình (♮)                   | Bảng 3 cột: Ký hiệu, Tên gọi, Chức năng |
| **Nửa cung (Semitone)**: Khoảng cách nhỏ nhất giữa 2 nốt liền kề | Blockquote giải thích với emoji 💡      |

#### Section 2: Dấu Thăng (Sharp - ♯)

| Nội dung giảng dạy                                              | Cách triển khai (Multi-instrument) |
| :-------------------------------------------------------------- | :--------------------------------- | ----------------------- | ----------------------------- | --------- |
| Nâng nốt lên **nửa cung** → phím bên phải                       | `{{abc:C ^C}}` + `{{piano:...      | C4,C#4}}`+`{{guitar:... | C3,C#3,C4,C#4}}`+`{{flute:... | C5,C#5}}` |
| **Quy tắc viết**: ♯ viết trước nốt trên khuông, đọc sau tên nốt | Blockquote 📝 với giải thích       |
| **Ví dụ F → F♯**                                                | `{{abc:F ^F}}` + `{{piano:...      | F4,F#4}}`+`{{guitar:... | F3,F#3,F4,F#4}}`              |

#### Section 3: Dấu Giáng (Flat - ♭)

| Nội dung giảng dạy                        | Cách triển khai (Multi-instrument) |
| :---------------------------------------- | :--------------------------------- | ------------------------------ | ----------------------------- | --------- |
| Hạ nốt xuống **nửa cung** → phím bên trái | `{{abc:D _D}}` + `{{piano:...      | D4,Db4}}`+`{{guitar:...        | D3,Db3,D4,Db4}}`+`{{flute:... | D5,Db5}}` |
| **Ví dụ B → B♭**                          | `{{abc:B _B}}` + `{{piano:...      | B3,Bb3,B4,Bb4}}`+`{{guitar:... | B2,Bb2,B3,Bb3}}`              |

#### Section 4: Dấu Bình (Natural - ♮)

| Nội dung giảng dạy                                 | Cách triển khai (Multi-instrument) |
| :------------------------------------------------- | :--------------------------------- | ----------------------- | ----------------------------- | --------- |
| Hủy bỏ dấu thăng/giáng, về trạng thái **tự nhiên** | `{{abc:^C =C}}` + `{{piano:...     | C#4,C4}}`+`{{guitar:... | C#3,C3,C#4,C4}}`+`{{flute:... | C#5,C5}}` |

#### Section 5: Phím Đen = 2 Tên Gọi!

| Nội dung giảng dạy                                        | Cách triển khai                                      |
| :-------------------------------------------------------- | :--------------------------------------------------- | ------------------------------------ | ------ |
| 5 phím đen trong 1 octave có 2 tên gọi mỗi phím           | `{{piano:5 Phím đen                                  | C#4,D#4,F#4,G#4,A#4}}`+`{{guitar:... | ...}}` |
| **Bảng ánh xạ**: C♯=D♭, D♯=E♭, F♯=G♭, G♯=A♭, A♯=B♭        | Bảng 4 cột: Phím đen #, Tên Sharp, Tên Flat, Ghi chú |
| **Nốt đồng âm (Enharmonic)**: Cùng âm thanh, khác tên gọi | Blockquote 🔔 teaser cho bài 1.5                     |

#### Section 6: Trường hợp đặc biệt E-F và B-C

| Nội dung giảng dạy                        | Cách triển khai                     |
| :---------------------------------------- | :---------------------------------- | -------------- |
| 2 cặp nốt tự nhiên không có phím đen giữa | `{{piano:E-F và B-C                 | E4,F4,B4,C5}}` |
| **Hệ quả**: E♯=F, F♭=E, B♯=C, C♭=B        | Bảng + `{{abc:^E F}}` để chứng minh |

#### Section 7: Quy tắc về Ô nhịp (Bar Rule)

| Nội dung giảng dạy                                        | Cách triển khai            |
| :-------------------------------------------------------- | :------------------------- | ---------- |
| Dấu hóa chỉ có hiệu lực trong **ô nhịp hiện tại**         | Blockquote ⚠️ "Quan trọng" |
| Ví dụ: C thứ 2 trong ô 1 là C♯, C đầu ô 2 trở về tự nhiên | `{{abc:C ^C G C            | C G A B}}` |

#### Section 8: Hóa Biểu - Key Signature 🎼

| Nội dung giảng dạy                                              | Cách triển khai                                    |
| :-------------------------------------------------------------- | :------------------------------------------------- |
| **Định nghĩa**: Dấu ♯/♭ ở đầu khuông, sau khóa Sol/Fa           | `{{abc:...}}` với `K:G` để show hóa biểu G Major   |
| **Ý nghĩa**: Tất cả nốt trên dòng/khe đó → thăng/giáng toàn bài | Giải thích với example F → F♯ suốt bài             |
| **So sánh**: Có và không có hóa biểu                            | 2 `{{abc:...}}` cùng giai điệu, 1 có K:G, 1 có K:C |
| **Dấu Bình quan trọng**: Hủy tạm thời hóa biểu trong 1 ô nhịp   | `{{abc:...}}` với `=F` để hủy F♯ tạm thời          |

**ABC Demos (Interactive Examples):**

| ID    | Title                     | Mô tả nội dung                                                    |
| :---- | :------------------------ | :---------------------------------------------------------------- |
| 1.3.1 | Dãy nốt Thăng (Sharps)    | Tất cả nốt cơ bản + phiên bản thăng; giải thích phím đen bên phải |
| 1.3.2 | Dãy nốt Giáng (Flats)     | Tất cả nốt cơ bản + phiên bản giáng; giải thích phím đen bên trái |
| 1.3.3 | Dấu Bình (Naturals)       | C♯ → C tự nhiên, B♭ → B tự nhiên                                  |
| 1.3.4 | 5 Phím đen trong 1 Octave | C♯-D♯-F♯-G♯-A♯; giải thích mỗi phím có 2 tên (enharmonic)         |
| 1.3.5 | Quy tắc Ô nhịp            | Demo dấu hóa chỉ hiệu lực trong ô nhịp                            |
| 1.3.6 | Enharmonic: E♯ = F        | Trường hợp đặc biệt E♯=F, B♯=C                                    |

**Thiết kế Game (3-Tier Progression):**

| Cấp độ | Tên Game                             | Mô tả Gameplay                                                                                                                                 |
| :----- | :----------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| ⭐     | **Accidental Spotter** (Soi dấu hóa) | **Mục tiêu**: Nhận diện ký hiệu. <br> **Luật**: Flashcard hiện nốt có dấu. Hỏi "Đây là nốt gì?". Đáp án: "F#", "Gb", "F Natural".              |
| ⭐⭐   | **Black Key Ninja** (Ninja Phím Đen) | **Mục tiêu**: Phản xạ phím đen. <br> **Luật**: Game tốc độ cao trên Piano + Guitar. "Play F#!" "Play Bb!" → Bấm nhanh trên nhạc cụ ảo.         |
| ⭐⭐⭐ | **The Editor** (Biên tập viên)       | **Mục tiêu**: Viết nhạc đúng. <br> **Luật**: Nghe đoạn nhạc mẫu (có nốt thăng). Kéo thả dấu ♯/♭ vào đúng nốt trên khuông để khớp với âm thanh. |

---

### 1.4 Cung và Nửa cung (Tones & Semitones)

**Mục tiêu học tập:**

- Phân biệt Nửa cung (Semitone) và Cung (Tone/Whole step).
- Nhớ quy tắc "Mi-Fa" và "Si-Đô" là nửa cung tự nhiên.
- Đếm khoảng cách giữa các nốt.

**Cấu trúc bài học chi tiết:**

#### Bước 1: Nửa cung (Semitone / Half step)

| Nội dung giảng dạy                                                          | Minh họa cần thực hiện                          |
| :-------------------------------------------------------------------------- | :---------------------------------------------- |
| **Định nghĩa**: Khoảng cách gần nhất giữa 2 phím (hoặc 2 ngăn phím Guitar). | Zoom vào 2 phím E-F (không có phím đen giữa).   |
| **Trên Guitar**: 1 ngăn phím (fret) = 1 nửa cung.                           | Guitar ảo: Bấm phím 1 dây E → Bấm phím 2 dây E. |
| **Cặp đặc biệt**: E-F và B-C là nửa cung tự nhiên (không cần dấu hóa).      | **Highlight đỏ** khu vực E-F và B-C trên Piano. |

#### Bước 2: Cung (Tone / Whole step)

| Nội dung giảng dạy                                                      | Minh họa cần thực hiện                                |
| :---------------------------------------------------------------------- | :---------------------------------------------------- |
| **Định nghĩa**: Bằng 2 nửa cung cộng lại. Thường cách nhau 1 phím/ngăn. | `{{abc:C D}}`. Giải thích C lên C# (lẻ) lên D (chẵn). |
| **Trên Guitar**: Cách nhau 2 ngăn phím = 1 cung.                        | Guitar ảo: Từ fret 1 nhảy lên fret 3.                 |
| **Công thức tóm tắt**: 1 Tone = 2 Semitones.                            | Biểu đồ toán học đơn giản: 1/2 + 1/2 = 1.             |

**Thiết kế Game (3-Tier Progression):**

| Cấp độ | Tên Game                              | Mô tả Gameplay                                                                                                                                                                                |
| :----- | :------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ⭐     | **Step Counter** (Máy đếm bước)       | **Mục tiêu**: Xác định khoảng cách liền kề. <br> **Luật**: Highlight 2 nốt trên Piano (ví dụ C và D). Hỏi: "Whole Step (Cung)" hay "Half Step (Nửa cung)"?                                    |
| ⭐⭐   | **Build a Step** (Xây bậc thang)      | **Mục tiêu**: Tự tìm nốt theo khoảng cách. <br> **Luật**: "Hãy chơi nốt cao hơn C4 một cung (Whole step)". Học viên bấm D4. "Cao hơn E4 một nửa cung". Học viên bấm F4.                       |
| ⭐⭐⭐ | **String Walker** (Người đi trên dây) | **Mục tiêu**: Áp dụng lên Guitar. <br> **Luật**: Cho nốt gốc trên Guitar (ví dụ dây 1 buông E). Yêu cầu: "Tìm nốt cách đó 1 cung và 1 nửa cung (3 semitones)". Học viên click vào Fret 3 (G). |

---

### 1.5 Nốt đồng âm (Enharmonic Equivalents)

**Mục tiêu học tập:**

- Hiểu khái niệm "Một nốt có nhiều tên gọi".
- Các cặp đồng âm phổ biến (C#/Db, F#/Gb...).
- Hiểu sơ lược về ngữ cảnh sử dụng (Tại sao lúc này dùng # lúc kia dùng b?).

**Cấu trúc bài học chi tiết:**

#### Bước 1: Bí ẩn Phím Đen

| Nội dung giảng dạy                                                 | Minh họa cần thực hiện                                                |
| :----------------------------------------------------------------- | :-------------------------------------------------------------------- |
| **Vấn đề**: Phím đen giữa C và D gọi là gì?                        | Question mark (?) hiện trên phím đen đó.                              |
| **Góc nhìn 1**: Là C đi lên → C# (C Sharp).                        | Mũi tên từ C đi lên.                                                  |
| **Góc nhìn 2**: Là D đi xuống → Db (D Flat).                       | Mũi tên từ D đi xuống.                                                |
| **Kết luận**: C# và Db là một. Cùng âm thanh, cùng phím, khác tên. | Text "Enharmonic" xuất hiện. Audio phát, chứng minh 2 tên nghe y hệt. |

#### Bước 2: Các cặp song sinh khác

| Nội dung giảng dạy                                         | Minh họa cần thực hiện                               |
| :--------------------------------------------------------- | :--------------------------------------------------- |
| **Liệt kê**: D#/Eb, F#/Gb, G#/Ab, A#/Bb.                   | Carousel trượt qua từng cặp phím đen.                |
| **Trường hợp khó**: E# chính là F! B# chính là C! Fb là E! | Piano highlight E và F. Giải thích lý thuyết E# = F. |

#### Bước 3: Tại sao làm khó vậy? (Context)

| Nội dung giảng dạy                                                                | Minh họa cần thực hiện                                                 |
| :-------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| **Quy tắc thang âm (Scale Idea)**: Mỗi dòng kẻ chỉ chứa 1 chữ cái.                | Ví dụ Scale F Major: F G A Bb C... (Không viết A# vì sẽ bị lặp chữ A). |
| **Hướng đi**: Giai điệu đi lên thường dùng #, đi xuống dùng b (quy tắc ngón tay). | Demo `{{abc:C ^C D}}` vs `{{abc:D _D C}}`.                             |

**Thiết kế Game (3-Tier Progression):**

| Cấp độ | Tên Game                               | Mô tả Gameplay                                                                                                                                                                            |
| :----- | :------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ⭐     | **Twin Finder** (Tìm anh em sinh đôi)  | **Mục tiêu**: Nhớ cặp đồng âm. <br> **Luật**: Hiện nốt C#. Chọn nốt đồng âm với nó trong các đáp án: "D", "Db", "Cb"?                                                                     |
| ⭐⭐   | **Alias Agent** (Điệp viên 2 mang)     | **Mục tiêu**: Phản xạ trên phím đàn. <br> **Luật**: "Chơi nốt Gb!". Học viên bấm phím đen. "Vẫn phím đó, chơi nốt F#!". Học viên bấm lại phím cũ. Game ghi nhận "Chính xác, cùng 1 phím". |
| ⭐⭐⭐ | **Grammar Police** (Cảnh sát chính tả) | **Mục tiêu**: Chọn đúng ngữ cảnh (Khó). <br> **Luật**: Cho thang âm F Major: F - G - A - [?]. Chọn điền "Bb" hay "A#"? (Gợi ý: Không được lặp lại chữ A).                                 |

---
