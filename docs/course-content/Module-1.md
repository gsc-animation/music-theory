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

**Mục tiêu học tập:**

- Nhận biết các nốt từ A đến G trên bàn phím và khuông nhạc
- Hiểu khái niệm quãng tám (Octave)
- Phân biệt nốt cao và nốt thấp

**Cấu trúc bài học chi tiết:**

#### Bước 1: Hệ thống 7 nốt nhạc cơ bản

| Nội dung giảng dạy                                    | Minh họa cần thực hiện                          |
| ----------------------------------------------------- | ----------------------------------------------- |
| Âm nhạc chỉ dùng 7 chữ cái: A-B-C-D-E-F-G rồi lặp lại | Text animation hiện từng chữ cái theo vòng tròn |
| Hệ solfège: Do-Re-Mi-Fa-Sol-La-Si                     | Bảng song ngữ ABC ↔ Solfège với toggle switch   |
| Sau G là A ở octave cao hơn                           | Animation vòng tròn nốt nhạc xoay liên tục      |

#### Bước 2: Vị trí các nốt trên bàn phím Piano

| Nội dung giảng dạy                          | Minh họa cần thực hiện                                    |
| ------------------------------------------- | --------------------------------------------------------- |
| Tìm nhóm 2 phím đen → C nằm bên trái        | Piano ảo với highlight nhóm 2 phím đen, C pulse animation |
| Tìm nhóm 3 phím đen → F nằm bên trái        | Piano ảo với highlight nhóm 3 phím đen, F pulse animation |
| Đánh dấu tất cả các nốt C, D, E, F, G, A, B | Piano full với label trên từng phím trắng                 |
| Click từng phím để nghe âm thanh            | Piano tương tác, phát Tone.js khi click                   |

#### Bước 3: Vị trí các nốt trên cần đàn Guitar

| Nội dung giảng dạy                           | Minh họa cần thực hiện                            |
| -------------------------------------------- | ------------------------------------------------- |
| Tên 6 dây đàn: E-A-D-G-B-E (từ trầm đến cao) | Guitar ảo với label từng dây buông                |
| Fret 0 = dây buông, mỗi fret tăng nửa cung   | Animation di chuyển dọc theo fret với âm thanh    |
| Tìm nốt C, E, G trên dây 1, 2, 3             | Guitar ảo với dot highlight các vị trí quan trọng |

#### Bước 4: Khái niệm quãng tám (Octave)

| Nội dung giảng dạy                                         | Minh họa cần thực hiện                             |
| ---------------------------------------------------------- | -------------------------------------------------- |
| Octave = khoảng cách từ một nốt đến nốt cùng tên tiếp theo | `{{abc:C c}}` phát 2 nốt C thấp và cao             |
| Cùng tên nhưng cao gấp đôi tần số                          | Biểu đồ sóng âm so sánh 2 nốt C                    |
| Demo octave trên Piano: C3 → C4 → C5                       | Piano ảo highlight 3 nốt C liên tiếp, phát tuần tự |

#### Bước 5: Ký hiệu khoa học (C4 = Middle C)

| Nội dung giảng dạy                           | Minh họa cần thực hiện                       |
| -------------------------------------------- | -------------------------------------------- |
| Số đi kèm tên nốt chỉ octave (C4, D4, E4...) | Bảng mapping: C0-C8 với Piano full-range     |
| Middle C = C4 là điểm tham chiếu             | Grand Staff với C4 được highlight và ghi chú |
| Range nhạc cụ: Piano C1-C8, Guitar E2-E6     | So sánh trực quan range 3 nhạc cụ            |

#### Bước 6: So sánh nốt cao/thấp

| Nội dung giảng dạy                               | Minh họa cần thực hiện                                 |
| ------------------------------------------------ | ------------------------------------------------------ |
| Cho 2 nốt, xác định nốt nào cao hơn              | Quiz: 2 nốt xuất hiện trên khuông, chọn nốt cao hơn    |
| Liên hệ vị trí cao/thấp trên khuông với âm thanh | Animation nốt di chuyển lên xuống + âm thanh real-time |

**Bài tập:**

| Loại            | Mô tả                                   | Độ khó |
| --------------- | --------------------------------------- | ------ |
| `note-id`       | Nhận diện nốt ở nhiều octave khác nhau  | ⭐⭐   |
| `keyboard-play` | Nghe tên nốt (vd: "E4") → Tìm đúng phím | ⭐⭐   |
| `pitch-compare` | So sánh 2 nốt, chọn nốt cao/thấp hơn    | ⭐     |

---

### 1.3 Dấu hóa - Thăng, Giáng, Hoàn (Accidentals)

**Mục tiêu học tập:**

- Hiểu dấu thăng (#) tăng nửa cung
- Hiểu dấu giáng (♭) giảm nửa cung
- Hiểu dấu hoàn (♮) trả về nốt tự nhiên

**Cấu trúc bài học chi tiết:**

#### Bước 1: Giới thiệu dấu thăng (#)

| Nội dung giảng dạy                      | Minh họa cần thực hiện                                 |
| --------------------------------------- | ------------------------------------------------------ |
| Dấu # đặt trước nốt = tăng lên nửa cung | `{{abc:C ^C}}` phát C rồi C#, Piano highlight phím đen |
| C# là phím đen bên phải C               | Piano ảo zoom vào khu vực C-C#, animation di chuyển    |
| Phát âm: "Sharp" (thăng)                | Audio pronunciation + text                             |

#### Bước 2: Giới thiệu dấu giáng (♭)

| Nội dung giảng dạy                        | Minh họa cần thực hiện                                 |
| ----------------------------------------- | ------------------------------------------------------ |
| Dấu ♭ đặt trước nốt = giảm xuống nửa cung | `{{abc:D _D}}` phát D rồi Db, Piano highlight phím đen |
| Db là phím đen bên trái D                 | Piano ảo zoom vào khu vực Db-D, animation di chuyển    |
| Phát âm: "Flat" (giáng)                   | Audio pronunciation + text                             |

#### Bước 3: Giới thiệu dấu hoàn (♮)

| Nội dung giảng dạy                      | Minh họa cần thực hiện                              |
| --------------------------------------- | --------------------------------------------------- |
| Dấu ♮ hủy bỏ dấu thăng/giáng trước đó   | `{{abc:^C =C}}` phát C# rồi C tự nhiên              |
| Phát âm: "Natural" (hoàn/tự nhiên)      | Audio + text                                        |
| Dấu hoàn chỉ có hiệu lực trong 1 ô nhịp | Ví dụ ô nhịp có dấu hoàn, ô sau trở lại bình thường |

#### Bước 4: Phím đen trên Piano

| Nội dung giảng dạy                  | Minh họa cần thực hiện                       |
| ----------------------------------- | -------------------------------------------- |
| 5 phím đen = 5 nốt thăng hoặc giáng | Piano ảo full với tất cả phím đen được label |
| Mỗi phím đen có 2 tên: C# = Db      | Toggle hiển thị tên thăng ↔ tên giáng        |
| Click phím đen để nghe              | Piano tương tác với phím đen active          |

#### Bước 5: Cách viết dấu hóa trên khuông nhạc

| Nội dung giảng dạy                          | Minh họa cần thực hiện                                |
| ------------------------------------------- | ----------------------------------------------------- |
| Dấu hóa viết TRƯỚC đầu nốt                  | `{{abc:^F}}` với arrow chỉ vị trí dấu #               |
| Dấu hóa có hiệu lực đến hết ô nhịp          | Ví dụ 4 nốt trong ô nhịp, highlight dấu hóa ảnh hưởng |
| Dấu hóa trong hóa biểu có hiệu lực toàn bài | Teaser cho bài 3.2 (Key Signatures)                   |

**Bài tập:**

| Loại               | Mô tả                                 | Độ khó |
| ------------------ | ------------------------------------- | ------ |
| `accidental-id`    | Xem nốt có dấu hóa → Đọc đúng tên     | ⭐⭐   |
| `keyboard-play`    | Nghe "F sharp" → Nhấn đúng phím đen   | ⭐⭐   |
| `accidental-write` | Cho nốt + yêu cầu → Viết dấu hóa đúng | ⭐⭐⭐ |

---

### 1.4 Cung và Nửa cung (Tones & Semitones)

**Mục tiêu học tập:**

- Phân biệt cung (Whole Step) và nửa cung (Half Step)
- Xác định khoảng cách giữa các nốt

**Cấu trúc bài học chi tiết:**

#### Bước 1: Nửa cung (Semitone/Half Step)

| Nội dung giảng dạy                         | Minh họa cần thực hiện                             |
| ------------------------------------------ | -------------------------------------------------- |
| Nửa cung = khoảng cách NHỎ NHẤT giữa 2 nốt | Piano ảo với 2 phím liền kề highlight              |
| Ví dụ: C→C#, E→F, B→C                      | `{{abc:C ^C \| E F \| B c}}` với animation tuần tự |
| Trên Guitar: 1 fret = 1 nửa cung           | Guitar ảo với dot di chuyển 1 fret                 |

#### Bước 2: Cung (Tone/Whole Step)

| Nội dung giảng dạy                     | Minh họa cần thực hiện                    |
| -------------------------------------- | ----------------------------------------- |
| Cung = 2 nửa cung = bỏ qua 1 phím/fret | Piano ảo với 3 phím, phím giữa mờ đi      |
| Ví dụ: C→D, D→E, F→G                   | `{{abc:C D \| D E \| F G}}` với animation |
| Trên Guitar: 2 fret = 1 cung           | Guitar ảo với dot di chuyển 2 fret        |

#### Bước 3: Quy luật nửa cung: Mi-Fa, Si-Đô

| Nội dung giảng dạy                                               | Minh họa cần thực hiện                                   |
| ---------------------------------------------------------------- | -------------------------------------------------------- |
| E→F và B→C là 2 cặp nửa cung TỰ NHIÊN (không có phím đen ở giữa) | Piano ảo zoom vào 2 khu vực này, không có phím đen       |
| Quy tắc nhớ: "EF" và "BC" không có phím đen                      | Animation blink 2 khu vực này                            |
| Tất cả các cặp khác đều là cung                                  | Bảng tổng hợp: C-D (cung), D-E (cung), E-F (nửa cung)... |

#### Bước 4: Đếm cung trên bàn phím Piano

| Nội dung giảng dạy                     | Minh họa cần thực hiện                       |
| -------------------------------------- | -------------------------------------------- |
| Cho 2 nốt, đếm số cung/nửa cung        | Quiz: Piano highlight 2 nốt, đếm khoảng cách |
| Mỗi phím (trắng hoặc đen) = 1 nửa cung | Animation đếm từng phím với counter          |
| Thực hành: C→E = mấy nửa cung? (4)     | Interactive quiz với feedback                |

#### Bước 5: Đếm cung trên cần đàn Guitar

| Nội dung giảng dạy              | Minh họa cần thực hiện                      |
| ------------------------------- | ------------------------------------------- |
| Mỗi fret = 1 nửa cung           | Guitar ảo với ruler hiển thị số fret        |
| Đếm khoảng cách trên cùng 1 dây | Quiz: highlight 2 vị trí trên dây, đếm fret |
| Áp dụng tìm nốt từ nốt gốc      | Vd: Từ E (dây 1 buông), tìm G = fret 3      |

**Bài tập:**

| Loại             | Mô tả                                          | Độ khó |
| ---------------- | ---------------------------------------------- | ------ |
| `step-id`        | Cho 2 nốt liền kề → Xác định cung hay nửa cung | ⭐     |
| `interval-count` | Đếm số nửa cung giữa 2 nốt bất kỳ              | ⭐⭐   |
| `step-build`     | Từ nốt cho trước, tìm nốt cách X cung          | ⭐⭐⭐ |

---

### 1.5 Nốt đồng âm khác tên (Enharmonic Equivalents)

**Mục tiêu học tập:**

- Hiểu khái niệm nốt đồng âm (cùng cao độ, khác tên)
- Ví dụ: C# = Db, F# = Gb

**Cấu trúc bài học chi tiết:**

#### Bước 1: Khái niệm đồng âm

| Nội dung giảng dạy                          | Minh họa cần thực hiện                         |
| ------------------------------------------- | ---------------------------------------------- |
| Một phím đen có 2 tên: C# và Db cùng 1 phím | Piano ảo zoom 1 phím đen, toggle label C# ↔ Db |
| Phát âm giống hệt nhau                      | Phát âm thanh C# và Db, cho thấy giống nhau    |
| "Enharmonic" = đồng âm khác tên             | Text definition với animation                  |

#### Bước 2: Các cặp đồng âm phổ biến

| Nội dung giảng dạy                                           | Minh họa cần thực hiện                   |
| ------------------------------------------------------------ | ---------------------------------------- |
| 5 cặp đồng âm từ phím đen: C#/Db, D#/Eb, F#/Gb, G#/Ab, A#/Bb | Bảng 5 cặp với Piano highlight từng phím |
| Cặp đặc biệt từ phím trắng: E/Fb, B/Cb, F/E#, C/B#           | Piano highlight các phím trắng có 2 tên  |
| Carousel hiển thị từng cặp                                   | Slider với animation tuần tự             |

#### Bước 3: Tại sao cần nhiều cách viết?

| Nội dung giảng dạy                                  | Minh họa cần thực hiện                               |
| --------------------------------------------------- | ---------------------------------------------------- |
| Tùy thuộc vào giọng (Key) đang sử dụng              | Ví dụ: Giọng D major dùng F#, giọng Gb major dùng Gb |
| Giữ cho khuông nhạc dễ đọc (mỗi dòng/khe chỉ 1 nốt) | Ví dụ khuông nhạc đẹp vs lộn xộn                     |
| Quy tắc viết đúng sẽ học ở bài Key Signatures       | Teaser cho Module 3.2                                |

#### Bước 4: Áp dụng trong các giọng khác nhau

| Nội dung giảng dạy                     | Minh họa cần thực hiện                        |
| -------------------------------------- | --------------------------------------------- |
| Giọng G major: dùng F# (không dùng Gb) | `{{abc:K:G\n F G A B}}` với F# được highlight |
| Giọng F major: dùng Bb (không dùng A#) | `{{abc:K:F\n B c d e}}` với Bb được highlight |
| Quiz nhận diện ngữ cảnh                | Cho giọng, chọn cách viết đúng                |

**Bài tập:**

| Loại               | Mô tả                           | Độ khó |
| ------------------ | ------------------------------- | ------ |
| `enharmonic-match` | Cho C# → Tìm tên đồng âm (Db)   | ⭐     |
| `notation-convert` | Viết lại nốt với ký hiệu khác   | ⭐⭐   |
| `context-choose`   | Cho giọng → Chọn cách viết đúng | ⭐⭐⭐ |

---

