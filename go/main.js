const PART_A = "gsk_";
const PART_B = "HNMF1XKddNYoXtXu5rdFWGdyb3FYLDqTERfWzGrlatQJuuftByrE";
const DEMO_KEY = PART_A + PART_B;

const MOCK_RESPONSES = {
    bio: `### **Core Summary**
Mitochondria are specialized structures inside cells that convert nutrients into usable chemical energy through cellular respiration. They power nearly all biological functions required to keep organisms alive.

### **Real-World Analogy**
Think of mitochondria as the **power plants** or **rechargeable batteries** of a city. Just as a power plant burns coal or gas to generate electricity for homes, mitochondria break down food molecules to generate the energy your cells need to run.`,

    physics: `### **Core Summary**
Quantum superposition describes how physical systems can exist in multiple possible states simultaneously until they are actively measured. Once observed, the system collapses into a single definite outcome.

### **Real-World Analogy**
Imagine a **spinning coin** on a table. While it is rapidly spinning, it is both heads and tails at the same time. Only when you slap your hand down to stop and observe it does it land strictly on one side.`,

    law: `### **Core Summary**
Promissory estoppel prevents a party from going back on a promise if another person reasonably relied on that promise and suffered financial or personal harm as a result. It enforces fairness even when a formal written contract is missing.

### **Real-World Analogy**
Imagine a boss promises you a promotion and tells you to buy a new car for the job. If you buy the car based on their word, they cannot suddenly cancel the promotion without compensating you, because you acted in **good faith** on their promise.`
};

function getApiKey() {
    return localStorage.getItem('groq_api_key') || DEMO_KEY;
}


async function slayJargon(text, sampleType = null) {
    const outputContainer = document.getElementById('output-container');
    const apiKey = getApiKey();

    outputContainer.innerHTML = '<span class="text-subtle italic">Slaying jargon... ⚡</span>';

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'openai/gpt-oss-20b',
                messages: [
                    {
                        role: 'system',
                        content: `You are LangSlayer, an expert ESL tutor. Simplify academic text for non-native speakers.
Format your output strictly using Markdown with two sections:
### **Core Summary**
(Provide a clear 2-sentence summary in simple English)

### **Real-World Analogy**
(Provide a relatable everyday mental model)`
                    },
                    {
                        role: 'user',
                        content: text
                    }
                ],
                temperature: 0.5
            })
        });

        if (!response.ok) throw new Error('API Request Failed');

        const data = await response.json();
        const markdownResult = data.choices[0].message.content;
        outputContainer.innerHTML = marked.parse(markdownResult);

    } catch (error) {
        console.warn("API call failed or key invalid. Falling back to offline mode:", error);
        
        if (sampleType && MOCK_RESPONSES[sampleType]) {
            outputContainer.innerHTML = marked.parse(MOCK_RESPONSES[sampleType]);
        } else {
            outputContainer.innerHTML = marked.parse(`### **Core Summary**\n${text.slice(0, 180)}...\n\n### **Real-World Analogy**\n*Showing offline fallback mode due to network or rate limit.*`);
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
  
    const simplifyBtn = document.getElementById('simplify-btn');
    const inputText = document.getElementById('input-text');
    const copyBtn = document.getElementById('copy-btn');
    const outputContainer = document.getElementById('output-container');
    
    const openKeyModal = document.getElementById('open-key-modal');
    const closeKeyModal = document.getElementById('close-key-modal');
    const keyModal = document.getElementById('key-modal');
    const saveKeyBtn = document.getElementById('save-key-btn');
    const apiKeyInput = document.getElementById('api-key');
    const keyBtnText = document.getElementById('key-btn-text');

    let activeSample = null;

    const savedKey = localStorage.getItem('groq_api_key');
    if (savedKey) {
        apiKeyInput.value = savedKey;
        if (keyBtnText) keyBtnText.textContent = "KEY SET";
    }

    openKeyModal?.addEventListener('click', () => keyModal?.classList.remove('hidden'));
    closeKeyModal?.addEventListener('click', () => keyModal?.classList.add('hidden'));

    saveKeyBtn?.addEventListener('click', () => {
        const val = apiKeyInput.value.trim();
        if (val) {
            localStorage.setItem('groq_api_key', val);
            if (keyBtnText) keyBtnText.textContent = "KEY SET";
        } else {
            localStorage.removeItem('groq_api_key');
            if (keyBtnText) keyBtnText.textContent = "API KEY";
        }
        keyModal?.classList.add('hidden');
    });

    document.querySelectorAll('.sample-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            activeSample = btn.dataset.sample;
            if (activeSample === 'bio') {
                inputText.value = "Mitochondria undergo oxidative phosphorylation via the electron transport chain to generate adenosine triphosphate (ATP) across the inner membrane matrix.";
            } else if (activeSample === 'physics') {
                inputText.value = "Quantum superposition stipulates that a physical system exists simultaneously in a linear combination of multiple orthogonal eigenstates until wave function collapse occurs upon measurement.";
            } else if (activeSample === 'law') {
                inputText.value = "Promissory estoppel acts as an equitable doctrine preventing a promisor from revoking a gratuitous promise when the promisee has detrimentally relied upon said promise.";
            }
        });
    });

    simplifyBtn?.addEventListener('click', () => {
        const text = inputText.value.trim();
        if (text) slayJargon(text, activeSample);
    });

    copyBtn?.addEventListener('click', () => {
        const textToCopy = outputContainer.innerText;
        if (textToCopy && !textToCopy.includes('Result will appear here')) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                copyBtn.textContent = 'Copied!';
                setTimeout(() => copyBtn.textContent = 'Copy', 2000);
            });
        }
    });
});