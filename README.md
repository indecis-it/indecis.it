# indecs.it

_I programmi elettorali delle elezioni politiche del 25 settembre 2022 a portata di click._

Il sito è sviluppato in Next.js. Nella repository sono presenti le configurazioni essenziali per lo [sviluppo locale](#-sei-una-sviluppatrice).



---

## L'idea

### Perché?

Un'amica mi ha chiesto: "Ma cosa dovrei votare io il 25 Settembre? Come faccio a decidere?". Indecis.it è la soluzione a questo problema.

### Come?

Il sito permette di navigare in maniera semplice e intuitiva diverse categorie (ad es., servizi pubblici generali, difesa, salute, ecc..) per confrontare le intenzioni delle liste di partiti rispetto a diverse tematiche.

Ogni tema puo assumere uno di questi stati:

- <img src="public/endorsement/green.svg" alt="green" style="height:20px;width:20px;"/>: la lista si è espressa a favore del tema
- <img src="public/endorsement/red.svg" alt="green" style="height:20px;width:20px;"/>: la lista **non** si è espressa a favore del tema
- <img src="public/endorsement/yellow.svg" alt="green" style="height:20px;width:20px;"/>: il tema non è presente in alcuna comunicazione ufficiali della lista

### Cosa manca?

## Le cose importanti

### I dati

- I dati sono raccolti da diverse fonti elencate in [sources](https://docs.google.com/spreadsheets/d/13YKVLtayxu0m2keOi1KHsLJqoshc9P279RLJ_sdhnAk/edit#gid=118291356))
- I dati sono esportati tramite [data repository](https://github.com/indecis-it/data/)

### Come contribuire se...

#### ... sei appassionata di politica

Per prima cosa, apri questo [Google Sheet](https://docs.google.com/spreadsheets/d/13YKVLtayxu0m2keOi1KHsLJqoshc9P279RLJ_sdhnAk/edit#gid=734919268) e leggi come è composto.
Se hai qualche dubbio, qualcosa non è chiaro, apri subito una Issue qui e inoltraci la tua richiesta.

#### ... sei una sviluppatrice

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

Puoi imparare di più su Next.js visitando questi siti:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
