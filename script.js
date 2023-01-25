async function buscaEndereco(cep) {
    const mensagemErro = document.getElementById('erro')
    mensagemErro.innerHTML = "";
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`) //template string
        var consultaCEPCovertida = await consultaCEP.json()
            if (consultaCEPCovertida.erro) {
                throw Error('CEP NÃO ENCONTRADO')
            }
            const cidade = document.getElementById('cidade')
            const logradouro = document.getElementById('endereco')
            const estado = document.getElementById('estado')
            const bairro = document.getElementById('bairro')

            cidade.value = consultaCEPCovertida.localidade
            logradouro.value = consultaCEPCovertida.logradouro
            estado.value = consultaCEPCovertida.uf
            bairro.value = consultaCEPCovertida.bairro

            console.log(consultaCEPCovertida)
            return consultaCEPCovertida;
        } catch (erro) {
            mensagemErro.innerHTML = `<p>Cep inválido. Tente novamente!</p>`
            console.log(erro)
        }
}

const cep = document.getElementById('cep')
cep.addEventListener("focusout", () => buscaEndereco(cep.value)) //evento focusout é quando uma pessoa clica pra fora do foco, ou seja, fora desse input

