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
>
> **UX Journey**: Passive (A-G loop) → Guided (Find C/F) → Interactive (Guitar strings) → Milestone (All C's)

**Mục tiêu học tập (Learning Objectives):**

- Nhận biết 7 tên nốt nhạc (A-B-C-D-E-F-G).
- Xác định vị trí nốt trên bàn phím Piano và cần đàn Guitar.
- Hiểu khái niệm Quãng tám (Octave) và hệ thống ký hiệu khoa học (C3, C4, C5).
- Phân biệt cao độ Thấp (Low) và Cao (High).

**Cấu trúc bài học chi tiết:**

#### Bước 1: 7 Nốt nhạc & Bàn phím Piano

| Nội dung giảng dạy                                                            | Minh họa cần thực hiện                                                 |
| :---------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| **Bảng chữ cái âm nhạc**: Chỉ dùng 7 chữ cái A-B-C-D-E-F-G, sau G quay lại A. | Animation vòng tròn: A → B → C → D → E → F → G → A...                  |
| **Tìm nốt C (Đô)**: Tìm nhóm **2 phím đen**, nốt C nằm ngay bên trái.         | Piano ảo highlight tất cả nhóm 2 phím đen, sau đó highlight các nốt C. |
| **Tìm nốt F (Fa)**: Tìm nhóm **3 phím đen**, nốt F nằm ngay bên trái.         | Piano ảo highlight tất cả nhóm 3 phím đen, sau đó highlight các nốt F. |
| **Các nốt còn lại**: Từ C đếm lên D, E. Từ F đếm lên G, A, B.                 | Piano tương tác: Click từng phím trắng hiện tên nốt.                   |

#### Bước 2: Nốt trên dây đàn Guitar (Dây buông)

| Nội dung giảng dạy                                              | Minh họa cần thực hiện                                 |
| :-------------------------------------------------------------- | :----------------------------------------------------- |
| **6 Dây đàn**: Đếm từ dây nhỏ nhất (1) đến to nhất (6).         | Hình ảnh Guitar với số thứ tự dây 1-6.                 |
| **Tên dây buông**: E - B - G - D - A - E (Em Bỏ Gấu Đi Ăn Eis). | Audio phát từng dây, Animation rung dây tương ứng.     |
| **Liên hệ Piano**: Dây E thấp (E2) vs Dây E cao (E4).           | Show vị trí 2 nốt E này trên Piano để thấy tương quan. |

#### Bước 3: Quãng tám (Octave) & Middle C

| Nội dung giảng dạy                                                             | Minh họa cần thực hiện                                        |
| :----------------------------------------------------------------------------- | :------------------------------------------------------------ |
| **Khái niệm Octave**: Khoảng cách giữa 2 nốt cùng tên gần nhau nhất (C tới C). | `{{abc:C c c'}}` phát C3, C4, C5. Piano highlight 3 phím này. |
| **Ký hiệu khoa học**: C4 = Middle C (Đô giữa đàn). Số càng lớn nốt càng cao.   | Hình ảnh bàn phím Piano đầy đủ (88 phím) có đánh số C1...C8.  |
| **Lưu ý**: Guitar thực tế nghe thấp hơn ghi nhạc 1 quãng tám (sẽ học kỹ sau).  | (Optional) Info box nhỏ về Guitar transposition.              |

> ⚠️ **Lưu ý quan trọng**: Trong app này, chúng ta dùng chuẩn **Scientific Pitch Notation**.
>
> - **C4**: Middle C (Đô giữa).
> - **A4**: Chuẩn chỉnh dây (440Hz).

**Thiết kế Game (3-Tier Progression):**

| Cấp độ | Tên Game                                   | Mô tả Gameplay                                                                                                                                       |
| :----- | :----------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| ⭐     | **Octave Challenge** (Thử thách Quãng tám) | **Mục tiêu**: Nhận diện đúng chỉ số octave. <br> **Luật**: Show nốt trên Grand Staff (ví dụ nốt C rất cao). Chọn đáp án: "C3", "C4", hay "C5"?       |
| ⭐⭐   | **Find the Frequency** (Tìm tần số)        | **Mục tiêu**: Phản xạ vị trí trên nhạc cụ. <br> **Luật**: Ra lệnh "Hãy chơi C3!" → Học viên phải bấm đúng phím C3 trên Piano ảo (không được bấm C4). |
| ⭐⭐⭐ | **High/Low Battle** (Đấu trường Cao độ)    | **Mục tiêu**: So sánh cao độ. <br> **Luật**: Nghe/Xem 2 nốt (ví dụ E4 và G3). Hỏi "Nốt nào cao hơn?". Hoặc "Sắp xếp 3 nốt từ thấp đến cao".          |

---

### 1.3 Dấu hóa (Accidentals)

**Mục tiêu học tập:**

- Hiểu chức năng của Dấu thăng (#), Dấu giáng (b), Dấu bình (♮).
- Nhận biết các phím đen trên Piano.
- Hiểu quy tắc "Dấu hóa có hiệu lực trong 1 ô nhịp".

**Cấu trúc bài học chi tiết:**

#### Bước 1: Dấu Thăng (Sharp - #)

| Nội dung giảng dạy                                                                   | Minh họa cần thực hiện                                    |
| :----------------------------------------------------------------------------------- | :-------------------------------------------------------- |
| **Định nghĩa**: Tăng nốt lên nửa cung (phím ngay bên phải).                          | `{{abc:C ^C}}` (C -> C#). Piano highlight C rồi C#.       |
| **Vị trí**: C# là phím đen bên phải C.                                               | Animation: Mũi tên từ C di chuyển sang phải lên phím đen. |
| **Ký hiệu**: Viết # _trước_ nốt nhạc trên khuông, nhưng đọc _sau_ tên nốt (C Sharp). | Text animation: Viết "C#" nhưng audio đọc "C Sharp".      |

#### Bước 2: Dấu Giáng (Flat - b)

| Nội dung giảng dạy                                                          | Minh họa cần thực hiện                                      |
| :-------------------------------------------------------------------------- | :---------------------------------------------------------- |
| **Định nghĩa**: Hạ nốt xuống nửa cung (phím ngay bên trái).                 | `{{abc:D _D}}` (D -> Db). Piano highlight D rồi Db.         |
| **Vị trí**: Db là phím đen bên trái D.                                      | Animation: Mũi tên từ D di chuyển sang trái xuống phím đen. |
| **Lưu ý**: Phím đen có thể là Thăng của nốt này nhưng là Giáng của nốt kia. | Teaser cho bài Enharmonic.                                  |

#### Bước 3: Dấu Bình (Natural - ♮)

| Nội dung giảng dạy                                                           | Minh họa cần thực hiện             |
| :--------------------------------------------------------------------------- | :--------------------------------- | ----------------------------------------------------- |
| **Định nghĩa**: Hủy bỏ dấu thăng/giáng trước đó, về nốt tự nhiên.            | `{{abc:^C =C}}` (C# -> C Natural). |
| **Luật ô nhịp**: Dấu hóa chỉ có tác dụng trong ô nhịp đó. Sang ô mới tự hết. | `{{abc:C ^C G                      | C}}` (Ô 1 C# -> Ô 2 C thường). Highlight sự thay đổi. |

**Thiết kế Game (3-Tier Progression):**

| Cấp độ | Tên Game                              | Mô tả Gameplay                                                                                                                                                                     |
| :----- | :------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ⭐     | **Accidental Spotting** (Soi dấu hóa) | **Mục tiêu**: Nhận diện ký hiệu. <br> **Luật**: Flashcard hiện nốt có dấu. Hỏi "Đây là nốt gì?". Đáp án: "F#", "Gb", "F Natural".                                                  |
| ⭐⭐   | **Black Key Ninja** (Ninja Phím Đen)  | **Mục tiêu**: Phản xạ phím đen. <br> **Luật**: Game tốc độ cao. "Play F#!" "Play Bb!" "Play G#!" → Học viên phải bấm nhanh trên Piano ảo.                                          |
| ⭐⭐⭐ | **The Editor** (Biên tập viên)        | **Mục tiêu**: Viết nhạc đúng. <br> **Luật**: Cho một đoạn nhạc mẫu nghe bằng tai (có nốt thăng). Trên khuông nhạc đang thiếu dấu. Kéo thả dấu # vào đúng nốt để khớp với âm thanh. |

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
