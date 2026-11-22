<!-- src/components/GraficoLinha.vue -->
<template>
  <div class="box-grafico">
    <h3>Frequência de Ocorrências por Meses (2026)</h3>
    <div class="canvas-wrapper">
      <Line :data="dadosGrafico" :options="opcoes" />
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'
import { useEhsStore } from '../stores/useEhsStore'
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)
const store = useEhsStore()
// Extrai o mês da data (YYYY-MM-DD) e conta os eventos de Jan a Dez
const dadosGrafico = computed(() => {
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  const contagemMeses = Array(12).fill(0)
  store.ocorrencias.forEach(item => {
    if (item.data) {
      // Pega a parte do mês (índice 1 após dividir por '-')
      const mesIndex = parseInt(item.data.split('-')[1], 10) - 1
      if (mesIndex >= 0 && mesIndex < 12) {
        contagemMeses[mesIndex]++
      }
    }
  })
  return {
    labels: meses,
    datasets: [{
      label: 'Ocorrências no Mês',
      borderColor: '#1e88e5',
      backgroundColor: 'rgba(30, 136, 229, 0.2)',
      tension: 0.3,
      fill: true,
      data: contagemMeses
    }]
  }
})
const opcoes = { responsive: true, maintainAspectRatio: false }
</script>
<style scoped>
.box-grafico { background: white; padding: 16px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
h3 { margin-top: 0; font-size: 1rem; color: #333; }
.canvas-wrapper { height: 220px; }
</style>
