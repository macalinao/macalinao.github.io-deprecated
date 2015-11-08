$(function() {
  $.get('https://simplyian.com/content.json').then(function(data) {
    $('#postsContainer').html('<ul id="posts"></ul');
    data.posts.slice(0, 5).map(function(post) {
      $('#posts').append($('<li><a href="' + post.permalink + '" target="_blank">' + post.title + '</a></li>'));
    });
  }, function() {
    $('#postsContainer').html('<p>Unable to load feed.</p>');
  });
});
