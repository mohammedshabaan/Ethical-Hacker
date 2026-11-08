/* ==========================================================================
   Main Portal Controller & Media Players
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Audio Button Toggle
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', function () {
      if (window.cyberAudio) {
        const isEnabled = window.cyberAudio.toggle();
        this.innerHTML = isEnabled 
          ? `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`
          : `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>`;
      }
    });
  }

  // 2. Matrix Animation Toggle
  const matrixToggleBtn = document.getElementById('matrixToggleBtn');
  if (matrixToggleBtn) {
    matrixToggleBtn.addEventListener('click', function () {
      if (typeof window.toggleMatrixAnimation === 'function') {
        const isRunning = window.toggleMatrixAnimation();
        this.style.opacity = isRunning ? '1' : '0.4';
      }
    });
  }

  // 3. Ethical Hacking Concept Tabs
  const tabButtons = document.querySelectorAll('.concept-tabs .tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      this.classList.add('active');
      const targetId = this.getAttribute('data-tab');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');

      if (window.cyberAudio) window.cyberAudio.playClick();
    });
  });

  // 4. Penetration Testing 5-Phase Pipeline Switcher
  const phaseStepButtons = document.querySelectorAll('.pipeline-step-btn');
  const phaseContentCard = document.getElementById('phaseContentCard');

  const phasesData = {
    1: {
      title: "المرحلة الأولى: الاستطلاع وجمع المعلومات (Reconnaissance & Footprinting)",
      desc: "حجر الزاوية في اختبار الاختراق. هنا يجمع خبير الأمن السيبراني كافة البيانات المتاحة عن المؤسسة المستهدفة لتحديد أسطح الهجوم الممكنة.",
      details: [
        { label: "النوع السلبي (Passive)", val: "جمع معلومات عبر محركات البحث، سجلات WHOIS، منصات التواصل، وأرشيف الإنترنت دون إرسال حزم مباشرة." },
        { label: "النوع النشط (Active)", val: "فحص نطاقات DNS والتفاعل المباشر لاكتشاف عناوين IP والمخدمات." },
        { label: "الهدف الاستراتيجي", val: "رسم خارطة أصول الهدف واكتشاف الموظفين والبنى التحتية السحابية." }
      ],
      tools: ["OSINT Framework", "theHarvester", "Shodan.io", "Whois", "Maltego"],
      terminalOutput: `[*] Executing: theHarvester -d target-corp.com -b all
[+] Searching LinkedIn, Bing, Censys, Shodan...
[+] Users found: 28 email addresses
[+] Subdomains detected:
    - mail.target-corp.com (198.51.100.12)
    - vpn.target-corp.com  (198.51.100.14)
    - dev-api.target-corp.com (198.51.100.88)
[+] Open ports on dev-api: 80, 443, 8080 (Git exposed!)`
    },
    2: {
      title: "المرحلة الثانية: الفحص ورسم الخرائط (Scanning & Enumeration)",
      desc: "تحويل المعلومات المجمعة إلى بيانات تقنية دقيقة. إرسال حزم شبكية للبحث عن المنافذ المفتوحة والخدمات وإصداراتها الدقيقة.",
      details: [
        { label: "فحص الشبكة", val: "تحديد الأجهزة النشطة (Host Discovery) عبر بروتوكولات ICMP/ARP." },
        { label: "فحص المنافذ", val: "اكتشاف الخدمات العاملة (HTTP, SSH, SMB, RDP) والتقاط البصمات (Banner Grabbing)." },
        { label: "مسح الثغرات", val: "فحص آلي للخدمات لمقارنتها بقواعد بيانات الثغرات المعتمدة عالمياً (CVE)." }
      ],
      tools: ["Nmap", "Nessus", "Nikto", "Masscan", "OpenVAS"],
      terminalOutput: `[*] Executing: nmap -sC -sV -p- -T4 dev-api.target-corp.com
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 8.2p1 Ubuntu
80/tcp   open  http    nginx 1.18.0
8080/tcp open  http    Apache Tomcat 9.0.30
| http-vuln-cve2020-1938:
|_  AJP File Inclusion / Read Vulnerability Detected!`
    },
    3: {
      title: "المرحلة الثالثة: الوصول واختراق النظام (Gaining Access / Exploitation)",
      desc: "نقطة التحول التي يُترجم فيها الفحص إلى اختراق حقيقي مصرح به لتأكيد وجود الخلل البرمجي وإثبات إمكانية استغلاله.",
      details: [
        { label: "استغلال التطبيقات", val: "حقن قواعد البيانات (SQLi)، التلاعب بالواجهات (XSS)، وكسر الصلاحيات (IDOR)." },
        { label: "استغلال النظام", val: "استهداف عيوب الذاكرة مثل Buffer Overflow وتنفيذ أوامر عن بُعد (RCE)." },
        { label: "الهندسة الاجتماعية", val: "التصيد الاحتيالي الموجه (Spear Phishing) لاختبار وعي الموظفين." }
      ],
      tools: ["Metasploit Framework", "Burp Suite Pro", "SQLmap", "Hydra", "Cobalt Strike"],
      terminalOutput: `msf6 > use exploit/multi/http/tomcat_ghostcat
msf6 exploit(ghostcat) > set RHOSTS dev-api.target-corp.com
msf6 exploit(ghostcat) > exploit
[*] 198.51.100.88:8080 - Vulnerability validated.
[+] Dumping /WEB-INF/web.xml
[+] Found Database Credentials: user='db_admin' pass='S3cur3!Adm1n2024'
[*] Meterpreter session 1 opened!`
    },
    4: {
      title: "المرحلة الرابعة: الحفاظ على الوصول (Maintaining Access)",
      desc: "إثبات قدرة المهاجم على البقاء داخل النظام لفترة ممتدة وتصعيد الصلاحيات لمحاكاة الهجمات المتقدمة (APTs).",
      details: [
        { label: "تصعيد الصلاحيات", val: "الانتقال من مستخدم عادي إلى Root أو Domain Admin عبر ثغرات النواة أو إعدادات خاطئة." },
        { label: "تثبيت البقاء", val: "إنشاء حسابات ظل، مجدولات مهام (Cron / Scheduled Tasks)، وأبواب خلفية مشفرة." },
        { label: "التحرك الأفقي", val: "الانتقال من جهاز مخترق إلى الخوادم الحساسة (Lateral Movement)." }
      ],
      tools: ["LinPEAS / WinPEAS", "Mimikatz", "Empire", "BloodHound", "Netcat"],
      terminalOutput: `meterpreter > getuid
Server username: tomcat (low privilege)
meterpreter > execute -f linpeas.sh
[+] CVE-2021-4034 (PwnKit) detected in pkexec!
meterpreter > run exploit/linux/local/cve_2021_4034_pwnkit
[+] Successfully spawned root shell!
# whoami
root
# id
uid=0(root) gid=0(root) groups=0(root)`
    },
    5: {
      title: "المرحلة الخامسة: تغطية الأثر والتوثيق (Clearing Tracks & Reporting)",
      desc: "في الهكر الأخلاقي، تعتبر هذه المرحلة أهم مرحلة عملية: تنظيف كافة ملفات الاختبار، واسترجاع الحالة الأصلية، وكتابة التقرير الشامل.",
      details: [
        { label: "إزالة الآثار", val: "حذف السكربتات الاختبارية والمستخدمين المؤقتين واستعادة الإعدادات الأصلية." },
        { label: "التوثيق التنفيذي", val: "شرح المخاطر للإدارة بلغة أعمال واضحة (خسائر مالية، سمعة، امتثال)." },
        { label: "التوثيق التقني", val: "خطوات إعادة تكرار كل ثغرة (PoC) مع كود التصحيح الدقيق (Remediation)." }
      ],
      tools: ["Log Sanitizers", "KeepNote / CherryTree", "GitLab Issue Tracker", "Report Templates"],
      terminalOutput: `[*] Cleanup Initiated:
[+] Removed reverse-shell payload: /tmp/.sh_rev
[+] Reset test credentials: user 'pentest_guest' removed
[+] Generating Final Executive & Technical PDF Report...
[+] Severity: CRITICAL (Score: 9.8 CVSS)
[+] Recommendations: Patch Tomcat to >= 9.0.31, Apply WAF Rule #402
[*] Pentest Complete. Systems Cleaned & Audited.`
    }
  };

  phaseStepButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const step = this.getAttribute('data-step');
      if (!step || !phasesData[step]) return;

      phaseStepButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const data = phasesData[step];

      const detailsHtml = data.details.map(d => `
        <li><strong>${d.label}:</strong> <span>${d.val}</span></li>
      `).join('');

      const toolsHtml = data.tools.map(t => `
        <span class="tool-tag">${t}</span>
      `).join('');

      phaseContentCard.innerHTML = `
        <div class="phase-info">
          <h3>${data.title}</h3>
          <p>${data.desc}</p>
          <ul class="phase-details-list">
            ${detailsHtml}
          </ul>
          <div style="margin-top:1.25rem;">
            <div style="font-size:0.85rem;color:var(--text-dim);margin-bottom:6px;">الأدوات المستخدمة في هذه المرحلة:</div>
            <div class="tools-tags">${toolsHtml}</div>
          </div>
        </div>
        <div class="phase-visual-box">
          <div class="visual-title"># TERMINAL EVIDENCE / AUDIT LOG</div>
          <pre style="white-space:pre-wrap;word-break:break-word;">${data.terminalOutput}</pre>
        </div>
      `;

      if (window.cyberAudio) window.cyberAudio.playClick();
    });
  });

  // 5. Custom Cyber Video Player
  const customVideo = document.getElementById('customVideo');
  const videoPlayOverlay = document.getElementById('videoPlayOverlay');
  const videoPlayBtn = document.getElementById('videoPlayBtn');
  const videoMuteBtn = document.getElementById('videoMuteBtn');
  const videoFullscreenBtn = document.getElementById('videoFullscreenBtn');
  const videoTimeline = document.getElementById('videoTimeline');
  const videoProgress = document.getElementById('videoProgress');
  const videoTimeText = document.getElementById('videoTimeText');

  if (customVideo) {
    function togglePlay() {
      if (customVideo.paused || customVideo.ended) {
        customVideo.play();
        if (videoPlayOverlay) videoPlayOverlay.style.display = 'none';
        updatePlayIcon(true);
      } else {
        customVideo.pause();
        if (videoPlayOverlay) videoPlayOverlay.style.display = 'grid';
        updatePlayIcon(false);
      }
      if (window.cyberAudio) window.cyberAudio.playClick();
    }

    function updatePlayIcon(isPlaying) {
      if (!videoPlayBtn) return;
      videoPlayBtn.innerHTML = isPlaying
        ? `<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`
        : `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
    }

    if (videoPlayOverlay) videoPlayOverlay.addEventListener('click', togglePlay);
    if (videoPlayBtn) videoPlayBtn.addEventListener('click', togglePlay);
    customVideo.addEventListener('click', togglePlay);

    customVideo.addEventListener('timeupdate', function () {
      if (customVideo.duration) {
        const percent = (customVideo.currentTime / customVideo.duration) * 100;
        if (videoProgress) videoProgress.style.width = percent + '%';

        const curMin = Math.floor(customVideo.currentTime / 60);
        const curSec = Math.floor(customVideo.currentTime % 60);
        const durMin = Math.floor(customVideo.duration / 60);
        const durSec = Math.floor(customVideo.duration % 60);

        if (videoTimeText) {
          videoTimeText.textContent = `${curMin}:${curSec < 10 ? '0' : ''}${curSec} / ${durMin}:${durSec < 10 ? '0' : ''}${durSec}`;
        }
      }
    });

    customVideo.addEventListener('ended', function () {
      if (videoPlayOverlay) videoPlayOverlay.style.display = 'grid';
      updatePlayIcon(false);
    });

    if (videoTimeline) {
      videoTimeline.addEventListener('click', function (e) {
        const rect = videoTimeline.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        customVideo.currentTime = pos * customVideo.duration;
      });
    }

    if (videoMuteBtn) {
      videoMuteBtn.addEventListener('click', function () {
        customVideo.muted = !customVideo.muted;
        this.innerHTML = customVideo.muted
          ? `<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>`
          : `<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`;
      });
    }

    if (videoFullscreenBtn) {
      videoFullscreenBtn.addEventListener('click', function () {
        if (customVideo.requestFullscreen) {
          customVideo.requestFullscreen();
        } else if (customVideo.webkitRequestFullscreen) {
          customVideo.webkitRequestFullscreen();
        }
      });
    }
  }

  // 6. PDF Preview Modal
  const openPdfModalBtn = document.getElementById('openPdfModalBtn');
  const pdfModal = document.getElementById('pdfModal');
  const closePdfModalBtn = document.getElementById('closePdfModalBtn');

  if (openPdfModalBtn && pdfModal) {
    openPdfModalBtn.addEventListener('click', function (e) {
      e.preventDefault();
      pdfModal.classList.add('active');
      if (window.cyberAudio) window.cyberAudio.playClick();
    });
  }

  if (closePdfModalBtn && pdfModal) {
    closePdfModalBtn.addEventListener('click', function () {
      pdfModal.classList.remove('active');
    });
    pdfModal.addEventListener('click', function (e) {
      if (e.target === pdfModal) {
        pdfModal.classList.remove('active');
      }
    });
  }
});

