// js/report.js
const Reports = {
    init() {
        this.renderChart();
    },

    renderChart() {
        const ctx = document.getElementById('reportChart');
        if (!ctx) return;

        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        const categoryTotal = {};
        transactions.filter(t => t.type === 'expense').forEach(t => {
            categoryTotal[t.category] = (categoryTotal[t.category] || 0) + t.amount;
        });

        const labels = Object.keys(categoryTotal);
        const data = Object.values(categoryTotal);

        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff']
                }]
            }
        });
    },

    exportCSV() {
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        let csv = 'Tanggal,Deskripsi,Kategori,Jenis,Jumlah\n';
        transactions.forEach(t => {
            csv += `${t.date},${t.description},${t.category},${t.type},${t.amount}\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'laporan_keuangan.csv';
        a.click();
    }
};