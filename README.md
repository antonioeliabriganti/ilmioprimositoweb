# Il Mio Sito Web Personale

Questo è un sito web personale moderno e responsive che include sezioni per foto, un showcase di Minecraft e informazioni di contatto.

## Struttura del Sito

Il sito è composto da quattro sezioni principali:
1. **Home** - La pagina di benvenuto
2. **Le Mie Foto** - Una griglia per mostrare le tue foto personali
3. **Minecraft** - Una sezione dedicata alle tue creazioni in Minecraft
4. **Contatti** - I tuoi contatti e social media

## Come Personalizzare il Sito

### Aggiungere le Tue Foto
1. Crea una cartella `images` nel progetto
2. Aggiungi le tue foto nella cartella
3. Nel file `index.html`, cerca la sezione con id "foto"
4. Sostituisci i placeholder con le tue immagini usando questo formato:
```html
<div class="photo-grid">
    <img src="images/tua-foto.jpg" alt="Descrizione della foto">
</div>
```

### Personalizzare la Sezione Minecraft
1. Aggiungi screenshot o immagini delle tue creazioni in Minecraft nella cartella `images`
2. Modifica la sezione con id "minecraft" in `index.html`
3. Aggiungi descrizioni delle tue costruzioni e avventure

### Aggiungere i Tuoi Contatti
1. Trova la sezione con id "contatti" in `index.html`
2. Modifica il testo dei contatti con le tue informazioni
3. Puoi aggiungere o rimuovere social media modificando gli elementi con classe "contact-item"

## Caratteristiche Tecniche
- Design responsive che si adatta a tutti i dispositivi
- Menu hamburger per dispositivi mobili
- Animazioni fluide e moderne
- Navigazione smooth scroll
- Ottimizzato per le prestazioni

## Come Visualizzare il Sito
1. Apri il file `index.html` nel tuo browser
2. Per una migliore esperienza, usa un server web locale

## Suggerimenti per la Personalizzazione
- Modifica i colori nel file `styles.css` per adattarli ai tuoi gusti
- Aggiungi nuove sezioni copiando la struttura delle sezioni esistenti
- Personalizza le animazioni modificando le keyframes nel file CSS
- Aggiungi nuove funzionalità JavaScript nel file `script.js`

## Supporto Browser
Il sito è compatibile con tutti i browser moderni:
- Chrome
- Firefox
- Safari
- Edge 