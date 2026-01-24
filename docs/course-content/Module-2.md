# 📚 Module 2: Nhịp điệu & Phách (Rhythm & Meter)

> Tài liệu này mô tả chi tiết nội dung các bài học về nhịp điệu và phách, áp dụng mô hình **UX Journey Pattern** đã được chứng minh hiệu quả từ Module 1.

---

## 2.1 Giá trị nốt nhạc (Note Values)

> 📋 **Chưa triển khai**: Sẽ được implement tại `src/data/course-data/module-2/2.1-note-values.ts`

**UX Journey Pattern (4 bước):**

1. **Passive**: Animation "Note Value Tree" - cây chia nhánh từ nốt tròn xuống các nốt nhỏ hơn
2. **Guided**: Metronome tương tác - click theo nhịp với từng loại nốt
3. **Interactive**: "Fill the Bar" - kéo thả nốt để điền đầy ô nhịp 4/4
4. **Milestone**: Chơi đúng pattern rhythm 8 ô nhịp liên tiếp

**Mục tiêu học tập (Learning Objectives):**

- Nhận biết 5 loại hình nốt: Tròn, Trắng, Đen, Móc đơn, Móc kép
- Hiểu tỷ lệ độ dài giữa các nốt (1:2:4:8:16)
- Đọc và gõ được pattern rhythm cơ bản

**Cấu trúc nội dung (`theoryContent`):**

#### Section 1: Nốt tròn & Nốt trắng

| Nội dung giảng dạy                                           | Cách triển khai                         |
| :----------------------------------------------------------- | :-------------------------------------- |
| **Nốt tròn** (Whole Note) = 4 phách, chiếm trọn 1 ô nhịp 4/4 | `{{abc:C4}}` với countdown timer 4 giây |
| **Nốt trắng** (Half Note) = 2 phách, 2 nốt trắng = 1 ô nhịp  | `{{abc:C2 D2}}` với metronome sync      |
| Hình dạng: đầu nốt trống, có/không có thân                   | Diagram so sánh 2 loại nốt              |

#### Section 2: Nốt đen - "Nhịp tim" của âm nhạc

| Nội dung giảng dạy                                       | Cách triển khai                            |
| :------------------------------------------------------- | :----------------------------------------- |
| **Nốt đen** (Quarter Note) = 1 phách = đơn vị đếm cơ bản | `{{abc:C D E F}}` với counting 1-2-3-4     |
| "Nhịp tim" của âm nhạc - mỗi click metronome = 1 nốt đen | `{{metronome:60}}` với animation heartbeat |
| 4 nốt đen = 1 nốt tròn                                   | Diagram "cây giá trị nốt"                  |

#### Section 3: Nốt móc đơn & Móc kép

| Nội dung giảng dạy                                     | Cách triển khai                              |
| :----------------------------------------------------- | :------------------------------------------- |
| **Móc đơn** (Eighth Note) = 1/2 phách, đếm "1-và-2-và" | `{{abc:C/D/E/F/ G/A/B/c/}}` 8 nốt = 1 ô nhịp |
| **Móc kép** (Sixteenth Note) = 1/4 phách               | `{{abc:C//D//E//F// G//A//B//c//}}` 16 nốt   |
| Beam (vạch nối): nhóm các nốt móc thành cụm dễ đọc     | So sánh nốt rời vs nốt có beam               |

#### Section 4: Sơ đồ "Cây giá trị nốt"

| Nội dung giảng dạy                                | Cách triển khai                        |
| :------------------------------------------------ | :------------------------------------- |
| 1 Tròn = 2 Trắng = 4 Đen = 8 Móc đơn = 16 Móc kép | Interactive tree diagram               |
| Click vào nốt để nghe độ dài tương ứng            | Audio playback với visual duration bar |

**ABC Demos (Interactive Examples):**

| ID    | Title                | Mô tả nội dung                                         |
| :---- | :------------------- | :----------------------------------------------------- |
| 2.1.1 | Cây giá trị nốt      | Animation chia nhánh từ nốt tròn xuống các nốt nhỏ hơn |
| 2.1.2 | 4 nốt đen = 1 ô nhịp | Pattern cơ bản nhất: C-D-E-F trong 4/4                 |
| 2.1.3 | Mix Quarter & Eighth | Kết hợp nốt đen và móc đơn trong cùng ô nhịp           |
| 2.1.4 | 16th Note Rush       | Demo nốt móc kép tốc độ cao                            |

**Thiết kế Game (3-Tier Progression):**

| Cấp độ | Tên Game          | Mô tả Gameplay                                                    |
| :----- | :---------------- | :---------------------------------------------------------------- |
| ⭐     | **Note Value ID** | Xem hình nốt → Chọn đúng tên và giá trị (Whole, Half, Quarter...) |
| ⭐⭐   | **Rhythm Tap**    | Nghe pattern → Gõ lại đúng nhịp trên drum pad ảo                  |
| ⭐⭐⭐ | **Beat Counter**  | Cho ô nhịp phức tạp → Đếm tổng số phách và điền đáp án            |

---

## 2.2 Dấu lặng (Rests)

> 📋 **Chưa triển khai**: Sẽ được implement tại `src/data/course-data/module-2/2.2-rests.ts`

**UX Journey Pattern (4 bước):**

1. **Passive**: Animation so sánh bản nhạc có và không có dấu lặng - "Âm nhạc cần thở"
2. **Guided**: Metronome đếm với các khoảng im lặng được highlight
3. **Interactive**: Drag-drop dấu lặng vào đúng vị trí trong ô nhịp
4. **Milestone**: Gõ rhythm pattern phức tạp có cả nốt và dấu lặng

**Mục tiêu học tập (Learning Objectives):**

- Nhận biết 5 loại dấu lặng tương ứng với 5 loại nốt
- Hiểu vai trò của sự im lặng trong âm nhạc (tạo "hơi thở", syncopation)
- Đếm nhịp chính xác khi có dấu lặng

**Cấu trúc nội dung (`theoryContent`):**

#### Section 1: Dấu lặng tròn & trắng

| Nội dung giảng dạy                                          | Cách triển khai                      |
| :---------------------------------------------------------- | :----------------------------------- |
| **Lặng tròn**: "Hình hộp treo dưới dòng 4" = nghỉ cả ô nhịp | `{{abc:z4}}` với visual highlight    |
| **Lặng trắng**: "Hình hộp nằm trên dòng 3" = 2 phách        | `{{abc:z2 C2}}` kết hợp nghỉ và chơi |
| Mẹo nhớ: "Rest rests on the fourth" vs "Hat sits on top"    | Visual mnemonic                      |

#### Section 2: Dấu lặng đen & móc

| Nội dung giảng dạy                                          | Cách triển khai                                 |
| :---------------------------------------------------------- | :---------------------------------------------- |
| **Lặng đen**: Hình "chữ Z nghiêng" hoặc "sấm sét" = 1 phách | `{{abc:C z D z}}` pattern "chơi-nghỉ-chơi-nghỉ" |
| **Lặng móc đơn/kép**: Hình "7" với 1-2 flags                | `{{abc:C/ z/ D/ z/}}` 8th rests pattern         |

#### Section 3: Kết hợp nốt và dấu lặng

| Nội dung giảng dạy                                              | Cách triển khai                          |
| :-------------------------------------------------------------- | :--------------------------------------- |
| Tổng giá trị trong ô nhịp = nốt + lặng phải bằng time signature | `{{abc:C2 z2}}` (half + half rest = 4/4) |
| Syncopation với rests: Tạo groove Jazz/Funk                     | Demo audio đoạn nhạc syncopated          |

**ABC Demos (Interactive Examples):**

| ID    | Title                        | Mô tả nội dung                                    |
| :---- | :--------------------------- | :------------------------------------------------ |
| 2.2.1 | Bảng so sánh 5 loại dấu lặng | Visual reference với âm thanh "im lặng" tương ứng |
| 2.2.2 | "Hơi thở" trong giai điệu    | So sánh 2 versions: với và không có rests         |
| 2.2.3 | Syncopation cơ bản           | Jazz pattern với off-beat rests                   |

**Thiết kế Game (3-Tier Progression):**

| Cấp độ | Tên Game             | Mô tả Gameplay                               |
| :----- | :------------------- | :------------------------------------------- |
| ⭐     | **Rest ID**          | Xem hình dấu lặng → Chọn tên và giá trị      |
| ⭐⭐   | **Rhythm+Rests**     | Gõ nhịp với cả nốt và dấu lặng               |
| ⭐⭐⭐ | **Measure Complete** | Điền nốt hoặc rest để hoàn thành ô nhịp đúng |

---

## 2.3 Nốt chấm & Dây liên (Dotted Notes & Ties)

> 📋 **Chưa triển khai**: Sẽ được implement tại `src/data/course-data/module-2/2.3-dotted-ties.ts`

**UX Journey Pattern (4 bước):**

1. **Passive**: Animation công thức "Nốt + 50% = Nốt chấm"
2. **Guided**: Calculator tương tác - nhập loại nốt → hiện kết quả chấm
3. **Interactive**: Phân biệt Tie vs Slur qua audio và visual comparison
4. **Milestone**: Chơi bản nhạc có cả nốt chấm và ties

**Mục tiêu học tập (Learning Objectives):**

- Tính giá trị nốt chấm (chấm đơn và chấm đôi)
- Hiểu Tie nối 2 nốt cùng pitch thành 1 âm dài
- Phân biệt Tie (cùng pitch) vs Slur (khác pitch, legato)

**Cấu trúc nội dung (`theoryContent`):**

#### Section 1: Nốt chấm đơn

| Nội dung giảng dạy                     | Cách triển khai                        |
| :------------------------------------- | :------------------------------------- |
| Dấu chấm = +50% giá trị gốc            | Formula animation: `Nốt + 50% = Tổng`  |
| Nốt đen chấm = 1 + 0.5 = **1.5 phách** | `{{abc:C3/2 D/}}` dotted quarter + 8th |
| Nốt trắng chấm = 2 + 1 = **3 phách**   | `{{abc:C3 D}}` dotted half + quarter   |

#### Section 2: Dây liên (Tie)

| Nội dung giảng dạy                             | Cách triển khai                                |
| :--------------------------------------------- | :--------------------------------------------- | --------------------------- |
| Tie = nối 2 nốt **CÙNG cao độ** thành 1 âm dài | `{{abc:C2-C2}}` tied = 4 beats, chỉ đánh 1 lần |
| Tie xuyên qua vạch ô nhịp                      | Demo tie kéo dài từ ô này sang ô khác          |
| Piano demo: nhấn 1 lần, giữ tiếng              | `{{piano:...                                   | C4}}` với sustain animation |

#### Section 3: Tie vs Slur

| Nội dung giảng dạy                                 | Cách triển khai                          |
| :------------------------------------------------- | :--------------------------------------- |
| **Tie**: Cùng pitch → 1 âm thanh dài               | Visual: đường cong nối 2 nốt CÙNG height |
| **Slur**: Khác pitch → nhiều âm liền mạch (legato) | Visual: đường cong nối nốt KHÁC height   |

**ABC Demos (Interactive Examples):**

| ID    | Title                  | Mô tả nội dung                            |
| :---- | :--------------------- | :---------------------------------------- |
| 2.3.1 | Dotted Note Calculator | Interactive: chọn nốt → hiện giá trị chấm |
| 2.3.2 | Tie Across Barlines    | Demo tie xuyên ô nhịp                     |
| 2.3.3 | Tie vs Slur            | Side-by-side comparison với audio         |

**Thiết kế Game (3-Tier Progression):**

| Cấp độ | Tên Game              | Mô tả Gameplay                           |
| :----- | :-------------------- | :--------------------------------------- |
| ⭐     | **Dotted Value Calc** | Tính giá trị nốt chấm (dotted half = ?)  |
| ⭐⭐   | **Dotted Rhythm Tap** | Gõ pattern có nốt chấm                   |
| ⭐⭐⭐ | **Tie or Slur?**      | Nhìn khuông nhạc → phân biệt tie và slur |

---

## 2.4 Nhịp đơn (Simple Time Signatures)

> 📋 **Chưa triển khai**: Sẽ được implement tại `src/data/course-data/module-2/2.4-simple-time.ts`

**UX Journey Pattern (4 bước):**

1. **Passive**: Animation giải thích ý nghĩa số trên/số dưới của time signature
2. **Guided**: Nghe 3 bài hát quen thuộc → đoán nhịp 4/4, 3/4, hay 2/4
3. **Interactive**: Metronome chuyển đổi giữa các loại nhịp
4. **Milestone**: Phân biệt và gõ đúng strong/weak beats cho cả 3 loại nhịp

**Mục tiêu học tập (Learning Objectives):**

- Hiểu ý nghĩa số trên (số phách) và số dưới (loại nốt = 1 phách)
- Phân biệt nhịp 4/4 (Common), 3/4 (Waltz), 2/4 (March)
- Nhận biết phách mạnh (strong) và phách nhẹ (weak)

**Cấu trúc nội dung (`theoryContent`):**

#### Section 1: Giải mã Time Signature

| Nội dung giảng dạy                                             | Cách triển khai               |
| :------------------------------------------------------------- | :---------------------------- |
| Số trên = số phách trong mỗi ô nhịp                            | Animation highlight với label |
| Số dưới = loại nốt tính là 1 phách (4=đen, 8=móc đơn, 2=trắng) | Bảng chuyển đổi số → loại nốt |

#### Section 2: Ba nhịp phổ biến

| Nội dung giảng dạy                             | Cách triển khai                                 |
| :--------------------------------------------- | :---------------------------------------------- |
| **4/4** (Common Time): Pop/Rock, ký hiệu chữ C | `{{abc:M:4/4\n C D E F}}` + `{{metronome:100}}` |
| **3/4** (Waltz): "dập dình 1-2-3"              | `{{abc:M:3/4\n C D E}}` + audio Blue Danube     |
| **2/4** (March): "trái-phải, trái-phải"        | `{{abc:M:2/4\n C D}}` + animation soldiers      |

#### Section 3: Strong & Weak Beats

| Nội dung giảng dạy              | Cách triển khai                     |
| :------------------------------ | :---------------------------------- |
| Phách 1 luôn MẠNH nhất          | Visual: dot size lớn hơn            |
| 4/4: mạnh-nhẹ-vừa-nhẹ (1-2-3-4) | Animation 4 dots với size khác nhau |
| 3/4: mạnh-nhẹ-nhẹ (1-2-3)       | Animation 3 dots                    |
| 2/4: mạnh-nhẹ (1-2)             | Animation 2 dots                    |

**ABC Demos (Interactive Examples):**

| ID    | Title                    | Mô tả nội dung                         |
| :---- | :----------------------- | :------------------------------------- |
| 2.4.1 | Time Signature Explainer | Giải thích số trên/dưới với animation  |
| 2.4.2 | 4/4 vs 3/4 vs 2/4        | So sánh 3 loại nhịp với cùng giai điệu |
| 2.4.3 | Strong/Weak Beat Demo    | Visual với dot size khác nhau          |

**Thiết kế Game (3-Tier Progression):**

| Cấp độ | Tên Game          | Mô tả Gameplay                                  |
| :----- | :---------------- | :---------------------------------------------- |
| ⭐     | **Beat Strength** | Xác định phách mạnh/nhẹ trong ô nhịp            |
| ⭐⭐   | **Time Sig ID**   | Nghe đoạn nhạc → Xác định nhịp (4/4, 3/4, 2/4?) |
| ⭐⭐⭐ | **Time Sig Tap**  | Gõ đúng pattern cho nhịp được yêu cầu           |

---

## 2.5 Nhịp ghép (Compound Meter)

> 📋 **Chưa triển khai**: Sẽ được implement tại `src/data/course-data/module-2/2.5-compound-meter.ts`

**UX Journey Pattern (4 bước):**

1. **Passive**: Animation so sánh 3/4 vs 6/8 - cùng số nốt, khác cách nhóm
2. **Guided**: Đếm "1-2-3, 1-2-3" cho 6/8, so với "1-2-3" cho 3/4
3. **Interactive**: Chuyển đổi giữa straight 8ths và swung 8ths
4. **Milestone**: Chơi được jig (6/8) và blues shuffle (12/8)

**Mục tiêu học tập (Learning Objectives):**

- Hiểu nhịp 6/8 và cảm giác "triplet feel"
- Phân biệt nhịp đơn (Simple: chia 2) và nhịp ghép (Compound: chia 3)
- Nhận biết swing feel trong Jazz/Blues

**Cấu trúc nội dung (`theoryContent`):**

#### Section 1: Nhịp 6/8 cơ bản

| Nội dung giảng dạy                                     | Cách triển khai                     |
| :----------------------------------------------------- | :---------------------------------- |
| 6 móc đơn mỗi ô, NHƯNG nhóm thành **2 nhịp chính x 3** | `{{abc:M:6/8\n C/ D/ E/ F/ G/ A/}}` |
| Cảm giác "1-2-3, 1-2-3" (2 accent chính)               | Metronome với 2 strong beats        |
| Ứng dụng: jig, tarantella, barcarolle                  | Audio demo các thể loại 6/8         |

#### Section 2: 3/4 vs 6/8 - Khác biệt then chốt

| Nội dung giảng dạy                             | Cách triển khai             |
| :--------------------------------------------- | :-------------------------- |
| **3/4**: 3 phách đen, chia đôi thành 6 móc đơn | "1-2-3" grouping            |
| **6/8**: 2 phách chính, mỗi phách chia 3       | "1-and-a, 2-and-a" grouping |
| Cùng số nốt, KHÁC cách nhóm → khác feel        | Side-by-side comparison     |

#### Section 3: 9/8, 12/8 và Triplet Feel

| Nội dung giảng dạy                                | Cách triển khai               |
| :------------------------------------------------ | :---------------------------- |
| **9/8** = 3 nhóm x 3 móc đơn                      | Demo audio                    |
| **12/8** = 4 nhóm x 3 (blues shuffle!)            | Audio demo blues/rock         |
| Quy luật: chia cho 3 = số nhịp chính              | Formula: 6÷3=2, 9÷3=3, 12÷3=4 |
| Swing = "straight 8ths" biến thành "triplet feel" | Audio: straight vs swung      |

**ABC Demos (Interactive Examples):**

| ID    | Title              | Mô tả nội dung                 |
| :---- | :----------------- | :----------------------------- |
| 2.5.1 | 3/4 vs 6/8         | Same notes, different grouping |
| 2.5.2 | 12/8 Blues Shuffle | Classic blues feel             |
| 2.5.3 | Straight vs Swing  | Toggle giữa 2 styles           |

**Thiết kế Game (3-Tier Progression):**

| Cấp độ | Tên Game                | Mô tả Gameplay                          |
| :----- | :---------------------- | :-------------------------------------- |
| ⭐     | **Simple vs Compound**  | Nghe → phân biệt nhịp đơn hay nhịp ghép |
| ⭐⭐   | **Triplet Feel**        | Gõ triplet patterns chính xác           |
| ⭐⭐⭐ | **Compound Rhythm Tap** | Gõ pattern 6/8 hoặc 12/8 phức tạp       |

---

## 2.6 Nhịp độ & BPM (Tempo & BPM)

> 📋 **Chưa triển khai**: Sẽ được implement tại `src/data/course-data/module-2/2.6-tempo-bpm.ts`

**UX Journey Pattern (4 bước):**

1. **Passive**: Animation so sánh BPM với nhịp tim người (60-100 BPM)
2. **Guided**: Slider điều chỉnh BPM từ 40 (Largo) đến 200 (Presto)
3. **Interactive**: Nghe bài hát → điều chỉnh metronome khớp tempo
4. **Milestone**: Nghe và đoán đúng thuật ngữ tempo tiếng Ý

**Mục tiêu học tập (Learning Objectives):**

- Hiểu BPM = Beats Per Minute
- Nhận biết các thuật ngữ tempo tiếng Ý: Largo, Andante, Allegro, Presto
- Cảm nhận được "tốc độ" phù hợp cho từng thể loại nhạc

**Cấu trúc nội dung (`theoryContent`):**

#### Section 1: Khái niệm BPM

| Nội dung giảng dạy               | Cách triển khai                  |
| :------------------------------- | :------------------------------- |
| BPM = số phách trong 1 phút      | `{{metronome:60}}` = 1 beat/giây |
| BPM cao = nhanh, BPM thấp = chậm | Slider điều chỉnh BPM 40-200     |
| Nhịp tim người ≈ 60-100 BPM      | So sánh với heartbeat animation  |

#### Section 2: Thuật ngữ Tempo tiếng Ý

| Thuật ngữ    | BPM Range | Tính cách                    | Minh họa                |
| :----------- | :-------- | :--------------------------- | :---------------------- |
| **Largo**    | 40-60     | Rộng, chậm rãi, trang nghiêm | Audio: Handel's Largo   |
| **Adagio**   | 60-76     | Thư thả, dịu dàng            | Metronome 70 BPM        |
| **Andante**  | 76-108    | Đi bộ, vừa phải              | Walking animation       |
| **Moderato** | 108-120   | Trung bình                   | Metronome 115 BPM       |
| **Allegro**  | 120-168   | Nhanh, vui vẻ                | Pop music ≈120-130 BPM  |
| **Vivace**   | 168-176   | Sống động                    | Metronome 170 BPM       |
| **Presto**   | 176-200+  | Rất nhanh                    | Flight of the Bumblebee |

> 💡 **Mẹo nhớ**: "**L**arge **A**nt, **A**nd **M**ice, **A**ll **V**ery **P**owerful" (Largo-Adagio-Andante-Moderato-Allegro-Vivace-Presto)

**ABC Demos (Interactive Examples):**

| ID    | Title           | Mô tả nội dung                            |
| :---- | :-------------- | :---------------------------------------- |
| 2.6.1 | BPM Slider      | Interactive metronome với visual feedback |
| 2.6.2 | Tempo Terms     | Flashcard thuật ngữ tiếng Ý               |
| 2.6.3 | Match the Tempo | Nghe nhạc → điều chỉnh metronome khớp     |

**Thiết kế Game (3-Tier Progression):**

| Cấp độ | Tên Game        | Mô tả Gameplay                                  |
| :----- | :-------------- | :---------------------------------------------- |
| ⭐     | **Tempo Term**  | Cho BPM 140 → chọn thuật ngữ đúng (Allegro)     |
| ⭐⭐   | **Tempo ID**    | Nghe metronome → đoán BPM range                 |
| ⭐⭐⭐ | **Tempo Match** | Điều chỉnh metronome khớp với bài hát đang phát |

---
