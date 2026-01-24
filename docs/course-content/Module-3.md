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

