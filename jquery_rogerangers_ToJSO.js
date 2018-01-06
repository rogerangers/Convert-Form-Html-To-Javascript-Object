// https://github.com/rogerangers/Convert-Form-Html-To-Javascript-Object
// autor: Fabio Rogerio dos Santos

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

                    if ($el.attr("type") == "radio") {
                        if ($el.prop('checked')) {
                            if (name) {
                                obj[name] = $el._toJSO_();
                            }
                        }
                    } else if ($el.attr("type") == "checkbox") {

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
                        } else if (datanameObject) {
                            obj[datanameObject] = obj[datanameObject] || [];
                            obj[datanameObject].push($el._toJSO_());
                        }
                    }
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
                    } else if (datanameObject) {
                        obj[datanameObject] = $el._toJSO_();
                    }
                }
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

        for (var item in containers) {
            // while ($clone.find(containers[item]).not("[data-name-object]").length) {
            //    siRemova($clone.find(containers[item]).not("[data-name-object]"));
            // }
            while ((temp = $clone.find(containers[item]).not("[data-name-object]")).length) {
                siRemova(temp);
            }
        }
        return $clone._toJSO_();
    };
}());
