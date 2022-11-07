# 🚀 Medicover widget

Użycie na stronie html, importujemy plik js:

```
<script src="..." defer>
```

i dodajemy tag:

```
<div data-medicover="{id}" data-{options}></div>
```

Widget ma zaimplementowane podstawowe style css (glownie ustawienia flex).

Dostepne opcje:

|data-*|type|opis|
|---|---|---|
|medicover|string|wartość wymagana, url-key produktu|
|store|string|wybrany storecode np. default/synevo|
|language|pl/en|jezyk widgetu|
|cta|string|tekst, ktory pojawi się na przycisku CTA, domyślnie 'Kup teraz'|
|image|bool|pokaz/ukryj zdjęcie|
|description|bool|pokaz/ukryj opis|
|price|bool|pokaz/ukryj cene|
