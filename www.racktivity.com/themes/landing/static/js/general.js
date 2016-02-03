 var str=location.href.toLowerCase();
    $('li.active').removeClass("active");
	$('.nav li a').filter(function() {return this.href.toLowerCase() == str; }).parents('li').addClass('active');
    $('.section-side li a ').filter(function() {return this.href.toLowerCase() == str; }).addClass('active');