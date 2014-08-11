$(function() {
  var canvas = document.getElementById('draw');
  var header = document.getElementById('header');
  var ctx = canvas.getContext('2d');

  window.requestAnimFrame = function() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(c) {
        window.setTimeout(c, 1000 / 60);
      }
    );
  }();

  var squares = [];
  var lastRender = Date.now();
  var lastCreate = Date.now();

  function render() {
    var timeDelta = new Date().getTime() - lastRender;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    if (Date.now() - lastCreate >= 20) {
      var sze = randr(20, 50);

      squares.push({
        width: sze,
        height: sze,
        vel: randr(100, 200), //pixs per second
        x: randr(-sze + 10, canvas.width - 10),
        y: randr(10, canvas.height - 10),
        age: 1,
        r: Math.floor(randr(0, 255)),
        g: Math.floor(randr(0, 255)),
        b: Math.floor(randr(0, 255))
      });

      lastCreate = Date.now();
    }

    squares = _.filter(squares, function(sq) {
      ctx.fillStyle = ["rgba(", sq.r, ", ", sq.g, ", ", sq.b, ",", (sq.age / 600), ")"].join("");
      ctx.fillRect(sq.x, sq.y, sq.width, sq.height);

      sq.y -= sq.vel / 1000 * timeDelta;
      sq.age++;

      return sq.y + sq.height >= 0;
    });

    lastRender = new Date().getTime();
  }

  function randr(min, max) {
    return Math.random() * (max - min) + min;
  }

  function resize() {
    var he = header.clientHeight;
    var wi = header.clientWidth;

    canvas.height = he;
    canvas.width = wi;

    if (window.devicePixelRatio == 2) {
      canvas.width = wi * 2;
      canvas.height = he * 2;
      canvas.style.height = he;
      canvas.style.width = wi;
      ctx.scale(2, 2);
    }
  }

  window.onresize = resize;
  setTimeout(resize, 100);

  (function loop() {
    requestAnimFrame(loop);
    render();
  })();
});
