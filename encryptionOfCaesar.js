"use strict";

var
    direction = document.querySelectorAll('input[type="radio"]'),  
    result    = document.getElementById('result'), 
    alfa      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    alfaLower = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase(),
    buttons   = document.getElementsByClassName('button');

for (let i = 0; i < buttons.length; i++)
	buttons[i].addEventListener('click', action);

function action() {
    var 
        userText   = document.getElementById('user_text').value,
        userOffset = document.getElementById('user_offset').value,  
        userDirect = '';  

    if (this.getAttribute('data-enc') === 'decrypt')
    	(document.getElementById('right_dir').checked) ? userDirect = '-': userDirect = '+';
   	else 
   		(document.getElementById('right_dir').checked) ? userDirect = '+': userDirect = '-';

    if (checkData(userText, userOffset)) {
        var resultArray = []; 
        for (var i = 0; i < userText.length; i++) {
            if (userText[i].match(/[0-9!?@#$%^&*,.\s]/g)) {  
                resultArray.push(userText[i]);  //ignore symbols
            } else {
                for (var j = 0; j < alfa.length; j++) {  //checking for a matches
                    if (userText[i] === alfa[j] || userText[i] === alfaLower[j]) {  
                        var offset = eval('j' + userDirect + 'Number(userOffset)'); //execute code from str with user direction
                        if (offset > alfa.length - 1) offset -= alfa.length; //for last symbols with right direction
                        if (offset < 0) offset += alfa.length;  //for first symbols with left direction
                        (userText[i] === userText[i].toLowerCase()) ? resultArray.push(alfaLower[offset]): resultArray.push(alfa[offset]);
                        break;
                    }
                }
            }   
        }
        message(resultArray.join(''));  //show result for user
    } else { message('Something went wrong :( \n Please check your data and try again'); }
}

function checkData(text, offset) {
    if (!text.match(/[a-z]/ig) || !offset.match(/[0-9]/g) || offset.match(/[a-z!@#$%^&* ]/ig))
        return false;
    return true;
}

function message(msg) { result.innerHTML = msg; }