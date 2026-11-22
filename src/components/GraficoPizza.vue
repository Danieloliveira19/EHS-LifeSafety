<!-- src/components/GraficoPizza.vue -->
<template>
  <div class="box-grafico">
    <h3>Setores com Mais Relatos</h3>
    <div class="canvas-wrapper">
      <Pie :data="dadosGrafico" :options="opcoes" />
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { useEhsStore } from '../stores/useEhsStore'
ChartJS.register(Title, Tooltip, Legend, ArcElement)
const store = useEhsStore()
// Agrupa as ocorrências pelas 8 áreas cadastradas na Store
const dadosGrafico = computed(() => {
  const areas = store.areasEmpresa
  const contagens = areas.map(area =>
    store.ocorrencias.filter(item => item.area === area).length
  )
  return {
    labels: areas,
    datasets: [{
      backgroundColor: ['#4a148c', '#1565c0', '#00838f', '#2e7d32', '#ef6c00', '#c62828', '#6a1b9a', '#455a64'],
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
