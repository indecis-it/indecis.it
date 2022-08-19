# indecs.it

_I programmi elettorali delle elezioni politiche del 25 settembre 2022 a portata di click._

Il sito è sviluppato in Next.js. Nella repository sono presenti le configurazioni essenziali per lo [sviluppo locale](#--sei-una-sviluppatrice-una-esperta-di-uiux-una-designer-una-qa-ecc-).



---

## L'idea

### Perché?

Un'amica mi ha chiesto: "Ma cosa dovrei votare io il 25 Settembre? Come faccio a decidere?". Indecis.it è la soluzione a questo problema.

### Come?

Il sito permette di navigare in maniera semplice e intuitiva diverse categorie (ad es., servizi pubblici generali, difesa, salute, ecc..) per confrontare le intenzioni delle liste di partiti rispetto a diverse tematiche.

Ogni tema puo assumere uno di questi stati:

- <img src="public/endorsement/green.svg" alt="green" style="height:20px;width:20px;"/> la lista si è espressa a favore del tema
- <img src="public/endorsement/red.svg" alt="green" style="height:20px;width:20px;"/> la lista **non** si è espressa a favore del tema
- <img src="public/endorsement/yellow.svg" alt="green" style="height:20px;width:20px;"/> il tema non è presente nelle fonti a nostra disposizione

## Le cose importanti

In questa sezioni ci occupiamo di alcuni aspetti importanti legati al progetto. Ossia, i dati e come poter contribuire.

### I dati

- I dati sono raccolti da diverse fonti (principalmente programmi elettorali). Le trovi elencate in [sources](https://docs.google.com/spreadsheets/d/13YKVLtayxu0m2keOi1KHsLJqoshc9P279RLJ_sdhnAk/edit#gid=118291356)
- I dati sono esportati tramite. Trovi il codice in [data repository](https://github.com/indecis-it/data/)

### Come contribuire se...

#### 📝 ... sei appassionata di politica

Per prima cosa, apri questo [Google Sheet](https://docs.google.com/spreadsheets/d/13YKVLtayxu0m2keOi1KHsLJqoshc9P279RLJ_sdhnAk/edit#gid=734919268) e leggi come è composto (_README_).
Se hai qualche dubbio, qualcosa non è chiaro, guardare [la lista delle Issue già aperte](https://github.com/indecis-it/indecis.it/issues?q=is%3Aissue+is%3Aopen+label%3Acommunity)
e verifica che un'altra persona non abbia già espresso lo stesso dubbio. Se è così, puoi [aprire una Issue](https://github.com/indecis-it/indecis.it/issues/new?assignees=&labels=community%2C+question&template=google-sheet-generic-question.md&title=%5BSHEET%5D%3A+Vorrei+fare+una+domanda+a+proposito+di...)
e inoltraci la tua richiesta.

Se è tutto chiaro, ma vuoi proporre delle modifiche, ad es.

- aggiungere o modificare una `category` o un `item`
- migliorare la descrizione di `category` o un `item`
- suggerire una nuova fonte che possa colmare le conoscenze mancanti

Puoi farlo commentando direttamente sul Goole Sheet.

Verifica i commenti già presenti, perché c'è la possiblità che tu possa dare una mano per i lavori in corso.

#### 💻 ... sei una sviluppatrice (una esperta di UI/UX, una designer, una QA, ecc... )

Se trovi dei bug o degli aspetti che possono essere migliorati, puoi vedere [qui](https://github.com/indecis-it/indecis.it/issues?q=is%3Aissue+is%3Aopen+label%3Abug) se qualcun'altra se n'è già accorta.
Altrimenti [apri una Issue](https://github.com/indecis-it/indecis.it/issues/new?assignees=&labels=community%2C+bug&template=bug-report.md&title=).

Per prima cosa clona la repository:

```bash
git clone git@github.com:indecis-it/indecis.it.git
```

Poi, nel terminale, puoi eseguire questi comandi:

```bash
npm install

npm run dev
```

Accedi alla versione tramite: [http://localhost:3000](http://localhost:3000).

Puoi imparare di più su `Next.js` visitando questi siti:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


## Cosa manca?

_tda_

## Il team

- [Chiara Adornetto](https://twitter.com/chiadornetto)
- [Dennis Angemi](https://twitter.com/DennisAngemi)
- [Angelo Gulina](https://twitter.com/angelogulina)
- [Vittorio Nicoletta](https://twitter.com/vi__enne)
- [Lorenzo Ruffino](https://twitter.com/Ruffino_Lorenzo)


## License
<a href="https://unlicense.org/"><img src="https://commons.wikimedia.org/wiki/File:PD-icon-black.svg" width="80"/></a>
