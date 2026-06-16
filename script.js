
/* ==========================================
   MOZCOFFEE PRO MAX - SISTEMA COMPLETO
========================================== */

/* ==========================================
   CADASTRO
========================================== */

function cadastro(){

    let nome = document.getElementById("cadNome").value.trim();
    let email = document.getElementById("cadEmail").value.trim();
    let senha = document.getElementById("cadSenha").value.trim();

    if(!nome || !email || !senha){
        alert("Preencha todos os campos.");
        return;
    }

    localStorage.setItem("nomeUsuario", nome);
    localStorage.setItem("emailUsuario", email);
    localStorage.setItem("senhaUsuario", senha);

    alert("Cadastro realizado com sucesso!");
}

/* ==========================================
   LOGIN
========================================== */

function login(){

    let email = document.getElementById("loginEmail").value.trim();
    let senha = document.getElementById("loginSenha").value.trim();

    let emailGuardado = localStorage.getItem("emailUsuario");
    let senhaGuardada = localStorage.getItem("senhaUsuario");

    if(!email || !senha){
        alert("Preencha todos os campos.");
        return;
    }

    if(email === emailGuardado && senha === senhaGuardada){

        localStorage.setItem("logado", "true");

        alert("Login efectuado com sucesso!");

        // voltar para loja
        window.location.href = "index.html";

    }else{
        alert("Email ou senha incorrectos!");
    }
}

/* ==========================================
   VERIFICAR COMPRA (SEGURANÇA)
========================================== */

function verificarCompra(produto, preco){

    if(localStorage.getItem("logado") !== "true"){

        localStorage.setItem("produtoTemp", produto);
        localStorage.setItem("precoTemp", preco);

        window.location.href = "login.html";
        return;
    }

    comprar(produto, preco);
}

/* ==========================================
   COMPRA VIA WHATSAPP (CORE DO SISTEMA)
========================================== */

function comprar(produto, preco){

    let nome = localStorage.getItem("nomeUsuario") || "Cliente";

    let telefone = prompt("Digite o seu telefone:");
    if(!telefone) return;

    let localizacao = prompt("Digite a sua localização:");
    if(!localizacao) return;

    let quantidade = prompt("Quantidade:");
    if(!quantidade || isNaN(quantidade) || quantidade <= 0){
        alert("Quantidade inválida!");
        return;
    }

    let total = preco * parseInt(quantidade);

    let mensagem = 
`☕ NOVA ENCOMENDA MOZCOFFEE

👤 Nome: ${nome}
📞 Telefone: ${telefone}
📍 Localização: ${localizacao}

🛒 Produto: ${produto}
🔢 Quantidade: ${quantidade}
💰 Preço unitário: MT ${preco}

💵 TOTAL: MT ${total}`;

    window.open(
        `https://wa.me/258871545619?text=${encodeURIComponent(mensagem)}`,
        "_blank"
    );
}

/* ==========================================
   AUTO-RECUPERAR COMPRA APÓS LOGIN
========================================== */

window.addEventListener("load", () => {

    let produtoTemp = localStorage.getItem("produtoTemp");
    let precoTemp = localStorage.getItem("precoTemp");

    if(localStorage.getItem("logado") === "true" && produtoTemp && precoTemp){

        localStorage.removeItem("produtoTemp");
        localStorage.removeItem("precoTemp");

        // opcional: auto abrir compra
        // comprar(produtoTemp, precoTemp);
    }
});

/* ==========================================
   LOGOUT (OPCIONAL)
========================================== */

function logout(){

    localStorage.removeItem("logado");
    localStorage.removeItem("nomeUsuario");
    localStorage.removeItem("emailUsuario");
    localStorage.removeItem("senhaUsuario");

    alert("Sessão terminada!");

    window.location.href = "index.html";
}
