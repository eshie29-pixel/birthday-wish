// ======================================================
// CUSTOMIZE YOUR BIRTHDAY WISH
// ======================================================

// 🎂 Change the birthday person's name here
const birthdayName = "Tashdid Khan Sazid";

// 📸 Add your photo file names here
// Put the actual photos inside: assets/photos/
const photos = [
    "assets/photos/photo1.jpg",
    "assets/photos/photo2.jpg",
    "assets/photos/photo3.jpg"
];

// 🎵 Put your MP3 inside: assets/music/
const musicFile = "assets/music/my-song.mp3";

// 🎬 Put your MP4 inside: assets/videos/
const videoFile = "assets/videos/my-video.mp4";

// 💌 Write your personal birthday letter here
const birthdayLetter = `
My dearest love,

Happy Birthday to the most special person in my life. 💙

I hope your birthday is filled with happiness, beautiful moments,
and everything your heart wishes for.

You deserve all the love, happiness and beautiful things in this world.

Thank you for being such a wonderful part of my life.
May every new day bring you closer to your dreams.

Happy Birthday once again, my love. 🎂💙

Forever yours
`;


// ======================================================
// DO NOT EDIT BELOW THIS LINE
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    // --------------------------------------------------
    // BASIC ELEMENTS
    // --------------------------------------------------

    const nameElements = document.querySelectorAll(".birthday-name");

    nameElements.forEach(element => {
        element.textContent = birthdayName;
    });


    // --------------------------------------------------
    // PAGE ELEMENTS
    // --------------------------------------------------

    const pages = document.querySelectorAll(".page");

    const openingPage = document.getElementById("openingPage");
    const presentsPage = document.getElementById("presentsPage");
    const galleryPage = document.getElementById("galleryPage");
    const mediaPage = document.getElementById("mediaPage");
    const letterPage = document.getElementById("letterPage");


    // --------------------------------------------------
    // GIFT BOX
    // --------------------------------------------------

    const giftBox = document.getElementById("giftBox");
    const flowerTransition = document.getElementById("flowerTransition");

    if (giftBox) {

        giftBox.addEventListener("click", () => {

            // Prevent multiple clicks
            if (giftBox.classList.contains("opened")) return;

            giftBox.classList.add("opened");

            // Glow effect
            giftBox.classList.add("gift-glow");

            // Create confetti
            createConfetti();

            // Start flowers after a short delay
            setTimeout(() => {
                createFlowers();

                if (flowerTransition) {
                    flowerTransition.classList.add("active");
                }

            }, 700);


            // Move to presents page after flower animation
            setTimeout(() => {

                showPage(presentsPage);

                if (flowerTransition) {
                    flowerTransition.classList.remove("active");
                    flowerTransition.innerHTML = "";
                }

            }, 3300);

        });

    }


    // --------------------------------------------------
    // PAGE SWITCHING
    // --------------------------------------------------

    function showPage(page) {

        pages.forEach(currentPage => {
            currentPage.classList.remove("active");
        });

        if (page) {
            page.classList.add("active");
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }

    }


    // --------------------------------------------------
    // PRESENT CARDS
    // --------------------------------------------------

    const photoGift = document.getElementById("photoGift");
    const mediaGift = document.getElementById("mediaGift");
    const letterGift = document.getElementById("letterGift");


    if (photoGift) {
        photoGift.addEventListener("click", () => {
            showPage(galleryPage);
            loadGallery();
        });
    }


    if (mediaGift) {
        mediaGift.addEventListener("click", () => {
            showPage(mediaPage);
            loadMedia();
        });
    }


    if (letterGift) {
        letterGift.addEventListener("click", () => {
            showPage(letterPage);
            loadLetter();
        });
    }


    // --------------------------------------------------
    // BACK BUTTONS
    // --------------------------------------------------

    const backButtons = document.querySelectorAll(".back-button");

    backButtons.forEach(button => {

        button.addEventListener("click", () => {

            // Stop media when leaving media page
            const video = document.getElementById("birthdayVideo");
            const audio = document.getElementById("birthdayAudio");

            if (video) {
                video.pause();
                video.currentTime = 0;
            }

            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }

            showPage(presentsPage);

        });

    });


    // --------------------------------------------------
    // PHOTO GALLERY
    // --------------------------------------------------

    const gallery = document.getElementById("photoGallery");

    function loadGallery() {

        if (!gallery) return;

        gallery.innerHTML = "";

        if (photos.length === 0) {

            gallery.innerHTML = `
                <div class="empty-message">
                    <div>📸</div>
                    <p>No photos added yet.</p>
                </div>
            `;

            return;
        }


        photos.forEach((photo, index) => {

            const photoCard = document.createElement("button");

            photoCard.className = "photo-card";
            photoCard.type = "button";

            photoCard.innerHTML = `
                <img 
                    src="${photo}" 
                    alt="Our memory ${index + 1}"
                    loading="lazy"
                >
                <span>♡</span>
            `;


            photoCard.addEventListener("click", () => {
                openLightbox(index);
            });


            gallery.appendChild(photoCard);

        });

    }


    // --------------------------------------------------
    // LIGHTBOX
    // --------------------------------------------------

    const photoLightbox = document.getElementById("photoLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeLightbox = document.getElementById("closeLightbox");
    const previousPhoto = document.getElementById("previousPhoto");
    const nextPhoto = document.getElementById("nextPhoto");

    let currentPhotoIndex = 0;


    function openLightbox(index) {

        if (!photoLightbox || !lightboxImage) return;

        currentPhotoIndex = index;

        lightboxImage.src = photos[currentPhotoIndex];

        photoLightbox.classList.add("active");

        document.body.classList.add("no-scroll");

    }


    function closePhotoLightbox() {

        if (!photoLightbox) return;

        photoLightbox.classList.remove("active");

        document.body.classList.remove("no-scroll");

    }


    function changePhoto(direction) {

        if (photos.length === 0) return;

        currentPhotoIndex += direction;

        if (currentPhotoIndex < 0) {
            currentPhotoIndex = photos.length - 1;
        }

        if (currentPhotoIndex >= photos.length) {
            currentPhotoIndex = 0;
        }

        lightboxImage.src = photos[currentPhotoIndex];

    }


    if (closeLightbox) {
        closeLightbox.addEventListener("click", closePhotoLightbox);
    }


    if (previousPhoto) {
        previousPhoto.addEventListener("click", () => {
            changePhoto(-1);
        });
    }


    if (nextPhoto) {
        nextPhoto.addEventListener("click", () => {
            changePhoto(1);
        });
    }


    if (photoLightbox) {

        photoLightbox.addEventListener("click", event => {

            if (event.target === photoLightbox) {
                closePhotoLightbox();
            }

        });

    }


    // Keyboard controls for lightbox
    document.addEventListener("keydown", event => {

        if (!photoLightbox ||
            !photoLightbox.classList.contains("active")) {
            return;
        }

        if (event.key === "Escape") {
            closePhotoLightbox();
        }

        if (event.key === "ArrowLeft") {
            changePhoto(-1);
        }

        if (event.key === "ArrowRight") {
            changePhoto(1);
        }

    });


    // --------------------------------------------------
    // MEDIA PLAYER
    // --------------------------------------------------

    const birthdayVideo = document.getElementById("birthdayVideo");
    const birthdayAudio = document.getElementById("birthdayAudio");

    function loadMedia() {

        if (birthdayVideo) {

            birthdayVideo.src = videoFile;

            birthdayVideo.load();

        }


        if (birthdayAudio) {

            birthdayAudio.src = musicFile;

            birthdayAudio.load();

        }

    }


    // --------------------------------------------------
    // LETTER
    // --------------------------------------------------

    const letterText = document.getElementById("letterText");

    function loadLetter() {

        if (!letterText) return;

        // Convert line breaks into HTML
        letterText.innerHTML = birthdayLetter
            .trim()
            .replace(/\n/g, "<br>");

    }


    // --------------------------------------------------
    // CONFETTI
    // --------------------------------------------------

    function createConfetti() {

        const container = document.getElementById("confettiContainer");

        if (!container) return;

        const symbols = ["♡", "✦", "✧", "•", "❀", "💙"];

        for (let i = 0; i < 55; i++) {

            const piece = document.createElement("span");

            piece.className = "confetti";

            piece.textContent =
                symbols[Math.floor(Math.random() * symbols.length)];

            piece.style.left =
                Math.random() * 100 + "%";

            piece.style.animationDelay =
                Math.random() * 0.8 + "s";

            piece.style.animationDuration =
                2 + Math.random() * 2 + "s";

            piece.style.fontSize =
                10 + Math.random() * 18 + "px";

            container.appendChild(piece);

        }


        setTimeout(() => {

            container.innerHTML = "";

        }, 4500);

    }


    // --------------------------------------------------
    // FLOWERS
    // --------------------------------------------------

    function createFlowers() {

        if (!flowerTransition) return;

        const flowerSymbols = [
            "✿",
            "❀",
            "✾",
            "❁",
            "🌸",
            "♡"
        ];


        for (let i = 0; i < 65; i++) {

            const flower = document.createElement("span");

            flower.className = "bloom-flower";

            flower.textContent =
                flowerSymbols[
                    Math.floor(Math.random() * flowerSymbols.length)
                ];


            flower.style.left =
                Math.random() * 100 + "%";

            flower.style.top =
                Math.random() * 100 + "%";


            const size =
                18 + Math.random() * 50;

            flower.style.fontSize =
                size + "px";


            flower.style.animationDelay =
                Math.random() * 1.8 + "s";


            flower.style.animationDuration =
                1.4 + Math.random() * 1.5 + "s";


            flower.style.transform =
                `rotate(${Math.random() * 360}deg)`;


            flowerTransition.appendChild(flower);

        }

    }


    // --------------------------------------------------
    // TOUCH / MOBILE FRIENDLY
    // --------------------------------------------------

    document.addEventListener("touchstart", () => {}, {
        passive: true
    });


    // --------------------------------------------------
    // START ON OPENING PAGE
    // --------------------------------------------------

    showPage(openingPage);

});
