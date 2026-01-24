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

## Module 2: Nhịp điệu & Phách (Rhythm & Meter)

### 2.1 Giá trị nốt nhạc (Note Values)

**Mục tiêu học tập:**

- Nhận biết các loại hình nốt: Tròn, Trắng, Đen, Móc đơn, Móc kép
- Hiểu tỷ lệ độ dài giữa các nốt

**Cấu trúc bài học chi tiết:**

#### Bước 1: Nốt tròn (Whole Note) = 4 phách

| Nội dung giảng dạy                      | Minh họa cần thực hiện                  |
| --------------------------------------- | --------------------------------------- |
| Nốt tròn là nốt dài nhất thường gặp     | `{{abc:C4}}` với countdown timer 4 giây |
| Hình dạng: đầu nốt trống, không có thân | Zoom vào hình nốt tròn với annotation   |
| Trong nhịp 4/4, chiếm trọn 1 ô nhịp     | Animation 4 phách đếm trong 1 ô nhịp    |

#### Bước 2: Nốt trắng (Half Note) = 2 phách

| Nội dung giảng dạy                 | Minh họa cần thực hiện                        |
| ---------------------------------- | --------------------------------------------- |
| Nốt trắng = 1/2 nốt tròn = 2 phách | `{{abc:C2 D2}}` 2 nốt trắng = 1 ô nhịp 4/4    |
| Hình dạng: đầu nốt trống, CÓ thân  | So sánh hình nốt tròn vs nốt trắng            |
| 2 nốt trắng = 1 nốt tròn           | Animation chia đôi nốt tròn thành 2 nốt trắng |

#### Bước 3: Nốt đen (Quarter Note) = 1 phách

| Nội dung giảng dạy                           | Minh họa cần thực hiện                        |
| -------------------------------------------- | --------------------------------------------- |
| Nốt đen = 1/2 nốt trắng = 1 phách            | `{{abc:C D E F}}` 4 nốt đen = 1 ô nhịp 4/4    |
| Hình dạng: đầu nốt ĐẶC, có thân              | So sánh hình nốt trắng vs nốt đen             |
| Đây là "nhịp tim" của âm nhạc - phách cơ bản | Metronome animation với mỗi click = 1 nốt đen |

#### Bước 4: Nốt móc đơn (Eighth Note) = 1/2 phách

| Nội dung giảng dạy                       | Minh họa cần thực hiện                               |
| ---------------------------------------- | ---------------------------------------------------- |
| Nốt móc đơn = 1/2 nốt đen                | `{{abc:C/D/E/F/ G/A/B/c/}}` 8 nốt móc đơn = 1 ô nhịp |
| Hình dạng: đầu đặc, thân, 1 móc (flag)   | Zoom hình nốt với label từng phần                    |
| Khi viết liền nhau: dùng vạch nối (beam) | So sánh 2 nốt rời vs 2 nốt có beam                   |

#### Bước 5: Nốt móc kép (Sixteenth Note) = 1/4 phách

| Nội dung giảng dạy                     | Minh họa cần thực hiện                                |
| -------------------------------------- | ----------------------------------------------------- |
| Nốt móc kép = 1/2 nốt móc đơn          | `{{abc:C//D//E//F// G//A//B//c//}}` 16 nốt = 1 ô nhịp |
| Hình dạng: đầu đặc, thân, 2 móc        | Zoom hình nốt với 2 flags                             |
| Thường thấy trong nhạc nhanh, virtuoso | Demo đoạn nhạc nhanh với 16th notes                   |

#### Bước 6: Sơ đồ "cây giá trị nốt" (Note Value Tree)

| Nội dung giảng dạy                                | Minh họa cần thực hiện                    |
| ------------------------------------------------- | ----------------------------------------- |
| 1 tròn = 2 trắng = 4 đen = 8 móc đơn = 16 móc kép | Diagram cây chia nhánh với animation      |
| Interactive: click vào nốt để nghe độ dài         | Từng nốt playable với visual duration bar |
| Quiz: Điền nốt để hoàn thành ô nhịp               | Interactive game drag-drop nốt vào ô nhịp |

**Bài tập:**

| Loại            | Mô tả                            | Độ khó |
| --------------- | -------------------------------- | ------ |
| `note-value-id` | Xem hình nốt → Chọn tên đúng     | ⭐     |
| `rhythm-tap`    | Nghe pattern → Gõ theo đúng nhịp | ⭐⭐   |
| `beat-count`    | Đếm tổng số phách trong ô nhịp   | ⭐⭐   |

---

### 2.2 Dấu lặng (Rests)

**Mục tiêu học tập:**

- Nhận biết các loại dấu lặng tương ứng với nốt nhạc
- Hiểu vai trò của sự im lặng trong âm nhạc

**Cấu trúc bài học chi tiết:**

#### Bước 1: Dấu lặng tròn (Whole Rest) = 4 phách

| Nội dung giảng dạy                         | Minh họa cần thực hiện                    |
| ------------------------------------------ | ----------------------------------------- |
| "Hình hộp treo dưới dòng thứ 4"            | `{{abc:z4}}` với highlight shape đặc biệt |
| Nghỉ cả ô nhịp (dù ô nhịp bao nhiêu phách) | Animation metronome đếm 4 phách im lặng   |
| Mẹo nhớ: "Rest rests on the fourth line"   | Visual mnemonic với annotation            |

#### Bước 2: Dấu lặng trắng (Half Rest) = 2 phách

| Nội dung giảng dạy                        | Minh họa cần thực hiện                   |
| ----------------------------------------- | ---------------------------------------- |
| "Hình hộp nằm trên dòng thứ 3"            | So sánh whole rest vs half rest position |
| Mẹo nhớ: "Hat sits on top" (mũ ngồi trên) | Visual mnemonic                          |
| 2 half rests = 1 whole rest               | Animation chia đôi                       |

#### Bước 3: Dấu lặng đen (Quarter Rest) = 1 phách

| Nội dung giảng dạy                             | Minh họa cần thực hiện              |
| ---------------------------------------------- | ----------------------------------- |
| Hình dạng giống "chữ Z nghiêng" hoặc "sấm sét" | Zoom đặc tả hình với annotation     |
| Thường gặp nhất trong nhạc                     | `{{abc:C z D z}}` với quarter rests |
| Tạo "hơi thở" cho giai điệu                    | Audio demo với và không có rests    |

#### Bước 4: Dấu lặng móc đơn/kép

| Nội dung giảng dạy                 | Minh họa cần thực hiện                   |
| ---------------------------------- | ---------------------------------------- |
| Móc đơn rest: hình "7" với 1 flag  | `{{abc:C/ z/ D/ z/}}` 8th rests          |
| Móc kép rest: hình "7" với 2 flags | `{{abc:C// z// D// z//}}` 16th rests     |
| Bảng so sánh tất cả các dấu lặng   | Table visual với âm thanh demo từng loại |

#### Bước 5: Kết hợp nốt và dấu lặng

| Nội dung giảng dạy                      | Minh họa cần thực hiện                   |
| --------------------------------------- | ---------------------------------------- |
| Ô nhịp 4/4: nốt + rest phải = 4 phách   | `{{abc:C2 z2}}` (half note + half rest)  |
| Tạo syncopation với rests               | Demo nhạc Jazz/Funk với syncopated rests |
| Quiz: Hoàn thành ô nhịp với nốt và rest | Interactive drag-drop game               |

**Bài tập:**

| Loại                | Mô tả                                   | Độ khó |
| ------------------- | --------------------------------------- | ------ |
| `rest-id`           | Xem hình dấu lặng → Chọn tên và giá trị | ⭐     |
| `rhythm-with-rests` | Gõ nhịp với cả nốt và dấu lặng          | ⭐⭐   |
| `measure-complete`  | Điền nốt/rest để hoàn thành ô nhịp      | ⭐⭐⭐ |

---

### 2.3 Nốt chấm & Dây liên (Dotted Notes & Ties)

**Mục tiêu học tập:**

- Hiểu nốt chấm (tăng thêm 1/2 giá trị gốc)
- Hiểu dây liên (nối hai nốt cùng cao độ)

**Cấu trúc bài học chi tiết:**

#### Bước 1: Nốt chấm đơn (Single Dot)

| Nội dung giảng dạy                 | Minh họa cần thực hiện                     |
| ---------------------------------- | ------------------------------------------ |
| Dấu chấm thêm 1/2 giá trị gốc      | Formula animation: Nốt + 50% = Tổng        |
| Nốt đen chấm = 1 + 0.5 = 1.5 phách | `{{abc:C3/2 D/}}` dotted quarter + 8th     |
| Nốt trắng chấm = 2 + 1 = 3 phách   | `{{abc:C3 D}}` dotted half + quarter = 4/4 |

#### Bước 2: Nốt chấm đôi (Double Dot)

| Nội dung giảng dạy                             | Minh họa cần thực hiện          |
| ---------------------------------------------- | ------------------------------- |
| Chấm thứ 2 thêm 1/2 giá trị chấm thứ 1         | Formula: Nốt + 50% + 25% = Tổng |
| Nốt đen chấm đôi = 1 + 0.5 + 0.25 = 1.75 phách | Visual breakdown với animation  |
| Hiếm gặp hơn chấm đơn                          | Ví dụ trong nhạc cổ điển        |

#### Bước 3: Dây liên (Tie)

| Nội dung giảng dạy                            | Minh họa cần thực hiện                     |
| --------------------------------------------- | ------------------------------------------ |
| Tie nối 2 nốt CÙNG cao độ thành 1 âm dài      | `{{abc:C2-C2}}` tied half notes = 4 beats  |
| Tie xuyên qua vạch ô nhịp                     | Demo tie kéo dài từ ô nhịp này sang ô khác |
| Chỉ đánh nốt đầu, giữ tiếng đến hết nốt thứ 2 | Piano ảo demo nhấn 1 lần, giữ dài          |

#### Bước 4: Phân biệt Tie vs Slur (Legato)

| Nội dung giảng dạy                              | Minh họa cần thực hiện                   |
| ----------------------------------------------- | ---------------------------------------- |
| Tie: cùng cao độ, 1 âm thanh                    | Visual: đường cong nối 2 nốt CÙNG height |
| Slur: khác cao độ, chơi liền mạch nhưng là 2 âm | Visual: đường cong nối nốt KHÁC height   |
| So sánh trực quan 2 trường hợp                  | Side-by-side demo với audio              |

**Bài tập:**

| Loại                | Mô tả                                       | Độ khó |
| ------------------- | ------------------------------------------- | ------ |
| `dotted-value-calc` | Tính giá trị nốt chấm (vd: dotted half = ?) | ⭐⭐   |
| `dotted-rhythm-tap` | Gõ nhịp với dotted notes                    | ⭐⭐   |
| `tie-vs-slur`       | Phân biệt tie và slur trong bản nhạc        | ⭐⭐⭐ |

---

### 2.4 Nhịp đơn (Simple Time Signatures)

**Mục tiêu học tập:**

- Hiểu ý nghĩa số trên/số dưới của nhịp
- Phân biệt các loại nhịp 4/4, 3/4, 2/4

**Cấu trúc bài học chi tiết:**

#### Bước 1: Cấu trúc số nhịp

| Nội dung giảng dạy                      | Minh họa cần thực hiện                |
| --------------------------------------- | ------------------------------------- |
| Số trên = số phách trong mỗi ô nhịp     | Animation highlight số trên với label |
| Số dưới = loại nốt tính là 1 phách      | Animation highlight số dưới với label |
| 4 = nốt đen, 8 = móc đơn, 2 = nốt trắng | Bảng chuyển đổi số → loại nốt         |

#### Bước 2: Nhịp 4/4 (Common Time)

| Nội dung giảng dạy                | Minh họa cần thực hiện                         |
| --------------------------------- | ---------------------------------------------- |
| 4 phách mỗi ô, nốt đen = 1 phách  | `{{abc:M:4/4\n C D E F}}` với counting overlay |
| Ký hiệu viết tắt: chữ C (Common)  | Hiển thị cả "4/4" và "C"                       |
| Nhịp phổ biến nhất trong Pop/Rock | Audio demo bài hát quen thuộc                  |

#### Bước 3: Nhịp 3/4 (Waltz)

| Nội dung giảng dạy                 | Minh họa cần thực hiện                     |
| ---------------------------------- | ------------------------------------------ |
| 3 phách mỗi ô, nốt đen = 1 phách   | `{{abc:M:3/4\n C D E}}` với counting 1-2-3 |
| Cảm giác "dập dình" của điệu waltz | Audio demo nhạc waltz (The Blue Danube)    |
| Phách 1 mạnh, phách 2-3 nhẹ        | Visual highlight độ mạnh của từng phách    |

#### Bước 4: Nhịp 2/4 (March)

| Nội dung giảng dạy               | Minh họa cần thực hiện                 |
| -------------------------------- | -------------------------------------- |
| 2 phách mỗi ô, nốt đen = 1 phách | `{{abc:M:2/4\n C D}}` với counting 1-2 |
| Cảm giác "đi bộ" của march       | Audio demo nhạc hành khúc              |
| Trái-Phải, Trái-Phải             | Animation soldiers marching            |

#### Bước 5: Nhận biết phách mạnh/nhẹ (Strong/Weak beats)

| Nội dung giảng dạy     | Minh họa cần thực hiện                  |
| ---------------------- | --------------------------------------- |
| Phách 1 luôn MẠNH nhất | Visual: dot size lớn hơn cho phách mạnh |
| 4/4: mạnh-nhẹ-vừa-nhẹ  | Animation 4 dots với size khác nhau     |
| 3/4: mạnh-nhẹ-nhẹ      | Animation 3 dots                        |
| 2/4: mạnh-nhẹ          | Animation 2 dots                        |

**Bài tập:**

| Loại            | Mô tả                                 | Độ khó |
| --------------- | ------------------------------------- | ------ |
| `time-sig-id`   | Nghe đoạn nhạc → Xác định nhịp        | ⭐⭐   |
| `time-sig-tap`  | Gõ đúng pattern cho nhịp được yêu cầu | ⭐⭐   |
| `beat-strength` | Xác định phách mạnh/nhẹ               | ⭐     |

---

### 2.5 Nhịp ghép (Compound Meter)

**Mục tiêu học tập:**

- Hiểu nhịp 6/8 và cảm giác "triplet"
- Phân biệt nhịp đơn và nhịp ghép

**Cấu trúc bài học chi tiết:**

#### Bước 1: Nhịp 6/8 cơ bản

| Nội dung giảng dạy                             | Minh họa cần thực hiện                           |
| ---------------------------------------------- | ------------------------------------------------ |
| 6 móc đơn mỗi ô, NHƯNG nhóm thành 2 nhịp chính | `{{abc:M:6/8\n C/ D/ E/ F/ G/ A/}}` với grouping |
| Cảm giác "1-2-3, 1-2-3" (2 nhóm x 3)           | Metronome animation với 2 accents chính          |
| Ứng dụng: jig, tarantella, barcarolle          | Audio demo các thể loại nhạc 6/8                 |

#### Bước 2: So sánh 3/4 vs 6/8

| Nội dung giảng dạy                         | Minh họa cần thực hiện                |
| ------------------------------------------ | ------------------------------------- |
| 3/4: 3 phách đen, chia đôi thành 6 móc đơn | Animation cùng số nốt nhưng khác nhóm |
| 6/8: 2 phách chính, mỗi phách chia 3       | Side-by-side comparison audio/visual  |
| 3/4 = "1-2-3", 6/8 = "1-and-a, 2-and-a"    | Counting overlay với nhấn khác nhau   |

#### Bước 3: Nhịp 9/8, 12/8

| Nội dung giảng dạy                         | Minh họa cần thực hiện               |
| ------------------------------------------ | ------------------------------------ |
| 9/8 = 3 nhóm x 3 móc đơn                   | `{{abc:M:9/8\n ...}}` demo           |
| 12/8 = 4 nhóm x 3 móc đơn (blues shuffle)  | Audio demo blues/rock with 12/8 feel |
| Quy luật: chia cho 3 để biết số nhịp chính | Formula table: 6÷3=2, 9÷3=3, 12÷3=4  |

#### Bước 4: Cảm giác "swing" và triplet

| Nội dung giảng dạy                      | Minh họa cần thực hiện                                 |
| --------------------------------------- | ------------------------------------------------------ |
| Triplet = 3 nốt trong thời gian của 2   | `{{abc:C D E}}` straight vs `{{abc:(3 C D E}}` triplet |
| Swing feel trong Jazz                   | Audio demo: straight 8ths vs swung 8ths                |
| Compound meter tự nhiên có triplet feel | So sánh 6/8 với "swung" 4/4                            |

**Bài tập:**

| Loại                  | Mô tả                                    | Độ khó |
| --------------------- | ---------------------------------------- | ------ |
| `meter-type-id`       | Nghe nhạc → Phân biệt simple vs compound | ⭐⭐   |
| `compound-rhythm-tap` | Gõ pattern 6/8 hoặc 12/8                 | ⭐⭐⭐ |
| `triplet-feel`        | Gõ triplet patterns                      | ⭐⭐   |

---

### 2.6 Nhịp độ & BPM (Tempo & BPM)

**Mục tiêu học tập:**

- Hiểu khái niệm Beats Per Minute
- Nhận biết các thuật ngữ nhịp độ tiếng Ý

**Cấu trúc bài học chi tiết:**

#### Bước 1: Khái niệm BPM

| Nội dung giảng dạy                 | Minh họa cần thực hiện          |
| ---------------------------------- | ------------------------------- |
| BPM = số phách trong 1 phút        | Metronome animation với counter |
| BPM cao = nhanh, BPM thấp = chậm   | Slider điều chỉnh BPM từ 40-200 |
| Nhịp tim người = khoảng 60-100 BPM | So sánh với heartbeat animation |

#### Bước 2: Largo (Rất chậm: 40-60 BPM)

| Nội dung giảng dạy                  | Minh họa cần thực hiện                  |
| ----------------------------------- | --------------------------------------- |
| "Largo" tiếng Ý = rộng, chậm rãi    | Text với pronunciation audio            |
| Tạo cảm giác trang nghiêm, sâu lắng | Audio demo: Handel's Largo hoặc similar |
| Metronome 50 BPM                    | Interactive metronome set to 50         |

#### Bước 3: Andante (Vừa phải: 76-108 BPM)

| Nội dung giảng dạy         | Minh họa cần thực hiện          |
| -------------------------- | ------------------------------- |
| "Andante" tiếng Ý = đi bộ  | Walking animation với metronome |
| Tốc độ tự nhiên, thoải mái | Audio demo classical andante    |
| Metronome 90 BPM           | Interactive metronome set to 90 |

#### Bước 4: Allegro (Nhanh: 120-168 BPM)

| Nội dung giảng dạy                     | Minh họa cần thực hiện            |
| -------------------------------------- | --------------------------------- |
| "Allegro" tiếng Ý = vui vẻ, nhanh      | Animation energetic với metronome |
| Phổ biến trong Pop music (120-130 BPM) | Audio demo pop song ≈120 BPM      |
| Metronome 140 BPM                      | Interactive metronome set to 140  |

#### Bước 5: Presto (Rất nhanh: 168-200 BPM)

| Nội dung giảng dạy                     | Minh họa cần thực hiện              |
| -------------------------------------- | ----------------------------------- |
| "Presto" tiếng Ý = nhanh, ngay lập tức | Blur animation với metronome nhanh  |
| Đòi hỏi kỹ thuật cao                   | Audio demo: Flight of the Bumblebee |
| Metronome 180 BPM                      | Interactive metronome set to 180    |

**Bảng tổng hợp Tempo:**

| Thuật ngữ   | BPM Range | Tính cách              |
| ----------- | --------- | ---------------------- |
| Grave       | 20-40     | Rất chậm, nghiêm trang |
| Largo       | 40-60     | Rộng, chậm rãi         |
| Adagio      | 60-76     | Thư thả, dịu dàng      |
| Andante     | 76-108    | Đi bộ, vừa phải        |
| Moderato    | 108-120   | Trung bình             |
| Allegro     | 120-168   | Nhanh, vui vẻ          |
| Vivace      | 168-176   | Sống động              |
| Presto      | 176-200   | Rất nhanh              |
| Prestissimo | 200+      | Cực nhanh              |

**Bài tập:**

| Loại          | Mô tả                                 | Độ khó |
| ------------- | ------------------------------------- | ------ |
| `tempo-id`    | Nghe metronome → Đoán BPM range       | ⭐⭐   |
| `tempo-match` | Điều chỉnh metronome khớp với nhạc    | ⭐⭐   |
| `tempo-term`  | Cho BPM → Chọn thuật ngữ tiếng Ý đúng | ⭐     |

---

## Module 3: Âm giai & Giai điệu (Scales & Melody)

### 3.1 Âm giai trưởng (The Major Scale)

**Mục tiêu học tập:**

- Hiểu công thức xây dựng âm giai trưởng: C-C-N-C-C-C-N (W-W-H-W-W-W-H)
- Xây dựng âm giai trưởng từ bất kỳ nốt nào

**Cấu trúc bài học chi tiết:**

#### Bước 1: Công thức C-C-N-C-C-C-N

| Nội dung giảng dạy                                                  | Minh họa cần thực hiện                       |
| ------------------------------------------------------------------- | -------------------------------------------- |
| Âm giai trưởng tạo cảm giác "vui tươi, hoàn chỉnh"                  | Audio demo: C Major scale up & down          |
| Công thức khoảng cách: Cung - Cung - Nửa - Cung - Cung - Cung - Nửa | Animation các bậc thang với độ cao khác nhau |
| Quy tắc nhớ: "W-W-H, W-W-W-H" (Whole-Whole-Half...)                 | Visual pattern trên bàn phím Piano           |

#### Bước 2: Âm giai Đô trưởng (C Major)

| Nội dung giảng dạy                   | Minh họa cần thực hiện                   |
| ------------------------------------ | ---------------------------------------- |
| Bắt đầu từ C, áp dụng công thức      | Animation nhảy từng bước trên phím trắng |
| C-D (Cung), D-E (Cung), E-F (Nửa)... | Highlight từng cặp nốt và khoảng cách    |
| Tất cả đều là phím trắng             | Piano ảo chỉ highlight phím trắng        |

#### Bước 3: Âm giai Sol trưởng (G Major)

| Nội dung giảng dạy                                | Minh họa cần thực hiện                                 |
| ------------------------------------------------- | ------------------------------------------------------ |
| Bắt đầu từ G, áp dụng công thức                   | Animation nhảy từ G trên Piano                         |
| G-A-B-C-D-E... cần nốt tiếp theo cách 1 cung → F# | Highlight sai lầm nếu chọn F (nửa cung) → sửa thành F# |
| F# là "dấu hiệu nhận biết" của G Major            | Show 1 dấu thăng ở đầu khuông nhạc (Key Signature)     |

#### Bước 4: Âm giai Fa trưởng (F Major)

| Nội dung giảng dạy                            | Minh họa cần thực hiện                        |
| --------------------------------------------- | --------------------------------------------- |
| Bắt đầu từ F, áp dụng công thức               | Animation nhảy từ F                           |
| F-G-A... cần nốt tiếp theo cách nửa cung → Bb | Highlight A-B (1 cung) → phải giảm B xuống Bb |
| Bb là "dấu hiệu nhận biết" của F Major        | Show 1 dấu giáng ở đầu khuông nhạc            |

#### Bước 5: Xây dựng âm giai từ nốt bất kỳ

| Nội dung giảng dạy                                      | Minh họa cần thực hiện                                  |
| ------------------------------------------------------- | ------------------------------------------------------- |
| Chọn nốt gốc -> Áp dụng công thức -> Tìm ra các dấu hóa | Interactive tool: Chọn Root Note → Tự động nhảy các nốt |
| Kiểm tra lại bằng cách nghe                             | Play button cho scale vừa tạo                           |

**Bài tập:**

| Loại            | Mô tả                                                | Độ khó |
| --------------- | ---------------------------------------------------- | ------ |
| `scale-play`    | Chơi đúng các nốt của âm giai trên Piano ảo          | ⭐⭐   |
| `scale-note-id` | Cho giọng (vd: D Major) → Chọn các nốt đúng (F#, C#) | ⭐⭐   |
| `scale-builder` | Kéo thả nốt để hoàn thành âm giai khuyết             | ⭐⭐⭐ |

---

### 3.2 Hóa biểu (Key Signatures)

**Mục tiêu học tập:**

- Hiểu thứ tự dấu thăng: F-C-G-D-A-E-B
- Hiểu thứ tự dấu giáng: B-E-A-D-G-C-F
- Xác định giọng từ hóa biểu

**Cấu trúc bài học chi tiết:**

#### Bước 1: Thứ tự dấu thăng (Sharps)

| Nội dung giảng dạy                                  | Minh họa cần thực hiện                           |
| --------------------------------------------------- | ------------------------------------------------ |
| Luôn xuất hiện theo thứ tự: Fa-Đô-Sol-Rê-La-Mi-Si   | Animation các dấu thăng lần lượt hiện lên khuông |
| Câu nhớ: "Father Charles Goes Down And Ends Battle" | Visual mnemonic vui nhộn                         |
| Vị trí cố định trên khuông nhạc                     | `{{abc:K:C#\n}}` Hiển thị 7 dấu thăng            |

#### Bước 2: Thứ tự dấu giáng (Flats)

| Nội dung giảng dạy                                   | Minh họa cần thực hiện                |
| ---------------------------------------------------- | ------------------------------------- |
| Ngược lại với dấu thăng: Si-Mi-La-Rê-Sol-Đô-Fa       | Animation các dấu giáng lần lượt hiện |
| Câu nhớ: "Battle Ends And Down Goes Charles' Father" | Visual mnemonic                       |
| Vị trí cố định trên khuông nhạc                      | `{{abc:K:Cb\n}}` Hiển thị 7 dấu giáng |

#### Bước 3: Quy tắc xác định giọng thăng

| Nội dung giảng dạy                                                  | Minh họa cần thực hiện                                 |
| ------------------------------------------------------------------- | ------------------------------------------------------ |
| Lấy dấu thăng CUỐI CÙNG + nửa cung = Giọng trưởng                   | Ví dụ: 3 thăng (F, C, G) → G# + nửa cung = A Major     |
| Demo với 1, 2, 3, 4 dấu thăng                                       | Interactive slider: Tăng số dấu thăng → Hiện tên giọng |
| Ngoại lệ: F Major (1 giáng) phải nhớ riêng? Không, đây là bài thăng | Chỉ tập trung vào các giọng có dấu thăng               |

#### Bước 4: Quy tắc xác định giọng giáng

| Nội dung giảng dạy                                        | Minh họa cần thực hiện                                        |
| --------------------------------------------------------- | ------------------------------------------------------------- |
| Lấy dấu giáng KẾ CUỐI = Tên giọng trưởng                  | Ví dụ: 3 giáng (B, E, A) → Kế cuối là Eb → Eb Major           |
| Demo với 2, 3, 4 dấu giáng                                | Interactive slider: Tăng số dấu giáng → Highlight dấu kế cuối |
| Ngoại lệ: F Major (1 giáng) không có "kế cuối" → Phải nhớ | Highlight F Major đặc biệt                                    |

#### Bước 5: Thực hành đọc hóa biểu

| Nội dung giảng dạy                                    | Minh họa cần thực hiện                                    |
| ----------------------------------------------------- | --------------------------------------------------------- |
| Random hóa biểu → Xác định giọng                      | Flashcard game tốc độ cao                                 |
| Circle of Fifths (Vòng tròn bậc 5) giới thiệu sơ lược | Hình ảnh Circle of Fifths, click vào đâu hiện hóa biểu đó |

**Bài tập:**

| Loại                 | Mô tả                                             | Độ khó |
| -------------------- | ------------------------------------------------- | ------ |
| `key-sig-id`         | Nhìn hóa biểu → Chọn tên giọng đúng               | ⭐⭐   |
| `key-sig-write`      | Cho tên giọng → Kéo thả dấu hóa vào khuông        | ⭐⭐⭐ |
| `accidentals-in-key` | Giọng D Major có mấy dấu thăng? Là những dấu nào? | ⭐⭐   |

---

### 3.3 Quãng - Số lượng (Intervals - Quantity)

**Mục tiêu học tập:**

- Đếm quãng từ một nốt đến nốt khác (quãng 2, quãng 3, quãng 4...)
- Nhận biết quãng trên khuông nhạc

**Cấu trúc bài học chi tiết:**

#### Bước 1: Cách đếm quãng

| Nội dung giảng dạy                                 | Minh họa cần thực hiện                           |
| -------------------------------------------------- | ------------------------------------------------ |
| Đếm TẤT CẢ các dòng và khe từ nốt đầu đến nốt cuối | Animation đếm 1, 2, 3... trên khuông nhạc        |
| LUÔN đếm cả nốt bắt đầu là 1                       | Ví dụ: C lên E = C(1), D(2), E(3) → Quãng 3      |
| Sai lầm thường gặp: đếm khoảng cách = 2 (sai)      | Visual alert: "Don't count steps, count letters" |

#### Bước 2: Quãng 2 (Second)

| Nội dung giảng dạy                           | Minh họa cần thực hiện         |
| -------------------------------------------- | ------------------------------ |
| Nốt nằm ngay kế bên (dòng-khe hoặc khe-dòng) | `{{abc:C D}}` hiển thị quãng 2 |
| Âm thanh: bước đi liền kề                    | Audio demo                     |

#### Bước 3: Quãng 3 (Third)

| Nội dung giảng dạy                                 | Minh họa cần thực hiện                |
| -------------------------------------------------- | ------------------------------------- |
| Nốt nằm dòng-dòng hoặc khe-khe kế nhau             | `{{abc:C E}}` hiển thị quãng 3        |
| Hình ảnh "Snowman" (người tuyết) mới xây phần thân | Visual mnemonic: 2 nốt chồng lên nhau |
| Âm thanh: hòa hợp, dễ nghe                         | Audio demo harmonic & melodic         |

#### Bước 4: Quãng 4 (Fourth) & Quãng 5 (Fifth)

| Nội dung giảng dạy                     | Minh họa cần thực hiện           |
| -------------------------------------- | -------------------------------- |
| Quãng 5: Rỗng, vang, ổn định           | `{{abc:C G}}` Power chord guitar |
| Quãng 4: Hơi chới với, muốn về quãng 3 | `{{abc:C F}}` Audio demo         |
| Mẹo nhận biết hình ảnh trên khuông     | Pattern visual recognition       |

#### Bước 5: Quãng 6, 7, 8 (Sixth, Seventh, Octave)

| Nội dung giảng dạy                          | Minh họa cần thực hiện                        |
| ------------------------------------------- | --------------------------------------------- |
| Quãng 8 (Octave): Dòng-Khe nhưng cách xa    | `{{abc:C c}}`                                 |
| Quãng 7: Gay gắt, muốn giải quyết về 8      | `{{abc:C B}}` leading tone resolution         |
| Quãng 6: Ngọt ngào (nhưng rộng hơn quãng 3) | `{{abc:C A}}` (My Bonnie Lies Over The Ocean) |

**Bài tập:**

| Loại                 | Mô tả                                     | Độ khó |
| -------------------- | ----------------------------------------- | ------ |
| `interval-number-id` | Đếm quãng trên khuông nhạc (chỉ số lượng) | ⭐     |
| `interval-play`      | Nghe và chơi lại quãng trên phím đàn      | ⭐⭐   |

---

### 3.4 Quãng - Tính chất (Intervals - Quality)

**Mục tiêu học tập:**

- Phân biệt quãng Trưởng, Thứ, Đúng, Tăng, Giảm

**Cấu trúc bài học chi tiết:**

#### Bước 1: Quãng đúng (Perfect): 1, 4, 5, 8

| Nội dung giảng dạy                             | Minh họa cần thực hiện |
| ---------------------------------------------- | ---------------------- |
| Chỉ có quãng 1, 4, 5, 8 mới gọi là Perfect (P) | Bảng phân loại quãng   |
| Âm thanh trong trẻo, rỗng                      | Audio demo P4, P5, P8  |
| P4 = 2 cung + 1 nửa; P5 = 3 cung + 1 nửa       | Đếm cung trên phím đàn |

#### Bước 2: Quãng trưởng (Major): 2, 3, 6, 7

| Nội dung giảng dạy                                         | Minh họa cần thực hiện        |
| ---------------------------------------------------------- | ----------------------------- |
| Các quãng 2, 3, 6, 7 trong âm giai trưởng là Major (M)     | Liên hệ về bài Âm giai trưởng |
| M3 (3 trưởng) = 2 cung (vui); m3 (3 thứ) = 1.5 cung (buồn) | So sánh C-E vs C-Eb           |
| Audio: M3 "Oh When The Saints"; m3 "Greensleeves"          | Audio snippets                |

#### Bước 3: Quãng thứ (Minor)

| Nội dung giảng dạy                                     | Minh họa cần thực hiện                                  |
| ------------------------------------------------------ | ------------------------------------------------------- |
| Quãng Trưởng giảm đi nửa cung = Quãng Thứ (m)          | Animation nốt trên giảm xuống nửa cung (thêm dấu giáng) |
| Chỉ áp dụng cho 2, 3, 6, 7 (Không có "Second Perfect") | Bảng quy đổi M ↔ m                                      |
| So sánh M6 vs m6                                       | Audio demo                                              |

#### Bước 4: Quãng tăng (Augmented) & Giảm (Diminished)

| Nội dung giảng dạy                           | Minh họa cần thực hiện             |
| -------------------------------------------- | ---------------------------------- |
| Perfect/Major tăng nửa cung = Augmented (+)  | Animation mở rộng quãng            |
| Perfect/Minor giảm nửa cung = Diminished (°) | Animation thu hẹp quãng            |
| Ví dụ: C-F# (Aug 4) - Diabolus in Musica     | Audio "The Simpsons" theme (Aug 4) |

#### Bước 5: Nhận diện bằng tai (Ear Training)

| Nội dung giảng dạy                            | Minh họa cần thực hiện                                 |
| --------------------------------------------- | ------------------------------------------------------ |
| Luyện nghe các quãng phổ biến: P4, P5, M3, m3 | Interactive Scale Ear Trainer                          |
| Mẹo nhớ bài hát cho từng quãng                | Danh sách bài hát (Wedding March = P4, Star Wars = P5) |

**Bài tập:**

| Loại                     | Mô tả                                                 | Độ khó |
| ------------------------ | ----------------------------------------------------- | ------ |
| `interval-quality-id`    | Xác định tính chất quãng (vd: Major 3rd vs Minor 3rd) | ⭐⭐⭐ |
| `ear-training-intervals` | Nghe và đoán tên quãng                                | ⭐⭐⭐ |

---

### 3.5 Âm giai thứ (The Minor Scales)

**Mục tiêu học tập:**

- Hiểu 3 dạng âm giai thứ: Tự nhiên, Hòa thanh, Giai điệu

**Cấu trúc bài học chi tiết:**

#### Bước 1: Âm giai thứ tự nhiên (Natural Minor)

| Nội dung giảng dạy                              | Minh họa cần thực hiện                 |
| ----------------------------------------------- | -------------------------------------- |
| Công thức: C-N-C-C-N-C-C (W-H-W-W-H-W-W)        | Animation bậc thang âm giai thứ        |
| Là âm giai của giọng song song (Relative Minor) | Từ C Major đếm xuống quãng 3 (A minor) |
| Âm hưởng buồn, tự nhiên                         | Audio demo A Natural Minor             |

#### Bước 2: Âm giai thứ hòa thanh (Harmonic Minor)

| Nội dung giảng dạy                                     | Minh họa cần thực hiện                           |
| ------------------------------------------------------ | ------------------------------------------------ |
| Nâng bậc 7 lên nửa cung để tạo "Leading Tone"          | So sánh nốt G vs G# trong A minor                |
| Quãng từ bậc 6 đến 7 tăng (Aug 2nd) nghe rất đặc trưng | Audio demo chất liệu "Ả Rập/Ai Cập"              |
| Dùng để xây dựng hợp âm V trưởng                       | Giải thích tại sao cần G# (để tạo E Major chord) |

#### Bước 3: Âm giai thứ giai điệu (Melodic Minor)

| Nội dung giảng dạy                                  | Minh họa cần thực hiện                           |
| --------------------------------------------------- | ------------------------------------------------ |
| Khi đi lên: Nâng bậc 6 và 7                         | Animation scale đi lên: F#, G#                   |
| Khi đi xuống: Trả về tự nhiên (bình thường)         | Animation scale đi xuống: G tự nhiên, F tự nhiên |
| Lý do: Để giai điệu mượt mà hơn (tránh quãng Aug 2) | So sánh Melodic vs Harmonic                      |

#### Bước 4: Giọng song song (Relative Major/Minor)

| Nội dung giảng dạy                        | Minh họa cần thực hiện                          |
| ----------------------------------------- | ----------------------------------------------- |
| Cùng hóa biểu, khác nốt chủ (Tonic)       | Vòng tròn: C Major bên ngoài, A Minor bên trong |
| Cách tìm: Major xuống quãng 3 thứ = Minor | Animation nốt C di chuyển xuống A               |
| Ví dụ: G Major (1#) song song với E Minor | Hiển thị khuông nhạc chung hóa biểu             |

#### Bước 5: Thực hành La thứ (A minor)

| Nội dung giảng dạy                      | Minh họa cần thực hiện                           |
| --------------------------------------- | ------------------------------------------------ |
| Chơi A minor trên các nhạc cụ           | Interactive Piano/Guitar: chỉ các nốt trắng từ A |
| Improvisation thử trên nền nhạc A minor | Backing track A minor play-along                 |

**Bài tập:**

| Loại               | Mô tả                                               | Độ khó |
| ------------------ | --------------------------------------------------- | ------ |
| `minor-scale-play` | Chơi 3 loại âm giai thứ                             | ⭐⭐⭐ |
| `minor-type-id`    | Nghe/Nhìn scale → Xác định Natural/Harmonic/Melodic | ⭐⭐   |

---

### 3.6 Âm giai ngũ cung (The Pentatonic Scale)

**Mục tiêu học tập:**

- Hiểu âm giai ngũ cung trưởng và thứ
- Vai trò quan trọng trong solo và nhạc dân tộc Việt Nam

**Cấu trúc bài học chi tiết:**

#### Bước 1: Ngũ cung trưởng (Major Pentatonic)

| Nội dung giảng dạy                           | Minh họa cần thực hiện                |
| -------------------------------------------- | ------------------------------------- |
| 5 nốt: 1 - 2 - 3 - 5 - 6 (Bỏ nốt 4 và 7)     | Từ C Major scale → Xóa F và B         |
| Âm hưởng: Mơ mộng, tươi sáng, dân gian       | Audio demo "Amazing Grace" (phần đầu) |
| Trên phím đen: 5 phím đen tạo thành ngũ cung | Piano ảo highlight 5 phím đen         |

#### Bước 2: Ngũ cung thứ (Minor Pentatonic)

| Nội dung giảng dạy                       | Minh họa cần thực hiện                      |
| ---------------------------------------- | ------------------------------------------- |
| 5 nốt: 1 - ♭3 - 4 - 5 - ♭7               | Từ A Minor scale → Bỏ nốt 2 và 6            |
| Âm hưởng: Blues, Rock, ngầu              | Audio demo câu guitar solo classic rock     |
| Là scale quan trọng nhất cho Guitar solo | Guitar ảo hiển thị thế tay pentatonic box 1 |

#### Bước 3: Ứng dụng trong nhạc Blues/Rock

| Nội dung giảng dạy                     | Minh họa cần thực hiện                  |
| -------------------------------------- | --------------------------------------- |
| Thêm "Blue note" (♭5) vào ngũ cung thứ | Demo thêm nốt Eb vào A minor pentatonic |
| Call & Response (Xướng - Họa)          | Audio demo 2 phrase đối đáp             |

#### Bước 4: Ngũ cung trong nhạc Việt Nam

| Nội dung giảng dạy                          | Minh họa cần thực hiện                                          |
| ------------------------------------------- | --------------------------------------------------------------- |
| Hệ thống Hò, Xự, Xang, Xê, Cống             | Bảng tương đương: C, D, F, G, A (Bắc) hoặc C, D, E, G, A (Nam)? |
| Điệu Bắc (vui) vs Điệu Nam (buồn)           | Audio demo Sáo Trúc 2 sắc thái                                  |
| Ngũ cung Việt Nam khác gì phương Tây? (Non) | Demo kỹ thuật rung/nhấn của nhạc cụ dân tộc                     |

#### Bước 5: Thực hành improvisation cơ bản

| Nội dung giảng dạy                   | Minh họa cần thực hiện                                 |
| ------------------------------------ | ------------------------------------------------------ |
| "Không có nốt sai" trong ngũ cung    | Interactive: Click nốt bất kỳ trong scale đều nghe hay |
| Tạo giai điệu đơn giản trên nền nhạc | Backing track → User click nốt tạo giai điệu           |

**Bài tập:**

| Loại               | Mô tả                                           | Độ khó |
| ------------------ | ----------------------------------------------- | ------ |
| `flute-pentatonic` | Chơi giai điệu ngũ cung trên giao diện Sáo Trúc | ⭐⭐   |
| `pentatonic-id`    | Phân biệt ngũ cung trưởng/thứ                   | ⭐     |

---

## Module 4: Hòa âm - Nền tảng (Harmony - The Core)

### 4.1 Hợp âm ba nốt (Triads)

**Mục tiêu học tập:**

- Hiểu cấu trúc hợp âm 3 nốt: Nốt gốc, Quãng 3, Quãng 5
- Xây dựng hợp âm từ bất kỳ nốt nào

**Cấu trúc bài học chi tiết:**

#### Bước 1: Khái niệm hợp âm (Chord)

| Nội dung giảng dạy                       | Minh họa cần thực hiện                         |
| ---------------------------------------- | ---------------------------------------------- |
| Hợp âm = 3 nốt trở lên vang lên cùng lúc | Audio: 1 nốt (đơn) vs 3 nốt (hợp âm)           |
| Triad = Hợp âm cơ bản nhất (3 nốt)       | Visual: 3 nốt chồng lên nhau như "người tuyết" |
| Cảm giác "đầy đặn" của hòa âm            | So sánh giai điệu đơn vs giai điệu có đệm      |

#### Bước 2: Nốt gốc (Root), Quãng 3 (Third), Quãng 5 (Fifth)

| Nội dung giảng dạy                     | Minh họa cần thực hiện     |
| -------------------------------------- | -------------------------- |
| Nốt gốc: Tên của hợp âm, nằm dưới cùng | Highlight nốt Root màu đỏ  |
| Quãng 3: Cách nốt gốc quãng 3          | Highlight nốt 3rd màu xanh |
| Quãng 5: Cách nốt gốc quãng 5          | Highlight nốt 5th màu vàng |

#### Bước 3: Xây dựng hợp âm C (Đô trưởng)

| Nội dung giảng dạy              | Minh họa cần thực hiện |
| ------------------------------- | ---------------------- |
| Root = C                        | Piano: Highlight C     |
| 3rd = E (cách C quãng 3 trưởng) | Piano: Highlight E     |
| 5th = G (cách C quãng 5 đúng)   | Piano: Highlight G     |
| Play C-E-G cùng lúc             | Piano: Nhấn cả 3 phím  |

#### Bước 4: Xây dựng hợp âm G, F, Am

| Nội dung giảng dạy                      | Minh họa cần thực hiện                       |
| --------------------------------------- | -------------------------------------------- |
| G Major = G - B - D                     | Animation xây dựng từng nốt                  |
| F Major = F - A - C                     | Animation xây dựng từng nốt                  |
| A Minor = A - C - E (chú ý quãng 3 thứ) | So sánh quãng A-C (1.5 cung) vs C-E (2 cung) |

#### Bước 5: Chơi hợp âm trên Guitar

| Nội dung giảng dạy                            | Minh họa cần thực hiện               |
| --------------------------------------------- | ------------------------------------ |
| Trên Guitar, các nốt có thể bị đảo lộn thứ tự | Visual: Hợp âm C open chords diagram |
| Miễn là đủ 3 nốt C-E-G                        | Highlight các nốt trên cần đàn       |
| Strumming (quạt chả)                          | Audio demo strumming pattern         |

**Bài tập:**

| Loại              | Mô tả                                  | Độ khó |
| ----------------- | -------------------------------------- | ------ |
| `chord-builder`   | Chọn Root, 3rd, 5th để tạo hợp âm đúng | ⭐⭐   |
| `chord-note-id`   | Hợp âm C gồm những nốt nào?            | ⭐     |
| `staff-placement` | Xếp chồng 3 nốt lên khuông nhạc        | ⭐⭐   |

---

### 4.2 Tính chất hợp âm (Chord Qualities)

**Mục tiêu học tập:**

- Phân biệt hợp âm Trưởng, Thứ, Giảm, Tăng

**Cấu trúc bài học chi tiết:**

#### Bước 1: Hợp âm trưởng (Major): 1 - 3 - 5

| Nội dung giảng dạy                      | Minh họa cần thực hiện             |
| --------------------------------------- | ---------------------------------- |
| Công thức: M3 + m3 (Dưới lớn, trên nhỏ) | Visual đo khoảng cách giữa các nốt |
| Âm hưởng: Vui, sáng, ổn định            | Audio demo C Major chord           |
| Ký hiệu: C, CM, Cmaj                    | Text overlays                      |

#### Bước 2: Hợp âm thứ (Minor): 1 - ♭3 - 5

| Nội dung giảng dạy                      | Minh họa cần thực hiện           |
| --------------------------------------- | -------------------------------- |
| Công thức: m3 + M3 (Dưới nhỏ, trên lớn) | Visual đo khoảng cách A-C và C-E |
| Âm hưởng: Buồn, tối, sâu lắng           | Audio demo C Minor chord         |
| Ký hiệu: Cm, Cmin, c                    | Text overlays                    |

#### Bước 3: Hợp âm giảm (Diminished): 1 - ♭3 - ♭5

| Nội dung giảng dạy                                  | Minh họa cần thực hiện                     |
| --------------------------------------------------- | ------------------------------------------ |
| Công thức: m3 + m3 (Hai quãng 3 nhỏ chồng lên nhau) | Visual đo khoảng cách                      |
| Âm hưởng: Căng thẳng, co lại, đáng sợ               | Audio demo C Dim chord (nhạc phim kinh dị) |
| Ký hiệu: Cdim, C°                                   | Text overlays                              |

#### Bước 4: Hợp âm tăng (Augmented): 1 - 3 - #5

| Nội dung giảng dạy                                  | Minh họa cần thực hiện |
| --------------------------------------------------- | ---------------------- |
| Công thức: M3 + M3 (Hai quãng 3 lớn chồng lên nhau) | Visual đo khoảng cách  |
| Âm hưởng: Mơ hồ, lơ lửng, giãn ra                   | Audio demo C Aug chord |
| Ký hiệu: Caug, C+                                   | Text overlays          |

#### Bước 5: Luyện nghe phân biệt

| Nội dung giảng dạy                            | Minh họa cần thực hiện                  |
| --------------------------------------------- | --------------------------------------- |
| So sánh cùng nốt gốc: C vs Cm vs Cdim vs Caug | 4 nút bấm phát 4 loại hợp âm để so sánh |
| Cảm xúc của từng loại                         | Emoji biểu cảm (😄 😢 😱 ☁️)            |

**Bài tập:**

| Loại                  | Mô tả                                 | Độ khó |
| --------------------- | ------------------------------------- | ------ |
| `chord-quality-id`    | Nghe/Nhìn hợp âm → Xác định tính chất | ⭐⭐   |
| `ear-training-chords` | Game "Thẩm âm": Major hay Minor?      | ⭐     |

---

### 4.3 Hợp âm trong giọng (Diatonic Chords)

**Mục tiêu học tập:**

- Hiểu các hợp âm được xây dựng từ âm giai
- 7 hợp âm tự nhiên trong một giọng

**Cấu trúc bài học chi tiết:**

#### Bước 1: Xây dựng hợp âm từ mỗi bậc của âm giai

| Nội dung giảng dạy                                    | Minh họa cần thực hiện                |
| ----------------------------------------------------- | ------------------------------------- |
| Lấy C Major Scale làm nền                             | Hiển thị 7 nốt C-D-E-F-G-A-B          |
| Chồng quãng 3 lên TỪNG nốt (như xây nhà tầng)         | Animation "mọc" thêm nốt cho từng bậc |
| Chỉ dùng nốt TRONG âm giai (không thêm dấu hóa ngoài) | Alert: "Stay within the key!"         |

#### Bước 2: Các hợp âm trong giọng C

| Nội dung giảng dạy                                   | Minh họa cần thực hiện                    |
| ---------------------------------------------------- | ----------------------------------------- |
| Bậc I: C-E-G (Major)                                 | Label: C Major                            |
| Bậc II: D-F-A (Minor - vì F tự nhiên, không phải F#) | Label: D Minor (giải thích tại sao Minor) |
| Bậc V: G-B-D (Major)                                 | Label: G Major                            |
| Bậc VII: B-D-F (Diminished)                          | Label: B Diminished                       |

#### Bước 3: Quy luật: I-ii-iii-IV-V-vi-vii°

| Nội dung giảng dạy                           | Minh họa cần thực hiện                      |
| -------------------------------------------- | ------------------------------------------- |
| Mọi giọng Trưởng đều theo quy luật này       | Bảng công thức: M - m - m - M - M - m - dim |
| Chữ hoa = Major, chữ thường = Minor          | Ví dụ I vs ii                               |
| Quan trọng nhất: I, IV, V (3 "anh cả" Major) | Highlight 3 trụ cột chính                   |

#### Bước 4: Ví dụ trong giọng G

| Nội dung giảng dạy                       | Minh họa cần thực hiện                            |
| ---------------------------------------- | ------------------------------------------------- |
| Giọng G có F# → Tất cả nốt F phải là F#  | Key Signature G Major                             |
| Hợp âm D (Re-Fa#-La) → Trở thành D Major | So sánh Dm trong giọng C và D Major trong giọng G |
| Hợp âm F#dim (vii°)                      | Demo chord                                        |

**Bài tập:**

| Loại                | Mô tả                                   | Độ khó |
| ------------------- | --------------------------------------- | ------ |
| `diatonic-chord-id` | Hợp âm bậc vi của C là gì? (Am)         | ⭐⭐   |
| `diatonic-builder`  | Điền các hợp âm còn thiếu trong giọng F | ⭐⭐⭐ |

---

### 4.4 Ký hiệu số La Mã (Roman Numeral Analysis)

**Mục tiêu học tập:**

- Sử dụng hệ thống Nashville/số La Mã
- Phân tích tiến trình hợp âm

**Cấu trúc bài học chi tiết:**

#### Bước 1: Ký hiệu I, ii, iii, IV, V, vi, vii°

| Nội dung giảng dạy                       | Minh họa cần thực hiện                      |
| ---------------------------------------- | ------------------------------------------- |
| Tại sao dùng số? Để áp dụng cho MỌI tone | Animation thay đổi Key: C → G, số không đổi |
| Hệ thống Nashville Number System         | Ví dụ sheet nhạc chỉ ghi số                 |

#### Bước 2: Chữ hoa = Trưởng, Chữ thường = Thứ

| Nội dung giảng dạy | Minh họa cần thực hiện      |
| ------------------ | --------------------------- |
| I, IV, V (Lớn)     | Visual: Font chữ to/đậm     |
| ii, iii, vi (Nhỏ)  | Visual: Font chữ nhỏ/thường |
| vii° (Nhỏ + tròn)  | Ký hiệu dim                 |

#### Bước 3: Ví dụ: I-V-vi-IV (tiến trình pop phổ biến)

| Nội dung giảng dạy                                 | Minh họa cần thực hiện |
| -------------------------------------------------- | ---------------------- |
| Trong C: C → G → Am → F                            | Play progression in C  |
| Trong G: G → D → Em → C                            | Play progression in G  |
| Nghe giống hệt nhau về "tình cảm", chỉ khác độ cao | Audio Compare button   |

#### Bước 4: Chuyển đổi giữa các giọng

| Nội dung giảng dạy                          | Minh họa cần thực hiện         |
| ------------------------------------------- | ------------------------------ |
| Transpose (dịch giọng) dễ dàng nhờ số La Mã | Tool Interactive Transposer    |
| Ứng dụng để chọn Tone phù hợp giọng hát     | Slider thay đổi tone người hát |

**Bài tập:**

| Loại                     | Mô tả                                            | Độ khó |
| ------------------------ | ------------------------------------------------ | ------ |
| `roman-convert`          | Cho hợp âm Am trong giọng C → Viết số La Mã (vi) | ⭐⭐   |
| `roman-progression-play` | Chơi tiến trình I-IV-V trong giọng D             | ⭐⭐⭐ |

---

### 4.5 Vòng quãng 5 (The Circle of Fifths)

**Mục tiêu học tập:**

- Hiểu mối quan hệ giữa các giọng
- Sử dụng vòng quãng 5 để xác định hóa biểu

**Cấu trúc bài học chi tiết:**

#### Bước 1: Cấu trúc vòng tròn

| Nội dung giảng dạy                             | Minh họa cần thực hiện              |
| ---------------------------------------------- | ----------------------------------- |
| Giống mặt đồng hồ: C ở 12 giờ                  | Interactive Circle Chart            |
| Mỗi bước sang phải = Quãng 5 đúng (C → G → D)  | Animation đi theo chiều kim đồng hồ |
| Mỗi bước sang trái = Quãng 4 đúng (C → F → Bb) | Animation đi ngược chiều            |

#### Bước 2: Chiều kim đồng hồ = thêm dấu thăng

| Nội dung giảng dạy                         | Minh họa cần thực hiện                |
| ------------------------------------------ | ------------------------------------- |
| C (0#) → G (1#) → D (2#) → A (3#)...       | Highlight số lượng dấu thăng tăng dần |
| Dấu thăng mới luôn là bậc 7 (Leading tone) | Ví dụ: G thêm F#, D thêm C#           |

#### Bước 3: Ngược kim đồng hồ = thêm dấu giáng

| Nội dung giảng dạy                     | Minh họa cần thực hiện                |
| -------------------------------------- | ------------------------------------- |
| C (0b) → F (1b) → Bb (2b) → Eb (3b)... | Highlight số lượng dấu giáng tăng dần |
| Dấu giáng mới luôn là bậc 4            | Ví dụ: F thêm Bb, Bb thêm Eb          |

#### Bước 4: Giọng song song (Major/Minor)

| Nội dung giảng dạy                | Minh họa cần thực hiện            |
| --------------------------------- | --------------------------------- |
| Vòng tròn bên trong cho giọng Thứ | A minor ở 12 giờ (dưới C Major)   |
| Quan hệ không đổi: a → e → b...   | Rotation animation của vòng trong |

#### Bước 5: Áp dụng chuyển giọng

| Nội dung giảng dạy                          | Minh họa cần thực hiện  |
| ------------------------------------------- | ----------------------- |
| Các giọng gần nhau (hàng xóm) nghe hợp nhau | Highlight cụm C-F-G     |
| Dùng để mượn hợp âm hoặc chuyển tone mượt   | Demo chuyển từ C sang G |

**Bài tập:**

| Loại                | Mô tả                                   | Độ khó |
| ------------------- | --------------------------------------- | ------ |
| `circle-navigation` | Điền tên giọng còn thiếu trên vòng tròn | ⭐⭐   |
| `circle-key-id`     | Giọng A Major nằm ở đâu? Có mấy dấu #?  | ⭐⭐   |

---

### 4.6 Đảo hợp âm (Chord Inversions)

**Mục tiêu học tập:**

- Hiểu hợp âm thế 1 và thế 2
- Áp dụng voice leading cơ bản

**Cấu trúc bài học chi tiết:**

#### Bước 1: Hợp âm nguyên vị (Root Position)

| Nội dung giảng dạy                      | Minh họa cần thực hiện                   |
| --------------------------------------- | ---------------------------------------- |
| Root nằm dưới cùng (Bass)               | `{{abc:C E G}}` "Người tuyết" đứng thẳng |
| Cấu trúc: 3rd + 3rd (xếp chồng quãng 3) | Visual building block                    |

#### Bước 2: Hợp âm đảo thế 1 (First Inversion)

| Nội dung giảng dạy                       | Minh họa cần thực hiện       |
| ---------------------------------------- | ---------------------------- |
| Root chuyển lên octave trên. 3rd nằm đáy | `{{abc:E G c}}`              |
| Ký hiệu: C/E (C bass E)                  | Visual chuyển nốt C lên trên |
| Âm hưởng: Nhẹ hơn, chưa ổn định          | Audio demo                   |

#### Bước 3: Hợp âm đảo thế 2 (Second Inversion)

| Nội dung giảng dạy                              | Minh họa cần thực hiện       |
| ----------------------------------------------- | ---------------------------- |
| 3rd chuyển tiếp lên trên. 5th nằm đáy           | `{{abc:G c e}}`              |
| Ký hiệu: C/G (C bass G)                         | Visual chuyển nốt E lên trên |
| Âm hưởng: Chơi vơi, thường dùng để kết hoặc nối | Audio demo cadential 6/4     |

#### Bước 4: Ký hiệu slash chord: C/E, C/G

| Nội dung giảng dạy                          | Minh họa cần thực hiện                |
| ------------------------------------------- | ------------------------------------- |
| Bên trái: Tên hợp âm. Bên phải: Nốt Bass    | Text explanation                      |
| Quan trọng cho tay trái Piano / Bass player | Piano ảo highlight tay trái nhấn Bass |

#### Bước 5: Voice Leading mượt mà

| Nội dung giảng dạy               | Minh họa cần thực hiện                            |
| -------------------------------- | ------------------------------------------------- |
| Di chuyển các nốt ít nhất có thể | So sánh C nhảy cóc lên F vs C chuyển nhẹ sang F/C |
| Nguyên tắc "Đường đi ngắn nhất"  | Animation line nối các nốt gần nhau               |

**Bài tập:**

| Loại             | Mô tả                                   | Độ khó |
| ---------------- | --------------------------------------- | ------ |
| `inversion-id`   | Nhìn thế tay/nốt → Xác định đảo 1 hay 2 | ⭐⭐⭐ |
| `inversion-play` | Chơi hợp âm C/G trên Piano              | ⭐⭐   |

---

### 4.7 Hợp âm 7 (Seventh Chords)

**Mục tiêu học tập:**

- Hiểu các loại hợp âm 7: Major 7, Minor 7, Dominant 7
- Âm sắc đặc trưng của từng loại

**Cấu trúc bài học chi tiết:**

#### Bước 1: Major 7 (Maj7): sáng, mơ màng

| Nội dung giảng dạy                       | Minh họa cần thực hiện    |
| ---------------------------------------- | ------------------------- |
| Công thức: Triad trưởng + Quãng 7 trưởng | `{{abc:C E G B}}`         |
| Âm hưởng: Jazz, Lo-fi, mơ mộng           | Demo đoạn nhạc Lo-fi beat |
| Ký hiệu: Cmaj7, CM7, C△7                 | Text overlays             |

#### Bước 2: Minor 7 (min7): buồn, nhẹ nhàng

| Nội dung giảng dạy                 | Minh họa cần thực hiện |
| ---------------------------------- | ---------------------- |
| Công thức: Triad thứ + Quãng 7 thứ | `{{abc:C _E G _B}}`    |
| Âm hưởng: Soul, R&B, buồn man mác  | Demo đệm R&B           |
| Ký hiệu: Cm7, C-7                  | Text overlays          |

#### Bước 3: Dominant 7 (dom7): căng thẳng, muốn giải quyết

| Nội dung giảng dạy                            | Minh họa cần thực hiện  |
| --------------------------------------------- | ----------------------- |
| Công thức: Triad trưởng + Quãng 7 thứ         | `{{abc:C E G _B}}`      |
| Hợp âm quan trọng nhất để về chủ âm (V7 -> I) | Demo G7 giải quyết về C |
| Âm hưởng: Blues, Funk                         | Demo Blues lick         |

#### Bước 4: Tiến trình ii-V-I trong Jazz

| Nội dung giảng dạy               | Minh họa cần thực hiện     |
| -------------------------------- | -------------------------- |
| Dm7 - G7 - Cmaj7                 | Play progression           |
| "Cỗ máy thời gian" của nhạc Jazz | Loop progression animation |

#### Bước 5: Hợp âm 7 trên Guitar

| Nội dung giảng dạy                  | Minh họa cần thực hiện |
| ----------------------------------- | ---------------------- |
| Các thế tay mở phổ biến: G7, C7, E7 | Guitar ảo diagram      |
| Barre chords cho hợp âm 7           | Guitar ảo thế tay chặn |

**Bài tập:**

| Loại                    | Mô tả                              | Độ khó |
| ----------------------- | ---------------------------------- | ------ |
| `seventh-type-id`       | Nghe và phân biệt Maj7, min7, dom7 | ⭐⭐⭐ |
| `ear-training-sevenths` | Xác định nốt 7 trong hợp âm        | ⭐⭐⭐ |

---

## Module 5: Sáng tác & Cấu trúc (Composition & Form)

### 5.1 Tiến trình hợp âm phổ biến (Common Chord Progressions)

**Mục tiêu học tập:**

- Nhận biết các tiến trình Pop/Rock thông dụng
- Áp dụng tiến trình ii-V-I

**Cấu trúc bài học chi tiết:**

#### Bước 1: I-V-vi-IV (Pop progression)

| Nội dung giảng dạy                      | Minh họa cần thực hiện                      |
| --------------------------------------- | ------------------------------------------- |
| Tiến trình phổ biến nhất trong nhạc Pop | Audio: "Four chords song" medley            |
| Cảm xúc: Tích cực, phấn khích, dễ nhớ   | Loop progression C - G - Am - F             |
| Mẹo nhớ: "Axis of Awesome"              | Video clip ngắn minh họa (hoặc infographic) |

#### Bước 2: I-IV-V-I (Blues/Rock/Folk)

| Nội dung giảng dạy                      | Minh họa cần thực hiện |
| --------------------------------------- | ---------------------- |
| Tiến trình 3 hợp âm cơ bản              | C - F - G - C          |
| Âm hưởng: Mộc mạc, mạnh mẽ, rock n roll | Demo Rock beat         |
| 12-bar Blues structure                  | Visual grid 12 ô       |

#### Bước 3: ii-V-I (Jazz)

| Nội dung giảng dạy                    | Minh họa cần thực hiện      |
| ------------------------------------- | --------------------------- |
| Tiến trình quan trọng nhất trong Jazz | Dm7 - G7 - Cmaj7            |
| Circle of Fifths movement (D → G → C) | Highlight trên vòng quãng 5 |
| Tạo sức hút mạnh mẽ về chủ âm         | Audio stress voice leading  |

#### Bước 4: vi-IV-I-V (Axis progression)

| Nội dung giảng dạy                            | Minh họa cần thực hiện   |
| --------------------------------------------- | ------------------------ |
| Biến thể bắt đầu bằng giọng thứ (Sad version) | Am - F - C - G           |
| Cảm xúc: Sâu lắng, epic, tráng lệ             | Demo "Hans Zimmer style" |
| Phổ biến trong nhạc phim, nhạc ballad         | List bài hát ví dụ       |

#### Bước 5: Phân tích bài hát thực tế

| Nội dung giảng dạy                  | Minh họa cần thực hiện        |
| ----------------------------------- | ----------------------------- |
| Nghe bài hát → Phân tích tiến trình | Interactive Song Analyzer     |
| Tự tạo tiến trình của riêng bạn     | Chord Sequencer Tool đơn giản |

**Bài tập:**

| Loại                 | Mô tả                                 | Độ khó |
| -------------------- | ------------------------------------- | ------ |
| `progression-ear-id` | Nghe và đoán tiến trình nào đang chơi | ⭐⭐   |
| `progression-play`   | Đệm theo hợp âm của bài hát           | ⭐⭐⭐ |

---

### 5.2 Chỗ ngắt (Cadences)

**Mục tiêu học tập:**

- Hiểu các loại cadence: Perfect, Plagal, Half, Deceptive

**Cấu trúc bài học chi tiết:**

#### Bước 1: Perfect Cadence (V → I): kết thúc hoàn toàn

| Nội dung giảng dạy                         | Minh họa cần thực hiện |
| ------------------------------------------ | ---------------------- |
| Authentic Cadence (PAC): V7 về I           | G7 → C                 |
| Cảm giác: "Về nhà", trọn vẹn, dấu chấm hết | Animation cửa đóng lại |
| Dùng ở cuối bài hoặc cuối đoạn lớn         | Audio demo kết bài     |

#### Bước 2: Plagal Cadence (IV → I): kết Amen

| Nội dung giảng dạy                     | Minh họa cần thực hiện |
| -------------------------------------- | ---------------------- |
| "Amen Cadence": F về C                 | F → C (nhà thờ)        |
| Cảm giác: Bình yên, nhẹ nhàng          | Audio demo thánh ca    |
| Dùng phổ biến trong Rock/Pop (Oh yeah) | Audio demo "Let It Be" |

#### Bước 3: Half Cadence (? → V): dừng giữa câu

| Nội dung giảng dạy                    | Minh họa cần thực hiện |
| ------------------------------------- | ---------------------- |
| Kết thúc ở V (chưa giải quyết)        | C - F - G... (ngưng)   |
| Cảm giác: Dấu phẩy, còn tiếp, chờ đợi | Animation dấu hỏi chấm |
| Muốn nghe tiếp câu sau                | Audio demo câu hỏi     |

#### Bước 4: Deceptive Cadence (V → vi): bất ngờ

| Nội dung giảng dạy                      | Minh họa cần thực hiện   |
| --------------------------------------- | ------------------------ |
| Đáng lẽ về I nhưng lại "lừa" sang vi    | G7 → Am                  |
| Cảm giác: Bất ngờ, thất vọng, kéo dài   | Animation mặt ngạc nhiên |
| Dùng để kéo dài bài hát (chưa muốn kết) | Audio demo               |

#### Bước 5: Nhận diện trong bài hát

| Nội dung giảng dạy                   | Minh họa cần thực hiện     |
| ------------------------------------ | -------------------------- |
| Nghe đoạn nhạc → Xác định điểm ngắt  | Interactive wave inspector |
| Cảm nhận sự căng thẳng và giải quyết | Visual tension meter       |

**Bài tập:**

| Loại               | Mô tả                                  | Độ khó |
| ------------------ | -------------------------------------- | ------ |
| `cadence-id`       | Nghe 2 hợp âm cuối → Chọn loại cadence | ⭐⭐   |
| `cadence-complete` | Chọn hợp âm cuối để tạo đúng cadence   | ⭐⭐   |

---

### 5.3 Đường nét giai điệu (Melodic Contour)

**Mục tiêu học tập:**

- Hiểu passing tone và neighbor tone
- Tạo giai điệu mượt mà

**Cấu trúc bài học chi tiết:**

#### Bước 1: Nốt lướt (Passing Tone)

| Nội dung giảng dạy                 | Minh họa cần thực hiện                      |
| ---------------------------------- | ------------------------------------------- |
| Nốt nằm giữa 2 nốt chính (bước đi) | C (nốt chính) - D (passing) - E (nốt chính) |
| Nối 2 nốt cách nhau quãng 3        | Animation cầu nối                           |
| Giúp giai điệu liền mạch           | So sánh C-E (rời) vs C-D-E (liền)           |

#### Bước 2: Nốt láng giềng (Neighbor Tone)

| Nội dung giảng dạy                | Minh họa cần thực hiện     |
| --------------------------------- | -------------------------- |
| Đi sang nốt bên cạnh rồi quay lại | C - D - C (Upper neighbor) |
| Trang trí cho nốt chính           | C - B - C (Lower neighbor) |
| Tạo sự chuyển động tại chỗ        | Animation xoay quanh trục  |

#### Bước 3: Nốt trễ (Suspension)

| Nội dung giảng dạy               | Minh họa cần thực hiện     |
| -------------------------------- | -------------------------- |
| Giữ lại nốt của hợp âm trước     | Sus4 (giữ nốt 4 thay vì 3) |
| Tạo cảm giác mong chờ giải quyết | Csus4 → C major            |
| Rất cảm xúc                      | Audio demo                 |

#### Bước 4: Quy tắc "bước nhỏ sau nhảy lớn"

| Nội dung giảng dạy                       | Minh họa cần thực hiện   |
| ---------------------------------------- | ------------------------ |
| Sau một bước nhảy quãng rộng (leap)      | C nhảy lên A (quãng 6)   |
| Giai điệu nên đi ngược lại từng bước nhỏ | Sau đó đi xuống G-F-E... |
| Tạo cân bằng (Balance)                   | Visual biểu đồ hình sóng |

#### Bước 5: Thực hành viết giai điệu

| Nội dung giảng dạy                                 | Minh họa cần thực hiện |
| -------------------------------------------------- | ---------------------- |
| Hợp âm nền → Viết giai điệu                        | Melody Maker Tool      |
| Sử dụng nốt trong hợp âm (Chord Tones) làm trụ cột | Highlight Chord Tones  |

**Bài tập:**

| Loại                | Mô tả                                | Độ khó |
| ------------------- | ------------------------------------ | ------ |
| `non-chord-tone-id` | Xác định nốt nào là Passing/Neighbor | ⭐⭐⭐ |
| `melody-compose`    | Kéo thả nốt để tạo giai điệu hay     | ⭐⭐⭐ |

---

### 5.4 Cấu trúc bài hát (Song Structure)

**Mục tiêu học tập:**

- Nhận biết các phần: Verse, Chorus, Bridge, Intro, Outro

**Cấu trúc bài học chi tiết:**

#### Bước 1: Intro (Mở đầu)

| Nội dung giảng dạy                | Minh họa cần thực hiện          |
| --------------------------------- | ------------------------------- |
| Thiết lập Tone, Tempo, Mood       | Audio intro các bài hit         |
| Thường là Instrumental (khí nhạc) | Waveform visualization phần đầu |
| Gây ấn tượng đầu tiên             | Visual: Cánh cửa mở ra          |

#### Bước 2: Verse (Đoạn thân/Lời)

| Nội dung giảng dạy                             | Minh họa cần thực hiện |
| ---------------------------------------------- | ---------------------- |
| Kể câu chuyện, lời nhạc thay đổi qua các verse | Text lyric chạy        |
| Năng lượng thấp hơn Chorus                     | Tension Level: 3/10    |
| Melody lặp lại cấu trúc                        | Visual: Khối A         |

#### Bước 3: Pre-Chorus (Tiền điệp khúc)

| Nội dung giảng dạy             | Minh họa cần thực hiện       |
| ------------------------------ | ---------------------------- |
| Xây dựng năng lượng (Build-up) | Tension Level: tăng từ 3 → 7 |
| Dẫn dắt vào Chorus             | Audio drum roll/riser        |
| "Sắp tới đoạn hay rồi!"        | Visual: Cầu thang đi lên     |

#### Bước 4: Chorus (Điệp khúc)

| Nội dung giảng dạy                             | Minh họa cần thực hiện    |
| ---------------------------------------------- | ------------------------- |
| Phần hay nhất, cao trào, lặp lại y hệt chô lời | Tension Level: 10/10      |
| Chứa thông điệp chính (Hook)                   | Highlight Hook            |
| Hát theo được ngay                             | Visual: Khối B (to, sáng) |

#### Bước 5: Bridge (Đoạn nối/Giang tấu)

| Nội dung giảng dạy                   | Minh họa cần thực hiện    |
| ------------------------------------ | ------------------------- |
| Thay đổi không khí, giai điệu mới lạ | Visual: Khối C (khác màu) |
| Thường ở sau Chorus 2                | Timeline structure        |
| Đưa bài hát lên cao trào cuối cùng   | Audio demo                |

#### Bước 6: Outro (Kết thúc)

| Nội dung giảng dạy                  | Minh họa cần thực hiện          |
| ----------------------------------- | ------------------------------- |
| Dần kết thúc, fade out hoặc kết hẳn | Audio fade out                  |
| Thư giãn, dư âm                     | Animation cửa đóng/ánh sáng tắt |

#### Bước 7: Phân tích toàn bài

| Nội dung giảng dạy                                | Minh họa cần thực hiện       |
| ------------------------------------------------- | ---------------------------- |
| Verse - Chorus - Verse - Chorus - Bridge - Chorus | Sơ đồ khối (Block Diagram)   |
| Nghe bài mẫu và đánh dấu các phần                 | Interactive arrangement view |

**Bài tập:**

| Loại                 | Mô tả                                     | Độ khó |
| -------------------- | ----------------------------------------- | ------ |
| `structure-analysis` | Nghe bài hát → Bấm nút khi chuyển đoạn    | ⭐⭐   |
| `structure-order`    | Sắp xếp các khối hộp thành bài hoàn chỉnh | ⭐     |

---

### 5.5 Cường độ & Kỹ thuật diễn tấu (Dynamics & Articulation)

**Mục tiêu học tập:**

- Hiểu các ký hiệu cường độ: p, mp, mf, f, ff
- Hiểu các ký hiệu diễn tấu: staccato, legato, accent

**Cấu trúc bài học chi tiết:**

#### Bước 1: Pianissimo (pp) → Fortissimo (ff)

| Nội dung giảng dạy                          | Minh họa cần thực hiện           |
| ------------------------------------------- | -------------------------------- |
| pp (rất nhỏ) - p (nhỏ) - mp (hơi nhỏ)       | Audio volume tăng dần            |
| mf (hơi to) - f (to) - ff (rất to)          | Visual: Loa rung/sóng âm lớn dần |
| Cường độ tạo cảm xúc (gào thét vs thì thầm) | Demo giọng hát/nhạc cụ           |

#### Bước 2: Crescendo & Decrescendo

| Nội dung giảng dạy          | Minh họa cần thực hiện                    |
| --------------------------- | ----------------------------------------- |
| Crescendo (<): To dần lên   | Animation dấu < mở rộng, âm thanh to dần  |
| Decrescendo (>): Nhỏ dần đi | Animation dấu > thu hẹp, âm thanh nhỏ dần |
| "Hairpin" dynamics          | Visual ký hiệu trên khuông nhạc           |

#### Bước 3: Staccato (ngắt tiếng)

| Nội dung giảng dạy           | Minh họa cần thực hiện                     |
| ---------------------------- | ------------------------------------------ |
| Dấu chấm trên đầu nốt        | Ký hiệu visual                             |
| Ngắt gọn, nảy, ngắn          | Audio: tiếng pizzicato hoặc piano staccato |
| Cảm giác: Vui nhộn, nhảy múa | Animation bóng nảy                         |

#### Bước 4: Legato (liền tiếng)

| Nội dung giảng dạy                 | Minh họa cần thực hiện                |
| ---------------------------------- | ------------------------------------- |
| Dấu vòng cung nối nhiều nốt (Slur) | Ký hiệu visual                        |
| Mượt mà, không ngắt quãng          | Audio: tiếng violin hoặc piano legato |
| Cảm giác: Dòng suối chảy, tình cảm | Animation dòng nước                   |

#### Bước 5: Accent (nhấn mạnh)

| Nội dung giảng dạy                     | Minh họa cần thực hiện |
| -------------------------------------- | ---------------------- |
| Dấu > trên đầu nốt                     | Ký hiệu visual         |
| Nhấn mạnh vào nốt đó (to hơn, gắt hơn) | Audio demo             |
| Tạo điểm nhấn cho tiết tấu             | Drum accent demo       |

**Bài tập:**

| Loại                | Mô tả                                            | Độ khó |
| ------------------- | ------------------------------------------------ | ------ |
| `dynamics-id`       | Nghe đoạn nhạc → Chọn mức cường độ (p, f, hay <) | ⭐⭐   |
| `articulation-play` | Chọn cách chơi đúng (ngắt hay liền)              | ⭐⭐   |

---

### 5.6 Chuyển giọng (Modulation)

**Mục tiêu học tập:**

- Hiểu khái niệm chuyển giọng trong bài hát
- Nhận biết các kỹ thuật chuyển giọng phổ biến

**Cấu trúc bài học chi tiết:**

#### Bước 1: Chuyển giọng trực tiếp (Direct Modulation)

| Nội dung giảng dạy                                               | Minh họa cần thực hiện                     |
| ---------------------------------------------------------------- | ------------------------------------------ |
| "Truck Driver's Gear Change"                                     | Audio: Bài pop đang hát, đột ngột lên tone |
| Không cần chuẩn bị, nhảy thẳng lên (thường là +1/2 hoặc +1 cung) | Visual: Bậc thang nhảy lên                 |
| Hiệu quả: Tăng năng lượng tức thì                                | Cảm giác "Wow"                             |

#### Bước 2: Chuyển giọng bằng hợp âm chung (Pivot Chord)

| Nội dung giảng dạy                              | Minh họa cần thực hiện                     |
| ----------------------------------------------- | ------------------------------------------ |
| Dùng một hợp âm có mặt ở cả 2 giọng làm cầu nối | Diagram: Giao thoa giữa C Major và G Major |
| Am là vi của C, nhưng là ii của G               | Pivot chord: Am                            |
| Mượt mà, khó nhận ra (tinh tế)                  | Audio demo                                 |

#### Bước 3: Chuyển lên nửa cung (nâng cảm xúc)

| Nội dung giảng dạy        | Minh họa cần thực hiện                            |
| ------------------------- | ------------------------------------------------- |
| Thường dùng ở Chorus cuối | So sánh Chorus 1 (thấp) vs Chorus cuối (cao)      |
| Tạo cao trào kết thúc     | Audio: "I Will Always Love You" (Whitney Houston) |

#### Bước 4: Chuyển sang giọng song song

| Nội dung giảng dạy                   | Minh họa cần thực hiện                |
| ------------------------------------ | ------------------------------------- |
| Từ C Major sang C Minor (Parallel)   | Thay đổi màu sắc: Vui → Buồn đột ngột |
| Hoặc C Major sang A Minor (Relative) | Thay đổi trọng tâm                    |
| Tạo sự tương phản thú vị             | Audio demo                            |

#### Bước 5: Phân tích ví dụ thực tế

| Nội dung giảng dạy                         | Minh họa cần thực hiện              |
| ------------------------------------------ | ----------------------------------- |
| Nghe và phát hiện khoảnh khắc chuyển giọng | Bấm nút "Modulation!" khi nghe thấy |
| Phân tích xem đó là kiểu chuyển gì         | Quiz trắc nghiệm                    |

**Bài tập:**

| Loại                | Mô tả                              | Độ khó |
| ------------------- | ---------------------------------- | ------ |
| `modulation-detect` | Bắt khoảnh khắc đổi tone           | ⭐⭐⭐ |
| `new-key-id`        | Đang tone C, lên 1 tone là gì? (D) | ⭐⭐   |

---

## 📋 Tổng kết cấu trúc Module

| Module       | Số bài học | Trọng tâm            | Nhạc cụ chính           |
| ------------ | ---------- | -------------------- | ----------------------- |
| 1. Nền tảng  | 5 bài      | Đọc nốt, khuông nhạc | Piano, Guitar           |
| 2. Nhịp điệu | 6 bài      | Phách, giá trị nốt   | Tất cả                  |
| 3. Âm giai   | 6 bài      | Scales, quãng        | Piano, Guitar, Sáo Trúc |
| 4. Hòa âm    | 7 bài      | Hợp âm, tiến trình   | Guitar, Piano           |
| 5. Sáng tác  | 6 bài      | Cấu trúc, sáng tạo   | Tất cả                  |

**Tổng cộng: 30 bài học**

---

## 🎯 Loại bài tập (Exercise Types)

| Mã                 | Tên                | Mô tả                           |
| ------------------ | ------------------ | ------------------------------- |
| `note-id`          | Nhận diện nốt      | Xem nốt trên khuông, chọn tên   |
| `keyboard-play`    | Chơi trên Piano    | Nghe nốt, nhấn phím đúng        |
| `staff-placement`  | Đặt nốt lên khuông | Drag & drop nốt vào vị trí đúng |
| `rhythm-tap`       | Gõ nhịp            | Tap theo pattern được cho       |
| `interval-id`      | Nhận diện quãng    | Nghe và xác định quãng          |
| `scale-play`       | Chơi âm giai       | Chơi đúng âm giai trên nhạc cụ  |
| `chord-id`         | Nhận diện hợp âm   | Nghe và xác định loại hợp âm    |
| `progression-play` | Chơi tiến trình    | Đệm theo hợp âm được cho        |
| `ear-training`     | Luyện nghe         | Các bài tập nghe tổng hợp       |

---

> 📝 **Ghi chú phát triển:** Mỗi bài học được thiết kế theo mô hình **Khái niệm → Ví dụ → Thực hành** đã được kiểm chứng từ Module 1.1. Các bài tập tương tác hỗ trợ cả 3 nhạc cụ: Piano ảo, Guitar ảo, và Sáo Trúc.
