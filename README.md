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

|data-*|type|domyslnie|opis|
|---|---|---|---|
|medicover|string|*wartość wymagana|url-key produktu|
|store|string|default|wybrany storecode np. default/synevo|
|language|pl/en|pl|jezyk widgetu|
|cta|string|'Kup teraz'|tekst, ktory pojawi się na przycisku CTA|
|image|bool|true|pokaz/ukryj zdjęcie|
|description|bool|true|pokaz/ukryj opis|
|price|bool|true|pokaz/ukryj cene|
