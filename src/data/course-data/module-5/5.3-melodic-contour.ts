/**
 * Module 5, Submodule 5.3: Đường nét giai điệu (Melodic Contour)
 */
import type { Submodule } from '../types'

export const SUBMODULE_5_3: Submodule = {
  id: '5.3',
  title: 'Đường nét giai điệu',
  description: 'Hiểu Passing Tone, Neighbor Tone, Suspension và quy tắc "bước nhỏ sau nhảy lớn"',
  sections: ['theory', 'grandStaff', 'abcDemo'],
  theoryContent: `
## 1. Melodic Contour là gì?

### Định nghĩa

**Melodic Contour** (Đường nét giai điệu) là "hình dáng" của giai điệu khi vẽ lên/xuống trên giấy - giống như đường sóng.

> 📈 Contour = "Bản đồ độ cao" của melody!

### Ví dụ

- **Ascending**: C-D-E-F-G (đi lên)
- **Descending**: G-F-E-D-C (đi xuống)
- **Wave**: C-E-D-F-E-G (sóng)

---

## 2. Chord Tones vs Non-Chord Tones

### Chord Tones

Nốt **thuộc** hợp âm đang chơi (C, E, G trong C Major)

### Non-Chord Tones

Nốt **không thuộc** hợp âm - tạo **tension** rồi **resolve**

> 🎵 Non-chord tones làm melody "có gia vị"!

---

## 3. Passing Tone (Nốt lướt)

### Định nghĩa

Nốt nằm **GIỮA** 2 chord tones, nối chúng bằng bước đi theo chiều.

{{abc:Passing Tone: D nối C và E|X:1
M:4/4
L:1/4
K:C
C D E G|]}}

### Ví dụ

- Chord: C Major (C-E-G)
- Melody: C - **D** - E
- D = Passing tone (nối C với E)

### Đặc điểm

- Đi theo **một hướng** (lên hoặc xuống)
- Phách yếu (thường)
- Làm giai điệu **mượt mà**

---

## 4. Neighbor Tone (Nốt láng giềng)

### Định nghĩa

Nốt đi sang bên cạnh rồi **quay lại** nốt gốc.

{{abc:Neighbor Tone: D xoay quanh C|X:1
M:4/4
L:1/4
K:C
C D C E|]}}

### Loại

- **Upper Neighbor**: C - D - C (đi lên rồi về)
- **Lower Neighbor**: C - B - C (đi xuống rồi về)

### Đặc điểm

- **3 nốt pattern**: Chord → Neighbor → Chord
- Trang trí cho nốt chính
- Tạo chuyển động "tại chỗ"

---

## 5. Suspension (Nốt trễ)

### Định nghĩa

Giữ lại nốt từ hợp âm **trước**, tạo **tension**, rồi **resolve** xuống.

{{abc:Suspension: 4-3 (F giữ lại rồi về E)|X:1
M:4/4
L:1/4
K:C
[FAc]2 [EGc]2|]}}

### Ký hiệu phổ biến

- **Sus4** (4-3): Giữ nốt 4, resolve về 3
- **Sus2** (9-8): Giữ nốt 2, resolve về 1

### Cảm xúc

- **Mong chờ**, lãng mạn
- Rất phổ biến trong ballad
- Csus4 → C = "Sự chờ đợi → Giải quyết"

---

## 6. Quy tắc "Leap & Step"

### Nguyên tắc từ Counterpoint

> **Sau bước nhảy LỚN → đi NGƯỢC lại bằng bước NHỎ**

{{abc:Leap lên rồi step xuống|X:1
M:4/4
L:1/4
K:C
C A G F | E D C2|]}}

### Ví dụ

- C nhảy LÊN A (leap, quãng 6)
- → Đi XUỐNG bằng steps: A-G-F-E (step by step)

### Tại sao hiệu quả?

- Tạo **cân bằng** (balance)
- Không "leo mãi" hay "rớt mãi"
- Melody nghe **tự nhiên**

---

## 7. Nguyên tắc viết Melody

### 1. Bắt đầu & Kết thúc

- Bắt đầu trên chord tone (thường là 1, 3, hoặc 5)
- Kết thúc trên **tonic** (nốt 1)

### 2. Di chuyển

- Chủ yếu bằng **steps** (quãng 2)
- Dùng **leaps** có chọn lọc (tạo interest)
- Sau leap → step ngược lại

### 3. Contour

- Có **climax** (điểm cao nhất)
- Không quá nhiều lên/xuống liên tục
- Wave shape tự nhiên nhất

---

## 8. Ứng dụng: Viết Melody

### Trên Chord Progression C-G-Am-F

1. Xác định chord tones mỗi ô
2. Vẽ contour tổng thể (đỉnh ở đâu?)
3. Điền chord tones vào phách mạnh
4. Thêm passing/neighbor tones vào phách yếu

{{abc:Simple Melody trên C-G-Am-F|X:1
M:4/4
L:1/4
K:C
E D C G | B A G D | C D E A | G F E C|]}}

---

## 🎯 Tóm tắt

1. **Passing Tone**: Nối 2 chord tones, đi một hướng
2. **Neighbor Tone**: Đi sang rồi quay lại
3. **Suspension**: Giữ nốt cũ, tạo tension, resolve
4. **Leap & Step**: Nhảy lớn → bước nhỏ ngược lại
5. Chord tones ở phách mạnh, non-chord ở phách yếu

> 💡 **Mẹo**: Vẽ contour line trước, rồi mới chọn nốt!
  `,
  abcDemos: [
    {
      id: '5.3.1',
      title: 'Passing Tone Demo',
      description: 'Fill the gap: C → D → E. D là passing tone nối C và E (chord tones). Giúp melody di chuyển mượt mà thay vì nhảy.',
      abc: `X:1
M:4/4
L:1/4
K:C
C D E G | G F E C|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '5.3.2',
      title: 'Neighbor Tone Demo',
      description: 'Orbit around: C → D → C (upper neighbor), E → D → E (lower neighbor). Nốt đi sang rồi quay về, tạo ornament cho note chính.',
      abc: `X:1
M:4/4
L:1/4
K:C
C D C E | E D E G|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '5.3.3',
      title: 'Suspension Resolution',
      description: 'Csus4 → C: F (bậc 4) giữ lại từ chord trước, tạo tension, rồi resolve về E (bậc 3). Cảm giác: mong chờ → thỏa mãn. Rất cảm xúc!',
      abc: `X:1
M:4/4
L:1/2
K:C
[CFG] [CEG] | [CFa] [CEa]|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '5.3.4',
      title: 'Leap & Step Rule',
      description: 'Balance demonstration: C nhảy lên A (leap 6th), rồi step xuống G-F-E-D-C. Quy tắc counterpoint cổ điển này làm melody nghe tự nhiên và cân bằng.',
      abc: `X:1
M:4/4
L:1/4
K:C
C A G F | E D C2|]`,
      interactive: true,
      playable: true,
    },
  ],
  exercises: [{ type: 'note-id', notes: ['C4', 'D4', 'E4', 'F4', 'G4'], questionCount: 5 }],
}
