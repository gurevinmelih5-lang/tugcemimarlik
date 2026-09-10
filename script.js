// ==========================================================================
// TUĞÇE MİMARLIK - CINEMATIC CANVAS SCROLLER & MULTI-PAGE ROUTER ENGINE
// ==========================================================================

const frameCount = 240;
const images = [];
let loadedCount = 0;
let currentFrameIndex = -1;
let lenis = null;

// DOM Elements
const canvas = document.getElementById('video-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
const scrollSection = document.getElementById('hero-scroll');
const heroSlides = document.querySelectorAll('.hero-slide');
const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loader-bar');
const loaderPercent = document.getElementById('loader-percent');

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const curtain = document.getElementById('curtain');
const pageViews = document.querySelectorAll('.page-view');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

// Project Data for Interactive Modals
const projectData = {
  'proje1': {
    id: 'proje1',
    title: 'A-Frame Doğa & Kır Konutu',
    subtitle: 'Çelik & Masif Ahşap Strüktürlü Dağ Evi',
    category: 'Konut & Villa',
    filterCategory: 'residential',
    location: 'İzmir, Kemalpaşa',
    year: '2024',
    status: 'Tamamlandı / Uygulama',
    cover: 'assets/projects/proje1/img_2.jpg',
    images: [
      'assets/projects/proje1/img_2.jpg',
      'assets/projects/proje1/img_1.jpg',
      'assets/projects/proje1/img_3.jpg',
      'assets/projects/proje1/img_4.jpg',
      'assets/projects/proje1/img_5.jpg',
      'assets/projects/proje1/img_6.jpg',
      'assets/projects/proje1/img_7.jpg'
    ],
    description: 'Doğal topoğrafyayla bütünleşen, çelik konstrüksiyon ve masif ahşap strüktürle yükselen; asma kat suit odası, şömineli salonu ve geniş seyir verandasıyla zamansız bir A-Frame yaşam alanı.',
    narrative: 'Geniş cam cepheleri sayesinde gün ışığını ve orman manzarasını iç mekanın doğal bir parçası haline getiren tasarım; zemin kattaki şömineli geniş salonu açık ahşap verandayla birleştirerek iç-dış mekan sınırlarını ortadan kaldırır.',
    details: [
      { label: 'Baş Mimar', value: 'Mimar Tuğçe POLAT' },
      { label: 'Taşıyıcı Sistem', value: 'Çelik Karkas & Masif Ahşap Strüktür' },
      { label: 'Mekan Dağılımı', value: 'Şömineli Salon, Asma Kat Suit, Geniş Veranda' },
      { label: 'Enerji & Yalıtım', value: 'Yüksek Performanslı Isı Yalıtımı ve Doğal Havalandırma' }
    ]
  },
  'proje3': {
    id: 'proje3',
    title: 'Murat Bey İnşaat Prestij Kompleksi',
    subtitle: 'Cephe Aydınlatmalı Ticari & Karma Konut Projesi',
    category: 'Ticari & Ofis',
    filterCategory: 'commercial',
    location: 'İzmir, Kemalpaşa',
    year: '2024',
    status: 'Tamamlandı',
    cover: 'assets/projects/proje3/img_1.jpg',
    images: [
      'assets/projects/proje3/img_1.jpg',
      'assets/projects/proje3/img_2.jpg',
      'assets/projects/proje3/img_3.jpg'
    ],
    description: 'Murat Bey İnşaat için geliştirilen; cadde mağazaları, üst kat konut birimleri ve entegre lineer mimari LED cephe aydınlatmasıyla bölgenin dikkat çeken simge projesi.',
    narrative: 'Gündüz heykelsi prizmatik hatlarıyla, gece ise özel aydınlatma senaryosuyla kentin siluetinde fark yaratan yapı; zemin kattaki ticari dinamizmi üst katlardaki huzurlu yaşam konforuyla kusursuzca ayrıştırır.',
    details: [
      { label: 'İşveren', value: 'Murat Bey İnşaat' },
      { label: 'Mimari Tasarım', value: 'Tuğçe Mimarlık & Mühendislik' },
      { label: 'Fonksiyon', value: 'Zemin Mağazalar + Lüks Konut Katları' },
      { label: 'Aydınlatma', value: 'Özel Entegre Lineer LED Mimari Vurgu' }
    ]
  },
  'proje4': {
    id: 'proje4',
    title: 'Havuzlu Müstakil Lüks Villa',
    subtitle: 'Özel Yüzme Havuzlu ve Garajlı Çağdaş Malikane',
    category: 'Konut & Villa',
    filterCategory: 'residential',
    location: 'İzmir, Ulucak',
    year: '2024',
    status: 'İnşaat & Uygulama',
    cover: 'assets/projects/proje4/img_2.jpg',
    images: [
      'assets/projects/proje4/img_2.jpg',
      'assets/projects/proje4/img_1.jpg',
      'assets/projects/proje4/img_3.jpg',
      'assets/projects/proje4/img_4.jpg',
      'assets/projects/proje4/img_5.jpg',
      'assets/projects/proje4/img_6.jpg'
    ],
    description: 'Özel yüzme havuzu, entegre kapalı garajı, kolonadlı terasları ve doğal taş çevre duvarlarıyla tasarlanan iki katlı modern müstakil villa projesi.',
    narrative: 'Açık hava yaşamını mahremiyet ve lüksle buluşturan villada; salondan havuz terasına kesintisiz geçiş sağlayan devasa sürme camlar, üst kattaki panoramik balkon ve doğal peyzajla çevrili bahçe kurgusu öne çıkar.',
    details: [
      { label: 'Baş Mimar', value: 'Mimar Tuğçe POLAT' },
      { label: 'Açık Alanlar', value: 'Özel Yüzme Havuzu, Güneşlenme Terası, Geniş Bahçe' },
      { label: 'Kapalı Alanlar', value: 'Entegre Garaj, 4+1 Geniş Yaşam Alanı, Kış Bahçesi' },
      { label: 'Enerji Sınıfı', value: 'Enerji Kimlik Belgesi A Sınıfı Standartları' }
    ]
  },
  'proje5': {
    id: 'proje5',
    title: 'Doğal Taş Cepheli Butik Rezidans',
    subtitle: '3 Katlı Düşük Yoğunluklu Seçkin Konut Bloğu',
    category: 'Konut & Villa',
    filterCategory: 'residential',
    location: 'İzmir, Kemalpaşa',
    year: '2024',
    status: 'Tamamlandı',
    cover: 'assets/projects/proje5/img_1.jpg',
    images: [
      'assets/projects/proje5/img_1.jpg',
      'assets/projects/proje5/img_2.jpg',
      'assets/projects/proje5/img_3.jpg',
      'assets/projects/proje5/img_4.jpg'
    ],
    description: 'Doğal taş duvar dokusu, geniş cam açıklıkları, ritmik balkonları ve peyzaj entegrasyonu ile kurgulanan 3 katlı butik konut projesi.',
    narrative: 'Modern mimarinin yalın hatlarını taş malzemenin kadim sıcaklığıyla buluşturan yapı; geniş balkonları ve caddeyle kurduğu saygılı mesafe ile sakinlerine huzurlu bir yaşam vaat eder.',
    details: [
      { label: 'Baş Mimar', value: 'Mimar Tuğçe POLAT' },
      { label: 'Ana Malzemeler', value: 'Doğal Taş Kaplama, Antrasit Alüminyum Doğrama' },
      { label: 'Tipoloji', value: '3 Katlı Az Yoğunluklu Butik Blok' },
      { label: 'Çevre Düzeni', value: 'Özel Peyzaj, Yürüyüş Yolları ve Açık Otopark' }
    ]
  },
  'proje6': {
    id: 'proje6',
    title: 'Kavis Hatlı Prestij Rezidansı',
    subtitle: 'Organik Formlu ve LED Aydınlatmalı Lüks Konut',
    category: 'Konut & Villa',
    filterCategory: 'residential',
    location: 'İzmir, Kemalpaşa',
    year: '2024',
    status: 'Ruhsat & Tasarım',
    cover: 'assets/projects/proje6/img_1.jpg',
    images: [
      'assets/projects/proje6/img_1.jpg',
      'assets/projects/proje6/img_2.jpg',
      'assets/projects/proje6/img_3.jpg'
    ],
    description: 'Yumuşak kavisli teras hatları, cepheyi saran lineer LED aydınlatma bantları ve zemin bahçe entegrasyonu ile modern rezidans anlayışına dinamizm katan prestij konut projesi.',
    narrative: 'Geleneksel dik açılı mimarinin ötesine geçerek akıcı yatay hatlar sunan yapı, geniş cam cepheleri ve ferah balkon derinlikleriyle sakinlerine heykelsi bir yaşam alanı sunar.',
    details: [
      { label: 'Baş Mimar', value: 'Mimar Tuğçe POLAT' },
      { label: 'Tasarım Dili', value: 'Organik Kavisli Hatlar & Dinamik Formlar' },
      { label: 'Cephe Karakteri', value: 'Entegre Lineer LED Aydınlatma & Geniş Camlar' },
      { label: 'Yaşam Standartları', value: 'Geniş Seyir Terasları ve Özel Peyzaj Alanı' }
    ]
  },
  'proje7': {
    id: 'proje7',
    title: 'Modern Mutfak & Yaşam Alanı',
    subtitle: 'Minimalist Çizgili İç Mekan & Ada Tezgah Renovasyonu',
    category: 'İç Mimari & Tasarım',
    filterCategory: 'interior',
    location: 'İzmir, Bornova',
    year: '2024',
    status: 'Tamamlandı / Uygulama',
    cover: 'assets/projects/proje7/img_1.jpg',
    images: [
      'assets/projects/proje7/img_1.jpg',
      'assets/projects/proje7/img_2.jpg'
    ],
    description: 'Antrasit ve sıcak ahşap dokuların uyumuyla şekillenen, gizli LED aydınlatmalı dolap sistemleri, entegre ada barı ve ergonomik sirkülasyon planıyla hayata geçirilen modern mutfak tasarımı.',
    narrative: 'İç mekan hacmini maksimum verimle değerlendiren bu renovasyon çalışmasında depolama alanları mimari hatların içine gizlenmiş, yemek hazırlama ve sosyalleşme alanları estetik bir dengeyle kurgulanmıştır.',
    details: [
      { label: 'İç Mimar', value: 'Mimar Tuğçe POLAT' },
      { label: 'Uygulama Alanı', value: 'Açık Konsept Mutfak & Yemek Alanı' },
      { label: 'Malzeme Paleti', value: 'Mat Antrasit Lake, Doğal Meşe Kaplama, Kompakt Tezgah' },
      { label: 'Aydınlatma', value: 'Gizli Lineer LED Bantlar & Odak Sarkıtlar' }
    ]
  },
  'proje8': {
    id: 'proje8',
    title: 'Galeri Tavanlı Loft Doğa Villası',
    subtitle: 'Tuğla Şömineli ve Asma Katlı Çağdaş Malikane',
    category: 'Konut & Villa',
    filterCategory: 'residential',
    location: 'İzmir, Kemalpaşa / Ulucak',
    year: '2024',
    status: 'Tasarım & Uygulama',
    cover: 'assets/projects/proje8/img_1.jpg',
    images: [
      'assets/projects/proje8/img_1.jpg',
      'assets/projects/proje8/img_2.jpg',
      'assets/projects/proje8/img_3.jpg',
      'assets/projects/proje8/img_4.jpg',
      'assets/projects/proje8/img_5.jpg'
    ],
    description: 'Çift kat galeri boşluklu yüksek tavanlı salonu, heykelsi tuğla şömine bacası, şeffaf asma katı ve bahçe verandasıyla lüks yaşam standardını doğayla harmanlayan müstakil villa projesi.',
    narrative: 'Geniş cam cephelerinden süzülen doğal gün ışığı, açık ahşap basamaklı çelik merdiven ve sıcak tuğla dokusu mekanın kalbini oluştururken; dış cephedeki ahşap lamel detayları yapıyı çevre peyzajla bütünleştirir.',
    details: [
      { label: 'Baş Mimar', value: 'Mimar Tuğçe POLAT' },
      { label: 'Mekan Kurgusu', value: 'Çift Kat Galeri Boşluğu & Asma Kat Yaşamı' },
      { label: 'Öne Çıkan Detay', value: 'Doğal Tuğla Kaplama Şömine & Açık Çelik Merdiven' },
      { label: 'Dış Mekan', value: 'Geniş Ahşap Veranda, Üst Kat Teras & Özel Bahçe' }
    ]
  },
  'proje9': {
    id: 'proje9',
    title: 'İskandinav Çizgili Kır Villası',
    subtitle: 'Beşik Çatı Formlu Çağdaş Doğa Evi',
    category: 'Konut & Villa',
    filterCategory: 'residential',
    location: 'İzmir, Urla',
    year: '2024',
    status: 'Projelendirildi',
    cover: 'assets/projects/proje9/img_1.jpg',
    images: [
      'assets/projects/proje9/img_1.jpg',
      'assets/projects/proje9/img_2.jpg',
      'assets/projects/proje9/img_3.jpg',
      'assets/projects/proje9/img_4.jpg',
      'assets/projects/proje9/img_5.jpg'
    ],
    description: 'Sade beşik çatı silueti, dikey ahşap cephe kaplamaları, taş şömine kulesi ve geniş bahçe verandası ile İskandinav mimari disiplinini Ege coğrafyasına uyarlayan seçkin kır konutu.',
    narrative: 'Minimalist hatlar ve doğal dokuların dengesiyle şekillenen konut; manzaraya açılan tabandan tavana cam yüzeyleri, korunaklı giriş saçakları ve yüksek enerji verimliliği sağlayan kabuk tasarımıyla dikkat çeker.',
    details: [
      { label: 'Baş Mimar', value: 'Mimar Tuğçe POLAT' },
      { label: 'Çatı & Form', value: 'Modern Beşik Çatı & Yüksek Tavan Kurgusu' },
      { label: 'Dış Cephe', value: 'Doğal Ahşap Lambriler & Taş Şömine Bacası' },
      { label: 'Peyzaj & Yaşam', value: 'Doğal Bahçe Terası, Özel Otopark & Veranda' }
    ]
  },
  'proje10': {
    id: 'proje10',
    title: 'Çağdaş Bahçeli Müstakil Malikane',
    subtitle: 'Tuğla & Ahşap Cepheli İki Katlı Lüks Villa',
    category: 'Konut & Villa',
    filterCategory: 'residential',
    location: 'İzmir, Torbalı',
    year: '2024',
    status: 'Uygulama & İnşaat',
    cover: 'assets/projects/proje10/img_1.jpg',
    images: [
      'assets/projects/proje10/img_1.jpg',
      'assets/projects/proje10/img_2.jpg',
      'assets/projects/proje10/img_3.jpg',
      'assets/projects/proje10/img_4.jpg',
      'assets/projects/proje10/img_5.jpg'
    ],
    description: 'Sıcak klinker tuğla kolonları, dikey ahşap giydirme cephesi, geniş gölgelikli zemin terası ve ferah üst kat balkonuyla müstakil yaşam konseptini yeniden tanımlayan iki katlı çağdaş villa.',
    narrative: 'İç mekanda açık plan ada mutfak ve dinlendirici kütüphaneli salon kurgusuyla bütünleşen tasarım, salonun bahçe verandasıyla birleştiği geniş cam açıklıklar sayesinde dört mevsim bahçe keyfi sunar.',
    details: [
      { label: 'Baş Mimar', value: 'Mimar Tuğçe POLAT' },
      { label: 'Cephe Malzemeleri', value: 'Klinker Pres Tuğla, Ahşap Kaplama, Taş Doku' },
      { label: 'İç Mekan Entegrasyonu', value: 'Açık Mutfak, Ada Bar, Salon & Yemek Alanı' },
      { label: 'Konfor Standartları', value: 'Çift Teras, Gölgelikli Veranda ve Geniş Peyzaj' }
    ]
  },
  'proje11': {
    id: 'proje11',
    title: 'Modüler Hafif Çelik Konut & Bungalov',
    subtitle: 'Depreme Dayanıklı Çelik Karkas Dubleks ve Loft Bungalov',
    category: 'Konut & Villa',
    filterCategory: 'residential',
    location: 'İzmir / Ege Bölgesi',
    year: '2024',
    status: 'Tip Proje & Ruhsat',
    cover: 'assets/projects/proje11/img_1.jpg',
    images: [
      'assets/projects/proje11/img_1.jpg',
      'assets/projects/proje11/img_2.jpg',
      'assets/projects/proje11/img_3.jpg',
      'assets/projects/proje11/img_4.jpg'
    ],
    description: 'Yüksek mühendislik standartlarıyla üretilen hafif çelik taşıyıcı sistem; hem beşik çatılı loft bungalov hem de geniş aileler için planlanan dubleks konut seçenekleriyle güvenli ve çağdaş çözümler sunar.',
    narrative: 'Mimari plan şemaları, kat paftaları ve 3D cephe tasarımları Tuğçe Mimarlık tarafından titizlikle hazırlanan modüler çelik projeler, hızlı imalat süresi ve üst düzey ısı yalıtımı avantajı sağlar.',
    details: [
      { label: 'Baş Mimar', value: 'Mimar Tuğçe POLAT' },
      { label: 'Taşıyıcı Sistem', value: 'Hafif Çelik Karkas Konstrüksiyon' },
      { label: 'Deprem & Güvenlik', value: 'Yüksek Sismik Direnç & A1 Sınıfı Yanmaz Yalıtım' },
      { label: 'Tipolojiler', value: 'Loft Asma Katlı Bungalov & Çift Katlı Dubleks Konut' }
    ]
  },
  'proje12': {
    id: 'proje12',
    title: 'Doğal Ahşap Detaylı Butik Rezidans',
    subtitle: '4 Katlı Prestijli Apartman ve Konut Bloğu',
    category: 'Konut & Villa',
    filterCategory: 'residential',
    location: 'İzmir, Kemalpaşa',
    year: '2024',
    status: 'Tamamlandı / İskan',
    cover: 'assets/projects/proje12/img_1.jpg',
    images: [
      'assets/projects/proje12/img_1.jpg',
      'assets/projects/proje12/img_2.jpg',
      'assets/projects/proje12/img_3.jpg',
      'assets/projects/proje12/img_4.jpg'
    ],
    description: 'Dikey masif ahşap lameller, şeffaf cam balkon korkulukları, beyaz konsol çerçeveler ve gece cephe aydınlatmasıyla Kemalpaşa siluetine değer katan 4 katlı seçkin konut kompleksi.',
    narrative: 'Köşe parsel avantajını kütle hareketleriyle vurgulayan yapı; her bağımsız bölüm için ferah balkon alanları, zemin kat otopark çözümü ve çevre peyzajıyla konforlu bir şehir yaşamı sağlar.',
    details: [
      { label: 'Baş Mimar', value: 'Mimar Tuğçe POLAT' },
      { label: 'Kat Adedi & Tipoloji', value: '4 Katlı Butik Rezidans Bloğu' },
      { label: 'Güneş Kırıcı Sistem', value: 'Dikey Ahşap Lamel Elemanları' },
      { label: 'Otopark & Çevre', value: 'Açık Otopark, Taş İstinat Duvarı ve Özel Peyzaj' }
    ]
  },
  'proje13': {
    id: 'proje13',
    title: 'İskandinav Çizgili Salon & Yaşam Alanı',
    subtitle: 'Dingin Renk Paleti ve Fonksiyonel Ada Tezgah Konsepti',
    category: 'İç Mimari & Tasarım',
    filterCategory: 'interior',
    location: 'İzmir, Kemalpaşa',
    year: '2024',
    status: 'Tamamlandı',
    cover: 'assets/projects/proje13/img_1.jpg',
    images: [
      'assets/projects/proje13/img_1.jpg',
      'assets/projects/proje13/img_2.jpg',
      'assets/projects/proje13/img_3.jpg',
      'assets/projects/proje13/img_4.jpg',
      'assets/projects/proje13/img_5.jpg'
    ],
    description: 'Açık konsept mutfak ile salonu ayıran ahşap kahvaltı barı, modern TV ve depolama ünitesi, antrasit keten perdeler ve açık meşe detaylarla tasarlanan huzurlu iç mekan projesi.',
    narrative: 'Dar alanlarda ferahlık hissini artırmak amacıyla monokrom gri tonlar, doğal ahşap sıcaklığı ve sarkıt küre aydınlatmalar bir araya getirilerek dengeli bir iç mimari atmosfer yaratılmıştır.',
    details: [
      { label: 'İç Mimar', value: 'Mimar Tuğçe POLAT' },
      { label: 'İç Mimari Tarzı', value: 'Modern İskandinav & Minimalist' },
      { label: 'Özel İmalatlar', value: 'Ada Bar Masası, Özel Kitaplık & TV Ünitesi' },
      { label: 'Aydınlatma Kurgusu', value: 'Lineer Bar Sarkıtlar & Gizli Tavan Havuzları' }
    ]
  },
  'proje14': {
    id: 'proje14',
    title: 'Geniş Verandalı Tek Katlı Kır Konutu',
    subtitle: 'Doğal Ahşap Cepheli Modern Bungalov Yaşamı',
    category: 'Konut & Villa',
    filterCategory: 'residential',
    location: 'İzmir, Kemalpaşa',
    year: '2024',
    status: 'Projelendirildi',
    cover: 'assets/projects/proje14/img_1.jpg',
    images: [
      'assets/projects/proje14/img_1.jpg',
      'assets/projects/proje14/img_2.jpg',
      'assets/projects/proje14/img_3.jpg'
    ],
    description: 'Yatay ahşap cephe kaplamaları, antrasit metal paneller, geniş kolonadlı veranda ve bahçeyle kesintisiz hemzemin ilişki kuran çağdaş tek katlı müstakil kır konutu projesi.',
    narrative: 'Merdivensiz, akıcı ve tek katlı yaşam konforunu ön planda tutan tasarım; geniş saçakları sayesinde doğrudan güneş ışığından korunan ferah terasıyla doğayla baş başa bir yaşam sunar.',
    details: [
      { label: 'Baş Mimar', value: 'Mimar Tuğçe POLAT' },
      { label: 'Konut Tipi', value: 'Tek Katlı Hemzemin Müstakil Bungalov' },
      { label: 'Cephe Karakteri', value: 'Yatay Ahşap Kaplama & Antrasit Doğramalar' },
      { label: 'Teras & Veranda', value: 'Geniş Kolonadlı Bahçe Terası ve Dinlenme Alanı' }
    ]
  }
};

// Frame Scrubbing Interpolation States
let targetProgress = 0;
let currentProgress = 0;
let lastDrawnFrameIndex = -1;

// ==========================================================================
// 1. HIGH-PERFORMANCE PRELOADER (STREAMING & MEMORY-SAFE)
// ==========================================================================
function preloadImages() {
  return new Promise((resolve) => {
    let hasResolved = false;
    const priorityThreshold = Math.min(30, frameCount);

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `frames/frame_${frameNum}.jpg`;

      const onFrameReady = () => {
        loadedCount++;
        const percent = Math.floor((loadedCount / frameCount) * 100);
        if (loaderBar) loaderBar.style.width = `${percent}%`;
        if (loaderPercent) loaderPercent.textContent = `${percent}%`;

        // Render first available frame immediately
        if (lastDrawnFrameIndex < 0 && i === 1) {
          renderFrame(0);
        }

        // Once initial priority frames are loaded, reveal page smoothly
        if (loadedCount >= priorityThreshold && !hasResolved) {
          hasResolved = true;
          finishLoading();
        }
      };

      img.onload = onFrameReady;
      img.onerror = onFrameReady;
      images.push(img);
    }

    // Safety fallback: ensure loader dismisses within 2.2s
    setTimeout(() => {
      if (!hasResolved) {
        hasResolved = true;
        finishLoading();
      }
    }, 2200);

    function finishLoading() {
      if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
        }, 500);
      }
      resolve();
    }
  });
}

// ==========================================================================
// 2. ULTRA-SMOOTH CANVAS RENDERER WITH RESILIENT FRAME BUFFER
// ==========================================================================
let targetFrameIndex = 0;
let currentFrameFloat = 0;
let isRenderLoopActive = false;

function resizeCanvas() {
  if (!canvas) return;
  const parent = canvas.parentElement;
  canvas.width = parent ? parent.clientWidth : window.innerWidth;
  canvas.height = parent ? parent.clientHeight : window.innerHeight;

  if (ctx) {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = window.innerWidth < 768 ? 'low' : 'medium';
  }
  renderFrame(lastDrawnFrameIndex >= 0 ? lastDrawnFrameIndex : 0);
}

// Fallback search to find nearest loaded frame if target is still downloading
function getBestAvailableFrame(index) {
  if (images[index] && images[index].complete && images[index].naturalWidth) {
    return images[index];
  }
  for (let offset = 1; offset < frameCount; offset++) {
    const prev = index - offset;
    if (prev >= 0 && images[prev] && images[prev].complete && images[prev].naturalWidth) {
      return images[prev];
    }
    const next = index + offset;
    if (next < frameCount && images[next] && images[next].complete && images[next].naturalWidth) {
      return images[next];
    }
  }
  return null;
}

function renderFrame(index) {
  if (!canvas || !ctx || index < 0 || index >= frameCount) return;
  const img = getBestAvailableFrame(index);
  if (!img) return;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  if (!canvasWidth || !canvasHeight) return;

  const imgWidth = img.naturalWidth || 1920;
  const imgHeight = img.naturalHeight || 1080;

  const canvasRatio = canvasWidth / canvasHeight;
  const imgRatio = imgWidth / imgHeight;

  let drawWidth, drawHeight, drawX, drawY;

  if (canvasRatio > imgRatio) {
    drawWidth = canvasWidth;
    drawHeight = canvasWidth / imgRatio;
    drawX = 0;
    drawY = (canvasHeight - drawHeight) / 2;
  } else {
    drawWidth = canvasHeight * imgRatio;
    drawHeight = canvasHeight;
    drawX = (canvasWidth - drawWidth) / 2;
    drawY = 0;
  }

  ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  currentFrameIndex = index;
  lastDrawnFrameIndex = index;
}

// 60FPS Continuous Smooth Scrub Loop (fluid lerp without skipping)
function startSmoothScrubLoop() {
  if (isRenderLoopActive) return;
  isRenderLoopActive = true;

  function scrubStep() {
    const diff = targetFrameIndex - currentFrameFloat;
    if (Math.abs(diff) > 0.02) {
      currentFrameFloat += diff * 0.35;
    } else {
      currentFrameFloat = targetFrameIndex;
    }
    const frameToDraw = Math.min(frameCount - 1, Math.max(0, Math.round(currentFrameFloat)));
    if (frameToDraw !== lastDrawnFrameIndex) {
      renderFrame(frameToDraw);
    }
    requestAnimationFrame(scrubStep);
  }
  requestAnimationFrame(scrubStep);
}

// ==========================================================================
// 3. RESPONSIVE SCROLL PROGRESS ENGINE (CONTAINER-INDEPENDENT)
// ==========================================================================
let isTicking = false;

function updateHeroScroll() {
  const pageHome = document.getElementById('page-home');
  if (!pageHome || pageHome.classList.contains('hidden')) return;
  if (!scrollSection) return;

  const rect = scrollSection.getBoundingClientRect();
  const scrollTotal = scrollSection.offsetHeight - window.innerHeight;
  if (scrollTotal <= 0) return;

  // Viewport-relative measurement: works on every device, mobile, touch, or desktop
  const scrolled = Math.max(0, Math.min(scrollTotal, -rect.top));
  const progress = scrolled / scrollTotal;

  // Update target frame for smooth interpolation loop
  targetFrameIndex = Math.min(frameCount - 1, Math.max(0, Math.round(progress * (frameCount - 1))));

  // Update Hero Text Overlay Slides
  if (progress >= 0 && progress <= 0.22) {
    activateHeroSlide(0);
  } else if (progress >= 0.25 && progress <= 0.48) {
    activateHeroSlide(1);
  } else if (progress >= 0.52 && progress <= 0.75) {
    activateHeroSlide(2);
  } else if (progress >= 0.78 && progress <= 1.0) {
    activateHeroSlide(3);
  } else {
    heroSlides.forEach((slide) => slide.classList.remove('active'));
  }
}

function activateHeroSlide(index) {
  heroSlides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });
}

function onScroll() {
  if (!isTicking) {
    window.requestAnimationFrame(() => {
      updateHeroScroll();

      // Sticky Navbar Effect
      if (navbar) {
        if (window.scrollY > 40) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }

      isTicking = false;
    });
    isTicking = true;
  }
}

// ==========================================================================
// 4. MULTI-PAGE NAVIGATION ROUTER WITH GLASS CURTAIN TRANSITION
// ==========================================================================
function navigateToPage(targetPageId, updateHash = true) {
  const targetPage = document.getElementById(`page-${targetPageId}`);
  if (!targetPage) return;

  // Trigger Curtain Animation
  curtain.classList.add('animating');

  setTimeout(() => {
    // Hide all pages, show target page
    pageViews.forEach((view) => {
      view.classList.remove('active');
      view.classList.add('hidden');
    });

    targetPage.classList.remove('hidden');
    targetPage.classList.add('active');

    // Reset Scroll Position
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (lenis) lenis.scrollTo(0, { immediate: true });

    // Update Nav Active Links
    navLinks.forEach((link) => {
      const pageAttr = link.getAttribute('data-page');
      const indicator = link.querySelector('.nav-indicator');

      if (pageAttr === targetPageId) {
        link.classList.add('active');
        if (indicator) indicator.style.transform = 'scaleX(1)';
      } else {
        link.classList.remove('active');
        if (indicator) indicator.style.transform = 'scaleX(0)';
      }
    });

    // Close Mobile Drawer if open
    closeMobileMenu();

    // If navigating to home, refresh canvas rendering
    if (targetPageId === 'home') {
      setTimeout(() => {
        resizeCanvas();
        updateHeroScroll();
      }, 50);
    }

    if (updateHash) {
      history.pushState(null, null, `#${targetPageId}`);
    }
  }, 350);

  setTimeout(() => {
    curtain.classList.remove('animating');
  }, 750);
}

// Bind Navigation Clicks
function setupNavigation() {
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetPageId = link.getAttribute('data-page');
      if (targetPageId) {
        e.preventDefault();
        navigateToPage(targetPageId);
      }
    });
  });

  // Handle Hash Routing on Initial Load & Popstate
  window.addEventListener('popstate', () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    navigateToPage(hash, false);
  });
}

// Mobile Menu Drawer Control
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });
}

function closeMobileMenu() {
  if (hamburger && mobileMenu) {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
  }
}

// ==========================================================================
// 5. FILTERABLE PORTFOLIO SYSTEM
// ==========================================================================
function setupPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      items.forEach((item) => {
        if (filter === 'all' || item.classList.contains(filter)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// ==========================================================================
// 6. INTERACTIVE PROJECT DETAIL MODAL ENGINE
// ==========================================================================
let currentModalProjectId = null;
let currentModalImageIndex = 0;

function openProjectModal(projectId) {
  const data = projectData[projectId];
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');

  if (!data || !modal || !modalContent) return;

  currentModalProjectId = projectId;
  currentModalImageIndex = 0;

  const detailsHtml = data.details
    .map(
      (d) => `
    <div class="flex flex-col border-b border-white/5 pb-2.5">
      <span class="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest mb-0.5">${d.label}</span>
      <span class="text-xs text-white">${d.value}</span>
    </div>
  `
    )
    .join('');

  const thumbsHtml = data.images
    .map(
      (imgSrc, idx) => `
    <button type="button" onclick="setModalImage(${idx})" class="modal-thumb-btn flex-shrink-0 w-20 h-14 md:w-24 md:h-16 rounded-sm overflow-hidden border-2 cursor-pointer ${
      idx === 0 ? 'border-[#C5A059] opacity-100 scale-105' : 'border-white/10 opacity-50 hover:opacity-90'
    }">
      <img src="${imgSrc}" alt="${data.title} ${idx + 1}" class="w-full h-full object-cover pointer-events-none" />
    </button>
  `
    )
    .join('');

  modalContent.innerHTML = `
    <!-- Top Header -->
    <div class="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6 pr-10">
      <div>
        <div class="inline-flex items-center gap-2 bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] text-[10px] uppercase tracking-widest px-3 py-1 mb-2 rounded-sm font-semibold">
          <i class="fa-solid fa-layer-group text-[9px]"></i>
          <span>${data.category}</span>
        </div>
        <h2 class="text-2xl md:text-4xl font-serif text-white tracking-wide">${data.title}</h2>
        <span class="text-xs font-mono text-[#A1A1AA] block mt-1">${data.subtitle} // ${data.location} // ${data.year}</span>
      </div>
      <div class="hidden sm:flex items-center gap-3">
        <span class="text-[11px] font-mono text-[#A1A1AA] px-3 py-1.5 bg-[#1A1A22] border border-white/10 rounded-sm">
          <i class="fa-solid fa-circle-check mr-1.5 text-[#C5A059] text-[10px]"></i>${data.status}
        </span>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <!-- Left: Interactive Gallery -->
      <div class="lg:col-span-7 flex flex-col gap-3">
        <!-- Main Large Image Container -->
        <div class="relative w-full aspect-[16/10] bg-[#070709] rounded-sm overflow-hidden border border-white/10 group shadow-2xl flex items-center justify-center">
          <img id="modal-main-img" src="${data.images[0]}" alt="${data.title}" class="w-full h-full object-cover transition-opacity duration-200" />
          
          <!-- Prev / Next Navigation Controls -->
          <button type="button" onclick="changeModalImage(-1)" aria-label="Önceki Görsel" class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#C5A059] text-white hover:text-black border border-white/20 hover:border-[#C5A059] flex items-center justify-center transition-all duration-200 backdrop-blur-md z-10">
            <i class="fa-solid fa-chevron-left text-xs"></i>
          </button>
          <button type="button" onclick="changeModalImage(1)" aria-label="Sonraki Görsel" class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#C5A059] text-white hover:text-black border border-white/20 hover:border-[#C5A059] flex items-center justify-center transition-all duration-200 backdrop-blur-md z-10">
            <i class="fa-solid fa-chevron-right text-xs"></i>
          </button>

          <!-- Top Image Counter Badge -->
          <div class="absolute top-3 right-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-sm border border-white/15 text-[11px] font-mono text-[#E4E4E7] flex items-center gap-1.5 z-10">
            <i class="fa-regular fa-images text-[#C5A059]"></i>
            <span id="modal-counter">1 / ${data.images.length}</span>
          </div>
        </div>

        <!-- Thumbnail Row -->
        <div class="w-full">
          <div class="flex items-center justify-between text-[11px] text-[#A1A1AA] mb-1.5 font-mono">
            <span>PROJE GÖRSELLERİ (${data.images.length})</span>
            <span class="text-[10px] text-[#71717A] hidden sm:inline">Klavyeden yön tuşlarıyla gezebilirsiniz</span>
          </div>
          <div class="modal-thumbs-track flex items-center gap-2.5 overflow-x-auto pb-2">
            ${thumbsHtml}
          </div>
        </div>
      </div>

      <!-- Right: Dossier & Specifications -->
      <div class="lg:col-span-5 flex flex-col gap-6">
        <div>
          <h3 class="text-lg font-serif text-white mb-2 flex items-center gap-2">
            <i class="fa-solid fa-pen-ruler text-xs text-[#C5A059]"></i>
            Mimari Konsept &amp; Yaklaşım
          </h3>
          <p class="text-xs md:text-sm text-[#D4D4D8] leading-relaxed mb-4 font-light">
            ${data.description}
          </p>
          <blockquote class="text-xs text-[#A1A1AA] leading-relaxed italic border-l-2 border-[#C5A059] pl-3 py-1 bg-[#141419] rounded-r-sm">
            ${data.narrative}
          </blockquote>
        </div>

        <!-- Technical Specs -->
        <div class="bg-[#141419] p-4 rounded-sm border border-white/5 space-y-3">
          <h4 class="text-xs font-serif text-white uppercase tracking-widest border-b border-[#C5A059]/30 pb-2 flex items-center justify-between">
            <span>Teknik Künye &amp; Standartlar</span>
            <span class="text-[10px] text-[#C5A059] font-mono">İzmir Kemalpaşa</span>
          </h4>
          ${detailsHtml}
        </div>

        <!-- Action Button -->
        <div>
          <button type="button" onclick="requestProjectAppointment('${data.title}')" class="w-full py-3.5 px-5 bg-[#C5A059] hover:bg-[#D4AF37] text-black text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all duration-300 shadow-[0_0_20px_rgba(197,160,89,0.25)] flex items-center justify-center gap-2 cursor-pointer">
            <span>Bu Projeye Benzer Randevu Al</span>
            <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </button>
        </div>

      </div>

    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function setModalImage(index) {
  const data = projectData[currentModalProjectId];
  if (!data || !data.images[index]) return;
  currentModalImageIndex = index;
  updateModalGallery();
}

function changeModalImage(delta) {
  const data = projectData[currentModalProjectId];
  if (!data) return;
  const total = data.images.length;
  currentModalImageIndex = (currentModalImageIndex + delta + total) % total;
  updateModalGallery();
}

function updateModalGallery() {
  const data = projectData[currentModalProjectId];
  if (!data) return;
  const mainImg = document.getElementById('modal-main-img');
  const counter = document.getElementById('modal-counter');
  if (mainImg) {
    mainImg.style.opacity = '0';
    setTimeout(() => {
      mainImg.src = data.images[currentModalImageIndex];
      mainImg.style.opacity = '1';
    }, 120);
  }
  if (counter) {
    counter.textContent = `${currentModalImageIndex + 1} / ${data.images.length}`;
  }
  const thumbs = document.querySelectorAll('.modal-thumb-btn');
  thumbs.forEach((thumb, idx) => {
    if (idx === currentModalImageIndex) {
      thumb.classList.add('border-[#C5A059]', 'opacity-100', 'scale-105');
      thumb.classList.remove('border-white/10', 'opacity-50');
      thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    } else {
      thumb.classList.remove('border-[#C5A059]', 'opacity-100', 'scale-105');
      thumb.classList.add('border-white/10', 'opacity-50');
    }
  });
}

function requestProjectAppointment(projectTitle) {
  closeProjectModal();
  navigateToPage('contact');
  setTimeout(() => {
    const textarea = document.getElementById('form-message');
    if (textarea) {
      textarea.value = `Sayın Mimar Tuğçe POLAT, "${projectTitle}" projenize benzer bir mimari tasarım ve uygulama süreci için randevu talep ediyorum.`;
      textarea.focus();
    }
  }, 450);
}

function requestServiceAppointment(serviceTitle, serviceValue) {
  navigateToPage('contact');
  setTimeout(() => {
    const select = document.getElementById('form-service');
    if (select && serviceValue) {
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === serviceValue || select.options[i].text.includes(serviceTitle)) {
          select.selectedIndex = i;
          break;
        }
      }
    }
    const textarea = document.getElementById('form-message');
    if (textarea) {
      textarea.value = `Sayın Mimar Tuğçe POLAT, "${serviceTitle}" hizmetiniz ile ilgili detaylı bilgi ve randevu talep ediyorum.`;
      textarea.focus();
    }
  }, 450);
}

const studioGalleryData = [
  {
    src: 'assets/studio/mimar_tugce_polat.jpg',
    title: 'Mimar Tuğçe POLAT',
    category: 'Stüdyo & Randevu Masası',
    desc: 'Tuğçe Mimarlık & Mühendislik kurucu mimarı Tuğçe POLAT, Kemalpaşa Ulucak stüdyosunda mimari konsept, ruhsat ve proje danışmanlığı görüşmelerini yürütmektedir.'
  },
  {
    src: 'assets/studio/ofis_vitrin.jpg',
    title: 'Stüdyo Cadde Vitrini & Proje Sergisi',
    category: 'Ofis Cephesi & Vitrin',
    desc: 'Ulucak Şehit Mustafa Akmansoy Caddesi üzerindeki ofis vitrini; tamamlanan ve projelendirilen seçkin villa ve konut projelerinin dışavurumudur.'
  },
  {
    src: 'assets/studio/mimar_calisma_alani.jpg',
    title: 'Mimari Tasarım & Projelendirme',
    category: 'Teknik Çalışma Alanı',
    desc: 'Statik hesaplar, şantiye baretleri, AutoCAD & Revit mimari yazılımları ile ruhsata esas çizimlerin ve 3D modellemelerin hazırlandığı teknik stüdyo masası.'
  },
  {
    src: 'assets/studio/ofis_tabela.jpg',
    title: 'Tuğçe Mimarlık & Mühendislik',
    category: 'Hizmet Binası & Tabela',
    desc: 'Plan, Proje, Müteahhitlik, Danışmanlık, İç Mimarlık ve Mimari Proje Ruhsatlandırma alanlarında hizmet veren resmi stüdyomuz.'
  }
];

function openStudioPhotoModal(index) {
  const photo = studioGalleryData[index];
  if (!photo) return;
  const modal = document.getElementById('project-modal');
  const content = document.getElementById('modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div class="lg:col-span-7 aspect-[4/5] sm:aspect-[4/3] bg-black rounded-sm overflow-hidden flex items-center justify-center border border-white/10">
        <img src="${photo.src}" alt="${photo.title}" class="w-full h-full object-contain" />
      </div>
      <div class="lg:col-span-5 flex flex-col justify-between">
        <div>
          <span class="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium block mb-2">${photo.category}</span>
          <h2 class="text-2xl md:text-3xl font-serif text-white mb-4">${photo.title}</h2>
          <p class="text-xs md:text-sm text-[#D4D4D8] leading-relaxed mb-6 font-light">${photo.desc}</p>
          <div class="p-4 bg-[#141419] rounded-sm border border-white/5 text-xs text-[#A1A1AA] space-y-2 font-mono">
            <p><i class="fa-solid fa-location-dot text-[#C5A059] mr-2"></i> Ulucak, Kemalpaşa / İzmir</p>
            <p><i class="fa-solid fa-phone text-[#C5A059] mr-2"></i> 0 538 371 84 32</p>
          </div>
        </div>
        <div class="mt-6 pt-6 border-t border-white/10">
          <a href="#contact" onclick="closeProjectModal()" class="w-full py-3.5 px-5 bg-[#C5A059] hover:bg-[#D4AF37] text-black text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all text-center block">
            Stüdyoda Randevu Al
          </a>
        </div>
      </div>
    </div>
  `;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Close Modal on ESC key or Arrow Navigation
window.addEventListener('keydown', (e) => {
  const modal = document.getElementById('project-modal');
  if (modal && modal.classList.contains('active')) {
    if (e.key === 'Escape') {
      closeProjectModal();
    } else if (e.key === 'ArrowLeft') {
      changeModalImage(-1);
    } else if (e.key === 'ArrowRight') {
      changeModalImage(1);
    }
  }
});

// Sanitize text against HTML tags and excessive payloads
function sanitizeInput(str, maxLength = 300) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLength);
}

// ==========================================================================
// 7. CONTACT FORM SUBMISSION & WHATSAPP REDIRECTION ENGINE
// ==========================================================================
function handleFormSubmit(event) {
  event.preventDefault();

  const name = sanitizeInput(document.getElementById('form-name')?.value || '', 100);
  const email = sanitizeInput(document.getElementById('form-email')?.value || '', 100);
  const phone = sanitizeInput(document.getElementById('form-phone')?.value || '', 40);
  const serviceSelect = document.getElementById('form-service');
  const serviceText = serviceSelect && serviceSelect.options[serviceSelect.selectedIndex] 
    ? sanitizeInput(serviceSelect.options[serviceSelect.selectedIndex].text, 80)
    : 'Mimari Tasarım & Proje';
  const message = sanitizeInput(document.getElementById('form-message')?.value || '', 500);

  // Validate phone
  if (phone.replace(/\D/g, '').length < 7) {
    alert('Lütfen geçerli bir telefon numarası giriniz.');
    document.getElementById('form-phone')?.focus();
    return;
  }

  // Construct structured professional WhatsApp message (no emojis)
  const lines = [
    'Sayın Mimar Tuğçe POLAT,',
    '',
    'Web siteniz üzerinden yeni bir mimari randevu talebi iletilmektedir:',
    '',
    `* Talep Eden: ${name}`,
    `* İletişim Numarası: ${phone}`,
    `* E-posta: ${email || 'Belirtilmedi'}`,
    `* İlgilenilen Proje Tipi: ${serviceText}`,
    `* Proje & Görüşme Detayları: ${message || 'Detaylar randevu görüşmesinde aktarılacaktır.'}`,
    '',
    'Müsaitlik durumunuza göre yüz yüze veya online ön görüşme randevusu oluşturulmasını rica ederim.'
  ];

  const waText = lines.join('\n');
  const targetPhone = '905383718432';
  const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(waText)}`;

  // Update direct link in success toast with noopener
  const directLink = document.getElementById('whatsapp-direct-link');
  if (directLink) {
    directLink.href = waUrl;
    directLink.setAttribute('rel', 'noopener noreferrer');
  }

  // Show UI toast feedback
  const successToast = document.getElementById('form-success');
  if (successToast) {
    successToast.classList.remove('hidden');
  }

  // Securely open WhatsApp in new tab (prevent tabnabbing)
  window.open(waUrl, '_blank', 'noopener,noreferrer');
}

function resetContactForm() {
  const form = document.getElementById('contact-form');
  const successToast = document.getElementById('form-success');
  if (form) form.reset();
  if (successToast) successToast.classList.add('hidden');
}

// ==========================================================================
// 8. MOBILE TOUCH GESTURES (SWIPE FOR GALLERY)
// ==========================================================================
let touchStartX = 0;
let touchEndX = 0;

function setupModalTouchGestures() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  modal.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  modal.addEventListener(
    'touchend',
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleModalSwipe();
    },
    { passive: true }
  );
}

function handleModalSwipe() {
  const swipeThreshold = 45;
  const deltaX = touchEndX - touchStartX;
  if (Math.abs(deltaX) > swipeThreshold) {
    if (deltaX < 0) {
      changeModalImage(1); // Swipe left -> Next photo
    } else {
      changeModalImage(-1); // Swipe right -> Prev photo
    }
  }
}

// ==========================================================================
// 9. SECURITY: CLICKJACKING & FRAME DEFENSE
// ==========================================================================
if (window.self !== window.top) {
  try {
    window.top.location = window.self.location;
  } catch (e) {
    document.documentElement.style.display = 'none';
  }
}

// ==========================================================================
// INITIALIZATION ON DOM LOAD
// ==========================================================================
let lastWindowWidth = window.innerWidth;
function handleResponsiveResize() {
  if (Math.abs(window.innerWidth - lastWindowWidth) > 15) {
    lastWindowWidth = window.innerWidth;
    resizeCanvas();
  }
}

function init() {
  // Preload Images & Init Systems
  preloadImages().then(() => {
    resizeCanvas();
    updateHeroScroll();
    startSmoothScrubLoop();

    // Check Initial URL Hash Navigation
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && ['home', 'projects', 'about', 'services', 'contact'].includes(initialHash)) {
      navigateToPage(initialHash, false);
    }
  });

  setupNavigation();
  setupPortfolioFilter();
  setupModalTouchGestures();

  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', handleResponsiveResize, { passive: true });
  window.addEventListener('orientationchange', resizeCanvas, { passive: true });
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
