# 📚 Module 5: Sáng tác & Cấu trúc (Composition & Form)

> Tài liệu này mô tả chi tiết nội dung các bài học về sáng tác và cấu trúc bài hát, áp dụng mô hình **UX Journey Pattern** đã được chứng minh hiệu quả từ Module 1.

---

## 5.1 Tiến trình hợp âm phổ biến (Common Chord Progressions)

> 📋 **Chưa triển khai**: Sẽ được implement tại `src/data/course-data/module-5/5.1-chord-progressions.ts`

**UX Journey Pattern (4 bước):**

1. **Passive**: Animation "4 Chords Song" - cùng tiến trình I-V-vi-IV cho nhiều bài hit
2. **Guided**: Loop từng progression với highlighting Roman numerals
3. **Interactive**: Chord Sequencer - kéo thả hợp âm tạo progression riêng
4. **Milestone**: Đệm được bài hát yêu thích với đúng tiến trình

**Mục tiêu học tập (Learning Objectives):**

- Nhận biết các tiến trình Pop/Rock phổ biến nhất
- Hiểu tiến trình ii-V-I trong Jazz
- Phân tích tiến trình hợp âm từ bài hát thực tế

**Cấu trúc nội dung (`theoryContent`):**

#### Section 1: I-V-vi-IV (The Pop Progression)

| Nội dung giảng dạy            | Cách triển khai             |
| :---------------------------- | :-------------------------- | ----------- |
| Tiến trình phổ biến nhất!     | "4 Chords Song" medley      |
| Trong C: **C → G → Am → F**   | `{{piano:...                | ...}}` loop |
| Cảm xúc: Tích cực, phấn khích | "Axis of Awesome" reference |

#### Section 2: I-IV-V-I (Blues/Rock/Folk)

| Nội dung giảng dạy                     | Cách triển khai  |
| :------------------------------------- | :--------------- |
| "Three Chord Wonder" - 3 hợp âm cơ bản | C → F → G → C    |
| 12-bar Blues structure                 | Visual grid 12 ô |
| Âm hưởng: Mộc mạc, rock n roll         | Audio demo       |

#### Section 3: ii-V-I (Jazz Essential)

| Nội dung giảng dạy        | Cách triển khai           |
| :------------------------ | :------------------------ |
| **Dm7 → G7 → Cmaj7**      | Jazz progression demo     |
| Circle of Fifths movement | Highlight D→G→C trên vòng |
| Sức hút mạnh về chủ âm    | Voice leading animation   |

#### Section 4: vi-IV-I-V (Sad/Epic Version)

| Nội dung giảng dạy                | Cách triển khai     |
| :-------------------------------- | :------------------ |
| Bắt đầu bằng giọng thứ (vi)       | Am → F → C → G      |
| Cảm xúc: Sâu lắng, epic, tráng lệ | "Hans Zimmer style" |
| Phổ biến trong nhạc phim, ballad  | Audio demo          |

**ABC Demos (Interactive Examples):**

| ID    | Title           | Mô tả nội dung           |
| :---- | :-------------- | :----------------------- |
| 5.1.1 | I-V-vi-IV Loop  | The 4 Chords progression |
| 5.1.2 | 12-Bar Blues    | Classic blues structure  |
| 5.1.3 | ii-V-I Jazz     | Smooth Jazz resolution   |
| 5.1.4 | Axis Comparison | Pop vs Sad versions      |

**Thiết kế Game (3-Tier Progression):**

| Cấp độ | Tên Game                | Mô tả Gameplay                    |
| :----- | :---------------------- | :-------------------------------- |
| ⭐     | **Progression Pattern** | Nghe → I-V-vi-IV hay I-IV-V-I?    |
| ⭐⭐   | **Progression Ear ID**  | Nghe bài hát → đoán tiến trình    |
| ⭐⭐⭐ | **Progression Play**    | Đệm theo hợp âm của backing track |

---

## 5.2 Chỗ ngắt (Cadences)

> 📋 **Chưa triển khai**: Sẽ được implement tại `src/data/course-data/module-5/5.2-cadences.ts`

**UX Journey Pattern (4 bước):**

1. **Passive**: Animation "dấu câu âm nhạc" - cadence như dấu chấm, dấu phẩy, dấu hỏi
2. **Guided**: Nghe 4 loại cadence với visual feedback tension/release
3. **Interactive**: "Cadence Matcher" - nghe ending → chọn loại đúng
4. **Milestone**: Nhận diện đúng cadence trong bản nhạc thực tế

**Mục tiêu học tập (Learning Objectives):**

- Phân biệt 4 loại cadence: Perfect, Plagal, Half, Deceptive
- Hiểu cảm xúc của mỗi loại (kết thúc vs chờ đợi vs bất ngờ)
- Nhận biết cadence trong ngữ cảnh bản nhạc

**Cấu trúc nội dung (`theoryContent`):**

#### Section 1: Perfect Cadence (V → I) 🏠

| Nội dung giảng dạy                             | Cách triển khai    |
| :--------------------------------------------- | :----------------- |
| Authentic Cadence: **V → I** (hoặc V7 → I)     | G7 → C             |
| Cảm giác: "Về nhà", trọn vẹn, **dấu chấm hết** | Animation cửa đóng |
| Dùng ở cuối bài hoặc cuối đoạn lớn             | Audio demo         |

#### Section 2: Plagal Cadence (IV → I) 🙏

| Nội dung giảng dạy               | Cách triển khai       |
| :------------------------------- | :-------------------- |
| "Amen Cadence": **IV → I**       | F → C                 |
| Cảm giác: Bình yên, trang nghiêm | Audio thánh ca        |
| Phổ biến trong Rock/Pop ending   | "Let It Be" reference |

#### Section 3: Half Cadence (? → V) ❓

| Nội dung giảng dạy              | Cách triển khai         |
| :------------------------------ | :---------------------- |
| Kết thúc ở V (chưa giải quyết)  | ... → G (ngưng)         |
| Cảm giác: **Dấu phẩy**, chờ đợi | Animation dấu hỏi       |
| Muốn nghe tiếp câu sau          | Audio "question" phrase |

#### Section 4: Deceptive Cadence (V → vi) 😮

| Nội dung giảng dạy               | Cách triển khai          |
| :------------------------------- | :----------------------- |
| Đáng lẽ về I nhưng "lừa" sang vi | G7 → Am (thay vì C)      |
| Cảm giác: Bất ngờ, thất vọng     | Animation mặt ngạc nhiên |
| Dùng để kéo dài bài hát          | Audio demo               |

**ABC Demos (Interactive Examples):**

| ID    | Title              | Mô tả nội dung             |
| :---- | :----------------- | :------------------------- |
| 5.2.1 | Perfect Cadence    | V → I = "The End"          |
| 5.2.2 | Plagal "Amen"      | IV → I = peaceful          |
| 5.2.3 | Half Cadence       | → V = "To be continued..." |
| 5.2.4 | Deceptive Surprise | V → vi = "Plot twist!"     |

**Thiết kế Game (3-Tier Progression):**

| Cấp độ | Tên Game             | Mô tả Gameplay                               |
| :----- | :------------------- | :------------------------------------------- |
| ⭐     | **Cadence Pattern**  | Nhìn chord symbols → loại cadence nào?       |
| ⭐⭐   | **Cadence Ear ID**   | Nghe 2 hợp âm cuối → chọn loại               |
| ⭐⭐⭐ | **Cadence Complete** | Chọn hợp âm cuối để tạo đúng cadence yêu cầu |

---

## 5.3 Đường nét giai điệu (Melodic Contour)

> 📋 **Chưa triển khai**: Sẽ được implement tại `src/data/course-data/module-5/5.3-melodic-contour.ts`

**UX Journey Pattern (4 bước):**

1. **Passive**: Animation sóng giai điệu - lên xuống như đồ thị
2. **Guided**: Nhận biết Passing Tone, Neighbor Tone, Suspension
3. **Interactive**: Melody Maker - vẽ đường contour, system tạo nốt
4. **Milestone**: Viết giai điệu 8 ô nhịp theo chord progression

**Mục tiêu học tập (Learning Objectives):**

- Hiểu các loại non-chord tones: Passing, Neighbor, Suspension
- Áp dụng quy tắc "bước nhỏ sau nhảy lớn"
- Viết giai điệu mượt mà theo harmonic framework

**Cấu trúc nội dung (`theoryContent`):**

#### Section 1: Passing Tone (Nốt lướt)

| Nội dung giảng dạy          | Cách triển khai                         |
| :-------------------------- | :-------------------------------------- |
| Nốt nằm giữa 2 chord tones  | C (chord) → **D** (passing) → E (chord) |
| Nối 2 nốt cách nhau quãng 3 | Animation cầu nối                       |
| Giúp giai điệu liền mạch    | So sánh có/không có passing             |

#### Section 2: Neighbor Tone (Nốt láng giếng)

| Nội dung giảng dạy                    | Cách triển khai           |
| :------------------------------------ | :------------------------ |
| Đi sang nốt bên cạnh rồi **quay lại** | C → **D** → C (upper)     |
| Trang trí cho nốt chính               | C → **B** → C (lower)     |
| Tạo chuyển động tại chỗ               | Animation xoay quanh trục |

#### Section 3: Suspension (Nốt trễ)

| Nội dung giảng dạy           | Cách triển khai           |
| :--------------------------- | :------------------------ |
| Giữ lại nốt của hợp âm trước | Sus4: giữ nốt 4 thay vì 3 |
| Tạo cảm giác mong chờ        | Csus4 → C resolution      |
| Rất cảm xúc!                 | Audio demo ballad         |

#### Section 4: Quy tắc "Leap & Step"

| Nội dung giảng dạy                               | Cách triển khai               |
| :----------------------------------------------- | :---------------------------- |
| Sau nhảy lớn (leap) → đi ngược lại bằng bước nhỏ | C nhảy lên A → đi xuống G-F-E |
| Tạo cân bằng (Balance)                           | Visual biểu đồ sóng           |
| Quy tắc từ counterpoint cổ điển                  | Historical context            |

**ABC Demos (Interactive Examples):**

| ID    | Title                 | Mô tả nội dung        |
| :---- | :-------------------- | :-------------------- |
| 5.3.1 | Passing Tone Demo     | Fill the gap          |
| 5.3.2 | Neighbor Tone Demo    | Orbit around          |
| 5.3.3 | Suspension Resolution | Tension → Release     |
| 5.3.4 | Leap & Step Rule      | Balance demonstration |

**Thiết kế Game (3-Tier Progression):**

| Cấp độ | Tên Game              | Mô tả Gameplay                            |
| :----- | :-------------------- | :---------------------------------------- |
| ⭐     | **Non-Chord Tone ID** | Xác định nốt nào là Passing/Neighbor      |
| ⭐⭐   | **Contour Draw**      | Vẽ contour line → system generates melody |
| ⭐⭐⭐ | **Melody Compose**    | Viết giai điệu theo chord progression     |

---

## 5.4 Cấu trúc bài hát (Song Structure)

> 📋 **Chưa triển khai**: Sẽ được implement tại `src/data/course-data/module-5/5.4-song-structure.ts`

**UX Journey Pattern (4 bước):**

1. **Passive**: Animation block diagram của bài hát phổ biến
2. **Guided**: Nghe bài hát mẫu, hệ thống highlight từng phần
3. **Interactive**: Arrangement Builder - kéo thả blocks (Verse, Chorus, Bridge)
4. **Milestone**: Phân tích đúng cấu trúc bài hát bất kỳ

**Mục tiêu học tập (Learning Objectives):**

- Nhận biết các phần: Intro, Verse, Pre-Chorus, Chorus, Bridge, Outro
- Hiểu vai trò và đặc điểm của từng phần
- Phân tích cấu trúc bài hát thực tế

**Cấu trúc nội dung (`theoryContent`):**

#### Section 1: Intro & Verse

| Phần      | Vai trò                     | Đặc điểm                              |
| :-------- | :-------------------------- | :------------------------------------ |
| **Intro** | Thiết lập Tone, Tempo, Mood | Thường instrumental, gây ấn tượng đầu |
| **Verse** | Kể câu chuyện               | Lời thay đổi, melody lặp, energy thấp |

#### Section 2: Pre-Chorus & Chorus

| Phần           | Vai trò           | Đặc điểm                                 |
| :------------- | :---------------- | :--------------------------------------- |
| **Pre-Chorus** | Build-up, dẫn dắt | Tension tăng từ 3→7, "sắp bùng nổ!"      |
| **Chorus**     | Cao trào, Hook    | Energy 10/10, lời lặp lại, hát theo được |

#### Section 3: Bridge & Outro

| Phần       | Vai trò            | Đặc điểm                       |
| :--------- | :----------------- | :----------------------------- |
| **Bridge** | Thay đổi không khí | Giai điệu mới lạ, sau Chorus 2 |
| **Outro**  | Kết thúc           | Fade out hoặc kết hẳn, dư âm   |

#### Section 4: Typical Structure

| Nội dung giảng dạy                                                    | Cách triển khai              |
| :-------------------------------------------------------------------- | :--------------------------- |
| Intro → Verse 1 → Chorus → Verse 2 → Chorus → Bridge → Chorus → Outro | Block Diagram                |
| Variation: ABABCB form                                                | Interactive arrangement view |

**ABC Demos (Interactive Examples):**

| ID    | Title                 | Mô tả nội dung              |
| :---- | :-------------------- | :-------------------------- |
| 5.4.1 | Song Structure Blocks | Visual block diagram        |
| 5.4.2 | Energy Curve          | Verse (low) → Chorus (high) |
| 5.4.3 | Song Analysis         | Real song breakdown         |

**Thiết kế Game (3-Tier Progression):**

| Cấp độ | Tên Game               | Mô tả Gameplay                         |
| :----- | :--------------------- | :------------------------------------- |
| ⭐     | **Section ID**         | Nghe đoạn → Verse, Chorus, hay Bridge? |
| ⭐⭐   | **Structure Analysis** | Nghe bài → bấm nút khi chuyển đoạn     |
| ⭐⭐⭐ | **Structure Order**    | Sắp xếp blocks thành bài hoàn chỉnh    |

---

## 5.5 Cường độ & Kỹ thuật diễn tấu (Dynamics & Articulation)

> 📋 **Chưa triển khai**: Sẽ được implement tại `src/data/course-data/module-5/5.5-dynamics-articulation.ts`

**UX Journey Pattern (4 bước):**

1. **Passive**: Animation volume từ pp (rất nhỏ) đến ff (rất to)
2. **Guided**: Nghe cùng giai điệu với staccato vs legato
3. **Interactive**: Expression Slider - điều chỉnh dynamics real-time
4. **Milestone**: Chơi đoạn nhạc với dynamic markings đúng

**Mục tiêu học tập (Learning Objectives):**

- Đọc ký hiệu dynamics: pp, p, mp, mf, f, ff
- Hiểu crescendo (<) và decrescendo (>)
- Phân biệt staccato (ngắt) vs legato (liền)

**Cấu trúc nội dung (`theoryContent`):**

#### Section 1: Dynamic Levels

| Ký hiệu | Tên         | Mức độ  |
| :------ | :---------- | :------ |
| **pp**  | pianissimo  | Rất nhỏ |
| **p**   | piano       | Nhỏ     |
| **mp**  | mezzo-piano | Hơi nhỏ |
| **mf**  | mezzo-forte | Hơi to  |
| **f**   | forte       | To      |
| **ff**  | fortissimo  | Rất to  |

#### Section 2: Crescendo & Decrescendo

| Nội dung giảng dạy              | Cách triển khai                |
| :------------------------------ | :----------------------------- |
| **Crescendo (<)**: To dần lên   | Animation mở rộng, volume tăng |
| **Decrescendo (>)**: Nhỏ dần đi | Animation thu hẹp, volume giảm |
| "Hairpin" dynamics              | Ký hiệu trên khuông nhạc       |

#### Section 3: Articulation

| Ký hiệu             | Tên        | Kỹ thuật         |
| :------------------ | :--------- | :--------------- |
| **Staccato** (chấm) | Ngắt tiếng | Nảy, gọn, ngắn   |
| **Legato** (slur)   | Liền tiếng | Mượt, không ngắt |
| **Accent** (>)      | Nhấn mạnh  | To hơn, gắt hơn  |

**ABC Demos (Interactive Examples):**

| ID    | Title              | Mô tả nội dung              |
| :---- | :----------------- | :-------------------------- |
| 5.5.1 | Volume Slider      | pp → ff interactive         |
| 5.5.2 | Crescendo Wave     | < animation with audio      |
| 5.5.3 | Staccato vs Legato | Same melody, different feel |

**Thiết kế Game (3-Tier Progression):**

| Cấp độ | Tên Game            | Mô tả Gameplay                      |
| :----- | :------------------ | :---------------------------------- |
| ⭐     | **Dynamics ID**     | Nghe → chọn p, f, hay crescendo?    |
| ⭐⭐   | **Articulation ID** | Nghe → staccato hay legato?         |
| ⭐⭐⭐ | **Expression Play** | Chơi đoạn nhạc với dynamic markings |

---

## 5.6 Chuyển giọng (Modulation)

> 📋 **Chưa triển khai**: Sẽ được implement tại `src/data/course-data/module-5/5.6-modulation.ts`

**UX Journey Pattern (4 bước):**

1. **Passive**: Animation "Truck Driver's Gear Change" - bài hát đột ngột lên tone
2. **Guided**: So sánh Direct vs Pivot Chord modulation
3. **Interactive**: "Modulation Detector" - nghe bài → bấm khi đổi key
4. **Milestone**: Transpose bài hát từ C → D với pivot chord

**Mục tiêu học tập (Learning Objectives):**

- Nhận biết khoảnh khắc chuyển giọng trong bài hát
- Phân biệt Direct Modulation vs Pivot Chord Modulation
- Hiểu tại sao chuyển giọng tạo hiệu ứng mạnh

**Cấu trúc nội dung (`theoryContent`):**

#### Section 1: Direct Modulation 🚛

| Nội dung giảng dạy                             | Cách triển khai                  |
| :--------------------------------------------- | :------------------------------- |
| "Truck Driver's Gear Change"                   | Audio: bài pop lên tone đột ngột |
| Không chuẩn bị, nhảy thẳng (+1/2 hoặc +1 cung) | Visual bậc thang nhảy            |
| Hiệu quả: Tăng năng lượng tức thì              | Chorus cuối lên tone             |

#### Section 2: Pivot Chord Modulation

| Nội dung giảng dạy                              | Cách triển khai                |
| :---------------------------------------------- | :----------------------------- |
| Dùng hợp âm có mặt ở **cả 2 giọng** làm cầu nối | Venn diagram C Major ∩ G Major |
| Am = vi của C, nhưng = ii của G                 | Pivot chord demo               |
| Mượt mà, tinh tế, khó nhận ra                   | Audio comparison               |

#### Section 3: Common Modulation Types

| Loại          | Khoảng cách   | Ví dụ     | Effect        |
| :------------ | :------------ | :-------- | :------------ |
| Up Half Step  | +1 semitone   | C → C#/Db | Dramatic lift |
| Up Whole Step | +2 semitones  | C → D     | Bright energy |
| To Relative   | Major ↔ minor | C → Am    | Mood change   |
| To Parallel   | Major → minor | C → Cm    | Color shift   |

#### Section 4: Real Song Analysis

| Nội dung giảng dạy                    | Cách triển khai            |
| :------------------------------------ | :------------------------- |
| "I Will Always Love You" final chorus | Whitney Houston modulation |
| "Love Story" Taylor Swift             | Key changes                |
| Bấm nút khi nghe modulation           | Interactive detector       |

**ABC Demos (Interactive Examples):**

| ID    | Title              | Mô tả nội dung            |
| :---- | :----------------- | :------------------------ |
| 5.6.1 | Gear Change Demo   | Direct +1 step modulation |
| 5.6.2 | Pivot Chord        | Smooth transition         |
| 5.6.3 | Relative Key Shift | Major ↔ minor             |
| 5.6.4 | Famous Modulations | Real song examples        |

**Thiết kế Game (3-Tier Progression):**

| Cấp độ | Tên Game              | Mô tả Gameplay                        |
| :----- | :-------------------- | :------------------------------------ |
| ⭐     | **New Key ID**        | Đang C, lên 1 cung là gì? (D)         |
| ⭐⭐   | **Modulation Detect** | Nghe bài → bấm khi đổi key            |
| ⭐⭐⭐ | **Modulation Type**   | Xác định Direct, Pivot, hay Relative? |

---
