function cadastro(){

    let nome = document.getElementById("cadNome").value.trim();
    let email = document.getElementById("cadEmail").value.trim();
    let senha = document.getElementById("cadSenha").value.trim();

    if(nome === "" || email === "" || senha === ""){
        alert("Preencha todos os campos.");
        return;
    }

    localStorage.setItem("nomeUsuario", nome);
    localStorage.setItem("emailUsuario", email);
    localStorage.setItem("senhaUsuario", senha);

    alert("Cadastro realizado com sucesso!");

    console.log("Email guardado:", email);
    console.log("Senha guardada:", senha);
}

function login(){

    let email = document.getElementById("loginEmail").value.trim();
    let senha = document.getElementById("loginSenha").value.trim();

    let emailGuardado = localStorage.getItem("emailUsuario");
    let senhaGuardada = localStorage.getItem("senhaUsuario");

    console.log("Digitado:", email, senha);
    console.log("Guardado:", emailGuardado, senhaGuardada);

    if(email === emailGuardado && senha === senhaGuardada){

        localStorage.setItem("logado", "true");

        alert("Login efectuado com sucesso!");

        window.location.href = "index.html";

    }else{

        alert("Email ou senha incorrectos!");
    }
}

function verificarCompra(produto,preco){

if(localStorage.getItem("logado")!=="true"){

localStorage.setItem("produto",produto);
localStorage.setItem("preco",preco);

window.location.href="login.html";

return;
}

comprar(produto,preco);
}

function comprar(produto,preco){

let nome =
localStorage.getItem("nomeUsuario");

let telefone =
prompt("Digite o seu telefone:");

let localizacao =
prompt("Digite a sua localização:");

let quantidade =
prompt("Quantidade:");

let total =
preco * parseInt(quantidade);

let mensagem =

`☕ NOVA ENCOMENDA MOZCOFFEE

Nome: ${nome}
Telefone: ${telefone}
Localização: ${localizacao}

Produto: ${produto}
Quantidade: ${quantidade}

Total: MT ${total}`;

window.open(
`https://wa.me/258871545619?text=${encodeURIComponent(mensagem)}`,
"_blank"
);

}