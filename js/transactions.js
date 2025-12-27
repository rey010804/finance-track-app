// js/transactions.js
const Transactions = {
    list: [],

    init() {
        this.list = JSON.parse(localStorage.getItem('transactions') || '[]');
        this.render();
    },

    add(description, amount, category, type, date = new Date().toISOString().split('T')[0]) {
        const transaction = { id: Date.now(), description, amount: parseFloat(amount), category, type, date };
        this.list.push(transaction);
        this.save();
        this.render();
        Utils.showToast('Transaksi ditambahkan', 'success');
    },

    delete(id) {
        this.list = this.list.filter(t => t.id !== id);
        this.save();
        this.render();
    },

    save() {
        localStorage.setItem('transactions', JSON.stringify(this.list));
    },

    render() {
        const tbody = document.querySelector('#transTable tbody');
        if (!tbody) return;

        tbody.innerHTML = '';
        this.list.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(t => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${Utils.formatDate(t.date)}</td>
                <td>${t.description}</td>
                <td>${t.category}</td>
                <td class="${t.type}">${Utils.formatCurrency(t.type === 'expense' ? -t.amount : t.amount)}</td>
                <td><button class="btn-small" onclick="Transactions.delete(${t.id})">Hapus</button></td>
            `;
            tbody.appendChild(row);
        });
    }
};