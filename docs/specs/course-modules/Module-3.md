# 📚 Module 3: Âm giai & Giai điệu (Scales & Melody)

> Tài liệu này mô tả chi tiết nội dung các bài học về âm giai và giai điệu, áp dụng mô hình **UX Journey Pattern** đã được chứng minh hiệu quả từ Module 1.

---

## 3.1 Âm giai trưởng (The Major Scale)

> 📋 **Chưa triển khai**: Sẽ được implement tại `src/data/course-data/module-3/3.1-major-scale.ts`

**UX Journey Pattern (4 bước):**

1. **Passive**: Animation "thang âm" đi lên với pattern W-W-H-W-W-W-H được highlight
2. **Guided**: Scale Builder tương tác - click từng nốt theo công thức
3. **Interactive**: Xây dựng âm giai từ bất kỳ nốt nào trên Piano/Guitar
4. **Milestone**: Chơi đúng C Major, G Major, F Major liên tiếp

**Mục tiêu học tập (Learning Objectives):**

- Hiểu công thức Cung-Cung-Nửa-Cung-Cung-Cung-Nửa (W-W-H-W-W-W-H)
- Xây dựng âm giai trưởng từ bất kỳ nốt nào
- Nhận biết hóa biểu (key signature) tương ứng

**Cấu trúc nội dung (`theoryContent`):**

#### Section 1: Công thức "vàng" W-W-H-W-W-W-H

| Nội dung giảng dạy                                  | Cách triển khai                              |
| :-------------------------------------------------- | :------------------------------------------- | ---------------------------------- |
| Âm giai trưởng = "vui tươi, hoàn chỉnh"             | Audio demo C Major scale up & down           |
| Công thức: Cung-Cung-**Nửa**-Cung-Cung-Cung-**Nửa** | Animation các bậc thang với độ cao khác nhau |
| W = Whole step (1 cung), H = Half step (nửa cung)   | `{{piano:...                                 | ..}}` visual pattern trên bàn phím |

#### Section 2: C Major - Thang âm "trắng tinh"

| Nội dung giảng dạy                 | Cách triển khai (Multi-instrument)          |
| :--------------------------------- | :------------------------------------------ | -------------------------- |
| C-D-E-F-G-A-B-C: Tất cả phím trắng | `{{piano:C Major Scale                      | C4,D4,E4,F4,G4,A4,B4,C5}}` |
| E-F và B-C là nửa cung tự nhiên    | Highlight 2 vị trí "không có phím đen giữa" |
| `{{guitar:C Major trên Guitar      | C3,D3,E3,F3,G3,A3,B3,C4}}`                  | Guitar visualization       |
| `{{flute:C Major trên Sáo          | C4,D4,E4,F4,G4,A4,B4,C5}}`                  | Flute fingering            |

#### Section 3: G Major & F Major

| Nội dung giảng dạy                         | Cách triển khai                  |
| :----------------------------------------- | :------------------------------- |
| **G Major**: Cần F# để giữ đúng công thức  | `{{abc:K:G\n G A B c d e ^f g}}` |
| G Major có 1 dấu thăng (F#) trong hóa biểu | Key Signature demo               |
| **F Major**: Cần Bb để giữ đúng công thức  | `{{abc:K:F\n F G A _B c d e f}}` |
| F Major có 1 dấu giáng (Bb) trong hóa biểu | Key Signature demo               |

**ABC Demos (Interactive Examples):**

| ID    | Title          | Mô tả nội dung                                    |
| :---- | :------------- | :------------------------------------------------ |
| 3.1.1 | C Major Scale  | All white keys, highlight E-F và B-C là nửa cung  |
| 3.1.2 | G Major với F# | Demo why F must become F#                         |
| 3.1.3 | F Major với Bb | Demo why B must become Bb                         |
| 3.1.4 | Scale Builder  | Interactive: chọn root note → auto-generate scale |

**Game Journey (Interleaved Progressive Pattern):**

Thiết kế game theo pattern "Master-Before-Advance":

```
LEVEL 1 (C Major Scale)
  ├─ 🎵 Scale Note ID       → 10 XP  (Nhận diện nốt trong C Major)
  ├─ 🎹 Scale Play          → 15 XP  (Chơi C Major trên Piano)
  └─ 🛠️ Scale Builder       → 20 XP  (Xây scale theo W-W-H-W-W-W-H)

LEVEL 2 (+ G Major & F Major)
  ├─ 🎵 Scale Note ID       → 15 XP  (G Major có F#, F Major có B♭)
  ├─ 🎹 Scale Play          → 20 XP  (Chơi G, F Major)
  └─ 🛠️ Scale Builder       → 25 XP  (Điền nốt thiếu + dấu hóa)

LEVEL 3 (Any Key - D, A, E, B♭)
  ├─ 🎵 Scale Note ID       → 20 XP  (Nhận diện bất kỳ giọng)
  ├─ 🎹 Scale Play          → 30 XP  (Chơi scale bất kỳ)
  └─ 🛠️ Scale Builder       → 40 XP  (Hoàn thành âm giai khuyết) ⭐

Tổng: 9 games | 195 XP
```

**Game Types:**

| Type            | Mô tả                                             | Skill Level   |
| --------------- | ------------------------------------------------- | ------------- |
| `scale-note-id` | Giọng D Major có mấy dấu thăng? Là những dấu nào? | Recognition   |
| `scale-play`    | Chơi đúng các nốt của âm giai trên Piano ảo       | Active Recall |
| `scale-builder` | Kéo thả nốt để hoàn thành âm giai khuyết          | Application   |

---

## 3.2 Hóa biểu (Key Signatures)

> 📋 **Chưa triển khai**: Sẽ được implement tại `src/data/course-data/module-3/3.2-key-signatures.ts`

**UX Journey Pattern (4 bước):**

1. **Passive**: Animation dấu thăng/giáng lần lượt xuất hiện theo thứ tự FCGDAEB / BEADGCF
2. **Guided**: "Last Sharp + 1/2" và "Second-to-last Flat" rules với ví dụ
3. **Interactive**: Circle of Fifths tương tác - click vào giọng để xem hóa biểu
4. **Milestone**: Xác định đúng giọng từ hóa biểu bất kỳ trong 10 giây

**Mục tiêu học tập (Learning Objectives):**

- Nhớ thứ tự dấu thăng: F-C-G-D-A-E-B
- Nhớ thứ tự dấu giáng: B-E-A-D-G-C-F (ngược lại)
- Xác định giọng từ hóa biểu và ngược lại

**Cấu trúc nội dung (`theoryContent`):**

#### Section 1: Thứ tự dấu thăng (Order of Sharps)

| Nội dung giảng dạy                                                              | Cách triển khai                   |
| :------------------------------------------------------------------------------ | :-------------------------------- |
| Luôn xuất hiện theo thứ tự: **F-C-G-D-A-E-B**                                   | Animation dấu thăng lần lượt hiện |
| Câu nhớ: "**F**ather **C**harles **G**oes **D**own **A**nd **E**nds **B**attle" | Visual mnemonic                   |
| `{{abc:K:C#}}` hiển thị 7 dấu thăng                                             | Full sharp key signature          |

#### Section 2: Thứ tự dấu giáng (Order of Flats)

| Nội dung giảng dạy                                                               | Cách triển khai                   |
| :------------------------------------------------------------------------------- | :-------------------------------- |
| Ngược lại với dấu thăng: **B-E-A-D-G-C-F**                                       | Animation dấu giáng lần lượt hiện |
| Câu nhớ: "**B**attle **E**nds **A**nd **D**own **G**oes **C**harles' **F**ather" | Visual mnemonic                   |
| `{{abc:K:Cb}}` hiển thị 7 dấu giáng                                              | Full flat key signature           |

#### Section 3: Quy tắc xác định giọng

| Loại           | Quy tắc                                  | Ví dụ                                  |
| :------------- | :--------------------------------------- | :------------------------------------- |
| **Sharp keys** | Dấu thăng cuối + nửa cung = Giọng trưởng | 3# (F,C,G) → G# + ½ = **A Major**      |
| **Flat keys**  | Dấu giáng kế cuối = Tên giọng            | 3♭ (B,E,A) → Kế cuối E♭ = **E♭ Major** |
| **Ngoại lệ**   | F Major (1♭) và C Major (0)              | Phải nhớ riêng!                        |

#### Section 4: Circle of Fifths Preview

| Nội dung giảng dạy                                              | Cách triển khai          |
| :-------------------------------------------------------------- | :----------------------- |
| Vòng tròn bậc 5: C ở 12 giờ, đi theo chiều kim đồng hồ = thêm # | Circle of Fifths diagram |
| Click vào bất kỳ giọng → hiện hóa biểu tương ứng                | Interactive Circle       |

**ABC Demos (Interactive Examples):**

| ID    | Title                     | Mô tả nội dung                  |
| :---- | :------------------------ | :------------------------------ |
| 3.2.1 | Order of Sharps Animation | F-C-G-D-A-E-B lần lượt hiện     |
| 3.2.2 | Order of Flats Animation  | B-E-A-D-G-C-F lần lượt hiện     |
| 3.2.3 | Key ID Practice           | Flashcard random key signatures |
| 3.2.4 | Circle of Fifths          | Interactive circle              |

**Game Journey (Interleaved Progressive Pattern):**

Thiết kế game theo pattern "Master-Before-Advance":

```
LEVEL 1 (1-2 dấu: G, D, F, B♭)
  ├─ 🎵 Order Quiz          → 10 XP  (Điền thứ tự dấu thăng/giáng)
  ├─ 👁️ Key Sig ID          → 15 XP  (Nhìn hóa biểu 1-2 dấu)
  └─ ✏️ Key Sig Write       → 20 XP  (Viết hóa biểu cho G, F)

LEVEL 2 (3-4 dấu: A, E, E♭, A♭)
  ├─ 🎵 Order Quiz          → 15 XP  (Thứ tự dài hơn)
  ├─ 👁️ Key Sig ID          → 20 XP  (Nhìn 3-4 dấu hóa)
  └─ ✏️ Key Sig Write       → 25 XP  (Kéo thả dấu hóa vào khuông)

LEVEL 3 (Full: Tất cả 12 giọng)
  ├─ 🎵 Order Quiz          → 20 XP  (FCGDAEB / BEADGCF đầy đủ)
  ├─ 👁️ Key Sig ID          → 30 XP  (Nhận diện nhanh 5-7 dấu)
  └─ ✏️ Key Sig Write       → 40 XP  (Circle of Fifths quiz) ⭐

Tổng: 9 games | 195 XP
```

**Game Types:**

| Type            | Mô tả                                      | Skill Level   |
| --------------- | ------------------------------------------ | ------------- |
| `order-quiz`    | Điền thứ tự dấu thăng/giáng còn thiếu      | Recognition   |
| `key-sig-id`    | Nhìn hóa biểu → Chọn tên giọng đúng        | Active Recall |
| `key-sig-write` | Cho tên giọng → Kéo thả dấu hóa vào khuông | Application   |

---

## 3.3 Quãng - Số lượng (Intervals - Quantity)

> 📋 **Chưa triển khai**: Sẽ được implement tại `src/data/course-data/module-3/3.3-intervals-quantity.ts`

**UX Journey Pattern (4 bước):**

1. **Passive**: Animation đếm quãng từ C lên E: C(1)-D(2)-E(3) = Quãng 3
2. **Guided**: Click 2 nốt trên khuông → hệ thống auto-count và hiện kết quả
3. **Interactive**: "Interval Spotter" - nhìn 2 nốt → đoán số lượng quãng
4. **Milestone**: Đếm đúng quãng từ 2nd đến Octave trong speed game

**Mục tiêu học tập (Learning Objectives):**

- Đếm quãng bằng cách đếm TẤT CẢ các nốt (bao gồm cả nốt đầu)
- Nhận biết pattern trực quan trên khuông nhạc
- Phân biệt interval melodic (nối tiếp) và harmonic (cùng lúc)

**Cấu trúc nội dung (`theoryContent`):**

#### Section 1: Cách đếm quãng

| Nội dung giảng dạy                                        | Cách triển khai                          |
| :-------------------------------------------------------- | :--------------------------------------- |
| Đếm TẤT CẢ các nốt từ nốt đầu đến nốt cuối                | Animation đếm 1-2-3... trên khuông       |
| **Luôn đếm cả nốt bắt đầu là 1**                          | C lên E = C(1), D(2), E(3) → **Quãng 3** |
| Sai lầm phổ biến: đếm khoảng cách (2 bước) thay vì số nốt | ⚠️ Alert visual                          |

#### Section 2: Quãng 2, 3, 4, 5

| Quãng   | Pattern trên khuông            | Âm thanh     | Demo          |
| :------ | :----------------------------- | :----------- | :------------ |
| **2nd** | Dòng-Khe liền kề               | Bước đi gần  | `{{abc:C D}}` |
| **3rd** | Dòng-Dòng hoặc Khe-Khe kế nhau | "Snowman"    | `{{abc:C E}}` |
| **4th** | Skip 1 dòng/khe                | Hơi chới với | `{{abc:C F}}` |
| **5th** | Skip 2 dòng/khe                | Power chord! | `{{abc:C G}}` |

#### Section 3: Quãng 6, 7, 8

| Quãng   | Pattern trên khuông             | Âm thanh       | Demo          |
| :------ | :------------------------------ | :------------- | :------------ |
| **6th** | Rộng, ngọt ngào                 | "My Bonnie..." | `{{abc:C A}}` |
| **7th** | Rất rộng, căng thẳng            | Leading tone   | `{{abc:C B}}` |
| **8ve** | Octave - cùng vị trí, khác tầng | Like twins     | `{{abc:C c}}` |

**ABC Demos (Interactive Examples):**

| ID    | Title               | Mô tả nội dung               |
| :---- | :------------------ | :--------------------------- |
| 3.3.1 | Interval Counting   | Animation đếm từng bước      |
| 3.3.2 | Interval Gallery    | Tất cả quãng từ 2nd đến 8ve  |
| 3.3.3 | Melodic vs Harmonic | So sánh 2 cách chơi interval |

**Game Journey (Interleaved Progressive Pattern):**

Thiết kế game theo pattern "Master-Before-Advance":

```
LEVEL 1 (Quãng 2, 3)
  ├─ 🎵 Interval Number ID  → 10 XP  (Đếm quãng 2nd, 3rd)
  ├─ 🎹 Interval Play       → 15 XP  (Chơi quãng trên Piano)
  └─ ⏱️ Speed Count        → 20 XP  (Đếm nhanh trong 10s)

LEVEL 2 (+ Quãng 4, 5, 6)
  ├─ 🎵 Interval Number ID  → 15 XP  (Thêm 4th, 5th, 6th)
  ├─ 🎹 Interval Play       → 20 XP  (Chơi quãng rộng hơn)
  └─ ⏱️ Speed Count        → 25 XP  (Đếm nhanh hơn)

LEVEL 3 (Full: 2nd - Octave)
  ├─ 🎵 Interval Number ID  → 20 XP  (Tất cả quãng + 7th, 8ve)
  ├─ 🎹 Interval Play       → 30 XP  (Melodic + Harmonic)
  └─ ⏱️ Speed Count        → 40 XP  (Time challenge) ⭐

Tổng: 9 games | 195 XP
```

**Game Types:**

| Type                 | Mô tả                                | Skill Level   |
| -------------------- | ------------------------------------ | ------------- |
| `interval-number-id` | Đếm quãng trên khuông nhạc           | Recognition   |
| `interval-play`      | Nghe và chơi lại quãng trên phím đàn | Active Recall |
| `speed-count`        | Đếm quãng trong thời gian giới hạn   | Application   |

---

## 3.4 Quãng - Tính chất (Intervals - Quality)

> 📋 **Chưa triển khai**: Sẽ được implement tại `src/data/course-data/module-3/3.4-intervals-quality.ts`

**UX Journey Pattern (4 bước):**

1. **Passive**: Animation so sánh Major 3rd (vui) vs Minor 3rd (buồn)
2. **Guided**: "Semitone Counter" - đếm số nửa cung để xác định tính chất
3. **Interactive**: Ear training với các bài hát quen thuộc cho mỗi interval
4. **Milestone**: Nhận diện đúng P4, P5, M3, m3 bằng tai trong 80% cases

**Mục tiêu học tập (Learning Objectives):**

- Phân biệt Perfect (1, 4, 5, 8) vs Major/Minor (2, 3, 6, 7)
- Hiểu quan hệ: Major → Minor (giảm 1 nửa cung), Perfect → Dim/Aug
- Bắt đầu luyện tai (ear training) với interval recognition

**Cấu trúc nội dung (`theoryContent`):**

#### Section 1: Quãng Đúng (Perfect): 1, 4, 5, 8

| Nội dung giảng dạy                           | Cách triển khai           |
| :------------------------------------------- | :------------------------ |
| Chỉ có quãng 1, 4, 5, 8 mới gọi là "Perfect" | Bảng phân loại            |
| Âm thanh: trong trẻo, "rỗng", ổn định        | Audio demo P1, P4, P5, P8 |
| P4 = 5 semitones, P5 = 7 semitones           | Semitone counter visual   |

#### Section 2: Quãng Trưởng/Thứ (Major/Minor): 2, 3, 6, 7

| Nội dung giảng dạy                  | Cách triển khai                    |
| :---------------------------------- | :--------------------------------- |
| Major 3rd = 4 semitones (vui, sáng) | `{{abc:C E}}` "Oh When The Saints" |
| Minor 3rd = 3 semitones (buồn, sâu) | `{{abc:C _E}}` "Greensleeves"      |
| M - 1 semitone = m (Major → Minor)  | Animation giảm nốt trên            |

#### Section 3: Tăng (Augmented) & Giảm (Diminished)

| Nội dung giảng dạy                              | Cách triển khai              |
| :---------------------------------------------- | :--------------------------- |
| Perfect/Major + 1 semitone = **Augmented (+)**  | Aug 4 = "The Simpsons" theme |
| Perfect/Minor - 1 semitone = **Diminished (°)** | Dim 5 = "Diabolus in Musica" |

#### Section 4: Ear Training với bài hát quen

| Interval | Bài hát gợi nhớ        | Audio Demo |
| :------- | :--------------------- | :--------- |
| P4       | "Here Comes The Bride" | 🎵         |
| P5       | "Star Wars" theme      | 🎵         |
| M3       | "Oh When The Saints"   | 🎵         |
| m3       | "Greensleeves"         | 🎵         |
| M6       | "My Bonnie Lies Over"  | 🎵         |
| m2       | "Jaws" theme           | 🎵         |

**ABC Demos (Interactive Examples):**

| ID    | Title                 | Mô tả nội dung                     |
| :---- | :-------------------- | :--------------------------------- |
| 3.4.1 | Major vs Minor 3rd    | Side-by-side comparison            |
| 3.4.2 | Perfect Intervals     | P1, P4, P5, P8 demo                |
| 3.4.3 | Augmented Tritone     | "Diabolus in Musica"               |
| 3.4.4 | Interval Song Library | Danh sách bài hát cho mỗi interval |

**Game Journey (Interleaved Progressive Pattern):**

Thiết kế game theo pattern "Master-Before-Advance":

```
LEVEL 1 (Perfect: P4, P5)
  ├─ 🎵 Quality Quiz        → 10 XP  (Nhận diện P4=5, P5=7 semitones)
  ├─ 👂 Interval Ear ID     → 15 XP  (Nghe "Star Wars", "Here Comes...")
  └─ 🎹 Full Interval ID    → 20 XP  (Xác định "Perfect 4th")

LEVEL 2 (+ Major/Minor 3rd)
  ├─ 🎵 Quality Quiz        → 15 XP  (M3=4, m3=3 semitones)
  ├─ 👂 Interval Ear ID     → 20 XP  (Vui vs Buồn: M3 vs m3)
  └─ 🎹 Full Interval ID    → 25 XP  ("Major 3rd", "minor 3rd")

LEVEL 3 (Full: + 2nds, 6ths, 7ths, Aug/Dim)
  ├─ 🎵 Quality Quiz        → 20 XP  (Tất cả tính chất)
  ├─ 👂 Interval Ear ID     → 30 XP  (Library of songs)
  └─ 🎹 Full Interval ID    → 40 XP  ("Augmented 4th"...) ⭐

Tổng: 9 games | 195 XP
```

**Game Types:**

| Type               | Mô tả                                          | Skill Level   |
| ------------------ | ---------------------------------------------- | ------------- |
| `quality-quiz`     | Nhìn 2 nốt → đếm semitones → chọn tính chất    | Recognition   |
| `interval-ear-id`  | Nghe → đoán interval (P5, M3, m3...)           | Active Recall |
| `full-interval-id` | Xác định đầy đủ: "Minor 6th", "Perfect 4th"... | Application   |

---

## 3.5 Âm giai thứ (The Minor Scales)

> 📋 **Chưa triển khai**: Sẽ được implement tại `src/data/course-data/module-3/3.5-minor-scales.ts`

**UX Journey Pattern (4 bước):**

1. **Passive**: Animation so sánh C Major (vui) vs A minor (buồn) - cùng nốt, khác tâm
2. **Guided**: Scale Switcher - chuyển đổi giữa Natural, Harmonic, Melodic minor
3. **Interactive**: Xây dựng 3 dạng minor scale từ bất kỳ nốt nào
4. **Milestone**: Chơi đúng A minor (cả 3 dạng) trên Piano/Guitar

**Mục tiêu học tập (Learning Objectives):**

- Hiểu công thức Natural Minor: W-H-W-W-H-W-W
- Phân biệt 3 dạng: Natural, Harmonic (nâng bậc 7), Melodic (nâng bậc 6+7 khi lên)
- Hiểu quan hệ Relative Major/Minor (cùng hóa biểu)

**Cấu trúc nội dung (`theoryContent`):**

#### Section 1: Natural Minor

| Nội dung giảng dạy                       | Cách triển khai           |
| :--------------------------------------- | :------------------------ | -------------------------- |
| Công thức: **W-H-W-W-H-W-W**             | Animation bậc thang minor |
| A Natural Minor = tất cả phím trắng từ A | `{{piano:A Natural Minor  | A3,B3,C4,D4,E4,F4,G4,A4}}` |
| Âm hưởng: buồn, tự nhiên                 | Audio demo                |

#### Section 2: Harmonic Minor

| Nội dung giảng dạy                               | Cách triển khai             |
| :----------------------------------------------- | :-------------------------- |
| **Nâng bậc 7** lên nửa cung → tạo "Leading Tone" | A Harmonic: G → **G#**      |
| Quãng Aug 2nd giữa bậc 6-7: chất liệu "Ả Rập"    | Audio demo đặc trưng        |
| Dùng để xây dựng hợp âm V trưởng                 | E Major chord trong A minor |

#### Section 3: Melodic Minor

| Nội dung giảng dạy                       | Cách triển khai                |
| :--------------------------------------- | :----------------------------- |
| **Khi đi lên**: Nâng bậc 6 và 7 (F#, G#) | Animation ascending            |
| **Khi đi xuống**: Trả về Natural (G, F)  | Animation descending           |
| Lý do: Tránh quãng Aug 2nd khó hát       | Comparison Harmonic vs Melodic |

#### Section 4: Relative Major/Minor

| Nội dung giảng dạy                          | Cách triển khai               |
| :------------------------------------------ | :---------------------------- |
| **Cùng hóa biểu**, khác nốt chủ (Tonic)     | C Major ↔ A minor (0 dấu hóa) |
| Tìm Relative Minor: Major xuống quãng 3 thứ | C → A (xuống 3 semitones)     |
| G Major (1#) ↔ E minor (1#)                 | Khuông nhạc chung hóa biểu    |

**ABC Demos (Interactive Examples):**

| ID    | Title          | Mô tả nội dung                    |
| :---- | :------------- | :-------------------------------- |
| 3.5.1 | Natural Minor  | A minor, all white keys from A    |
| 3.5.2 | Harmonic Minor | G → G# raised 7th                 |
| 3.5.3 | Melodic Minor  | Different ascending vs descending |
| 3.5.4 | Relative Pairs | C Major ↔ A minor comparison      |

**Game Journey (Interleaved Progressive Pattern):**

Thiết kế game theo pattern "Master-Before-Advance":

```
LEVEL 1 (Natural Minor)
  ├─ 🎵 Minor Type ID       → 10 XP  (Nhận diện Natural minor)
  ├─ 🔗 Relative Finder    → 15 XP  (C Major ↔ A minor)
  └─ 🎹 Minor Scale Play   → 20 XP  (Chơi A Natural Minor)

LEVEL 2 (+ Harmonic Minor)
  ├─ 🎵 Minor Type ID       → 15 XP  (Natural vs Harmonic)
  ├─ 🔗 Relative Finder    → 20 XP  (G Major ↔ E minor...)
  └─ 🎹 Minor Scale Play   → 25 XP  (Chơi có nâng bậc 7)

LEVEL 3 (+ Melodic Minor)
  ├─ 🎵 Minor Type ID       → 20 XP  (Phân biệt cả 3 dạng)
  ├─ 🔗 Relative Finder    → 30 XP  (Bất kỳ giọng)
  └─ 🎹 Minor Scale Play   → 40 XP  (Lên khác xuống) ⭐

Tổng: 9 games | 195 XP
```

**Game Types:**

| Type               | Mô tả                                         | Skill Level   |
| ------------------ | --------------------------------------------- | ------------- |
| `minor-type-id`    | Nghe scale → Natural, Harmonic, hay Melodic?  | Recognition   |
| `relative-finder`  | Cho G Major → Relative minor là gì? (E minor) | Active Recall |
| `minor-scale-play` | Chơi đúng 3 loại minor scale trên instrument  | Application   |

---

## 3.6 Âm giai ngũ cung (The Pentatonic Scale)

> 📋 **Chưa triển khai**: Sẽ được implement tại `src/data/course-data/module-3/3.6-pentatonic.ts`

**UX Journey Pattern (4 bước):**

1. **Passive**: Animation "5 phím đen" trên Piano = Major Pentatonic
2. **Guided**: So sánh Major Pentatonic vs Minor Pentatonic
3. **Interactive**: Improvisation trên Sáo Trúc với backing track nhạc Việt
4. **Milestone**: Tạo giai điệu 8 ô nhịp bằng pentatonic scale

**Mục tiêu học tập (Learning Objectives):**

- Xây dựng Major Pentatonic (1-2-3-5-6) và Minor Pentatonic (1-♭3-4-5-♭7)
- Hiểu vì sao pentatonic "không có nốt sai" (no wrong notes)
- Ứng dụng trong nhạc dân tộc Việt Nam và Blues/Rock

**Cấu trúc nội dung (`theoryContent`):**

#### Section 1: Major Pentatonic

| Nội dung giảng dạy               | Cách triển khai               |
| :------------------------------- | :---------------------------- | ---------------------- |
| 5 nốt: 1-2-3-5-6 (bỏ nốt 4 và 7) | Từ C Major → Bỏ F và B        |
| 5 phím đen = pentatonic!         | `{{piano:5 phím đen           | Db4,Eb4,Gb4,Ab4,Bb4}}` |
| Âm hưởng: mơ mộng, dân gian      | Audio "Amazing Grace" opening |

#### Section 2: Minor Pentatonic

| Nội dung giảng dạy                        | Cách triển khai              |
| :---------------------------------------- | :--------------------------- | -------------------- |
| 5 nốt: 1-♭3-4-5-♭7 (bỏ nốt 2 và 6)        | A minor pent: A-C-D-E-G      |
| **Scale quan trọng nhất cho Guitar solo** | `{{guitar:Pentatonic Box 1   | A3,C4,D4,E4,G4,A4}}` |
| Thêm "Blue note" (♭5) → Blues Scale       | Demo A7#9 chord + blues lick |

#### Section 3: Pentatonic trong nhạc Việt Nam

| Nội dung giảng dạy                        | Cách triển khai                    |
| :---------------------------------------- | :--------------------------------- | ------ |
| Hệ thống **Hò-Xự-Xang-Xê-Cống**           | Bảng tương đương với Western notes |
| **Điệu Bắc** (vui) vs **Điệu Nam** (buồn) | Audio demo Sáo Trúc 2 sắc thái     |
| Kỹ thuật **rung, nhấn, luyến** đặc trưng  | `{{flute:Demo nhị cung             | ...}}` |

#### Section 4: "Không có nốt sai" - Improvisation

| Nội dung giảng dạy                       | Cách triển khai                   |
| :--------------------------------------- | :-------------------------------- |
| Pentatonic không có tension notes (4, 7) | Mọi nốt đều "nghe hay" với hợp âm |
| Bước đầu improvisation                   | Backing track → Click nốt tự do   |
| Call & Response (Xướng - Họa)            | Audio demo 2 phrase đối đáp       |

**ABC Demos (Interactive Examples):**

| ID    | Title                 | Mô tả nội dung              |
| :---- | :-------------------- | :-------------------------- |
| 3.6.1 | Major Pentatonic      | 5 notes, no wrong notes     |
| 3.6.2 | Minor Pentatonic      | Blues/Rock foundation       |
| 3.6.3 | 5 Black Keys          | Instant pentatonic on Piano |
| 3.6.4 | Vietnamese Pentatonic | Điệu Bắc vs Điệu Nam        |

**Game Journey (Interleaved Progressive Pattern):**

Thiết kế game theo pattern "Master-Before-Advance":

```
LEVEL 1 (Major Pentatonic)
  ├─ 🎵 Pentatonic ID       → 10 XP  (Nhận diện Major Pent: 1-2-3-5-6)
  ├─ 🎼 Flute Pentatonic   → 15 XP  (Chơi 5 phím đen trên Sáo)
  └─ 🎶 Improv Challenge   → 20 XP  (Tạo melody tự do)

LEVEL 2 (+ Minor Pentatonic)
  ├─ 🎵 Pentatonic ID       → 15 XP  (Minor Pent: 1-♭3-4-5-♭7)
  ├─ 🎸 Guitar Pentatonic  → 20 XP  (Box 1 pattern trên Guitar)
  └─ 🎶 Improv Challenge   → 25 XP  (Blues/Rock style)

LEVEL 3 (Vietnamese Pentatonic)
  ├─ 🎵 Pentatonic ID       → 20 XP  (Điệu Bắc vs Điệu Nam)
  ├─ 🎼 Flute Pentatonic   → 30 XP  (Kỹ thuật rung, nhấn, luyến)
  └─ 🎶 Improv Challenge   → 40 XP  (Tạo giai điệu Việt Nam) ⭐

Tổng: 9 games | 195 XP
```

**Game Types:**

| Type               | Mô tả                                            | Skill Level   |
| ------------------ | ------------------------------------------------ | ------------- |
| `pentatonic-id`    | Major Pentatonic hay Minor Pentatonic?           | Recognition   |
| `flute-pentatonic` | Chơi giai điệu ngũ cung trên Sáo Trúc ảo         | Active Recall |
| `improv-challenge` | Tạo giai điệu trên backing track, được chấm điểm | Application   |

---
