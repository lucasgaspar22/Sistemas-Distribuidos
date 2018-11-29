const mysql = require("mysql");

function executeQuery(query,res){
    var connection = mysql.createConnection({
        host     : 'Localhost',
        user     : 'root',
        password : '',
        database : 'toddy'
    });
    connection.connect();
    connection.query(query,(error, results, fields) => {
        if (error){
            res.send("ERRO!!!!")
            throw error;
        } 
        else res.json(results)
    });
    connection.end()
}
   
module.exports = executeQuery;
