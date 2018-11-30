let restify = require("restify"); // Importa Restify
const cors = require ("./cors"); // Importa configurações de CORS
const db = require ("./database"); // Importa configurações do Banco de Dados
const os = require ("os");
const md5 = require('md5')


let server = restify.createServer({ name: "Server" }); // Cria o servidor
server.use(restify.plugins.queryParser()); // Permite que GET passe query params
server.use(restify.plugins.bodyParser()); // Converte o Body da request em JSON
server.use(cors); // Define as configurações de CORS
  
server.get('/:token',(req,res,next)=>{
    let token = req.params.token;
    console.log(token)
    if( token === md5(os.homedir())){
        res.send(200);
    }
    else{
        res.send(400);
    }
})
server.post('/toddy/inserir', (req,res,next)=>{
    // Cria um objeto com a body da request
    let toddy = {
        lote: req.body.lote,
        conteudo: req.body.conteudo,
        validade: req.body.validade
    };
    // Monta a query de inserção
    let Query = `INSERT INTO toddy (lote, conteudo, validade) 
                VALUES ('${toddy.lote}' , '${toddy.conteudo}' , '${toddy.validade}');`

    //Excuta a query e retorna a response
    db(Query,res);
    next();
});

server.post('/toddy/atualizar/:id',(req,res,next)=>{
    // Cria um objeto com a body da request
    let toddy_id= parseInt(req.params.id);
    let toddy = {
        id: toddy_id,
        lote: req.body.lote,
        conteudo: req.body.conteudo,
        validade: req.body.validade
    };
    // Monta a query
    let Query = `UPDATE toddy SET 
     lote = '${toddy.lote}', conteudo = '${toddy.conteudo}', validade = '${toddy.validade}'
     WHERE id = ${toddy.id};`;
   
    //Excuta a query e retorna a response
    db(Query,res);
    next();
});

server.get('/toddy/listar', (req,res,next)=>{
    // Query que sera executada no DB
    let Query = "SELECT id, lote, conteudo, validade FROM toddy;";
    //Excuta a query e retorna a response
    db(Query,res);
    next();
});

server.get('/toddy/buscarPorId/:id', (req,res,next)=>{
    let id = parseInt(req.params.id); // Recupera o ID passado
    // Query que sera executada no DB
    let Query = `SELECT id, lote, conteudo, validade FROM toddy WHERE id = ${id};`;
    //Excuta a query e retorna a response
    db(Query,res);
    next();
});

server.get('/toddy/buscarVencidos', (req,res,next)=>{
    let date = new Date(); // Pega a data do sistema
    let date_query = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;// Formata a data para a query
    // Monta a query que sera executada
    let Query = `SELECT * FROM toddy WHERE DATE(validade) < '${date_query}' ORDER BY id ASC`;
    //Excuta a query e retorna a response
    db(Query,res);
    next();
});

server.get('/toddy/buscarLotes',(req,res,next)=>{
    let Query = "SELECT DISTINCT lote FROM toddy;"; // Query que sera executada no DB
    db(Query,res); //Excuta a query e retorna a response
    next();
});

server.get('/toddy/buscarPorLote/:lote', (req,res,next)=>{
    let lote = req.params.lote; // Recupera o Lote passado
    // Query que sera executada no DB
    let Query = `SELECT id, lote, conteudo, validade FROM toddy WHERE lote LIKE '${lote}';`;
    //Excuta a query e retorna a response
    db(Query,res);
    next();
});

server.post('/toddy/excluir/:id', (req,res,next)=>{
    let id = parseInt(req.params.id); // Recupera o ID passado
    let Query = `DELETE FROM toddy WHERE id = ${id}`; // Query que sera executada no DB
    //Excuta a query e retorna a response
    db(Query,res);
    next();

});


let port = process.env.PORT || 5000;// Define a porta em que o servidor ira subir
server.listen(port, () => { // Sobe o servidor
  console.log(`${server.name} rodando > http://localhost:${port}/`);
});
