**Sistema de Monitoramento Climático e Gestão de Tarefas Agrícolas**

Projeto acadêmico desenvolvido no âmbito da disciplina de desenvolvimento web, enquadrado no **Cenário A (Controle de Tarefas)** e integrado com automação de monitoramento meteorológico e tomada de decisão agrícola.

---

## Integrantes do Grupo
* **Ian Melo de Souza** — Matrícula: 01564577
* **João Matheus Lima Tenório** — Matrícula: 01926906
* **Rafael Rodrigues** — Matrícula: 01940979
* **Pedro Henrique Nascimento Cipriano** — Matrícula: 01894993

---

## Sobre o Projeto
O **Alerta Verde** é uma aplicação web interativa desenvolvida para auxiliar produtores rurais e gestores de lavouras no planejamento de tarefas de campo e no acompanhamento de condições meteorológicas em tempo real. 

O sistema cumpre integralmente os requisitos do **Cenário A (Controle de Tarefas)**, permitindo o registro, visualização, alteração de estado (conclusão) e exclusão de afazeres, além de incorporar regras de negócio avançadas ligadas à agronomia (cálculo térmico, alertas de climas extremos e recomendações de irrigação baseadas em dados abertos de clima).

Futuramente pode ser incluido uma versão mobile rodando tanto em Android quanto IOS, com foco em mobilidade e facilidade de acesso, integração de ferramentas de acessibilidade com pessoas com defificiência, seja ela visual e/ou motora, integração com ferramentas smart como Amazon Alexa e Google Home, Apple Homekit e Samsung SmartThings entre outros para melhor performance e automação residêncial/comercial/corporativa.
---

## Funcionalidades Principais
* **Autenticação Segura:** Sistema de registro e login com validação estrita de força de senha (requisitos de caracteres especiais, maiúsculas e números) e proteção contra injeção de scripts (XSS).
* **Controle de Tarefas Agrícolas (Cenário A):**
  * Cadastro de novas atividades e manejos de campo (com indicação de área/lote).
  * Listagem dinâmica de tarefas cadastradas por usuário.
  * Marcação interativa de tarefas como concluídas (com feedback visual em tempo real e alteração de estado).
  * Exclusão e gestão individualizada de afazeres isolados por conta no `localStorage`.
* **Monitoramento Climático (API OpenWeatherMap):** Consulta de dados meteorológicos atuais por cidade (temperatura, umidade, vento, pressão e previsão de 5 dias).
* **Simulador Agrícola Inteligente:** 
  * Recomendações dinâmicas de irrigação estruturadas por faixas térmicas.
  * Alertas visuais automáticos de risco de perda de colheita em cenários de climas extremos.
  * Filtro inteligente de cultivos compatíveis com base em limites térmicos de uma base agronômica integrada.
  * Calculadora de estimativa de colheita.

---

## Tecnologias Utilizadas
* **HTML5:** Estruturação semântica e acessível.
* **CSS3:** Estilização responsiva moderna baseada em componentes (*Split Layout*, variáveis CSS e design adaptável para dispositivos móveis e desktops).
* **JavaScript (Vanilla JS):** Programação orientada a objetos com classes (`class App`), manipulação avançada do DOM, escuta de eventos síncronos e assíncronos (`fetch` para consumo de REST APIs).
* **Git & GitHub:** Versionamento do código com histórico de commits e fluxo de desenvolvimento baseado em *branches*.
* **Persistência Local:** Utilização do `localStorage` do navegador para simular uma base de dados estruturada com isolamento multiusuário.

---

## Estrutura do Projeto
```text
/
├── index.html       # Interface principal e componentes da aplicação
├── style.css        # Estilização global, layout flex/grid e responsividade
├── app.js           # Lógica do app, manipulação do DOM e integração com API
└── README.md        # Documentação completa do projeto
