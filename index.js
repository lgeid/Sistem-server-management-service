const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 9993;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Inisialisasi file data.json jika belum ada
if (!fs.existsSync(DATA_FILE)) {
    const initialData = {
        users: [
            { id: 'admin', username: 'admin', password: 'admin123', role: 'admin', nama: 'Administrator Utama', nowa: '', mustChangePass: false }
        ],
        customers: [],
        inventory: [],
        chat: []
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
}

// API Endpoint untuk Memuat Semua Data
app.get('/api/data', (req, res) => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        res.status(500).json({ error: 'Gagal membaca data server' });
    }
});

// API Endpoint untuk Menyimpan Data
app.post('/api/data', (req, res) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
        res.json({ success: true, message: 'Data berhasil disimpan ke data.json' });
    } catch (err) {
        res.status(500).json({ error: 'Gagal menyimpan data ke server' });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server TeknisiPro berjalan di http://20.219.4.22:${PORT}`);
});
