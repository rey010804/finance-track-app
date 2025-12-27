// js/profile.js - Logika halaman Profil

const Profile = {
    init() {
        if (!Auth.isLoggedIn()) {
            window.location.href = 'login.html';
            return;
        }

        this.loadUserData();
        this.setupEventListeners();
        this.loadTheme();
    },

    loadUserData() {
        const user = Auth.getUser();

        document.getElementById('profName').textContent = user.name || 'Tidak ada nama';
        document.getElementById('profEmail').textContent = user.email || 'Tidak ada email';

        // Isi form edit
        document.getElementById('editName').value = user.name || '';
        document.getElementById('editEmail').value = user.email || '';

        // Tampilkan saldo
        this.updateBalanceDisplay();
    },

    updateBalanceDisplay() {
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        const income = transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        const expense = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        const balance = income - expense;

        const balanceEl = document.getElementById('profBalance');
        if (balanceEl) {
            balanceEl.textContent = Utils.formatCurrency(balance);
            balanceEl.style.color = balance >= 0 ? '#28a745' : '#dc3545';
        }
    },

    setupEventListeners() {
        // Simpan perubahan profil
        document.getElementById('editProfileForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const newName = document.getElementById('editName').value.trim();
            const newEmail = document.getElementById('editEmail').value.trim();

            if (!newName || !newEmail) {
                Utils.showToast('Nama dan email wajib diisi', 'error');
                return;
            }

            // Update di localStorage (simulasi update user)
            const currentUser = Auth.getUser();
            const updatedUser = { ...currentUser, name: newName, email: newEmail };
            localStorage.setItem(newEmail, JSON.stringify(updatedUser)); // update key jika email berubah
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));

            // Update Auth currentUser
            Auth.currentUser = updatedUser;

            Utils.showToast('Profil berhasil diperbarui!', 'success');
            this.loadUserData(); // refresh tampilan
        });

        // Ganti password
        document.getElementById('changePasswordForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const oldPass = document.getElementById('oldPassword').value;
            const newPass = document.getElementById('newPassword').value;
            const confirmPass = document.getElementById('confirmNewPassword').value;

            const user = Auth.getUser();

            if (oldPass !== user.password) {
                Utils.showToast('Password lama salah', 'error');
                return;
            }

            if (newPass.length < 6) {
                Utils.showToast('Password baru minimal 6 karakter', 'error');
                return;
            }

            if (newPass !== confirmPass) {
                Utils.showToast('Konfirmasi password tidak cocok', 'error');
                return;
            }

            // Update password
            const updatedUser = { ...user, password: newPass };
            localStorage.setItem(user.email, JSON.stringify(updatedUser));
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            Auth.currentUser = updatedUser;

            Utils.showToast('Password berhasil diubah!', 'success');
            document.getElementById('changePasswordForm').reset();
        });

        // Toggle tema
        document.getElementById('themeToggle').addEventListener('change', (e) => {
            const theme = e.target.checked ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            Utils.showToast(`Tema diubah ke ${theme === 'dark' ? 'gelap' : 'terang'}`, 'info');
        });
    },

    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        document.getElementById('themeToggle').checked = savedTheme === 'dark';
    }
};

// Jalankan saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    Profile.init();
});