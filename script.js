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
    area: '185 m²',
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
  'proje2': {
    id: 'proje2',
    title: 'Modern Kent Rezidansı',
    subtitle: '5 Katlı Çağdaş Kentsel Apartman Mimarisi',
    category: 'Konut & Villa',
    filterCategory: 'residential',
    location: 'İzmir, Kemalpaşa',
    area: '1.850 m²',
    year: '2024',
    status: 'Ruhsat & Projelendirme',
    cover: 'assets/projects/proje2/img_3.jpg',
    images: [
      'assets/projects/proje2/img_3.jpg',
      'assets/projects/proje2/img_1.jpg',
      'assets/projects/proje2/img_2.jpg',
      'assets/projects/proje2/img_4.jpg'
    ],
    description: 'Yalın prizmatik kütle dengesi, dikey ahşap lamel detayları ve cam balkonlarıyla kentsel dokuya değer katan 5 katlı çağdaş konut binası.',
    narrative: 'Kentsel yaşamın temposuna ferah ve aydınlık yaşam alanları sunan proje; zemin kattaki fonksiyonel otopark çözümü, geniş pencere açıklıkları ve cepheye ritim katan gölgelendirme elemanlarıyla estetik ve işlevselliği harmanlar.',
    details: [
      { label: 'Baş Mimar', value: 'Mimar Tuğçe POLAT' },
      { label: 'Kat Düzeni', value: 'Zemin Otopark + 4 Konut Katı' },
      { label: 'Daire Tipleri', value: '2+1 ve 3+1 Ferah Konfor Daireleri' },
      { label: 'Cephe Karakteri', value: 'Ahşap Lameller, Kompakt Panel ve Şeffaf Cam Korkuluk' }
    ]
  },
  'proje3': {
    id: 'proje3',
    title: 'Murat Bey İnşaat Prestij Kompleksi',
    subtitle: 'Cephe Aydınlatmalı Ticari & Karma Konut Projesi',
    category: 'Ticari & Ofis',
    filterCategory: 'commercial',
    location: 'İzmir, Kemalpaşa',
    area: '3.200 m²',
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
    area: '420 m²',
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
      { label: 'Açık Alanlar', value: '40 m² Yüzme Havuzu, Güneşlenme Terası, Özel Bahçe' },
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
    area: '2.100 m²',
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

        // Once initial frames are loaded, let user enter to avoid mobile stall
        if (loadedCount >= priorityThreshold && !hasResolved) {
          hasResolved = true;
          finishLoading();
        }
      };

      img.onload = onFrameReady;
      img.onerror = onFrameReady;
      images.push(img);
    }

    // Safety fallback: ensure loader dismisses within 2.2s on mobile connections
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
// 2. ULTRA-SMOOTH CANVAS RENDERER WITH LERP INTERPOLATION
// ==========================================================================
let targetFrameIndex = 0;
let currentFrameFloat = 0;
let isRenderLoopActive = false;

function resizeCanvas() {
  if (!canvas) return;
  // Cap resolution to avoid massive VRAM usage on 3x Retina mobile displays
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (ctx) {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = window.innerWidth < 768 ? 'low' : 'medium';
  }
  renderFrame(lastDrawnFrameIndex >= 0 ? lastDrawnFrameIndex : 0);
}

function renderFrame(index) {
  if (!canvas || !ctx || index < 0 || index >= frameCount) return;
  const img = images[index];
  if (!img || !img.complete || !img.naturalWidth) return;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const imgWidth = img.naturalWidth || 1920;
  const imgHeight = img.naturalHeight || 1080;

  const canvasRatio = canvasWidth / canvasHeight;
  const imgRatio = imgWidth / imgHeight;

  if (canvasWidth < 768 && canvasRatio < 1) {
    // ========================================================================
    // MOBILE PORTRAIT: CINEMATIC 16:9 FULL-FIT + AMBIENT LUXURY GLOW
    // ========================================================================
    // 1. Deep solid backdrop
    ctx.fillStyle = '#0A0A0C';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // 2. Ambient light bleed (soft video reflection in background)
    const bgScale = canvasHeight / imgHeight;
    const bgWidth = imgWidth * bgScale;
    const bgX = (canvasWidth - bgWidth) / 2;
    ctx.globalAlpha = 0.22;
    ctx.drawImage(img, bgX, 0, bgWidth, canvasHeight);
    ctx.globalAlpha = 1.0;

    // Dark gradient over ambient to preserve contrast
    const grad = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    grad.addColorStop(0, 'rgba(10, 10, 12, 0.85)');
    grad.addColorStop(0.35, 'rgba(10, 10, 12, 0.35)');
    grad.addColorStop(0.65, 'rgba(10, 10, 12, 0.7)');
    grad.addColorStop(1, 'rgba(10, 10, 12, 0.98)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // 3. Pristine, 100% complete 16:9 video frame in the optimal viewing area
    // Reserved space: 70px top navbar, 230px bottom text card
    const topReserved = 70;
    const bottomReserved = 230;
    const availHeight = Math.max(180, canvasHeight - topReserved - bottomReserved);

    let mainWidth = canvasWidth;
    let mainHeight = canvasWidth / imgRatio;

    if (mainHeight > availHeight) {
      mainHeight = availHeight;
      mainWidth = availHeight * imgRatio;
    }

    const mainX = (canvasWidth - mainWidth) / 2;
    const mainY = topReserved + (availHeight - mainHeight) / 2;

    // Render sharp video frame without any cropping
    ctx.drawImage(img, mainX, mainY, mainWidth, mainHeight);

    // Subtle luxury gold border accent
    ctx.strokeStyle = 'rgba(197, 160, 89, 0.35)';
    ctx.lineWidth = 1;
    ctx.strokeRect(mainX, mainY, mainWidth, mainHeight);

  } else {
    // ========================================================================
    // DESKTOP & LANDSCAPE: IMMERSIVE FULL-BLEED COVER
    // ========================================================================
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
  }

  currentFrameIndex = index;
  lastDrawnFrameIndex = index;
}

// 60FPS Continuous Smooth Scrub Loop (avoids jank on mobile inertia swipes)
function startSmoothScrubLoop() {
  if (isRenderLoopActive) return;
  isRenderLoopActive = true;

  function scrubStep() {
    const diff = targetFrameIndex - currentFrameFloat;
    if (Math.abs(diff) > 0.05) {
      // Snappy and fluid interpolation coefficient
      currentFrameFloat += diff * 0.35;
      const frameToDraw = Math.min(frameCount - 1, Math.max(0, Math.round(currentFrameFloat)));
      if (frameToDraw !== lastDrawnFrameIndex) {
        renderFrame(frameToDraw);
      }
    }
    requestAnimationFrame(scrubStep);
  }
  requestAnimationFrame(scrubStep);
}

// ==========================================================================
// 3. RESPONSIVE SCROLL PROGRESS ENGINE
// ==========================================================================
let isTicking = false;

function updateHeroScroll() {
  const pageHome = document.getElementById('page-home');
  if (!pageHome || pageHome.classList.contains('hidden')) return;
  if (!scrollSection) return;

  const scrollTotal = scrollSection.offsetHeight - window.innerHeight;
  if (scrollTotal <= 0) return;

  const currentScroll = window.scrollY;
  let progress = currentScroll / scrollTotal;
  progress = Math.max(0, Math.min(1, progress));

  // Update target frame for smooth interpolation loop
  targetFrameIndex = Math.min(frameCount - 1, Math.max(0, Math.floor(progress * frameCount)));

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
        <span class="text-[11px] font-mono text-[#C5A059] px-3 py-1.5 bg-[#1A1A22] border border-[#C5A059]/30 rounded-sm">
          <i class="fa-solid fa-vector-square mr-1.5 text-[10px]"></i>${data.area}
        </span>
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

window.addEventListener('DOMContentLoaded', () => {
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
  window.addEventListener('resize', handleResponsiveResize, { passive: true });
  window.addEventListener('orientationchange', resizeCanvas, { passive: true });
});
