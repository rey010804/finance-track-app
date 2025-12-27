// js/dashboard.js
const Dashboard = {
    init() {
        this.updateBalance();
        this.renderChart();
    },

    updateBalance() {
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
        const balance = income - expense;

        const balanceEl = document.getElementById('balance');
        if (balanceEl) {
            balanceEl.textContent = `Saldo: ${Utils.formatCurrency(balance)}`;
            balanceEl.style.color = balance >= 0 ? '#28a745' : '#dc3545';
        }
    },

    renderChart() {
        const ctx = document.getElementById('dashboardChart');
        if (!ctx) return;

        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        const monthly = {};
        transactions.forEach(t => {
            const month = t.date.substring(0, 7);
            if (!monthly[month]) monthly[month] = { income: 0, expense: 0 };
            if (t.type === 'income') monthly[month].income += t.amount;
            else monthly[month].expense += t.amount;
        });

        const labels = Object.keys(monthly).sort();
        const incomeData = labels.map(m => monthly[m].income);
        const expenseData = labels.map(m => monthly[m].expense);

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    { label: 'Pemasukan', data: incomeData, borderColor: '#28a745', fill: false },
                    { label: 'Pengeluaran', data: expenseData, borderColor: '#dc3545', fill: false }
                ]
            }
        });
    }
};