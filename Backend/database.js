const mysql = require("mysql");

function executeQuery(query,res){
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'ec021'
    });
    connection.connect();
    connection.query(query,(error, results, fields) => {
        if (error) throw error;
        res.json(results)
    });
    connection.end()
}
   
module.exports = executeQuery;