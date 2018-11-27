# Sistemas-Distribuidos

Projeto criado em sala de aula com o intuíto de aprender o básico de uma integração de um back-end com um front-end

### Resumo

O projeto consiste em um banco de dados MySql que possui uma tabela para armazenar registros. Além do banco, temos um back-end para fazer manipulações básicas no banco.

### Pré requisitos

Para que o projeto funcione normalmente é necessário que seja instalado:
* [NodeJS](https://nodejs.org/en/)    - Responsável pela comunicação com o banco
* [MySql](https://www.mysql.com/)     - Banco de dados utilizado pelo projeto

### Como utilizar
* Clone o repositório
* Navegue até a pasta [Backend](Backend)
* Altere as credencias do banco para apontar para a sua instancia, arquivo [database.js](Backend/database.js) nas linhas 5,6,7 e 8 
```
    var connection = mysql.createConnection({
        host     : 'HOST',
        user     : 'USER',
        password : 'PASS',
        database : 'BD'
    });
```
* Através do CMD, Git Bash ou outro terminal de sua preferencia digite : 
``` 
npm install 
```

* Com a instância do MySql rodando execute o comando:
```
node index.js
```

## Autor

* **Lucas Gaspar** - E-mail: lucasgaspar@gec.inatel.br
