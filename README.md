# 🎀 Kawaii Studio 3D - 3D Anime Karakter Giydirme ve Poz Oyunu

Modern, tatlı ve mobil uyumlu, pastel pembe kawaii / gyaru estetiğine sahip profesyonel 3D anime karakter giydirme ve poz verme web oyunu.

---

## ✨ Oyun Özellikleri

- **🌸 Özgün 3D Anime Karakteri**:
  - Büyük ışıltılı anime gözleri, kirpikler, canlı göz kırpma animasyonu.
  - Sevimli allık efektleri, zarif anime vücut oranları ve pürüzsüz toon/stüdyo aydınlatması.
- **👤 Gelişmiş Karakter Özelleştirme**:
  - **Göz Tipleri**: Işıltılı Anime, Gyaru Kedi Gözü, Yumuşak Masum, Kalp Parıltılı.
  - **Kaş Modelleri**: Doğal Kavisli, Düz Kore/Anime, Havalı Gyaru, Neşeli Yay.
  - **Ağız Stilleri**: Tatlı Tebessüm, Neşeli Açık Gülüş, Kedi Ağzı (:3), Havalı Yan Gülüş.
  - **Allık Stilleri**: Çizgili Parıltı, Yumuşak Daire, Gül Pembesi, Şeftali Işıltısı + Yoğunluk Sliderı.
  - **Küpeler**: Pembe Kalp Küpe, İnci Sallantılı, Altın Yıldız, Gyaru Halka.
- **👗 Modüler Kıyafet ve Aksesuar Sistemi**:
  - **9 Kategori**: `hair`, `headAccessory`, `top`, `bottom`, `dress`, `socks`, `shoes`, `accessory`, `bag`.
  - **Akıllı Çakışma Yönetimi**: Elbise seçildiğinde üst ve alt kıyafetler otomatik olarak gizlenir; elbise çıkarıldığında önceki kombinasyon hafızadan geri yüklenir.
  - **Renk Özelleştirme**: Kıyafetler, saçlar, gözler ve ten tonları gerçek zamanlı olarak değiştirilebilir.
- **💃 12 Farklı Anime Pozu**:
  - *Normal Standing*, *Cute Standing*, *Kawaii Peace (✌️)*, *Shy Hands Behind (🥺)*, *Cute Kneeling Sit (🪑)*, *Hand on Hip (💃)*, *Over the Shoulder (👀)*, *Gyaru Catwalk (👠)*, *Finger to Cheek (💖)*, *Anime Idol Sparkle (⭐)*, *Cute Wave (👋)*, *Playful Crossed Arms (😏)*.
  - Ani atlama olmadan 300-500ms akıcı iskelet geçişleri.
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

## 🛠️ Teknoloji Yığını

- **Framework**: Next.js 14 (App Router)
- **UI & Bileşenler**: React 18, TypeScript, Tailwind CSS, Lucide React
- **3D Motoru**: Three.js, React Three Fiber (`@react-three/fiber`), `@react-three/drei`
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

### 1. Adım: GitHub'a Yükleyin
```bash
git init
git add .
git commit -m "feat: production ready Kawaii Studio 3D game"
git branch -M main
git remote add origin <github-repo-url>
git push -u origin main
```

### 2. Adım: Vercel ile Bağlayın
1. [vercel.com](https://vercel.com) adresine gidin ve giriş yapın.
2. **Add New...** -> **Project** seçin.
3. GitHub reponuzu seçin.
4. **Framework Preset**: `Next.js` olarak otomatik algılanacaktır.
5. **Deploy** butonuna basın!

Deploy işlemi yaklaşık 1-2 dakika içinde tamamlanacaktır.

---

## 📂 Klasör Yapısı

```
kizgiydirmerigina/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── icon.tsx
│   └── globals.css
├── components/
│   ├── character/
│   │   ├── CharacterModel.tsx
│   │   ├── AnimeFace.tsx
│   │   ├── HairRenderer.tsx
│   │   ├── ClothingRenderer.tsx
│   │   ├── AccessoriesRenderer.tsx
│   │   └── CharacterRig.tsx
│   ├── scene/
│   │   ├── GameCanvas.tsx
│   │   ├── StudioScene.tsx
│   │   ├── CameraController.tsx
│   │   ├── ParticleEffects.tsx
│   │   ├── DecorativeBackground.tsx
│   │   └── LoadingScreen.tsx
│   └── ui/
│       ├── Header.tsx
│       ├── CategorySidebar.tsx
│       ├── ItemCard.tsx
│       ├── CharacterCustomizer.tsx
│       ├── PosePanel.tsx
│       ├── PresetPanel.tsx
│       ├── FavoritesPanel.tsx
│       ├── MobileNavigation.tsx
│       ├── PhotoModal.tsx
│       └── FloatingHUD.tsx
├── data/
│   ├── categories.ts
│   ├── presets.ts
│   ├── faceFeatures.ts
│   ├── poses/
│   └── clothing/
├── hooks/
│   └── useSoundEffects.ts
├── lib/
│   └── store.ts
└── types/
    └── character.ts
```
