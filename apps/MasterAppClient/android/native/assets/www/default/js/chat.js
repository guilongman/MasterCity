
/* JavaScript content from js/chat.js in folder common */
'use strict';
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}
var Messenger = function () {
    function Messenger() {
        _classCallCheck(this, Messenger);
        this.messageList = [];
        this.deletedList = [];
        this.me = 1;
        this.them = 5;
        this.onRecieve = function (message) {
            return console.log('Recieved: ' + message.text);
        };
        this.onSend = function (message) {
            return console.log('Sent: ' + message.text);
        };
        this.onDelete = function (message) {
            return console.log('Deleted: ' + message.text);
        };
    }
    Messenger.prototype.send = function send() {
        var text = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
        text = this.filter(text);
        if (this.validate(text)) {
            var message = {
                user: this.me,
                text: text,
                time: new Date().getTime()
            };
            this.messageList.push(message);
            this.onSend(message);
        }
    };
    Messenger.prototype.recieve = function recieve() {
        var text = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
        text = this.filter(text);
        if (this.validate(text)) {
            var message = {
                user: this.them,
                text: text,
                time: new Date().getTime()
            };
            this.messageList.push(message);
            this.onRecieve(message);
        }
    };
    Messenger.prototype.delete = function _delete(index) {
        index = index || this.messageLength - 1;
        var deleted = this.messageLength.pop();
        this.deletedList.push(deleted);
        this.onDelete(deleted);
    };
    Messenger.prototype.filter = function filter(input) {
        var output = input.replace('bad input', 'good output');
        return output;
    };
    Messenger.prototype.validate = function validate(input) {
        return !!input.length;
    };
    return Messenger;
}();
var BuildHTML = function () {
    function BuildHTML() {
        _classCallCheck(this, BuildHTML);
        this.messageWrapper = 'message-wrapper';
        this.circleWrapper = 'circle-wrapper';
        this.textWrapper = 'text-wrapper';
        this.meClass = 'me';
        this.themClass = 'them';
    }
    BuildHTML.prototype._build = function _build(text, who) {
        return '<div class="' + this.messageWrapper + ' ' + this[who + 'Class'] + '">\n              <div class="' + this.circleWrapper + ' animated bounceIn" style="background:none;"><img height="42px" width="42px" src="images/ana.png"></div>\n              <div class="' + this.textWrapper + '">...</div>\n            </div>';
    };
    BuildHTML.prototype.me = function me(text) {
        return this._build(text, 'me');
    };
    BuildHTML.prototype.them = function them(text) {
        return this._build(text, 'them');
    };
    return BuildHTML;
}();

$(document).ready(function () {
    messenger = new Messenger();
    var buildHTML = new BuildHTML();
    var $input = $('#input');
    var $send = $('#send');
    var $content = $('#content');
    var $inner = $('#inner');
    function safeText(text) {
        $content.find('.message-wrapper').last().find('.text-wrapper').append(text);
    }
    function animateText() {
        setTimeout(function () {
            $content.find('.message-wrapper').last().find('.text-wrapper').addClass('animated fadeIn');
        }, 350);
    }
    function scrollBottom() {
        $($inner).animate({ scrollTop: $($content).outerHeight() +60}, {
            queue: false,
            duration: 'ease'
        });
    }
    function buildSent(message) {
        console.log('sending: ', message.text);
        $content.append(buildHTML.me(message.text));
        safeText(message.text);
        animateText();
        scrollBottom();
    }
    function buildRecieved(message) {
        console.log('recieving: ', message.text);
        $content.append(buildHTML.them(message.text));
        safeText(message.text);
        animateText();
        scrollBottom();
    }
    function sendMessage() {
        var text = $input.val();
        messenger.send(text);
        $input.val('');
        $input.focus();
    }
    messenger.onSend = buildSent;
    messenger.onRecieve = buildRecieved;
    setTimeout(function () {
        messenger.recieve("Oi Victor, tudo bem? Vi que voce esta passando perto do Walmart, você sabia que lá existem alguns beneficios exclusivos para o seu cartão?");
    }, 1000);
    setTimeout(function () {
        messenger.recieve("Por exemplo,</br>Para compras acima de R$: 150,00 você acumula pontos para trocar por presentes e viagens fantásticas;<br/> E, além disso, você pode realizar seus pagamentos em até 3x sem juros!");
    }, 6000);
    
    /*
    setTimeout(function () {
        messenger.recieve("Hello there!<button class='btn waves-effect waves-light' id='modalcart' type='submit' name='action'>Submit<i class='material-icons right'>send</i></button>");
    	$("#modalcart").click(function(){
    		$("#pmodalcart").find(".modal-content").load("pages/cart.html");
    		$('#pmodalcart').openModal();
    	});
    }, 1500);
    */
    $input.focus();
    $send.on('click', function (e) {
        sendMessage();
    });
    $input.on('keydown', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) {
            e.preventDefault();
            sendMessage();
        }
    });
});
setInterval(function() {
    getMessage();
}, 3000);

