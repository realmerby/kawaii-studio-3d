# 🎀 Kawaii Studio 3D - 3D Anime Karakter Giydirme ve Poz Oyunu

Modern, tatlı ve mobil uyumlu, pastel pembe kawaii / gyaru estetiğine sahip profesyonel 3D anime karakter giydirme ve poz verme web oyunu.

---

## ✨ Oyun Özellikleri

- **🌸 Özgün 3D Anime Karakteri (Pixiv VRM 1.0)**:
  - Büyük ışıltılı anime gözleri, kirpikler, canlı göz kırpma animasyonu.
  - Sevimli allık efektleri, zarif anime vücut oranları ve pürüzsüz toon/stüdyo aydınlatması.
  - Yay-kemik saç ve kıyafet fiziği (Spring bone physics).
- **👤 Gelişmiş Karakter Özelleştirme**:
  - **Göz Tipleri**: Işıltılı Anime, Gyaru Kedi Gözü, Yumuşak Masum, Kalp Parıltılı.
  - **Kaş Modelleri**: Doğal Kavisli, Düz Kore/Anime, Havalı Gyaru, Neşeli Yay.
  - **Ağız Stilleri**: Tatlı Tebessüm, Neşeli Açık Gülüş, Kedi Ağzı (:3), Havalı Yan Gülüş.
  - **Allık Stilleri**: Çizgili Parıltı, Yumuşak Daire, Gül Pembesi, Şeftali Işıltısı + Yoğunluk Sliderı.
  - **Küpeler**: Pembe Kalp Küpe, İnci Sallantılı, Altın Yıldız, Gyaru Halka.
- **👗 Çift Modlu Modüler Kıyafet ve Aksesuar Mimarisi (`mesh` & `reskin`)**:
  - **10 Kategori**: `hair`, `headAccessory`, `top`, `bottom`, `dress`, `outerwear`, `socks`, `shoes`, `accessory`, `bag`.
  - **Dinamik Anime Tekstil Doku Motoru**: Tartan/ekose etekler (`check`), denizci yakası (`sailor`), Y2K kalp desenleri (`heart`), fransız danteli (`lace`), çizgili dizüstü çoraplar (`stripes`) ve kot dokusu (`denim`).
  - **Akıllı Çakışma Yönetimi**: Elbise seçildiğinde üst ve alt kıyafetler otomatik olarak gizlenir; elbise çıkarıldığında önceki kombinasyon hafızadan geri yüklenir.
  - **Renk Özelleştirme**: Kıyafetler, saçlar, gözler ve ten tonları gerçek zamanlı olarak değiştirilebilir.
- **💃 12 Farklı Anime Pozu (VRM Humanoid Engine)**:
  - *Normal Standing*, *Cute Standing*, *Kawaii Peace (✌️)*, *Shy Hands Behind (🥺)*, *Cute Kneeling Sit (🪑)*, *Hand on Hip (💃)*, *Over the Shoulder (👀)*, *Gyaru Catwalk (👠)*, *Finger to Cheek (💖)*, *Anime Idol Sparkle (⭐)*, *Cute Wave (👋)*, *Playful Crossed Arms (😏)*.
  - 16 temel kemik üzerinden sıfır artık rotasyonlu akıcı iskelet geçişleri.
- **🌟 Hazır Stiller & Presetler**:
  - **Tam Karakter Presetleri**: Sweet Pastel Bunny, Gyaru Pop Star, Soft Girl Cottage, Gothic Sweet Maid, Anime School Idol, Y2K Cyber Princess.
  - **Sadece Kıyafet Kombinleri**: Yüz ve saç rengini koruyarak sadece kıyafeti tek tıkla giydirir.
- **💖 Favoriler ve `localStorage` Kalıcılığı**:
  - Herhangi bir kıyafete veya stile kalp verme, sayfa yenilendiğinde son karakteri ve favorileri aynen geri yükleme.
- **🎵 Dinlendirici Kawaii Web Audio Efektleri**:
  - Baloncuk pop sesi, peri ışıltısı, kalp çanı, zar sesi, deklanşör sesi ve sessize alma (mute) butonu.
- **📸 Polaroid Fotoğraf Stüdyosu**:
  - 3D sahneyi yüksek çözünürlüklü Polaroid kartı olarak yakalama, özel başlık ekleme ve PNG olarak indirme / paylaşma.
- **📱 %100 Mobil ve Masaüstü Uyumlu**:
  - Masaüstünde geniş stüdyo panelleri, mobilde ergonomik alt menü ve kayar çekmece (drawer).
- **🚀 Vercel Free Ready**:
  - Sıfır backend, %100 client-side WebGL, 0 API anahtarı gereksinimi.

---

## 👗 Yeni 3D Kıyafet / Mesh Ekleme Rehberi (Developer Guide)

Projede kıyafet sistemi **Metadata Tabanlı Çift Modlu Mimari** (`reskin` ve `mesh`) ile kurulmuştur.

### 1. Yeni Bir Reskin Kıyafet veya Desen Eklemek:
`data/clothing/tops.ts` veya `bottoms.ts` dosyasına yeni bir obje ekleyin:
```typescript
{
  id: 'top-custom-hoodie',
  name: 'Custom Sailor Knit',
  nameTr: 'Özel Denizci Triko',
  category: 'top',
  meshType: 'custom_knit',
  itemType: 'reskin',
  pattern: 'sailor', // 'solid' | 'stripes' | 'check' | 'heart' | 'lace' | 'polka' | 'denim' | 'sailor'
  layer: 3,
  defaultColor: '#FFA8CA',
  patternSecondaryColor: '#FFFFFF',
  availableColors: ['#FFA8CA', '#FFFFFF', '#18181B'],
  tags: ['cute', 'sailor'],
}
```

### 2. Gelecekte Ayrı Bir 3D `.glb` / `.gltf` Kıyafet Modeli Eklemek:
1. `.glb` dosyanızı `public/models/clothes/` dizinine yerleştirin.
2. `data/clothing/` içine metadata tanımlayın:
```typescript
{
  id: 'top-gothic-jacket',
  name: '3D Gothic Leather Jacket',
  nameTr: '3D Gotik Deri Ceket',
  category: 'outerwear',
  meshType: 'gothic_jacket',
  itemType: 'mesh',
  meshAssetUrl: '/models/clothes/gothic_jacket.glb',
  layer: 4,
  attachment: {
    anchor: 'chest',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  defaultColor: '#18181B',
  availableColors: ['#18181B', '#831843', '#FFFFFF'],
}
```
Sistem otomatik olarak modeli kemiğe bağlar (`anchor`), rengi uygular ve katman hiyerarşisine (`layer`) göre render eder.

---

## 🛠️ Teknoloji Yığını

- **Framework**: Next.js 14 (App Router)
- **UI & Bileşenler**: React 18, TypeScript, Tailwind CSS, Lucide React
- **3D Motoru**: Three.js, React Three Fiber (`@react-three/fiber`), `@react-three/drei`, Pixiv Three-VRM (`@pixiv/three-vrm`)
- **State Yönetimi**: Zustand (localStorage kalıcılığı ile)
- **Efektler**: Canvas-Confetti, Web Audio Synth, Floating Stickers

---

## 🚀 Yerel Geliştirme (Local Setup)

### 1. Bağımlılıkları Yükleyin
```bash
npm install
```

### 2. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine giderek oyunu oynayabilirsiniz.

---

## 🌐 Vercel Üzerine Deploy Etme

Bu proje tamamen istemci taraflı (client-side) çalıştığı ve harici ücretli API veya veritabanı gerektirmediği için **Vercel Free Plan** üzerinde ücretsiz şekilde tek tıkla deploy edilebilir.

```bash
git add .
git commit -m "feat: modular clothing architecture and procedural anime pattern engine"
git push origin main
```
