var texts = {
    DATES: {
        en: "24-28 July 2019",
        pl: "24-28 Lipca 2019"
    },
    EMAIL_TOOLTIP: {
        en: "Email",
        pl: "Email"
    },
    REGISTRATION: {
        en: "Registration",
        pl: "Rejestracja"
    },
    CANCEL: {
        en: `cancel`,
        pl: `rezygnacja`
    },
    CANCEL_DETAILS: {
        en: `<h4>We are sorry you are here :(</h4>
            <p>
                But if you really have to cancel your registration, we understand
            </p>`,
        pl: `<h4>Przykro nam że tu zaglądasz :(</h4>
            <p>
                Ale jeśli na prawdę musisz, zrozumiemy
            </p>`
    },
    PAYMENT_ONSITE_PERMIT: {
        en: `You have permition to pay in cash onsite`,
        pl: `Otrzymałeś pozwolenie na płatność na miejscu gotówką`
    },
    PAYMENT_INFO: {
        en: `Payment info`,
        pl: `Płatności`
    },
    PAYMENT_WAITING: {
        en: `We are waiting now for your transfer`,
        pl: `Czekamy na twój przelew`
    },
    PAYMENT_RECEIVED: {
        en: `We received your payment - now we are waiting for You`,
        pl: `Otrzymaliśmy Twoją wpłatę - teraz czekamy na Ciebie`
    },
    PAYMENT_DETAILS: {
        en: `
        <h2>Payment info</h2>
        <p>
            Your ticket number is: <b> {{payment_id}}</b><br><br>
            So your transfer title should be: <b>"ticket {{payment_id}}"</b><br>
            You can pay for more then one ticket with one transfer,
            just get the ticket numbers from your friends and put them all separated with coma, like: "tickets 345,677,898"<br><br>

            Transfer amount per person should be: <br>
            <b>50EUR / 200PLN</b> for all days (full ticket)<br>
            <b>25EUR / 100PLN</b> for last two days (weekend ticket)<br><br>

            Warsztaty Kultury w Lublinie<br>
            Ul. Grodzka 5a, 20-112 Lublin<br>
            IBAN: PL 38 1240 1503 1111 0010 5772 9238 (Bank Pekao S.A.)<br>
            Kod BIC: PKOPPLPW<br><br>

            <b>Any problems or questions related to payments ???</b><br>
            <p>please contact us on: <a href="mailto:registration@urbanhighline.pl">registration@urbanhighline.pl</a></p>
        </p>`,
        pl: `<h2>Płatności</h2>
        <p>
            Twój numer biletu to: <b> {{payment_id}}</b><br><br>
            Tytuł przelewu powinien zawierać: <b>"ticket {{payment_id}}"</b><br>
            możesz zapłacić za wielu uczestników jednym przelewem,
            zdobądź numery biletów twoich znajomych i podaj je odzielone przecinkami, np: "tickets 345,677,898"<br><br>

            Kwota przelewu: <br>
            <b>50EUR / 200PLN</b> za wszystkie dni (full ticket)<br>
            <b>25EUR / 100PLN</b> za dwa ostatnie dni (weekend ticket)<br><br>

            Warsztaty Kultury w Lublinie<br>
            Ul. Grodzka 5a, 20-112 Lublin<br>
            IBAN: PL 38 1240 1503 1111 0010 5772 9238 (Bank Pekao S.A.)<br>
            Kod BIC: PKOPPLPW<br><br>

            <b>Masz problem lub pytanie związane z płatnościami ???</b><br>
            <p>napisz na: <a href="mailto:registration@urbanhighline.pl">registration@urbanhighline.pl</a></p>
        </p>`
    },
    START_SUCCESS: {
        en: `

        <h2>Great!</h2>
        <h2>Now check your email inbox</h2>
        <h2>And follow the instructions to continue</h2>
        <br>
        <br>
`,
        pl: `
        <h2>Super!</h2>
        <h2>Teraz sprawdź swoją pocztę</h2>
        <h2>Wysłaliśmy Ci link z dalszymi instrukcjami</h2>
        <br>
        <br>
`
    },
    YOUR_DATA: {
        en: `Your data`,
        pl: `Twoje dane`
    },
    MOBILE_HELP: {
        en: `phone number starting with your country code: like "+48 000 000 000"`,
        pl: `Twój nr komórkowy, przyda się w razie nagłego wypadku`
    },
    SOCIAL_MEDIA_HELP: {
        en: `your profile link (facebook, instagram etc.)`,
        pl: `link do twojego profilu na facebooku czy instagramie, tp`
    },
    START_REGISTRATION: {
        en: `Start Registration`,
        pl: `Rozpocznij Rejestrację`
    },
    START_REG_INFO: {
        en: `Type your email and get registration link`,
        pl: `Podaj swój email i zdobądź link do rejestracji`
    },
    AGREEMENTS: {
        en: `Agreements`,
        pl: `Zgody`
    },
    AGREE_EMAIL: {
        en: `agree to recive emails related to festival`,
        pl: `zgadzam się na otrzymywanie emaili powiązanych z festiwalem`
    },
    AGREE_REGULATIONS: {
        en: `agree to <a target="_blank" href="http://urbanhighline.pl/uhf-2018/files/regulations/"> regulations</a>`,
        pl: `akceptuję <a target="_blank" href="http://urbanhighline.pl/uhf2018/pliki/regulamin/">regulamin</a>`
    },
    AGREE_DECLARATION: {
        en: `agree to <a target="_blank" href="http://urbanhighline.pl/uhf-2018/files/declaration/">participant declaration</a>`,
        pl: `akceptuję <a target="_blank" href="http://urbanhighline.pl/uhf2018/pliki/oswiadczenie/">oświadczenie uczestnika</a>`
    },
    PARENTAL_INFO: {
        en: `I have <a target="_blank" href="http://urbanhighline.pl/uhf-2018/files/parental-consent/">parental consent</a>`,
        pl: `posiadam <a target="_blank" href="http://urbanhighline.pl/uhf2018/pliki/zgoda-opiekuna/ ">zgodę opiekuna</a>`
    },
    UNDER18_INFO: {
        en: `Remember you are under 18 yers old, you have to have printed and signed <a target="_blank" href="http://urbanhighline.pl/uhf-2018/files/parental-consent/">parental consent</a>`,
        pl: `Pamiętaj że jeśli jesteś niepełnoletni, musisz przynieść wydrukowaną i podpisaną <a target="_blank" href="http://urbanhighline.pl/uhf2018/pliki/zgoda-opiekuna/ ">zgodę opiekuna</a>`
    },
    RODO: {
        en: `We inform you that the Controller of the personal data of UHF’s Participants are Workshops of Culture in Lublin.
		The personal data of the Participants will be processed for the organization of the artistic event, for statistical purposes and for archiving (evidential ) purposes for securing information in case a legal need arises to demonstrate facts, which is a legitimate interest of Workshops of Culture (pursuant to art 6 sec 1 let f of the General Data Protection Regulation of 27 April 2016 further referred to as GDPR).
		More information on the processing of personal data of the Participants can be found in <a target="_blank" href="http://urbanhighline.pl/uhf-2018/files/regulations/"> UHF Regulations </a>in a chapter entitled “The Personal Data of the Participants”
        `,
        pl: `Informujemy, że Administratorem (The controller) danych osobowych Uczestników UHF są Warsztaty Kultury w Lublinie.
        Dane osobowe Uczestników będą przetwarzane w celu organizacji wydarzenia artystycznego, w celach statystycznych oraz w celach archiwalnych (dowodowych) dla zabezpieczenia informacji na wypadek prawnej potrzeby wykazania faktów, co jest prawnie uzasadnionym interesem Warsztatów Kultury (podstawa z art 6 ust 1 lit f RODO).
        Więcej informacji na temat przetwarzania danych osobowych Uczestników znajduje się w <a target="_blank" href="http://urbanhighline.pl/uhf2018/pliki/regulamin/">Regulaminie UHF </a>w rozdziale pod tytułem Dane osobowe Uczestników.
        `
    },
    LANGUAGE: {
        en: `Language`,
        pl: `Język`
    },
    EDIT_INFO: {
        en: `If you already registered, you will receive a link to manage submitted data `,
        pl: `Jeśli już się rejestrowałeś, wyślemi Ci link do edycji twoich danych`
    },
    PRICE_INFO: {
        en: `5 days of the festival (1 day of workshops, 4 days of highlines)<br>
        Ticket price: <br>
        <b>50EUR / 200PLN</b> for all days (full ticket)<br>
        <b>25EUR / 100PLN</b> for last two days (weekend ticket)<br><br>
        Free t-shirt for all tickets if you register until 15th`,
        pl: `5 dni festiwalu (1 dzień warsztatów, 4 dni z taśmami highline)<br>
        Cena biletu:<br>
        <b>50EUR / 200PLN</b> za wszystkie dni (full ticket)<br>
        <b>25EUR / 100PLN</b> za dwa ostatnie dni (weekend ticket)<br><br>

        Koszulka gratis jeśli zarejestrujesz się przed 15 lipca`
    },
}

function tr(name, item) {
    if(!item || !item.language) {
        item = {language: 'en'}
    }
    if (!texts[name]) {
        return name;
    }
    if (!texts[name][item.language]) {
        return name + ':' + item.language;
    }
    var str = texts[name][item.language];
    for (var key in item) {
        if (item.hasOwnProperty(key)) {
            const value = item[key];
            str = str.replace(new RegExp('{{' + key + '}}', 'g'), value);
        }
    }
    return str;
}
