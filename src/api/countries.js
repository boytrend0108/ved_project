
 const countriesJSON = 
  {"1":"Афганистан","2":"Албания","3":"Алжир","4":"Самоа","5":"Андорра","6":"Ангола","7":"Ангилья ","8":"Антигуа и Барбуда","9":"Аргентина ","10":"Армения ","11":"Аруба","12":"Австралия ","13":"Австрия ","14":"Азербайджан","15":" Бахрейн","16":"Бангладеш","17":"Барбадос","18":"Белоруссия","19":"Бельгия","21":" Бенин","22":"Бермуды ","23":"Бутан","24":"Боливия","25":"Босния и Герцеговина","26":"Ботсвана ","27":"Бразилия ","28":"Бруней","29":"Болгария","30":"Буркина-Фасо","31":"Бирма (Мьянма)","32":"Бурунди","33":"Камбоджа","34":"Камерун ","35":"Канада","36":"Канарские острова","37":"Кабо-Верде","38":"Центральноафриканская Республика","39":"Чад","40":"Чили","41":"Китай","42":"Колумбия","43":"Коморы","44":"Конго","45":"Коста-Рика ","46":"Хорватия","47":"Куба","48":"Кипр","49":"Чехия","50":"Дания","51":"Джибути","52":"Доминика","53":"Доминиканская Республика","54":"Эквадор","55":"Египет ","56":"Сальвадор","57":"Экваториальная Гвинея","58":"Эритрея","59":"Эстония","60":"Эфиопия","61":"Фолклендские острова","62":"Фиджи","63":"Финляндия","64":"Франция","65":"Французская Гвиана","66":"Французская Полинезия","67":"Габон","68":"Грузия","69":"Германия","70":"Гана","71":"Гибралтар","72":"Греция","73":"Гренландия","74":"Гренада","75":"Гваделупа","76":"Гуам","77":"Гватемала","78":"Гвинея","79":"Гвинея-Бисау","80":"Гайана","81":"Гаити","83":"Гондурас","84":"Венгрия","85":"Исландия","86":"Индия","87":"Индонезия","88":"Иран","89":"Ирак","90":"Ирландия","91":"Израиль","92":"Италия","93":"Кот-д’Ивуар","94":"Ямайка","95":"Япония","96":"Джонстон (атолл)","97":"Иордания","98":"Турецкая Республика Северного Кипра","99":"Казахстан","100":"Кения","101":"Французские Южные и Антарктические Территории","102":"Кирибати","103":"Кувейт","104":"Кыргызстан","105":"Лаос","106":"Латвия","107":"Ливан","108":"Лесото","109":"Либерия","110":"Ливия","111":"Литва","112":"Люксембург","113":"Республика Македония","114":"Мадагаскар","115":"Малави","116":"Малайзия","117":"Мальдивы","118":"Мали","119":"Мальта","120":"Маршалловы Острова","121":"Мартиника","122":"Мавритания","123":"Маврикий","124":"Мексика","125":"Федеративные Штаты Микронезии","126":"Мидуэй","127":"Молдавия","128":"Монако","129":"Монголия","130":"Монтсеррат","131":"Марокко","132":"Мозамбик","133":"Намибия","134":"Непал","135":"Нидерланды","136":"Нидерландские Антильские острова","137":"Новая Каледония","138":"Новая Зеландия","139":"Никарагуа","140":"Нигер","141":"Нигерия","142":"Корейская Народно-Демократическая Республика","143":"Северная Ирландия","144":"Северные Марианские острова","145":"Норвегия","146":"Оман","147":"Пакистан","148":"Палау","149":"Пальмира","150":"Панама","151":"Папуа — Новая Гвинея","152":"Парагвай","153":"Перу","154":"Филиппины","155":"Польша","156":"Португалия","157":"Пуэрто-Рико","158":"Катар","159":"Реюньон","160":"Румыния","161":"Российская Федерация","162":"Руанда","163":"Остров Святой Елены","164":"Сент-Винсент и Гренадины","165":"Сан-Марино","166":"Саудовская Аравия","168":"Сенегал","169":"Сейшельские Острова","170":"Сьерра-Леоне","171":"Сингапур","172":"Словакия","173":"Словения","174":"Соломоновы Острова","175":"Сомали","176":"Южно-Африканская Республика","177":"Южная Георгия и Южные Сандвичевы острова","178":"Республика Корея","179":"Испания","180":"Шри-Ланка","181":"Сент-Китс и Невис","182":"Сент-Люсия","183":"Сен-Пьер и Микелон","184":"Судан","185":"Суринам","186":"Свазиленд","187":"Швеция","188":"Швейцария","189":"Сирия","190":"Тайвань","191":"Таджикистан","192":"Танзания","193":"Таиланд","194":"Багамские Острова","195":"Гамбия","196":"Того","197":"Тонга","198":"Тринидад и Тобаго","199":"Тунис","200":"Турция","201":"Туркмения","202":"Теркс и Кайкос","203":"Объединённые Арабские Эмираты","204":"Великобритания","205":"США","206":"Уганда","207":"Украина","208":"Уругвай","209":"Узбекистан","210":"Вануату","211":"Венесуэла","212":"Вьетнам","213":"Уэйк","214":"Уэльс","215":"Самоа","216":"Йемен","218":"Демократическая Республика Конго","219":"Замбия","220":"Зимбабве","222":"Лихтенштейн","223":"Каймановы острова","224":"Остров Рождества","226":"Косово","227":"Макао","228":"Майотта","229":"Черногория","230":"Ниуэ","231":"Палестина","232":"Сен-Мартен","233":"Сан-Томе и Принсипи","234":"Сербия","235":"Шпицберген и Ян-Майен","236":"Восточный Тимор","237":"Тувалу","238":"Виргинские острова Америка","239":"Виргинские острова","240":"Уоллис и Футуна","241":"Белиз","242":"Науру"}
 
const countries = Object.values(countriesJSON)


export default countries

