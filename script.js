// Variáveis globais
let currentSlide = 0;
let currentVideoIndex = 0;
let currentGallerySlide = 0;
const totalSlides = 4;
const totalVideos = 3;
const totalGallerySlides = 6;

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeSlideshow();
    initializeVideoCarousel();
    initializeGallerySlider();
    initializeForm();
    initializeScrollEffects();
    initializePhoneWidget();
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
    
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % totalSlides;
        slides[currentSlide].classList.add('active');
    }, 5000); // Troca a cada 5 segundos
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
    let newIndex = currentVideoIndex + direction;
    
    if (newIndex >= totalVideos) newIndex = 0;
    if (newIndex < 0) newIndex = totalVideos - 1;
    
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
    if (currentGallerySlide >= totalGallerySlides) currentGallerySlide = 0;
    if (currentGallerySlide < 0) currentGallerySlide = totalGallerySlides - 1;
    
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
    const otherRadio = document.querySelector('input[name="area"][value="Other"]');
    const otherSpecify = document.getElementById('other-specify');
    
    // Mostrar/esconder campo "Other specify" para radio buttons
    if (otherRadio && otherSpecify) {
        const allAreaRadios = document.querySelectorAll('input[name="area"]');
        
        allAreaRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'Other' && this.checked) {
                    otherSpecify.style.display = 'block';
                    otherSpecify.focus();
                } else {
                    otherSpecify.style.display = 'none';
                    otherSpecify.value = '';
                }
            });
        });
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

// Validação do formulário
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const areaSelected = document.querySelector('input[name="area"]:checked');
    
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
    
    if (!areaSelected) {
        showError('Please select an area you want to upgrade');
        return false;
    }
    
    // Validar campo "Other" se selecionado
    const otherSpecify = document.getElementById('other-specify').value.trim();
    
    if (areaSelected.value === 'Other' && !otherSpecify) {
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
    const formData = {
        name: document.getElementById('name').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        email: document.getElementById('email').value.trim(),
        area: document.querySelector('input[name="area"]:checked').value,
        other_specify: document.getElementById('other-specify').value.trim(),
    };

    // Metadados da página (fonte/link)
    const pageMeta = {
        page_url: window.location.href,
        page_path: window.location.pathname + window.location.search,
        page_title: document.title,
        referrer: document.referrer || '',
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        source: 'Landing Page - Quartz Countertop Installers',
        utm_source: getUrlParameter('utm_source') || 'direct',
        utm_medium: getUrlParameter('utm_medium') || 'website',
        utm_campaign: getUrlParameter('utm_campaign') || 'quartz-installers-landing'
    };

    const payload = { ...formData, ...pageMeta };

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
            gtag('event', 'conversion', {
                'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL'
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
window.currentVideo = function(index) {
    currentVideoByDot(index);
};
window.scrollToForm = scrollToForm;
window.changeGallerySlide = changeGallerySlide;
window.currentGallerySlide = function(index) {
    currentGallerySlideByDot(index);
};