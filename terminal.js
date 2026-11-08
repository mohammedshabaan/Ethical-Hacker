/* ==========================================================================
   Cyber Terminal Simulator - Interactive CLI for Attendees
   ========================================================================== */

(function () {
  const terminalScreen = document.getElementById('terminalScreen');
  const terminalInput = document.getElementById('terminalInput');
  if (!terminalScreen || !terminalInput) return;

  const commands = {
    help: `
[+] الأوامر المتاحة في الطرفية التعليمية:
  • help          - عرض قائمة الأوامر المتاحة
  • whoami        - هوية الحاضر ودور الهكر الأخلاقي
  • nmap          - محاكاة فحص منافذ وخوادم (Port Scanning)
  • phases        - عرض المراحل الخمس لاختبار الاختراق
  • layers        - استعراض طبقات الإنترنت (السطحي، الديب، الدارك)
  • mariana       - فك لغز ويب ماريانا (الحقيقة والأسطورة)
  • starlink      - فحص حالة اتصال قمر ستارلينك ومواصفاته
  • decrypt       - تجربة فك تشفير خوارزمية وهمية
  • tools         - قائمة بأشهر أدوات كالي لينكس
  • clear         - تنظيف شاشة الطرفية
`,
    whoami: `
[i] الهوية الحالية: Ethical Hacker / Security Researcher (White Hat)
[i] الغرض: حماية الأنظمة واكتشاف الثغرات وتأمين البنى التحتية الحيوية.
[+] الحالة: مصرح لك بإجراء اختبارات الاختراق الأخلاقية في نطاق الندوة.
`,
    nmap: `
[+] بدء فحص Nmap 7.94 على الهدف الافتراضي (target.local)...
Starting Nmap ( https://nmap.org ) at 2026-11-08 09:30 UTC
Nmap scan report for target.local (192.168.1.105)
Host is up (0.0024s latency).
Not shown: 994 closed tcp ports (reset)
PORT     STATE SERVICE       VERSION
21/tcp   open  ftp           vsftpd 2.3.4 (VULNERABLE: Backdoor detected!)
22/tcp   open  ssh           OpenSSH 8.9p1 (Protocol 2.0)
80/tcp   open  http          Apache httpd 2.4.52 (Ubuntu)
443/tcp  open  ssl/https     OpenSSL 3.0.2
3306/tcp open  mysql         MySQL 8.0.32
8080/tcp open  http-proxy    HAProxy 2.4.18

[!] توصية أمنية: إغلاق منفذ 21 فوراً وتحديث خدمة FTP وتطبيق جدار ناري WAF.
`,
    phases: `
[+] المراحل الخمس لاختبار الاختراق الاحترافي (Penetration Testing Phases):
  1. الاستطلاع وجمع المعلومات (Reconnaissance) - Passive & Active OSINT
  2. الفحص وتحديد الثغرات (Scanning & Enumeration) - Nmap, Nessus
  3. استغلال الثغرات والوصول (Gaining Access) - Exploitation, SQLi, Buffer Overflow
  4. تثبيت الوصول واستمراريته (Maintaining Access) - Backdoors, Privilege Escalation
  5. تغطية الأثر والتوثيق (Clearing Tracks & Reporting) - Log analysis, Hardening
`,
    layers: `
[+] طبقات شبكة الإنترنت العالمية:
  [1] السطحي (Surface Web)  ~4-5%  : المواقع المفهرسة بمحركات البحث (Google, Wikipedia)
  [2] العميق  (Deep Web)    ~90-95%: قواعد بيانات، بنوك، سحابية، بوابات داخلية خاصة
  [3] المظلم  (Dark Web)    ~1%    : شبكات Tor, I2P, Freenet المشفرة بصلياً (.onion)
  [4] ماريانا (Mariana Web)        : أساطير الويب العميق والواقع الحقيقي للشبكات المعزولة.
`,
    mariana: `
[!] تقرير فك غموض "ويب ماريانا" (Mariana's Web Dossier):
  [x] الأسطورة (Myth) : مستوى خيالي يتطلب حوسبة كمية وخوارزميات Polymeric Falcighun.
  [v] الواقع (Reality): في الأمن القومي توجد شبكات معزولة هوائياً تماماً (Air-Gapped)
       مثل SIPRNet و JWICS وشبكات التشفير الفوتوني (QKD). لا توجد شبكة سحرية خفية!
`,
    starlink: `
[+] فحص رابط الفضاء السيبراني - SpaceX Starlink Terminal:
  • الجهاز: Starlink Standard Antenna (Electronic Phased Array)
  • زاوية الرؤية: 110° Field of View
  • نوع التوجيه: Software-assisted Electronic Beamforming
  • الحماية البيئية: IP67 (مقاوم للغمر والأتربة حتى عمق 1 متر)
  • درجات الحرارة: -30°C إلى +50°C | مقاومة رياح: > 96 كم/ساعة
  • الراوتر: Wi-Fi 6 (802.11 a/b/g/n/ac/ax) Tri-Band 4x4 MU-MIMO
  • الأمان السيبراني: Anti-jamming firmware, Space-laser Inter-satellite mesh.
  • الحالة: LINK ESTABLISHED (Latency: 28ms | Downlink: 215 Mbps)
`,
    decrypt: `
[+] جاري فك شفرة البيلود المشفر...
  [░░░░░░░░░░] 0%
  [████░░░░░░] 45% (Analyzing Hash...)
  [██████████] 100% SUCCESS!
  [Key Detected]: AES-256-GCM
  [Decrypted Message]: "الأمن السيبراني ليس منتجاً تشتريه، بل عملية مستمرة ووعي دائم."
`,
    tools: `
[+] ترسانة الهكر الأخلاقي الأساسية (Essential Arsenal):
  • Nmap        : فحص الشبكات واستكشاف المنافذ والخدمات
  • Wireshark   : تحليل وتتبع حزم البيانات المنقولة عبر الشبكة (Sniffing)
  • Metasploit  : بيئة اختبار وتطوير استغلال الثغرات البرمجية
  • Burp Suite  : اعتراض وفحص ثغرات تطبيقات الويب (XSS, SQLi, CSRF)
  • John/Hydra  : تدقيق قوة كلمات المرور والتشفير
`,
    clear: ''
  };

  function appendOutput(html) {
    const div = document.createElement('div');
    div.className = 'term-line';
    div.innerHTML = html;
    terminalScreen.appendChild(div);
    terminalScreen.scrollTop = terminalScreen.scrollHeight;
  }

  function handleCommand(cmd) {
    const cleanCmd = cmd.trim().toLowerCase();
    appendOutput(`<span class="term-prompt">user@ethical-hacker:~$</span> <span class="term-cmd">${escapeHtml(cmd)}</span>`);

    if (window.cyberAudio) window.cyberAudio.playClick();

    if (cleanCmd === '') return;

    if (cleanCmd === 'clear') {
      terminalScreen.innerHTML = '';
      return;
    }

    if (commands[cleanCmd]) {
      const output = commands[cleanCmd].trim();
      appendOutput(`<pre class="term-out">${output}</pre>`);
      if (cleanCmd === 'decrypt' && window.cyberAudio) {
        window.cyberAudio.playAccess();
      }
    } else {
      if (window.cyberAudio) window.cyberAudio.playGlitch();
      appendOutput(`<span style="color:#ff5555;">[!] الأمر غير معروف: "${escapeHtml(cmd)}". اكتب <span style="color:#00f0ff;">help</span> لعرض الأوامر المتاحة.</span>`);
    }
  }

  function escapeHtml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  terminalInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      const val = this.value;
      this.value = '';
      handleCommand(val);
    }
  });

  // Hints click
  document.querySelectorAll('.cmd-badge-hint').forEach(btn => {
    btn.addEventListener('click', function () {
      const cmd = this.getAttribute('data-cmd');
      if (cmd) {
        terminalInput.value = cmd;
        handleCommand(cmd);
      }
    });
  });
})();

