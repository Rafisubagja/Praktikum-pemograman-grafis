const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const dino = {
  x: 50,
  y: canvas.height - 70,
  width: 40,
  height: 40,
  speedY: 0,
  gravity: 0.5,
  jumpStrength: -15,
  isJumping: false,
  draw() {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(Math.PI / 4); // Untuk belah ketupat
    ctx.fillStyle = '#008000'; // Warna hijau
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  },
  jump() {
    if (!this.isJumping) {
      this.speedY = this.jumpStrength;
      this.isJumping = true;
    }
  },
  update() {
    this.speedY += this.gravity;
    this.y += this.speedY;
    if (this.y >= canvas.height - this.height) {
      this.y = canvas.height - this.height;
      this.isJumping = false;
    }
  },
};

const obstacles = [];
let score = 0;
let difficulty = 5;

function createObstacle() {
  const obstacle = {
    x: canvas.width,
    y: canvas.height - 50,
    width: 20,
    height: 50,
    speedX: -difficulty,
  };
  obstacles.push(obstacle);
}

function drawBackground() {
  ctx.fillStyle = '#87CEEB'; // Latar belakang biru
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Matahari
  ctx.fillStyle = '#FFD700'; // Warna kuning emas
  ctx.beginPath();
  ctx.arc(50, 50, 30, 0, 2 * Math.PI); // Matahari di pojok kiri atas
  ctx.fill();

  // Awan
  ctx.fillStyle = '#FFFFFF'; // Warna putih untuk awan
  drawCloud(150, 50, 60, 30); // Posisi awan pertama
  drawCloud(300, 100, 80, 40); // Posisi awan kedua

  // Garis horizon
  ctx.fillStyle = '#A9A9A9'; // Warna garis horizon
  ctx.fillRect(0, canvas.height - 50, canvas.width, 5);
}

function drawCloud(x, y, width, height) {
  ctx.beginPath();
  ctx.arc(x, y, height / 2, Math.PI, 2 * Math.PI); // Bagian kiri awan
  ctx.arc(x + width / 2, y - height / 2, height / 2, 0, Math.PI); // Bagian tengah awan
  ctx.arc(x + width, y, height / 2, Math.PI, 2 * Math.PI); // Bagian kanan awan
  ctx.closePath();
  ctx.fill();
}

function draw() {
  drawBackground(); // Menggambar latar belakang
  dino.draw(); // Menggambar dino
  obstacles.forEach((obstacle) => {
    ctx.fillStyle = 'purple'; // Warna rintangan
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });

  // Menggambar skor di pojok kanan atas
  ctx.fillStyle = '#000000'; // Warna hitam
  ctx.font = '24px Arial'; // Ukuran font
  ctx.fillText('Score: ' + score, canvas.width - 150, 30); // Skor di pojok kanan atas
}

function update() {
  dino.update(); // Update dino
  obstacles.forEach((obstacle) => {
    obstacle.x += obstacle.speedX; // Gerakan rintangan
    if (
      dino.x < obstacle.x + obstacle.width &&
      dino.x + dino.width > obstacle.x &&
      dino.y < obstacle.y + obstacle.height &&
      dino.y + dino.height > obstacle.y
    ) {
      endGame(); // Jika tabrakan, game over
    } else if (obstacle.x + obstacle.width < dino.x && !obstacle.passed) {
      obstacle.passed = true; // Jika rintangan terlewati
      score++; // Skor bertambah
      if (score % 10 === 0) { // Naikkan kesulitan setiap 10 poin
        difficulty++;
      }
    }
  });
}

function endGame() {
  alert('Game Over! Your score: ' + score); // Notifikasi game over
  resetGame(); // Reset permainan
}

function resetGame() {
  obstacles.length = 0; // Hapus rintangan
  score = 0; // Reset skor
  difficulty = 5; // Reset kesulitan
  resetDino(); // Reset posisi dino
}

function resetDino() {
  dino.y = canvas.height - dino.height; // Reset posisi dino
}

function loop() {
  draw(); // Menggambar ulang
  update(); // Perbarui posisi dan status
  if (Math.random() < 0.02) {
    createObstacle(); // Membuat rintangan baru
  }
  requestAnimationFrame(loop); // Jalankan loop permainan
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    dino.jump(); // Dino melompat
  }
});

loop(); // Mulai loop permainan
