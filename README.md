# 🕷️ Happy Birthday — Spider-Man Edition

## Struktur Folder

```
/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── assets/
    └── images/
        ├── avatar.jpg        ← foto profil di header IG post
        ├── ig-icon.png       ← (opsional) icon Instagram
        ├── photo1.jpg        ← foto slideshow 1  [BISA DIKLIK → video]
        ├── photo2.jpg        ← foto slideshow 2
        ├── photo3.jpg        ← foto slideshow 3  [BISA DIKLIK → video]
        ├── photo4.jpg        ← foto slideshow 4
        ├── photo5.jpg        ← foto slideshow 5  [BISA DIKLIK → video]
        ├── photo6.jpg        ← foto slideshow 6
        ├── photo7.jpg        ← foto slideshow 7  [BISA DIKLIK → video]
        ├── photo8.jpg        ← foto slideshow 8
        ├── photo9.jpg        ← foto slideshow 9  [BISA DIKLIK → video]
        └── photo10.jpg       ← foto slideshow 10 [KLIK → surat rahasia]
```

---

## 🖼️ Cara Menambah Foto

1. Simpan foto ke folder `assets/images/`
2. Beri nama `photo1.jpg` sampai `photo10.jpg`
3. Foto **1, 3, 5, 7, 9** — saat diklik akan flip & putar video
4. Foto **10** — saat diklik akan muncul surat rahasia (pop-up kertas)

---

## 🎬 Cara Menambah Video (Catbox)

1. Upload video (.mp4) ke **[catbox.moe](https://catbox.moe)**
2. Setelah upload, kamu dapat URL seperti: `https://files.catbox.moe/xxxxxx.mp4`
3. Buka file `js/app.js`
4. Cari bagian **CONFIG** di atas:

```js
const VIDEO_URLS = {
  0: '',  // video untuk foto 1 — isi URL mp4 di sini
  2: '',  // video untuk foto 3
  4: '',  // video untuk foto 5
  6: '',  // video untuk foto 7
  8: '',  // video untuk foto 9
};
```

5. Isi URL-nya, contoh:

```js
const VIDEO_URLS = {
  0: 'https://files.catbox.moe/abc123.mp4',
  2: 'https://files.catbox.moe/def456.mp4',
  4: 'https://files.catbox.moe/ghi789.mp4',
  6: 'https://files.catbox.moe/jkl012.mp4',
  8: 'https://files.catbox.moe/mno345.mp4',
};
```

> **Note:** Jika URL dikosongkan, foto yang diklik tetap flip dan tampil placeholder "Video X - Isi URL di app.js".

### Video akan:
- Loop otomatis secara smooth
- Saat video bermain, musik background otomatis turun volumenya
- Klik foto lagi → video flip balik ke foto, musik naik lagi

---

## 🎵 Cara Menambah Musik Background

1. Upload file musik (.mp3) ke **[catbox.moe](https://catbox.moe)**
2. Buka `js/app.js`
3. Cari baris:

```js
const MUSIK_URL = '';
```

4. Isi URL musik:

```js
const MUSIK_URL = 'https://files.catbox.moe/xxxxxx.mp3';
```

> Musik akan otomatis dimulai saat user pertama kali membuka amplop (sentuhan pertama).
> Di pojok kanan bawah ada tombol 🎵 untuk mute/unmute.

---

## 💖 Fitur-Fitur

| Fitur | Cara Kerja |
|---|---|
| **Flip Foto → Video** | Tap foto 1,3,5,7,9 → flip halus ke video. Tap lagi → balik ke foto |
| **Surat Rahasia** | Tap foto 10 → pop-up surat kertas muncul dengan animasi smooth |
| **Realtime Like** | Tombol ❤️ menambah jumlah like, tersimpan di browser |
| **Double-Tap Love** | Double tap di area poster → animasi love burst seperti Instagram |
| **Musik Background** | Auto play saat buka amplop, tombol mute di pojok kanan bawah |
| **Music Duck** | Saat video foto bermain, volume musik otomatis turun |
| **Portrait Lock** | Web otomatis landscape-blocked, hanya bisa portrait |
| **No Scroll Lock** | Scene 1-3 terkunci, scene 4 bisa scroll tapi halaman tetap fixed |

---

## ✏️ Mengubah Nama & Tanggal

Buka `index.html`, cari dan ganti:
- `Rosa Maria Aguado` → nama yang diinginkan
- `27 MARCH 2027` → tanggal ulang tahun
- `27 Maret 2027` → tanggal di surat rahasia

---

## 💌 Mengubah Isi Surat Rahasia

Buka `index.html`, cari bagian `<div class="lo-body">` dan ganti teks Lorem Ipsum dengan pesan aslimu.

---

## 🚀 Upload ke Hosting

1. Zip seluruh folder (index.html + css/ + js/ + assets/)
2. Upload ke **Netlify Drop**, **GitHub Pages**, atau hosting apapun
3. Pastikan struktur folder tetap sama setelah upload
