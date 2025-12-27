# FinanceTrack - Aplikasi Pencatatan Keuangan Harian

![Dashboard Preview](screenshots/dashboard.png)

**FinanceTrack** adalah aplikasi full-stack untuk mencatat dan mengelola keuangan harian dengan tampilan modern dan fitur lengkap.

## ✨ Fitur Utama
- Register & Login (dengan hashing password)
- Dashboard dengan grafik bulanan (Chart.js)
- Tambah/hapus transaksi (saldo otomatis update)
- Kelola kategori custom
- Laporan pengeluaran dengan pie chart
- Profil pengguna (edit nama, email)
- Responsif di desktop & mobile

## 🛠️ Teknologi
### Backend
- Java Spring Boot
- Spring Data JPA
- H2 Database (in-memory)
- Spring Security (BCrypt)

### Frontend
- HTML5, CSS3 (custom design)
- Vanilla JavaScript
- Chart.js
- Font Awesome

## 🚀 Cara Menjalankan

### Backend
```bash
cd backend
mvnw.cmd spring-boot:run