/*
0 - Testar conataines profundos e embaralhados na hierarquia para ver se monta corretamente 

1 - Preciso verificar os casos de array com valores null   (talvez esteja ok)

ex:
<input type="text" name="numero" value="11-58254636" />
<input type="text" name="numero" value="" />
<input type="text" name="numero" value="xxx" /> 

isso gera:
{"numero":["11-58254636",null,"xxx"]}

talvez o correto seria:
{"numero":["11-58254636","xxx"]}

Assim como ja ocorre com o array de checkebox

Me parece que o ponto do codigo a tratar é :

if (name) {
        obj[name] = $el._toJSO_();
} else if (datanameObject) {
        obj[datanameObject] = $el._toJSO_();
}

Mas é discutivel, tem que encontrar um caso que afirme definitivamente se esse tratamento é necessario


2- COMENTADO a linha $clone.appendTo('#clonedItem');
   parece nao influenciar a logica, necessario obeservar

3 - returno tipo null TALVEZ seja melhor undefined, algo a se observar principalmente quando usar mvc aspnet

--------------------------

# DICAS para as listas de objetos

* Usar "data-name-object-list" obrigatoriamente só quando a lista tiver 1 item! Para 2 ou mais é opcional:

ex 1 item pessoa para uma lista de pessoas:

<div data-name-object-list="Pessoas"> //Obrigatorio data-name-object-list ter o mesmo valor que seu filho data-name-object neste caso "Pessoas"  

    <div data-name-object="Pessoas"> // 1 item Pessoa

        <input type="text" name="nome" value="fabio" /> 
        <input type="text" name="Idade" value="38" /> 

    </div>

</div>

GERA lista de Pessoas com uma "pessoa":

{
  "Pessoas": [
    {
      "nome": "fabio",
      "Idade":"38"
     }
  ]
}

Se removido data-name-object-list="Pessoas" ele nao sabera que se trata de uma lista gerando um ojeto:

    <div data-name-object="Pessoas">  

        <input type="text" name="nome" value="fabio" /> 
        <input type="text" name="Idade" value="38" /> 

    </div>

    Gera:

{
  "Pessoas": {
      "nome": "fabio",
      "Idade":"38"
     } 
}


Quando for mais de 1 é opcional data-name-object-list:

ex: 

<div data-name-object-list="Pessoas"> //linha opcional sem efeito (ignorada, porque existe mais de 1 data-name-object como o mesmo valor no caso data-name-object="Pessoas")

    <div data-name-object="Pessoas"> // * um iten

        <input type="text" name="nome" value="fabio" /> 
        <input type="text" name="Idade" value="38" /> 

    </div>

    <div data-name-object="Pessoas"> // *outro iten

         <input type="text" name="nome" value="kelly" /> 
        <input type="text" name="Idade" value="27" />
        
    </div>
</div>

Podendo ser simplesmente:

    <div data-name-object="Pessoas">
        <input type="text" name="nome" value="fabio" /> 
        <input type="text" name="Idade" value="38" /> 
    </div>

    <div data-name-object="Pessoas">
         <input type="text" name="nome" value="kelly" /> 
        <input type="text" name="Idade" value="27" /> 
    </div>

    * Observe que todos tem o mesmo data-name-object="Pessoas", por isso gera uma lista. 

Ambos acima Geram:

{
  "Pessoas": [
    {
      "nome": "fabio",
      "Idade": "39"
    },
    {
      "nome": "kelly",
      "Idade": "27"
    }
  ]
}

Acima temos uma lista de Pessoas, com duas pessoas na lista, e cada pessoas com 2 propriedades nome e idade.


* Se for de "primitivos" (input, select, textarea, radio, checkbox), neste casos seria uma lista de string ou numeros ou booleans.

ex:
        <input type="text" name="PessoasNome" value="fabio" /> 
        <input type="text" name="PessoasNome" value="" /> 
        <input type="text" name="PessoasNome" value="kelly" /> 

       Gera:

        {
         "PessoasNome": [
            "fabio",
             null,
            "kelly" ]
        }

       * Observe que todos tem o mesmo name="PessoasNome", por isso gera uma lista. 

- Da mesma forma se for 1 item, é obrigatorio data-name-object-list, para ele saber que se trata de uma lista

<div data-name-object-list="PessoasNome">
        <input type="text" name="PessoasNome" value="fabio" /> 
</div>

    Gera:
        {
         "PessoaNome": [
            "fabio"
            ]
        }

Se removido data-name-object-list="PessoasNome" ele nao sabera que é uma lista gerando uma propriedade ao invez de uma lista:
       
       {
         "PessoaNome": "fabio"
       }

* Essas regras tambem sao válidas para os checkebox e selects simples

* Os selects multiple sao automaticamente considedados arrays, se nao marcados envia vazio [] assim como checkebox, se um dos itens for vazio '' e tiver marcado como um outro item nao nulo ele marca como um item null este item nulo.

* Os checkebox simples (nao sendo lista(array), sera considerados booleans caso esteja marcado "true", caso nao "false"
ex: 
    Informada (tem o value):
    <input type="checkbox" name="Rico1" /> ou
    <input type="checkbox" name="Rico2" value="x"/> ou  ainda
    <input type="checkbox" name="Rico3" value />   

    OBS: Se marcado sera True o contrario false, independete do value, desde que nao seja uma lista, ou seja um name unico particular
         caso seja uma lista, se marcado ira obter o valor de value.

*/


//versao 8 return null; para os return; assim seta os undefined para null
//versao 7 mudança de local da versao 5 para linha $($this[0]).attr("multiple")
//versao 6 null de um item select multiple onde a opcao escolhida for vazia ''
//versao 5 essa versao envia array de checkebox vazio [] e select multiplo vazio [] caso nenhum item seja selecionado. No caso do radio ele ignora, nao faz a montagem assim como na versao 1 da mesma forma para os demais imputs menos array de checkebox
//versao 4 essa versao envia array de checkebox vazio [] caso nenhum item seja selecionado. No caso do radio ele ignora, nao faz a montagem assim como na versao 1 da mesma forma para os demais imputs menos array de checkebox
//versao 3 essa versao envia array de checkebox vazio [] caso nenhum item seja selecionado. No caso do radio ele ignora, nao faz a montagem assim como na versao 1
//versao 2 essa versao envia array de checkebox vazio [] caso nenhum item seja selecionado. No caso do radio ele envia null quando nao selecionado
//versao 1 essa versao não faz a montagem de checkebox e nem radio quando o item não for seleciono(s)

; (function () {

    $.fn.toJSO = function () {

        //usu privado
        $.fn._toJSO_ = function () {

            var obj = {};
            var $kids;

            var $this = $(this);
            $kids = $this.children('[name],[data-name-object]');

            if (!$kids.length) {
                var tipo = $this.attr('type');

                if (tipo == "checkbox" || tipo == "radio") {

                    var hasValue = $this.attr("value");
                    var hasAttValue = $this.is("[value]");
                    if (hasAttValue == false || hasValue == "undefined" || hasValue == undefined) {
                        return ($this.prop('checked') ? true : false);
                    } else if (tipo == "radio") {
                        if ($this.prop('checked')) {
                            return $this.val();
                        } else {
                            return null;//""
                        }
                    } else
                        if ($clone.find("[name=" + $this.attr("name") + "]").length >= 1) {
                            if ($clone.find("[name=" + $this.attr("name") + "]").length == 1) {
                                return $this.prop('checked');
                            }
                        }
                } else if ($this[0].tagName.toLowerCase() == "select") {
                    //  return $("[name='" + $this[0].name + "']").val();
                    if ($this.val() != "") {
                        return $this.val();
                    }

                    if ($($this[0]).attr("multiple")) { //versao 7
                        return [];
                    }

                    return null;
                }

                if ($this.val() != "") {
                    return $this.val();
                }

                //if ($($this[0]).attr("multiple")) { //versao 5
                //    return [];
                //}

                return null;
            }

            $kids.each(function () {

                var $el = $(this);

                if ($el.attr('data-val-ignore') == "____ignorar____" || $el.val() == "____ignorar____") {
                    return obj;
                }
                var name = $el.attr('name'),
                    datanameObject = $el.attr('data-name-object');

                if ($el.siblings("[name=" + name + "]").length || $el.siblings("[data-name-object=" + datanameObject + "]").length) {

                    // if (!/radio|checkbox/i.test($el.attr('type')) || $el.prop('checked')) {

                    if ($el.attr("type") == "radio") {
                        if ($el.prop('checked')) {
                            if (name) {
                                obj[name] = $el._toJSO_();
                            }
                        }

                        //var checado = false;
                        //var $elemRadios = $this.find("[name=" + $el.attr("name") + "]");
                        //for (var i = 0; i < $elemRadios.length; i++) {

                        //    if ($($elemRadios[i]).prop('checked')) {
                        //        checado = true;
                        //        obj[name] = $($elemRadios[i])._toJSO_();
                        //        break;
                        //    }
                        //}

                        //if (checado == false) {
                        //    obj[name] = null;
                        //}

                    } else if ($el.attr("type") == "checkbox") {
                        //if ($el.prop('checked')) {
                        //    if (name) {
                        //        obj[name] = obj[name] || [];
                        //        obj[name].push($el._toJSO_());
                        //    }
                        //} else {
                        //    obj[name] = [];
                        //}

                        var checadoCheck = false;
                        var $elemCheck = $this.find("[name=" + $el.attr("name") + "]");
                        for (var j = 0; j < $elemCheck.length; j++) {
                            if ($($elemCheck[j]).prop('checked')) {
                                checadoCheck = true;
                                break;
                            }
                        }

                        if (checadoCheck) {
                            if ($el.prop('checked')) {
                                if (name) {
                                    obj[name] = obj[name] || [];
                                    obj[name].push($el._toJSO_());
                                }
                            }
                        } else {
                            obj[name] = [];
                        }

                    } else {

                        if (name) {
                            obj[name] = obj[name] || [];

                            /*v6 trata select com item vazio e muda para null*/
                            var elTemp = $el._toJSO_();

                            var elItemTemp = [];
                            try {
                                if (typeof elTemp == 'object') {
                                    if (elTemp.constructor.toString().replace(/ /g, '').indexOf('Array()') > -1) {
                                        for (var ite = 0; ite < elTemp.length; ite++) {
                                            elItemTemp.push(elTemp[ite] == "" ? null : elTemp[ite]);
                                        }
                                    }
                                }
                            } catch (e) { }

                            if (elItemTemp.length > 0) {
                                obj[name].push(elItemTemp);
                            }
                            else {
                                obj[name].push(elTemp);
                            }
                            /**/

                            //obj[name].push($el._toJSO_());

                        } else if (datanameObject) {
                            obj[datanameObject] = obj[datanameObject] || [];
                            obj[datanameObject].push($el._toJSO_());
                        }
                    }
                    //}

                } else {

                    if (name) {

                        var elTemp = $el._toJSO_();

                        /*v6 trata select com item vazio e muda para null*/
                        var elItemTemp = [];
                        try {
                            if (typeof elTemp == 'object') {
                                if (elTemp.constructor.toString().replace(/ /g, '').indexOf('Array()') > -1) {
                                    for (var ite = 0; ite < elTemp.length; ite++) {
                                        elItemTemp.push(elTemp[ite] == "" ? null : elTemp[ite]);
                                    }
                                }
                            }
                        } catch (e) { }

                        if (elItemTemp.length > 0) {
                            obj[name] = elItemTemp;
                        }
                        else {
                            obj[name] = elTemp;
                        }
                        /**/

                        //obj[name] = $el._toJSO_();

                    } else if (datanameObject) {
                        obj[datanameObject] = $el._toJSO_();
                    }
                }

                // return obj;
            });

            return obj;
        };

        //var $clone = $('<div></div>').html($(this).clone());//.contents();
        var $orginal = $(this);
        var $clone = $orginal.clone();

        ////////resume o html para processar mais rapido , caso de algum problema na montagem, pode ser removido
        var $removivel = $clone.find("*").not("[name],[data-name-object],input,select,option,textarea,[data-name-object-list],fieldset,legend");
        var temAlgum;
        $removivel.each(function (x, y) {
            temAlgum = $(y).find("[name],[data-name-object],input,select,option,textarea,[data-name-object-list],fieldset,legend");
            if (temAlgum.length == 0) {
                $(y).remove();
            }
        });
        //////////

        //////////clone acima nao clona corretamente os select para isso segue abaixo
        var $originalSelects = $orginal.find('select');
        $clone.find('select').each(function (index, itemm) {
            //set new select to value of old select
            $(itemm).val($originalSelects.eq(index).val());
        });
        //////////


        //////////clone acima nao clona corretamente os Textareas para isso segue abaixo
        var $originalTextareas = $orginal.find('textarea');
        $clone.find('textarea').each(function (index, itemn) {
            //set new textareas to value of old textareas
            $(itemn).val($originalTextareas.eq(index).val());
        });
        //////////

        // $clone.appendTo('#clonedItem');

        $clone = $('<div></div>').html($clone);

        //////////Garanto objetos do tipo Lista, fazendo com que possa ter 1 indice e nao adcione um indice desnecessario
        $clone.find("[data-name-object-list]").each(function () {
            while ($(this).find("[name='" + $(this).attr("data-name-object-list") + "']").length == 1) {
                $(this).append("<input type='text' value='____ignorar____' name='" + $(this).attr("data-name-object-list") + "' />");
            }
            while ($(this).find("[data-name-object='" + $(this).attr("data-name-object-list") + "']").length == 1) {
                $(this).append("<div data-val-ignore='____ignorar____' data-name-object='" + $(this).attr("data-name-object-list") + "' ></div>");
            }
        });
        //////////


        var $child = "";
        function siRemova($elem) {
            var y;
            for (var index in $elem) {
                y = $elem[index];
                $child = $(y).children();
                if ($child.length) {
                    for (var z in $child) {
                        $($child[0]).unwrap();
                        break;
                    }
                } else {
                    $(y).remove();
                    break;
                }

            }

            //  $elem.each(function (x, y) { // 
            //      $child = $(y).children();
            //      if ($child.length) {
            //          for (var z in $child) {
            //              $($child[0]).unwrap();
            //              return true;
            //          }
            //      } else {
            //          $(y).remove();
            //          return true;
            //      }
            //  });



        }

        var containers = [];
        var min;

        $clone.find("*").each(function (i, ele) {
            min = ele.tagName.toLowerCase();
            if (containers.indexOf(min) == -1) {
                if (!(min == "input" || min == "select" || min == "textarea" || min == "option" || min == "fieldset" || min == "legend")) { //|| min == "form")) {
                    containers.push(min);
                }
            }
        });

        var temp;
        //  var dat = new Date();

        for (var item in containers) {
            // while ($clone.find(containers[item]).not("[data-name-object]").length) {
            //    siRemova($clone.find(containers[item]).not("[data-name-object]"));
            // }
            while ((temp = $clone.find(containers[item]).not("[data-name-object]")).length) {
                siRemova(temp);
            }
        }
        //  $clone.find("*").parent().not("[data-name-object-list],[data-name-object],[name],select,input,textarea,option,fieldset,legend").children().unwrap();


        //seta null para os casos vazios ''//parece ser lerdo ja tratado em codigo
        //var objetoJavascript = $clone._toJSO_();
        //var objetoStringFicado = JSON.stringify(objetoJavascript);
        ///console.log(objetoStringFicado);
        //objetoStringFicado =  objetoStringFicado.replace(/\"\"/g, "null");                 
        //return JSON.parse(objetoStringFicado);

        return $clone._toJSO_();
    };
}());