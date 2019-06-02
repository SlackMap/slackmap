
export const texts = {
    ONSITE_PERMIT_EMAIL_SUBJECT: {
        en: 'Payment information',
        pl: 'Informacja o płatności'
    },
    ONSITE_PERMIT_EMAIL_HTML: {
        en: `Your request for cash onsite payment has been approved.<br>
        Price will remain as for online payment: 200PLN or 50EUR.<br><br>

        See you in Lublin<Br>
        UHF Team`,
        pl: `Twoja prośba o płatność gotówką na miejscu została zaakceptowana.<br>
        Cena zostaje taka sama jak przy płatności online: 200PLN or 50EUR.<Br><br>

        Do zobaczenia w Lublinie<Br>
        UHF Team`
    },
    ONLINE_PAYMENT_EMAIL_SUBJECT: {
        en: 'Payment information',
        pl: 'Informacja o płatności'
    },
    ONLINE_PAYMENT_EMAIL_HTML: {
        en: `We are happy to confir your payment.<br>
        Payment amount: {{payment_online}}.<br><br>

        See you in Lublin<Br>
        UHF Team`,
        pl: `Cieszymy się że dostaliśmy Twoją płatność.<br>
        Zaksięgowana kwota: {{payment_online}}.<Br><br>

        Do zobaczenia w Lublinie<Br>
        UHF Team`
    },
    REGISTER_EMAIL_SUBJECT: {
        en: 'Registration',
        pl: 'Rejestracja'
    },
    REGISTER_EMAIL_SUCCESS: {
        en: 'Registration started, check your inbox for more instructions',
        pl: 'Rejestracja rozpoczęta, sprawdź swoją pocztę i podążaj za instrukcjami'
    },
    REGISTER_EMAIL_HTML: {
        en: `
        <h2>Hi!</h2>
        <p>Follow this link to start the registration:
            <a href="https://test.slackmap.com/uhf/edit.html?hash={{hash}}">https://test.slackmap.com/uhf/edit.html?hash={{hash}}</a>
        </p>

        Peace!
        `,
        pl: `
        <h2>Cześć!</h2>
        <p>Pod tym linkiem możesz rozpocząć rejestrację:
            <a href="https://test.slackmap.com/uhf/edit.html?hash={{hash}}">https://test.slackmap.com/uhf/edit.html?hash={{hash}}</a>
        </p>

        Dozo!
        `
    },
    EDIT_EMAIL_SUBJECT: {
        en: 'Registration - edit link',
        pl: 'Rejestracja - link do edycji'
    },
    EDIT_EMAIL_SUSCCESS: {
        en: 'Registration - edit link',
        pl: 'Rejestracja - link do edycji'
    },
    EDIT_EMAIL_HTML: {
        en: `
        <h2>Hi!</h2>
        <p>Mange your subscription with this link:
            <a href="https://test.slackmap.com/uhf/edit.html?hash={{hash}}">https://test.slackmap.com/uhf/edit.html?hash={{hash}}</a>
        </p>

        Peace!
        `,
        pl: `
        <h2>Cześć!</h2>
        <p>Tu możesz edytować swoje dane:
            <a href="https://test.slackmap.com/uhf/edit.html?hash={{hash}}">https://test.slackmap.com/uhf/edit.html?hash={{hash}}</a>
        </p>

        Dozo!
        `
    },
    PAYMENT_INFO_EMAIL_SUBJECT: {
        en: 'Payment',
        pl: 'Płatności'
    },
    DELETE_EMAIL_SUCCESS: {
        en: 'Your registration was canceled, all your data was deleted',
        pl: 'Twoje zgłoszenie zostało anulowane, wszystkie Twoje dane zostały usunięte'
    },
    DELETE_EMAIL_TITLE: {
        en: 'Registration canceled',
        pl: 'Rejestracja została anulowana'
    },
    PAYMENT_INFO_EMAIL_HTML: {
        en: `
                <h2>{{firstname}}, we are waiting for your payment</h2>
                <p>
                    Your ticket number is: <b>{{payment_id}}</b> <br>
                    (transfer title should have this number)
                    <br><br>
                    you can find payment details here:<br>
                    <a href="https://test.slackmap.com/uhf/edit.html?hash={{hash}}">https://test.slackmap.com/uhf/edit.html?hash={{hash}}</a>
                </p>
                <p>
                    See you in Lublin!<br>
                    UHF Team
                </p>

            `,
        pl: `
                <h2>{{firstname}}, czekamy na Twoją płatność</h2>
                <p>
                    numer twojego biletu to: <b>{{payment_id}}</b><br>
                    tutuł przelewu powinien go zwierać<br><br>
                    Dane do przelewu znajdziesz tu:
                    <a href="https://test.slackmap.com/uhf/edit.html?hash={{hash}}">https://test.slackmap.com/uhf/edit.html?hash={{hash}}</a>
                </p>
                <p>
                    Do zobaczenia w Lublinie!<br>
                    UHF Team
                </p>
        `
    },
    "": {
        en: "",
        pl: ""
    }
}
