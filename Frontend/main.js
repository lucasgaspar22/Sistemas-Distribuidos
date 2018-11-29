$(document).ready(()=>{
    buscarLotes();

    $("#buscarID").click(buscarPorId);
    $("#buscarPorLote").click(buscarPorLotes);

});

function buscarPorId(){
    let id = $("#id_buscar").val();
    var url_get =  'http://localhost:5000/toddy/buscarPorId/'+id;
    console.log(url_get)
    $.ajax({
        url: url_get,
        type:"GET",
        beforeSend: function(){
            console.log("before send");
        },
        success: function(result, status, xhr){
            $("#tabela_busca_id > tbody").empty();
            $.each(result, function (indice, toddy) {
                let date = new Date(toddy.validade);
                let date_string= `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
                $("#tabela_busca_id > tbody").append(
                    `<tr>`+
                    `<td>`+toddy.id+`</td>`+
                    `<td>`+toddy.lote+`</td>`+
                    `<td>`+toddy.conteudo+`</td>`+
                    `<td>`+date_string+`</td>`+
                    `</tr>`
                );
            });
        },
        error: function(){
            console.log("Erro")
        },
        complete: function(){
            console.log("complete")
        }
    });
}

function buscarLotes(){
    $.ajax({
        url: 'http://localhost:5000/toddy/buscarLotes',
        type: 'GET',
        success: function (result) {
            $.each(result, function (indice, toddy) {
                $("#lotes").append(`<option value="` + toddy.lote + `">Lote: ` + toddy.lote + `</option>`);
            });
        },
        error: function () {
            alert('Houve um erro.');
        }
    })
}

function buscarPorLotes(){
    
    let lote = $("#lotes").val();
	$("#lotes").attr("disabled", true); //Desabilito o combobox
			
	$.ajax({
	    url: 'http://localhost:5000/toddy/buscarPorLote/'+lote,
		type: 'GET',
		success: function (result) {
			$("#tabela_busca_lote > tbody").empty();

			$.each(result, function (indice, toddy) {
                let date = new Date(toddy.validade);
                let date_string= `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
				$("#tabela_busca_lote > tbody").append(
					`<tr>`+
					`<td>`+toddy.id+`</td>`+
					`<td>`+toddy.lote+`</td>`+
					`<td>`+toddy.conteudo+`</td>`+
					`<td>`+date_string+`</td>`+
					`</tr>`
				);
			});
		},
		error: function () {
			alert('Houve um erro.');
		},
		complete: function () {
			$("#lotes").attr("disabled", false); //Terminando habilito o combobox
		}
	});
}