# Convert-Form-Html-To-Javascript-Object

- Atributo "data-name-object-list" se refere a lista de itens

  Exemplo formulario Lista de Itens primitivos:

 `<form id="container">`   

`   <div data-name-object-list="telefone">`   
 
 `   <input type="text" name="telefone" value=11-99999999" />`   
 `   <input type="text" name="telefone" value="" />`   
 `   <input type="text" name="telefone" value="12-88888888" /> `   
 
 `  </div>`   
 
 `</form> `   


$('#container').toJSO();

Saida:

{
 "telefone" : [
 "11-99999999",
 null,
 "12-88888888"
 ]
}

-------------------------------------------

- Outro Exemplo de objetos:

 Atributo "data-name-object" se refere a um objeto, mais lista com do exemplo anterior

 `<form id="container">`   
 
 `<div data-name-object-list="Pessoas"> `   
 
 `    <div data-name-object="Pessoas">`   

`         <input type="text" name="nome" value="fabio" /> `   
 `        <input type="text" name="Idade" value="38" /> `   
 
 `    </div>`   
 
 `    <div data-name-object="Pessoas">`   

`        <input type="text" name="nome" value="kelly" /> `   
  `       <input type="text" name="Idade" value="27" />     `      

`    </div>`   

  ` </div>`   
 
 `</form> `   
 
 $('#container').toJSO();

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

 
