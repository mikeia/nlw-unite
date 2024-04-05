/*const participante = [
    {
        nome: "Mikeias Developer",
        email: "mkpereiradeveloper@gmail.com",
        dataInscricao: new Date(2024, 2, 22, 19, 20),
        dataCheckIn: new Date(2024, 2, 25, 22, 00)
    },
    {
        nome: "Mariana Costa",
        email: "mariana.costa@example.com",
        dataInscricao: new Date(2024, 2, 17, 11, 20),
        dataCheckIn: new Date(2024, 2, 26, 10, 0)
    },
    {
        nome: "Rafael Santos",
        email: "rafael.santos@example.com",
        dataInscricao: new Date(2024, 2, 19, 16, 45),
        dataCheckIn: new Date(2024, 2, 24, 18, 15)
    },
    {
        nome: "Carla Oliveira",
        email: "carla.oliveira@example.com",
        dataInscricao: new Date(2024, 2, 21, 9, 0),
        dataCheckIn: new Date(2024, 2, 27, 11, 30)
    },
    {
        nome: "Pedro Almeida",
        email: "pedro.almeida@example.com",
        dataInscricao: new Date(2024, 2, 18, 14, 10),
        dataCheckIn: new Date(2024, 2, 25, 12, 20)
    },
    {
        nome: "Ana Silva",
        email: "ana.silva@example.com",
        dataInscricao: new Date(2024, 2, 20, 10, 30),
        dataCheckIn: new Date(2024, 2, 23, 15, 45)
    }];
*/
let participantes = [
    {
        nome: "Mikeias Developer",
        email: "mkpereiradeveloper@gmail.com",
        dataInscricao: new Date(2024, 2, 22, 19, 20),
        dataCheckIn: null
    },
    {
        nome: "Mariana Costa",
        email: "mariana.costa@example.com",
        dataInscricao: new Date(2024, 2, 17, 11, 20),
        dataCheckIn: new Date(2024, 2, 26, 10, 0)
    },
    {
        nome: "Rafael Santos",
        email: "rafael.santos@example.com",
        dataInscricao: new Date(2024, 2, 19, 16, 45),
        dataCheckIn: new Date(2024, 2, 24, 18, 15)
    },
    {
        nome: "Carla Oliveira",
        email: "carla.oliveira@example.com",
        dataInscricao: new Date(2024, 2, 21, 9, 0),
        dataCheckIn: new Date(2024, 2, 27, 11, 30)
    },
    {
        nome: "Pedro Almeida",
        email: "pedro.almeida@example.com",
        dataInscricao: new Date(2024, 2, 18, 14, 10),
        dataCheckIn: new Date(2024, 2, 25, 12, 20)
    },
    {
        nome: "Ana Silva",
        email: "ana.silva@example.com",
        dataInscricao: new Date(2024, 2, 20, 10, 30),
        dataCheckIn: new Date(2024, 2, 23, 15, 45)
    }
];

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

    if(participante.dataCheckIn == null){
        dataCheckIn = `
            <button
                data-email="${participante.email}"
                onclick="fazerCheckIn(event)"
            >
            Confirmar check-in
            </button>   
        `
    }


    return `
    <tr>
        <td>
            <strong>
                ${participante.nome}
            </strong>
            <br>
            <small>
            ${participante.email}
            </small>
        </td>
        <td> ${dataInscricao} </td>
        <td> ${dataCheckIn} </td>
    </tr>
    `
}

const atualizaLista = (participantes) => { 
    let output = ""
    for(let participante of participantes){
        output = output + criarNovoParticipante(participante)
    }

    document.querySelector('tbody').innerHTML = output
}

atualizaLista(participantes)

const adicionarParticipante = (event) => {
    event.preventDefault()

    const dadosDoFormulario = new FormData(event.target)

    const participante = {
        nome: dadosDoFormulario.get('nome'),
        email:dadosDoFormulario.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }

    //verificar se o participante existe
    const participanteExiste = participantes.find(
        (p) => p.email == participante.email
        
    )

    if(participanteExiste){
        alert('Email já cadastrado!')
        return
    }
    participantes = [participante, ...participantes]
    atualizaLista(participantes)


    //limpar formulario
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
    //confirmar se realmente quer o check-in
    const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

    if(confirm(mensagemConfirmacao) == false){
        return
    }

    //encontrar o participante dentro da Lista
    const participante = participantes.find(
        (p) => p.email == event.target.dataset.email
    )
    //atualizar o check-in do participante
    participante.dataCheckIn = new Date()


    //atualizar a lista de participantes
    atualizaLista(participantes)
}