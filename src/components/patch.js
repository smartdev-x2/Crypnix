// patch.js
export function showPatchMessage() {
  // Remove any existing one
  const existing = document.querySelector(".patch-message-card");
  if (existing) existing.remove();

  // Overlay
  const overlay = document.createElement("div");
  overlay.className = "patch-overlay";

  // Card
  const card = document.createElement("div");
  card.className = "patch-message-card";
  card.innerHTML = `
    <button class="patch-close">&times;</button>
    <h2>Message</h2>

    <!-- Image Slider -->
    <div class="patch-slider">
      <div class="patch-slides">
        <img src="https://via.placeholder.com/400x180?text=Image+1" alt="slide 1">
        <img src="https://via.placeholder.com/400x180?text=Image+2" alt="slide 2">
        <img src="https://via.placeholder.com/400x180?text=Image+3" alt="slide 3">
      </div>
    </div>

    <div class="text">
      <h3>
        We are excited for you to join us! After a successful registration, please login to continue your account.<br><br>
        Act safe and avoid any form of phishing.<br>
        Keep your password private and backup your account using:<br><br>
        <strong>2FA • KYC • Email Verification</strong><br><br>
        To increase security, report any bug or suspicious activity you encounter.<br><br>
        Remember to read our Terms carefully.
      </h3>
    </div>
    <button class="patch-btn">Terms & Conditions</button>
  `;

  overlay.appendChild(card);
  document.body.appendChild(overlay);

  // --- STYLE ---
  const style = document.createElement("style");
  style.innerHTML = `
    .patch-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      backdrop-filter: blur(6px);
      animation: fadeIn 0.3s ease;
    }
    .patch-message-card {
      position: relative;
      width: 90%;
      max-width: 420px;
      background: #0f172a;
      color: #f9fafb;
      border-radius: 16px;
      padding: 1.5rem;
      box-shadow: 0 10px 25px rgba(0,0,0,0.4);
      animation: slideUp 0.4s ease;
      font-family: 'Poppins', sans-serif;
      overflow: hidden;
    }
    .patch-message-card h2 {
      text-align: center;
      margin-bottom: 0.8rem;
      color: #38bdf8;
      letter-spacing: 1px;
    }
    /* ===== Slider ===== */
    .patch-slider {
      position: relative;
      width: 100%;
      height: 180px;
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 1rem;
    }
    .patch-slides {
      display: flex;
      width: 300%;
      transition: transform 0.8s ease-in-out;
    }
    .patch-slides img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      border-radius: 12px;
    }
    /* ===== Text ===== */
    .patch-message-card .text {
      max-height: 230px;
      overflow-y: auto;
      font-size: 0.9rem;
      line-height: 1.6;
      margin-bottom: 1rem;
    }
    .patch-btn {
      background: linear-gradient(90deg, #2563eb, #1e40af);
      color: white;
      border: none;
      border-radius: 8px;
      padding: 0.6rem 1rem;
      width: 100%;
      cursor: pointer;
      font-weight: 500;
      transition: 0.3s;
    }
    .patch-btn:hover {
      background: linear-gradient(90deg, #1e3a8a, #1d4ed8);
    }
    .patch-close {
      position: absolute;
      top: 8px;
      right: 10px;
      background: transparent;
      color: #9ca3af;
      font-size: 1.4rem;
      border: none;
      cursor: pointer;
      transition: 0.3s;
    }
    .patch-close:hover {
      color: #f87171;
    }
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    @keyframes slideUp {
      from { transform: translateY(40px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  // --- SLIDER LOGIC ---
  const slides = card.querySelector(".patch-slides");
  let index = 0;
  setInterval(() => {
    index = (index + 1) % 3;
    slides.style.transform = `translateX(-${index * 100}%)`;
  }, 4000); // every 4 seconds

  // --- CLOSE & ACTION ---
  card.querySelector(".patch-close").addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });
  card.querySelector(".patch-btn").addEventListener("click", () => {
    alert("Redirecting to Terms & Conditions...");
    // window.location.href = '/terms'; // optional
  });
}