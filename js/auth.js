// js/auth.js - Dengan Akun Demo Bawaan

const Auth = {
    currentUser: null,

    init() {
        // Cek apakah sudah ada user yang login
        const userData = localStorage.getItem('currentUser');
        if (userData) {
            this.currentUser = JSON.parse(userData);
        }

        // Jika belum ada data sama sekali, buat akun demo bawaan
        this.createDefaultDemoAccounts();
    },

    // Fungsi baru: Buat 3 akun demo kalau belum ada
    createDefaultDemoAccounts() {
        const demoAccounts = [
            { name: 'Demo User', email: 'demo@email.com', password: 'demo123' },
            { name: 'Admin', email: 'admin@email.com', password: 'admin123' },
            { name: 'Budi Santoso', email: 'budi@gmail.com', password: 'budi123' }
        ];

        let hasAnyAccount = false;

        demoAccounts.forEach(acc => {
            if (!localStorage.getItem(acc.email)) {
                const user = { name: acc.name, email: acc.email, password: acc.password, balance: 0 };
                localStorage.setItem(acc.email, JSON.stringify(user));
            } else {
                hasAnyAccount = true;
            }
        });

        // Jika belum ada akun sama sekali, login otomatis ke demo user
        if (!hasAnyAccount && !localStorage.getItem('currentUser')) {
            this.login('demo@email.com', 'demo123');
        }
    },

    register(name, email, password) {
        if (localStorage.getItem(email)) {
            Utils.showToast('Email sudah terdaftar', 'error');
            return false;
        }

        const user = { name, email, password, balance: 0 };
        localStorage.setItem(email, JSON.stringify(user));
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));

        Utils.showToast('Registrasi berhasil!', 'success');
        return true;
    },

    login(email, password) {
        const userData = localStorage.getItem(email);
        if (userData) {
            const user = JSON.parse(userData);
            if (user.password === password) {
                this.currentUser = user;
                localStorage.setItem('currentUser', JSON.stringify(user));
                return true;
            }
        }
        Utils.showToast('Email atau password salah', 'error');
        return false;
    },

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        window.location.href = 'login.html';
    },

    isLoggedIn() {
        return this.currentUser !== null || localStorage.getItem('currentUser') !== null;
    },

    getUser() {
        if (this.currentUser) return this.currentUser;
        const data = localStorage.getItem('currentUser');
        return data ? JSON.parse(data) : null;
    }
};

// Jalankan init saat halaman dimuat
Auth.init();