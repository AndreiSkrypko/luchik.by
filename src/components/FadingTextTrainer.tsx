import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FadingTextTrainer.module.css';

interface Difficulty {
  id: number;
  title: string;
  wordCount: number;
  sampleText: string;
  order: number;
}

interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  prompt: string;
  options: QuestionOption[];
}

// Данные уровней из миграции
const DIFFICULTIES: Difficulty[] = [
  { id: 1, order: 1, title: 'Зимой — 10 слов(а)', wordCount: 10, sampleText: 'У Зины санки. У Зины зайка. На санках спит зайка.' },
  { id: 2, order: 2, title: 'У Шуры кошка — 11 слов(а)', wordCount: 11, sampleText: 'У Шуры кошка. Кошка Мурка. У Шуры молоко. На Мурку молока!' },
  { id: 3, order: 3, title: 'У осы усы — 12 слов(а)', wordCount: 12, sampleText: 'У осы усы. У сома усы. У Ромы шар. У Муры шары.' },
  { id: 4, order: 4, title: 'У нас рос мак — 14 слов(а)', wordCount: 14, sampleText: 'У нас рос мак. Наш мак хорош. У нас рос лук. Наш лук сух.' },
  { id: 5, order: 5, title: 'Узоры — 14 слов(а)', wordCount: 14, sampleText: 'За окном мороз. На окнах узоры. Узоры как розы. Хороши розы. Хороши и морозы.' },
  { id: 6, order: 6, title: 'У Ромы мыло — 17 слов(а)', wordCount: 17, sampleText: 'У Ромы мыло. Рома мыл раму. Мыл хорошо. У Лоры шары. Лора мыла шар. У Лоры сыро.' },
  { id: 7, order: 7, title: 'Около кино — 17 слов(а)', wordCount: 17, sampleText: 'Сима и Нина шли мимо кино. Смотри, Нина, там Саша. Саша стоит у кино, он смотрит картинки.' },
  { id: 8, order: 8, title: 'Воробей и ласточки — 22 слов(а)', wordCount: 22, sampleText: 'Ласточка свила гнездо. Воробей увидел гнездо и занял его. Ласточка позвала на помощь своих подруг. Вместе ласточки выгнали воробья из гнезда.' },
  { id: 9, order: 9, title: 'Муравей — 22 слов(а)', wordCount: 22, sampleText: 'Муравей нашел большое зерно. Он не мог тащить его один. Муравей позвал на помощь товарищей. Вместе муравьи легко притащили зерно в муравейник.' },
  { id: 10, order: 10, title: 'Липа — 25 слов(а)', wordCount: 25, sampleText: 'У нас росла липа. Липа стала стара. Липа стала суха. Липа упала. Пришли папа и Паша. У папы пила. У Паши топорик. Они распилили липу.' },
  { id: 11, order: 11, title: 'Лето — 29 слов(а)', wordCount: 29, sampleText: 'Наступило тёплое лето. В саду поспела смородина. Маша и Таня собирают её в ведёрко. Мама будет варить из неё варенье. Зимой дети будут пить чай с вареньем.' },
  { id: 12, order: 12, title: 'Цыплёнок — 34 слов(а)', wordCount: 34, sampleText: 'Маленькая девочка намотала шерстяные нитки на яйцо. Получился клубок. Она положила его на печку в корзинку. Прошло три недели. Вдруг послышался писк. Девочка размотала клубок. Там был маленький цыплёнок.' },
  { id: 13, order: 13, title: 'Одуванчики — 38 слов(а)', wordCount: 38, sampleText: 'Одуванчик похож на солнышко с золотыми лучами. А рядом белеет пушистый шарик. Таня дунула на шарик. Полетели пушинки. Потому и называется одуванчик. Танюша пришла домой с золотым веночком на голове.' },
  { id: 14, order: 14, title: 'Грибы — 38 слов(а)', wordCount: 38, sampleText: 'Ребята пошли в лес за грибами. Дима нашёл под берёзой красивый подберёзовик. Таня увидела под сосной маленький маслёнок. Илья разглядел в траве огромный боровик. В роще они набрали полные корзины грибов.' },
  { id: 15, order: 15, title: 'Галка — 38 слов(а)', wordCount: 38, sampleText: 'Галку и ворону различить просто. Галка меньше вороны и вся чёрная, только вокруг шеи серые перышки, будто серым платочком повязана. У вороны наоборот: туловище серое, чёрные голова, шея, крылья и хвост.' },
  { id: 16, order: 16, title: 'Ёж — 39 слов(а)', wordCount: 39, sampleText: 'Ребята нашли в лесу ежа. Он от испуга свернулся клубком. Они положили его в шапку и принесли домой. Дали молока. Ёжик развернулся и начал лакать. Потом ёж убежал обратно в лес.' },
  { id: 17, order: 17, title: 'Лесной оркестр — 42 слов(а)', wordCount: 42, sampleText: 'Звонкими голосами поют зяблики, соловьи, певчие дрозды. Скрипят жуки и кузнечики. Барабанят дятлы. Свистят флейтой иволги. Лают лисицы и куропатки. Воет волк. Ухает филин. Жужжат шмели и пчёлы.' },
  { id: 18, order: 18, title: 'Храбрецы — 44 слов(а)', wordCount: 44, sampleText: 'Ребята шли в школу. Вдруг выскочила собака и с лаем кинулась на них. Мальчики бросились бежать. Один Боря остался стоять. Собака подошла. Боря погладил её. Потом он спокойно пошёл в школу, а собака побрела за ним.' },
  { id: 19, order: 19, title: 'Летучие мыши — 51 слов(а)', wordCount: 51, sampleText: 'Летучие мыши поедают вредных насекомых. Днём они заворачиваются в свои широкие крылья, как в плащи, и висят вниз головой. Ночью вылетают на охоту. Многие вредные насекомые летают ночью, поэтому работа летучих мышей особенно важна.' },
  { id: 20, order: 20, title: 'Клесты — 56 слов(а)', wordCount: 56, sampleText: 'Весной и летом у птиц много забот. Они вьют гнёзда и выкармливают птенцов. Только клесты без забот прыгают по деревьям. Наступили морозы, а в гнезде у них птенчики. Мать греет малышей. Клесты выводят птенцов осенью, когда созревают еловые шишки.' },
  { id: 21, order: 21, title: 'Воробьиный термометр — 58 слов(а)', wordCount: 58, sampleText: 'Воробьи показывают мне температуру, как термометры. Если они гладкие и поджарые, значит тепло. Если пухлые и взъерошенные, словно шарики, значит мороз и нужно беречься. Ни разу воробьи меня не подвели.' },
  { id: 22, order: 22, title: 'Цветочные часы — 60 слов(а)', wordCount: 60, sampleText: 'Ребята сделали в лагере цветочные часы. Первым просыпается мак. За ним раскрывается гвоздика. Потом цветут ноготки. Самым последним на клумбе оказался душистый цветок. В центре посадили подсолнухи. Их головки весь день смотрят на солнце.' },
  { id: 23, order: 23, title: 'Синичье гнездо — 60 слов(а)', wordCount: 60, sampleText: 'Синица искала место для гнезда и нашла щель почтового ящика. Понравилось. Синички расширили щель, натаскали мха, шерсти, травинок. Хозяин попросил почтальона класть газеты на крыльцо. Кошка охотилась у ящика, хозяйка оплела его шиповником. Осенью синицы улетели.' },
  { id: 24, order: 24, title: 'Бобры — 61 слов(а)', wordCount: 61, sampleText: 'На берег вылез бобр. Он осмотрел молодую осину, обхватил лапами ствол и начал грызть. Дерево рухнуло. Бобр обгрыз ветки и потащил их к воде. На берегу бобры облепили ветки грязью, построив свои жилища.' },
  { id: 25, order: 25, title: 'Может ли дерево взлететь? — 63 слов(а)', wordCount: 63, sampleText: 'Росло дерево и мечтало летать. Старые деревья смеялись. Пришёл лесоруб, срубил дерево. Столяр сделал планочки. Ребята смастерили из них лёгкие авиамодели. И дерево взлетело.' },
  { id: 26, order: 26, title: 'Живая шляпа — 63 слов(а)', wordCount: 63, sampleText: 'Шляпа лежала на комоде. Котёнок Васька сидел на полу. Вовка и Вадик раскрашивали картинки. Вдруг шляпа упала на пол и поползла. Мальчики испугались, набрали картошки и стали бросать в шляпу. Шляпа подпрыгнула, из неё выскочил котёнок.' },
  { id: 27, order: 27, title: 'Лиса и кувшин — 63 слов(а)', wordCount: 63, sampleText: 'Баба поставила кувшин с молоком в ручей. Лиса увидела его, вылакала молоко, но не смогла вытащить голову. Она решила утопить кувшин. Кувшин утонул и потянул лису, даже в молоке бывает опасность.' },
  { id: 28, order: 28, title: 'Орёл — 65 слов(а)', wordCount: 65, sampleText: 'Орёл свил гнездо вдали от моря. Люди увидели его с рыбой в когтях и стали кидать камни. Орёл выронил рыбу. Люди ушли с добычей. Орлята просили корм. Орёл сел на край гнезда и думал.' },
  { id: 29, order: 29, title: 'Сентябрь — 65 слов(а)', wordCount: 65, sampleText: 'По утрам холодные туманы застилают низины. К полудню солнце прогревает воздух. Сентябрь красив. В лесу тихо и торжественно. Птицы почти не поют. Иногда свистнет синица. Ветер сорвёт дождь золотых листьев, устеливших землю ковром.' },
  { id: 30, order: 30, title: 'Русская смекалка — 67 слов(а)', wordCount: 67, sampleText: 'В горах дорогу преградил камень. Не было техники, чтобы его убрать. Крестьянин подкопал яму под камень, тот рухнул в неё. Мужик подровнял землю — и дорога готова. Так смекалка решила трудную задачу.' },
  { id: 31, order: 31, title: 'Утята и стрекоза — 68 слов(а)', wordCount: 68, sampleText: 'Хозяйка выносила утятам рубленые яйца. Как только они подходили к тарелке, из сада вылетала большая стрекоза. Она стрекотала, утята убегали и прятались. Стрекоза садилась на тарелку, пробовала еду и улетала. Утята весь день боялись подходить к еде.' },
  { id: 32, order: 32, title: 'Стояла осень — 68 слов(а)', wordCount: 68, sampleText: 'Листья облетели. Охотники жарили картошку. Запах был вкусный. В траве засопел зверь, высунул нос и долго нюхал воздух. Это был барсук. Он сунул нос в картошку, обжёгся и убежал лечить нос.' },
  { id: 33, order: 33, title: 'Белоснежное чудо — 69 слов(а)', wordCount: 69, sampleText: 'Мы посадили лилию. Долго ждали. Появились бутоны. Один распустился, получился белоснежный колокольчик. Я понюхал цветок. От него шёл нежный аромат. Нос стал жёлтый, как солнце. Мы неделю любовались лилией.' },
  { id: 34, order: 34, title: 'Каникулы — 70 слов(а)', wordCount: 70, sampleText: 'Слово «каникулы» родилось на небе. Яркую звезду Сириус называли Каникулой. Она появляется в жаркое время. Тогда школьникам давали отдых. Сначала каникулы были только летом, теперь так зовут любой перерыв в учебе.' },
  { id: 35, order: 35, title: 'Лебеди — 70 слов(а)', wordCount: 70, sampleText: 'Я увидел на озере двух белых лебедей-кликунов. Они плавали две недели. Я сделал кормушку и насыпал зерно. Лебеди боялись, но потом взяли хлеб и привыкли. Теперь они берут угощение прямо из рук.' },
  { id: 36, order: 36, title: 'Птица-секретарь — 71 слов(а)', wordCount: 71, sampleText: 'Птицу зовут секретарём, потому что её оперение напоминает одежду писца. У неё косицы, словно перья за ушами. Секретарь охотится на змей. Змея шипит, а птица бьёт её крылом по голове и съедает кусочками.' },
  { id: 37, order: 37, title: 'Утренние лучи — 72 слов(а)', wordCount: 72, sampleText: 'Солнце рассыпает золотые лучи. Первый луч попал в гнездо жаворонка. Второй — на зайчика. Третий — в курятник. Четвёртый — в улей. Жаворонок запел, зайчик побежал за травой, петух разбудил кур, пчёлка полетела за мёдом.' },
  { id: 38, order: 38, title: 'Волшебные краски — 72 слов(а)', wordCount: 72, sampleText: 'Дед Мороз подарил мальчику краски. Они станут волшебными, если очень захотеть. Мальчик вырос и стал художником. Люди восхищались его картинами и говорили о волшебных красках, хотя они были самыми обычными. Волшебство в трудолюбивых руках.' },
  { id: 39, order: 39, title: 'Муравьиная тропа — 72 слов(а)', wordCount: 72, sampleText: 'Муравьи бегали по бревну через ручей, но люди их давили. Кто-то положил рядом другое бревно. Теперь муравьи бегают по своему, а люди по новому. Муравьи не узнали помощника, но он точно был добрым.' },
  { id: 40, order: 40, title: 'Какие бывают дупла? — 74 слов(а)', wordCount: 74, sampleText: 'Каждое дупло — загадка. Бывают дупла-ночлежки для белок и дятлов. Бывают дупла-кладовые: белка прячет орехи, куница — мышь. Есть дупла-спальни, где всю зиму спит летучая мышь. Сколько дупел, столько загадок.' },
  { id: 41, order: 41, title: 'Ледяная королева — 74 слов(а)', wordCount: 74, sampleText: 'Жила сосулька и гордилась нарядом. Солнце заиграло в её платье. Сосулька отворачивалась, показывая то один бок, то другой. Капельки уносили клочки платья. Сосулька худела и вскоре исчезла. Солнце согрело крышу для воробьёв.' },
  { id: 42, order: 42, title: 'Осколок снаряда — 75 слов(а)', wordCount: 75, sampleText: 'Миша нашёл кусок железа. Папа объяснил, что это осколок снаряда. Здесь была война, погибло много солдат. Папа был ранен. Миша спросил, будет ли ещё война. Папа ответил: мы сделаем всё, чтобы её не было.' },
  { id: 43, order: 43, title: 'Гостиница для зёрен — 75 слов(а)', wordCount: 75, sampleText: 'Зерно хранят в элеваторах. Высокое здание без окон — гостиница для зёрен. Гостей взвешивают, поднимают на лифте, чистят, сушат тёплым воздухом. Чистое зерно ссыпают в башни. В элеваторе оно может храниться годами.' },
  { id: 44, order: 44, title: 'Рябка — 76 слов(а)', wordCount: 76, sampleText: 'Я жил на берегу моря и ловил рыбу. Собака Рябка стерегла дом. Мы с мальчиком работали вдвоём. Рябка понимала простые слова. Спросишь: где Володя? Она завиляет хвостом и покажет, куда он ушёл.' },
  { id: 45, order: 45, title: 'Теплинка — 76 слов(а)', wordCount: 76, sampleText: 'Мы с Витей пошли в лес. Взяли соль, яйца и хлеб. Набрали рыжиков. Вырыли ямку, положили яйца, засыпали землёй и развели теплинку — маленький костёр. Рыжики жарили на прутиках. Яйца упеклись, обед был вкусный.' },
  { id: 46, order: 46, title: 'Сказка в лесу — 78 слов(а)', wordCount: 78, sampleText: 'Андерсен гулял по лесу и вечером спрятал под каждым грибом подарок. Утром привёл дочку лесника. Девочка находила под грибами конфеты, ленточки, наперсток, яблоко. Один пряник пропал, наверное, его унесла ворона. Глаза девочки сияли.' },
  { id: 47, order: 47, title: 'Лебедь — 79 слов(а)', wordCount: 79, sampleText: 'Лебедь белый, как снег, с красивой шеей. Он прекрасен среди камышей. Ударом крыла может убить собаку. Лебеди легко становятся ручными. Летом они плавают в пруду, зимой живут в тёплом месте. Народ сложил о них песни.' },
  { id: 48, order: 48, title: 'Тигровая кошка — 79 слов(а)', wordCount: 79, sampleText: 'Я проснулся рано и помогал чистить картошку. Серёга спал на печи. Рядом урчала большая тигровая кошка. В решете дремали четыре котёнка. У Серёги не было игрушек, он тискал котят и гладил кошку. Она искрилась.' },
  { id: 49, order: 49, title: 'Лесной лакомка — 79 слов(а)', wordCount: 79, sampleText: 'Охотники услышали в тайге визг. Молодой медведь пытался достать мёд из дупла липы у скалы. Пчёлы жалили. Медведь сел, подумал и полез на вершину. Он надавил, дерево рухнуло. Теперь мёд был рядом, но выстрел спугнул его.' },
  { id: 50, order: 50, title: 'Ливень — 84 слов(а)', wordCount: 84, sampleText: 'Проливной дождь хлынул, как из ведра. Куры спрятались. Собачонка металась. Гуси будто не заметили дождя. Они щипали траву, слушали барабанящий дождь, пили из лужи и гоготали: какое удовольствие — хороший ливень!' },
  { id: 51, order: 51, title: 'Два товарища — 84 слов(а)', wordCount: 84, sampleText: 'По лесу шли два товарища. На них выскочил медведь. Один залез на дерево. Другой упал и притворился мёртвым. Медведь понюхал и ушёл. Первый слез и спросил, что сказал медведь. Тот ответил: что плохо бросать товарища в беде.' },
  { id: 52, order: 52, title: 'Первый снег — 85 слов(а)', wordCount: 85, sampleText: 'Падает мягкий снег. Он ложится на землю, крыши, деревья. В сумерках тихо. Утром всё бело. В лесу мохнатые ветви нависают над тропинкой. Дятел выбивает семена, синицы попискивают. Зимняя тишина прекрасна.' },
  { id: 53, order: 53, title: 'Кто сажает лес? — 85 слов(а)', wordCount: 85, sampleText: 'За рекой росли ёлки. Появились дубки. Откуда? Осенью я увидел, как сойка спрятала жёлуди под пень. Она забыла про клад, и дубки выросли. Так птица помогла лесу стать разнообразнее.' },
  { id: 54, order: 54, title: 'Помощник — 87 слов(а)', wordCount: 87, sampleText: 'Алёша хотел всем помочь, но всё портил: чашки разбил, лампочку менял и повис, картину вешал и разбил стекло. Мама назвала его руки каменными. Отец принёс инструменты: стамеску, напильник, сверло. Они вылечат руки трудом.' },
  { id: 55, order: 55, title: 'Праздник урожая — 88 слов(а)', wordCount: 88, sampleText: 'Осенью в деревне устроили праздник урожая. На столах яблоки, груши, овощи. Капуста, морковь, свёкла, огурцы, репка, редька, картофель. Каждый овощ взял от земли частицу её силы. Теперь запас на зиму готов.' },
  { id: 56, order: 56, title: 'Журавль — 95 слов(а)', wordCount: 95, sampleText: 'Весной радостно слышать крики журавлей. Они обещают тепло. Журавль высок на ногах, с большими крыльями и острым клювом. Гнездо вьёт на поле, кладёт два яйца. Молодых журавлят родители уводят в кусты. Охота на журавлей запрещена.' },
  { id: 57, order: 57, title: 'Отважный пингвинёнок — 97 слов(а)', wordCount: 97, sampleText: 'На скале стоял пингвинёнок. Он смотрел, как взрослые купаются. Ему было страшно. Наконец он решился и прыгнул в море. Ветер сносил его, он закрыл глаза и бросился вниз. Вынырнул, взобрался на камни и удивлённо посмотрел на море.' },
  { id: 58, order: 58, title: 'Услужливый — 100 слов(а)', wordCount: 100, sampleText: 'Лось лёг отдохнуть и попросил зайца разбудить через полчаса. Заяц принес сено, предлагал воды, хотел рассказать сказку. Лось не мог уснуть от усердия зайца, вскочил и ушёл. Бывает, что излишняя услужливость мешает.' },
  { id: 59, order: 59, title: 'Волк и белка — 100 слов(а)', wordCount: 100, sampleText: 'Белка упала на волка. Он хотел её съесть. Белка попросила отпустить и обещала объяснить, почему белки веселы. Волк отпустил. Белка забралась на дерево и сказала: тебе скучно, потому что ты зол. А мы добры и веселы.' },
  { id: 60, order: 60, title: 'В стране доброго волшебника — 102 слов(а)', wordCount: 102, sampleText: 'Человек шёл по зимнему лесу. Берёзки согнулись под снегом, не пройти. Он ударил палкой по веткам, освободил их от снега. Берёзки распрямились. Так он освобождал деревья одно за другим — настоящий добрый волшебник.' },
  { id: 61, order: 61, title: 'Озеро — 102 слов(а)', wordCount: 102, sampleText: 'Озеро заботилось о чистоте и прогнало ручейки. Оно радовалось, что вода не мутится. Но озеро стало мелеть. Оно хотело позвать ручейки, но воды не хватило, чтобы кликнуть друзей. Без друзей даже озеро пропадёт.' },
  { id: 62, order: 62, title: 'Яблоко — 112 слов(а)', wordCount: 112, sampleText: 'Старушка несла корзинку яблок. Я украл одно. Старушка позвала меня, назвала хорошим мальчиком и протянула самое большое яблоко. Яблоко в кармане жгло ногу. Я бросил его обратно и убежал. Дома заплакал и сам не понял почему.' },
  { id: 63, order: 63, title: 'Пушок — 114 слов(а)', wordCount: 114, sampleText: 'В доме у нас жил ручной ёжик. Когда его гладили, он прижимал колючки и становился совсем мягким. За это мы прозвали его Пушок. Если он хотел есть, то бегал за мной, пыхтел и кусал за ноги. Летом я брал Пушка гулять в сад. Он ловил лягушат, жуков, улиток и съедал их. Зимой мы держали его дома, кормили молоком, супом, мочёным хлебом. Насытившись, ёж забирался за печку и спал, а вечером бегал по комнатам.' },
  { id: 64, order: 64, title: 'Голос дождя — 116 слов(а)', wordCount: 116, sampleText: 'Дождь бил по стёклам, по жестяным подоконникам, по перилам балкона, журчал в трубе. Я сидел в полутёмной комнате, на коленях лежал белый кот. Он боялся грозы и при каждой вспышке молнии впивался когтями в мои ноги. Наконец дождь затих. Гроза ушла. Труба играла отбой. Я столкнул кота и подбежал к окну. По крышам скользнул солнечный луч. В небе появилась яркая бирюзовая полоса, и я не мог оторвать взгляд.' },
  { id: 65, order: 65, title: 'Страшный мостик — 116 слов(а)', wordCount: 116, sampleText: 'Через лесную дорожку перекинут мостик. Девочка Таня прошла и чуть не упала: одна доска оторвалась. Если наступить на край, другой поднимается и бьёт по ногам. Таня решила идти по другому краю. По мостику прошли Николка и Петя. Они тоже чуть не упали и рассердились. Ребята предупредили всех в посёлке: не ходите по этому мостику, можно ушибиться. Хорошо, что предупредили, только от одной доски мостик не стал лучше.' },
  { id: 66, order: 66, title: 'Разноцветные кораблики — 118 слов(а)', wordCount: 118, sampleText: 'На пруд прилетели разноцветные кораблики: жёлтые, красные, оранжевые. Они опускались на воду и плыли с поднятыми парусами. Запас таких корабликов ещё на деревьях вокруг пруда. Пока летят в основном кленовые. Они раньше других отправляются в путь и самые парусистые. Ветер напирает на их загнутые лопасти. Среди них есть такие нарядные, что просто прелесть. Целый отряд пунцовых корабликов плывёт от пышного клёна, который красуется на берегу.' },
  { id: 67, order: 67, title: 'На дне снежного моря — 120 слов(а)', wordCount: 120, sampleText: 'Малоснежная зима тяжела для зверьков. Земля промерзает и становится твёрдой. Но вот выпал пушистый снег и уже не тает. Сухое снежное море укрыло землю. Рябчики и тетерева ныряют под снег. Мыши-полевки бегают по дну снежного моря. Быстрая ласка охотится под снегом. Здесь теплее, чем на поверхности, не проникает леденящий ветер. Толстый слой снега защищает от морозов. Многие мыши строят зимние гнёзда прямо на земле под снегом, словно выезжают зимой на дачу.' },
  { id: 68, order: 68, title: 'Золотой луг — 121 слов(а)', wordCount: 121, sampleText: 'Перед нашим домом был луг, весь золотой от цветущих одуванчиков. Все восхищались красотой. Однажды утром я заметил, что луг зелёный. К полудню он снова стал золотым. Я нашёл одуванчик и увидел, что он сжал лепестки, будто мы сжали кулак с жёлтой ладонью. Утром, когда солнце встаёт, одуванчики раскрывают лепестки, и луг снова сияет. С тех пор этот цветок стал для нас самым интересным: одуванчики ложатся спать вместе с нами и просыпаются тоже с нами.' },
  { id: 69, order: 69, title: 'Сила слова — 128 слов(а)', wordCount: 128, sampleText: 'Путник шёл по дороге и наткнулся на огромный камень. Он закричал: камень, уйди с дороги! Камень не сдвинулся. Путник ругал его, но камень лежал. Подъехал всадник. Путник сказал: говорят, слово сильнее всего, а я целую гору слов наговорил, камень не двинулся. Всадник слез, обвязал камень верёвкой и попросил коня стащить его. Камень исчез с дороги. Путник обрадовался. Всадник ответил: слово всё-таки сильнее. Ты сказал мне, что камень мешает, и я его убрал. А слова на ветер не работают.' },
  { id: 70, order: 70, title: 'Весна красна — 130 слов(а)', wordCount: 130, sampleText: 'Зиме пришёл конец. Ветер подул с юга, пригнал тучи, пошёл первый весенний дождь. Потом солнце выглянуло и пригрело землю. Первыми весну отметили синицы: они перелетали с ветки на ветку, искали жучков и пели. Обрадовались теплу и зайцы. Зимой они кормились только ночью и спали в снегу, теперь бегают и днём. Белка покинула дупло, отправилась в чащу и строит новое гнездо. Скоро у неё будут бельчата. Весна красна пришла в лес.' },
  { id: 71, order: 71, title: 'Утро — 228 слов(а)', wordCount: 228, sampleText: 'Лучше всего смотреть, как рождается день. Первый луч солнца вспыхнул, ночь спряталась в ущелья и трещины. Вершины гор улыбнулись. Волны моря подняли белые головы, кланяются солнцу, как придворные красавицы королю. Они поют: привет вам, владыка мира! Доброе солнце смеётся: волны всю ночь играли, их зелёные одежды измяты. Солнце говорит: доброе утро, красавицы, только тише, детям надо купаться. Цветы, отягощённые росой, покачиваются и просят написать о их красоте. Они хитрые, знают, что нельзя словами описать утренние цветы, и смеются. Я снимаю шляпу, благодарю их за честь и говорю: у меня нет времени, день пришёл!' },
];

const QUESTIONS_BY_DIFFICULTY: Record<string, Question[]> = {
  'Зимой — 10 слов(а)': [
    {
      id: 'q1',
      prompt: 'Что делает зайка в тексте?',
      options: [
        { id: 'q1o1', text: 'Спит на санках', isCorrect: true },
        { id: 'q1o2', text: 'Катится с горки', isCorrect: false },
        { id: 'q1o3', text: 'Несёт санки домой', isCorrect: false }
      ]
    },
    {
      id: 'q2',
      prompt: 'Кому принадлежат санки?',
      options: [
        { id: 'q2o1', text: 'Зайке', isCorrect: false },
        { id: 'q2o2', text: 'Зине', isCorrect: true },
        { id: 'q2o3', text: 'Соседу', isCorrect: false }
      ]
    },
    {
      id: 'q3',
      prompt: 'Какое время года описано в тексте?',
      options: [
        { id: 'q3o1', text: 'Зима', isCorrect: true },
        { id: 'q3o2', text: 'Весна', isCorrect: false },
        { id: 'q3o3', text: 'Осень', isCorrect: false }
      ]
    }
  ]
};

const MIN_QUESTION_COUNT = 3;
const MAX_QUESTION_COUNT = 10;
const DISTRACTOR_WORDS = ['книжка', 'огурец', 'машина', 'зебра', 'фонарик', 'чайник', 'пальма', 'струна'];
const ALT_NAMES = ['Маша', 'Петя', 'Игорь', 'Света', 'Ваня', 'Таня', 'Гоша', 'Лена'];
const DEFAULT_ACTIONS = ['катается на санках', 'читает книгу', 'наблюдает за птицами', 'играет в мяч', 'гуляет по парку'];
const STOP_WORDS = new Set([
  'в', 'на', 'и', 'а', 'но', 'к', 'у', 'по', 'за', 'под', 'через', 'с', 'со', 'как', 'если', 'что',
  'это', 'этот', 'эта', 'эту', 'тот', 'там', 'тут', 'у', 'из', 'во', 'от', 'для', 'же'
]);

const randomFrom = <T,>(items: T[], fallback: T): T =>
  items.length > 0 ? items[Math.floor(Math.random() * items.length)] : fallback;

const ensureEnding = (sentence: string) => {
  const trimmed = sentence.trim();
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
};

const createOption = (id: string, text: string, isCorrect = false): QuestionOption => ({
  id,
  text: ensureEnding(text),
  isCorrect
});

const replaceNames = (sentence: string) => {
  const words = sentence.split(/\s+/);
  const replaced = words.map((word) => {
    const base = word.replace(/[«»"(),.?!;:]/g, '');
    if (!base) return word;
    if (/^[А-ЯЁ]/.test(base)) {
      const filtered = ALT_NAMES.filter((name) => name !== base);
      const replacement = randomFrom(filtered, ALT_NAMES[0]);
      return word.replace(base, replacement);
    }
    return word;
  });
  return replaced.join(' ');
};

const replaceKeyword = (sentence: string) => {
  const words = sentence.split(/\s+/);
  for (let i = 0; i < words.length; i++) {
    const bare = words[i].replace(/[«»"(),.?!;:]/g, '').toLowerCase();
    if (bare.length > 3 && !STOP_WORDS.has(bare)) {
      const replacement = randomFrom(DISTRACTOR_WORDS, DISTRACTOR_WORDS[0]);
      words[i] = replacement;
      return words.join(' ');
    }
  }
  return sentence;
};

const fallbackStatement = () =>
  `В тексте говорится, что ${randomFrom(ALT_NAMES, ALT_NAMES[0])} ${randomFrom(DEFAULT_ACTIONS, DEFAULT_ACTIONS[0])}.`;

const buildQuestionsFromText = (difficulty: Difficulty): Question[] => {
  const sentences =
    difficulty.sampleText
      .match(/[^.!?]+[.!?]*/g)
      ?.map((sentence) => sentence.trim())
      .filter((sentence) => sentence.length > 3) ?? [];

  if (!sentences.length) {
    return [];
  }

  const limit = Math.min(MAX_QUESTION_COUNT, Math.max(MIN_QUESTION_COUNT, sentences.length));
  const questions: Question[] = [];

  for (let i = 0; i < limit; i++) {
    const sentence = sentences[i % sentences.length];
    const correct = sentence;
    let optionB = replaceNames(sentence);
    if (optionB.trim() === correct.trim()) {
      optionB = fallbackStatement();
    }
    let optionC = replaceKeyword(sentence);
    if (optionC.trim() === correct.trim() || optionC.trim() === optionB.trim()) {
      optionC = fallbackStatement();
    }

    const options = [
      createOption(`${difficulty.id}-opt-${i}-a`, correct, true),
      createOption(`${difficulty.id}-opt-${i}-b`, optionB, false),
      createOption(`${difficulty.id}-opt-${i}-c`, optionC, false)
    ];

    questions.push({
      id: `${difficulty.id}-sense-${i}`,
      prompt: 'Выберите утверждение, которое соответствует тексту.',
      options
    });
  }

  return questions;
};

const resolveQuestionsForDifficulty = (difficulty: Difficulty) => {
  return QUESTIONS_BY_DIFFICULTY[difficulty.title] ?? buildQuestionsFromText(difficulty);
};

const FadingTextTrainer = () => {
  const navigate = useNavigate();
  const [speed, setSpeed] = useState<number>(2);
  const [activeDifficulty, setActiveDifficulty] = useState<Difficulty | null>(null);
  const [words, setWords] = useState<string[]>([]);
  const [hiddenCount, setHiddenCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, Set<string>>>({});
  const [score, setScore] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollAnimationRef = useRef<number | null>(null);

  const isReadingComplete = words.length > 0 && hiddenCount >= words.length;

  const handleBackClick = () => {
    navigate('/trainers/speed-reading');
  };

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseFloat(event.target.value));
  };

  const handleToggleQuestion = () => {
    if (!questions?.length) {
      return;
    }
    setShowQuestions(true);
  };

  const handleOptionToggle = (questionId: string, optionId: string) => {
    setSelectedOptions((prev) => {
      const current = new Set(prev[questionId] ?? []);
      if (current.has(optionId)) {
        current.delete(optionId);
      } else {
        current.add(optionId);
      }
      return { ...prev, [questionId]: current };
    });
  };

  const handleCheckAnswers = () => {
    if (!questions?.length) {
      return;
    }

    let correctCount = 0;

    questions.forEach((question) => {
      const correctIds = new Set(question.options.filter((option) => option.isCorrect).map((option) => option.id));
      const selected = selectedOptions[question.id] ?? new Set<string>();

      const correctArray = Array.from(correctIds);
      const selectedArray = Array.from(selected);

      const selectedMatchesCorrect =
        correctIds.size === selected.size &&
        correctArray.every((correctId) => selected.has(correctId)) &&
        selectedArray.every((selectedId) => correctIds.has(selectedId));

      if (selectedMatchesCorrect) {
        correctCount += 1;
      }
    });

    setScore(Math.round((correctCount / questions.length) * 100));
  };

  const splitIntoWords = (text: string) => text.trim().split(/\s+/);

  const beginDifficulty = (difficulty: Difficulty) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }

    setActiveDifficulty(difficulty);
    setWords(splitIntoWords(difficulty.sampleText));
    setHiddenCount(0);
    setIsRunning(true);
    setIsPaused(false);
    setIsModalOpen(true);
    setQuestions(resolveQuestionsForDifficulty(difficulty));
    setShowQuestions(false);
    setSelectedOptions({});
    setScore(null);
    requestAnimationFrame(() => {
      if (textContainerRef.current) {
        textContainerRef.current.scrollTo({ top: 0, behavior: 'auto' });
      }
    });
  };

  const handlePauseToggle = () => {
    if (!activeDifficulty) {
      return;
    }
    setIsPaused((prev) => !prev);
    setIsRunning(true);
    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }
  };

  const handleRestart = () => {
    if (!activeDifficulty) {
      return;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }
    setHiddenCount(0);
    setIsRunning(true);
    setIsPaused(false);
    setShowQuestions(false);
    setSelectedOptions({});
    setScore(null);
    requestAnimationFrame(() => {
      if (textContainerRef.current) {
        textContainerRef.current.scrollTo({ top: 0, behavior: 'auto' });
      }
    });
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
    return undefined;
  }, [isModalOpen]);

  useEffect(() => {
    if (!isRunning || isPaused || !words.length) {
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
        scrollAnimationRef.current = null;
      }
      return;
    }

    if (hiddenCount >= words.length) {
      setIsRunning(false);
      return;
    }

    timerRef.current = setTimeout(() => {
      setHiddenCount((prev) => prev + 1);
    }, speed * 1000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isRunning, isPaused, hiddenCount, speed, words.length]);

  const closeModal = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsModalOpen(false);
    setIsRunning(false);
    setIsPaused(false);
    setActiveDifficulty(null);
    setHiddenCount(0);
    setWords([]);
    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }
    setQuestions(null);
    setShowQuestions(false);
    setSelectedOptions({});
    setScore(null);
  };

  useEffect(() => {
    if (!textContainerRef.current) {
      return;
    }

    const container = textContainerRef.current;
    const scrollHeight = container.scrollHeight - container.clientHeight;

    if (scrollHeight <= 0) {
      return;
    }

    const currentScroll = container.scrollTop;
    const progress = words.length ? hiddenCount / words.length : 0;
    const offset = container.clientHeight * 0.2;
    const rawTarget = Math.max(0, scrollHeight * progress - offset);
    const maxStep = container.clientHeight * 0.45;
    const targetScroll =
      rawTarget > currentScroll + maxStep ? currentScroll + maxStep : rawTarget;

    if (targetScroll <= currentScroll) {
      return;
    }

    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current);
    }

    const distance = targetScroll - currentScroll;
    const duration = Math.max(140, Math.min(speed * 1000 * 0.55, 520));
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      container.scrollTop = currentScroll + distance * t;

      if (t < 1) {
        scrollAnimationRef.current = requestAnimationFrame(animate);
      } else {
        scrollAnimationRef.current = null;
      }
    };

    scrollAnimationRef.current = requestAnimationFrame(animate);
  }, [hiddenCount, words.length, speed]);

  return (
    <section className={styles.trainerSection}>
      <div className={styles.trainerContainer}>
        <div className={styles.headerSection}>
          <button className={styles.backButton} onClick={handleBackClick}>
            ← К выбору тренажера
          </button>
          <div className={styles.titleSection}>
            <h2 className={styles.trainerTitle}>Тренажер «Исчезающий текст»</h2>
            <p className={styles.trainerSubtitle}>
              Ребёнок должен успеть прочитать фразу до того, как она исчезнет. Укрепляет внимательность и ускоряет восприятие текста.
            </p>
          </div>
        </div>

        <div className={styles.speedControl}>
          <label htmlFor="speed-slider" className={styles.speedLabel}>
            Скорость исчезновения: <span className={styles.speedValue}>{speed.toFixed(1)} сек.</span>
          </label>
          <input
            id="speed-slider"
            type="range"
            min={0.2}
            max={4}
            step={0.1}
            value={speed}
            onChange={handleSpeedChange}
            className={styles.speedSlider}
          />
          <div className={styles.speedScale}>
            <span>0.2</span>
            <span>2.0</span>
            <span>4.0</span>
          </div>
        </div>

        <div className={styles.difficultyList}>
          {DIFFICULTIES.map((difficulty) => (
            <article key={difficulty.id} className={styles.difficultyCard}>
              <div className={styles.difficultyHeading}>
                <h3>{difficulty.title}</h3>
                <span>{difficulty.wordCount} слов(а)</span>
              </div>
              <p className={styles.difficultySample} title={difficulty.sampleText}>
                {difficulty.sampleText}
              </p>
              <div className={styles.difficultyActions}>
                <button
                  type="button"
                  className={styles.startButton}
                  onClick={() => beginDifficulty(difficulty)}
                >
                  Запустить тренажер
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {isModalOpen && activeDifficulty && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div className={styles.modal}>
            <header className={styles.modalHeader}>
              <div>
                <span className={styles.trainerBadge}>Выбранный уровень</span>
                <h2>{activeDifficulty.title}</h2>
                <p className={styles.modalMeta}>
                  {activeDifficulty.wordCount} слов(а) • скорость {speed.toFixed(1)} сек.
                </p>
              </div>
              <button type="button" className={styles.modalClose} onClick={closeModal} aria-label="Закрыть тренировку">
                ×
              </button>
            </header>

            <div className={styles.modalSpeed}>
              <label htmlFor="modal-speed-slider">
                Скорость исчезновения: <span>{speed.toFixed(1)} сек.</span>
              </label>
              <input
                id="modal-speed-slider"
                type="range"
                min={0.2}
                max={4}
                step={0.1}
                value={speed}
                onChange={handleSpeedChange}
              />
              <div className={styles.speedScale}>
                <span>0.2</span>
                <span>2.0</span>
                <span>4.0</span>
              </div>
            </div>

            <div className={styles.trainerText} ref={textContainerRef}>
              {words.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className={`${styles.trainerWord} ${index < hiddenCount ? styles.trainerWordHidden : ''}`}
                >
                  {word}
                </span>
              ))}
            </div>

            <footer className={styles.trainerControls}>
              <button type="button" className={styles.controlButton} onClick={handlePauseToggle}>
                {isPaused ? 'Продолжить' : 'Пауза'}
              </button>
              <button type="button" className={styles.controlButtonSecondary} onClick={handleRestart}>
                Сначала
              </button>
              {isReadingComplete && questions?.length && (
                <button type="button" className={styles.controlButtonSecondary} onClick={handleToggleQuestion}>
                  Вопросы
                </button>
              )}
            </footer>
          </div>
        </div>
      )}

      {showQuestions && questions?.length && (
        <div className={styles.questionsOverlay} role="dialog" aria-modal="true">
          <div className={styles.questionsModal}>
            <header className={styles.questionsHeader}>
              <h3 className={styles.questionsTitle}>Проверь себя</h3>
              <button
                type="button"
                className={styles.questionsClose}
                onClick={() => {
                  setShowQuestions(false);
                  setSelectedOptions({});
                  setScore(null);
                }}
                aria-label="Закрыть вопросы"
              >
                ×
              </button>
            </header>
            <p className={styles.questionsHint}>
              Отметьте правильные ответы и нажмите «Проверить ответы», чтобы узнать результат.
            </p>
            <div className={styles.questionsList}>
              {questions.map((question) => (
                <article key={question.id} className={styles.questionCard}>
                  <h4>{question.prompt}</h4>
                  <ul>
                    {question.options.map((option) => {
                      const checked = selectedOptions[question.id]?.has(option.id) ?? false;
                      return (
                        <li key={option.id}>
                          <label>
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => handleOptionToggle(question.id, option.id)}
                            />
                            <span>{option.text}</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </article>
              ))}
            </div>
            <footer className={styles.questionsActions}>
              <button type="button" className={styles.controlButton} onClick={handleCheckAnswers}>
                Проверить ответы
              </button>
              {score !== null && <span className={styles.questionsScore}>Верно: {score}%</span>}
            </footer>
          </div>
        </div>
      )}
    </section>
  );
};

export default FadingTextTrainer;

