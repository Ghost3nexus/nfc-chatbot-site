// スクロールアニメーション
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
        
        if (isVisible) {
            element.classList.add('visible');
        }
    });
};

// モバイルメニューの切り替え
const toggleMobileMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
        mobileMenuToggle.classList.remove('active');
    } else {
        navLinks.style.display = 'flex';
        mobileMenuToggle.classList.add('active');
    }
};

// 料金プランの切り替え
const togglePricing = () => {
    const toggle = document.querySelector('.pricing-toggle input');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const yearlyPrices = document.querySelectorAll('.yearly-price');
    
    if (toggle.checked) {
        monthlyPrices.forEach(price => price.style.display = 'none');
        yearlyPrices.forEach(price => price.style.display = 'block');
    } else {
        monthlyPrices.forEach(price => price.style.display = 'block');
        yearlyPrices.forEach(price => price.style.display = 'none');
    }
};

// イベントリスナーの設定
document.addEventListener('DOMContentLoaded', () => {
    // 初期アニメーション
    animateOnScroll();
    
    // スクロールイベント
    window.addEventListener('scroll', () => {
        animateOnScroll();
    });
    
    // モバイルメニュートグル
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // 料金プラントグル
    const pricingToggle = document.querySelector('.pricing-toggle input');
    if (pricingToggle) {
        pricingToggle.addEventListener('change', togglePricing);
    }
});

// ヘッダーのスクロール制御
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > lastScrollTop) {
        // 下スクロール
        header.style.transform = 'translateY(-100%)';
    } else {
        // 上スクロール
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});
