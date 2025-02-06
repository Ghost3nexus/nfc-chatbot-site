class CookieConsent {
    constructor() {
        this.cookieConsent = document.querySelector('.cookie-consent');
        this.initializeConsent();
        this.bindEvents();
    }

    initializeConsent() {
        const consent = this.getCookie('cookie_consent');
        if (!consent) {
            this.showConsentBanner();
        }
    }

    bindEvents() {
        // 同意バナーのボタンイベント
        document.getElementById('acceptAllCookies').addEventListener('click', () => {
            this.acceptAll();
        });

        document.getElementById('rejectAllCookies').addEventListener('click', () => {
            this.rejectAll();
        });

        document.getElementById('savePreferences').addEventListener('click', () => {
            this.savePreferences();
        });

        // 設定の切り替えイベント
        const toggles = document.querySelectorAll('.cookie-toggle');
        toggles.forEach(toggle => {
            toggle.addEventListener('change', () => {
                this.updateButtonStates();
            });
        });
    }

    showConsentBanner() {
        this.cookieConsent.classList.add('show');
    }

    hideConsentBanner() {
        this.cookieConsent.classList.remove('show');
    }

    acceptAll() {
        const preferences = {
            necessary: true,
            functional: true,
            analytics: true,
            performance: true
        };
        this.saveConsentPreferences(preferences);
        this.hideConsentBanner();
    }

    rejectAll() {
        const preferences = {
            necessary: true, // 必須は常にtrue
            functional: false,
            analytics: false,
            performance: false
        };
        this.saveConsentPreferences(preferences);
        this.hideConsentBanner();
    }

    savePreferences() {
        const preferences = {
            necessary: true, // 必須は常にtrue
            functional: document.getElementById('functionalToggle').checked,
            analytics: document.getElementById('analyticsToggle').checked,
            performance: document.getElementById('performanceToggle').checked
        };
        this.saveConsentPreferences(preferences);
        this.hideConsentBanner();
    }

    saveConsentPreferences(preferences) {
        // クッキーに保存
        this.setCookie('cookie_consent', JSON.stringify(preferences), 365);
        
        // 同意状態に応じてスクリプトを有効/無効化
        this.updateScripts(preferences);
    }

    updateScripts(preferences) {
        // Analytics (Google Analytics等)
        if (preferences.analytics) {
            // Google Analyticsの初期化コード
        }

        // 機能的なスクリプト
        if (preferences.functional) {
            // SNSシェアボタン等の機能的なスクリプトの初期化
        }

        // パフォーマンス関連のスクリプト
        if (preferences.performance) {
            // パフォーマンス計測スクリプトの初期化
        }
    }

    updateButtonStates() {
        const functionalToggle = document.getElementById('functionalToggle').checked;
        const analyticsToggle = document.getElementById('analyticsToggle').checked;
        const performanceToggle = document.getElementById('performanceToggle').checked;

        const allChecked = functionalToggle && analyticsToggle && performanceToggle;
        const allUnchecked = !functionalToggle && !analyticsToggle && !performanceToggle;

        document.getElementById('acceptAllCookies').classList.toggle('active', allChecked);
        document.getElementById('rejectAllCookies').classList.toggle('active', allUnchecked);
    }

    // ユーティリティ関数
    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "; expires=" + date.toUTCString();
        document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    new CookieConsent();
});
