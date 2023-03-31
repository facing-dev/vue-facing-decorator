## Utilização

Nós podemos definir um método o qual irá disparar um evento vue, utilizano o decorator `Emit`. 


Esse decorator pode receber o nome do evento como parametro opicional. 
O evento será disparado com o nome definido, e com o valor retornado no método. 
Se o nome do evento não é declarado, o nome do evento será por default o nome do método. 

[](./code-usage.ts ':include :type=code typescript')

## Eventos assíncronos

Se o método do evento retorna uma promise, o evento será disparado depois que a promise for resolvida, com o valor atribuido na resolução da promise. 

[](./code-asynchronous.ts ':include :type=code typescript')