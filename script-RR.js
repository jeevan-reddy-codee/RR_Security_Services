
/* ---------- Data ---------- */
const CAROUSEL = [
  {
    tag:"📍Bommala satram Nandyal",
    title:"Office",
    image:"./images-RR/head-RR.jpeg"
    
  },
  {
    tag:"Male security guard",
    title:"Uniformed guards",
    image:"./images-RR/Gemini-man power.png"
  },
  {
    tag:"Female Security guards",
    title:"Uniformed guards",
    image:"./images-RR/Gemini-Women.png"
  },
  {
    tag:"Bouncers",
    title:"Trained bouncers",
    image:"./images-RR/Bouncers.jpeg"
  },
];

const SERVICES_FOR = [
  {
    t:"Corporate & Office Security",
    d:"Offices and commercial complexes."
  },
  {
    t:"Residential & Societies",
    d:"Homes, apartments and gated communities."
  },
  {
    t:"Event & Function Security",
    d:"Weddings, functions and public events."
  },
  {
    t:"Industrial & Warehouses",
    d:"Gate and perimeter for factories and godowns."
  },
];
const SERVICES_STAFF = [
  {t:"Trained Male Guards",d:"Uniformed guards for every shift."},
  {t:"Women Security Staff",d:"Female guards for institutions and events."},
  {t:"Bouncers",d:"Specially Trained Bouncers."},
  {t:"Ex-Service Men",d:"Disciplined supervisors and gunmen."},
];
const CLIENTS = ["Udayananda Hospital","SPY Reddy Factory","9R Clouds","Suryan Hospital","Nandi Factory","VR Agro","KIA Showroom","S.L.N.S Function Hall"];
const GALLERY = [
  {
    tag:"PROFESSIONAL GUARDS",
    label:"Professional Site Security",
    image:"./images-RR/Guards.jpeg"
  },
  {
    tag:"EXPERTLY TRAINED",
    label:"Trained by Ex-Servicemen",
    image:"./images-RR/training.jpeg"
  },
  {
    tag:"STRICTLY SUPERVISED",
    label:"Regular Security Inspection",
    image:"./images-RR/supervise.jpeg"
  },
  {
    tag:"EMERGENCY READY",
    label:"Emergency Response Training",
    image:"./images-RR/Fire-train.jpeg"
  },
  {
    tag:"24/7 PROTECTION",
    label:"Male & Female Security Guards",
    image:"./images-RR/All-guards.jpeg"
  },
  {
    tag:"WOMEN SECURITY",
    label:"Dedicated Women Security Personnel",
    image:"./images-RR/trained-women.jpeg"
  },
];

/* =========================
   Initial Render
========================= */

document.getElementById("year").textContent = new Date().getFullYear();

const svcTpl = (s) => `
  <div class="service-card reveal">
    <h3>${s.t}</h3>
    <p>${s.d}</p>
  </div>
`;

document.getElementById("servicesFor").innerHTML =
  SERVICES_FOR.map(svcTpl).join("");

document.getElementById("servicesStaff").innerHTML =
  SERVICES_STAFF.map(svcTpl).join("");

document.getElementById("clientsGrid").innerHTML =
  CLIENTS.map(
    (c) => `
      <div class="client-logo reveal">
        ${c}
      </div>
    `
  ).join("");

document.getElementById("galleryGrid").innerHTML =
  GALLERY.map(
    (g, i) => `
      <button
        class="gallery-tile reveal"
        style="
          background-image: url('${g.image}');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        "
        data-lb="${i}"
        aria-label="Open ${g.label}"
      >
        <span class="tag">${g.tag}</span>
        <p>${g.label}</p>
      </button>
    `
  ).join("");

/* =========================
   Carousel
========================= */

document.getElementById("carouselTrack").innerHTML =
  CAROUSEL.map(
    (s) => `
      <div
        class="carousel__slide"
        style="
          background-image: url('${s.image}');
          background-size: 80%;
          background-position: center;
          background-repeat: no-repeat;
        "
      >
        <div class="carousel__inner">
          <span class="tag">${s.tag}</span>
          <h3>${s.title}</h3>
        </div>
      </div>
    `
  ).join("");

document.getElementById("carouselDots").innerHTML =
  CAROUSEL.map(
    (_, i) => `
      <button
        class="dot-btn${i === 0 ? " active" : ""}"
        data-slide="${i}"
        aria-label="Go to slide ${i + 1}"
      ></button>
    `
  ).join("");

/* =========================
   Loader
========================= */

window.addEventListener("load", () => {
  setTimeout(() => {
    document
      .getElementById("loader")
      .classList.add("loader--gone");
  }, 700);
});

setTimeout(() => {
  document
    .getElementById("loader")
    .classList.add("loader--gone");
}, 2200);

/* =========================
   Navigation
========================= */

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* ---------- Ticker ---------- */
const TICKER = ["STATUS // ON DUTY","COVERAGE // NANDYAL DISTRICT","STRENGTH // 100+ PERSONNEL","SHIFTS // 24×7 AVAILABLE","TEAM // MEN & WOMEN GUARDS"];
let ti = 0;
const tickerEl = document.getElementById("ticker");
setInterval(() => {
  ti = (ti + 1) % TICKER.length;
  tickerEl.style.opacity = 0;
  setTimeout(() => { tickerEl.textContent = TICKER[ti]; tickerEl.style.opacity = 1; }, 250);
}, 2600);
/* =========================
   Carousel Logic
========================= */

const track = document.getElementById("carouselTrack");
const dots = document.querySelectorAll(".dot-btn");

let slide = 0;
let carTimer;

function goTo(index) {
  slide = (index + CAROUSEL.length) % CAROUSEL.length;

  track.style.transform = `translateX(-${slide * 100}%)`;

  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === slide);
  });
}

function autoplay() {
  clearInterval(carTimer);

  carTimer = setInterval(() => {
    goTo(slide + 1);
  }, 4000);
}

document.getElementById("carPrev").addEventListener("click", () => {
  goTo(slide - 1);
  autoplay();
});

document.getElementById("carNext").addEventListener("click", () => {
  goTo(slide + 1);
  autoplay();
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    goTo(Number(dot.dataset.slide));
    autoplay();
  });
});

autoplay();

/* =========================
   Carousel Swipe
========================= */

let touchX = null;

const car = document.getElementById("carousel");

car.addEventListener("touchstart", (e) => {
  touchX = e.touches[0].clientX;
});

car.addEventListener("touchend", (e) => {
  if (touchX === null) return;

  const dx = e.changedTouches[0].clientX - touchX;

  if (dx > 40) {
    goTo(slide - 1);
    autoplay();
  } else if (dx < -40) {
    goTo(slide + 1);
    autoplay();
  }

  touchX = null;
});

/* =========================
   Scroll Reveal
========================= */

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  io.observe(element);
});

/* =========================
   Scroll to Top
========================= */

const topFab = document.getElementById("topFab");

window.addEventListener("scroll", () => {
  topFab.classList.toggle("fab--show", window.scrollY > 500);
});

topFab.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* =========================
   WhatsApp Floating Button
========================= */

const waMsg = encodeURIComponent(
  "Hello RR Security Services, I would like to inquire about your security services."
);

document.getElementById(
  "waFab"
).href = `https://wa.me/918075089113?text=${waMsg}`;

/* =========================
   Modal Logic
========================= */

function openModal(id) {
  document.getElementById(id).classList.add("show");
}

function closeModal(element) {
  element.classList.remove("show");
}

/* Certificate button — uncomment when certificate is ready
document.getElementById("certBtn").addEventListener("click", () => {
  openModal("certModal");
});
*/

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });

  modal.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", () => {
      closeModal(modal);
    });
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.show").forEach(closeModal);
  }
});

/* =========================
   Lightbox
========================= */

let lbIdx = 0;

const lbModal = document.getElementById("lightboxModal");
const lbImg = document.getElementById("lightboxImg");
const lbTag = document.getElementById("lightboxTag");
const lbLabel = document.getElementById("lightboxLabel");
const lbCount = document.getElementById("lbCount");

function showLb(index) {
  lbIdx = (index + GALLERY.length) % GALLERY.length;

  const g = GALLERY[lbIdx];

  lbImg.style.backgroundImage = `url('${g.image}')`;
  lbImg.style.backgroundSize = "cover";
  lbImg.style.backgroundPosition = "center";
  lbImg.style.backgroundRepeat = "no-repeat";

  lbTag.textContent = g.tag;
  lbLabel.textContent = g.label;
  lbCount.textContent = `${lbIdx + 1} / ${GALLERY.length}`;
}

document.querySelectorAll("[data-lb]").forEach((element) => {
  element.addEventListener("click", () => {
    showLb(Number(element.dataset.lb));
    openModal("lightboxModal");
  });
});

document.getElementById("lbPrev").addEventListener("click", () => {
  showLb(lbIdx - 1);
});

document.getElementById("lbNext").addEventListener("click", () => {
  showLb(lbIdx + 1);
});

document.addEventListener("keydown", (e) => {
  if (!lbModal.classList.contains("show")) return;

  if (e.key === "ArrowLeft") {
    showLb(lbIdx - 1);
  }

  if (e.key === "ArrowRight") {
    showLb(lbIdx + 1);
  }
});

/* =========================
   Quote Form
========================= */

const form = document.getElementById("quoteForm");
const formErr = document.getElementById("formErr");
const formOk = document.getElementById("formOk");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  formErr.classList.remove("show");
  formOk.classList.remove("show");

  const data = Object.fromEntries(
    new FormData(form).entries()
  );

  const name = (data.name || "").trim();
  const phone = (data.phone || "").trim();
  const need = (data.need || "").trim();

  if (name.length < 2) {
    formErr.textContent = "Please enter your name.";
    formErr.classList.add("show");
    return;
  }

  if (!/^[+\d\s\-()]{7,}$/.test(phone)) {
    formErr.textContent = "Please enter a valid phone number.";
    formErr.classList.add("show");
    return;
  }

  if (!need) {
    formErr.textContent = "Please tell us what you need.";
    formErr.classList.add("show");
    return;
  }

  const msg =
    `RR Security Services — Quote Request%0A` +
    `Name: ${encodeURIComponent(name)}%0A` +
    `Phone: ${encodeURIComponent(phone)}%0A` +
    `Requirement: ${encodeURIComponent(need)}%0A` +
    `Message: ${encodeURIComponent(data.message || "-")}`;

  window.open(`https://wa.me/918075089113?text=${msg}`, "_blank", "noopener");

  formOk.classList.add("show");
});