var Application = {};

(function(Application, $){
    var _document,
        _$container,
        id = 0;
        struckout = []; // an array for aggregation struckout products
        
    Application.init = function(document) {
        _document = document;
        _$container = $('#container');
        
        
        _$container.append(
            '<ul>' + 
                '<li id="first_row">' +
                    '<input type="text" id="main_input" autofocus title="Введите наименование товара">' +
                '</li>' +
            '</ul>');
        
        //$(function() {
        //    $('[autofocus]:not(:focus)').eq(0).focus();
        //}); 
        // function for compatibility autofocus attribute in ie9-
                    
        $('li#first_row').on('click', function(){
            $('input#main_input').focus();
        });
        
        $('input#main_input').on('keydown', function(event){ 
            if (event.keyCode == 13) {
        
                //Application.addProduct($(this));
                var main_value = $(this).val();
                
                id = Application.nextId();         
                Application.nextId();
                
                if (!main_value) { return; }; // if input#main_input is empty - don't add a row
                
                _$container.children('ul').append(
                    '<li class="row" id="row'+ id + '">' + 
                        '<div class="left_check">'+ 
                            '<img src="images/add_empty.png" title="Нажмите, чтобы вычеркнуть товар" class="left_image" id="left_image_id' + id + '"/>' + 
                        '</div>' +
                        '<input type="text" id="input_id' + id + '" class="edit" title="Двойной щелчек для редактирования"/>' +
                        '<div class="right_delete">' +
                            '<img src="images/delete.png" title="Нажмите, чтобы удалить товар" style="display:none;" class="right_image">' +
                        '</div>' +
                    '</li>');
                            
                $('input#input_id' + id).val(main_value).attr('readonly', true);

                $(this).val('');
                
                $(this).focus();
                
                if (_$container.find('ul li').length === 2 && !_$container.find('div#last_row').is(':visible')) {
                    Application.addEditRow(_$container);
                }
                
                
                
            }; // end if hit enter in the main_input        
                
            
            Application.everything(_$container);
                
                
        }); // end keypress
        
        
        
    };

    Application.addProduct = function($baseNode) {
        
    };
    
    Application.everything = function($baseNode) {
     
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
                
                
                setTimeout(function(){Application.checkRemoveLastRow($baseNode.find('ul li').length)},600); // убрать костыль
                
                struckout = [];
                
        }); // click on the button#delete_button
        
        $baseNode.find('ul li.row input').on('dblclick', function(evt){
            
                evt.stopImmediatePropagation();
                
                $(this).attr('readonly', false);
                
                var current_value = $(this).val();

                if ($(this).css('text-decoration') === 'line-through') {
                    $(this).attr('readonly', true);
                }
       
                $(this).on('keydown', function(event){

                    if (event.keyCode == 13) {
                        $(this).attr('readonly', true);
                    } else if (event.keyCode == 27) {
                        $(this).attr('readonly', true);
                        $(this).val(current_value);
                    } ;
                    
                }); // end keypress in dblclick func
                
            }); // end dblclick func

        $baseNode.find('ul li.row').hover(
            function(e){
                e.stopImmediatePropagation();

                $(this).find('div img.right_image')
                    .fadeIn('fast')
                    .on('click', function(event){
                        
                        event.stopImmediatePropagation();
                        
                        var target_row = $(event.target).parent().parent(); // current li with class="row"
                        
                        target_row.fadeOut(); 
                        
                        setTimeout(function(){
                            
                            target_row.remove();
                            Application.removeFromStrukout($(event.target));                            
                            Application.checkRemoveLastRow($baseNode.find('ul li').length);
                            
                        } , 300); // end setTimeout function 
                    
                    }); // end click event on 'img.right_image'
                
            }, function(evt){
                
                evt.stopImmediatePropagation();
                $(this).find('img.right_image').fadeOut('fast'); 
                                            
        }); // end hover function on a li with class="row" 
        
        $('img.left_image').on('click', function(event){
            
            event.stopImmediatePropagation();
            Application.checkStrukout($(event.target));
            
        }); // end click on 'img.left_image'
        

        $('img#left_image_all').on('click', function(evt){
                
                evt.stopImmediatePropagation();

                struckout = [];
                
                $(this).attr('src', 'images/add_all_checked.png').hide().fadeIn();
                setTimeout(function(){$('img#left_image_all').attr('src', 'images/add_empty.png')},600)
                
                $('li.row').each(function(index){

                    Application.toStrukout($(this).children('div.left_check').children('img.left_image'))

                }); // end each        

        });     // end onclick on img#left_image_all
        

        
    }; // end Application.addProduct
    
    Application.checkStrukout = function($check_image){
                
        var $current_input = $check_image.parent('div').next('input'); // input field of current row
        
        if ($current_input.css('text-decoration') === 'none'){
            
            Application.toStrukout($check_image);
                    
        } else {
            $check_image.attr('src', 'images/add_empty.png');
            
            $current_input
                    .css('text-decoration', 'none')
                    .css('opacity', '1.0');

            Application.removeFromStrukout($check_image);
        };
    }; // end 'checkStrukout' function
    
    Application.removeFromStrukout = function($strukout_image){
        
        var $target_row = $($strukout_image).parent().parent();

        var struckout_length = struckout.length;
        
        for (var i = 0; i < struckout_length; i++){

            if (struckout[i].is($target_row)) {
                struckout.splice(i,1);
                break;
            };
           
        }; // loop for comparing each element in struckout array with target_row
    }; // end removeFromStrukout function
    
    Application.toStrukout = function($strukout_image){
      
            $strukout_image.attr('src', 'images/add_checked.png')
                    .parent('div')
                    .next('input')
                    .css('text-decoration', 'line-through')
                    .css('opacity', '0.3')  // сделать так, чтобы только текст становился полупрозрачным
                    
            struckout.push($strukout_image.parent().parent())  
    }; // end toStrukout function

    Application.addEditRow = function($baseNode){
        
        if ($('div#last_row').length > 0) {
            $('div#last_row').fadeIn();
            
        } else {
            $baseNode.append('<div id="last_row" style="display:none;"></div>');
            $baseNode.find('div#last_row').append(
                '<div id="left_check_all">' +
                    '<img src="images/add_empty.png" title="Нажмите, чтобы вычеркнуть все товары" id="left_image_all"/>' +
                '</div>' +
                '<button id="delete_button">' +
                    'Удалить вычеркнутые' +
                '</button>')
                    .children() // div id="left_check_all" and button id="delete_button"
                    .css('display', 'inline-block');
                    
            $('div#last_row').fadeIn();
        };
    }; // end addEditRow 
    
    Application.checkRemoveLastRow = function(len_ul){
        if ( len_ul === 1) {
            $('div#last_row').fadeOut();
        }
    }; //end checkRemoveLastRow 

    Application.nextId = function(){
        return id++;  
    };

})(Application, jQuery);