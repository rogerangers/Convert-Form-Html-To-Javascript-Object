//https://github.com/rogerangers/foxMelhorias.git

//var scrip = document.createElement("script");
//var att = document.createAttribute("src");
//att.value = "https://code.jquery.com/jquery-3.2.1.min.js"; 
//att.value = "jquery.js"; 

//scrip.setAttributeNode(att);
//document.getElementsByTagName("body")[0].appendChild(scrip); 

$(document).ready(function () {

  /*
var scrip = document.createElement("script");
var att = document.createAttribute("src");
att.value = "https://code.jquery.com/jquery-3.2.1.min.js"; 
att.value = "http://cartooes.com/teste.js"; 

scrip.setAttributeNode(att);
document.getElementsByTagName("body")[0].appendChild(scrip);  */

  function PrecoAtual() {
    var $preco = $("span [data-model-key-list=formatted_BLINK_BTCBRL_LAST_PX]");
    var arrPrecos = [];
    var preco = 0;
    setInterval(
      function () {

        preco = covertNumeroJavascript($preco.html());
        //preco = parseFloat($.trim($preco.html().replace(".", "").replace(",", ".").replace("R$ ", "")));
        arrPrecos.push(preco);
        if (arrPrecos.length > 10) {
          arrPrecos.shift();
        }

        console.log(arrPrecos + "- " + preco + " - " + (new Date()).getMilliseconds());
      }, 500);

  }


  function setTendencias(strClassMediaMin, texto, arrPreco250Mile) {

    // setInterval(
    //  function () {

      var flut= 3;
      if (strClassMediaMin == ".media1Min"){
        flut = 5;
      }

    var a = parseFloat(arrayMedia(arrPreco250Mile).toFixed(11));
    var b = parseFloat(arrPreco250MileDesk[0].toFixed(11));
    if (a > b) {
      $(strClassMediaMin).html("<span style='color:red'>" + texto + "<br>" + a.toFixed(flut) + (flut == 5?"<br>"+b: "" ) +"</span>");
    } else if (a < b) {
      $(strClassMediaMin).html("<span style='color:green'>" + texto + "<br>" + a.toFixed(flut) + (flut ==5?"<br>"+b: "" ) + "</span>");
    } else {
      $(strClassMediaMin).html("<span>" + texto + "<br>" + a.toFixed(flut) + (flut == 5?"<br>"+b: "" ) + "</span>");
    }

    //   }, 250

    // );
  }

  //clearInterval(loop1);


  function Tendencias() {

    $("#offerbook .page__head.section-title").append(
      `<hr style="margin: 5px 0;">
  <table style='width: 100%;font-weight: 900;'>
  <tr>
  <td style="width:12.4%" class="media1Min">1 min</td>
  <td style="width:12.4%" class="media3Min">3 min</td>
  <td style="width:12.4%" class="media5Min">5 min</td>
  <td style="width:12.4%" class="media10Min">10 min</td>
  <td style="width:12.4%" class="media15Min">15 min</td>
  <td style="width:12.4%" class="media30Min">30 min</td>
  <td style="width:12.4%" class="media60Min">1 hora</td>
  <td style="width:12.4%" class="media120Min">2 hora</td>
  </tr>
  </table>
  `);

  }

  var arrPreco250Mile = [];
  var arrPreco250MileDesk = [];

  var arrPreco250Mile1Min = [];
  var arrPreco250Mile3Min = [];
  var arrPreco250Mile5Min = [];
  var arrPreco250Mile10Min = [];
  var arrPreco250Mile15Min = [];
  var arrPreco250Mile30Min = [];
  var arrPreco250Mile60Min = [];
  var arrPreco250Mile120Min = [];

  var arrMedia_1Min = [];
  var arrMedia_3Min = [];
  var arrMedia_5Min = [];
  var arrMedia_10Min = [];
  var arrMedia_15Min = [];
  var arrMedia_30Min = [];
  var arrMedia_60Min = [];

  var hitorico = [];
  //var media = [];
  var loop = "";
  var arrPrecos = [];

  var preco = 0;
  var maiorPreco = 0;
  var menorPreco = 0;
  var diferencaPreco = 0;
  var ultimoPreco = 0;

  function AvaliandoPrecos() {

    Tendencias();

    /*$("img").remove();
    $(".home-banner__ticker").hide();
    $(".home-banner__cell").hide();
    $("button").hide();*/
    var $preco = $("span [data-model-key-list=formatted_BLINK_BTCBRL_LAST_PX]");

    arrPrecos = [];

    loop = setInterval(
      function () {

        preco = parseFloat(parseFloat($.trim($preco.html().replace(".", "").replace(",", ".").replace("R$ ", ""))).toFixed(11));

        if (preco != NaN) {  

        arrPreco250Mile.push(preco);
        arrPreco250MileDesk.unshift(preco);

        var copyArrPreco250MileDesk = arrPreco250MileDesk.slice(0, 240 * 120); //2 horas

        /* arrPreco250Mile1Min = copyArrPreco250MileDesk.slice(0, 240);
       arrPreco250Mile3Min = copyArrPreco250MileDesk.slice(0, 240 * 3);
       arrPreco250Mile5Min = copyArrPreco250MileDesk.slice(0, 240 * 5);
       arrPreco250Mile10Min = copyArrPreco250MileDesk.slice(0, 240 * 10);
       arrPreco250Mile15Min = copyArrPreco250MileDesk.slice(0, 240 * 15);
       arrPreco250Mile30Min = copyArrPreco250MileDesk.slice(0, 240 * 30);
       arrPreco250Mile60Min = copyArrPreco250MileDesk.slice(0, 240 * 60);
       arrPreco250Mile120Min = copyArrPreco250MileDesk;*/

        /* arrPreco250Mile1Min = arrPreco250MileDesk.slice(0, 240);
         arrPreco250Mile3Min = arrPreco250MileDesk.slice(0, 240 * 3);
         arrPreco250Mile5Min = arrPreco250MileDesk.slice(0, 240 * 5);
         arrPreco250Mile10Min = arrPreco250MileDesk.slice(0, 240 * 10);
         arrPreco250Mile15Min = arrPreco250MileDesk.slice(0, 240 * 15);
         arrPreco250Mile30Min = arrPreco250MileDesk.slice(0, 240 * 30);
         arrPreco250Mile60Min = arrPreco250MileDesk.slice(0, 240 * 60);
         arrPreco250Mile120Min = arrPreco250MileDesk.slice(0, 240 * 120);
 */

        arrPreco250Mile1Min = copyArrPreco250MileDesk.slice(0, 240);
        setTendencias(".media1Min", "1 Min", arrPreco250Mile1Min);


        if (copyArrPreco250MileDesk.length >= 240 * 3) {
          arrPreco250Mile3Min = copyArrPreco250MileDesk.slice(0, 240 * 3);
          setTendencias(".media3Min", "3 Min", arrPreco250Mile3Min);
        }
        if (copyArrPreco250MileDesk.length  >= 240 * 5) {
          arrPreco250Mile5Min = copyArrPreco250MileDesk.slice(0, 240 * 5);
          setTendencias(".media5Min", "5 Min", arrPreco250Mile5Min);
        }
        if (copyArrPreco250MileDesk.length  >= 240 * 10) {
          arrPreco250Mile10Min = copyArrPreco250MileDesk.slice(0, 240 * 10);
          setTendencias(".media10Min", "10 Min", arrPreco250Mile10Min);
        }
        if (copyArrPreco250MileDesk.length  >= 240 * 15) {
          arrPreco250Mile15Min = copyArrPreco250MileDesk.slice(0, 240 * 15);
          setTendencias(".media15Min", "15 Min", arrPreco250Mile15Min);
        }
        if (copyArrPreco250MileDesk.length  >= 240 * 30) {
          arrPreco250Mile30Min = copyArrPreco250MileDesk.slice(0, 240 * 30);
          setTendencias(".media30Min", "30 Min", arrPreco250Mile30Min);
        }
        if (copyArrPreco250MileDesk.length  >= 240 * 60) {
          arrPreco250Mile60Min = copyArrPreco250MileDesk.slice(0, 240 * 60);
          setTendencias(".media60Min", "1 hora", arrPreco250Mile60Min);
        }
        if (copyArrPreco250MileDesk.length  >= 240 * 120) {
          arrPreco250Mile120Min = copyArrPreco250MileDesk.slice(0, 240 * 120);
          setTendencias(".media120Min", "2 horas", arrPreco250Mile120Min);
        }

        if (arrPrecos.length == 0) {
          arrPrecos.push(preco);
          ultimoPreco = preco;
          return;
        }

        maiorPreco = Math.max.apply(Math, arrPrecos);
        menorPreco = Math.min.apply(Math, arrPrecos);

        arrPrecos.push(preco);

        if (arrPrecos.length > 240 /* 120*/) {
          arrPrecos.shift();
        }

        // media.push(arrayMedia(arrPrecos));


        diferencaPreco = maiorPreco - preco;
        //console.log(arrPrecos);
        if (diferencaPreco > 100 && ultimoPreco != preco) {
          hitorico.push(diferencaPreco);
          console.log(arrPrecos);
          console.log("*** Diferenca Preco: " + diferencaPreco + " - Maior:" + maiorPreco + " - Preco: " + preco + " - Ultimo Preco: " + ultimoPreco + (new Date()));// + (new Date()).getMilliseconds());
          arrPrecos = [];
          //zerar array
        } else {
          // console.log(" Diferenca Preco: " + diferencaPreco + " - Maior:" + maiorPreco + " - Preco: "+ preco +  " - Ultimo Preco: " +  ultimoPreco  );// + (new Date()).getMilliseconds());
        }
        ultimoPreco = preco;
        //console.log(arrPrecos + "- " +  preco + " - " +  (new Date()).getMilliseconds());
        }
      }, 249 /* 500*/);
  }
  //AvaliandoPrecos();
  //clearInterval(loop);

  $("form").on("click", "#cancelaCompra", function () {
    RemovePedidoDeCompra();
    // $("#id_order_book_bid_content td").find('.btn-cancel-order.text-error').find('i').trigger('click');
  });

  $("form").on("click", "#cancelaVenda", function () {
    RemovePedidoDeVenda();
    // $("#id_order_book_ask_content td").find('.btn-cancel-order.text-error').find('i').trigger('click');
  });

  function RemovePedidoDeCompra() {
    $("#id_order_book_bid_content td").find('.btn-cancel-order.text-error').find('i').trigger('click');
  }
  function RemovePedidoDeVenda() {
    $("#id_order_book_ask_content td").find('.btn-cancel-order.text-error').find('i').trigger('click');
  }

  /* $("form").on("click", "#XcancelaCompra", function () {
 
     $($('.input-group')[0]).find('[data-uniform-label=Quantidade]').val('0,0000059');
     $($('.input-group')[0]).find('[data-uniform-label=Quantidade]').trigger('keyup')
     // $("#id_order_book_bid_content td").find('.btn-cancel-order.text-error').find('i').trigger('click');
   });*/

  function arrayReverse(arr) {
    var novo = arr.slice(0);
    return novo.sort(function (a, b) {
      return a < b;
    });
  }

  function arrayMedia(arr) {
    var novo = arr.slice(0);
    return novo.reduce(function (sum, a) { return sum + Number(a) }, 0) / novo.length;
  }
  function covertNumeroJavascript(valor) {
    valor = valor + "";
    return parseFloat(parseFloat($.trim(valor.replace(".", "").replace(",", ".").replace("R$ ", ""))).toFixed(11));
  }

  function setMelhorValorParaCompra() {
    //iguala melhor proposta de venda
    var $melhorPrecoDeVenda = $($("#id_order_book_ask_content").find(".orders-table tbody tr")[0]);
    var $melhorPrecoDeCompra = $($("#id_order_book_bid_content").find(".orders-table tbody tr")[0]);

    var melhorPrecoVenda = covertNumeroJavascript($melhorPrecoDeVenda.find('.order-book-price').html());
    var melhorPrecoCompra = covertNumeroJavascript($melhorPrecoDeCompra.find('.order-book-price').html());

    if (melhorPrecoVenda > melhorPrecoCompra) {
      //$melhorPrecoDeVenda.find('.order-book-qty').trigger('click');
      $melhorPrecoDeVenda.find('.order-book-price').trigger('click');
    } else {
      //$melhorPrecoDeCompra.find('.order-book-qty').trigger('click');
      $melhorPrecoDeCompra.find('.order-book-price').trigger('click');
    }

    // $($("#id_order_book_ask_content").find(".orders-table tbody tr")[0]).find('.order-book-price').trigger('click');
    // $($("#id_order_book_ask_content").find(".orders-table tbody tr")[0]).find('.order-book-qty').trigger('click');

    //$($("#id_order_book_ask_content").find(".orders-table tbody tr")[0]).find('.order-book-qty').trigger('click');
    // $($("#id_order_book_bid_content").find(".orders-table tbody tr")[0]).find('.order-book-qty').trigger('click');


    //Seta valor do saldo para compra
    var $elementSaldoReais = $(document.getElementById(":x.order_entry_available_value"));
    var saldoReais = $elementSaldoReais.html();
    var saldoReaisFake = 2500000000;// 25 reais  //5000000000 50 reais  // 10000000000 100 reais
    $elementSaldo.html(saldoReaisFake).trigger('click');
    $elementSaldo.html(saldoReais);
  }

  function AdicionaBotoesDeDesistencias() {
    //testar $($("#id_order_book_bid_content").find(".orders-table tbody tr")[0]).find('.order-book-qty').trigger('click')
    // $($("#offer_book_order_entry_content").find('form')[0]).append('<input id="XcancelaCompra" style="margin-left:10px;margin-bottom: 10px;"  class="btn btn-lg" type="button" value="X - Cancelar Compra" />')

    $($("#offer_book_order_entry_content").find('form')[0]).append('<input id="cancelaCompra" style="margin-left:10px;margin-bottom: 10px;" class="btn btn-sm btn-warning" type="button" value="X - Cancelar Todos Pedidos de Compra" />')
    $($("#offer_book_order_entry_content").find('form')[1]).append('<input id="cancelaVenda" style="margin-bottom: 10px;float: right; margin-right: 10px;" class="btn  btn-sm btn-warning" type="button" value="X - Cancelar Todos Pedidos de Venda"  />');
  }

  function FormataValoresNoCabecalho() {
    $("span [data-model-key-list=formatted_BLINK_BTCBRL_LAST_PX]").css('font-size', '30px');
    $($("span [data-model-key-list]")[4]).css('font-size', '30px');
    //$(".balance-currency__amount").css('font-size', '30px');
    //$(".head-ticker__value .bitex-model").css('font-size', '20px');
  }

  //console.log('a,b,c,d', $(".balance-currency__amount").html());
  // if (location.href.indexOf('#offerbook') != -1) {

  FormataValoresNoCabecalho();
  AdicionaBotoesDeDesistencias();
  AvaliandoPrecos();

  // PrecoAtual();

  // }
});