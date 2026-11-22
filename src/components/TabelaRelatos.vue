
<!-- src/components/TabelaRelatos.vue -->

<template>
  <div class="box-tabela">
    <h3>Relatos Salvos (Detalhamento Escrito)</h3>

    <div class="scroll-tabela">
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Área / Local</th>
            <th>Descrição do Ocorrido</th>
            <th>Gravidade</th>
            <th>O que foi feito</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in store.ocorrencias" :key="item.id">
            <td>{{ formatarData(item.data) }}</td>
            <td>
              <strong>{{ item.area }}</strong><br />
              <small>{{ item.descricaoLocal }}</small>
            </td>
            <td>{{ item.descricaoTexto }}</td>
            <td>
              <span class="badge">{{ item.gravidade }}</span>
            </td>
            <td>{{ item.acaoImediata }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useEhsStore } from '../stores/useEhsStore'

const store = useEhsStore()

// Converte YYYY-MM-DD para DD/MM/YYYY para exibição amigável
function formatarData(dataIso) {
  if (!dataIso) return '-'

  const [ano, mes, dia] = dataIso.split('-')

  return `${dia}/${mes}/${ano}`
}
</script>

<style scoped>
.box-tabela {
  background: white;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

h3 {
  margin-top: 0;
  font-size: 1rem;
  color: #333;
}

.scroll-tabela {
  max-height: 240px;
  overflow-y: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

th,
td {
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #eee;
}

th {
  background: #f5f5f5;
  color: #333;
  position: sticky;
  top: 0;
}

.badge {
  background: #ede7f6;
  color: #4a148c;
  padding: 3px 6px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.75rem;
}
</style>
