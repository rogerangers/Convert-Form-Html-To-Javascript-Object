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

Saida: Uma lista de telefone:


` { `   
` "telefone" : `   
` [ `   
` "11-99999999",`   
`  null,`   
`  "12-88888888"`   
` ]`   
` } `   


-------------------------------------------

- Outro Exemplo de objetos:

Atributo "data-name-object" se refere a um objeto, mais lista com do exemplo anterior

 `<form id="container">`   
 
 `<div data-name-object-list="Pessoa"> `   
 
 `    <div data-name-object="Pessoa">`   

`         <input type="text" name="nome" value="fabio" /> `   
 `        <input type="text" name="Idade" value="38" /> `   
 
 `    </div>`   
 
 `    <div data-name-object="Pessoa">`   

`        <input type="text" name="nome" value="kelly" /> `   
  `       <input type="text" name="Idade" value="27" />     `      

`    </div>`   

  ` </div>`   
 
 `</form> `   
 
$('#container').toJSO();

Saida: Uma lista de objetos Pessoa com dua propriedades primitivas cada:

` {`   
`  "Pessoa":`   
`  [ `   
`    { `   
`      "nome": "fabio", `   
`      "Idade": "39" `   
`    }, `   
`    { `   
`      "nome": "kelly", `   
`      "Idade": "27" `   
`    }`   
`  ]`   
`}`   

-------------------------------------------

- Outro Exemplo ambos anteriores juntos:

 `<form id="container">`   
 
 `<div data-name-object-list="Pessoa"> `   
 
 `    <div data-name-object="Pessoa">`   

`         <input type="text" name="nome" value="fabio" /> `   
 `        <input type="text" name="Idade" value="38" /> `   
 
 `   <div data-name-object-list="telefone">`   
 
 `   <input type="text" name="telefone" value=11-11111111" />`   
 `   <input type="text" name="telefone" value="" />`   
 `   <input type="text" name="telefone" value="15-7777777" /> `   
 
 `  </div>`   
 
 `    </div>`   
 
 `    <div data-name-object="Pessoa">`   

`        <input type="text" name="nome" value="kelly" /> `   
  `       <input type="text" name="Idade" value="27" />     `      

`   <div data-name-object-list="telefone">`   
 
 `   <input type="text" name="telefone" value=11-5555555" />`   
 `   <input type="text" name="telefone" value="55-444444" />`   
 `   <input type="text" name="telefone" value="12-3333333" /> `   
 
 `  </div>`   
 
`    </div>`   

  ` </div>`   
 
 `</form> `   
 
 $('#container').toJSO();

Saida: Uma lista de objetos Pessoa com dua propriedades primitivas, nome e Idade alem de uma propriedade telefone que detem uma de lista de telefone valores primitivos:

`{ `   
`  "Pessoas": [ `   
`    {`   
`      "nome": "fabio",`   
`      "Idade": "39",`   
`      "telefone" : [`   
`         "11-11111111",`   
`         null,`   
`         "15-7777777"`   
`       ]     `   
`    },`   
`    {`   
`      "nome": "kelly",`   
`      "Idade": "27",`   
`      "telefone" :`   
`      [`   
`         "11-5555555",`   
`         "55-444444",`   
`         "12-3333333"`   
`       ] `   
`    }`      
`  ]`   
`}`   
