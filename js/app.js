(function () {
    'use strict';
    var makeTextFile = function (text) {
        var textFile = null;
        var data = new Blob([text], { type: 'text/js' });
        if (textFile !== null) {
            window.URL.revokeObjectURL(textFile);
        }
        textFile = window.URL.createObjectURL(data);
        return textFile;
    }

    let executa = function(entrada){
        document.getElementById("saida").value = '';
        
        console.stdlog = console.log.bind(console);
        console.logs = [];
        console.log = function () {
            console.logs.push(Array.from(arguments));
            delClass('saida', 'erro');
            addClass('saida', 'sucesso')
            document.getElementById("saida").value = document.getElementById("saida").value + arguments[0] + '\n';
        }

        window.onerror = function myErrorHandler(err, url, line) {
            let msg = "Erro na linha: " + line + "\n" + err;
            delClass('saida', 'sucesso')
            addClass('saida', 'erro');
            document.getElementById("saida").value = msg;
            return false; // so you still log errors into console
        }

        try {
            window.onload = eval(entrada);
        } catch (e) {
            console.log(e);
            let arquivo = makeTextFile(entrada);
            if (goodBrowser()) {
                appendScripts([
                    arquivo,
                ]);
            }
        }
    }

    try{
        document.getElementById('exec').addEventListener('click', function () {
            let code = editor.getValue();
            executa(code);
        });
    } catch (e) {
        document.getElementById('vai').addEventListener('click', function () {
            const itens = document.getElementsByClassName('column');
            let code = "";
            Array.prototype.forEach.call(itens, function (item) {
                code = code + item.textContent.trim() + " ";
            });
            executa(code);
        });
    }



    var appendScripts = function (src) {
        if (src) {
            var scriptTag = document.createElement('SCRIPT');
            scriptTag.src = src;
            document.body.appendChild(scriptTag);
        }
    }
    var goodBrowser = function () {
        return true;
    }


    var addClass = function (id, classe) {
        var elemento = document.getElementById(id);
        var classes = elemento.className.split(' ');
        var getIndex = classes.indexOf(classe);

        if (getIndex === -1) {
            classes.push(classe);
            elemento.className = classes.join(' ');
        }
    }

    var delClass = function (id, classe) {
        var elemento = document.getElementById(id);
        var classes = elemento.className.split(' ');
        var getIndex = classes.indexOf(classe);

        if (getIndex > -1) {
            classes.splice(getIndex, 1);
        }
        elemento.className = classes.join(' ');
    }

})();

