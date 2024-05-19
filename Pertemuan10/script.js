document.addEventListener("DOMContentLoaded", function() {
    // Mendapatkan elemen kanvas
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    // Mengatur kecepatan rotasi
    let rotationSpeed = 0.1; // Meningkatkan kecepatan rotasi

    // Sudut rotasi awal
    let rotationAngle1 = 0;
    let rotationAngle2 = 0;

    // Fungsi untuk menggambar segitiga
    function draw() {
        ctx.fillStyle = 'lightgreen'; // Mengatur warna latar belakang kanvas menjadi hijau muda
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Menggambar latar belakang kanvas

        // Mengatur posisi pusat segitiga
        let x1 = canvas.width / 4; // Posisi horizontal untuk segitiga pertama
        let y = canvas.height / 2; // Posisi vertikal untuk kedua segitiga
        let x2 = 3 * canvas.width / 4; // Posisi horizontal untuk segitiga kedua

        ctx.save(); // Menyimpan kondisi kanvas sekarang

        // Memutar segitiga pertama
        ctx.translate(x1, y); // Menggeser titik koordinat untuk segitiga pertama
        ctx.rotate(rotationAngle1);
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.moveTo(0, -50); // Pindah ke titik puncak
        ctx.lineTo(50, 50); // Garis ke sudut kanan bawah
        ctx.lineTo(-50, 50); // Garis ke sudut kiri bawah
        ctx.closePath();
        ctx.fill(); // Menggambar segitiga pertama

        // Memutar segitiga kedua
        ctx.restore(); // Mengembalikan kondisi kanvas sebelumnya
        ctx.save(); // Menyimpan kondisi kanvas sekarang
        ctx.translate(x2, y); // Menggeser titik koordinat untuk segitiga kedua
        ctx.rotate(rotationAngle2);
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(0, -50); // Pindah ke titik puncak
        ctx.lineTo(50, 50); // Garis ke sudut kanan bawah
        ctx.lineTo(-50, 50); // Garis ke sudut kiri bawah
        ctx.closePath();
        ctx.fill(); // Menggambar segitiga kedua

        ctx.restore(); // Mengembalikan kondisi kanvas sebelumnya
        
        // Meningkatkan sudut rotasi untuk animasi berputar
        rotationAngle1 += rotationSpeed;
        rotationAngle2 -= rotationSpeed; // Rotasi berlawanan untuk segitiga kedua

        requestAnimationFrame(draw); // Mengulangi animasi
    }

    draw(); // Memulai animasi
});