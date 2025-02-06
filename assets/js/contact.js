document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // フォームのバリデーション
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        if (!isValid) {
            alert('必須項目を入力してください。');
            return;
        }

        // フォームデータの収集
        const formData = {
            name: form.querySelector('#name').value,
            company: form.querySelector('#company').value,
            email: form.querySelector('#email').value,
            phone: form.querySelector('#phone').value,
            subject: form.querySelector('#subject').value,
            message: form.querySelector('#message').value
        };

        // ここで実際のフォーム送信処理を実装
        // 例: APIエンドポイントへのPOSTリクエストなど

        // 送信成功時の処理
        alert('お問い合わせありがとうございます。担当者より速やかにご連絡させていただきます。');
        form.reset();
    });

    // 入力フィールドのリアルタイムバリデーション
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('error') && this.value.trim()) {
                this.classList.remove('error');
            }
        });
    });
});
