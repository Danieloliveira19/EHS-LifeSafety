<template>
  <div class="container-central">
    <div class="card-login">
      <header class="cabecalho">
        <h1>🛡️ EHS-LifeSafety</h1>
        <p>Sistema de Gestão de Ocorrências e Segurança do Trabalho</p>
      </header>

      <!-- Ação direta para trabalhadores (sem necessidade de senha) -->
      <div class="bloco-trabalhador">
        <h3>Área do Colaborador / Terceiro</h3>
        <p>Identificou um risco ou quase acidente? Registre agora mesmo.</p>
        <button @click="irParaOcorrencia" class="btn-alerta">
          ⚠️ Registrar uma Ocorrência
        </button>
      </div>

      <hr class="divisor" />

      <!-- Área restrita para liderança -->
      <form @submit.prevent="entrarComoSupervisor" class="form-supervisor">
        <h3>Entrar como Supervisor / Gerente</h3>
        
        <div class="campo">
          <label>Usuário ou E-mail cadastrado</label>
          <input v-model="usuario" type="text" placeholder="Digite seu usuário ou e-mail" required />
        </div>

        <div class="campo">
          <label>Senha</label>
          <input v-model="senha" type="password" placeholder="Digite sua senha" required />
        </div>

        <p v-if="erroLogin" class="msg-erro">{{ erroLogin }}</p>

        <button type="submit" class="btn-primario">
          Entrar no Dashboard
        </button>
      </form>

      <div class="rodape-links">
        <span>É supervisor e não tem acesso? </span>
        <router-link to="/cadastro">Solicitar cadastro</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useEhsStore } from '../stores/useEhsStore'

const router = useRouter()
const store = useEhsStore()

const usuario = ref('')
const senha = ref('')
const erroLogin = ref('')

function irParaOcorrencia() {
  router.push('/registrar-ocorrencia')
}

function entrarComoSupervisor() {
  const sucesso = store.fazerLogin(usuario.value, senha.value)
  if (sucesso) {
    router.push('/dashboard')
  } else {
    erroLogin.value = 'Usuário/e-mail ou senha inválidos.'
  }
}
</script>

<style scoped>
.container-central { display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f0f2f5; font-family: sans-serif; }
.card-login { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 100%; max-width: 420px; }
.cabecalho { text-align: center; margin-bottom: 1.5rem; }
.cabecalho h1 { color: #4a148c; margin: 0; }
.bloco-trabalhador { background: #fff8e1; padding: 1rem; border-radius: 8px; border: 1px solid #ffe082; text-align: center; }
.btn-alerta { width: 100%; padding: 12px; background: #f57c00; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 1rem; cursor: pointer; margin-top: 8px; }
.btn-alerta:hover { background: #e65100; }
.divisor { margin: 1.5rem 0; border: 0; border-top: 1px solid #ddd; }
.campo { margin-bottom: 1rem; display: flex; flex-direction: column; }
.campo label { font-size: 0.9rem; margin-bottom: 4px; font-weight: bold; }
.campo input { padding: 10px; border: 1px solid #ccc; border-radius: 6px; }
.btn-primario { width: 100%; padding: 12px; background: #4a148c; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }
.btn-primario:hover { background: #310b60; }
.msg-erro { color: #d32f2f; font-size: 0.85rem; margin-bottom: 10px; }
.rodape-links { text-align: center; margin-top: 1.2rem; font-size: 0.9rem; }
</style>
