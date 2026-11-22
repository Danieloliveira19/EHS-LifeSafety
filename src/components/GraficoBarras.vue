<!-- src/components/GraficoBarras.vue -->
<template>
  <div class="box-grafico">
    <h3>Ocorrências Mais Relatadas (Por Tipo)</h3>
    <div class="canvas-wrapper">
      <Bar :data="dadosGrafico" :options="opcoes" />
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { useEhsStore } from '../stores/useEhsStore'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
const store = useEhsStore()
// Conta dinamicamente quantas ocorrências existem de cada tipo suspenso
const dadosGrafico = computed(() => {
  const categorias = ['Comportamento', 'Condição', 'Dever de Recusa', 'Quase Acidente']
  const contagens = categorias.map(cat =>
    store.ocorrencias.filter(item => item.tipoReporte === cat).length
  )
  return {
    labels: categorias,
    datasets: [{
      label: 'Quantidade de Registros',
      backgroundColor: ['#5e35b1', '#1e88e5', '#fb8c00', '#e53935'],
      borderRadius: 6,
      data: contagens
    }]
  }
})
const opcoes = { responsive: true, maintainAspectRatio: false }
</script>
<style scoped>
.box-grafico { background: white; padding: 16px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
h3 { margin-top: 0; font-size: 1rem; color: #333; }
.canvas-wrapper { height: 240px; }
</style>
