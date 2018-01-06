# Convert-Form-Html-To-Javascript-Object

- Exemplo formulario Lista de Itens primitivos:

 `<form id="teste-lista-telefone">`   
 `     <div data-name-object-list="telefone">`   
 `   <input type="text" name="telefone" value=11-99999999" />`   
 `   <input type="text" name="telefone" value="" />`   
 `    <input type="text" name="telefone" value="12-88888888" /> `   
 `  </div>`   
 `</form> `   


$('#teste-lista-telefone').toJSO();

Saida:

{
 "telefone" : [
 "11-99999999",
 null,
 "12-88888888"
 ]
}

- Outro Exemplo lista de objetos:

 `<form id="teste-lista-Pessoas">`   
 `<div data-name-object-list="Pessoas"> `   
 `    <div data-name-object="Pessoas">`   
 `         <input type="text" name="nome" value="fabio" /> `   
 `        <input type="text" name="Idade" value="38" /> `   
 `    </div>`   
 `    <div data-name-object="Pessoas">`   
  `        <input type="text" name="nome" value="kelly" /> `   
  `       <input type="text" name="Idade" value="27" />     `      
 `    </div>`   
 `</div>`   
 `</form> `   
 
 $('#teste-lista-Pessoas').toJSO();

Saida:

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

 
