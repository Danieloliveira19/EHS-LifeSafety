
<!-- src/views/DashboardView.vue -->

<template>
  <div class="dashboard-layout">
    <header class="topo-dashboard">
      <div>
        <h1>📊 Dashboard Gerencial - EHS-LifeSafety</h1>
        <span>
          Total de ocorrências registradas na sessão:
          <strong>{{ store.ocorrencias.length }}</strong>
        </span>
      </div>

      <div class="acoes">
        <button
          @click="$router.push('/registrar-ocorrencia')"
          class="btn-novo"
        >
          + Novo Registro
        </button>

        <button @click="sair" class="btn-sair">
          Sair
        </button>
      </div>
    </header>

    <main class="grid-dashboard">
      <GraficoBarras />
      <GraficoPizza />
      <GraficoLinha />
      <TabelaRelatos />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useEhsStore } from '../stores/useEhsStore'

import GraficoBarras from '../components/GraficoBarras.vue'
import GraficoPizza from '../components/GraficoPizza.vue'
import GraficoLinha from '../components/GraficoLinha.vue'
import TabelaRelatos from '../components/TabelaRelatos.vue'

const store = useEhsStore()
const router = useRouter()

function sair() {
  store.logout()
  router.push('/')
}
</script>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  background: #f0f2f5;
  font-family: sans-serif;
  padding: 20px;
}

.topo-dashboard {
  background: #4a148c;
  color: white;
  padding: 16px 24px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.topo-dashboard h1 {
  margin: 0 0 4px 0;
  font-size: 1.4rem;
}

.acoes {
  display: flex;
  gap: 10px;
}

.btn-novo {
  background: #f57c00;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.btn-sair {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
}

/* Organização idêntica ao rascunho enviado */
.grid-dashboard {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 20px;
}

@media (max-width: 900px) {
  .grid-dashboard {
    grid-template-columns: 1fr;
  }
}
</style>
