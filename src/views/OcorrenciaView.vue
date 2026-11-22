<template>
  <div class="pagina-web">
    <!-- Barra superior estilo Sistema Web Corporativo -->
    <header class="navbar-web">
      <div class="navbar-conteudo">
        <div class="logo-sistema">
          <span class="icone-escudo" aria-hidden="true">🛡️</span>
          <div>
            <h1>EHS-LifeSafety</h1>
            <small>Registro de Ocorrências e Segurança do Trabalho</small>
          </div>
        </div>
        <button type="button" @click="router.push('/')" class="btn-voltar-topo">
          ← Voltar ao Início
        </button>
      </div>
    </header>

    <!-- Card centralizado em formato Web (2 colunas) -->
    <main class="container-web">
      <div class="card-formulario">
        <div class="cabecalho-card">
          <h2>Novo Registro de Ocorrência</h2>
          <p>Preencha as informações abaixo. Os dados serão enviados diretamente para o painel da liderança.</p>
        </div>

        <form @submit.prevent="salvarOcorrencia">
          <!-- Grade de 2 colunas para aproveitar a tela do computador -->
          <div class="grid-campos">
            <!-- 1. Data do Evento -->
            <div class="campo">
              <label for="ocorrencia-data">* Data do Evento</label>
              <input id="ocorrencia-data" type="date" v-model="form.data" required />
            </div>

            <!-- 2. Observador -->
            <div class="campo">
              <label for="ocorrencia-observador">* Observador (Chapa ou Nome)</label>
              <select id="ocorrencia-observador" v-model="form.observador" required>
                <option value="">Selecione o colaborador...</option>
                <option v-for="trab in store.trabalhadores" :key="trab" :value="trab">
                  {{ trab }}
                </option>
              </select>
            </div>

            <!-- 3. Área onde ocorreu -->
            <div class="campo">
              <label for="ocorrencia-area">* Área / Setor onde Ocorreu</label>
              <select id="ocorrencia-area" v-model="form.area" required>
                <option value="">Selecione a área...</option>
                <option v-for="area in store.areasEmpresa" :key="area" :value="area">
                  {{ area }}
                </option>
              </select>
            </div>

            <!-- 4. Gravidade -->
            <div class="campo">
              <label for="ocorrencia-gravidade">* Gravidade Potencial (0 a 4)</label>
              <select id="ocorrencia-gravidade" v-model="form.gravidade" required>
                <option value="">O potencial do que PODERIA acontecer</option>
                <option value="0 - Ausência de risco">0 - Ausência de risco</option>
                <option value="1 - Leve">1 - Leve</option>
                <option value="2 - Médio">2 - Médio</option>
                <option value="3 - Grave">3 - Grave</option>
                <option value="4 - Fatalidade">4 - Fatalidade</option>
              </select>
            </div>

            <!-- 5. Vínculo (Próprio, Prestador, Fornecedor) -->
            <fieldset class="campo grupo-radio">
              <legend>* O evento ocorreu com:</legend>
              <div class="grupo-radio-linha">
                <label class="radio-card">
                  <input type="radio" value="PRÓPRIO" name="vinculo" v-model="form.vinculo" required /> PRÓPRIO
                </label>
                <label class="radio-card">
                  <input type="radio" value="PRESTADOR" name="vinculo" v-model="form.vinculo" /> PRESTADOR
                </label>
                <label class="radio-card">
                  <input type="radio" value="FORNECEDOR" name="vinculo" v-model="form.vinculo" /> FORNECEDOR
                </label>
              </div>
            </fieldset>

            <!-- 6. Turno -->
            <fieldset class="campo grupo-radio">
              <legend>* Turno</legend>
              <div class="grupo-radio-linha">
                <label class="radio-card"><input type="radio" value="A" name="turno" v-model="form.turno" required /> A</label>
                <label class="radio-card"><input type="radio" value="B" name="turno" v-model="form.turno" /> B</label>
                <label class="radio-card"><input type="radio" value="C" name="turno" v-model="form.turno" /> C</label>
                <label class="radio-card"><input type="radio" value="ADM" name="turno" v-model="form.turno" /> ADM</label>
              </div>
            </fieldset>
          </div>

          <!-- 7. Descrição do Local (Largura total) -->
          <div class="campo">
            <label for="ocorrencia-descricaoLocal">* Descrição do Local / Ponto de Referência</label>
            <textarea id="ocorrencia-descricaoLocal"
              v-model.trim="form.descricaoLocal" @input="validarDescricao"
              rows="2"
              placeholder="Descreva o local exato do evento ou ponto de referência..."
              required
            ></textarea>
          </div>

          <!-- 8. O que deseja reportar? -->
          <div class="campo">
            <label for="ocorrencia-tipoReporte">* O que deseja reportar?</label>
            <select id="ocorrencia-tipoReporte" v-model="form.tipoReporte" @change="limparSubcampos" required>
              <option value="">Selecione a categoria da ocorrência...</option>
              <option value="Comportamento">Comportamento</option>
              <option value="Condição">Condição</option>
              <option value="Dever de Recusa">Dever de Recusa</option>
              <option value="Quase Acidente">Quase Acidente</option>
            </select>
          </div>

          <!-- QUESTIONÁRIOS CONDICIONAIS -->

          <!-- Caso 1: Comportamento -->
          <div v-if="form.tipoReporte === 'Comportamento'" class="bloco-condicional">
            <h3>Detalhes do Comportamento Observado</h3>
            <div class="grid-campos">
              <div class="campo">
                <label for="ocorrencia-detalheSelecao">* Qual o comportamento observado?</label>
                <select id="ocorrencia-detalheSelecao" v-model="form.detalheSelecao" required>
                  <option value="">Selecione...</option>
                  <option value="Não utilização de EPI obrigatório">Não utilização de EPI obrigatório</option>
                  <option value="Uso de celular em área operacional">Uso de celular em área operacional</option>
                  <option value="Postura ergonômica inadequada">Postura ergonômica inadequada</option>
                  <option value="Excesso de velocidade com veículo/empilhadeira">Excesso de velocidade com veículo/empilhadeira</option>
                </select>
              </div>
              <div class="campo">
                <label for="ocorrencia-acaoImediata">* Ação imediata adotada</label>
                <select id="ocorrencia-acaoImediata" v-model="form.acaoImediata" required>
                  <option value="">Selecione...</option>
                  <option value="Diálogo de segurança realizado na hora">Diálogo de segurança realizado na hora</option>
                  <option value="Atividade pausada para correção">Atividade pausada para correção</option>
                  <option value="Comunicado ao líder do setor">Comunicado ao líder do setor</option>
                </select>
              </div>
            </div>
            <div class="campo">
              <label for="ocorrencia-descricaoTexto">* Descrição do Comportamento</label>
              <textarea id="ocorrencia-descricaoTexto" v-model.trim="form.descricaoTexto" @input="validarDescricao" rows="3" placeholder="Relate o que aconteceu..." required></textarea>
            </div>
          </div>

          <!-- Caso 2: Condição -->
          <div v-if="form.tipoReporte === 'Condição'" class="bloco-condicional">
            <h3>Detalhes da Condição de Risco</h3>
            <div class="grid-campos">
              <div class="campo">
                <label for="ocorrencia-detalheSelecao">* Qual condição de risco observada?</label>
                <select id="ocorrencia-detalheSelecao" v-model="form.detalheSelecao" required>
                  <option value="">Selecione...</option>
                  <option value="Piso escorregadio / Vazamento de óleo">Piso escorregadio / Vazamento de óleo</option>
                  <option value="Fiação exposta ou painel aberto">Fiação exposta ou painel aberto</option>
                  <option value="Falta de guarda-corpo ou proteção de máquina">Falta de guarda-corpo ou proteção de máquina</option>
                  <option value="Iluminação deficiente">Iluminação deficiente</option>
                </select>
              </div>
              <div class="campo">
                <label for="ocorrencia-acaoImediata">* Ação imediata adotada</label>
                <select id="ocorrencia-acaoImediata" v-model="form.acaoImediata" required>
                  <option value="">Selecione...</option>
                  <option value="Área isolada com fita zebrada/cones">Área isolada com fita zebrada/cones</option>
                  <option value="Ordem de manutenção aberta">Ordem de manutenção aberta</option>
                  <option value="Limpeza/organização realizada imediatamente">Limpeza/organização realizada imediatamente</option>
                </select>
              </div>
            </div>
            <div class="campo">
              <label for="ocorrencia-descricaoTexto">* Detalhar ao máximo a condição</label>
              <textarea id="ocorrencia-descricaoTexto" v-model.trim="form.descricaoTexto" @input="validarDescricao" rows="3" placeholder="Descreva a condição insegura encontrada..." required></textarea>
            </div>
          </div>

          <!-- Caso 3: Dever de Recusa -->
          <div v-if="form.tipoReporte === 'Dever de Recusa'" class="bloco-condicional">
            <h3>Detalhes do Dever de Recusa</h3>
            <div class="grid-campos">
              <div class="campo">
                <label for="ocorrencia-detalheSelecao">* Principal Risco que levou à recusa</label>
                <select id="ocorrencia-detalheSelecao" v-model="form.detalheSelecao" required>
                  <option value="">Selecione...</option>
                  <option value="Trabalho em altura sem linha de vida">Trabalho em altura sem linha de vida</option>
                  <option value="Trabalho em eletricidade sem bloqueio (LOTO)">Trabalho em eletricidade sem bloqueio (LOTO)</option>
                  <option value="Ferramenta danificada / improvisada">Ferramenta danificada / improvisada</option>
                  <option value="Ausência de Permissão de Trabalho (PT)">Ausência de Permissão de Trabalho (PT)</option>
                </select>
              </div>
              <div class="campo">
                <label for="ocorrencia-acaoImediata">* Ação imediata adotada na recusa</label>
                <select id="ocorrencia-acaoImediata" v-model="form.acaoImediata" required>
                  <option value="">Selecione...</option>
                  <option value="Atividade paralisada e técnico EHS acionado">Atividade paralisada e técnico EHS acionado</option>
                  <option value="Aguardando adequação do equipamento">Aguardando adequação do equipamento</option>
                </select>
              </div>
            </div>
            <div class="campo">
              <label for="ocorrencia-descricaoTexto">* Descreva a atividade interrompida</label>
              <textarea id="ocorrencia-descricaoTexto" v-model.trim="form.descricaoTexto" @input="validarDescricao" rows="3" placeholder="Explique qual tarefa foi paralisada..." required></textarea>
            </div>
          </div>

          <!-- Caso 4: Quase Acidente -->
          <div v-if="form.tipoReporte === 'Quase Acidente'" class="bloco-condicional">
            <h3>Detalhes do Quase Acidente</h3>
            <div class="grid-campos">
              <div class="campo">
                <label for="ocorrencia-detalheSelecao">Principal Risco Observado</label>
                <select id="ocorrencia-detalheSelecao" v-model="form.detalheSelecao">
                  <option value="">Selecione...</option>
                  <option value="Queda de material em altura">Queda de material em altura</option>
                  <option value="Tropeço ou escorregão sem lesão">Tropeço ou escorregão sem lesão</option>
                  <option value="Projeção de partículas / faíscas">Projeção de partículas / faíscas</option>
                  <option value="Quase colisão de veículos">Quase colisão de veículos</option>
                </select>
              </div>
              <div class="campo">
                <label for="ocorrencia-acaoImediata">* Ainda é necessária manutenção ou intervenção?</label>
                <select id="ocorrencia-acaoImediata" v-model="form.acaoImediata" required>
                  <option value="">Selecione...</option>
                  <option value="Sim - Necessário manutenção corretiva urgente">Sim - Necessário manutenção corretiva urgente</option>
                  <option value="Sim - Necessário revisão de procedimento">Sim - Necessário revisão de procedimento</option>
                  <option value="Não - Situação totalmente controlada">Não - Situação totalmente controlada</option>
                </select>
              </div>
            </div>
            <div class="campo">
              <label for="ocorrencia-descricaoTexto">* Descreva o quase acidente</label>
              <textarea id="ocorrencia-descricaoTexto" v-model.trim="form.descricaoTexto" @input="validarDescricao" rows="3" placeholder="Conte como o quase acidente ocorreu..." required></textarea>
            </div>
          </div>

          <!-- Botão único de envio no rodapé -->
          <div class="rodape-acoes">
            <button type="button" @click="router.push('/')" class="btn-cancelar">Cancelar</button>
            <button type="submit" class="btn-enviar">Enviar ao Dashboard</button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useEhsStore } from '../stores/useEhsStore'

const store = useEhsStore()
const router = useRouter()

const hoje = new Date()
const ano = hoje.getFullYear()
const mes = String(hoje.getMonth() + 1).padStart(2, '0')
const dia = String(hoje.getDate()).padStart(2, '0')

const form = reactive({
  data: `${ano}-${mes}-${dia}`,
  observador: '',
  vinculo: 'PRÓPRIO',
  area: '',
  descricaoLocal: '',
  turno: '',
  gravidade: '',
  tipoReporte: '',
  detalheSelecao: '',
  descricaoTexto: '',
  acaoImediata: ''
})

function limparSubcampos() {
  form.detalheSelecao = ''
  form.descricaoTexto = ''
  form.acaoImediata = ''
}

function validarDescricao(event) {
  const campo = event.target
  campo.setCustomValidity(campo.value && !campo.value.trim() ? 'Preencha a descrição.' : '')
}

function salvarOcorrencia() {
  store.adicionarOcorrencia({ ...form })
  alert('Ocorrência enviada com sucesso para o Dashboard!')
  router.push('/')
}
</script>

<style scoped>
.pagina-web { min-height: 100vh; background: #f0f2f5; font-family: sans-serif; padding-bottom: 40px; }

/* Navbar Web */
.navbar-web { background: #4a148c; color: white; padding: 14px 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
.navbar-conteudo { max-width: 960px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
.logo-sistema { display: flex; align-items: center; gap: 12px; }
.icone-escudo { font-size: 1.8rem; }
.logo-sistema h1 { margin: 0; font-size: 1.35rem; }
.logo-sistema small { color: #e1bee7; font-size: 0.85rem; }
.btn-voltar-topo { background: rgba(255,255,255,0.15); color: white; border: 1px solid rgba(255,255,255,0.3); padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold; }
.btn-voltar-topo:hover { background: rgba(255,255,255,0.25); }

/* Container e Card Desktop */
.container-web { max-width: 960px; margin: 30px auto 0; padding: 0 20px; }
.card-formulario { background: white; padding: 32px; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
.cabecalho-card { border-bottom: 1px solid #eee; padding-bottom: 16px; margin-bottom: 24px; }
.cabecalho-card h2 { margin: 0 0 6px 0; color: #4a148c; }
.cabecalho-card p { margin: 0; color: #666; font-size: 0.95rem; }

/* Grade de 2 colunas para desktop */
.grid-campos { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
@media (max-width: 768px) {
  .grid-campos { grid-template-columns: minmax(0, 1fr); }
  .navbar-web { padding-inline: 16px; }
  .navbar-conteudo { flex-wrap: wrap; gap: 12px; }
  .container-web { padding-inline: 12px; }
  .card-formulario { padding: 16px; }
  .rodape-acoes { flex-wrap: wrap; }
}

.campo { margin-bottom: 18px; display: flex; flex-direction: column; }
.campo label, .campo legend { color: #1a237e; font-weight: bold; font-size: 0.9rem; margin-bottom: 6px; }
.campo input[type="date"], .campo select, .campo textarea { padding: 10px 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 0.95rem; background: #fafafa; }
.campo input:focus, .campo select:focus, .campo textarea:focus { outline: 2px solid #5e35b1; outline-offset: 1px; border-color: #5e35b1; background: #fff; }

.grupo-radio { border: 0; padding: 0; margin-inline: 0; min-inline-size: 0; }
.grupo-radio-linha { display: flex; flex-wrap: wrap; gap: 10px; }
.radio-card { background: #f5f5f5; border: 1px solid #ddd; padding: 8px 14px; border-radius: 6px; color: #333 !important; font-weight: normal !important; cursor: pointer; display: flex; align-items: center; gap: 6px; }
.radio-card:hover { background: #ede7f6; border-color: #b39ddb; }

.bloco-condicional { background: #f8f5fc; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #5e35b1; }
.bloco-condicional h3 { margin-top: 0; margin-bottom: 16px; color: #4a148c; font-size: 1.05rem; }

.rodape-acoes { display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; padding-top: 20px; border-top: 1px solid #eee; }
.btn-cancelar { padding: 12px 24px; background: #e0e0e0; color: #333; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }
.btn-enviar { padding: 12px 28px; background: #5e35b1; color: white; border: none; border-radius: 6px; font-size: 1rem; font-weight: bold; cursor: pointer; }
.btn-enviar:hover { background: #4527a0; }
</style>
