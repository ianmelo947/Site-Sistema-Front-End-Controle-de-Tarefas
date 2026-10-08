**Sistema de Monitoramento Climático e Gestão de Tarefas Agrícolas**

Projeto acadêmico desenvolvido no âmbito da disciplina de desenvolvimento web, enquadrado no **Cenário A (Controle de Tarefas)** e integrado com automação de monitoramento meteorológico e tomada de decisão agrícola.

---

##  Integrantes do Grupo
* **Ian Melo de Souza** — Matrícula: 01564577
* **João Matheus Lima Tenório** — Matrícula: 01926906
* **Rafael Rodrigues** — Matrícula: 01940979
* **Pedro Cipriano** — Matrícula:

---

## Sobre o Projeto
O **Alerta Verde** é uma aplicação web interativa desenvolvida para auxiliar produtores rurais e gestores de lavouras no planeamento de tarefas de campo e no acompanhamento de condições meteorológicas em tempo real. 

O sistema cumpre integralmente os requisitos de um painel de controle de tarefas, permitindo o registo, visualização, alteração de estado (conclusão) e exclusão de afazeres, além de incorporar regras de negócio avançadas ligadas à agronomia (cálculo térmico, alertas de climas extremos e recomendações de irrigação baseadas em dados abertos de clima).

---

## Funcionalidades Principais
* **Autenticação Segura:** Sistema de registo e login com validação estrita de força de senha (requisitos de caracteres especiais, maiúsculas e números) e proteção contra injeção de scripts (XSS).
* **Controle de Tarefas Agrícolas (Cenário A):**
  * Cadastro de novas atividades e manejos de campo (com indicação de área/lote).
  * Listagem dinâmica de tarefas cadastradas por utilizador.
  * Marcação interativa de tarefas como concluídas (com feedback visual em tempo real e alteração de estado).
  * Exclusão e gestão individualizada de afazeres isolados por conta no `localStorage`.
* **Monitoramento Climático (API OpenWeatherMap):** Consulta de dados meteorológicos atuais por cidade (temperatura, umidade, vento, pressão e previsão de 5 dias).
* **Simulador Agrícola Inteligente:** 
  * Recomendações dinâmicas de irrigação estruturadas por faixas térmicas.
  * Alertas visuais automáticos de risco de perda de colheita em cenários de climas extremos.
  * Filtro inteligente de cultivos compatíveis com base em limites térmicos de uma base agronómica integrada.
  * Calculadora de estimativa de colheita.

---

## Tecnologias Utilizadas
* **HTML5:** Estruturação semântica e acessível.
* **CSS3:** Estilização responsiva moderna baseada em componentes (*Split Layout*, variáveis CSS e design adaptável para dispositivos móveis e desktops).
* **JavaScript (Vanilla):** Programação orientada a objetos com classes (`class App`), manipulação avançada do DOM, escuta de eventos síncronos e assíncronos (`fetch` para consumo de REST APIs).
* **Persistência Local:** Utilização do `localStorage` do navegador para simular uma base de dados estruturada com isolamento multiutilizador.

---

## Como Executar o Projeto

Como se trata de uma aplicação 100% Front-end baseada em cliente web, a execução é imediata e não requer instalação prévia de servidores de backend ou bases de dados.

1. Faça o download ou clone o repositório contendo os arquivos (`index.html`, `style.css` e `app.js`).
2. Abra a pasta no seu editor de código (como o **VS Code**).
3. Utilize a extensão **Live Server** para iniciar um servidor local de desenvolvimento ou abra o ficheiro `index.html` diretamente no seu navegador web favorito (Chrome, Edge, Firefox ou Safari).
