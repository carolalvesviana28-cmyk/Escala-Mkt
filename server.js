const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Arquivo de banco de dados
const dbFile = path.join(__dirname, 'agendamentos.json');

// Inicializar banco de dados se não existir
function inicializarDB() {
  if (!fs.existsSync(dbFile)) {
    const dadosIniciais = {
      'Augusto': [],
      'Ana Carolina': [],
      'Carolina': [],
      'Daphne': [],
      'Luis': [],
      'Jéssica': [],
      'Sarah': []
    };
    fs.writeFileSync(dbFile, JSON.stringify(dadosIniciais, null, 2));
  }
}

// Ler agendamentos
function lerAgendamentos() {
  try {
    const dados = fs.readFileSync(dbFile, 'utf8');
    return JSON.parse(dados);
  } catch (err) {
    console.error('Erro ao ler agendamentos:', err);
    return {};
  }
}

// Salvar agendamentos
function salvarAgendamentos(dados) {
  try {
    fs.writeFileSync(dbFile, JSON.stringify(dados, null, 2));
    return true;
  } catch (err) {
    console.error('Erro ao salvar agendamentos:', err);
    return false;
  }
}

// ===== ROTAS =====

// GET: Carregar todos os agendamentos
app.get('/api/agendamentos', (req, res) => {
  const agendamentos = lerAgendamentos();
  res.json(agendamentos);
});

// POST: Adicionar uma data para um colaborador
app.post('/api/agendamentos', (req, res) => {
  const { colaborador, data } = req.body;

  if (!colaborador || !data) {
    return res.status(400).json({ erro: 'Colaborador e data são obrigatórios' });
  }

  const agendamentos = lerAgendamentos();

  if (!agendamentos[colaborador]) {
    return res.status(400).json({ erro: 'Colaborador não existe' });
  }

  // Verificar se a data já existe
  if (agendamentos[colaborador].includes(data)) {
    return res.status(400).json({ erro: 'Data já agendada para este colaborador' });
  }

  agendamentos[colaborador].push(data);
  
  if (salvarAgendamentos(agendamentos)) {
    res.json({ sucesso: true, mensagem: 'Data adicionada com sucesso' });
  } else {
    res.status(500).json({ erro: 'Erro ao salvar' });
  }
});

// DELETE: Remover uma data de um colaborador
app.delete('/api/agendamentos/:colaborador/:data', (req, res) => {
  const { colaborador, data } = req.params;
  const dataDecodificada = decodeURIComponent(data);

  const agendamentos = lerAgendamentos();

  if (!agendamentos[colaborador]) {
    return res.status(400).json({ erro: 'Colaborador não existe' });
  }

  const index = agendamentos[colaborador].indexOf(dataDecodificada);
  
  if (index === -1) {
    return res.status(400).json({ erro: 'Data não encontrada' });
  }

  agendamentos[colaborador].splice(index, 1);

  if (salvarAgendamentos(agendamentos)) {
    res.json({ sucesso: true, mensagem: 'Data removida com sucesso' });
  } else {
    res.status(500).json({ erro: 'Erro ao salvar' });
  }
});

// PUT: Atualizar todos os agendamentos de um colaborador
app.put('/api/agendamentos/:colaborador', (req, res) => {
  const { colaborador } = req.params;
  const { datas } = req.body;

  if (!Array.isArray(datas)) {
    return res.status(400).json({ erro: 'Datas deve ser um array' });
  }

  const agendamentos = lerAgendamentos();

  if (!agendamentos[colaborador]) {
    return res.status(400).json({ erro: 'Colaborador não existe' });
  }

  agendamentos[colaborador] = datas;

  if (salvarAgendamentos(agendamentos)) {
    res.json({ sucesso: true, mensagem: 'Agendamentos atualizados com sucesso' });
  } else {
    res.status(500).json({ erro: 'Erro ao salvar' });
  }
});

// Inicializar
inicializarDB();

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📁 Dados sendo salvos em: ${dbFile}`);
});
