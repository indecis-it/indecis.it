# indecis.it

_I programmi elettorali delle elezioni politiche del 25 settembre 2022 a portata di click._

Il sito è sviluppato in Next.js. Nella repository sono presenti le configurazioni essenziali per lo [sviluppo locale](#--sei-una-sviluppatrice-una-esperta-di-uiux-una-designer-una-qa-ecc-).



---

## L'idea

### Perché?

Un'amica mi ha chiesto: "Ma cosa dovrei votare io il 25 Settembre? Come faccio a decidere?". Indecis.it prova a dare una risposta a queste domande.

### Come?

Il sito permette di navigare in maniera semplice e intuitiva diverse categorie (ad es., servizi pubblici generali, difesa, salute, ecc..) per confrontare le intenzioni delle liste rispetto a diverse tematiche.

Ogni tema può assumere uno di questi stati:

- <img src="public/endorsement/green.svg" alt="green" style="height:20px;width:20px;"/> la lista si è espressa a supporto del tema
- <img src="public/endorsement/red.svg" alt="red" style="height:20px;width:20px;"/> la lista si è espressa in opposizione al tema
- <img src="public/endorsement/yellow.svg" alt="yellow" style="height:20px;width:20px;"/> la lista esprime una posizione né favorevole né contraria (neutra)
- <img src="public/endorsement/grey.svg" alt="grey" style="height:20px;width:20px;"/> il tema non è presente nelle fonti a nostra disposizione

## Le cose importanti

In questa sezione ci occupiamo di alcuni aspetti importanti legati al progetto. Ossia, i dati e come poter contribuire.

### I dati

- provengono da diverse fonti (principalmente programmi elettorali). Le trovi elencate in [sources](https://github.com/indecis-it/data/blob/main/data/sources.csv); 
- sono stati raccolti senza procedure automatizzate su un [Google Sheet](https://docs.google.com/spreadsheets/d/13YKVLtayxu0m2keOi1KHsLJqoshc9P279RLJ_sdhnAk/edit#gid=734919268);
- sono esportati tramite una [GitHub Action](https://github.com/indecis-it/data/blob/main/.github/workflows/download.yml) che scarica e converte i fogli del [Google Sheet](https://docs.google.com/spreadsheets/d/13YKVLtayxu0m2keOi1KHsLJqoshc9P279RLJ_sdhnAk/edit#gid=734919268). Trovi il codice in [data repository](https://github.com/indecis-it/data/)

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
- suggerire un modo per colmare [alcune carenze del progetto](#cosa-manca)

Puoi farlo commentando direttamente sul Goole Sheet.

Verifica i commenti già presenti, perché c'è la possiblità che tu possa dare una mano per i lavori in corso.

#### 💻 ... sei una sviluppatrice (una esperta di UI/UX, una designer, una QA, ecc... )

Se trovi dei bug o degli aspetti che possono essere migliorati, puoi vedere [qui](https://github.com/indecis-it/indecis.it/issues?q=is%3Aissue+is%3Aopen+label%3Abug) se qualcun'altra se n'è già accorta.
Altrimenti [apri una Issue](https://github.com/indecis-it/indecis.it/issues/new?assignees=&labels=community%2C+bug&template=bug-report.md&title=).

Se trovi dei `bug` o `enhancement` che ritieni interessanti e vuoi contribuire allo sviluppo,
per prima cosa clona la repository:

```bash
git clone git@github.com:indecis-it/indecis.it.git
```

Poi, nel terminale, puoi eseguire questi comandi:

```bash
npm install

npm run dev
```

Accedi alla versione locale tramite: [http://localhost:3000](http://localhost:3000).

Poi crea un nuovo `branch` e apri una `Pull request` (taggando @angelogulina).

Puoi imparare di più su `Next.js` visitando questi siti:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

Buona contribuzione 🎉

## Cosa manca?

### La realizzazione di un programma

indecis.it non aiuta a capire come ogni lista ha intenzione di realizzare il suo programma.  I programmi elettorali
non sono una guida sufficiente per prendere decisioni, servono a orientarsi. La loro lettura è un buon primo passo.

Ogni programma presenta delle dichiarazioni di intenti, non sempre dei piani concreti. La fattibilità di queste intenzioni dipende
da tanti fattori. Ad esempio, per implementare l'assegno unico universale è necessario che si trovino risorse finanziarie. I programmi elettorali
molto spesso non spiegano come queste risorse saranno trovate. Di conseguenza, indecis.it non presenta questa informazione.

### La coerenza di un programma

indecis.it non individua possibili incongruenze nei programmi elettorali. Prendiamo di nuovo l'esempio dell'assegno unico universale.
Il programma di una lista potrebbe proporre questo e insieme la riduzione delle tasse. Le due iniziative non sono per forza incoerenti.
Tuttavia, una lista che si impegni a supportarle entrambe si troverebbe nella posizione di dover spiegare
come pensa di trovare maggiori risorse finanziare (assegno unico) per mentre decide di reperirne di meno (taglio delle tasse).

## Il team

- [Chiara Adornetto](https://twitter.com/chiadornetto)
- [Dennis Angemi](https://twitter.com/DennisAngemi)
- [Moreno Colaiacovo](https://twitter.com/emmecola)
- [Angelo Gulina](https://twitter.com/angelogulina)
- [Vittorio Nicoletta](https://twitter.com/vi__enne)
- [Lorenzo Ruffino](https://twitter.com/Ruffino_Lorenzo)


## License
<a href="https://unlicense.org/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/PD-icon-black.svg/392px-PD-icon-black.svg.png?20170218184554" alt="Unlicense logo" width="40"/></a>
