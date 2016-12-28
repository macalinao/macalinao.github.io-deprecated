var quotes = [
  "Success isn't about being the best. It's about always getting better.",
  "Nothing ventured, nothing gained.",
  "The world is your oyster."
];

function randomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

document.getElementById('quote').innerHTML = '"' + randomQuote() + '"';
