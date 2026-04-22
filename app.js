(function bootstrap() {
  const leadForm = document.getElementById('lead-form');
  const flowSelect = document.getElementById('flow-select');
  const startBtn = document.getElementById('start-btn');
  const questionCard = document.getElementById('question-card');
  const resultCard = document.getElementById('result-card');
  const questionText = document.getElementById('question-text');
  const answerButtons = document.getElementById('answer-buttons');
  const progress = document.getElementById('progress');
  const backBtn = document.getElementById('back-btn');
  const restartBtn = document.getElementById('restart-btn');
  const resultPill = document.getElementById('result-pill');
  const resultReason = document.getElementById('result-reason');
  const historyList = document.getElementById('history-list');
  const historyEmpty = document.getElementById('history-empty');

  const state = {
    lead: null,
    flowKey: null,
    currentStep: 0,
    answers: [],
    history: []
  };

  Object.entries(window.FLOWS).forEach(([key, flow]) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = flow.label;
    flowSelect.appendChild(option);
  });

  function resetFlowUi() {
    questionCard.classList.add('hidden');
    resultCard.classList.add('hidden');
    questionText.textContent = '';
    answerButtons.innerHTML = '';
    progress.textContent = '';
    resultPill.className = 'pill';
    resultPill.textContent = '';
    resultReason.textContent = '';
  }

  function renderHistory() {
    historyList.innerHTML = '';

    if (!state.history.length) {
      historyEmpty.classList.remove('hidden');
      return;
    }

    historyEmpty.classList.add('hidden');

    state.history
      .slice()
      .reverse()
      .forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.timestamp} · ${item.flowLabel} · ${item.leadName} · ${item.status}`;
        historyList.appendChild(li);
      });
  }

  function renderQuestion() {
    const flow = window.FLOWS[state.flowKey];
    const question = flow.questions[state.currentStep];

    if (!question) {
      const score = state.answers.reduce((sum, val) => sum + val, 0);
      const result = window.evaluateLead(score);

      resultPill.textContent = result.status;
      resultPill.className = `pill ${result.className}`;
      resultReason.textContent = `${result.reason} (Pontuação: ${score})`;
      resultCard.classList.remove('hidden');
      questionCard.classList.add('hidden');

      state.history.push({
        timestamp: new Date().toLocaleString('pt-BR'),
        flowLabel: flow.label,
        leadName: state.lead.name,
        status: result.status
      });
      renderHistory();
      return;
    }

    progress.textContent = `Pergunta ${state.currentStep + 1} de ${flow.questions.length}`;
    questionText.textContent = question.text;
    answerButtons.innerHTML = '';

    question.answers.forEach((answer) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn';
      btn.textContent = answer.label;
      btn.addEventListener('click', () => {
        state.answers[state.currentStep] = answer.score;
        state.currentStep += 1;
        renderQuestion();
      });
      answerButtons.appendChild(btn);
    });

    backBtn.disabled = state.currentStep === 0;
  }

  startBtn.addEventListener('click', () => {
    const name = document.getElementById('lead-name').value.trim();
    const phone = document.getElementById('lead-phone').value.trim();
    const email = document.getElementById('lead-email').value.trim();

    if (!leadForm.reportValidity()) {
      return;
    }

    if (!flowSelect.value) {
      alert('Selecione um fluxo para iniciar.');
      return;
    }

    state.lead = { name, phone, email };
    state.flowKey = flowSelect.value;
    state.currentStep = 0;
    state.answers = [];

    resultCard.classList.add('hidden');
    questionCard.classList.remove('hidden');
    renderQuestion();
  });

  backBtn.addEventListener('click', () => {
    if (state.currentStep === 0) {
      return;
    }

    state.currentStep -= 1;
    renderQuestion();
  });

  restartBtn.addEventListener('click', () => {
    state.currentStep = 0;
    state.answers = [];
    resetFlowUi();
  });

  renderHistory();
})();
