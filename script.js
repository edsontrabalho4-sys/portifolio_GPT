/* Edson Augusto — navegação, habilidades, projetos, contato e fundo.
   Não é necessário instalar bibliotecas. Abra index.html para executar. */
(() => {
  'use strict';

  const CONTACT = {
    email: 'edsonaugusto238@gmail.com',
    github: 'https://github.com/22501924-eng',
    krugerSite: 'https://22501924-eng.github.io/Lading-Page/',
    krugerRepository: 'https://github.com/22501924-eng/Lading-Page',
  };
  const SETTINGS = {
    maxStars: 360, mobileStars: 130, distantStars: 900, mobileDistantStars: 240,
    framesPerSecond: 30, maxPixelRatio: 1.5,
    mouseDistance: 11, starSpeed: .85, interactionRadius: 155,
    shootingStars: true, clickWaves: true,
  };
  document.documentElement.classList.add('has-js');

  // Ícones de interface. A logo, a foto e os cards usam as imagens originais.
  const ICONS = {
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
    external: '<path d="M14 3h7v7m0-7L10 14M10 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-5"/>',
    'arrow-up-right': '<path d="M6 18 18 6M6 6h12v12"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'chevron-up': '<path d="m6 15 6-6 6 6"/>',
    globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
    download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 1v5m0 12v5M1 12h5m12 0h5"/>',
    growth: '<path d="m3 10 7-7m-7 0h7v7M4 19h1m4 0h1m4 0h1m4 0h1m-11-5h1m4 0h1m4 0h1m-6-5h1m4 0h1m-1-5h1"/>',
    folder: '<path d="M3 7V5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/><path d="M3 9h18"/>',
    code: '<path d="m7 6-6 6 6 6m10-12 6 6-6 6M14 3l-4 18"/>',
    browser: '<rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 8h20M5 5.5h.1m3 0h.1m3 0h.1"/>',
    server: '<rect x="2" y="3" width="20" height="6" rx="2"/><rect x="2" y="15" width="20" height="6" rx="2"/><path d="M6 6h.01M6 18h.01M11 6h8M11 18h8M5 9v6m14-6v6"/>',
    tools: '<path d="M14 6a5 5 0 0 0 6 6L9 23l-4-4L16 8a5 5 0 0 0-2-2Zm-1-4 3 4 3-3-4-3M4 2 2 4l7 7m5 5 6 6 2-2-6-6"/>',
    message: '<path d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-9l-6 4v-4H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M7 10h.01M12 10h.01M17 10h.01"/>',
    book: '<path d="M12 5C8 2 3 3 2 4v16c4-2 7-1 10 1 3-2 6-3 10-1V4c-1-1-6-2-10 1Zm0 0v16M5 7l4 1M5 11l4 1m6-4 4-1m-4 5 4-1"/>',
    bulb: '<path d="M8 17c0-3-4-5-4-9a8 8 0 0 1 16 0c0 4-4 6-4 9M8 18h8m-7 3h6M9 8l3 3 3-3m-3 3v6"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    play: '<path d="m7 4 13 8-13 8V4Z"/>',
    x: '<path d="m6 6 12 12M6 18 18 6"/>',
    github: '<path fill="currentColor" stroke="none" d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.76-.24.76-.54v-2.09c-3.12.68-3.78-1.33-3.78-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 .1 1.31 2.04 3.28 1.28.1-.72.4-1.22.72-1.5-2.49-.28-5.11-1.25-5.11-5.57 0-1.23.44-2.23 1.15-3.02-.12-.28-.5-1.43.11-2.97 0 0 .94-.3 3.08 1.15a10.73 10.73 0 0 1 5.6 0c2.14-1.45 3.08-1.15 3.08-1.15.61 1.54.23 2.69.11 2.97a4.35 4.35 0 0 1 1.15 3.02c0 4.33-2.63 5.28-5.13 5.56.4.35.76 1.03.76 2.08v3.05c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z"/>',
  };
  const iconSVG = name => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || ICONS.code) + '</svg>';
  document.querySelectorAll('[data-icon]').forEach(element => { element.innerHTML = iconSVG(element.dataset.icon); });

  const EN = {
    behindTitle:'BEHIND', behindCode:'THE CODE_', aboutLead:'I am Edson Augusto. Curiosity is the starting point of what I build.',
    aboutContext:'I am 16 and study Information Technology at COTEMIG. I explore web development, programming and databases by putting what I learn into practice.',
    myApproach:'HOW I APPROACH MY WORK', createTitle:'Create with purpose.', createText:'I enjoy understanding how systems and applications work. I use logic and creativity to turn an idea into something people can use.',
    learnTitle:'Learn by doing.', learnText:'I research, experiment and test different approaches. Projects are where I put learning into practice and discover what I need to improve.',
    shareTitle:'Share ideas.', shareText:'I enjoy explaining concepts and organizing ideas. Sharing what I have understood also helps me see a problem from another perspective.',
    logicTag:'LOGIC', interfaceTag:'INTERFACES', researchTag:'RESEARCH', practiceTag:'PRACTICE', evolutionTag:'GROWTH', communicationTag:'COMMUNICATION', clarityTag:'CLARITY',
    availableSentence:'Open to new projects and connections.', skillsExplore:'Explore the folders to see how I use each technology.', learningAlways:'ALWAYS LEARNING', openFolder:'OPEN ↗', closeFolder:'Close folder',
    chooseFolder:'Select a folder to explore its technologies.', learningDocument:'A WORK IN PROGRESS', beyondTools:'BEYOND THE TOOLS', beyondToolsText:'The way I think is part of the work, too.', englishCompact:'English · A2',

    skipFlight: 'SKIP TO PROJECTS ↗', orbitTitle1: 'BEYOND THE', orbitTitle2: 'ORDINARY_', orbitInstruction: 'Keep scrolling. Projects are the next destination.',
    skip: 'Skip to content', navHome: 'HOME', navAbout: 'ABOUT', navSkills: 'SKILLS', navProjects: 'PROJECTS', navContact: 'CONTACT', language: 'Language', resume: 'RÉSUMÉ',
    heroKicker: 'DEVELOPER IN TRAINING', heroTagline: 'Code, creativity and constant growth.',
    aboutTitle1: 'TURNING', aboutTitle2: 'IDEAS INTO', aboutTitle3: 'REALITY_', aboutSubtitle: 'Who I am, what I do and what I build through technology.', aboutMe: 'ABOUT ME_',
    bio1: 'I am Edson, I am 16 years old and I study Information Technology at COTEMIG. I am passionate about technology, logic and creation, and I enjoy understanding how systems and applications work to turn ideas into real solutions.',
    bio2: 'During my studies, I have been developing my knowledge of web development, programming and databases. I put what I learn into practice through projects, exploring possibilities and finding different ways to solve problems.',
    bio3: 'I am always looking to learn something new, improve my skills and grow as a developer. I enjoy learning independently, researching information and explaining concepts, with the goal of building better solutions.',
    viewResume: 'VIEW RÉSUMÉ', locationLabel: 'LOCATION', focusLabel: 'FOCUS', focusValue: 'Web Development', currentlyLabel: 'CURRENTLY', currentlyValue: 'Open to new projects',
    availableFor: 'AVAILABLE FOR', newProjects: 'NEW PROJECTS_', skillsTitle1: 'MY', skillsTitle2: 'TOOLS_', skillsSubtitle1: 'The technologies and tools I use', skillsSubtitle2: 'to turn ideas into', realSolutions: 'real solutions.',
    development: 'DEVELOPMENT', technologies: 'technologies', tools: 'TOOLS', toolsCount: 'tools', close: 'Close', competencies: 'COMPETENCIES',
    soft1: 'Clear Communication', soft1desc: 'Clarity when explaining concepts', soft2: 'Problem Solving', soft2desc: 'Different paths to a solution', soft3: 'Independent Learning', soft3desc: 'Research and self-directed growth', soft4: 'Creativity', soft4desc: 'References turned into original ideas',
    languageLabel: 'LANGUAGE', englishLabel: 'ENGLISH', englishLevel: 'A2 - BASIC', projectsTitle1: 'IDEAS BROUGHT', projectsTitle2: 'TO LIFE_', projectsSubtitle: 'Real projects built throughout my journey in technology.',
    project1Title: 'KRUGER · BURGER HOUSE', project1Desc: 'A landing page for a fictional burger restaurant, focused on presenting its products.',
    project2Title: 'SOLAR POWER PLANT MONITORING', project2Desc: 'A C# application created to calculate the efficiency and performance of solar power plants.',
    project3Title: 'GYM MONITORING', project3Desc: 'A MySQL database created to organize the main information of a gym.',
    webDevelopment: 'WEB DEVELOPMENT', programming: 'PROGRAMMING', database: 'DATABASE', viewProject: 'VIEW PROJECT', ticker: 'AVAILABLE FOR PROJECTS',
    contactTitle1: 'HAVE AN IDEA.', contactTitle2: 'LET’S BUILD_', contactSubtitle: 'Fill in the form or contact me directly. I will reply as soon as possible.', sendYourMessage: 'SEND YOUR MESSAGE',
    nameLabel: 'NAME', subjectLabel: 'SUBJECT', messageLabel: 'MESSAGE', prepareEmail: 'PREPARE EMAIL', emailNote: 'Your email app opens with the message ready to send.',
    backTop: 'BACK TO TOP', footerLine: 'Built with code, creativity and growth.', backgroundOnly: 'View background only', downloadCode: 'Download HTML, CSS and JS', returnPortfolio: 'Back to portfolio',
    githubProfile: 'VIEW ON GITHUB', resumeProfile: 'PROFILE', resumeProfileText: 'Information Technology student at COTEMIG, focusing on web development, programming and databases. Independent learning, clear communication, creativity and problem solving.',
    resumeEducation: 'EDUCATION', resumeEducationText: 'Information Technology · in progress', resumeEnglish: 'English: A2 — basic.', savePDF: 'PRINT / SAVE PDF',
  };
  const PT = {};
  document.querySelectorAll('[data-i18n]').forEach(element => { PT[element.dataset.i18n] = element.textContent; });
  const placeholderText = {
    pt: { namePlaceholder: 'Seu nome', subjectPlaceholder: 'Qual é o assunto?', messagePlaceholder: 'Digite uma mensagem...' },
    en: { namePlaceholder: 'Your name', subjectPlaceholder: 'What is the subject?', messagePlaceholder: 'Write your message...' },
  };
  let language = 'pt';
  const tr = key => (language === 'en' ? EN[key] : PT[key]) || PT[key] || key;
  const readPreference = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const savePreference = (key, value) => { try { localStorage.setItem(key, value); } catch { /* Arquivos locais podem bloquear armazenamento. */ } };

  // Conteúdo baseado nas informações do portfólio; aplicações confirmadas têm links.
  const SKILLS = {
    cs: {name:'C#',mark:'C#',className:'cs',level:['Intermediário','Intermediate'],ext:'.cs',description:['Desenvolvimento de aplicações com foco em lógica, estruturas de dados e resolução de problemas.','Application development focused on logic, data structures and problem solving.'],topics:[['Lógica e estruturas de controle','Organização de dados e cálculos','Resolução de problemas'],['Logic and control structures','Organizing data and calculations','Problem solving']],evidence:['Monitoramento de Usina Solar','Solar Power Plant Monitoring'],href:'#projetos'},
    py: {name:'Python',mark:'Py',className:'py',level:['Básico','Basic'],ext:'.py',description:['Programas básicos para exercitar a lógica e organizar soluções passo a passo.','Basic programs to practice logic and organize solutions step by step.'],topics:[['Variáveis e condições','Listas e estruturas de repetição','Organização de código em funções'],['Variables and conditions','Lists and loops','Organizing code into functions']],evidence:['Prática de lógica e programas básicos','Logic practice and basic programs']},
    js: {name:'JavaScript',mark:'JS',className:'js',level:['Básico','Basic'],ext:'.js',description:['Programação para acrescentar comportamento e interação às páginas web.','Programming to add behavior and interaction to web pages.'],topics:[['Variáveis e condições','Estruturas de repetição','Interação com elementos da página'],['Variables and conditions','Loops','Interacting with page elements']],evidence:['Interatividade para páginas web','Interaction for web pages']},
    html: {name:'HTML',mark:'H5',className:'html',ext:'.html',description:['Estruturação de páginas e organização de conteúdos para a web.','Structuring pages and organizing content for the web.'],topics:[['Organização de textos e seções','Imagens, links e navegação','Estrutura de páginas web'],['Organizing text and sections','Images, links and navigation','Web page structure']],evidence:['Kruger · Hamburgueria','Kruger · Burger House'],href:'#projetos'},
    css: {name:'CSS',mark:'CSS',className:'css',ext:'.css',description:['Estilização de interfaces e adaptação de layouts para diferentes telas.','Styling interfaces and adapting layouts to different screens.'],topics:[['Cores, tipografia e espaçamento','Composição e distribuição do layout','Adaptação para diferentes telas'],['Colors, typography and spacing','Layout composition and alignment','Adapting to different screens']],evidence:['Kruger · Hamburgueria','Kruger · Burger House'],href:'#projetos'},
    mysql: {name:'MySQL',mark:'SQL',className:'mysql',ext:'.sql',description:['Organização de informações em tabelas e consultas em bancos de dados.','Organizing information into tables and querying databases.'],topics:[['Estruturação de tabelas','Organização de informações','Consultas em SQL'],['Table structure','Organizing information','SQL queries']],evidence:['Monitoramento de Academia','Gym Monitoring'],href:'#projetos'},
    java: {name:'Java',mark:'J',className:'java',ext:'.java',description:['Estudo de programação e desenvolvimento da lógica por meio de aplicações.','Studying programming and developing logic through applications.'],topics:[['Fundamentos da linguagem','Exercícios de programação','Desenvolvimento da lógica'],['Language fundamentals','Programming exercises','Developing logical thinking']],evidence:['Fundamentos de programação','Programming fundamentals']},
    git: {name:'Git',mark:'Git',className:'git',ext:'git',description:['Controle de versões e acompanhamento de alterações no código.','Version control and tracking code changes.'],topics:[['Histórico de alterações','Organização de versões','Trabalho com repositórios'],['Change history','Organizing versions','Working with repositories']],evidence:['Organização do código dos projetos','Organizing project code']},
    github: {name:'GitHub',mark:'GH',className:'github',ext:'repo',description:['Organização e compartilhamento dos repositórios de projetos.','Organizing and sharing project repositories.'],topics:[['Publicação de repositórios','Apresentação dos projetos','Compartilhamento de código'],['Publishing repositories','Presenting projects','Sharing code']],evidence:['Meus repositórios no GitHub','My GitHub repositories'],href:CONTACT.github},
    vs: {name:'Visual Studio',mark:'VS',className:'vs',ext:'IDE',description:['Ambiente de desenvolvimento utilizado nos estudos de programação.','A development environment used in programming studies.'],topics:[['Edição de código','Organização de projetos','Execução de aplicações'],['Code editing','Project organization','Running applications']],evidence:['Estudos de programação','Programming studies']},
    vscode: {name:'VS Code',mark:'<>',className:'vscode',ext:'code',description:['Editor utilizado na construção e edição de projetos web.','A code editor used to build and edit web projects.'],topics:[['Edição de HTML, CSS e JavaScript','Organização de arquivos','Desenvolvimento web'],['Editing HTML, CSS and JavaScript','File organization','Web development']],evidence:['Construção de páginas web','Building web pages']},
    figma: {name:'Figma',mark:'F',className:'figma',ext:'UI',description:['Criação de interfaces, organização visual e prototipação do portfólio.','Interface design, visual organization and portfolio prototyping.'],topics:[['Composição de interfaces','Identidade visual','Planejamento das telas'],['Interface composition','Visual identity','Screen planning']],evidence:['Design deste portfólio','This portfolio’s design'],href:'#inicio'},
  };
  const CATEGORIES = {development:['cs','py','js','html','css','mysql'],frontend:['html','css','js'],backend:['cs','java','mysql'],tools:['git','github','vs','vscode','figma']};
  const categoryName=category=>category==='development'?tr('development'):category==='tools'?tr('tools'):category==='frontend'?'FRONT-END':'BACK-END';
  const skillPanel=document.querySelector('#skills-panel'),skillCards=document.querySelector('[data-skill-cards]');
  const tabs=Array.from(document.querySelectorAll('[data-skill-category]'));
  let selectedCategory='development',selectedSkill='cs',skillsOpen=true;
  const makeElement=(tag,className,text)=>{const el=document.createElement(tag);if(className)el.className=className;if(text!==undefined)el.textContent=text;return el;};
  const skillLevel=(skill,index)=>skill.level?skill.level[index]:selectedCategory==='tools'?(index?'In use':'Em uso'):(index?'In training':'Em formação');
  function selectSkill(key,animate=true){
    if(!CATEGORIES[selectedCategory].includes(key))return;
    selectedSkill=key;const skill=SKILLS[key],i=language==='en'?1:0;
    skillCards.querySelectorAll('[data-skill-key]').forEach(button=>{const on=button.dataset.skillKey===key;button.classList.toggle('is-selected',on);button.setAttribute('aria-pressed',String(on));});
    const set=(name,value)=>{document.querySelector('[data-document-'+name+']').textContent=value;};
    set('path','skills / '+selectedCategory+' / '+key);set('count',String(CATEGORIES[selectedCategory].indexOf(key)+1).padStart(2,'0')+' / '+String(CATEGORIES[selectedCategory].length).padStart(2,'0'));
    set('title',skill.name);set('level',skillLevel(skill,i));set('description',skill.description[i]);set('label',i?'WHAT I PUT INTO PRACTICE':'O QUE COLOCO EM PRÁTICA');
    const mark=document.querySelector('[data-document-mark]');mark.className='tech-mark tech-mark--'+skill.className;mark.textContent=skill.mark;
    document.querySelector('[data-document-topics]').replaceChildren(...skill.topics[i].map(value=>makeElement('li','',value)));
    set('evidence-label',skill.href?(i?'APPLIED IN':'APLICADO EM'):(i?'LEARNING FOCUS':'FOCO DE APRENDIZADO'));set('evidence-text',skill.evidence[i]+(skill.href?' ↗':''));
    const evidence=document.querySelector('[data-document-evidence]');
    if(skill.href)evidence.setAttribute('href',skill.href);else evidence.removeAttribute('href');
    if(skill.href?.startsWith('https:')){evidence.target='_blank';evidence.rel='noopener noreferrer';}else{evidence.removeAttribute('target');evidence.removeAttribute('rel');}
    const content=document.querySelector('[data-document-body]');
    if(animate&&document.querySelector('[data-ea-toggle-motion]')?.getAttribute('aria-pressed')!=='true'&&!matchMedia('(prefers-reduced-motion: reduce)').matches){content.getAnimations?.().forEach(a=>a.cancel());content.animate?.([{opacity:.2,transform:'translateY(9px)'},{opacity:1,transform:'translateY(0)'}],{duration:320,easing:'ease-out'});}
  }
  function renderSkills(category=selectedCategory){
    selectedCategory=category;if(!CATEGORIES[category].includes(selectedSkill))selectedSkill=CATEGORIES[category][0];
    tabs.forEach(tab=>{const active=tab.dataset.skillCategory===category&&skillsOpen;tab.setAttribute('aria-selected',String(active));tab.tabIndex=tab.dataset.skillCategory===category?0:-1;tab.classList.toggle('is-active',active);});
    skillPanel.hidden=!skillsOpen;document.querySelector('[data-workspace-empty]').hidden=skillsOpen;
    skillPanel.setAttribute('aria-labelledby','tab-'+category);document.querySelector('[data-active-category]').textContent=categoryName(category);
    skillCards.setAttribute('aria-label',language==='en'?'Technologies':'Tecnologias');
    const fragment=document.createDocumentFragment(),i=language==='en'?1:0;
    CATEGORIES[category].forEach((key,n)=>{
      const skill=SKILLS[key],button=makeElement('button','skill-file');button.type='button';button.dataset.skillKey=key;button.style.setProperty('--file-order',n);button.setAttribute('aria-controls','skill-document');
      const mark=makeElement('span','tech-mark tech-mark--'+skill.className,skill.mark);mark.setAttribute('aria-hidden','true');
      const title=makeElement('span');title.append(makeElement('strong','',skill.name),makeElement('small','',skillLevel(skill,i)));
      button.append(mark,title,makeElement('span','file-ext',skill.ext));button.addEventListener('click',()=>selectSkill(key));
      button.addEventListener('keydown',event=>{
        const keys=CATEGORIES[selectedCategory];let next=n;
        if(event.key==='ArrowDown'||event.key==='ArrowRight')next=(n+1)%keys.length;else if(event.key==='ArrowUp'||event.key==='ArrowLeft')next=(n-1+keys.length)%keys.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=keys.length-1;else return;
        event.preventDefault();skillCards.querySelector('[data-skill-key="'+keys[next]+'"]').focus();selectSkill(keys[next]);
      });fragment.append(button);
    });
    skillCards.replaceChildren(fragment);selectSkill(selectedSkill,false);window.dispatchEvent(new Event('ea:skills-updated'));
  }
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>{skillsOpen=true;renderSkills(tab.dataset.skillCategory);});
    tab.addEventListener('keydown',event=>{let next=index;if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%tabs.length;else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index-1+tabs.length)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();tabs[next].focus();skillsOpen=true;renderSkills(tabs[next].dataset.skillCategory);});
  });
  document.querySelector('[data-close-skills]').addEventListener('click',()=>{skillsOpen=false;renderSkills();tabs.find(tab=>tab.dataset.skillCategory===selectedCategory).focus();});

  const projectDialog = document.querySelector('[data-project-dialog]');
  const resumeDialog = document.querySelector('[data-resume-dialog]');
  let selectedProject = 0;
  function updateProjectDialog() {
    const prefix = 'project' + (selectedProject + 1);
    document.querySelector('#project-dialog-title').textContent = tr(prefix + 'Title');
    document.querySelector('[data-dialog-project-description]').textContent = tr(prefix + 'Desc');
    const crop = document.querySelector('[data-dialog-project-image]');
    crop.className = 'dialog-project-image image-crop crop-project-' + (selectedProject + 1);
    crop.querySelector('img').alt = tr(prefix + 'Title');
    const githubLink = projectDialog.querySelector('a');
    githubLink.href = selectedProject === 0 ? CONTACT.krugerRepository : CONTACT.github;
  }
  document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
    selectedProject = Number(button.dataset.project); updateProjectDialog(); projectDialog.showModal();
  }));
  document.querySelectorAll('[data-open-resume]').forEach(button => button.addEventListener('click', () => resumeDialog.showModal()));
  document.querySelectorAll('[data-close-dialog]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
    });
  });
  document.querySelector('[data-print-resume]').addEventListener('click', () => { document.body.classList.add('print-resume'); window.print(); });
  window.addEventListener('beforeprint', () => { if (resumeDialog.open) document.body.classList.add('print-resume'); });
  window.addEventListener('afterprint', () => document.body.classList.remove('print-resume'));

  const navigation = document.querySelector('#navigation');
  const menuButton = document.querySelector('[data-menu-toggle]');
  function setMenu(open) {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', language === 'en' ? (open ? 'Close menu' : 'Open menu') : (open ? 'Fechar menu' : 'Abrir menu'));
    navigation.classList.toggle('is-open', open);
  }
  menuButton.hidden = false;
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('pointerdown', event => {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (menuButton.getAttribute('aria-expanded') === 'true') { setMenu(false); menuButton.focus(); }
    if (document.body.classList.contains('background-only')) setBackgroundOnly(false);
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navigation.querySelectorAll('a').forEach(link => {
          const active = link.hash === '#' + entry.target.id;
          link.classList.toggle('is-active', active);
          if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin:'-15% 0px -65% 0px', threshold:0 });
    document.querySelectorAll('.section-watch').forEach(section => observer.observe(section));
  }

  const form = document.querySelector('[data-contact-form]');
  const formStatus = document.querySelector('[data-form-status]');
  form.addEventListener('input', event => { if ('setCustomValidity' in event.target) event.target.setCustomValidity(''); });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const fields = ['nome','email','assunto','mensagem'];
    for (const key of fields) {
      const input = form.elements.namedItem(key);
      if (!input.value.trim()) {
        input.setCustomValidity(language === 'en' ? 'Please complete this field.' : 'Preencha este campo.');
        input.reportValidity(); return;
      }
    }
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const body = String(data.get('mensagem')).trim() + '\n\n' + String(data.get('nome')).trim() + '\n' + String(data.get('email')).trim();
    const url = 'mailto:' + CONTACT.email + '?subject=' + encodeURIComponent(String(data.get('assunto')).trim()) + '&body=' + encodeURIComponent(body);
    formStatus.hidden = false;
    formStatus.textContent = language === 'en'
      ? 'Your email app should open with the draft. Review it and send it there. If it does not open, use the email address beside this form.'
      : 'Seu aplicativo de e-mail deve abrir com o rascunho. Revise e envie por lá. Se não abrir, use o endereço de e-mail ao lado.';
    window.location.href = url;
  });

  const shell = document.querySelector('.portfolio-shell');
  const returnButton = document.querySelector('[data-return-portfolio]');
  function setBackgroundOnly(only) {
    document.body.classList.toggle('background-only', only);
    shell.inert = only;
    returnButton.hidden = !only;
    if (only) returnButton.focus();
    else document.querySelector('[data-background-only]').focus({ preventScroll:true });
  }
  document.querySelector('[data-background-only]').addEventListener('click', () => setBackgroundOnly(true));
  returnButton.addEventListener('click', () => setBackgroundOnly(false));
  document.querySelector('[data-floating-controls]').hidden = false;
  if (window.location.protocol !== 'file:') document.querySelector('[data-zip-link]').hidden = false;
  const languageControl = document.querySelector('[data-language]');
  document.querySelector('[data-language-control]').hidden = false;
  function applyLanguage(value) {
    language = value === 'en' ? 'en' : 'pt';
    document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR';
    document.title = language === 'en' ? 'Edson Augusto — Portfolio' : 'Edson Augusto — Portfólio';
    languageControl.value = language;
    document.querySelectorAll('[data-i18n]').forEach(element => { element.textContent = tr(element.dataset.i18n); });
    document.querySelectorAll('[data-placeholder]').forEach(element => { element.placeholder = placeholderText[language][element.dataset.placeholder]; });
    document.querySelectorAll('[data-close-dialog]').forEach(button => { button.setAttribute('aria-label', tr('close')); });
    renderSkills(); updateProjectDialog(); setMenu(false);
    savePreference('ea-language', language);
    window.dispatchEvent(new Event('ea:language'));
  }
  languageControl.addEventListener('change', () => applyLanguage(languageControl.value));
  applyLanguage(readPreference('ea-language'));

  // FUNDO ESPACIAL: três profundidades, brilho lento e interação sem capturar cliques.
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  // Modelo independente da interface; tempo só avança quando update recebe delta > 0.
  class StarField {
    constructor(context, settings, random = Math.random) {
      this.context = context; this.settings = settings; this.random = random;
      this.width = 1; this.height = 1; this.time = 0;
      this.stars = []; this.waves = []; this.meteor = null;
      this.dust = []; this.dustCanvas = document.createElement('canvas');
      this.dustContext = this.dustCanvas.getContext('2d');
      this.camera = { x:0, y:0 };
      this.untilMeteor = 7 + random()*6;
    }
    createStar() {
      const choice = this.random();
      const depth = choice < .55 ? .22 : choice < .88 ? .55 : 1;
      return {
        x:this.random(), y:this.random(), depth,
        size:.35 + depth*.82 + this.random()*.25,
        alpha:.25 + depth*.3 + this.random()*.14,
        phase:this.random()*Math.PI*2, twinkle:.35 + this.random()*.45,
        red:this.random() < .07, offsetX:0, offsetY:0, boost:0,
      };
    }
    resize(width, height) {
      this.width = Math.max(1,width); this.height = Math.max(1,height);
      const mobile = width < 700;
      const cap = mobile ? this.settings.mobileStars : this.settings.maxStars;
      const count = Math.min(cap,Math.max(48,Math.round(width*height/(mobile ? 2800 : 3600))));
      this.stars.length = Math.min(this.stars.length,count);
      while (this.stars.length < count) this.stars.push(this.createStar());
      this.cacheDistantStars(mobile);
      // As posições normalizadas sobrevivem à rotação e à mudança de tamanho.
    }
    cacheDistantStars(mobile) {
      const ctx=this.dustContext;if(!ctx)return;
      const count=Math.min(mobile?this.settings.mobileDistantStars:this.settings.distantStars,Math.round(this.width*this.height/1800));
      this.dust.length=Math.min(this.dust.length,count);
      while(this.dust.length<count){
        const x=this.random(),cluster=this.random()<.42;
        // Uma faixa irregular de estrelas distantes dá profundidade à nebulosa.
        const y=cluster ? .68-x*.36+(this.random()+this.random()-1)*.28 : this.random();
        this.dust.push({x,y,size:.3+this.random()*.45,alpha:.16+this.random()*.4,warm:this.random()<.2});
      }
      const ratio=Math.min(1,1600/this.width,1000/this.height);
      this.dustCanvas.width=Math.ceil((this.width+48)*ratio);this.dustCanvas.height=Math.ceil((this.height+48)*ratio);
      ctx.setTransform(ratio,0,0,ratio,0,0);
      for(const star of this.dust){
        ctx.globalAlpha=star.alpha;ctx.fillStyle=star.warm?'#e8b6ba':'#d9e1ee';
        ctx.beginPath();ctx.arc(star.x*(this.width+48),star.y*(this.height+48),star.size,0,Math.PI*2);ctx.fill();
      }
      ctx.globalAlpha=1;
    }
    position(star) {
      return {
        x:star.x*(this.width+120)-60-this.camera.x*star.depth*32,
        y:star.y*(this.height+120)-60-this.camera.y*star.depth*24,
      };
    }
    addWave(x, y) {
      if (!this.settings.clickWaves) return;
      if (this.waves.length >= 2) this.waves.shift();
      this.waves.push({ x:clamp(x/this.width,0,1), y:clamp(y/this.height,0,1), age:0 });
    }
    update(delta, pointer) {
      const dt = clamp(delta,0,.08);
      if (!dt) return;
      this.time += dt;
      this.camera.x = pointer.x; this.camera.y = pointer.y;
      const ease = 1-Math.exp(-4.5*dt);
      this.waves.forEach(wave => { wave.age += dt; });
      this.waves = this.waves.filter(wave => wave.age < 1.65);
      for (const star of this.stars) {
        star.x = (star.x + dt*(.3+star.depth*1.1)*this.settings.starSpeed/(this.width+120)) % 1;
        star.y = (star.y - dt*(.45+star.depth*1.5)*this.settings.starSpeed/(this.height+120) + 1) % 1;
        const point = this.position(star);
        let targetX = 0, targetY = 0, boost = 0;
        if (pointer.active) {
          const dx = point.x-pointer.clientX, dy = point.y-pointer.clientY;
          const distance = Math.hypot(dx,dy);
          const proximity = Math.max(0,1-distance/this.settings.interactionRadius);
          const force = proximity*proximity*55*(.3+.7*star.depth);
          targetX += (distance > .01 ? dx/distance : Math.cos(star.phase))*force;
          targetY += (distance > .01 ? dy/distance : Math.sin(star.phase))*force;
          boost = proximity;
        }
        for (const wave of this.waves) {
          const dx = point.x-wave.x*this.width, dy = point.y-wave.y*this.height;
          const distance = Math.hypot(dx,dy);
          const band = (distance-wave.age*190)/35;
          const force = Math.exp(-band*band)*44*(1-wave.age/1.65)*star.depth;
          if (distance > .01) {
            targetX += dx/distance*force; targetY += dy/distance*force;
          }
          boost = Math.max(boost,force/44);
        }
        star.offsetX += (clamp(targetX,-80,80)-star.offsetX)*ease;
        star.offsetY += (clamp(targetY,-80,80)-star.offsetY)*ease;
        star.boost += (boost-star.boost)*ease;
      }
      if (this.meteor) {
        this.meteor.age += dt;
        if (this.meteor.age >= this.meteor.duration) this.meteor = null;
      }
      this.untilMeteor -= dt;
      if (this.settings.shootingStars && this.untilMeteor <= 0 && !this.meteor) {
        this.meteor = { x:.06+this.random()*.52, y:.07+this.random()*.3, age:0, duration:1.45 };
        this.untilMeteor = (this.width < 700 ? 16 : 10)+this.random()*10;
      }
    }
    draw(mix = 0) {
      const ctx = this.context;
      if (!ctx) return;
      ctx.clearRect(0,0,this.width,this.height);
      if(this.dustContext){
        ctx.globalAlpha=1-mix*.08;
        ctx.drawImage(this.dustCanvas,-24-this.camera.x*5,-24-this.camera.y*4,this.width+48,this.height+48);
        ctx.globalAlpha=1;
      }
      for (const star of this.stars) {
        const point = this.position(star);
        const x = point.x+star.offsetX, y = point.y+star.offsetY;
        if (x < -6 || y < -6 || x > this.width+6 || y > this.height+6) continue;
        const edge = clamp(Math.min(x,y,this.width-x,this.height-y)/24,0,1);
        const twinkle = .8+.2*Math.sin(this.time*star.twinkle+star.phase);
        const alpha = clamp((star.alpha*twinkle+star.boost*.32)*edge*(1-mix*.18),0,.92);
        ctx.fillStyle = star.red ? '#ef737b' : '#edf0f8';
        if (star.depth > .5 || star.boost > .15) {
          ctx.globalAlpha = alpha*.07;
          ctx.beginPath(); ctx.arc(x,y,star.size*(3.5+star.boost),0,Math.PI*2); ctx.fill();
        }
        ctx.globalAlpha = alpha;
        ctx.beginPath(); ctx.arc(x,y,star.size,0,Math.PI*2); ctx.fill();
        // Pequenos reflexos só nas estrelas próximas, sem linhas entre partículas.
        if (star.depth === 1) {
          ctx.globalAlpha = alpha*.2;
          ctx.fillRect(x-star.size*2.4,y-.35,star.size*4.8,.7);
          ctx.fillRect(x-.35,y-star.size*2.4,.7,star.size*4.8);
        }
      }
      for (const wave of this.waves) {
        const progress = wave.age/1.65;
        ctx.globalAlpha = .16*(1-progress)*(1-progress)*Math.min(wave.age*4,1);
        ctx.strokeStyle = '#f0b8c2'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(wave.x*this.width,wave.y*this.height,wave.age*190,0,Math.PI*2); ctx.stroke();
      }
      if (this.meteor) {
        const meteor = this.meteor, progress = meteor.age/meteor.duration;
        const travel = Math.min(380,this.width*.48), length = Math.min(90,this.width*.18);
        const x = meteor.x*this.width+progress*travel;
        const y = meteor.y*this.height+progress*travel*.42;
        const tailX = x-length, tailY = y-length*.42;
        const gradient = ctx.createLinearGradient(tailX,tailY,x,y);
        gradient.addColorStop(0,'rgba(239,98,117,0)');
        gradient.addColorStop(.65,'rgba(229,218,235,.35)');
        gradient.addColorStop(1,'rgba(247,247,255,.85)');
        ctx.globalAlpha = Math.sin(progress*Math.PI)*.7;
        ctx.strokeStyle = gradient; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(tailX,tailY); ctx.lineTo(x,y); ctx.stroke();
        ctx.fillStyle = '#f4f1fa';
        ctx.beginPath(); ctx.arc(x,y,1.3,0,Math.PI*2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
  }

  // Integração: uma única animação, pausada com a aba oculta ou pela preferência do visitante.
  const root = document.querySelector('[data-ea-background-root]');
  if (!root) return;
  const canvas = root.querySelector('.ea-background__particles');
  const context = canvas.getContext('2d');
  const field = new StarField(context,SETTINGS);
  const nebula = window.EANebula ? new window.EANebula.NebulaField(root.querySelector('[data-ea-nebula]')) : null;
  const motionButton = document.querySelector('[data-ea-toggle-motion]');
  const motionLabel = document.querySelector('[data-ea-motion-label]');
  const motionStatus = document.querySelector('[data-ea-motion-status]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const quietSection = document.querySelector('#sobre');
  const projectsSection = document.querySelector('#projetos');
  const contactSection = document.querySelector('#contato');
  const backgroundSections=['#inicio','#sobre','#habilidades','#orbita','#projetos','#contato'].map(id=>document.querySelector(id));
  let journey=0,targetJourney=0;
  let paused = reduceMotion.matches || readPreference('ea-motion') === 'paused';
  let frameId = null, lastTime = 0, frameRemainder = 0, width = 0, height = 0, mix = 0, resizeId = null;
  let pageDirty = true, pointerDown = null;
  const pointer = { targetX:0, targetY:0, x:0, y:0, clientX:0, clientY:0, active:false };
  const interactive = target => target instanceof Element && Boolean(target.closest('a,button,summary,input,textarea,select,label,dialog,[role="tab"],[contenteditable]'));
  function syncSection() {
    if (!pageDirty) return;
    pageDirty = false;
    const phase = section => clamp(1-(section.getBoundingClientRect().top-65)/Math.max(height*.82,1),0,1);
    const about = phase(quietSection), projects = phase(projectsSection), contact = phase(contactSection);
    mix = clamp(.63*about*(1-projects)+.58*contact,0,1);
    const positions=backgroundSections.map(section=>section.getBoundingClientRect().top+scrollY),at=scrollY+height*.2;
    let i=0;while(i<positions.length-2&&at>=positions[i+1])i++;
    targetJourney=i+clamp((at-positions[i])/Math.max(1,positions[i+1]-positions[i]),0,1);
    root.style.setProperty('--ea-mix',mix.toFixed(3));
    root.style.setProperty('--ea-projects',(.9*projects*(1-contact)).toFixed(3));
  }
  function resize() {
    resizeId = null; width = root.clientWidth; height = root.clientHeight;
    if (context) {
      const ratio = Math.min(window.devicePixelRatio||1,SETTINGS.maxPixelRatio);
      canvas.width = Math.round(width*ratio); canvas.height = Math.round(height*ratio);
      context.setTransform(ratio,0,0,ratio,0,0);
    }
    field.resize(width,height);
    nebula?.resize(width,height);
    pageDirty = true; syncSection(); nebula?.draw(mix,journey); field.draw(mix);
  }
  function tick(time) {
    frameId = requestAnimationFrame(tick);
    if (!lastTime) { lastTime = time; return; }
    const difference = time-lastTime, interval = 1000/SETTINGS.framesPerSecond;
    if (difference+frameRemainder < interval) return;
    const delta = Math.min(difference/1000,.08);
    frameRemainder = (difference+frameRemainder)%interval;
    lastTime = time;
    syncSection();
    const ease = 1-Math.exp(-3.2*delta);
    journey+=(targetJourney-journey)*ease;
    pointer.x += (pointer.targetX-pointer.x)*ease; pointer.y += (pointer.targetY-pointer.y)*ease;
    root.style.setProperty('--ea-pan-x',(-pointer.x*SETTINGS.mouseDistance).toFixed(2)+'px');
    root.style.setProperty('--ea-pan-y',(-pointer.y*SETTINGS.mouseDistance).toFixed(2)+'px');
    root.style.setProperty('--ea-aura-x',(50+pointer.x*35).toFixed(2)+'%');
    root.style.setProperty('--ea-aura-y',(50+pointer.y*35).toFixed(2)+'%');
    nebula?.update(delta,pointer); nebula?.draw(mix,journey);
    field.update(delta,pointer); field.draw(mix);
    window.dispatchEvent(new CustomEvent('ea:frame',{detail:{delta,time}}));
  }
  function updateMotionText() {
    const label = language === 'en' ? (paused ? 'Resume animations' : 'Pause animations') : (paused ? 'Retomar animações' : 'Pausar animações');
    motionButton.setAttribute('aria-pressed',String(paused));
    motionButton.setAttribute('aria-label',label); motionButton.title=label; motionLabel.textContent=label;
    motionButton.querySelector('[data-motion-icon]').innerHTML=iconSVG(paused ? 'play' : 'pause');
    motionStatus.textContent=language === 'en' ? (paused ? 'Animations paused.' : 'Animations active.') : (paused ? 'Animações pausadas.' : 'Animações ativadas.');
  }
  function syncMotion() {
    const running = !paused&&!document.hidden;
    root.dataset.eaMotion = running ? 'running' : 'paused';
    document.body.dataset.motion = running ? 'running' : 'paused';
    updateMotionText();
    window.dispatchEvent(new CustomEvent('ea:motion',{detail:{paused,running}}));
    if (frameId !== null) cancelAnimationFrame(frameId);
    frameId = null; lastTime = 0; frameRemainder = 0;
    if (running) frameId = requestAnimationFrame(tick);
    else { pointer.active=false; pointerDown=null; }
  }
  motionButton.addEventListener('click',() => { paused=!paused;savePreference('ea-motion',paused?'paused':'running');syncMotion(); });
  window.addEventListener('ea:language',updateMotionText);
  window.addEventListener('pointermove',event => {
    if (paused||!finePointer.matches||event.pointerType==='touch') return;
    pointer.targetX=clamp(event.clientX/Math.max(width,1)*2-1,-1,1);
    pointer.targetY=clamp(event.clientY/Math.max(height,1)*2-1,-1,1);
    pointer.clientX=event.clientX; pointer.clientY=event.clientY; pointer.active=true;
  },{passive:true});
  // Um toque curto cria a onda; gestos de rolagem, seleção e cliques de interface não.
  window.addEventListener('pointerdown',event => {
    pointerDown = null;
    if (paused||document.hidden||!event.isPrimary||event.button!==0||interactive(event.target)) return;
    pointerDown = { id:event.pointerId, x:event.clientX, y:event.clientY, time:event.timeStamp };
  },{passive:true});
  window.addEventListener('pointerup',event => {
    const start = pointerDown; pointerDown = null;
    if (!start||start.id!==event.pointerId||paused||document.hidden||interactive(event.target)) return;
    if (event.timeStamp-start.time>450||Math.hypot(event.clientX-start.x,event.clientY-start.y)>9) return;
    if (window.getSelection()?.toString()) return;
    field.addWave(event.clientX,event.clientY);
  },{passive:true});
  window.addEventListener('pointercancel',() => { pointerDown=null; },{passive:true});
  function clearPointer() { pointer.targetX=0; pointer.targetY=0; pointer.active=false; pointerDown=null; }
  document.documentElement.addEventListener('pointerleave',clearPointer);
  window.addEventListener('blur',clearPointer);
  finePointer.addEventListener('change',clearPointer);
  window.addEventListener('scroll',() => { pointerDown=null;pageDirty=true;if(paused){syncSection();field.draw(mix);} },{passive:true});
  window.addEventListener('resize',() => { if(resizeId!==null)cancelAnimationFrame(resizeId);resizeId=requestAnimationFrame(resize); },{passive:true});
  reduceMotion.addEventListener('change',event => { paused=event.matches;syncMotion(); });
  document.addEventListener('visibilitychange',() => { pageDirty=true;syncMotion(); });
  window.addEventListener('load',() => { pageDirty=true;syncSection(); },{once:true});
  window.addEventListener('pageshow',() => { pageDirty=true;syncSection();syncMotion(); });
  window.addEventListener('pagehide',() => {
    if(frameId!==null)cancelAnimationFrame(frameId);
    if(resizeId!==null)cancelAnimationFrame(resizeId);
    frameId=null;resizeId=null;lastTime=0;frameRemainder=0;clearPointer();
    root.dataset.eaMotion='paused';document.body.dataset.motion='paused';
  });
  resize();syncMotion();
})();
