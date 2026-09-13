# Portfólio — Edson Augusto · versão 8 (Explorar)

HTML, CSS e JavaScript puros. Esta revisão reformula Sobre e Habilidades e acrescenta mudanças no fundo, na nave, na moldura da foto e nas palavras da Home.

## Abrir no computador

1. Baixe portfolio-ea-v8-explorar.zip.
2. Clique com o botão direito e escolha “Extrair tudo”.
3. Abra a pasta nova portfolio-ea-v8-explorar.
4. Abra index.html dentro dessa pasta. Mantenha os arquivos CSS, JS e assets juntos.

Não é necessário instalar nada. Imagens e fontes são locais. Links externos e o aplicativo de e-mail precisam dos serviços correspondentes. Se a animação estiver pausada, use o botão de retomar; a preferência é lembrada por este navegador.

## Explorar a nova versão

- Home: mova o mouse sobre a moldura da foto. O conjunto inclina até 4 graus na vertical e 6 na horizontal, cresce 2,5% e recebe um reflexo discreto. Ao sair, volta à posição inicial. No celular, a foto fica estável.
- Palavras: a cada 5 segundos enquanto a Home está visível, a frase se desfaz letra por letra, da esquerda para a direita, com faíscas locais. A próxima frase se recompõe na mesma ordem. A transição completa dura até 1,85 segundo.
- Fundo: a mesma nebulosa atravessa seis composições conforme a seção. As nuvens mudam de posição, orientação, tamanho e intensidade, com transição suave. O cursor continua iluminando seus filamentos.
- Sobre: a apresentação agora tem uma coluna pessoal e três capítulos — criar, aprender e compartilhar. Clique no título para expandir. Os capítulos recebem destaque ao passar o mouse; a faixa de disponibilidade mantém o ponto vermelho luminoso.
- Habilidades: selecione uma pasta e depois um documento. O documento apresenta a tecnologia, o nível informado, aplicações em estudo e links para projetos quando a relação está confirmada. As antigas porcentagens deram lugar a descrições concretas. Use Tab, Enter e as setas para navegar. “Recolher pasta” fecha o conteúdo; qualquer pasta o abre novamente.
- Competências pessoais: aparecem abaixo das pastas, em uma apresentação mais aberta.
- Nave: desenho novo, mais simples, com cerca de metade da largura anterior no computador e menor também no celular. Continua atrás de Sobre e Habilidades. Na cena da Terra, role para acompanhar o disparo, a transformação vermelha, a fragmentação e a entrada de Projetos. Subir a página reverte a sequência.
- Projetos: preservados nesta revisão, incluindo prévias, textos e links.

O botão de pausa interrompe os efeitos e mantém a apresentação estática da nave e da Terra. O site também considera a preferência de redução de movimento do dispositivo. A rolagem é a normal do navegador, inclusive por toque e teclado; “IR AOS PROJETOS” pula a sequência espacial.

## Arquivos para editar

- index.html: conteúdo das seções, capítulos de Sobre, estrutura, navegação e janelas.
- style.css: estilos de base, navegação, recortes de imagens, Projetos, Contato e versões para diferentes telas.
- exploration.css: novo Sobre, pastas, documentos, competências e moldura da foto.
- exploration.js: inclinação da moldura, brilho das linhas e abertura dos capítulos.
- script.js: traduções, dados das habilidades, seleção dos documentos, menu, projetos, currículo, formulário e estrelas.
- immersive.js e immersive.css: brilho vermelho nas bordas, hover dos painéis e explosão das palavras.
- nebula.js: texturas da nebulosa e seis composições definidas em stops. layoutAt interpola entre elas.
- space-renderer.js: percurso, tamanho da nave, disparo, Terra e fragmentação.
- space-voyage.js e space-voyage.css: rolagem, legenda, pausa e tamanho da sequência espacial.
- assets: fontes, imagens, ícones, créditos e prévias.

## Imagens e prévias

A nave desta versão está em assets/space/spacecraft-simple-v8.png, com fundo transparente. A imagem anterior foi preservada como referência.

assets/space/previa-nave-v8.mp4 é uma exportação de 11 segundos do renderizador atual, com legendas de apresentação. Ela não é carregada pelo site: a animação da página responde à rolagem. A prévia v7 também permanece como histórico e utiliza o desenho anterior.

A foto e sua moldura vêm juntas de um recorte da captura enviada. A animação move esse conjunto, sem modificar o rosto. Os enquadramentos da logo e dos projetos também preservam as capturas originais. Para melhorar a nitidez no futuro, use as imagens originais em vez dos recortes das capturas.

Os ícones de Sobre são do Lucide; a licença está em assets/icons/LICENSE-Lucide.txt. Fontes locais e respectivas licenças estão em assets/fonts. Os créditos da Terra e das naves estão em assets/space/CREDITOS.md.

## Projetos, currículo e contato

O projeto Kruger aponta para https://22501924-eng.github.io/Lading-Page/ e seu repositório Lading-Page. Os outros dois projetos abrem suas prévias; seus botões GitHub levam ao perfil, pois não foram fornecidos repositórios individuais confirmados.

O currículo é uma versão para impressão organizada a partir das informações fornecidas. Clique em CURRÍCULO e depois IMPRIMIR / SALVAR PDF. Para usar outro currículo, coloque seu PDF em assets e substitua os botões data-open-resume por links para ele.

O formulário valida os campos e prepara um e-mail para edsonaugusto238@gmail.com. O aplicativo de e-mail é aberto para você revisar e enviar. Não há servidor de envio nem promessa de mensagem enviada automaticamente. Se não houver aplicativo configurado, use o endereço mostrado em Contato.

## Movimento e desempenho

A nebulosa continua reutilizando três texturas de 384 × 256 pixels. Seu Canvas é limitado a 960 × 600. Não são geradas novas texturas ao mudar de seção. As estrelas mantêm os limites anteriores: até 360 interativas e 900 distantes no computador, 130 e 240 no celular, variando com a área da tela.

A sequência espacial desenha apenas quando a rolagem ou seu estado muda. O tamanho da nave é definido em stateAt, em space-renderer.js. A cena ocupa 360svh no computador e 310svh no celular; pausada, ocupa uma tela. O desempenho depende do navegador e do dispositivo.

O alcance do brilho das bordas fica em FX.edgeRadius; o intervalo das palavras, em FX.textInterval. wordFragment define os atrasos crescentes de cada letra. A inclinação da moldura fica em exploration.js.

## Verificação desta revisão

Foram conferidos os arquivos locais, a sintaxe JavaScript, os links internos e a integridade do ZIP. Testes com a árvore real do HTML e eventos simulados conferiram as categorias e documentos, teclado, idioma, fechamento e abertura das pastas, limites da inclinação da foto, pausa e capítulos de Sobre. A explosão das palavras foi conferida para ordem dos atrasos e recomposição legível.

As seis composições da nebulosa e quadros da nova nave foram desenhados pelo código real em Canvas e inspecionados visualmente. Esses quadros não são capturas do navegador. A página completa não passou por uma revisão visual em navegador nesta sessão.
