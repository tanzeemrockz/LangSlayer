const simplifyBtn = document.getElementById('simplify-btn')
const inputText = document.getElementById('input-text')
const outputContainer = document.getElementById('output-container')
const copyBtn = document.getElementById('copy-btn')

const keyModal = document.getElementById('key-modal')
const openKeyModal = document.getElementById('open-key-modal')
const closeKeyModal = document.getElementById('close-key-modal')
const saveKeyBtn = document.getElementById('save-key-btn')
const apiKeyInput = document.getElementById('api-key')
const keyBtnText = document.getElementById('key-btn-text')

let savedKey = localStorage.getItem('groq_api_key') || ''
if (savedKey) {
  apiKeyInput.value = savedKey
  keyBtnText.innerText = 'KEY SAVED ✓'
}

openKeyModal.addEventListener('click', () => keyModal.classList.remove('hidden'))
closeKeyModal.addEventListener('click', () => keyModal.classList.add('hidden'))

saveKeyBtn.addEventListener('click', () => {
  savedKey = apiKeyInput.value.trim()
  localStorage.setItem('groq_api_key', savedKey)
  keyBtnText.innerText = savedKey ? 'KEY SAVED ✓' : 'API KEY'
  keyModal.classList.add('hidden')
})

const samples = {
  bio: "Mitochondrial oxidative phosphorylation generates adenosine triphosphate (ATP) via an electrochemical proton gradient across the inner mitochondrial membrane, driven by electron transport chain complexes.",
  physics: "According to quantum superposition, a physical system exists partially in all its particular theoretical states simultaneously until an act of measurement causes the wave function to collapse into a definite state.",
  law: "Promissory estoppel enforces a non-contractual promise when the promisee reasonably relies on it to their detriment, preventing the promisor from asserting lack of consideration as a defense."
}

document.querySelectorAll('.sample-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.getAttribute('data-sample')
    if (samples[key]) {
      inputText.value = samples[key]
    }
  })
})

copyBtn.addEventListener('click', () => {
  const text = outputContainer.innerText
  if (text && !text.includes('Result will appear here')) {
    navigator.clipboard.writeText(text)
    copyBtn.innerHTML = '<i class="fa-solid fa-check mr-1 text-cyan"></i> Copied!'
    setTimeout(() => { 
      copyBtn.innerHTML = '<i class="fa-regular fa-copy mr-1"></i> Copy' 
    }, 2000)
  }
})

simplifyBtn.addEventListener('click', async () => {
  const text = inputText.value.trim()

  if (!savedKey) {
    keyModal.classList.remove('hidden')
    return
  }

  if (!text) {
    outputContainer.innerHTML = '<span class="text-pink">Please enter or select some text first!</span>'
    return
  }

  outputContainer.innerHTML = '<span class="text-cyan animate-pulse"><i class="fa-solid fa-bolt mr-2"></i>Slaying jargon...</span>'

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${savedKey}`
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [
          {
            role: 'system',
            content: 'You are an ESL learning assistant. Rewrite complex academic text into clear, simple English for non-native speakers. Provide a 2-sentence simplified summary followed by an everyday analogy.'
          },
          {
            role: 'user',
            content: text
          }
        ]
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(`Groq API Error (${response.status}): ${data.error?.message || 'Unknown Error'}`)
    }

    outputContainer.innerHTML = marked.parse(data.choices[0].message.content)
  } catch (error) {
    outputContainer.innerHTML = `<span class="text-pink">${error.message}</span>`
  }
})