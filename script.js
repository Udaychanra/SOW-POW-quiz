// ===== QUIZ DATA =====
const quizQuestions = [
  {
    stage: 0,
    stageLabel: "PREPARE THE GROUND",
    question:
      "When you imagine building serious, generational wealth — what feels most true right now?",
    options: [
      {
        text: "Honestly, part of me wonders if real wealth is actually for people like me.",
        value: 1,
      },
      {
        text: "I believe it's possible — I just don't know where to begin.",
        value: 2,
      },
      {
        text: "I'm already taking steps. I just need the right sequence.",
        value: 3,
      },
      {
        text: "I'm actively building. I need the framework to protect and grow what I have.",
        value: 4,
      },
    ],
  },
  {
    stage: 1,
    stageLabel: "SECURE THE SOIL",
    question:
      "How many months of living expenses do you currently have in a liquid, accessible savings account?",
    options: [
      { text: "Less than 1 month", value: 1 },
      { text: "1 to 3 months", value: 2 },
      { text: "3 to 6 months", value: 3 },
      { text: "6 months or more — fully funded", value: 4 },
    ],
  },
  {
    stage: 1,
    stageLabel: "SECURE THE SOIL",
    question:
      "Do you currently carry high-interest debt — credit cards, personal loans, or anything above 8%?",
    options: [
      {
        text: "Yes — a significant amount I'm actively working through",
        value: 1,
      },
      { text: "Some, but I'm paying it down", value: 2 },
      { text: "Very little — almost cleared", value: 3 },
      {
        text: "No — debt-free or only low-interest debt remains",
        value: 4,
      },
    ],
  },
  {
    stage: 2,
    stageLabel: "OWN THE STRUCTURE",
    question: "Which of the following do you currently have in place?",
    options: [
      {
        text: "None of these — this is a gap I need to address",
        value: 1,
      },
      {
        text: "A will and named beneficiaries on my accounts",
        value: 2,
      },
      {
        text: "An LLC or legal entity protecting my assets or business",
        value: 3,
      },
      {
        text: "Both — a legal entity AND a will with named beneficiaries",
        value: 4,
      },
    ],
  },
  {
    stage: 2,
    stageLabel: "OWN THE STRUCTURE",
    question:
      "Have you worked with a CPA on a wealth-building tax strategy — not just filing your returns?",
    options: [
      { text: "No — I just file each year and move on", value: 1 },
      {
        text: "Once or twice, but no ongoing strategy in place",
        value: 2,
      },
      {
        text: "Yes — I have an active tax strategy I review regularly",
        value: 4,
      },
    ],
  },
  {
    stage: 3,
    stageLabel: "WATER THE ROOTS",
    question:
      "Beyond a savings account, do you have access to structured liquid capital you can use without penalties?",
    options: [
      {
        text: "No — my savings account is my only accessible money",
        value: 1,
      },
      {
        text: "I have investments, but limited access without triggering penalties or taxes",
        value: 2,
      },
      {
        text: "Yes — HELOC, cash value insurance, or a similar vehicle",
        value: 4,
      },
    ],
  },
  {
    stage: 3,
    stageLabel: "WATER THE ROOTS",
    question:
      "Do you currently have any life insurance that builds cash value as a financial tool?",
    options: [
      { text: "No life insurance at all", value: 1 },
      { text: "Term life only — protection, but no cash value", value: 2 },
      {
        text: "Yes — whole life or IUL with growing, accessible cash value",
        value: 4,
      },
    ],
  },
  {
    stage: 4,
    stageLabel: "PROTECT THE HARVEST",
    question:
      "Do you have a strategy to create tax-free income in retirement — beyond a standard 401k or traditional IRA?",
    options: [
      {
        text: "No — I'm focused on building savings before thinking about retirement vehicles",
        value: 1,
      },
      { text: "Just a 401k or traditional IRA", value: 2 },
      {
        text: "Yes — I actively use a Roth, IUL, or other tax-free retirement vehicle",
        value: 4,
      },
    ],
  },
  {
    stage: 5,
    stageLabel: "OPEN THE GATES",
    question: "How far does your genuine financial planning horizon extend?",
    options: [
      {
        text: "Month to month — I'm in stability-building mode",
        value: 1,
      },
      { text: "1 to 5 years — focused on near-term goals", value: 2 },
      { text: "5 to 20 years — building toward retirement", value: 3 },
      {
        text: "20 to 100 years — I'm thinking about what I leave behind",
        value: 4,
      },
    ],
  },
  {
    stage: 6,
    stageLabel: "WRITE THE LEGACY",
    question: "Do you have any formal legacy planning currently in place?",
    options: [
      { text: "No — I haven't gotten there yet", value: 1 },
      { text: "A basic will and named beneficiaries", value: 2 },
      { text: "A trust structure and formal asset transfer plan", value: 3 },
      {
        text: "Yes — dynasty trust, family governance, or next-generation training in place",
        value: 4,
      },
    ],
  },
];

// ===== STAGE RESULTS =====
const stageResults = {
  seed: {
    emoji: "🌱",
    title: "Seed Stage",
    subtitle: "Foundation Building",
    description: "You're in the ideation and validation phase. Focus on validating your concept, building an MVP, and finding your first customers. This is about learning, iterating, and proving the core idea works."
  },
  sprout: {
    emoji: "🌿",
    title: "Sprout Stage",
    subtitle: "Early Traction",
    description: "You have initial traction and early customers. Focus on refining your product, building repeatable selling motions, and establishing product-market fit. This stage is about proving repeatability."
  },
  growth: {
    emoji: "🌻",
    title: "Growth Stage",
    subtitle: "Rapid Expansion",
    description: "You've achieved product-market fit and are scaling rapidly. Focus on scaling your operations, building strong systems, and accelerating customer acquisition. This stage is about scaling and efficiency."
  },
  harvest: {
    emoji: "🌾",
    title: "Harvest Stage",
    subtitle: "Mature Operations",
    description: "You have a mature, profitable business with strong operations. Focus on optimizing profitability, exploring new markets, or planning for exit/next chapter. This stage is about maximizing returns."
  }
};

// ===== STATE MANAGEMENT =====
let currentQuestionIndex = 0;
let scores = [0, 0, 0, 0]; // 4 score buckets for different stage scoring
let selectedAnswers = [];

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('Quiz app loaded');
});

// ===== CORE FUNCTIONS =====

/**
 * Start the quiz
 */
function startQuiz() {
  console.log('Starting quiz...');
  currentQuestionIndex = 0;
  scores = [0, 0, 0, 0];
  selectedAnswers = [];
  
  document.getElementById('s-intro').style.display = 'none';
  document.getElementById('s-question').style.display = 'block';
  document.getElementById('s-results').style.display = 'none';
  
  displayQuestion();
}

/**
 * Display current question
 */
function displayQuestion() {
  const question = quizQuestions[currentQuestionIndex];
  
  if (!question) {
    console.error('Question not found at index:', currentQuestionIndex);
    showResults();
    return;
  }
  
  try {
    // Update progress
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    
    // Update question number
    document.getElementById('q-number').textContent = 
      `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    
    // Update question text
    document.getElementById('q-text').textContent = question.question;
    
    // Render options
    const optsContainer = document.getElementById('opts');
    optsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
      const optBtn = document.createElement('button');
      optBtn.className = 'opt';
      optBtn.textContent = option.text;
      optBtn.onclick = () => selectOption(index, option.value);
      optsContainer.appendChild(optBtn);
    });
    
    // Hide next button initially
    document.getElementById('btn-next').style.display = 'none';
    
  } catch (error) {
    console.error('Error displaying question:', error);
  }
}

/**
 * Handle option selection
 */
function selectOption(optionIndex, scoreValue) {
  try {
    // Remove previous selection
    const options = document.querySelectorAll('.opt');
    options.forEach(opt => opt.classList.remove('selected'));
    
    // Mark selected
    options[optionIndex].classList.add('selected');
    
    // Store answer
    selectedAnswers[currentQuestionIndex] = scoreValue;
    
    // Add to score (repeat the value across all buckets for now, simplified)
    for (let i = 0; i < scores.length; i++) {
      scores[i] += scoreValue;
    }
    
    // Show next button
    document.getElementById('btn-next').style.display = 'block';
    
    console.log('Option selected:', scoreValue, 'Total scores:', scores);
    
  } catch (error) {
    console.error('Error in selectOption:', error);
  }
}

/**
 * Move to next question or show results
 */
function nextQ() {
  try {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      currentQuestionIndex++;
      displayQuestion();
    } else {
      showResults();
    }
  } catch (error) {
    console.error('Error in nextQ:', error);
  }
}

/**
 * Calculate stage based on scores
 */
function getStage() {
  // Calculate average score
  const avgScore = scores[0] / quizQuestions.length;
  
  console.log('Average score:', avgScore);
  
  if (avgScore <= 1.5) {
    return 'seed';
  } else if (avgScore <= 2.5) {
    return 'sprout';
  } else if (avgScore <= 3.5) {
    return 'growth';
  } else {
    return 'harvest';
  }
}

/**
 * Show results screen
 */
function showResults() {
  try {
    document.getElementById('s-question').style.display = 'none';
    document.getElementById('s-intro').style.display = 'none';
    document.getElementById('s-results').style.display = 'block';
    
    const stage = getStage();
    const result = stageResults[stage];
    
    console.log('Showing results for stage:', stage);
    
    if (!result) {
      console.error('Stage result not found:', stage);
      return;
    }
    
    // Build results HTML
    let resultsHTML = `
      <div class="results-emoji">${result.emoji}</div>
      <h2 class="results-title">${result.title}</h2>
      <p class="results-subtitle">${result.subtitle}</p>
      <div class="results-description">
        ${result.description}
      </div>
      
      <div class="email-box">
        <label class="email-label">Get Your Personalized Report</label>
        <input 
          type="text" 
          id="lead-first-name" 
          class="email-input" 
          placeholder="First Name"
          required
        />
        <input 
          type="email" 
          id="lead-email" 
          class="email-input" 
          placeholder="your@email.com"
          required
        />
        <button class="btn-download" onclick="submitLead('${stage}')">
          Get My Personalized SOW POW Roadmap
        </button>
      </div>
      
      <button class="btn-gold" onclick="startQuiz()">
        Take Quiz Again
      </button>
      
      <p class="follow-text">
        Follow @1smallseed for everything that comes next
      </p>
    `;
    
    document.getElementById('res-card').innerHTML = resultsHTML;
    
  } catch (error) {
    console.error('Error in showResults:', error);
    alert('Error displaying results. Please try again.');
  }
}

/**
 * Send personalized roadmap email via server-side Resend API.
 * @param {object} emailPayload - From prepareEmailPayload()
 */
async function sendRoadmapEmail(emailPayload) {
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(emailPayload),
  });

  let result = {};
  try {
    result = await response.json();
  } catch (_) {
    /* non-JSON error body */
  }

  if (!response.ok) {
    throw new Error(result.error || 'Failed to send your roadmap email');
  }

  return result;
}

/**
 * Submit lead to Supabase and prepare personalized email payload
 */
async function submitLead(stage) {
  try {
    // Get form values
    const firstName = document.getElementById('lead-first-name').value.trim();
    const email = document.getElementById('lead-email').value.trim();
    
    // Validate first name
    if (!firstName || firstName.length < 2) {
      console.warn('First name validation failed:', firstName);
      showError('Please enter a valid first name');
      return;
    }
    
    // Validate email
    if (!email || !email.includes('@')) {
      console.warn('Email validation failed:', email);
      showError('Please enter a valid email address');
      return;
    }

    const quizResult = stageResults[stage];
    if (!quizResult) {
      console.error('Stage result not found for payload:', stage);
      showError('Unable to prepare your roadmap. Please try again.');
      return;
    }

    const stageResult = {
      stageKey: stage,
      emoji: quizResult.emoji,
      title: quizResult.title,
      subtitle: quizResult.subtitle,
      description: quizResult.description,
    };
    const userData = { firstName, email };

    if (typeof prepareEmailPayload !== 'function') {
      console.error('prepareEmailPayload is not available');
      showError('Email system is still loading. Please try again.');
      return;
    }

    const emailPayload = prepareEmailPayload(stageResult, userData);
    window.lastEmailPayload = emailPayload;

    console.log('📧 Email payload prepared:', emailPayload);
    console.log('📝 Form data ready:', { firstName, email, stage });
    
    // Make sure Supabase is initialized
    if (typeof supabaseClient === 'undefined') {
      console.error('❌ Supabase client not initialized');
      showError('Supabase connection error. Please refresh and try again.');
      return;
    }
    
    console.log('🔄 Submitting to Supabase...');
    
    // Insert into database - ONLY send fields that exist in the table: first_name, email, stage
    const { data, error } = await supabaseClient
      .from('quiz_leads')
      .insert([
        {
          first_name: firstName,
          email: email,
          stage: stage
        }
      ]);
    
    if (error) {
      console.error('❌ Supabase insert error:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        details: error.details
      });
      showError('Error saving your information: ' + (error.message || 'Unknown error'));
      return;
    }
    
    console.log('✅ Lead submitted successfully!');
    console.log('Database record:', data);

    console.log('📤 Sending roadmap email...');
    try {
      await sendRoadmapEmail(emailPayload);
      console.log('✅ Roadmap email sent');
    } catch (emailError) {
      console.error('❌ Email send error:', emailError);
      showError(
        emailError.message ||
          'Your information was saved, but we could not email your roadmap. Please try again.'
      );
      return;
    }
    
    showSuccess('Thank you! Your personalized SOW POW roadmap is on its way.');
    
    // Reset quiz after delay
    setTimeout(() => {
      console.log('🔄 Resetting quiz...');
      startQuiz();
    }, 2000);
    
  } catch (error) {
    console.error('❌ Unexpected error in submitLead:', error);
    console.error('Error stack:', error.stack);
    showError('An unexpected error occurred. Please try again.');
  }
}

/**
 * Show error message
 */
function showError(message) {
  try {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-text';
    errorDiv.textContent = message;
    
    const emailInput = document.getElementById('lead-email');
    if (emailInput) {
      emailInput.parentNode.appendChild(errorDiv);
      
      // Remove after 5 seconds
      setTimeout(() => {
        errorDiv.remove();
      }, 5000);
    }
  } catch (error) {
    console.error('Error showing error message:', error);
    alert(message);
  }
}

/**
 * Show success message
 */
function showSuccess(message) {
  try {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-text';
    successDiv.textContent = message;
    
    const emailInput = document.getElementById('lead-email');
    if (emailInput) {
      emailInput.parentNode.appendChild(successDiv);
      
      // Remove after 3 seconds
      setTimeout(() => {
        successDiv.remove();
      }, 3000);
    }
  } catch (error) {
    console.error('Error showing success message:', error);
  }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});
