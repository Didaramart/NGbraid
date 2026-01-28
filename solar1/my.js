 
        // --- 1. Animation Logic (IntersectionObserver) ---
        document.addEventListener('DOMContentLoaded', () => {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px"
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.reveal-on-scroll, .zoom-in-scroll').forEach(el => {
                observer.observe(el);
            });
        });

        // --- NEW: Video Autoplay on Scroll Logic ---
        document.addEventListener('DOMContentLoaded', () => {
            const video = document.getElementById('product-video');
            if (!video) return;

            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Play the video when it enters the viewport
                        video.play().catch(error => {
                            console.log("Video autoplay was prevented:", error);
                        });
                    } else {
                        // Pause the video when it leaves the viewport
                        video.pause();
                    }
                });
            }, { threshold: 0.5 }); // Trigger when 50% of the video is visible

            videoObserver.observe(video);
        });

        // --- 2. Configuration & Data (Updated for Solar Generator) ---
        const ANNOUNCEMENTS = [
            { type: 'stock', text: 'Hurry! Only {stock} units left at this promo price!', alert: true },
            { text: "🔥 15 Customers just secured their power solution!", alert: true },
            { text: "FREE Delivery is included in the Promo Price!", initial: true },
            { text: "Stock is low! Order now to avoid disappointment.", alert: true },
            { text: "Mrs. Kemi from Abuja just ordered a Twin Pack!", initial: true },
            { text: "Mr. Samson from Lagos just ordered 2 units 3 minutes ago!", alert: true },
            { text: "A new order for the Family Pack just came in from Port Harcourt!", initial: true },
            { text: "Just In: Mrs. Aisha from Kano secured her generator!", alert: true },
            { text: "Mr. Chinedu from Enugu just placed an order for 1 unit. 5 minutes ago!", initial: true },
            { text: "Another happy customer! Order from Ibadan just confirmed.", alert: true },
            { text: "Mr. Bayo from Abeokuta just bought the Best Value pack!", initial: true },
            { text: "A customer in Kaduna just ordered. Don't miss out!", alert: true },
            { text: "Just In: Twin Pack order from a customer in Benin City!", initial: true },
            { text: "Mr. Garba from Sokoto just got his power solution!", alert: true },
            { text: "A new order was just placed from Jos, Plateau State!", initial: true },
            { text: "Mrs. Funke from Akure just ordered the Standard Pack!", alert: true },
        ];

        // Adapted package names and prices from the source site
        const OFFERS = [
            { id: 'standard1', promo: 'Buy 1 Unit', price: 120000, original: 150000, savings: 30000, description: 'Get one portable solar generator with 1 bulb attached, plus free delivery and payment on delivery.' },
            { id: 'solar2', promo: 'Buy 2 Units (Best Value)', price: 230000, original: 300000, savings: 70000, description: 'Perfect for home and office. Get two portable solar generators, each with 1 bulb attached, plus free delivery and payment on delivery. Save more!' },
            { id: 'solar3', promo: 'Buy 3 Units (Family Pack)', price: 340000, original: 450000, savings: 110000, description: 'Power for the whole family or business. Get three portable solar generators, each with 1 bulb attached, plus free delivery and payment on delivery. Maximum savings!' },
        ];
        
        const HERO_CAROUSEL_IMAGES = [
            'P5.webp', 'P2.webp', 'P1.jpg', 'P4.webp', 'Ai3.png',
        ];

        const CAROUSEL_IMAGES = [
            'Ai1.png', 'Ai2.png', 'Ai3.png', 'Ai4.png', 'Ai5.png',
            'Ai6.png', 'Ai7.png', 'Ai8.png', 'Ai9.png', 'P6.webp',
        ];

        const SPEC_CAROUSEL_IMAGES = [
            '360.WebP',
            '361.WebP',
            '362.WebP',
            '363.WebP',
            '364.WebP',
            'A10.WebP',
        ];

        const NIGERIAN_STATES = [
            "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
            "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe",
            "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
            "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto",
            "Taraba", "Yobe", "Zamfara"
        ];
        const TESTIMONIALS = [
            { text: "This generator is a lifesaver! I can finally run my fan and watch TV when NEPA fails. No noise, no fuel stress. Highly recommend!", author: "- Tunde O. (Lagos)" },
            { text: "I use the 150W + Panel bundle for my small office. It powers my laptop and bulbs for 8 hours. It paid for itself in fuel savings in two months!", author: "- Jane E. (Abuja)" },
            { text: "The delivery was fast, and the product works as advertised. Simple to use, portable, and strong. Excellent value for money.", author: "- Kunle M. (Ibadan)" },
            { text: "Ah, this thing na baba! Since I buy am, NEPA no fit hold me ransom again. My shop get light 24/7. E sharp!", author: "- Emeka P. (Onitsha)" },
            { text: "Perfect for my apartment. I can charge my phone, laptop, and even use my small blender. So convenient!", author: "- Fatima S. (Kano)" },
            { text: "The solar panel option is the best decision I made. I haven't spent a kobo on fuel in weeks. This is the future!", author: "- David A. (Port Harcourt)" },
            { text: "My brother, no be lie. This generator silent die. My neighbors no even know say I get light. I dey enjoy my peace.", author: "- Chidi B. (Enugu)" },
            { text: "I was skeptical at first, but this product is legit. It powers my 32-inch TV and a standing fan for hours. I'm impressed.", author: "- Aisha I. (Kaduna)" },
            { text: "Omo, the torchlight for this device bright well well! E be like stadium light. Very useful for night time.", author: "- Funke A. (Ogun)" },
            { text: "Best customer service. They answered all my questions before I ordered and delivery was free to Jos. Thank you!", author: "- Grace L. (Jos)" },
            { text: "I got the complete package with 4 bulbs. My entire flat is lit up now. No more darkness during my kids' study time.", author: "- Mr. & Mrs. Adewale (Oyo)" },
            { text: "If you dey find solution for this light problem, abeg, look no further. This solar generator na the real deal. E worth every penny.", author: "- Ibrahim G. (Sokoto)" },
        ];

        let currentCarouselIndex = 0;
        let carouselInterval = null; // To hold the interval for auto-play

        let selectedQuantityId = null;

        // --- 3. Utilities ---
        function formatNaira(num) {
            return num.toLocaleString('en-NG');
        }

        // --- 4. Sticky Header Logic ---
        let announcementIndex = 0;
        const announcementText = document.getElementById('announcement-text');
        const announcementBar = document.getElementById('announcement-bar');
        let stockCount = 1000;

        function rotateAnnouncement() {
            const item = ANNOUNCEMENTS[announcementIndex];
            let textToShow = item.text;

            if (item.type === 'stock') {
                const reduction = Math.floor(Math.random() * 3) + 1; // Randomly decrease by 1, 2, or 3
                textToShow = item.text.replace('{stock}', stockCount);
                stockCount -= reduction; // Decrease stock for next time it shows
                if (stockCount < 1) stockCount = 0; // Prevent negative stock

                // NEW: Also increase the sales count by the same reduction amount
                const salesCountEl = document.getElementById('sales-count');
                if (salesCountEl) {
                    const currentSales = parseInt(salesCountEl.innerText.replace(/,/g, '').replace('+', '')) || 0;
                    const newSales = currentSales + reduction;
                    salesCountEl.innerText = newSales.toLocaleString() + '+';
                }
            }
            announcementText.textContent = textToShow;
            
            if (item.alert) {
                announcementBar.className = "sticky top-0 w-full bg-yellow-400 text-red-900 font-bold text-center text-sm p-2 shadow-lg z-50 transition-colors duration-300";
            } else {
                announcementBar.className = "sticky top-0 w-full bg-red-600 text-white text-center text-sm p-2 shadow-lg z-50 transition-colors duration-300";
            }
            announcementIndex = (announcementIndex + 1) % ANNOUNCEMENTS.length;
        }

        // --- 5. Countdown Logic ---
        function startCountdown() {
            // Start from 6 hours, 20 minutes, 55 seconds (as seen on the reference site snippet)
            let totalSeconds = (6 * 3600) + (20 * 60) + 55; 
            const el = document.getElementById('countdown');
            const elInline = document.getElementById('countdown-inline');
            
            const interval = setInterval(() => {
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;
                
                const timeString = `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
                
                el.textContent = timeString;
                elInline.textContent = timeString;

                if (totalSeconds <= 0) {
                    clearInterval(interval);
                    el.textContent = "EXPIRED";
                    elInline.textContent = "EXPIRED";
                    // Optionally, disable buttons or change prices
                } else {
                    totalSeconds--;
                }
            }, 1000);
        }

        // --- 6. 3D Flip Card Carousel Logic ---
        function setupFlipCarousel() {
            const innerCard = document.getElementById('flip-card-inner');
            const frontImg = document.getElementById('flip-card-img-front');
            const backImg = document.getElementById('flip-card-img-back');
            let isFlipped = false;
            let imageIndex = 0;

            // Preload first two images
            frontImg.src = CAROUSEL_IMAGES[0];
            backImg.src = CAROUSEL_IMAGES[1];
            imageIndex = 1;

            setInterval(() => {
                // Increment index, looping back to 0 if needed
                imageIndex = (imageIndex + 1) % CAROUSEL_IMAGES.length;
                const nextImageSrc = CAROUSEL_IMAGES[imageIndex];

                if (isFlipped) {
                    // The back is showing, so we will flip to the front.
                    // Update the front image source for the next reveal.
                    frontImg.src = nextImageSrc;
                } else {
                    // The front is showing, so we will flip to the back.
                    // Update the back image source for the next reveal.
                    backImg.src = nextImageSrc;
                }
                
                innerCard.classList.toggle('is-flipped');
                isFlipped = !isFlipped;
            }, 3000); // Flip every 3 seconds
        }

        function setupHeroFlipCarousel() {
            const innerCard = document.getElementById('hero-flip-card-inner');
            const frontImg = document.getElementById('hero-flip-card-img-front');
            const backImg = document.getElementById('hero-flip-card-img-back');
            let isFlipped = false;
            let imageIndex = 0;

            // Preload first two images
            frontImg.src = HERO_CAROUSEL_IMAGES[0];
            backImg.src = HERO_CAROUSEL_IMAGES[1];
            imageIndex = 1;

            setInterval(() => {
                // Increment index, looping back to 0 if needed
                imageIndex = (imageIndex + 1) % HERO_CAROUSEL_IMAGES.length;
                const nextImageSrc = HERO_CAROUSEL_IMAGES[imageIndex];

                if (isFlipped) {
                    // The back is showing, so we will flip to the front.
                    // Update the front image source for the next reveal.
                    frontImg.src = nextImageSrc;
                } else {
                    // The front is showing, so we will flip to the back.
                    // Update the back image source for the next reveal.
                    backImg.src = nextImageSrc;
                }
                
                innerCard.classList.toggle('is-flipped');
                isFlipped = !isFlipped;
            }, 3000); // Flip every 3 seconds
        }

        // --- NEW: Spec Section Flip Card Logic ---
        function setupSpecFlipCard() {
            const innerCard = document.getElementById('spec-flip-card-inner');
            if (!innerCard) return;

            // This function simply toggles the flip class every 7 seconds.
            // The images are static as defined in the HTML.
            setInterval(() => {
                innerCard.classList.toggle('is-flipped');
            }, 7000); // Flip every 7 seconds as requested
        }

        // --- NEW: Spec Section Image Carousel Logic ---
        function setupSpecCarousel() {
            const track = document.getElementById('spec-carousel-track');
            const indicatorsContainer = document.getElementById('spec-carousel-indicators');
            if (!track || !indicatorsContainer) return;

            let currentIndex = 0;

            // Populate track and indicators
            SPEC_CAROUSEL_IMAGES.forEach((src, index) => {
                const item = document.createElement('div');
                item.className = 'carousel-item';
                item.innerHTML = `<img src="${src}" alt="Specification Carousel Image ${index + 1}" class="w-full h-full object-cover">`;
                track.appendChild(item);

                const indicator = document.createElement('button');
                indicator.className = 'carousel-indicator';
                if (index === 0) indicator.classList.add('active');
                indicatorsContainer.appendChild(indicator);
            });

            const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');

            const advanceCarousel = () => {
                currentIndex = (currentIndex + 1) % SPEC_CAROUSEL_IMAGES.length;
                track.style.transform = `translateX(-${currentIndex * 100}%)`;

                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === currentIndex);
                });
            };

            setInterval(advanceCarousel, 4000); // Change image every 4 seconds
        }


        // --- NEW: Testimonial Carousel Logic ---
        function startTestimonialCarousel() {
            const container = document.getElementById('testimonial-cards');
            let testimonialIndex = 0;

            function showNextTestimonials() {
                container.innerHTML = ''; // Clear previous cards

                // Get the next 3 testimonials, looping back if necessary
                for (let i = 0; i < 3; i++) {
                    const currentTestimonial = TESTIMONIALS[(testimonialIndex + i) % TESTIMONIALS.length];
                    
                    const card = document.createElement('div');
                    // The 'testimonial-card' class triggers the animation defined in the CSS
                    card.className = 'testimonial-card bg-white p-6 rounded-2xl shadow-lg border-t-4 border-yellow-500 flex flex-col justify-between';
                    card.innerHTML = `
                        <p class="italic text-gray-700 mb-4">"${currentTestimonial.text}"</p>
                        <p class="font-bold text-gray-900">${currentTestimonial.author}</p>
                    `;
                    container.appendChild(card);
                }
                testimonialIndex = (testimonialIndex + 3) % TESTIMONIALS.length;

                // NEW: Increment review counters when new testimonials are shown
                const reviewCountEl = document.getElementById('review-count');
                const positiveReviewsEl = document.getElementById('positive-reviews');
                if (reviewCountEl && positiveReviewsEl) {
                    reviewCountEl.innerText = (parseInt(reviewCountEl.innerText.replace(/,/g, '')) + 1).toLocaleString();
                    positiveReviewsEl.innerText = (parseInt(positiveReviewsEl.innerText.replace(/,/g, '')) + 1).toLocaleString();
                }
            }
            // Initial call after a delay, then set the interval for subsequent changes.
            setTimeout(() => {
                showNextTestimonials(); // Show the first set
                setInterval(showNextTestimonials, 10000); // Change reviews every 10 seconds thereafter
            }, 4000); // 4-second delay before the first display
        }
        // --- 7. Quantity Selection Logic ---

        // --- NEW: Live Stats Counter Logic ---
        function initializeStatsCounters() {
            // Helper function to animate counting
            const animateCounter = (el, start, end, duration) => {
                let startTimestamp = null;
                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    el.innerText = Math.floor(progress * (end - start) + start).toLocaleString();
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    }
                };
                window.requestAnimationFrame(step);
            };

            const reviewCountEl = document.getElementById('review-count');
            const salesCountEl = document.getElementById('sales-count');
            const positiveReviewsEl = document.getElementById('positive-reviews');
            const negativeReviewsEl = document.getElementById('negative-reviews');

            // Animate initial numbers
            animateCounter(reviewCountEl, 0, 2951, 2500);
            animateCounter(positiveReviewsEl, 0, 2892, 2500); // Approx 98% of 2951
            animateCounter(negativeReviewsEl, 0, 59, 2500);   // Approx 2% of 2951

            // Animate sales count separately to add the '+'
            let sales = 6000;
            animateCounter(salesCountEl, 0, sales, 2000);
            setTimeout(() => salesCountEl.innerText = sales.toLocaleString() + '+', 2000);

        }

        // --- 8. Quantity Selection Logic ---
        function renderQuantityOptions() {
            const container = document.getElementById('quantity-options');
            const modalContainer = document.getElementById('modal-quantity-options');
            container.innerHTML = '';
            modalContainer.innerHTML = '';

            OFFERS.forEach(offer => {
                // Main Page Cards
                const card = document.createElement('div');
                card.id = `qty-card-${offer.id}`;
                card.className = `quantity-card-animated bg-red-100 p-6 rounded-2xl shadow-xl border-4 border-transparent cursor-pointer hover:shadow-2xl transition-all relative overflow-hidden group text-center`;
                card.onclick = () => selectQuantity(offer.id);
                
                card.innerHTML = `
                    <div class="absolute top-0 right-0 bg-green-100 text-green-600 text-xs font-bold px-3 py-1 rounded-bl-lg">SAVE ₦${formatNaira(offer.savings)}</div>
                    <h3 class="text-xl font-bold text-gray-900 mb-1">${offer.promo}</h3>
                    <p class="text-base text-red-600 line-through">₦${formatNaira(offer.original)}</p>
                    <p class="text-4xl font-extrabold text-green-600 mb-2">₦${formatNaira(offer.price)}</p>
                    <p class="text-sm text-gray-900">${offer.description}</p>
                    <div class="inner-border absolute inset-0 border-2 border-red-500 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity pointer-events-none"></div>
                `;
                container.appendChild(card);

                // Modal Options
                const label = document.createElement('label');
                label.className = "flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-200";
                label.innerHTML = `
                    <input type="radio" name="modal_quantity" value="${offer.id}" class="text-red-600 w-5 h-5 focus:ring-red-500">
                    <div>
                        <span class="font-bold text-gray-900">${offer.promo}</span><br>
                        <span class="text-sm text-red-600">PROMO PRICE: ₦${formatNaira(offer.price)}</span>
                    </div>
                `;
                label.querySelector('input').addEventListener('change', () => updateModalSummary(offer.id));
                modalContainer.appendChild(label);
            });
        }

        function selectQuantity(id) {
            const isInitialLoad = selectedQuantityId === null;
            selectedQuantityId = id;
            // Clear highlights
            document.querySelectorAll('#quantity-selection-section > div > div').forEach(c => {
                c.classList.remove('quantity-highlight');
                c.classList.add('bg-red-100');
            });
            // Add highlight
            const activeCard = document.getElementById(`qty-card-${id}`);
            activeCard.classList.add('quantity-highlight');
            
            // Update Form 2
            const offer = OFFERS.find(o => o.id === id);
            document.getElementById('form-2-quantity-id').value = offer.promo;
            document.getElementById('form-2-price-total').value = offer.price;
            document.getElementById('selected-qty-summary-final').innerHTML = 
                `You selected: <span class="font-bold text-red-600">${offer.promo}</span> (Total Price: ₦${formatNaira(offer.price)})`;

            // NEW: Scroll to the final order form, but not on the initial page load
            if (!isInitialLoad) {
                document.getElementById('final-order-form-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        // --- 8. Modal Logic ---
        // --- 9. Modal Logic ---
        function openModal(source) {
            document.getElementById('form-1-source').value = source;
            document.getElementById('order-modal').classList.remove('hidden');
            if (selectedQuantityId) {
                const radio = document.querySelector(`input[name="modal_quantity"][value="${selectedQuantityId}"]`);
                if(radio) {
                    radio.checked = true;
                    updateModalSummary(selectedQuantityId);
                }
            } else {
                // If nothing is selected, default to the first option in the modal
                updateModalSummary(OFFERS[0].id);
            }
        }

        function updateModalSummary(id) {
            const offer = OFFERS.find(o => o.id === id);
            document.getElementById('modal-total-price').textContent = formatNaira(offer.price);
            document.getElementById('form-1-quantity-id').value = offer.promo;
            document.getElementById('form-1-price-total').value = offer.price;
        }

        function closeModal(e) {
            if (e.target.id === 'order-modal' || e.target.id === 'review-modal' || e.target.id === 'thank-you-modal') {
                document.getElementById('order-modal').classList.add('hidden');
                document.getElementById('review-modal').classList.add('hidden');
                document.getElementById('thank-you-modal').classList.add('hidden');
            }
        }

        function toggleDarkMode() {
            document.body.classList.toggle('dark');
            document.getElementById('sun-icon').classList.toggle('hidden');
            document.getElementById('moon-icon').classList.toggle('hidden');
        }

        // --- NEW: Function to populate state dropdowns ---
        function populateStateDropdowns() {
            const dropdowns = [document.getElementById('form-1-state-dropdown'), document.getElementById('form-2-state-dropdown')];
            dropdowns.forEach(dropdown => {
                if (!dropdown) return;
                dropdown.innerHTML = '<option value="">-- Select Your State --</option>'; // Add a placeholder
                NIGERIAN_STATES.forEach(state => {
                    const option = document.createElement('option');
                    option.value = state;
                    option.textContent = state;
                    dropdown.appendChild(option);
                });
            });
        }
        // --- NEW: Function to Open Review Modal ---
        function openReviewModal() {
            document.getElementById('review-modal').classList.remove('hidden');
        }

        // --- NEW: Reusable Text-to-Speech Function ---
        function speakText(textToSpeak) {
            // Check for browser support for Speech Synthesis
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(textToSpeak);
                utterance.rate = 0.9; // Slightly slower for clarity
                utterance.pitch = 1.1;

                const setVoiceAndSpeak = () => {
                    const voices = speechSynthesis.getVoices();
                    // Find a female voice. The names can vary by browser/OS.
                    let femaleVoice = voices.find(voice => voice.name.includes('Female')) || 
                                      voices.find(voice => voice.name.includes('Google UK English Female')) ||
                                      voices.find(voice => voice.name.includes('Zira')) ||
                                      voices.find(voice => voice.lang.startsWith('en-') && voice.name.includes('Female'));

                    if (femaleVoice) {
                        utterance.voice = femaleVoice;
                        speechSynthesis.speak(utterance); // Only speak if a female voice is found
                    }
                };

                // The voices list loads asynchronously.
                speechSynthesis.onvoiceschanged = setVoiceAndSpeak;
                setVoiceAndSpeak(); // Also call it directly in case voices are already loaded.
            }
        }
        // --- NEW: Welcome Greeting Logic ---
        function handleWelcomeSequence() {
            const welcomeText = "Welcome! Your reliable power solution is just a moment away...";

            const playWelcomeMessage = () => {
                try {
                    // Check for browser support and ensure it's not already speaking
                    if ('speechSynthesis' in window && !speechSynthesis.speaking) {
                        speakText(welcomeText);
                    }
                } catch (error) {
                    console.error("TTS playback failed:", error);
                }
            };

            // Attempt to play on various user interactions
            const tryToPlay = () => {
                playWelcomeMessage();
                // Remove listeners after the first attempt
                window.removeEventListener('touchstart', tryToPlay);
                window.removeEventListener('click', tryToPlay);
                window.removeEventListener('scroll', tryToPlay);
            };

            window.addEventListener('touchstart', tryToPlay, { passive: true });
            window.addEventListener('click', tryToPlay);
            window.addEventListener('scroll', tryToPlay, { passive: true });
        }
        // --- NEW: Floating Cart Button Logic ---
        function setupFloatingCartButton() {
            const floatingBtn = document.getElementById('floating-cart-btn');
            const finalFormSection = document.getElementById('final-order-form-section');
            let isBackToTopMode = false;

            if (!floatingBtn || !finalFormSection) return;

            // Click handler
            floatingBtn.addEventListener('click', () => {
                if (isBackToTopMode) {
                    // Scroll to top
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    // Scroll to final order form
                    finalFormSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });

            // Observer to change button function
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        floatingBtn.innerHTML = '⬆️';
                        floatingBtn.title = 'Back to Top';
                        isBackToTopMode = true;
                    } else {
                        floatingBtn.innerHTML = '🛒';
                        floatingBtn.title = 'Go to Order Form';
                        isBackToTopMode = false;
                    }
                });
            }, { threshold: 0.4 }); // Trigger when 40% of the form is visible

            observer.observe(finalFormSection);
        }

        // --- Init ---
        window.onload = function() {
            handleWelcomeSequence(); // Start the welcome sequence
            populateStateDropdowns();
            renderQuantityOptions();
            setupFlipCarousel();
            setupSpecCarousel();
            setupSpecFlipCard();
            setupHeroFlipCarousel();
            setupFloatingCartButton(); // Initialize the new floating button
            rotateAnnouncement();
            startTestimonialCarousel();

            initializeStatsCounters();
            setInterval(rotateAnnouncement, 8000); // Increased from 4s to 8s
            startCountdown();
            selectQuantity('standard1'); // Default select the cheapest package
            
            // Handle Form Submission (Formspree Redirect)
            const handleFormSubmission = (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                let isValid = true;
                let selectedId = form.id === 'form-1-submission' 
                    ? document.querySelector('#modal-quantity-options input[name="modal_quantity"]:checked')?.value 
                    : selectedQuantityId;

                form.querySelectorAll('input[required], textarea[required]').forEach(input => {
                    if (!input.value) isValid = false;
                });
                
                if (!selectedId) {
                    isValid = false;
                    // For the modal form, ensure visual feedback
                    if(form.id === 'form-1-submission') {
                         document.getElementById('modal-quantity-options').style.border = '2px solid red';
                         setTimeout(() => document.getElementById('modal-quantity-options').style.border = 'none', 1500);
                    } else {
                        document.getElementById('quantity-selection-section').scrollIntoView({behavior: 'smooth'});
                    }
                }

                if (!isValid) {
                    console.error("Please fill all required fields and select a package.");
                    return;
                }
                
                // Process submission (Formspree example is retained)
                const formData = new FormData(form);
                fetch(form.action, {
                    method: "POST",
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                }).then(response => {
                    if (response.ok) {
                        // Determine delivery time based on state
                        const state = formData.get('Delivery State');
                        const isLagosOrAbuja = state === 'Lagos' || state === 'FCT - Abuja';
                        const deliveryEstimate = isLagosOrAbuja 
                            ? 'Delivery within Lagos and Abuja takes 1-2 business days.' 
                            : 'Delivery to other states takes 2-3 business days.';

                        // Construct the full message
                        const thankYouMessage = `Thank you for your order! Our customer care will contact you shortly to confirm your details. ${deliveryEstimate}`;
                        
                        // Populate and show the thank you modal
                        const thankYouContent = document.getElementById('thank-you-message-content');
                        thankYouContent.innerHTML = `
                            <p>Thank you for your order! Our customer care will contact you shortly to confirm your details.</p>
                            <p class="font-bold">${deliveryEstimate}</p>
                        `;
                        document.getElementById('thank-you-modal').classList.remove('hidden');
                        
                        // Speak the confirmation message
                        speakText(thankYouMessage);

                        // Reset the form
                        form.reset();
                        document.getElementById('order-modal').classList.add('hidden'); // Close order modal if open
                    } else {
                        alert("There was a problem with your submission. Please try again.");
                    }
                }).catch(error => {
                    alert("There was a network problem. Please check your connection and try again.");
                });
            };
            
            document.getElementById('form-1-submission').addEventListener('submit', handleFormSubmission);
            document.getElementById('form-2-submission').addEventListener('submit', handleFormSubmission);

            // --- NEW: Review Form Submission Logic ---
            document.getElementById('review-form').addEventListener('submit', (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const thankYouMessage = document.getElementById('review-thank-you');
                const formData = new FormData(form);

                fetch(form.action, {
                    method: "POST",
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                }).then(response => {
                    if (response.ok) {
                        // Show thank you message
                        thankYouMessage.classList.remove('hidden');

                        // Speak the thank you message
                        speakText(thankYouMessage.textContent);
                        
                        // Reset form and hide message after a delay
                        setTimeout(() => {
                            form.reset();
                            thankYouMessage.classList.add('hidden');
                            document.getElementById('review-modal').classList.add('hidden'); // Close modal
                        }, 4000); // 4-second delay
                    } else {
                        alert("There was a problem submitting your feedback. Please try again.");
                    }
                }).catch(error => {
                    alert("A network error occurred. Please check your connection and try again.");
                });
            });

            // --- NEW: FAQ Accordion Logic ---
            document.querySelectorAll('.faq-question').forEach(button => {
                button.addEventListener('click', () => {
                    const faqItem = button.parentElement;
                    const icon = button.querySelector('.faq-icon');

                    faqItem.classList.toggle('active');

                    if (faqItem.classList.contains('active')) {
                        icon.textContent = '−'; // Minus sign
                    } else {
                        icon.textContent = '+'; // Plus sign
                    }
                });
            });
        };
    