// js/categories.js
const Categories = {
    list: ['Gaji', 'Makanan', 'Transportasi', 'Hiburan', 'Belanja'],

    init() {
        const saved = localStorage.getItem('categories');
        if (saved) this.list = JSON.parse(saved);
        this.render();
    },

    add(name) {
        if (this.list.includes(name)) {
            Utils.showToast('Kategori sudah ada', 'error');
            return;
        }
        this.list.push(name);
        this.save();
        this.render();
    },

    delete(name) {
        this.list = this.list.filter(c => c !== name);
        this.save();
        this.render();
    },

    save() {
        localStorage.setItem('categories', JSON.stringify(this.list));
    },

    render() {
        const tbody = document.querySelector('#catTable tbody');
        if (!tbody) return;

        tbody.innerHTML = '';
        this.list.forEach(c => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${c}</td>
                <td>Umum</td>
                <td><button class="btn-small" onclick="Categories.delete('${c}')">Hapus</button></td>
            `;
            tbody.appendChild(row);
        });
    },

    getAll() {
        return this.list;
    }
};