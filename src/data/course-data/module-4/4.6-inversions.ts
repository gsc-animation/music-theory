/**
 * Module 4, Submodule 4.6: Đảo hợp âm (Chord Inversions)
 */
import type { Submodule } from '../types'

export const SUBMODULE_4_6: Submodule = {
  id: '4.6',
  title: 'Đảo hợp âm',
  description: 'Hiểu 3 vị trí: Root Position, 1st Inversion, 2nd Inversion và Voice Leading',
  sections: ['theory', 'piano', 'abcDemo'],
  theoryContent: `
## 1. Inversion là gì?

### Định nghĩa

**Đảo hợp âm (Inversion)** là việc thay đổi nốt nào nằm ở **bass** (dưới cùng) trong khi giữ nguyên các nốt của hợp âm.

> 🔄 Cùng 3 nốt C-E-G, nhưng sắp xếp khác nhau!

{{quiz:Inversion là gì?|Thêm nốt vào hợp âm;*Đổi nốt nào nằm ở bass;Bỏ nốt khỏi hợp âm|Đảo hợp âm = thay đổi nốt nào ở bass, giữ nguyên các nốt}}

---

## 2. Root Position (Vị trí gốc)

### Đặc điểm

- **Root** nằm ở bass (dưới cùng)
- Cấu trúc: Root - 3rd - 5th
- Âm thanh: Ổn định nhất, "chắc chắn"

{{abc:C Major Root Position: C-E-G|X:1
L:1/1
K:C
[CEG]|]}}

{{piano:Root Position|C4,E4,G4}}

---

## 3. First Inversion (Đảo 1)

### Đặc điểm

- **3rd** nằm ở bass
- Root chuyển lên octave cao hơn
- Ký hiệu: **C/E** (C over E)

{{abc:C Major 1st Inversion: E-G-C|X:1
L:1/1
K:C
[EGc]|]}}

{{piano:1st Inversion C/E|E4,G4,C5}}

### Âm thanh

- Nhẹ nhàng hơn Root position
- "Chưa hoàn toàn ổn định"
- Phổ biến trong Classical và Pop ballad

{{quiz:Trong 1st Inversion, nốt nào nằm ở bass?|Root;*3rd;5th|1st Inversion = 3rd ở bass. Ví dụ: C/E = E ở bass}}

---

## 4. Second Inversion (Đảo 2)

### Đặc điểm

- **5th** nằm ở bass
- Ký hiệu: **C/G** (C over G)

{{abc:C Major 2nd Inversion: G-C-E|X:1
L:1/1
K:C
[Gce]|]}}

{{piano:2nd Inversion C/G|G4,C5,E5}}

### Âm thanh

- "Lơ lửng", không ổn định
- Thường dùng trong **cadential 6/4** (V 6/4 → V → I)
- Tạo tension trước resolution

---

## 5. Slash Chord Notation

### Ký hiệu C/E, C/G

Đọc: "C **over** E" hoặc "C **trên** E"

| Ký hiệu | Nghĩa | Inversion |
|---------|-------|-----------|
| **C** | C ở bass | Root position |
| **C/E** | E ở bass | 1st inversion |
| **C/G** | G ở bass | 2nd inversion |

### Không nhất thiết là inversion!

**F/G** có thể là F chord với G ở bass (không phải nốt của F chord) - đây là **slash bass**.

{{quiz:C/G có nghĩa là gì?|G chord;*C chord với G ở bass;G chord với C ở bass|C/G = C chord nhung G ở bass = 2nd Inversion}}

---

## 6. Voice Leading

### Nguyên tắc vàng

> Di chuyển các nốt **ít nhất có thể** khi đổi hợp âm!

### Ví dụ: C → F

**Không tốt**: C (C-E-G) → F (F-A-C) - tất cả nốt nhảy xa

**Tốt hơn**: C (C-E-G) → F/C (C-F-A) - C giữ nguyên làm bass!

{{abc:Smooth Voice Leading: C → F/C|X:1
M:4/4
L:1/1
K:C
[CEG] | [CFa]|]}}

### Lợi ích

- Nghe mượt mà hơn
- Dễ chơi hơn (ít di chuyển tay)
- Chuyên nghiệp hơn

---

## 7. Ứng dụng thực tế

### Piano Accompaniment

Thay vì: C → G → Am → F (tất cả root position)

Dùng: C → G/B → Am → F/A (bass line đi xuống: C-B-A-A)

{{abc:Walking Bass Line với Inversions|X:1
M:4/4
L:1/1
K:C
[CEG] | [B,DG] | [A,CE] | [A,CF]|]}}

### Guitar Slash Chords

Nhiều guitarists dùng slash chords để tạo bass line đẹp mà không cần bassist.

---

## 🎯 Tóm tắt

1. **Root Position**: Root ở bass (ổn định nhất)
2. **1st Inversion**: 3rd ở bass (nhẹ nhàng)
3. **2nd Inversion**: 5th ở bass (lơ lửng)
4. **Slash notation**: C/E = E ở bass
5. **Voice Leading**: Di chuyển nốt ít nhất = mượt nhất

> 💡 **Mẹo**: Thử chơi C-G-Am-F với inversions thay vì root position - nghe pro hơn nhiều!
  `,
  abcDemos: [
    {
      id: '4.6.1',
      title: '3 Positions of C Chord',
      description: 'Root (C-E-G) → 1st (E-G-C) → 2nd (G-C-E). Cùng 3 nốt, khác sắp xếp. Root position ổn định nhất, 2nd inversion lơ lửng nhất.',
      abc: `X:1
M:4/4
L:1/2
K:C
[CEG] [EGc] [Gce]2|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '4.6.2',
      title: 'Slash Chord Notation',
      description: 'C/E = C chord với E ở bass. C/G = C chord với G ở bass. F/A = F chord với A ở bass. Ký hiệu "/" = chỉ nốt bass.',
      abc: `X:1
M:4/4
L:1/1
K:C
[CEG] | [EGc] | [FAc] | [Afc']|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '4.6.3',
      title: 'Voice Leading Demo',
      description: 'C → F → G → C với smooth movement: Giữ common tones, di chuyển nốt khác gần nhất. Đây là kỹ thuật của pianist và arranger chuyên nghiệp!',
      abc: `X:1
M:4/4
L:1/1
K:C
[CEG] | [CFa] | [B,DG] | [CEG]|]`,
      interactive: true,
      playable: true,
    },
  ],
  exercises: [{ type: 'chord', questionCount: 5 }],
}
