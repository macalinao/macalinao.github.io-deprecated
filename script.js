var quotes = [
  "Success isn't about being the best. It's about always getting better.",
  "Nothing ventured, nothing gained.",
  "The world is your oyster."
];

function randomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

$(function() {
  $.get('https://simplyian.com/content.json').then(function(data) {
    $('#postsContainer').html('<ul id="posts"></ul');
    data.posts.slice(0, 5).map(function(post) {
      $('#posts').append($('<li><a href="' + post.permalink + '" target="_blank">' + post.title + '</a></li>'));
    });
  }, function() {
    $('#postsContainer').html('<p>Unable to load feed.</p>');
  });

  $('#footQuote').html('"' + randomQuote() + '"');
});

// Animations
var canvas = document.getElementById('draw');
var header = document.getElementById('header');
var ctx = canvas.getContext('2d');

var colors = [{
  r: 46,
  g: 163,
  b: 179
}];

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

  if (Date.now() - lastCreate >= 60) {
    var sze = randr(20, 50);

    var color = colors[Math.floor(Math.random() * colors.length)];

    squares.push({
      width: sze,
      height: sze,
      vel: randr(30, 60), //pixs per second
      x: randr(-sze + 10, canvas.width - 10),
      y: randr(10, canvas.height - 10),
      age: 1,
      r: color.r,
      g: color.g,
      b: color.b
    });

    lastCreate = Date.now();
  }

  for (var i = 0; i < squares.length; i++) {
    var sq = squares[i];

    ctx.fillStyle = ["rgba(", sq.r, ", ", sq.g, ", ", sq.b, ",", (sq.age / 400), ")"].join("");
    ctx.fillRect(sq.x, sq.y, sq.width, sq.height);

    sq.y -= sq.vel / 1000 * timeDelta;
    sq.age++;

    if (sq.y + sq.height < 0) {
      squares.splice(i, 1);
      i--;
    }
  }

  lastRender = new Date().getTime();
}

function randr(min, max) {
  return Math.random() * (max - min) + min;
}

function resize() {
  var he = header.clientHeight;
  var wi = window.innerWidth;

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
resize();

(function loop() {
  requestAnimFrame(loop);
  render();
})();
