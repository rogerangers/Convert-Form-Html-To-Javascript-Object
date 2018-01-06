# Convert-Form-Html-To-Javascript-Object

Exemplo formulario Lista de Itens primitivos:

<form id="teste-lista-telefone>
  <div data-name-object-list="telefone">
    <input type="text" name="telefone" value="Maria" />
    <input type="text" name="telefone" value="" />
    <input type="text" name="telefone" value="10" /> 
  </div>
</form>

$('#teste-lista-telefone').toJSO();

Saida:

{
  "telefone":[
              "11-58254636",
              null,
              "xxx"
             ]
}
