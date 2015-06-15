var Application = {};

(function(Application, $){
    var _document,
        _$container,
        id = 0;
        struckout = []; // an array for aggregation struckout products
        
    Application.init = function(document) {
        _document = document;
        _$container = $('#container');
        
        
        _$container.append('<ul><li><input type="text" id="main_input" autofocus></li></ul>');
        
    /*    $(function() {
          $('[autofocus]:not(:focus)').eq(0).focus();
        }); 
        // function for compatability autofocus attribute in ie9-
    */                
        
        
        this.addProduct(_$container);
        

        
    };


    Application.addProduct = function($baseNode) {
        
        var id = this.nextId();
        
        $('input#main_input').on('keypress', function(event){ 
            if (event.keyCode == 13) {
                                
                var main_value = $(this).val();
                         
                if (!main_value) { return; }; // сюда добавить всплывающую подсказку
                
                $baseNode.children('ul').append('<li class="row" id="row'+ id + '"><div class="left_check"><img src="images/add_empty.png" title="Нажмите, чтобы вычеркнуть товар" class="left_image" id="left_image_id' + id + '"/></div><input type="text" class="edit"><div class="right_delete"><img src="images/delete.png" title="Нажмите, чтобы удалить товар" style="display:none;" class="right_image"></div></li>')
                            .css('list-style-type', 'none')
                            .children('li')
                            .children('input')
                            .eq($baseNode.children('ul').children('li').children('input').length - 1) // input's field with current id
                            .val(main_value)
                            .attr('readonly', true);
                
                Application.nextId();
               
                $baseNode.children().children('li').children().css('display', 'inline');
                
                $(this).val('');

                if ($baseNode.children('ul').children('li').length === 2 && !$baseNode.children('div#last_row').is(':visible')) {
                  
                    Application.addEditRow($baseNode);
      
                }
               
            }; // end if hit enter in the main_input
     
            $baseNode.children('div').filter('div#last_row').children('button#delete_button')
                .on('click', function(evt){
                    
                    evt.stopImmediatePropagation();
                    for (var i = 0; i < struckout.length; i++){
                        struckout[i].fadeOut();
                        setTimeout(
                            (function(row){ // closure for removing rows with delay
                                return function(){
                                    row.remove();
                            }
                        })(struckout[i]) , 600);
                    }
                    
                    
                    setTimeout(function(){Application.checkRemoveLastRow($baseNode.children('ul').children('li').length)},600); // убрать костыль
                    
                    struckout = [];
                    
            }); // click on the button#delete_button
            
            $baseNode.children('ul').children('li').children('input').on('dblclick', function(evt){
                    //evt.stopImmediatePropagation();

                    $(this).attr('readonly', false);
                    
                    var current_value = $(this).val();
                    if ($(this).css('text-decoration') === 'line-through') {
                        $(this).attr('readonly', true);
                    }
                    
                    /* может использовать что-то типа этого, чтобы при двойном щелчке при редактировании поля, не было автовыбора строки
                            .edit {
                       -ms-user-select: none;
                       -moz-user-select: none;
                       -khtml-user-select: none;
                       -webkit-user-select: none;
                       user-select: none;
                    }*/
                    
                    $(this).on('keypress', function(event){

                        if (event.keyCode == 13) {
                            
                            $(this).attr('readonly', true);
                        } else if (event.keyCode == 27) {
                            $(this).attr('readonly', true);
                            $(this).val(current_value);
                            
                        } ;
                    }); // end keypress in dblclick func
                    
                }); // end dblclick func

            $baseNode.children('ul').children('li').hover(
                function(e){
                    
                    $(this).children('div').children('img').last().fadeIn('fast')
                        .on('click', function(event){ //м.б. сделать $(this).children('div').children('div')
                            event.stopImmediatePropagation();
                            
                            
                            $(event.target).parent().parent().fadeOut();
                            
                            setTimeout(function(){
                                
                                $(event.target).parent().parent().remove();
                                
                                for (var i = 0; i < struckout.length; i++){
                                    if (struckout[i] === $(event.target).parent().parent()) {
                                        struckout.splice(i,1);
                                    }
                                }; // улучшить эту функцию
                                
                                
                                Application.checkRemoveLastRow($baseNode.children('ul').children('li').length);
                                } , 300); // убрать костыль
                        
                        }); // end click event on 'right_image' (м.б. сделать при наведении на див)
                    
                }, function(){
                    
                    $(this).children('div').children('img').last().fadeOut('fast');      
                                                
            }); // end hover function on a row 
            
            $('.left_image').on('click', function(event){
                
                event.stopImmediatePropagation();
                
                Application.checkStrukout($(event.target));
                
            }); // end click on 'img.left_image'
            
  
  $baseNode.children('div').filter('div#last_row').children('div#left_check_all').children('img#left_image_all')
                .on('click', function(evt){
                    
                    evt.stopImmediatePropagation();

                    struckout = [];
                    
                    $('li.row').each(function(index){

                        Application.toStrukout($(this).children('div.left_check').children('img.left_image'))

                    }); // end each        

            });     // end onclick on img#left_image_all
            
        }); // end keypress
        
    }; // end Application.addProduct
    
    Application.checkStrukout = function($check_image){
                
        if ($check_image.parent('div').next('input').css('text-decoration') === 'none'){
            
            Application.toStrukout($check_image);
                    
        } else {
            $check_image.attr('src', 'images/add_empty.png')
                    .parent('div')
                    .next('input')
                    .css('text-decoration', 'none')
                    .css('opacity', '1.0');
                    
            for (var i = 0; i < struckout.length; i++){

                if (struckout[i].is($check_image.parent().parent())) {
                    struckout.splice(i,1);
                    break;
                };
               
            }; // улучшить эту функцию
        };
    }; // end 'checkStrukout' function
    
    Application.toStrukout = function($strukout_image){
      
            $strukout_image.attr('src', 'images/add_checked.png')
                    .parent('div')
                    .next('input')
                    .css('text-decoration', 'line-through')
                    .css('opacity', '0.3')  // сделать так, чтобы только текст становился полупрозрачным
                    
            struckout.push($strukout_image.parent().parent())  

    };
    
    
    Application.addEditRow = function($baseNode){
        
        if ($('div#last_row').length > 0) {
            $('div#last_row').fadeIn();
            
        } else {
        $baseNode.append('<div id="last_row" style="display:none;"></div>');
        $baseNode.children('div').filter('#last_row').append('<div id="left_check_all"><img src="images/add_empty.png" title="Нажмите, чтобы вычеркнуть все товары" id="left_image_all"/></div><button id="delete_button">Удалить вычеркнутые</button>')
                .children()
                .css('display', 'inline')
                .filter('#delete_button');
        
        $('div#last_row').fadeIn();

        };
        
        
    }; // end addEditRow 
    
    Application.checkRemoveLastRow = function(len_ul){
        if ( len_ul === 1) {
            $('div#last_row').fadeOut();
            
        }
                       
    }; //end checkRemoveLastRow 

    Application.nextId = function(){
        return 'id'+ id++;  
    };

})(Application, jQuery);