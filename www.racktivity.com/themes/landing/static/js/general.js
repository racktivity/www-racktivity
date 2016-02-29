$( document ).ready(function() {

var str=location.href.toLowerCase();
    $('li.active').removeClass("active");
	$('.nav li a').filter(function() {return this.href.toLowerCase() == str; }).parents('li').addClass('active');
    $('.section-side li a ').filter(function() {return this.href.toLowerCase() == str; }).addClass('active');
 $('.carousel').carousel({
 	interval: 10000,
 	pause: 'hover' 	
})

$(".search-box").keyup(function(event){
    if(event.keyCode == 13){
        $(".search-icon").click();
    }
});
	
   $(".search-icon").click(function () { 
	var searchValue = $('.search-box').val(); 
   	window.location.href = "/search" + "#" + searchValue;   	  
	});

   $('#search').val(window.location.href.split('#')[1]);

	




});
