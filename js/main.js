$('.scroll-btn').click(function() {
    var scroll = $('#scroll').scrollTop();
    $('#scroll').animate({scrollTop: scroll + 100}, 300);
    });