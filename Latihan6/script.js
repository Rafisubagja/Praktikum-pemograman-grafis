document.addEventListener("DOMContentLoaded", function() {
    // Mendapatkan elemen kanvas
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    // Mengatur kecepatan rotasi
    let rotationSpeed = 0.1; // Kecepatan rotasi

    // Sudut rotasi awal
    let rotationAngle1 = 0;
    let rotationAngle2 = 0;

    // Ukuran kotak yang diperbesar
    const boxSize = 100; // Ukuran kotak diperbesar menjadi 150x150
    const halfBoxSize = boxSize / 2; // Setengah ukuran kotak

    // Fungsi untuk menggambar kotak
    function draw() {
        // Warna latar belakang yang baru
        ctx.fillStyle = 'skyblue'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Mengisi latar belakang

        // Mengatur posisi pusat kotak
        let x1 = canvas.width / 4; // Posisi horizontal untuk kotak pertama
        let y = canvas.height / 2; // Posisi vertikal untuk kedua kotak
        let x2 = 3 * canvas.width / 4; // Posisi horizontal untuk kotak kedua

        ctx.save(); // Menyimpan kondisi kanvas

        // Memutar kotak pertama
        ctx.translate(x1, y); // Menggeser titik koordinat untuk kotak pertama
        ctx.rotate(rotationAngle1);
        ctx.fillStyle = 'black'; // Warna kotak pertama
        // Menggambar kotak pertama (terpusat di titik rotasi)
        ctx.fillRect(-halfBoxSize, -halfBoxSize, boxSize, boxSize); 

        // Memutar kotak kedua
        ctx.restore(); // Mengembalikan kondisi kanvas sebelumnya
        ctx.save(); // Menyimpan kondisi kanvas sekarang
        ctx.translate(x2, y); // Menggeser titik koordinat untuk kotak kedua
        ctx.rotate(rotationAngle2);
        ctx.fillStyle = 'pink'; // Warna kotak kedua
        // Menggambar kotak kedua (terpusat di titik rotasi)
        ctx.fillRect(-halfBoxSize, -halfBoxSize, boxSize, boxSize); 

        ctx.restore(); // Mengembalikan kondisi kanvas sebelumnya
        
        // Meningkatkan sudut rotasi untuk animasi berputar
        rotationAngle1 += rotationSpeed;
        rotationAngle2 -= rotationSpeed; // Rotasi berlawanan untuk kotak kedua

        requestAnimationFrame(draw); // Mengulangi animasi
    }

    draw(); // Memulai animasi
});
