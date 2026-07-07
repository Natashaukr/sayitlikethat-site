/* Generate the 6 localized homepages from the English template.
   Reuses the exact <style> and <script> from index.html so the design
   and behavior never diverge — only text and link paths change.
   Run: node build-langs.js   (from the site root)  */
const fs = require('fs');
const path = require('path');

const en = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const STYLE = en.match(/<style>[\s\S]*?<\/style>/)[0];
const SCRIPT = en.match(/<script>[\s\S]*?<\/script>/)[0];

const ORDER = ['en', 'es', 'pt', 'uk', 'ru', 'de', 'pl'];
const CODE = { en: 'EN', es: 'ES', pt: 'PT', uk: 'UK', ru: 'RU', de: 'DE', pl: 'PL' };
const NAME = { en: 'English', es: 'Español', pt: 'Português', uk: 'Українська', ru: 'Русский', de: 'Deutsch', pl: 'Polski' };

// melody word: {t, k:'glide'|'punch'|'big', y, rise}
function mel(words, attr) {
  const spans = words.map(w => {
    const cls = w.k === 'big' ? 'punch big' : (w.k === 'punch' ? 'punch' : 'glide');
    const rise = w.rise ? '<span class="rise">↗</span>' : '';
    return `          <span class="w ${cls}" data-y="${w.y}">${w.t}${rise}</span>`;
  }).join('\n');
  return `      <div class="mstage">
        <svg class="mline" aria-hidden="true"><path/><circle class="head" r="4"/></svg>
        <div class="line is-flat"${attr || ''}>
${spans}
        </div>
      </div>`;
}

const T = {
  es: {
    htmlLang: 'es',
    title: 'SayItLikeThat — Habla con la melodía americana',
    desc: 'Hablas inglés — ¿y aún así te piden que repitas? SayItLikeThat te muestra la melodía del inglés americano, sobre tu propio guión. Conserva tu acento, domina el ritmo.',
    srOnly: 'SayItLikeThat te enseña la melodía del inglés americano — qué palabras golpear y cuáles dejar pasar — sobre tu propio guión, para que tu acento suene cálido en vez de extraño.',
    nav: { how: 'Cómo funciona', melody: 'La melodía', pricing: 'Precios', free: 'Guía gratis' },
    heroL1: 'Hablas inglés.', heroL2: 'Y aún así te piden que repitas.',
    heroWords: [{ t: 'No', k: 'punch', y: -30 }, { t: 'es', k: 'glide', y: 12 }, { t: 'tu', k: 'glide', y: 8 }, { t: 'gramática.', k: 'big', y: -48 }, { t: 'Es', k: 'glide', y: -4 }, { t: 'la', k: 'glide', y: 14 }, { t: 'melodía.', k: 'punch', y: -32, rise: true }],
    sub: 'Las palabras que <b>golpear</b>, y las que puedes soltar — señaladas en tu propio guión.',
    ctaStart: 'Empieza con la guía gratis', replay: '↺ verlo otra vez',
    feelEye: '¿Te suena?', feelH: 'Lo dices bien. Y aún así te dicen "¿perdón, qué?"',
    feelLead: 'Has ensayado la frase diez veces. Te sabes cada palabra. Y en cuanto sale de tu boca, su cara hace ese pequeño gesto de confusión — y te encoges un poco. No es tu vocabulario. No es tu gramática. Es el ritmo que nadie te enseñó.',
    fixEye: 'La solución', fixH: 'Cada frase en inglés tiene un ritmo.',
    fixLead: 'Algunas palabras se golpean fuerte. Las pequeñas casi desaparecen. Tu voz sube y luego baja. El oído nativo no juzga tu acento: siente si captaste el ritmo. Cáptalo, y tu misma voz suena cálida y segura.',
    secWords: [{ t: 'De', k: 'glide', y: 12 }, { t: 'verdad', k: 'big', y: -40 }, { t: 'creo', k: 'punch', y: -30 }, { t: 'que', k: 'glide', y: 10 }, { t: 'deberíamos', k: 'glide', y: 0 }, { t: 'hablar.', k: 'punch', y: -36 }],
    howEye: 'Cómo funciona', howH: 'Cuatro pasos. Entra inglés, sale confianza.',
    steps: [
      { t: 'Pega tu inglés', b: 'Un discurso, una respuesta de entrevista, un guión para un video. Solo en inglés — y no importa si es torpe.' },
      { t: 'Ve la melodía', b: 'La app marca qué palabras golpear y cuáles dejar pasar. Automáticamente, en cuanto pegas el texto.' },
      { t: 'Léelo en voz alta', b: 'Un teleprompter manos libres te guía. Escúchate una vez — y después desaparece para siempre.' },
      { t: 'Grábate', b: 'Tus palabras van junto al lente, para que mires a los ojos. Ponle subtítulos y publícalo.' }
    ],
    priceEye: 'Cuánto cuesta', priceH: 'Gratis para empezar. Honesto desde ahí.',
    freeTag: 'Gratis para siempre', freeNote: 'Sin cuenta. Sin tarjeta. Nada sale de tu teléfono.',
    freeList: ['Dos guiones propios', 'Todos los paquetes de práctica', 'El teleprompter de melodía', 'Escúchate a ti mismo'],
    premTag: 'Premium', perMo: '/mes', premNote: '7 días de prueba gratis. O paga una vez — $44.99 — y es tuyo para siempre.',
    premList: ['Guiones ilimitados', 'Graba video con subtítulos', 'Siete estilos de subtítulos, filtros, efectos', 'Todos los formatos: Reels, TikTok, YouTube'],
    cancel: 'Cancela cuando quieras en los ajustes de tu iPhone. Todo lo que creas es tuyo.',
    finalEye: 'Empieza por lo más fácil', finalH: 'Descarga la guía gratis.',
    finalLead: 'Los trucos más rápidos para sonar americano — sin necesidad de la app. Y cuando estés listo, lee tus propias palabras con la melodía.',
    finalCta: 'Obtener la guía gratis',
    footTag: 'Habla con la melodía americana',
    fPrivacy: 'Privacidad', fSupport: 'Soporte', fBlog: 'Blog', fFree: 'Guía gratis',
    legal: '© 2026 Natasha Lucas. Todos los derechos reservados. SayItLikeThat™ y la marca de melodía son activos de marca de Natasha Lucas.<br>Hecho para iPhone. Tu práctica de inglés permanece en inglés — nada se traduce, nada se guarda, nada sale de tu dispositivo.'
  },
  pt: {
    htmlLang: 'pt-BR',
    title: 'SayItLikeThat — Fale com a melodia americana',
    desc: 'Você fala inglês — e ainda pedem para repetir? O SayItLikeThat mostra a melodia do inglês americano, no seu próprio roteiro. Mantenha seu sotaque, domine o ritmo.',
    srOnly: 'O SayItLikeThat ensina a melodia do inglês americano — quais palavras enfatizar e quais deixar passar — no seu próprio roteiro, para o seu sotaque soar acolhedor em vez de estranho.',
    nav: { how: 'Como funciona', melody: 'A melodia', pricing: 'Preços', free: 'Guia grátis' },
    heroL1: 'Você fala inglês.', heroL2: 'E ainda pedem para você repetir.',
    heroWords: [{ t: 'Não', k: 'punch', y: -30 }, { t: 'é', k: 'glide', y: 12 }, { t: 'a', k: 'glide', y: 8 }, { t: 'gramática.', k: 'big', y: -48 }, { t: 'É', k: 'glide', y: -4 }, { t: 'a', k: 'glide', y: 14 }, { t: 'melodia.', k: 'punch', y: -32, rise: true }],
    sub: 'As palavras que você <b>enfatiza</b>, e as que pode soltar — marcadas no seu próprio roteiro.',
    ctaStart: 'Comece com o guia grátis', replay: '↺ ver de novo',
    feelEye: 'Soa familiar?', feelH: 'Você diz certo. E ainda dizem "desculpa, o quê?"',
    feelLead: 'Você ensaiou a frase dez vezes. Sabe cada palavra. E no instante em que ela sai da sua boca, o rosto da pessoa faz aquela careta de confusão — e você se encolhe um pouco. Não é o seu vocabulário. Não é a sua gramática. É o ritmo que ninguém te ensinou.',
    fixEye: 'A solução', fixH: 'Toda frase em inglês tem um ritmo.',
    fixLead: 'Algumas palavras são batidas com força. As pequenas quase somem. Sua voz sobe e depois desce. O ouvido nativo não julga seu sotaque: sente se você pegou o ritmo. Pegue-o, e a sua mesma voz soa calorosa e segura.',
    secWords: [{ t: 'Eu', k: 'glide', y: 12 }, { t: 'realmente', k: 'big', y: -40 }, { t: 'acho', k: 'punch', y: -30 }, { t: 'que', k: 'glide', y: 10 }, { t: 'devíamos', k: 'glide', y: 0 }, { t: 'conversar.', k: 'punch', y: -36 }],
    howEye: 'Como funciona', howH: 'Quatro passos. Entra inglês, sai confiança.',
    steps: [
      { t: 'Cole o seu inglês', b: 'Um discurso, uma resposta de entrevista, um roteiro de vídeo. Só em inglês — e tudo bem se estiver desajeitado.' },
      { t: 'Veja a melodia', b: 'O app marca quais palavras enfatizar e quais deixar passar. Automaticamente, assim que você cola.' },
      { t: 'Leia em voz alta', b: 'Um teleprompter sem as mãos te conduz. Ouça-se uma vez — e depois some para sempre.' },
      { t: 'Grave você mesmo', b: 'Suas palavras ficam ao lado da lente, para você olhar nos olhos. Coloque legendas e publique.' }
    ],
    priceEye: 'Quanto custa', priceH: 'Grátis para começar. Honesto daí em diante.',
    freeTag: 'Grátis para sempre', freeNote: 'Sem conta. Sem cartão. Nada sai do seu telefone.',
    freeList: ['Dois roteiros seus', 'Todos os pacotes de prática', 'O teleprompter de melodia', 'Ouça você mesmo'],
    premTag: 'Premium', perMo: '/mês', premNote: '7 dias grátis. Ou pague uma vez — $44.99 — e é seu para sempre.',
    premList: ['Roteiros ilimitados', 'Grave vídeo com legendas', 'Sete estilos de legenda, filtros, efeitos', 'Todos os formatos: Reels, TikTok, YouTube'],
    cancel: 'Cancele quando quiser nos ajustes do iPhone. Tudo o que você cria é seu.',
    finalEye: 'Comece pelo mais fácil', finalH: 'Baixe o guia grátis.',
    finalLead: 'Os truques mais rápidos para soar americano — sem precisar do app. E quando estiver pronto, leia as suas próprias palavras com a melodia.',
    finalCta: 'Baixar o guia grátis',
    footTag: 'Fale com a melodia americana',
    fPrivacy: 'Privacidade', fSupport: 'Suporte', fBlog: 'Blog', fFree: 'Guia grátis',
    legal: '© 2026 Natasha Lucas. Todos os direitos reservados. SayItLikeThat™ e a marca da melodia são ativos de marca de Natasha Lucas.<br>Feito para iPhone. Sua prática de inglês continua em inglês — nada é traduzido, nada é armazenado, nada sai do seu dispositivo.'
  },
  uk: {
    htmlLang: 'uk',
    title: 'SayItLikeThat — Говоріть з американською мелодією',
    desc: 'Ви говорите англійською — а вас усе одно просять повторити? SayItLikeThat показує мелодію американської англійської просто на вашому тексті. Збережіть акцент, опануйте ритм.',
    srOnly: 'SayItLikeThat навчає мелодії американської англійської — які слова підкреслити, а які проковтнути — просто на вашому тексті, щоб акцент звучав тепло, а не чужо.',
    nav: { how: 'Як це працює', melody: 'Мелодія', pricing: 'Ціни', free: 'Безкоштовний гід' },
    heroL1: 'Ви говорите англійською.', heroL2: 'А вас усе одно просять повторити.',
    heroWords: [{ t: 'Річ', k: 'glide', y: 12 }, { t: 'не', k: 'punch', y: -30 }, { t: 'в', k: 'glide', y: 8 }, { t: 'граматиці.', k: 'big', y: -48 }, { t: 'Річ', k: 'glide', y: -4 }, { t: 'у', k: 'glide', y: 14 }, { t: 'мелодії.', k: 'punch', y: -32, rise: true }],
    sub: 'Слова, які треба <b>підкреслити</b>, і ті, що можна проковтнути — позначені просто на вашому тексті.',
    ctaStart: 'Почніть з безкоштовного гіда', replay: '↺ ще раз',
    feelEye: 'Знайомо?', feelH: 'Ви кажете правильно. А у відповідь — "вибачте, що?"',
    feelLead: 'Ви відрепетирували фразу десять разів. Знаєте кожне слово. І щойно воно злітає з язика, обличчя співрозмовника робить оте розгублене — і ви трохи знічуєтесь. Річ не у словах. Річ не у граматиці. Річ у ритмі, якого вас ніхто не вчив.',
    fixEye: 'Рішення', fixH: 'У кожної англійської фрази є ритм.',
    fixLead: 'Деякі слова б’ють сильно. Маленькі майже зникають. Голос піднімається, а потім спадає. Носій мови не оцінює ваш акцент — він відчуває, чи впіймали ви ритм. Упіймайте — і той самий голос звучить тепло й упевнено.',
    secWords: [{ t: 'Я', k: 'glide', y: 12 }, { t: 'справді', k: 'big', y: -40 }, { t: 'думаю,', k: 'punch', y: -30 }, { t: 'що', k: 'glide', y: 10 }, { t: 'варто', k: 'glide', y: 0 }, { t: 'поговорити.', k: 'punch', y: -36 }],
    howEye: 'Як це працює', howH: 'Чотири кроки. Вкладаєте англійську — виходить упевненість.',
    steps: [
      { t: 'Вставте свою англійську', b: 'Промова, відповідь на співбесіді, сценарій для відео. Лише англійською — і незграбно теж цілком нормально.' },
      { t: 'Побачте мелодію', b: 'Застосунок позначає, які слова підкреслити, а які проковтнути. Автоматично, щойно ви вставили текст.' },
      { t: 'Читайте вголос', b: 'Суфлер веде вас без рук. Послухайте себе один раз — і потім це зникає назавжди.' },
      { t: 'Запишіть себе', b: 'Слова стоять біля об’єктива, тож ви дивитесь людям в очі. Додайте субтитри й публікуйте.' }
    ],
    priceEye: 'Скільки коштує', priceH: 'Безкоштовно на старті. Чесно далі.',
    freeTag: 'Безкоштовно назавжди', freeNote: 'Без акаунта. Без картки. Нічого не залишає ваш телефон.',
    freeList: ['Два ваші тексти', 'Усі набори для практики', 'Суфлер мелодії', 'Послухайте себе'],
    premTag: 'Premium', perMo: '/міс', premNote: '7 днів безкоштовно. Або заплатіть один раз — $44.99 — і це ваше назавжди.',
    premList: ['Необмежені тексти', 'Запис відео із субтитрами', 'Сім стилів субтитрів, фільтри, ефекти', 'Усі формати: Reels, TikTok, YouTube'],
    cancel: 'Скасуйте будь-коли в налаштуваннях iPhone. Усе, що ви створюєте, — ваше.',
    finalEye: 'Почніть з найлегшого', finalH: 'Завантажте безкоштовний гід.',
    finalLead: 'Найшвидші поради, щоб звучати по-американськи — без застосунку. А коли будете готові, прочитайте власні слова з мелодією.',
    finalCta: 'Отримати безкоштовний гід',
    footTag: 'Говоріть з американською мелодією',
    fPrivacy: 'Конфіденційність', fSupport: 'Підтримка', fBlog: 'Блог', fFree: 'Безкоштовний гід',
    legal: '© 2026 Natasha Lucas. Усі права захищені. SayItLikeThat™ і знак мелодії — брендові активи Natasha Lucas.<br>Створено для iPhone. Ваша практика англійської лишається англійською — нічого не перекладається, не зберігається й не залишає ваш пристрій.'
  },
  ru: {
    htmlLang: 'ru',
    title: 'SayItLikeThat — Говорите с американской мелодией',
    desc: 'Вы говорите по-английски — а вас всё равно просят повторить? SayItLikeThat показывает мелодию американского английского прямо на вашем тексте. Сохраните акцент, освойте ритм.',
    srOnly: 'SayItLikeThat учит мелодии американского английского — какие слова подчеркнуть, а какие проглотить — прямо на вашем тексте, чтобы акцент звучал тепло, а не чуждо.',
    nav: { how: 'Как это работает', melody: 'Мелодия', pricing: 'Цены', free: 'Бесплатный гид' },
    heroL1: 'Вы говорите по-английски.', heroL2: 'А вас всё равно просят повторить.',
    heroWords: [{ t: 'Дело', k: 'glide', y: 12 }, { t: 'не', k: 'punch', y: -30 }, { t: 'в', k: 'glide', y: 8 }, { t: 'грамматике.', k: 'big', y: -48 }, { t: 'Дело', k: 'glide', y: -4 }, { t: 'в', k: 'glide', y: 14 }, { t: 'мелодии.', k: 'punch', y: -32, rise: true }],
    sub: 'Слова, которые нужно <b>подчеркнуть</b>, и те, что можно проглотить — отмечены прямо на вашем тексте.',
    ctaStart: 'Начните с бесплатного гида', replay: '↺ ещё раз',
    feelEye: 'Знакомо?', feelH: 'Вы говорите правильно. А в ответ — «простите, что?»',
    feelLead: 'Вы отрепетировали фразу десять раз. Знаете каждое слово. И в тот миг, когда оно слетает с языка, лицо собеседника делает то самое растерянное движение — и вы немного сжимаетесь. Дело не в словах. Дело не в грамматике. Дело в ритме, которому вас никто не учил.',
    fixEye: 'Решение', fixH: 'У каждой английской фразы есть ритм.',
    fixLead: 'Одни слова бьют сильно. Маленькие почти исчезают. Голос поднимается, а потом падает. Носитель не оценивает ваш акцент — он чувствует, поймали ли вы ритм. Поймайте — и тот же голос звучит тепло и уверенно.',
    secWords: [{ t: 'Я', k: 'glide', y: 12 }, { t: 'правда', k: 'big', y: -40 }, { t: 'думаю,', k: 'punch', y: -30 }, { t: 'что', k: 'glide', y: 10 }, { t: 'стоит', k: 'glide', y: 0 }, { t: 'поговорить.', k: 'punch', y: -36 }],
    howEye: 'Как это работает', howH: 'Четыре шага. Вводите английский — выходит уверенность.',
    steps: [
      { t: 'Вставьте свой английский', b: 'Речь, ответ на собеседовании, сценарий для видео. Только по-английски — и неуклюже тоже совершенно нормально.' },
      { t: 'Увидьте мелодию', b: 'Приложение отмечает, какие слова подчеркнуть, а какие проглотить. Автоматически, как только вы вставили текст.' },
      { t: 'Читайте вслух', b: 'Суфлёр ведёт вас без рук. Послушайте себя один раз — и потом это исчезает навсегда.' },
      { t: 'Запишите себя', b: 'Слова стоят у объектива, чтобы вы смотрели в глаза. Добавьте субтитры и публикуйте.' }
    ],
    priceEye: 'Сколько стоит', priceH: 'Бесплатно на старте. Честно дальше.',
    freeTag: 'Бесплатно навсегда', freeNote: 'Без аккаунта. Без карты. Ничего не покидает ваш телефон.',
    freeList: ['Два ваших текста', 'Все наборы для практики', 'Суфлёр мелодии', 'Послушайте себя'],
    premTag: 'Premium', perMo: '/мес', premNote: '7 дней бесплатно. Или заплатите один раз — $44.99 — и это ваше навсегда.',
    premList: ['Безлимитные тексты', 'Запись видео с субтитрами', 'Семь стилей субтитров, фильтры, эффекты', 'Все форматы: Reels, TikTok, YouTube'],
    cancel: 'Отмените в любой момент в настройках iPhone. Всё, что вы создаёте, — ваше.',
    finalEye: 'Начните с самого лёгкого', finalH: 'Скачайте бесплатный гид.',
    finalLead: 'Самые быстрые приёмы, чтобы звучать по-американски — без приложения. А когда будете готовы, прочитайте свои слова с мелодией.',
    finalCta: 'Получить бесплатный гид',
    footTag: 'Говорите с американской мелодией',
    fPrivacy: 'Конфиденциальность', fSupport: 'Поддержка', fBlog: 'Блог', fFree: 'Бесплатный гид',
    legal: '© 2026 Natasha Lucas. Все права защищены. SayItLikeThat™ и знак мелодии — бренд-активы Natasha Lucas.<br>Создано для iPhone. Ваша практика английского остаётся английской — ничего не переводится, не сохраняется и не покидает ваше устройство.'
  },
  de: {
    htmlLang: 'de',
    title: 'SayItLikeThat — Sprich mit der amerikanischen Melodie',
    desc: 'Du sprichst Englisch — und trotzdem bittet man dich zu wiederholen? SayItLikeThat zeigt dir die Melodie des amerikanischen Englisch, direkt auf deinem Text. Behalte deinen Akzent, meistere den Rhythmus.',
    srOnly: 'SayItLikeThat bringt dir die Melodie des amerikanischen Englisch bei — welche Wörter betont und welche verschluckt werden — direkt auf deinem Text, damit dein Akzent warm klingt statt fremd.',
    nav: { how: 'So funktioniert’s', melody: 'Die Melodie', pricing: 'Preise', free: 'Gratis-Guide' },
    heroL1: 'Du sprichst Englisch.', heroL2: 'Und trotzdem sollst du wiederholen.',
    heroWords: [{ t: 'Nicht', k: 'punch', y: -30 }, { t: 'die', k: 'glide', y: 12 }, { t: 'Grammatik.', k: 'big', y: -48 }, { t: 'Die', k: 'glide', y: 6 }, { t: 'Melodie.', k: 'punch', y: -32, rise: true }],
    sub: 'Die Wörter, die du <b>betonst</b>, und die, die du gleiten lässt — direkt auf deinem Text markiert.',
    ctaStart: 'Starte mit dem Gratis-Guide', replay: '↺ nochmal ansehen',
    feelEye: 'Kommt dir bekannt vor?', feelH: 'Du sagst es richtig. Und trotzdem: „Wie bitte?“',
    feelLead: 'Du hast den Satz zehnmal geübt. Du kennst jedes Wort. Und in dem Moment, in dem er deinen Mund verlässt, macht das Gesicht des anderen dieses kleine verwirrte Zucken — und du wirst ein bisschen kleiner. Es ist nicht dein Wortschatz. Es ist nicht deine Grammatik. Es ist der Rhythmus, den dir nie jemand beigebracht hat.',
    fixEye: 'Die Lösung', fixH: 'Jeder englische Satz hat einen Takt.',
    fixLead: 'Manche Wörter werden hart betont. Die kleinen verschwinden fast. Die Stimme steigt, dann fällt sie. Muttersprachler beurteilen nicht deinen Akzent — sie spüren, ob du den Takt getroffen hast. Triff ihn, und dieselbe Stimme klingt warm und sicher.',
    secWords: [{ t: 'Ich', k: 'glide', y: 12 }, { t: 'finde', k: 'punch', y: -30 }, { t: 'wirklich,', k: 'big', y: -40 }, { t: 'wir', k: 'glide', y: 10 }, { t: 'sollten', k: 'glide', y: 0 }, { t: 'reden.', k: 'punch', y: -36 }],
    howEye: 'So funktioniert’s', howH: 'Vier Schritte. Englisch rein, Selbstsicherheit raus.',
    steps: [
      { t: 'Füge dein Englisch ein', b: 'Eine Rede, eine Interview-Antwort, ein Skript fürs Video. Nur Englisch — und holprig ist völlig okay.' },
      { t: 'Sieh die Melodie', b: 'Die App markiert, welche Wörter betont und welche verschluckt werden. Automatisch, sobald du einfügst.' },
      { t: 'Lies laut vor', b: 'Ein freihändiger Teleprompter führt dich. Hör dich einmal an — danach ist es für immer weg.' },
      { t: 'Nimm dich auf', b: 'Deine Wörter sitzen neben der Linse, du schaust den Leuten in die Augen. Untertitel drauf, posten.' }
    ],
    priceEye: 'Was es kostet', priceH: 'Gratis zum Start. Ehrlich ab da.',
    freeTag: 'Für immer gratis', freeNote: 'Kein Konto. Keine Karte. Nichts verlässt dein Handy.',
    freeList: ['Zwei eigene Texte', 'Alle Übungspakete', 'Der Melodie-Teleprompter', 'Hör dich selbst an'],
    premTag: 'Premium', perMo: '/Mon.', premNote: '7 Tage gratis. Oder einmal zahlen — $44.99 — und es gehört für immer dir.',
    premList: ['Unbegrenzte Texte', 'Video mit Untertiteln aufnehmen', 'Sieben Untertitel-Looks, Filter, Effekte', 'Alle Formate: Reels, TikTok, YouTube'],
    cancel: 'Jederzeit in den iPhone-Einstellungen kündbar. Alles, was du erstellst, bleibt deins.',
    finalEye: 'Fang beim Leichtesten an', finalH: 'Hol dir den Gratis-Guide.',
    finalLead: 'Die schnellsten Tricks, um amerikanisch zu klingen — ganz ohne App. Und wenn du bereit bist, lies deine eigenen Worte mit der Melodie.',
    finalCta: 'Gratis-Guide holen',
    footTag: 'Sprich mit der amerikanischen Melodie',
    fPrivacy: 'Datenschutz', fSupport: 'Support', fBlog: 'Blog', fFree: 'Gratis-Guide',
    legal: '© 2026 Natasha Lucas. Alle Rechte vorbehalten. SayItLikeThat™ und das Melodie-Zeichen sind Markenwerte von Natasha Lucas.<br>Für iPhone gemacht. Deine Englisch-Übung bleibt Englisch — nichts wird übersetzt, nichts gespeichert, nichts verlässt dein Gerät.'
  },
  pl: {
    htmlLang: 'pl',
    title: 'SayItLikeThat — Mów z amerykańską melodią',
    desc: 'Mówisz po angielsku — a i tak proszą, żebyś powtórzył? SayItLikeThat pokazuje melodię amerykańskiego angielskiego wprost na twoim tekście. Zachowaj akcent, opanuj rytm.',
    srOnly: 'SayItLikeThat uczy melodii amerykańskiego angielskiego — które słowa zaakcentować, a które połknąć — wprost na twoim tekście, żeby akcent brzmiał ciepło, a nie obco.',
    nav: { how: 'Jak to działa', melody: 'Melodia', pricing: 'Ceny', free: 'Darmowy przewodnik' },
    heroL1: 'Mówisz po angielsku.', heroL2: 'A i tak proszą, żebyś powtórzył.',
    heroWords: [{ t: 'To', k: 'glide', y: 12 }, { t: 'nie', k: 'punch', y: -30 }, { t: 'gramatyka.', k: 'big', y: -48 }, { t: 'To', k: 'glide', y: 6 }, { t: 'melodia.', k: 'punch', y: -32, rise: true }],
    sub: 'Słowa, które <b>akcentujesz</b>, i te, które możesz połknąć — zaznaczone wprost na twoim tekście.',
    ctaStart: 'Zacznij od darmowego przewodnika', replay: '↺ zobacz jeszcze raz',
    feelEye: 'Znajome?', feelH: 'Mówisz poprawnie. A i tak słyszysz „przepraszam, co?”',
    feelLead: 'Przećwiczyłeś zdanie dziesięć razy. Znasz każde słowo. I w chwili, gdy wychodzi z ust, twarz rozmówcy robi to lekko zdezorientowane coś — a ty trochę się kurczysz. To nie twoje słownictwo. To nie twoja gramatyka. To rytm, którego nikt cię nie nauczył.',
    fixEye: 'Rozwiązanie', fixH: 'Każde angielskie zdanie ma rytm.',
    fixLead: 'Niektóre słowa uderza się mocno. Małe niemal znikają. Głos wznosi się, potem opada. Rodzimy słuch nie ocenia twojego akcentu — czuje, czy złapałeś rytm. Złap go, a ten sam głos brzmi ciepło i pewnie.',
    secWords: [{ t: 'Naprawdę', k: 'big', y: -40 }, { t: 'myślę,', k: 'punch', y: -30 }, { t: 'że', k: 'glide', y: 10 }, { t: 'powinniśmy', k: 'glide', y: 0 }, { t: 'porozmawiać.', k: 'punch', y: -36 }],
    howEye: 'Jak to działa', howH: 'Cztery kroki. Wkładasz angielski, wychodzi pewność.',
    steps: [
      { t: 'Wklej swój angielski', b: 'Przemówienie, odpowiedź na rozmowie, scenariusz do wideo. Tylko po angielsku — i nieporadnie też jest zupełnie w porządku.' },
      { t: 'Zobacz melodię', b: 'Aplikacja zaznacza, które słowa zaakcentować, a które połknąć. Automatycznie, gdy tylko wkleisz.' },
      { t: 'Czytaj na głos', b: 'Teleprompter bez rąk prowadzi cię. Posłuchaj siebie raz — a potem znika na zawsze.' },
      { t: 'Nagraj siebie', b: 'Słowa są przy obiektywie, więc patrzysz ludziom w oczy. Dodaj napisy i opublikuj.' }
    ],
    priceEye: 'Ile kosztuje', priceH: 'Za darmo na start. Uczciwie dalej.',
    freeTag: 'Za darmo na zawsze', freeNote: 'Bez konta. Bez karty. Nic nie opuszcza twojego telefonu.',
    freeList: ['Dwa własne teksty', 'Wszystkie pakiety ćwiczeń', 'Teleprompter melodii', 'Posłuchaj siebie'],
    premTag: 'Premium', perMo: '/mies', premNote: '7 dni za darmo. Albo zapłać raz — $44.99 — i jest twoje na zawsze.',
    premList: ['Nielimitowane teksty', 'Nagrywanie wideo z napisami', 'Siedem stylów napisów, filtry, efekty', 'Wszystkie formaty: Reels, TikTok, YouTube'],
    cancel: 'Anuluj kiedy chcesz w ustawieniach iPhone’a. Wszystko, co tworzysz, jest twoje.',
    finalEye: 'Zacznij od najłatwiejszego', finalH: 'Pobierz darmowy przewodnik.',
    finalLead: 'Najszybsze triki, żeby brzmieć po amerykańsku — bez aplikacji. A gdy będziesz gotowy, przeczytaj własne słowa z melodią.',
    finalCta: 'Pobierz darmowy przewodnik',
    footTag: 'Mów z amerykańską melodią',
    fPrivacy: 'Prywatność', fSupport: 'Wsparcie', fBlog: 'Blog', fFree: 'Darmowy przewodnik',
    legal: '© 2026 Natasha Lucas. Wszelkie prawa zastrzeżone. SayItLikeThat™ i znak melodii to aktywa marki Natasha Lucas.<br>Stworzone na iPhone’a. Twoja praktyka angielskiego pozostaje angielska — nic nie jest tłumaczone, nic nie jest zapisywane, nic nie opuszcza twojego urządzenia.'
  }
};

const SC = {
  es: { eye: 'Míralo en acción', h: 'Toda la app, en seis pantallas.' },
  pt: { eye: 'Veja em ação', h: 'O app inteiro, em seis telas.' },
  uk: { eye: 'Подивіться в дії', h: 'Увесь застосунок — у шести екранах.' },
  ru: { eye: 'Посмотрите в действии', h: 'Всё приложение — в шести экранах.' },
  de: { eye: 'In Aktion sehen', h: 'Die ganze App, in sechs Screens.' },
  pl: { eye: 'Zobacz w akcji', h: 'Cała aplikacja, w sześciu ekranach.' }
};
const SHOT_FILES = ['1-prompter', '2-camera-armed', '3-library', '4-done-card', '5-playback-styles', '6-paywall'];
function shotsMarkup() {
  return SHOT_FILES.map(f => `      <div class="shot"><img src="../assets/app/${f}.jpg" alt="" loading="lazy" width="216"></div>`).join('\n');
}

function navLang(cur) {
  return ORDER.map(l => {
    const href = l === 'en' ? '../index.html' : (l === cur ? 'index.html' : '../' + l + '/index.html');
    const ac = l === cur ? ' aria-current="true"' : '';
    return `        <a href="${href}"${ac}>${CODE[l]}</a>`;
  }).join('\n');
}
function footLang(cur) {
  return ORDER.map(l => {
    if (l === cur) return NAME[l];
    const href = l === 'en' ? '../index.html' : '../' + l + '/index.html';
    return `<a href="${href}">${NAME[l]}</a>`;
  }).join(' ·\n      ');
}

function hreflang() {
  return [
    '<link rel="alternate" hreflang="en" href="https://sayitlikethat.com/index.html">',
    '<link rel="alternate" hreflang="es" href="https://sayitlikethat.com/es/index.html">',
    '<link rel="alternate" hreflang="pt-BR" href="https://sayitlikethat.com/pt/index.html">',
    '<link rel="alternate" hreflang="uk" href="https://sayitlikethat.com/uk/index.html">',
    '<link rel="alternate" hreflang="ru" href="https://sayitlikethat.com/ru/index.html">',
    '<link rel="alternate" hreflang="de" href="https://sayitlikethat.com/de/index.html">',
    '<link rel="alternate" hreflang="pl" href="https://sayitlikethat.com/pl/index.html">',
    '<link rel="alternate" hreflang="x-default" href="https://sayitlikethat.com/index.html">'
  ].join('\n');
}

function page(cur) {
  const t = T[cur];
  const steps = t.steps.map((s, i) => `      <div class="step reveal" style="--d:${i * 80}ms"><div class="n">0${i + 1}</div><h3>${s.t}</h3><p>${s.b}</p></div>`).join('\n');
  const freeLis = t.freeList.map(x => `<li>${x}</li>`).join('');
  const premLis = t.premList.map(x => `<li>${x}</li>`).join('');
  return `<!doctype html>
<html lang="${t.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="apple-itunes-app" content="app-id=6787588368">
<title>${t.title}</title>
<meta name="description" content="${t.desc.replace(/"/g, '&quot;')}">
${hreflang()}
${STYLE}
</head>
<body>
<h2 class="sr-only">${t.srOnly}</h2>

<nav>
  <div class="wrap">
    <a class="brand" href="#top">SayIt<b>Like</b>That</a>
    <div class="navlinks">
      <a class="hideable" href="#how">${t.nav.how}</a>
      <a class="hideable" href="#melody">${t.nav.melody}</a>
      <a class="hideable" href="#pricing">${t.nav.pricing}</a>
      <span class="lang" aria-label="Language">
${navLang(cur)}
      </span>
      <a class="pill" href="#free">${t.nav.free}</a>
    </div>
  </div>
</nav>

<header class="hero" id="top">
  <div class="glow"></div><div class="vig"></div>
  <div class="wrap">
    <p class="eyebrow">SayItLikeThat</p>
    <h1>${t.heroL1}<br><span class="dim">${t.heroL2}</span></h1>
    <div class="melody" style="margin:26px 0 6px">
${mel(t.heroWords, ' data-hero')}
    </div>
    <p class="sub">${t.sub}</p>
    <div class="cta-row">
      <a class="cta" href="#free">${t.ctaStart}</a>
      <button class="replay" id="replay" type="button">${t.replay}</button>
    </div>
  </div>
</header>

<section class="band" id="feeling">
  <div class="wrap reveal">
    <p class="eyebrow">${t.feelEye}</p>
    <h2>${t.feelH}</h2>
    <p class="lead">${t.feelLead}</p>
  </div>
</section>

<section class="band center" id="melody">
  <div class="wrap">
    <div class="reveal">
      <p class="eyebrow">${t.fixEye}</p>
      <h2>${t.fixH}</h2>
      <p class="lead">${t.fixLead}</p>
    </div>
    <div class="melody reveal" style="margin-top:30px" data-scroll>
${mel(t.secWords)}
    </div>
  </div>
</section>

<section class="band" id="how">
  <div class="wrap">
    <div class="reveal"><p class="eyebrow">${t.howEye}</p><h2>${t.howH}</h2></div>
    <div class="steps">
${steps}
    </div>
  </div>
</section>

<section class="band center" id="screens">
  <div class="wrap">
    <div class="reveal"><p class="eyebrow">${SC[cur].eye}</p><h2>${SC[cur].h}</h2></div>
    <div class="shots reveal">
${shotsMarkup()}
    </div>
  </div>
</section>

<section class="band center" id="pricing">
  <div class="wrap">
    <div class="reveal"><p class="eyebrow">${t.priceEye}</p><h2>${t.priceH}</h2></div>
    <div class="price">
      <div class="card reveal" style="text-align:left"><div class="tag">${t.freeTag}</div>
        <div class="big">$0</div><p class="note">${t.freeNote}</p>
        <ul>${freeLis}</ul>
      </div>
      <div class="card hi reveal" style="text-align:left;--d:100ms"><div class="tag">${t.premTag}</div>
        <div class="big">$4.99<span style="font-size:16px;font-weight:600;color:var(--dim)">${t.perMo}</span></div>
        <p class="note">${t.premNote}</p>
        <ul>${premLis}</ul>
      </div>
    </div>
    <p class="lead center" style="margin-top:22px;font-size:14.5px;color:var(--faint)">${t.cancel}</p>
  </div>
</section>

<section class="final" id="free">
  <div class="glow2"></div>
  <div class="wrap reveal">
    <p class="eyebrow">${t.finalEye}</p>
    <h2 style="font-size:clamp(26px,3.8vw,42px);font-weight:800;letter-spacing:-.02em;margin:0 0 14px">${t.finalH}</h2>
    <p class="lead center" style="margin:0 auto 26px">${t.finalLead}</p>
    <a class="cta" href="../checklist.html">${t.finalCta}</a>
  </div>
</section>

<footer>
  <div class="wrap">
    <div class="row">
      <div class="brand"><span style="font-weight:800">SayIt<b style="color:var(--turq)">Like</b>That</span> · <span style="color:var(--dim)">${t.footTag}</span></div>
      <div class="flinks">
        <a href="../privacy.html">${t.fPrivacy}</a>
        <a href="../support.html">${t.fSupport}</a>
        <a href="../blog/index.html">${t.fBlog}</a>
        <a href="../checklist.html">${t.fFree}</a>
      </div>
    </div>
    <p class="flang" style="margin-top:22px;font-size:13.5px;color:var(--dim)">${footLang(cur)}</p>
    <p class="legal">${t.legal}</p>
  </div>
</footer>

${SCRIPT}
</body>
</html>
`;
}

['es', 'pt', 'uk', 'ru', 'de', 'pl'].forEach(function (l) {
  fs.mkdirSync(path.join(__dirname, l), { recursive: true });
  fs.writeFileSync(path.join(__dirname, l, 'index.html'), page(l));
  console.log('wrote', l + '/index.html');
});
