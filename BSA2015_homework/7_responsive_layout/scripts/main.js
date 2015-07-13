jQuery(document).ready(function(){
    $('#dropdown_blog_top').hover(function(){
        $('#dropdown_list_top').fadeIn(); /* a bit of WET */
        $('#dropdown_div_top').fadeIn();
    }, function(){
        $('#dropdown_list_top').fadeOut();
        $('#dropdown_div_top').fadeOut();
    });
    
    $('#dropdown_blog_bottom').hover(function(){
        $('#dropdown_list_bottom').fadeIn(); /* a bit of WET */
        $('#dropdown_div_bottom').fadeIn();
    }, function(){
        $('#dropdown_list_bottom').fadeOut();
        $('#dropdown_div_bottom').fadeOut();
    });
});