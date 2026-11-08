/* ==========================================================================
   Seminar Quiz & Dynamic Certificate Generator
   ========================================================================== */

(function () {
  const questions = [
    {
      q: "ما هو الفارق الجوهري والأساسي بين الهكر الأخلاقي (White Hat) والمخترق الخبيث (Black Hat)؟",
      options: [
        "الهكر الأخلاقي يستخدم أدوات سهلة فقط",
        "الحصول على إذن وتصريح مسبق، والعمل بهدف كشف الثغرات وسدها قانونياً",
        "الهكر الأخلاقي لا يحتاج إلى معرفة بلغات البرمجة",
        "المخترق الخبيث يعمل فقط على شبكات الهواتف"
      ],
      correct: 1,
      explanation: "الهكر الأخلاقي يمتلك نفس مهارات المخترق ولكنه يعمل بإذن وتصريح رسمي ووفق إطار قانوني لحماية الأنظمة وكشف الثغرات وإصلاحها."
    },
    {
      q: "ما هي المرحلة الأولى والحاسمة في منهجية اختبار الاختراق الاحترافي (Penetration Testing)؟",
      options: [
        "استغلال الثغرات وكسر كلمات المرور فوراً",
        "تثبيت برمجيات الباب الخلفي (Backdoors)",
        "الاستطلاع وجمع المعلومات (Reconnaissance & Footprinting)",
        "مسح سجلات الخادم (Log Wiping)"
      ],
      correct: 2,
      explanation: "تبدأ أي عملية اختبار اختراق بمرحلة الاستطلاع (Reconnaissance) سواء كانت سلبية أو نشطة لفهم الهدف ورسم خريطته الكاملة قبل توجيه أي هجوم."
    },
    {
      q: "ما هي النسبة التقديرية الحقيقية لحجم الإنترنت العميق (Deep Web) من إجمالي شبكة الإنترنت؟",
      options: [
        "أقل من 5% والباقي متاح في جوجل",
        "حوالي 50% فقط",
        "بين 90% إلى 95% من مجمل بيانات الإنترنت العالمية",
        "الإنترنت العميق غير موجود فعلياً"
      ],
      correct: 2,
      explanation: "الإنترنت السطحي يمثل 4-5% فقط، بينما الـ Deep Web يمثل 90-95% ويشمل قواعد البيانات، السجلات الطبية والبنكية، والشبكات الداخلية الآمنة."
    },
    {
      q: "ما هو التفسير العلمي والتقني الواقعي لأسطورة 'ويب ماريانا' (Mariana's Web)؟",
      options: [
        "شبكة سحرية تتطلب خوارزمية Polymeric وحواسيب فضائية غير معروفة",
        "أسطورة إنترنت شائعة، والبديل الواقعي هو الشبكات المعزولة هوائياً (Air-Gapped) وشبكات الدفاع فائقة السرية (SIPRNet)",
        "هي النسخة التجريبية الأولى من محرك جوجل عام 1998",
        "موقع موجود في متصفح تور يمكن لأي شخص الدخول إليه بضغطة زر"
      ],
      correct: 1,
      explanation: "ماريانا ويب هو موروث خيالي شهير في مجتمعات الإنترنت؛ فالواقع التقني لا يملك خوارزميات مستحيلة رياضياً، بل يعتمد على شبكات حكومية وعسكرية معزولة مادياً (Air-Gapped) ولا ترتبط بالإنترنت إطلاقاً."
    },
    {
      q: "ما الذي يميز هوائي ستارلينك القياسي (Starlink Standard) طبقاً للمواصفات الفنية المعتمدة؟",
      options: [
        "هوائي ذو محركات ميكانيكية ضخمة تحتاج تزييت يومي",
        "مصفوفة طورية إلكترونية بزاوية 110°، حماية بيئية IP67، وراوتر Wi-Fi 6 ثلاثي النطاق 4x4 MU-MIMO",
        "يعتمد على أقمار مدارية ثابتة على ارتفاع 36,000 كم",
        "لا يدعم تشفير البيانات أثناء النقل الفضائي"
      ],
      correct: 1,
      explanation: "يتميز الجيل القياسي من ستارلينك بمصفوفة طورية توجه الحزم الراديوية إلكترونياً دون الحاجة لمحركات متحركة، مع معيار IP67 المقاوم للطقس وسرعات فائقة واستجابة منخفضة عبر أقمار LEO."
    }
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  const quizContainer = document.getElementById('quizContainer');
  const questionNumberEl = document.getElementById('quizQuestionNumber');
  const questionTextEl = document.getElementById('quizQuestionText');
  const optionsContainer = document.getElementById('quizOptionsContainer');
  const explanationEl = document.getElementById('quizExplanation');
  const nextBtn = document.getElementById('quizNextBtn');

  const quizStepEl = document.getElementById('quizStepBox');
  const resultStepEl = document.getElementById('quizResultBox');
  const finalScoreEl = document.getElementById('quizFinalScore');
  const scoreBadgeEl = document.getElementById('quizScoreBadge');
  const attendeeNameInput = document.getElementById('attendeeNameInput');
  const generateCertBtn = document.getElementById('generateCertBtn');
  const certDisplaySection = document.getElementById('certificateDisplaySection');
  const certNameDisplay = document.getElementById('certNameDisplay');
  const certDateDisplay = document.getElementById('certDateDisplay');
  const printCertBtn = document.getElementById('printCertBtn');

  function loadQuestion() {
    if (!quizContainer) return;
    const qData = questions[currentQuestionIndex];
    questionNumberEl.textContent = `السؤال ${currentQuestionIndex + 1} من ${questions.length}`;
    questionTextEl.textContent = qData.q;
    explanationEl.style.display = 'none';
    explanationEl.textContent = '';
    nextBtn.style.display = 'none';

    optionsContainer.innerHTML = '';
    qData.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.innerHTML = `<span>${optText}</span> <span class="mono">#${idx + 1}</span>`;
      btn.addEventListener('click', () => selectAnswer(idx, btn));
      optionsContainer.appendChild(btn);
    });
  }

  function selectAnswer(selectedIndex, selectedBtn) {
    const qData = questions[currentQuestionIndex];
    const allButtons = optionsContainer.querySelectorAll('.quiz-opt-btn');

    allButtons.forEach(btn => btn.disabled = true);

    if (selectedIndex === qData.correct) {
      selectedBtn.classList.add('correct');
      score++;
      if (window.cyberAudio) window.cyberAudio.playAccess();
      explanationEl.innerHTML = `<span style="color:var(--green);font-weight:700;">✓ إجابة صحيحة!</span> ${qData.explanation}`;
    } else {
      selectedBtn.classList.add('wrong');
      allButtons[qData.correct].classList.add('correct');
      if (window.cyberAudio) window.cyberAudio.playGlitch();
      explanationEl.innerHTML = `<span style="color:var(--red);font-weight:700;">✗ إجابة غير دقيقة!</span> ${qData.explanation}`;
    }

    explanationEl.style.display = 'block';
    nextBtn.style.display = 'inline-flex';
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        loadQuestion();
      } else {
        showResults();
      }
    });
  }

  function showResults() {
    quizStepEl.classList.remove('active');
    resultStepEl.classList.add('active');

    finalScoreEl.textContent = `${score} / ${questions.length}`;

    if (score >= 4) {
      scoreBadgeEl.textContent = "خبير أمن سيبراني واعد - ممتاز!";
      scoreBadgeEl.style.color = "var(--green)";
    } else if (score >= 3) {
      scoreBadgeEl.textContent = "مستوى جيد جداً - استمر في التعلم!";
      scoreBadgeEl.style.color = "var(--cyan)";
    } else {
      scoreBadgeEl.textContent = "مشارك نشط - راجع محاور الندوة لتعزيز معلوماتك!";
      scoreBadgeEl.style.color = "var(--amber)";
    }
  }

  if (generateCertBtn) {
    generateCertBtn.addEventListener('click', () => {
      const name = attendeeNameInput.value.trim();
      if (!name) {
        alert("يرجى كتابة الاسم لإصدار الشهادة");
        attendeeNameInput.focus();
        return;
      }

      certNameDisplay.textContent = name;
      const today = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      certDateDisplay.textContent = today.toLocaleDateString('ar-EG', options);

      certDisplaySection.style.display = 'block';
      certDisplaySection.scrollIntoView({ behavior: 'smooth' });

      if (window.cyberAudio) window.cyberAudio.playAccess();
    });
  }

  if (printCertBtn) {
    printCertBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Initialize first question
  loadQuestion();
})();

