document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const steps = Array.from(document.querySelectorAll('.form-step'));
    const progressSteps = Array.from(document.querySelectorAll('.progress-step'));
    const nextButton = document.getElementById('nextStep');
    const prevButton = document.getElementById('prevStep');
    const submitButton = document.getElementById('submitOrder');
    let currentStep = 0;

    // URLパラメータからプランを取得
    function selectPlanFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const plan = urlParams.get('plan');
        if (plan) {
            const planCard = document.querySelector(`.plan-card[data-plan="${plan}"]`);
            if (planCard) {
                // プランを選択して次のステップに進む
                selectPlan(planCard);
                if (currentStep === 0) {
                    showStep(1);
                }
            }
        }
    }

    // プラン選択の処理
    const planCards = document.querySelectorAll('.plan-card');
    let selectedPlan = null;

    function selectPlan(card) {
        planCards.forEach(c => {
            c.classList.remove('selected');
            c.querySelector('.btn').classList.remove('btn-primary');
            c.querySelector('.btn').classList.add('btn-outline');
        });
        card.classList.add('selected');
        card.querySelector('.btn').classList.remove('btn-outline');
        card.querySelector('.btn').classList.add('btn-primary');
        selectedPlan = card.dataset.plan;
    }

    planCards.forEach(card => {
        // カード全体をクリック可能に
        card.addEventListener('click', () => {
            selectPlan(card);
        });

        // ボタンのクリックイベント
        const button = card.querySelector('.btn');
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // カード全体のクリックを防止
            selectPlan(card);
        });
    });

    // URLからプランを自動選択
    selectPlanFromUrl();

    // ステップ間の移動
    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
            progressSteps[index].classList.toggle('active', index === stepIndex);
        });

        // ナビゲーションボタンの表示制御
        prevButton.style.display = stepIndex === 0 ? 'none' : 'block';
        nextButton.style.display = stepIndex === steps.length - 1 ? 'none' : 'block';
        submitButton.style.display = stepIndex === steps.length - 1 ? 'block' : 'none';

        // 現在のステップを更新
        currentStep = stepIndex;
    }

    // バリデーション
    function validateStep(stepIndex) {
        if (stepIndex === 0) {
            // 基本情報のバリデーション
            const requiredFields = steps[0].querySelectorAll('[required]');
            return Array.from(requiredFields).every(field => field.value.trim() !== '');
        }
        if (stepIndex === 1) {
            // プラン選択のバリデーション
            return selectedPlan !== null;
        }
        return true;
    }

    // 次へボタンのクリックハンドラ
    nextButton.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            if (currentStep < steps.length - 1) {
                if (currentStep === 2) {
                    // 注文内容の確認ページを更新
                    updateOrderSummary();
                }
                showStep(currentStep + 1);
            }
        } else {
            alert('必須項目を入力してください。');
        }
    });

    // 戻るボタンのクリックハンドラ
    prevButton.addEventListener('click', () => {
        if (currentStep > 0) {
            showStep(currentStep - 1);
        }
    });

    // 注文内容の確認ページを更新
    function updateOrderSummary() {
        // 基本情報
        const userInfoSummary = document.getElementById('userInfoSummary');
        userInfoSummary.innerHTML = `
            <p><strong>会社名：</strong> ${document.getElementById('companyName').value}</p>
            <p><strong>部署名：</strong> ${document.getElementById('department').value || '未入力'}</p>
            <p><strong>担当者名：</strong> ${document.getElementById('name').value}</p>
            <p><strong>メールアドレス：</strong> ${document.getElementById('email').value}</p>
            <p><strong>電話番号：</strong> ${document.getElementById('phone').value}</p>
        `;

        // 選択したプラン
        const planSummary = document.getElementById('planSummary');
        const selectedPlanCard = document.querySelector('.plan-card.selected');
        if (selectedPlanCard) {
            const planName = selectedPlanCard.querySelector('h3').textContent;
            const planPrice = selectedPlanCard.querySelector('.plan-price').textContent;
            planSummary.innerHTML = `
                <p><strong>プラン名：</strong> ${planName}</p>
                <p><strong>料金：</strong> ${planPrice}</p>
            `;
        }

        // 適用される特典
        const benefitsSummary = document.getElementById('benefitsSummary');
        const selectedBenefits = Array.from(document.querySelectorAll('input[name="benefits"]:checked'))
            .map(checkbox => checkbox.parentElement.previousElementSibling.textContent);
        
        benefitsSummary.innerHTML = selectedBenefits.length > 0
            ? selectedBenefits.map(benefit => `<p>✓ ${benefit}</p>`).join('')
            : '<p>選択された特典はありません</p>';

        // お支払い金額の計算
        const totalSummary = document.getElementById('totalSummary');
        if (selectedPlanCard) {
            const priceText = selectedPlanCard.querySelector('.plan-price').textContent;
            const basePrice = parseInt(priceText.replace(/[^0-9]/g, ''));
            const hasFreeMonth = document.getElementById('freeMonth').checked;
            
            const finalPrice = hasFreeMonth ? 0 : basePrice;
            totalSummary.innerHTML = `
                <p class="total-price">初月のお支払い金額：¥${finalPrice.toLocaleString()}</p>
                <p class="price-notice">※2ヶ月目以降は${priceText}となります</p>
            `;
        }
    }

    // フォームの送信
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // ここで実際の送信処理を実装
        alert('お申し込みありがとうございます。確認メールをお送りしましたのでご確認ください。');
        // 送信後、トップページまたは完了ページにリダイレクト
        window.location.href = 'index.html';
    });
});
