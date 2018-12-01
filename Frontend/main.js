$(document).ready(()=>{
    buscarLotes();

    $("#buscarID").click(buscarPorId);
    $("#buscarPorLote").click(buscarPorLotes);
    $("#buscarVencidos").click(buscarVencidos);
    $("#buscarTodos").click(buscarTodos);
    $("#inserir").click(inserir);
    $("#atualizar").click(atualizar);
    $("#buscaTodosExcluir").click(buscaTodosExcluir);

    $('#myModal').modal('toggle');
    $('#myModal').modal('show');
    $('#token_button').click(()=>{
        let token = $("#token_id").val();
        $.ajax({
            url:`http://localhost:5000/${token}`,
            type: 'GET',
            success:function(result, status, xhr){
                $('#myModal').modal('toggle');
                $('#myModal').modal('hide');
            },
            error:function(result,status){
                window.location.href = 'out.html';
            }
        });
    })
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

function buscarVencidos(){
    let url_get = "http://localhost:5000/toddy/buscarVencidos";
    $.ajax({
        url: url_get,
        type:"GET",
        beforeSend: function(){
            console.log("before send");
        },
        success: function(result, status, xhr){
            $("#tabela_busca_vencidos > tbody").empty();
            $.each(result, function (indice, toddy) {
                let date = new Date(toddy.validade);
                let date_string= `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
                $("#tabela_busca_vencidos > tbody").append(
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

function buscarTodos(){
    let url_get = "http://localhost:5000/toddy/listar";
    $.ajax({
        url: url_get,
        type:'GET',
        success: function(result, status, xhr){
            $("#tabela_busca_todos > tbody").empty();
            $.each(result, function (indice, toddy){
                let date = new Date(toddy.validade);
                let date_string = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
                $("#tabela_busca_todos> tbody").append(
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
            alert("Ocorreu um erro!");
        }
    });
}

function inserir(){
    let lote_toddy = $("#lote_inserir").val();
    let conteudo_toddy = $("#conteudo_inserir").val();
    let validade_toddy = $("#validade_inserir").val();
    let url_post = "http://localhost:5000/toddy/inserir";
    $.ajax({
        url:  url_post,
        type:'POST',
        dataType:'json',
        data:{
            lote: lote_toddy,
            conteudo: conteudo_toddy,
            validade: validade_toddy
        },
        success: function(){
            alert("Incluido com Sucesso!");
            buscarLotes();
        },
        error: function(){
            alert("Ocorreu um erro");
        }
    });
}

function atualizar(){
    let id_toddy = $("#id_atualizar").val();
    let lote_toddy = $("#lote_atualizar").val();
    let conteudo_toddy = $("#conteudo_atualizar").val();
    let validade_toddy = $("#validade_atualizar").val();
    let url_post = `http://localhost:5000/toddy/atualizar/${id_toddy}`;
    $.ajax({
        url:  url_post,
        type:'POST',
        dataType:'json',
        data:{
            lote: lote_toddy,
            conteudo: conteudo_toddy,
            validade: validade_toddy
        },
        success: function(){
            alert("Atualizado com Sucesso!");
        },
        error: function(){
            alert("Ocorreu um erro");
        }
    });
}

function buscaTodosExcluir(){
<<<<<<< HEAD
    let url_get = "http://localhost:5000/toddy/listar";
    $.ajax({
        url: url_get,
        type:'GET',
        success: function(result, status, xhr){
            $("#tabela_excuir_todos > tbody").empty();
            $.each(result, function (indice, toddy){
                let date = new Date(toddy.validade);
                let date_string = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
=======
    let url_get = "http://localhost:5000/";
    $.ajax({
        url: url_get,
        type:'GET',
        success: function(){
            $("#tabela_excuir_todos > tbody").empty();
            $.each(result, function (indice, toddy){
                let date = new Date(toddy.validade);
                let date_string = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear}`;
>>>>>>> b08391124256773784abf6571f89ddfe352369be
                $("#tabela_excuir_todos> tbody").append(
                    `<tr>`+
                    `<td>`+toddy.id+`</td>`+
                    `<td>`+toddy.lote+`</td>`+
                    `<td>`+toddy.conteudo+`</td>`+
                    `<td>`+date_string+`</td>`+
<<<<<<< HEAD
                    `<td><button  class="btn btn-dark remove"><i  class="fa fa-trash"  style="color:red"></i> Excuir</button></td>`+
                    `</tr>`
                );
                $(".remove").click(deletar);

=======
                    `<td><i id="remove" class="fa fa-trash remove"  style="color:red"></i></td>`+
                    `</tr>`
                );
>>>>>>> b08391124256773784abf6571f89ddfe352369be
            });
        },
        error: function(){
            alert("Ocorreu um erro!");
        }
    });
}
<<<<<<< HEAD
function deletar(){
    let id = $(this).closest('tr').find("td:eq(0)").text();
    $(this).closest('tr').remove();
    let url_post = `http://localhost:5000/toddy/excluir/${id}`;
    console.log(url_post)
=======
function excluir(){
    let id = $(this).closest('tr').find("td:eq(1)").text();
    let url_post = `http://localhost:5000/toddy/excluir/${id}`;
>>>>>>> b08391124256773784abf6571f89ddfe352369be
    $.ajax({
        url: url_post,
        type: 'POST',
        dataType:'json',
        data:{},
        success: function (result, status, xhr){
<<<<<<< HEAD
           
            alert("Removido com sucesso;")

=======
            $(this).closest('tr').remove();
            alert("Removido com sucesso;")
>>>>>>> b08391124256773784abf6571f89ddfe352369be
        },
        error: function(){
            alert("Ocorreu um erro!");
        }
    });
}