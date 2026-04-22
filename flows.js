window.FLOWS = {
  acidente: {
    label: 'Auxílio-Acidente',
    questions: [
      {
        id: 'ac1',
        text: 'Existe sequela permanente após o acidente?',
        answers: [
          { label: 'Sim', score: 2 },
          { label: 'Não', score: -2 }
        ]
      },
      {
        id: 'ac2',
        text: 'A sequela reduziu a capacidade para o trabalho habitual?',
        answers: [
          { label: 'Sim', score: 2 },
          { label: 'Parcialmente', score: 1 },
          { label: 'Não', score: -2 }
        ]
      },
      {
        id: 'ac3',
        text: 'Há documentação médica/laudos mínimos para análise?',
        answers: [
          { label: 'Sim', score: 1 },
          { label: 'Não', score: -1 }
        ]
      }
    ]
  },
  aposentadoria: {
    label: 'Aposentadoria',
    questions: [
      {
        id: 'ap1',
        text: 'A pessoa já contribuiu para o INSS?',
        answers: [
          { label: 'Sim', score: 2 },
          { label: 'Não', score: -3 }
        ]
      },
      {
        id: 'ap2',
        text: 'Possui pelo menos 15 anos de contribuição?',
        answers: [
          { label: 'Sim', score: 2 },
          { label: 'Não', score: -1 }
        ]
      },
      {
        id: 'ap3',
        text: 'Está próximo(a) de cumprir os requisitos de idade/pontos?',
        answers: [
          { label: 'Sim', score: 1 },
          { label: 'Não sei', score: 0 },
          { label: 'Não', score: -1 }
        ]
      }
    ]
  },
  bpc: {
    label: 'BPC/LOAS',
    questions: [
      {
        id: 'bp1',
        text: 'O requerente é idoso (65+) ou pessoa com deficiência?',
        answers: [
          { label: 'Sim', score: 2 },
          { label: 'Não', score: -3 }
        ]
      },
      {
        id: 'bp2',
        text: 'A renda familiar por pessoa está baixa (até 1/4 do salário mínimo)?',
        answers: [
          { label: 'Sim', score: 2 },
          { label: 'Talvez', score: 0 },
          { label: 'Não', score: -2 }
        ]
      },
      {
        id: 'bp3',
        text: 'A família está inscrita ou consegue atualizar o CadÚnico?',
        answers: [
          { label: 'Sim', score: 1 },
          { label: 'Não', score: -1 }
        ]
      }
    ]
  }
};

window.evaluateLead = function evaluateLead(totalScore) {
  if (totalScore >= 4) {
    return {
      status: 'Qualificado',
      className: 'qualificado',
      reason: 'Encaminhar para atendimento jurídico prioritário.'
    };
  }

  if (totalScore >= 1) {
    return {
      status: 'Em revisão',
      className: 'revisao',
      reason: 'Solicitar documentos adicionais e revisar com o jurídico.'
    };
  }

  return {
    status: 'Desqualificado',
    className: 'desqualificado',
    reason: 'Fluxo indica baixa aderência no momento; manter em nutrição de contato.'
  };
};
