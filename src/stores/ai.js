import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAIStore = defineStore('ai', () => {
  // 状态
  const currentQuestion = ref('')
  const currentAnswer = ref(null)
  const suggestedQuestions = ref([
    'What is the average price of a 2-bedroom apartment in London?',
    'Compare rental yields between New York and Tokyo',
    'What is the price trend for Miami real estate in the last 5 years?',
    'Which cities have the highest rental yields in Europe?',
    'What is the forecast for Berlin property prices in 2026?'
  ])
  const isLoading = ref(false)
  
  // 操作
  function setCurrentQuestion(question) {
    currentQuestion.value = question
  }
  
  function setCurrentAnswer(answer) {
    currentAnswer.value = answer
  }
  
  function setSuggestedQuestions(questions) {
    suggestedQuestions.value = questions
  }
  
  function setLoading(status) {
    isLoading.value = status
  }
  
  function clearCurrentQuestion() {
    currentQuestion.value = ''
  }
  
  function clearCurrentAnswer() {
    currentAnswer.value = null
  }
  
  return {
    currentQuestion,
    currentAnswer,
    suggestedQuestions,
    isLoading,
    setCurrentQuestion,
    setCurrentAnswer,
    setSuggestedQuestions,
    setLoading,
    clearCurrentQuestion,
    clearCurrentAnswer
  }
})