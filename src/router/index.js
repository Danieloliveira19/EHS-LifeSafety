import { createRouter, createWebHistory } from 'vue-router'
import { useEhsStore } from '../stores/useEhsStore'

// Importação das 4 telas do sistema
import LoginView from '../views/LoginView.vue'
import CadastroView from '../views/CadastroView.vue'
import OcorrenciaView from '../views/OcorrenciaView.vue'
import DashboardView from '../views/DashboardView.vue'

const routes = [
  { path: '/', name: 'login', component: LoginView },
  { path: '/cadastro', name: 'cadastro', component: CadastroView },
  { path: '/registrar-ocorrencia', name: 'ocorrencia', component: OcorrenciaView },
  { 
    path: '/dashboard', 
    name: 'dashboard', 
    component: DashboardView,
    meta: { requerAuth: true } // Marca que esta rota exige login de supervisor
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guarda de rota: impede acesso direto ao dashboard pela URL sem estar logado
router.beforeEach((to, from, next) => {
  const store = useEhsStore()
  if (to.meta.requerAuth && !store.isSupervisorLogado) {
    next('/') // Redireciona para o login se não for supervisor logado
  } else {
    next()
  }
})

// Esta linha é obrigatória para o main.js conseguir importar o router!
export default router