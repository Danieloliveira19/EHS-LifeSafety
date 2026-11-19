<template>
  <div class="container-central">
    <div class="card-cadastro">
      <div class="marca-topo">🛡️ EHS-LifeSafety</div>
      <h2>Solicitação de Acesso - Liderança</h2>
      <p class="subtitulo">Crie seu usuário e senha corporativos para análise da equipe de Segurança do Trabalho.</p>

      <form v-if="!solicitacaoEnviada" @submit.prevent="enviarSolicitacao">
        <div class="campo">
          <label>Nome Completo</label>
          <input v-model="nome" type="text" placeholder="Ex: Carlos Eduardo" required />
        </div>

        <div class="campo">
          <label>Usuário de Login</label>
          <input v-model="usuario" type="text" placeholder="Ex: carlos.silva" required />
        </div>

        <div class="campo">
          <label>E-mail Corporativo</label>
          <input v-model="email" type="email" placeholder="nome@empresa.com.br" required />
        </div>

        <div class="campo">
          <label>Cargo</label>
          <select v-model="cargo" required>
            <option value="">Selecione seu cargo...</option>
            <option value="Supervisor">Supervisor de Área</option>
            <option value="Gerente">Gerente Industrial</option>
            <option value="Tecnico EHS">Técnico de Segurança (EHS)</option>
          </select>
        </div>

        <div class="campo">
          <label>Crie uma Senha de Acesso</label>
          <input v-model="senha" type="password" placeholder="Digite sua senha" required />
        </div>

        <button type="submit" class="btn-primario">Solicitar Acesso</button>
      </form>

      <!-- Mensagem exibida após o envio -->
      <div v-else class="box-confirmacao">
        <div class="icone">⏳</div>
        <h3>Solicitação Registrada!</h3>
        <p>
          "Seu pedido de acesso de supervisor será avaliado e, caso confirmado, seu acesso será disponibilizado."
        </p>
        <router-link to="/" class="btn-voltar">Voltar para a Tela Inicial</router-link>
      </div>

      <div v-if="!solicitacaoEnviada" class="rodape">
        <router-link to="/">← Voltar para o Login</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useEhsStore } from '../stores/useEhsStore'

const store = useEhsStore()

const nome = ref('')
const usuario = ref('')
const email = ref('')
const cargo = ref('')
const senha = ref('')
const solicitacaoEnviada = ref(false)

function enviarSolicitacao() {
  store.cadastrarSupervisor({
    nome: nome.value,
    usuario: usuario.value,
    email: email.value,
    cargo: cargo.value,
    senha: senha.value
  })
  solicitacaoEnviada.value = true
}
</script>

<style scoped>
.container-central { display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f0f2f5; font-family: sans-serif; padding: 20px; }
.card-cadastro { background: white; padding: 2.2rem; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.08); width: 100%; max-width: 480px; }
.marca-topo { font-weight: bold; color: #5e35b1; font-size: 0.95rem; margin-bottom: 8px; }
h2 { color: #4a148c; margin-top: 0; margin-bottom: 6px; }
.subtitulo { color: #666; font-size: 0.9rem; margin-bottom: 1.5rem; }
.campo { margin-bottom: 1rem; display: flex; flex-direction: column; }
.campo label { font-size: 0.9rem; margin-bottom: 4px; font-weight: bold; color: #333; }
.campo input, .campo select { padding: 10px 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 0.95rem; }
.btn-primario { width: 100%; padding: 12px; background: #4a148c; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 1rem; cursor: pointer; margin-top: 8px; }
.btn-primario:hover { background: #310b60; }
.box-confirmacao { background: #e8f5e9; border: 1px solid #a5d6a7; padding: 1.5rem; border-radius: 8px; text-align: center; }
.icone { font-size: 2.5rem; margin-bottom: 10px; }
.box-confirmacao p { color: #1b5e20; font-weight: 500; line-height: 1.5; margin-bottom: 1.5rem; }
.btn-voltar { display: inline-block; padding: 10px 20px; background: #4a148c; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; }
.rodape { margin-top: 1.2rem; text-align: center; }
.rodape a { color: #4a148c; text-decoration: none; font-weight: 500; }
</style>
