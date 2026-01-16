   // --- PRELOADER REMOVAL ---
        window.addEventListener('load', () => {
            const preloader = document.getElementById('app-preloader');
            setTimeout(() => {
                preloader.classList.add('hide');
            }, 800); 
            
            // Check for install prompt after load
            checkInstallPrompt();
        });

        // --- THEME TOGGLE LOGIC ---
        const toggle = document.getElementById('themeToggle');
        const body = document.body;
        const icon = toggle.querySelector('i');
        
        if(localStorage.getItem('marju-theme') === 'dark') {
            body.classList.add('dark-mode');
            icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
        }

        toggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            icon.classList.add('fade-out'); 
            
            if(isDark) {
                icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
            } else {
                icon.classList.replace('bi-sun-fill', 'bi-moon-fill');
            }
            localStorage.setItem('marju-theme', isDark ? 'dark' : 'light');
        });

        // --- SCROLL ANIMATIONS ---
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-el');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const hiddenElements = document.querySelectorAll('.hidden-el');
        hiddenElements.forEach((el) => observer.observe(el));


        // --- INSTALL POPUP LOGIC ---
        function checkInstallPrompt() {
            // 1. Check if we've already dismissed it this session
            if (sessionStorage.getItem('installDismissed') === 'true') return;

            // 2. Detect User Agent
            const ua = navigator.userAgent;
            const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
            const isAndroid = /Android/.test(ua);
            
            // 3. Detect if already installed (Standalone Mode)
            const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

            // 4. Logic: If mobile AND not standalone
            if ((isIOS || isAndroid) && !isStandalone) {
                const popup = document.getElementById('installPopup');
                const text = document.getElementById('installInstructions');
                
                if (isIOS) {
                    // iOS Instructions (Safari Share Button)
                    text.innerHTML = `Tap <span class="install-instruction-icon"><i class="bi bi-box-arrow-up"></i></span> then select <strong>"Add to Home Screen"</strong>`;
                } else {
                    // Android Instructions (Chrome 3 dots)
                    text.innerHTML = `Tap <span class="install-instruction-icon"><i class="bi bi-three-dots-vertical"></i></span> then select <strong>"Install App"</strong>`;
                }

                // Show with slight delay
                setTimeout(() => {
                    popup.classList.remove('slide-out');
                }, 2000);
            }
        }

        // Close Button Logic
        document.getElementById('closeInstallBtn').addEventListener('click', () => {
            const popup = document.getElementById('installPopup');
            popup.classList.add('slide-out');
            // Remember dismissal for this session
            sessionStorage.setItem('installDismissed', 'true');
        });
