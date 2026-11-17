import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEhsStore = defineStore('ehs', () => {
  // Controle de autenticação para o gerente acessar o Dashboard
  const isSupervisorLogado = ref(false)

  // Carrega os supervisores salvos na sessão atual (ou inicia com o admin padrão)
  const dadosSalvos = sessionStorage.getItem('ehs_supervisores')
  const supervisoresCadastrados = ref(
    dadosSalvos
      ? JSON.parse(dadosSalvos)
      : [{ usuario: 'admin', email: 'admin@empresa.com.br', senha: '1234', nome: 'Administrador EHS' }]
  )

  // Lista fixa dos 6 trabalhadores/observadores
  const trabalhadores = ref([
    '1 - Daniel de Oliveira Silva',
    '2 - Rafael Sportore',
    '3 - Gabriel Grandi',
    '4 - Matheus Nogueira',
    '5 - Ayslan Souza',
    '6 - Bruno Italo'
  ])

  // 8 áreas/setores genéricos de uma empresa
  const areasEmpresa = ref([
    'Linha de Montagem 01',
    'Almoxarifado Central',
    'Manutenção Industrial',
    'Logística e Expedição',
    'Laboratório de Qualidade',
    'Usinagem e Solda',
    'Estação de Tratamento',
    'Área Administrativa'
  ])

  // Lista de ocorrências iniciada com dados "mockados" (fictícios)
  const ocorrencias = ref([
    {
      id: 1,
      data: '2026-01-15',
      observador: '1 - Daniel de Oliveira Silva',
      vinculo: 'PRÓPRIO',
      area: 'Linha de Montagem 01',
      descricaoLocal: 'Próximo à esteira transportadora B',
      turno: 'A',
      gravidade: '2 - Médio',
      tipoReporte: 'Condição',
      detalheSelecao: 'Piso escorregadio / Vazamento de óleo',
      descricaoTexto: 'Vazamento de óleo hidráulico próximo à passagem de pedestres.',
      acaoImediata: 'Área isolada com cones e acionada a equipe de limpeza.'
    },
    {
      id: 2,
      data: '2026-03-22',
      observador: '2 - Rafael Sportore',
      vinculo: 'PRESTADOR',
      area: 'Manutenção Industrial',
      descricaoLocal: 'Painel elétrico central - Galpão 2',
      turno: 'B',
      gravidade: '3 - Grave',
      tipoReporte: 'Dever de Recusa',
      detalheSelecao: 'Trabalho em eletricidade sem bloqueio (LOTO)',
      descricaoTexto: 'Atividade de manutenção preventiva interrompida por falta de cadeado de bloqueio.',
      acaoImediata: 'Atividade paralisada até a chegada do supervisor elétrico.'
    },
    {
      id: 3,
      data: '2026-05-10',
      observador: '3 - Gabriel Grandi',
      vinculo: 'PRÓPRIO',
      area: 'Logística e Expedição',
      descricaoLocal: 'Doca de carregamento 04',
      turno: 'C',
      gravidade: '1 - Leve',
      tipoReporte: 'Comportamento',
      detalheSelecao: 'Não utilização de EPI obrigatório',
      descricaoTexto: 'Operador de empilhadeira transitando sem o cinto de segurança afivelado.',
      acaoImediata: 'Realizado diálogo de segurança imediato com o colaborador.'
    },
    {
      id: 4,
      data: '2026-08-18',
      observador: '4 - Matheus Nogueira',
      vinculo: 'FORNECEDOR',
      area: 'Almoxarifado Central',
      descricaoLocal: 'Corredor C - Prateleiras altas',
      turno: 'ADM',
      gravidade: '4 - Fatalidade',
      tipoReporte: 'Quase Acidente',
      detalheSelecao: 'Queda de material em altura',
      descricaoTexto: 'Palete mal posicionado quase caiu próximo a dois auxiliares.',
      acaoImediata: 'Sim - Necessário manutenção estrutural no rack'
    }
  ])

  function adicionarOcorrencia(novaOcorrencia) {
    ocorrencias.value.unshift({
      id: Date.now(),
      ...novaOcorrencia
    })
  }

  // Salva o novo supervisor na memória e no sessionStorage (sobrevive ao F5, apaga ao fechar a aba)
  function cadastrarSupervisor(dadosSupervisor) {
    supervisoresCadastrados.value.push({
      usuario: dadosSupervisor.usuario.trim(),
      email: dadosSupervisor.email.trim(),
      senha: dadosSupervisor.senha,
      nome: dadosSupervisor.nome.trim()
    })
    sessionStorage.setItem('ehs_supervisores', JSON.stringify(supervisoresCadastrados.value))
  }

  // Aceita tanto o Usuário quanto o E-mail cadastrado + Senha
  function fazerLogin(loginDigitado, senhaDigitada) {
    const loginLimpo = loginDigitado.trim().toLowerCase()

    const encontrado = supervisoresCadastrados.value.find(
      (sup) =>
        (sup.usuario.toLowerCase() === loginLimpo || sup.email.toLowerCase() === loginLimpo) &&
        sup.senha === senhaDigitada
    )

    if (encontrado) {
      isSupervisorLogado.value = true
      return true
    }
    return false
  }

  function logout() {
    isSupervisorLogado.value = false
  }

  return {
    isSupervisorLogado,
    supervisoresCadastrados,
    trabalhadores,
    areasEmpresa,
    ocorrencias,
    adicionarOcorrencia,
    cadastrarSupervisor,
    fazerLogin,
    logout
  }
})
