# Controle de Ocupação - Escritório

Sistema de agendamento para controlar a ocupação do escritório do time de marketing.

## Setup Local (Desenvolvimento)

### 1. Instalar Node.js
Baixe em: https://nodejs.org/

### 2. Clonar/Baixar os arquivos
Coloque todos os arquivos em uma pasta:
```
projeto/
├── server.js
├── package.json
├── agendamentos.json (será criado automaticamente)
└── public/
    └── index.html
```

### 3. Instalar dependências
Abra o terminal na pasta do projeto e rode:
```bash
npm install
```

### 4. Rodar localmente
```bash
npm start
```

Acesse: http://localhost:3000

---

## Deploy no Render.com (Grátis e Online)

### Passo 1: Criar conta no Render
1. Vai em https://render.com
2. Clica em "Sign Up"
3. Usa GitHub, Google ou email

### Passo 2: Subir pra GitHub
1. Cria um repositório no GitHub com esses arquivos:
   - server.js
   - package.json
   - public/index.html

2. Faz o push:
```bash
git add .
git commit -m "Inicial"
git push origin main
```

### Passo 3: Deploy no Render
1. Vai em https://render.com/dashboard
2. Clica em "New +" → "Web Service"
3. Conecta seu GitHub
4. Seleciona o repositório
5. Preenche:
   - **Name**: controle-ocupacao (ou o nome que quiser)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Clica em "Create Web Service"
7. Espera fazer deploy (leva ~2-3 minutos)
8. Copia a URL que aparece (ex: https://controle-ocupacao.onrender.com)

### Pronto! 🚀
Compartilha o link com o time. Todos podem acessar e mexer nos agendamentos!

---

## Como Funciona

### Backend (server.js)
- Express.js roda as rotas da API
- Dados são salvos em um arquivo JSON (`agendamentos.json`)
- Quando alguém clica em "Salvar", os dados vão pro servidor e ficam persistentes

### Frontend (index.html)
- Faz requisições GET/POST/DELETE pra API
- Sincroniza com os dados salvos no servidor
- Calendário mostra vagas disponíveis em tempo real

### Estrutura dos Dados
```json
{
  "Augusto": ["15/07/2026", "18/07/2026"],
  "Ana Carolina": ["14/07/2026"],
  "Carolina": [],
  ...
}
```

---

## Endpoints da API

### GET /api/agendamentos
Retorna todos os agendamentos

### POST /api/agendamentos
Adiciona uma data para um colaborador
```json
{
  "colaborador": "Augusto",
  "data": "15/07/2026"
}
```

### DELETE /api/agendamentos/:colaborador/:data
Remove uma data

### PUT /api/agendamentos/:colaborador
Atualiza todas as datas de um colaborador
```json
{
  "datas": ["15/07/2026", "18/07/2026"]
}
```

---

## Troubleshooting

**Erro: "Cannot find module 'express'"**
- Rode: `npm install`

**Dados desaparecem ao dar F5**
- Verifica se o `agendamentos.json` foi criado
- Confere permissões de escrita na pasta

**Não consegue fazer deploy no Render**
- Certifica que tá tudo no GitHub
- Verifica se o package.json tá correto
- Tenta fazer um push novo

---

## Suporte
Se tiver problemas, me manda uma mensagem! 💪
