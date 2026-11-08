/* ==========================================================================
   Matrix Rain Canvas Animation (Customizable & Performance friendly)
   ========================================================================== */

(function () {
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationId = null;
  let isRunning = true;

  // Characters mix of Hex, Binary, and Cyber glyphs
  const chars = '01010101XYZ0123456789ABCDEF$#@%&*<>{}[]/\\~';
  const charArray = chars.split('');

  let fontSize = 14;
  let columns = 0;
  let drops = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -50);
    }
  }

  function draw() {
    ctx.fillStyle = 'rgba(4, 8, 16, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00f0ff';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = charArray[Math.floor(Math.random() * charArray.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      // Color variation: white tip, cyan tail
      if (Math.random() > 0.85) {
        ctx.fillStyle = '#ffffff';
      } else if (Math.random() > 0.6) {
        ctx.fillStyle = '#00ff66';
      } else {
        ctx.fillStyle = '#00f0ff';
      }

      ctx.fillText(text, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    if (isRunning) {
      animationId = requestAnimationFrame(draw);
    }
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  draw();

  // Expose toggle
  window.toggleMatrixAnimation = function () {
    isRunning = !isRunning;
    if (isRunning) {
      draw();
    } else {
      cancelAnimationFrame(animationId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    return isRunning;
  };
})();

