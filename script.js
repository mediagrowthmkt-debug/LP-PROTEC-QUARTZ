// Variáveis globais
let currentSlide = 0;
let currentVideoIndex = 0;
let currentGallerySlide = 0;

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeSlideshow();
    initializeVideoCarousel();
    initializeGallerySlider();
    initializeForm();
    initializeHeroAndSecondaryForms();
    initializeScrollEffects();
    initializePhoneWidget();
    initializeTestimonialVideos();
    initializeHeaderAutoHideOnForm();
});

// Phone Widget
function initializePhoneWidget() {
    const popup = document.getElementById('phoneWidgetPopup');
    const closeBtn = document.getElementById('popupClose');
    
    if (!popup || !closeBtn) return;
    
    // Show popup after 8 seconds
    setTimeout(() => {
        popup.classList.add('show');
        
        // Auto-hide popup after 5 seconds
        setTimeout(() => {
            popup.classList.remove('show');
        }, 5000);
    }, 8000);
    
    // Close popup on button click
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        popup.classList.remove('show');
    });
    
    // Show popup again on widget button hover (optional UX enhancement)
    const widgetBtn = document.getElementById('phoneWidgetBtn');
    if (widgetBtn) {
        widgetBtn.addEventListener('mouseenter', () => {
            popup.classList.add('show');
        });
        
        widgetBtn.addEventListener('mouseleave', () => {
            setTimeout(() => {
                popup.classList.remove('show');
            }, 2000);
        });
    }
}

// Slideshow Hero com efeito Ken Burns
function initializeSlideshow() {
    const slides = document.querySelectorAll('.slide');
    
    if (slides.length === 0) return;
    
    const total = slides.length;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % total;
        slides[currentSlide].classList.add('active');
    }, 5000);
}

// Carousel de vídeos com controles individuais
function initializeVideoCarousel() {
    // Inicializar vídeos mobile
    const mobileVideos = document.querySelectorAll('.mobile-only .carousel-video');
    mobileVideos.forEach((video, index) => {
        video.addEventListener('ended', () => {
            resetMobileVideoOverlay(index);
        });
        video.pause();
        video.currentTime = 0;
    });
    
    // Inicializar vídeos desktop
    const desktopVideos = document.querySelectorAll('.desktop-only .desktop-video');
    desktopVideos.forEach((video, index) => {
        video.addEventListener('ended', () => {
            resetDesktopVideoOverlay(index);
        });
        video.pause();
        video.currentTime = 0;
    });
}

// Toggle play/pause para vídeo mobile
function toggleMobileVideo(videoIndex) {
    const videoContainer = document.querySelector(`.mobile-only [data-video-index="${videoIndex}"]`);
    const video = videoContainer.querySelector('.carousel-video');
    const overlay = videoContainer.querySelector('.video-overlay');
    
    if (video.paused) {
        // Pausar todos os outros vídeos mobile
        pauseAllMobileVideos();
        
        // Habilitar volume e reproduzir o vídeo selecionado
        video.muted = false;
        video.volume = 1.0;
        video.play();
        overlay.classList.add('playing');
        
        // Navegar para o vídeo se não estiver ativo
        if (videoIndex !== currentVideoIndex) {
            showVideo(videoIndex);
        }
    } else {
        // Pausar o vídeo atual
        video.pause();
        overlay.classList.remove('playing');
    }
}

// Toggle play/pause para vídeo desktop
function toggleDesktopVideo(videoIndex) {
    const desktopVideos = document.querySelectorAll('.desktop-video');
    const desktopOverlays = document.querySelectorAll('.desktop-video-overlay');
    
    const video = desktopVideos[videoIndex];
    const overlay = desktopOverlays[videoIndex];
    
    if (video.paused) {
        // Pausar todos os outros vídeos desktop
        pauseAllDesktopVideos();
        
        // Habilitar volume e reproduzir o vídeo selecionado
        video.muted = false;
        video.volume = 1.0;
        video.play();
        overlay.classList.add('playing');
    } else {
        // Pausar o vídeo atual
        video.pause();
        overlay.classList.remove('playing');
    }
}

// Versão limitada ao bloco de vídeos principal (evita conflito com testimonial)
function toggleDesktopVideoPublic(videoIndex) {
    const section = document.querySelector('.videos-section');
    if (!section) return;
    const videos = section.querySelectorAll('.desktop-video');
    const overlays = section.querySelectorAll('.desktop-video-overlay');
    const video = videos[videoIndex];
    const overlay = overlays[videoIndex];
    if (!video || !overlay) return;
    
    if (video.paused) {
        // Pausar outros vídeos do bloco
        videos.forEach((v, i) => {
            if (i !== videoIndex) {
                v.pause();
            }
        });
        overlays.forEach((o, i) => {
            if (i !== videoIndex) {
                o.classList.remove('playing');
            }
        });
        
        video.muted = false;
        video.volume = 1.0;
        video.play();
        overlay.classList.add('playing');
    } else {
        video.pause();
        overlay.classList.remove('playing');
    }
}

// Pausar todos os vídeos mobile
function pauseAllMobileVideos() {
    const mobileVideos = document.querySelectorAll('.mobile-only .carousel-video');
    const mobileOverlays = document.querySelectorAll('.mobile-only .video-overlay');
    
    mobileVideos.forEach(video => {
        video.pause();
    });
    
    mobileOverlays.forEach(overlay => {
        overlay.classList.remove('playing');
    });
}

// Pausar todos os vídeos desktop
function pauseAllDesktopVideos() {
    const desktopVideos = document.querySelectorAll('.desktop-video');
    const desktopOverlays = document.querySelectorAll('.desktop-video-overlay');
    
    desktopVideos.forEach(video => {
        video.pause();
    });
    
    desktopOverlays.forEach(overlay => {
        overlay.classList.remove('playing');
    });
}

// Resetar overlay quando vídeo mobile termina
function resetMobileVideoOverlay(videoIndex) {
    const videoContainer = document.querySelector(`.mobile-only [data-video-index="${videoIndex}"]`);
    const overlay = videoContainer.querySelector('.video-overlay');
    overlay.classList.remove('playing');
}

// Resetar overlay quando vídeo desktop termina
function resetDesktopVideoOverlay(videoIndex) {
    const desktopOverlays = document.querySelectorAll('.desktop-video-overlay');
    const overlay = desktopOverlays[videoIndex];
    overlay.classList.remove('playing');
}

// Mostrar vídeo específico (apenas mobile)
function showVideo(index) {
    const videoContainers = document.querySelectorAll('.mobile-only .video-container');
    const dots = document.querySelectorAll('.mobile-only .dot');
    
    // Pausar vídeo atual
    pauseAllMobileVideos();
    
    // Remover classes ativas
    videoContainers[currentVideoIndex].classList.remove('active');
    dots[currentVideoIndex].classList.remove('active');
    
    // Atualizar índice
    currentVideoIndex = index;
    
    // Adicionar classes ativas
    videoContainers[currentVideoIndex].classList.add('active');
    dots[currentVideoIndex].classList.add('active');
}

// Navegação do carrossel de vídeos (apenas mobile)
function changeVideo(direction) {
    const total = document.querySelectorAll('.mobile-only .video-container').length || 0;
    let newIndex = currentVideoIndex + direction;
    if (total > 0) {
        if (newIndex >= total) newIndex = 0;
        if (newIndex < 0) newIndex = total - 1;
    } else {
        newIndex = 0;
    }
    showVideo(newIndex);
}

// Navegar para vídeo específico pelos dots (apenas mobile)
function currentVideo(index) {
    showVideo(index - 1); // index começa em 1
}

// Gallery Slider
function initializeGallerySlider() {
    const slides = document.querySelectorAll('.gallery-slide');
    
    if (slides.length === 0) return;
    
    // Auto-advance gallery slides
    setInterval(() => {
        changeGallerySlide(1);
    }, 4000); // Troca a cada 4 segundos
}

// Navegação do gallery slider
function changeGallerySlide(direction) {
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.gallery-dot');
    
    if (slides.length === 0) return;
    
    // Remove classe ativa
    slides[currentGallerySlide].classList.remove('active');
    dots[currentGallerySlide].classList.remove('active');
    
    // Calcula próximo slide
    currentGallerySlide += direction;
    const total = slides.length;
    if (currentGallerySlide >= total) currentGallerySlide = 0;
    if (currentGallerySlide < 0) currentGallerySlide = total - 1;
    
    // Adiciona classe ativa
    slides[currentGallerySlide].classList.add('active');
    dots[currentGallerySlide].classList.add('active');
}

// Navegar para slide específico pelos dots do gallery
function currentGallerySlideByDot(index) {
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.gallery-dot');
    
    if (slides.length === 0) return;
    
    // Remove classe ativa
    slides[currentGallerySlide].classList.remove('active');
    dots[currentGallerySlide].classList.remove('active');
    
    // Define novo slide
    currentGallerySlide = index - 1; // index começa em 1
    
    // Adiciona classe ativa
    slides[currentGallerySlide].classList.add('active');
    dots[currentGallerySlide].classList.add('active');
}

// Funcionalidade do formulário
function initializeForm() {
    const form = document.getElementById('leadForm');
    const otherSpecify = document.getElementById('other-specify');
    const areaSelect = document.getElementById('area');

    // Mostrar/esconder campo "Other specify" para dropdown
    if (areaSelect && otherSpecify) {
        const updateOtherField = () => {
            if (areaSelect.value === 'Other') {
                otherSpecify.style.display = 'block';
                otherSpecify.focus();
            } else {
                otherSpecify.style.display = 'none';
                otherSpecify.value = '';
            }
        };
        areaSelect.addEventListener('change', updateOtherField);
        // Estado inicial
        updateOtherField();
    }
    
    // Validação do formulário
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitForm();
            }
        });
    }
    
    // Formatação automática do telefone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d+)/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d+)/, '($1) $2');
            }
            
            e.target.value = value;
        });
    }
}

// Inicializa formulários adicionais (HERO e disponibilidade)
function initializeHeroAndSecondaryForms() {
    // Máscara de telefone para campos extras
    const maskPhone = (input) => {
        if (!input) return;
        input.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '');
            if (v.length >= 6) {
                v = v.replace(/(\d{3})(\d{3})(\d+)/, '($1) $2-$3');
            } else if (v.length >= 3) {
                v = v.replace(/(\d{3})(\d+)/, '($1) $2');
            }
            e.target.value = v;
        });
    };

    maskPhone(document.getElementById('hero-phone'));
    maskPhone(document.getElementById('avail-phone'));

    const heroForm = document.getElementById('heroLeadForm');
    if (heroForm) {
        heroForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = heroForm.querySelector('.hero-form-submit');
            const original = submitBtn ? submitBtn.textContent : '';
            if (submitBtn) { submitBtn.textContent = 'Sending...'; submitBtn.disabled = true; }

            // Coletar campos
            const name = (document.getElementById('hero-name')?.value || '').trim();
            const phone = (document.getElementById('hero-phone')?.value || '').trim();
            const timeframe = (document.getElementById('hero-timeframe')?.value || '').trim();

            if (!name || !phone) {
                showError('Please fill in Name and Phone');
                if (submitBtn) { submitBtn.textContent = original; submitBtn.disabled = false; }
                return;
            }

            // Traffic source: pegar de UTM ou referrer (mesma lógica do formulário principal)
            const utmSource = getUrlParameter('utm_source');
            const utmMedium = getUrlParameter('utm_medium');
            const utmCampaign = getUrlParameter('utm_campaign');
            
            const currentPath = window.location.pathname.toLowerCase();
            const currentUrl = window.location.href.toLowerCase();
            
            let trafficSource = 'direct';
            
            if (currentPath.includes('google') || currentUrl.includes('google')) {
                trafficSource = 'google';
            } else if (utmSource) {
                trafficSource = utmSource;
            } else if (document.referrer) {
                try {
                    const refHost = new URL(document.referrer).hostname;
                    trafficSource = refHost;
                } catch (e) {
                    trafficSource = 'referrer';
                }
            }

            const campaignUrl = window.location.href;
            const payload = {
                name,
                phone,
                email: '',
                plataforma: trafficSource,
                question: `Timeframe: ${timeframe || 'n/a'}`,
                source: campaignUrl,
                tags: ['quartz-countertops', 'hero-form']
            };

            console.log('DEBUG - Hero Form Payload:', JSON.stringify(payload, null, 2));

            // Enviar evento para Google Analytics se disponível
            if (typeof gtag !== 'undefined') {
                try {
                    gtag('event', 'form_submit', {
                        event_category: 'engagement',
                        event_label: 'hero_form_submission'
                    });
                } catch (e) {
                    // ignore
                }
            }

            try {
                await postToWebhook(payload);
            } catch (err) {
                console.warn('Hero form webhook failed', err);
            } finally {
                setTimeout(() => {
                    window.location.href = 'thank-you.html';
                }, 300);
            }
        });
    }

    const availabilityForm = document.getElementById('availabilityForm');
    if (availabilityForm) {
        availabilityForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = availabilityForm.querySelector('.form-submit');
            const original = btn ? btn.textContent : '';
            if (btn) { btn.textContent = 'Checking...'; btn.disabled = true; }

            const name = (document.getElementById('avail-name')?.value || '').trim();
            const phone = (document.getElementById('avail-phone')?.value || '').trim();
            const city = (document.getElementById('avail-city')?.value || '').trim();
            if (!name || !phone || !city) {
                showError('Please fill in Name, Phone and City');
                if (btn) { btn.textContent = original; btn.disabled = false; }
                return;
            }

            // Traffic source: pegar de UTM ou referrer (mesma lógica do formulário principal)
            const utmSource = getUrlParameter('utm_source');
            const utmMedium = getUrlParameter('utm_medium');
            const utmCampaign = getUrlParameter('utm_campaign');
            
            const currentPath = window.location.pathname.toLowerCase();
            const currentUrl = window.location.href.toLowerCase();
            
            let trafficSource = 'direct';
            
            if (currentPath.includes('google') || currentUrl.includes('google')) {
                trafficSource = 'google';
            } else if (utmSource) {
                trafficSource = utmSource;
            } else if (document.referrer) {
                try {
                    const refHost = new URL(document.referrer).hostname;
                    trafficSource = refHost;
                } catch (e) {
                    trafficSource = 'referrer';
                }
            }

            const payload = {
                name,
                phone,
                email: '',
                plataforma: trafficSource,
                question: `City: ${city} - Check Availability`,
                source: window.location.href,
                tags: ['availability', 'quartz-countertops']
            };

            console.log('DEBUG - Availability Form Payload:', JSON.stringify(payload, null, 2));

            // Enviar evento para Google Analytics se disponível
            if (typeof gtag !== 'undefined') {
                try {
                    gtag('event', 'form_submit', {
                        event_category: 'engagement',
                        event_label: 'availability_form_submission'
                    });
                } catch (e) {
                    // ignore
                }
            }

            try {
                await postToWebhook(payload);
            } catch (err) {
                console.warn('Availability form webhook failed', err);
            } finally {
                setTimeout(() => {
                    window.location.href = 'thank-you.html';
                }, 300);
            }
        });
    }
}

// Helper para postar no webhook (suporta opcionalmente arquivo)
async function postToWebhook(payload, file) {
    const webhookUrl = 'https://hook.us2.make.com/242i9bj1u4f5jn9z4n8tp6fn7s128bn8';
    // Tenta JSON primeiro
    try {
        const resp = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            mode: 'cors',
            keepalive: true
        });
        if (resp && (resp.ok || resp.type === 'opaque')) return true;
    } catch (e) {
        // continua para fallback
    }
    // Fallback: FormData (no-cors), opcionalmente inclui arquivo
    const fd = new FormData();
    Object.keys(payload).forEach(k => fd.append(k, typeof payload[k] === 'object' ? JSON.stringify(payload[k]) : String(payload[k])));
    if (file) fd.append('photo', file, file.name);
    await fetch(webhookUrl, { method: 'POST', body: fd, mode: 'no-cors', keepalive: true });
    return true;
}

// Validação do formulário
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const areaSelect = document.getElementById('area');
    const areaValue = areaSelect ? areaSelect.value.trim() : '';
    
    // Validar campos obrigatórios
    if (!name) {
        showError('Please enter your name');
        document.getElementById('name').focus();
        return false;
    }
    
    if (!phone) {
        showError('Please enter your phone number');
        document.getElementById('phone').focus();
        return false;
    }
    
    if (!email) {
        showError('Please enter your email address');
        document.getElementById('email').focus();
        return false;
    }
    
    if (!validateEmail(email)) {
        showError('Please enter a valid email address');
        document.getElementById('email').focus();
        return false;
    }
    
    if (!areaValue) {
        showError('Please select an area you want to upgrade');
        if (areaSelect) areaSelect.focus();
        return false;
    }
    
    // Validar campo "Other" se selecionado
    const otherSpecify = document.getElementById('other-specify').value.trim();

    if (areaValue === 'Other' && !otherSpecify) {
        showError('Please specify the other area');
        document.getElementById('other-specify').focus();
        return false;
    }
    
    return true;
}

// Validar email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mostrar mensagem de erro
function showError(message) {
    // Remove erro anterior se existir
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Cria nova mensagem de erro
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        background: #ff4757;
        color: white;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        text-align: center;
        font-weight: bold;
        animation: shake 0.5s ease-in-out;
    `;
    errorDiv.textContent = message;
    
    // Adiciona no topo do formulário
    const form = document.getElementById('leadForm');
    form.insertBefore(errorDiv, form.firstChild);
    
    // Remove a mensagem após 5 segundos
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

// Mostrar mensagem de sucesso
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        background: #2ed573;
        color: white;
        padding: 20px;
        border-radius: 10px;
        margin-bottom: 20px;
        text-align: center;
        font-weight: bold;
        font-size: 18px;
    `;
    successDiv.textContent = message;
    
    const form = document.getElementById('leadForm');
    form.insertBefore(successDiv, form.firstChild);
}

// Submeter formulário
async function submitForm() {
    const submitButton = document.querySelector('.form-submit');
    const originalText = submitButton.textContent;
    const webhookUrl = 'https://hook.us2.make.com/242i9bj1u4f5jn9z4n8tp6fn7s128bn8';

    // Mostrar loading
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Coletar dados do formulário
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const area = document.getElementById('area') ? document.getElementById('area').value : '';
    const otherSpecify = document.getElementById('other-specify').value.trim();
    
    // Montar question field
    let projectType = area;
    if (area === 'Other' && otherSpecify) {
        projectType = otherSpecify;
    }

    // Traffic source: pegar de UTM ou referrer
    const utmSource = getUrlParameter('utm_source');
    const utmMedium = getUrlParameter('utm_medium');
    const utmCampaign = getUrlParameter('utm_campaign');
    
    // Se a URL contém /google ou google.html, usar "google" como plataforma
    const currentPath = window.location.pathname.toLowerCase();
    const currentUrl = window.location.href.toLowerCase();
    
    // Debug logs
    console.log('DEBUG - Current Path:', currentPath);
    console.log('DEBUG - Current URL:', currentUrl);
    console.log('DEBUG - Includes /google?', currentPath.includes('/google'));
    console.log('DEBUG - Includes google?', currentUrl.includes('google'));
    
    let trafficSource = 'direct';
    
    if (currentPath.includes('google') || currentUrl.includes('google')) {
        trafficSource = 'google';
        console.log('DEBUG - Setting trafficSource to: google');
    } else if (utmSource) {
        trafficSource = utmSource;
        console.log('DEBUG - Setting trafficSource to UTM:', utmSource);
    } else if (document.referrer) {
        try {
            const refHost = new URL(document.referrer).hostname;
            trafficSource = refHost;
            console.log('DEBUG - Setting trafficSource to referrer:', refHost);
        } catch (e) {
            trafficSource = 'referrer';
        }
    }
    
    console.log('DEBUG - Final trafficSource:', trafficSource);

    // Campaign URL completa
    const campaignUrl = window.location.href;

    // Payload no formato solicitado
    const payload = {
        name: name,
        email: email,
        phone: phone,
        plataforma: trafficSource,
        question: projectType + ' - tipo de projeto? *',
        source: campaignUrl,
        tags: ['quartz-countertops']
    };
    
    console.log('DEBUG - Payload being sent:', JSON.stringify(payload, null, 2));

    // Funções de envio
    const sendJson = () => fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'cors',
        keepalive: true
    });

    const sendFormNoCors = () => {
        const fd = new FormData();
        Object.keys(payload).forEach(key => {
            const value = payload[key];
            fd.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
        });
        return fetch(webhookUrl, {
            method: 'POST',
            body: fd,
            mode: 'no-cors',
            keepalive: true
        });
    };

    let sent = false;
    try {
        const resp = await sendJson();
        // Se CORS bloquear, resp pode ser 'opaque' em alguns casos; considerar como enviado
        sent = !!resp && (resp.ok || resp.type === 'opaque');
    } catch (err) {
        console.warn('JSON webhook send failed, trying no-cors FormData:', err);
    }

    if (!sent) {
        try {
            await sendFormNoCors();
            sent = true;
        } catch (err2) {
            console.error('Fallback no-cors send failed:', err2);
        }
    }

    // Enviar evento para Google Analytics se disponível
    if (typeof gtag !== 'undefined') {
        try {
            gtag('event', 'form_submit', {
                event_category: 'engagement',
                event_label: 'lead_form_submission'
            });
        } catch (e) {
            // ignore
        }
    }

    // Redirecionar independentemente do resultado (para boa UX)
    setTimeout(() => {
        window.location.href = 'thank-you.html';
    }, 300);

    // Caso queira reabilitar o botão se não redirecionar (fallback)
    setTimeout(() => {
        if (!document.hidden) {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }, 5000);
}

// Scroll para o formulário
function scrollToForm() {
    const formSection = document.getElementById('contact-form');
    if (formSection) {
        formSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Focus no primeiro campo após scroll
        setTimeout(() => {
            const nameInput = document.getElementById('name');
            if (nameInput) {
                nameInput.focus();
            }
        }, 800);
    }
}

// Efeitos de scroll e animações
function initializeScrollEffects() {
    // Intersection Observer para animações de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.product-card, .benefit, .trust-item, .feature-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // Header background no scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Esconder header no mobile quando o formulário estiver em foco/visível
function initializeHeaderAutoHideOnForm() {
    const header = document.querySelector('.header');
    const formSection = document.getElementById('contact-form');
    if (!header || !formSection) return;

    const mq = window.matchMedia('(max-width: 768px)');

    const applyState = (hide) => {
        if (mq.matches) {
            header.classList.toggle('mobile-slide-up', hide);
        } else {
            header.classList.remove('mobile-slide-up');
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Quando a seção de formulário entra parcialmente na viewport, esconda o header
            applyState(entry.isIntersecting);
        });
    }, {
        root: null,
        threshold: 0.15, // ao entrar ~15% do form
        rootMargin: '0px 0px 0px 0px'
    });

    observer.observe(formSection);

    // Reagir a mudanças de viewport (rotacionar/resize) para garantir estado correto
    mq.addEventListener('change', () => {
        // se sair do mobile, mostra o header
        if (!mq.matches) header.classList.remove('mobile-slide-up');
    });
}

// Função para obter parâmetros da URL (UTM tracking)
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Adicionar animação shake para mensagens de erro
const shakeAnimation = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}
`;

// Adicionar CSS de animação ao head
const style = document.createElement('style');
style.textContent = shakeAnimation;
document.head.appendChild(style);

// Preload de imagens críticas
function preloadImages() {
    const criticalImages = [
        'BLOCO 1 - Hero slideshow com overlay escuro e efeito de zoom suave (Ken Burns)/slide-001.jpg',
        'BLOCO 1 - Hero slideshow com overlay escuro e efeito de zoom suave (Ken Burns)/slide-002.jpg',
        'LOGO/logomarca-protec.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Precarregar imagens quando a página carregar
window.addEventListener('load', preloadImages);

// Lazy loading para vídeos
function initializeLazyLoading() {
    const videos = document.querySelectorAll('video');
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                video.load(); // Carrega o vídeo apenas quando visível
                videoObserver.unobserve(video);
            }
        });
    });
    
    videos.forEach(video => {
        videoObserver.observe(video);
    });
}

// Inicializar lazy loading
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Detectar cliques em botões CTA para analytics
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cta-button')) {
        // Enviar evento para Google Analytics se disponível
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cta_click', {
                event_category: 'engagement',
                event_label: e.target.textContent.trim()
            });
        }
        
        // Log para debug
        console.log('CTA clicked:', e.target.textContent.trim());
    }
});

// Função para o carousel de vídeos compatível com global scope
window.changeVideo = changeVideo;
// Expor funções globais
window.currentVideo = function(index) { currentVideo(index); };
window.scrollToForm = scrollToForm;
window.changeGallerySlide = changeGallerySlide;
window.currentGallerySlide = function(index) {
    currentGallerySlideByDot(index);
};
// Expor versão pública do toggle para seção de vídeos
window.toggleDesktopVideo = toggleDesktopVideoPublic;

// Testimonial overlay player (independente do índice global)
function initializeTestimonialVideos() {
    const players = document.querySelectorAll('.testimonial-player');
    if (!players.length) return;
    players.forEach((container) => {
        const video = container.querySelector('video');
        const overlay = container.querySelector('.desktop-video-overlay');
        if (!video || !overlay) return;
        overlay.addEventListener('click', () => {
            // Pausar outros players testimonial
            document.querySelectorAll('.testimonial-player video').forEach(v => {
                if (v !== video) v.pause();
            });
            document.querySelectorAll('.testimonial-player .desktop-video-overlay').forEach(o => {
                if (o !== overlay) o.classList.remove('playing');
            });
            if (video.paused) {
                video.muted = false;
                video.volume = 1.0;
                video.play();
                overlay.classList.add('playing');
            } else {
                video.pause();
                overlay.classList.remove('playing');
            }
        });
        video.addEventListener('ended', () => overlay.classList.remove('playing'));
    });
}