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

