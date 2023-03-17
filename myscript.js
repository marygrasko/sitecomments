window.onload = function () {
    listar();
    document.getElementById('form').addEventListener('submit', sendData);
    document.getElementById('form').addEventListener('submit', listar);
}
var idAlterar = null;
function sendData(e) {
    var Name = document.getElementById('Name').value;
    var Comment = document.getElementById('comment').value;
    var p = {
        name: !Name ? "Нет имени" : Name,
        birthday: new Date(document.getElementById('DataBirthday').value.replace("-", "/")),
        sex: document.getElementById('man').checked ? 'M' : 'Ж',
        data: new Date(),
        comment: !Comment ? "Нет комментария" : Comment

    }

    if (idAlterar == null)
        save(p);

    else
        alert("Введите форму повторно");
    e.preventDefault();
}
function save(p) {
    var people = [];
    var idVallue = 1;
    if (localStorage.getItem('value') !== null) {
        people = JSON.parse(localStorage.getItem('value'));

        if (people.length > 0)
            idVallue = (function obterIdVallue() {
                for (var i = 0; i < people.length; i++)
                    if (people[i].Id != i + 1)
                        return i + 1;
                return people[people.length - 1].Id + 1;
            })();
    }

    var human = {
        Id: idVallue,
        Nome: p.name,
        DataBirthday: p.birthday.toLocaleString("pt-BR").substring(0, 10),
        Sex: p.sex,
        DataCadastro: p.data.toLocaleString("pt-BR"),
        Comments: p.comment,
    };
    people.push(human);
    people.sort(function (a, b) {
        return a.Id - b.Id;
    });
    localStorage.setItem('value', JSON.stringify(people));
    document.getElementById('form').reset();
}
function del(id) {
    var people = JSON.parse(localStorage.getItem('value'));

    for (var i = 0; i < people.length; i++)
        if (people[i].Id == id)
            people.splice(i, 1);


    localStorage.setItem('value', JSON.stringify(people));
    listar();
    if (people.length == 0)
        window.localStorage.removeItem("value");
}

function listar() {
    if (localStorage.getItem('value') === null)
        return;
    var people = JSON.parse(localStorage.getItem('value'));
    var tbody = document.getElementById("tbodyResult");
    tbody.innerHTML = '';

    for (var i = 0; i < people.length; i++) {
        var id = people[i].Id,
            name = people[i].Nome,
            birthday = people[i].DataBirthday,
            sex = people[i].Sex,
            data = people[i].DataCadastro,
            comment = people[i].Comments

        tbody.innerHTML += '<tr id="rowTable' + i + '">' +
            '<td>' + id + '</td>' +
            '<td>' + name + '</td>' +
            '<td>' + birthday + '</td>' +
            '<td>' + sex + '</td>' +
            '<td>' + data + '</td>' +
            '<td>' + comment + '</td>' +
            '<td><button onclick="del(\'' + id + '\')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></button></td>';
    }
}

