/* =========================================
   HADIYA CINEMATIC BIRTHDAY EXPERIENCE
========================================= */

const photos = [
    "photos/01.jpg",
    "photos/02.jpg",
    "photos/03.jpg",
    "photos/04.jpg",
    "photos/05.jpg",
    "photos/06.jpg",
    "photos/07.jpg",
    "photos/08.jpg",
    "photos/09.jpg",
    "photos/10.jpg",
    "photos/11.jpg",
    "photos/12.jpg",
    "photos/13.jpg",
    "photos/14.jpg",
    "photos/15.jpg"
];

const captions = [
    "The beginning of something beautiful.",
    "A moment worth remembering.",
    "Some memories need no explanation.",
    "The little moments matter.",
    "A smile that stays in memory.",
    "Somewhere between then and now.",
    "Growing up, one memory at a time.",
    "The moments we never planned.",
    "A chapter worth keeping.",
    "Because ordinary days become extraordinary memories.",
    "Some things never really change.",
    "Still the same Hadiya.",
    "Another little piece of the story.",
    "Almost another year, another chapter.",
    "And this is only the beginning."
];


/* =========================================
   LOADER
========================================= */

window.addEventListener("load", () => {

    setTimeout(() => {
        document.getElementById("loader").classList.add("hide");
    }, 900);

});


/* =========================================
   STAR FIELD
========================================= */

const starCanvas = document.getElementById("stars");
const starCtx = starCanvas.getContext("2d");

let stars = [];

function resizeStars() {

    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;

}

function createStars() {

    stars = [];

    const amount = Math.min(
        180,
        Math.floor(window.innerWidth * window.innerHeight / 7000)
    );

    for (let i = 0; i < amount; i++) {

        stars.push({
            x: Math.random() * starCanvas.width,
            y: Math.random() * starCanvas.height,
            r: Math.random() * 1.2 + .15,
            a: Math.random() * .6 + .15,
            speed: Math.random() * .004 + .001
        });

    }

}

function drawStars() {

    starCtx.clearRect(
        0,
        0,
        starCanvas.width,
        starCanvas.height
    );

    stars.forEach(star => {

        star.a += star.speed;

        if (star.a > .85 || star.a < .15) {
            star.speed *= -1;
        }

        starCtx.beginPath();

        starCtx.arc(
            star.x,
            star.y,
            star.r,
            0,
            Math.PI * 2
        );

        starCtx.fillStyle =
            `rgba(255,232,210,${star.a})`;

        starCtx.fill();

    });

    requestAnimationFrame(drawStars);

}

resizeStars();
createStars();
drawStars();

window.addEventListener("resize", () => {

    resizeStars();
    createStars();

});


/* =========================================
   MUSIC
========================================= */

const music = new Audio("birthday-song.mp3");

music.loop = true;
music.volume = .72;

let musicPlaying = false;

const musicBtn = document.getElementById("musicBtn");
const musicText = document.getElementById("musicText");

function startMusic() {

    music.play()
        .then(() => {

            musicPlaying = true;
            musicText.textContent = "Playing";

        })
        .catch(() => {

            musicText.textContent = "Tap to play";

        });

}

musicBtn.addEventListener("click", () => {

    if (musicPlaying) {

        music.pause();
        musicPlaying = false;
        musicText.textContent = "Music";

    } else {

        startMusic();

    }

});


/* =========================================
   CHAPTER NAVIGATION
========================================= */

const chapters = [
    "intro",
    "photosChapter",
    "memories",
    "gifts",
    "letter",
    "doctor",
    "cake",
    "celebration",
    "final"
];

function goTo(id) {

    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================
   INTRO
========================================= */

const beginBtn = document.getElementById("beginBtn");

beginBtn.addEventListener("click", () => {

    startMusic();

    setTimeout(() => {

        goTo("photosChapter");

    }, 350);

});


/* =========================================
   PHOTO CINEMA
========================================= */

const mainPhoto = document.getElementById("mainPhoto");
const photoCurrent = document.getElementById("photoCurrent");
const photoCaption = document.getElementById("photoCaption");
const photoProgress = document.getElementById("photoProgress");

let currentPhoto = 0;

const PHOTO_DURATION = 3500;
const TRANSITION_TIME = 500;

let photoTimer = null;
let progressStart = null;
let progressFrame = null;


/*
   Preload all images
*/

photos.forEach(src => {

    const img = new Image();
    img.src = src;

});


function changePhoto(index) {

    currentPhoto = index % photos.length;

    mainPhoto.classList.add("entering");

    setTimeout(() => {

        mainPhoto.src = photos[currentPhoto];

        photoCurrent.textContent =
            String(currentPhoto + 1).padStart(2, "0");

        photoCaption.textContent =
            captions[currentPhoto];

        mainPhoto.onload = () => {

            mainPhoto.classList.remove("entering");

            mainPhoto.classList.remove("zooming");

            requestAnimationFrame(() => {

                mainPhoto.classList.add("zooming");

            });

        };

    }, TRANSITION_TIME);

}


function startPhotoProgress() {

    cancelAnimationFrame(progressFrame);

    progressStart = performance.now();

    function animate(now) {

        const elapsed = now - progressStart;

        const percentage =
            Math.min(100, (elapsed / PHOTO_DURATION) * 100);

        photoProgress.style.width =
            percentage + "%";

        if (elapsed < PHOTO_DURATION) {

            progressFrame =
                requestAnimationFrame(animate);

        }

    }

    progressFrame =
        requestAnimationFrame(animate);

}


function nextPhoto() {

    changePhoto(currentPhoto + 1);

    startPhotoProgress();

}


function startPhotoCinema() {

    clearInterval(photoTimer);

    startPhotoProgress();

    photoTimer = setInterval(() => {

        nextPhoto();

    }, PHOTO_DURATION);

}


/*
   Start automatically when photo section
   becomes visible.
*/

let photoStarted = false;

const photoObserver =
    new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (
                entry.isIntersecting &&
                !photoStarted
            ) {

                photoStarted = true;

                startPhotoCinema();

            }

        });

    }, {
        threshold: .35
    });


photoObserver.observe(
    document.getElementById("photosChapter")
);


/* =========================================
   GIFT SYSTEM
========================================= */

const giftData = [

    {
        icon: "🎁",
        title: "A tiny surprise",
        message:
            "Some gifts don't need wrapping. Sometimes a memory, a smile and a little effort are enough."
    },

    {
        icon: "🌙",
        title: "For the late nights",
        message:
            "To all those nights of studying, talking, laughing and somehow surviving the next morning."
    },

    {
        icon: "❤️",
        title: "For the bond",
        message:
            "Life changes, people grow, routines change, but some bonds quietly remain exactly where they belong."
    },

    {
        icon: "✨",
        title: "For your dreams",
        message:
            "Whatever you are dreaming about right now, keep going. The future version of you is waiting."
    },

    {
        icon: "🩺",
        title: "For Dr. Hadiya",
        message:
            "One day this little birthday website will just be a memory, and you will be looking back at it as a doctor."
    },

    {
        icon: "🎂",
        title: "The final one",
        message:
            "This one is simple: Happy Birthday, Haduu Butkii. Today is yours. Enjoy every second."
    }

];

const giftModal = document.getElementById("giftModal");
const giftIcon = document.getElementById("giftIcon");
const giftNumber = document.getElementById("giftNumber");
const giftTitle = document.getElementById("giftTitle");
const giftMessage = document.getElementById("giftMessage");
const closeGift = document.getElementById("closeGift");

document.querySelectorAll(".gift").forEach(gift => {

    gift.addEventListener("click", () => {

        const index =
            Number(gift.dataset.gift);

        const data =
            giftData[index];

        giftIcon.textContent = data.icon;

        giftNumber.textContent =
            `GIFT ${String(index + 1).padStart(2, "0")}`;

        giftTitle.textContent =
            data.title;

        giftMessage.textContent =
            data.message;

        giftModal.classList.add("show");

    });

});


closeGift.addEventListener("click", () => {

    giftModal.classList.remove("show");

});


document.querySelector(".modal-backdrop")
    .addEventListener("click", () => {

        giftModal.classList.remove("show");

    });


/* =========================================
   LETTER
========================================= */

const envelope =
    document.getElementById("envelope");

const letterContent =
    document.getElementById("letterContent");


const letterText = `Happy Birthday to my Haduu Butkii. ❤️

Do you remember that day when I touched your feet?

Since that day, I'm getting success... so obviously the credit goes to you, Devi Ji. 🙃😂

I still don't know what kind of magic you have, but please continue blessing me like this. 😂

And then there are all those childhood memories that somehow never disappear.

Like those nights when we used to stay on call till 1 AM for YK Sir's test preparation and chemistry.

At that time it felt completely normal.

Now when I think about it, those little moments are actually some of the memories I will always keep.

Aaj kal humari baatein pehle se kaafi kam hoti hain.

Life gets busy.
Studies get busy.
Everyone keeps moving forward.

But for me, you're still the same.

My Butkii.
My Billu.
My Topper.
And occasionally... my Devi Ji. 🙃😂

I know you're working hard for NEET.

There will be difficult chapters, mock tests, stressful days, long study sessions and moments when you feel like you haven't done enough.

But you don't have to become perfect overnight.

Just keep moving.

One chapter.
One question.
One test.
One day at a time.

I believe in you more than you probably realise.

And no matter how busy life gets, your annoying brother will always be somewhere cheering for you. ❤️

So today...

No chemistry.
No tests.
No NEET.
No stress.

Today is simply your day.

Happy Birthday, Haduu Butkii. 🎂❤️

May this year bring you happiness, confidence, success and, eventually, that dream you've been working so hard for.

And yes...

Thank you, Devi Ji, for my success. 🙃

Now close your eyes.

Make a wish. ✨`;


let letterOpened = false;

envelope.addEventListener("click", () => {

    if (letterOpened) return;

    letterOpened = true;

    envelope.classList.add("open");

    setTimeout(() => {

        typeLetter();

    }, 650);

});


function typeLetter() {

    let index = 0;

    letterContent.innerHTML = "";

    const timer = setInterval(() => {

        letterContent.innerHTML =
            letterText
                .slice(0, index)
                .replace(/\n/g, "<br>");

        index++;

        if (index >= letterText.length) {

            clearInterval(timer);

        }

    }, 10);

}


/* =========================================
   CAKE
========================================= */

let candlesOff = 0;

document.querySelectorAll(".candle").forEach(candle => {

    candle.addEventListener("click", () => {

        const number =
            candle.dataset.candle;

        const flame =
            document.querySelector(
                `.flame-${number}`
            );

        if (
            flame &&
            !flame.classList.contains("off")
        ) {

            flame.classList.add("off");

            candlesOff++;

        }

        if (candlesOff === 3) {

            document.getElementById(
                "candleHint"
            ).textContent =
                "Wish made. ❤️";

            setTimeout(() => {

                goTo("celebration");

                launchConfetti();

            }, 900);

        }

    });

});


/* =========================================
   CONFETTI
========================================= */

const confettiCanvas =
    document.getElementById("confetti");

const confettiCtx =
    confettiCanvas.getContext("2d");

let confettiPieces = [];

function resizeConfetti() {

    confettiCanvas.width =
        window.innerWidth;

    confettiCanvas.height =
        window.innerHeight;

}

resizeConfetti();

window.addEventListener("resize", resizeConfetti);


function createConfetti() {

    confettiPieces = [];

    for (let i = 0; i < 180; i++) {

        confettiPieces.push({

            x: Math.random() *
                confettiCanvas.width,

            y: -Math.random() *
                confettiCanvas.height,

            size: Math.random() * 7 + 3,

            speed:
                Math.random() * 5 + 3,

            rotation:
                Math.random() * Math.PI,

            rotationSpeed:
                Math.random() * .15 - .075,

            drift:
                Math.random() * 2 - 1,

            opacity: 1

        });

    }

}


function drawConfetti() {

    confettiCtx.clearRect(
        0,
        0,
        confettiCanvas.width,
        confettiCanvas.height
    );

    confettiPieces.forEach(piece => {

        piece.y += piece.speed;
        piece.x += piece.drift;

        piece.rotation +=
            piece.rotationSpeed;

        if (
            piece.y >
            confettiCanvas.height + 30
        ) {

            piece.y = -20;

        }

        confettiCtx.save();

        confettiCtx.translate(
            piece.x,
            piece.y
        );

        confettiCtx.rotate(
            piece.rotation
        );

        confettiCtx.globalAlpha =
            piece.opacity;

        confettiCtx.fillStyle =
            Math.random() > .5
                ? "#e8c98b"
                : "#d98c9d";

        confettiCtx.fillRect(
            -piece.size / 2,
            -piece.size / 2,
            piece.size,
            piece.size * 1.8
        );

        confettiCtx.restore();

    });

    requestAnimationFrame(drawConfetti);

}


function launchConfetti() {

    createConfetti();
    drawConfetti();

}


/* =========================================
   REPLAY
========================================= */

document.getElementById("replayBtn")
    .addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        currentPhoto = 0;

        mainPhoto.src =
            photos[0];

        photoCurrent.textContent = "01";

        photoCaption.textContent =
            captions[0];

        photoProgress.style.width = "0%";

        letterOpened = false;

        envelope.classList.remove("open");

        letterContent.innerHTML = "";

        candlesOff = 0;

        document.querySelectorAll(".flame")
            .forEach(flame => {

                flame.classList.remove("off");

            });

        document.getElementById(
            "candleHint"
        ).textContent =
            "Tap the candles and make a wish ✨";

        photoStarted = false;

        setTimeout(() => {

            startPhotoCinema();

            photoStarted = true;

        }, 1000);

    });


/* =========================================
   KEYBOARD SUPPORT
========================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        giftModal.classList.remove("show");

    }

    if (event.code === "Space") {

        event.preventDefault();

        if (!musicPlaying) {

            startMusic();

        }

    }

});


/* =========================================
   PHOTO ERROR HANDLING
========================================= */

mainPhoto.addEventListener("error", () => {

    photoCaption.textContent =
        "A beautiful memory.";

});


/* =========================================
   PREVENT MUSIC FROM STOPPING WHEN
   PAGE GETS FOCUSED AGAIN
========================================= */

document.addEventListener("visibilitychange", () => {

    if (
        document.visibilityState === "visible" &&
        musicPlaying
    ) {

        music.play().catch(() => {});

    }

});