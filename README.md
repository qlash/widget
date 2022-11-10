# 🚀 Medistore product widget

## Użycie na stronie html

1. Aby uruchomić widget na stronie importujemy plik js:

```
<script src="https://unpkg.com/medistore-widget/dist/medicover-widget.js" defer>
```

2. w miejscu, gdzie ma pojawić się widget dodajemy element:

```
<div data-medicover="{url_key}"></div>
```

url-key można pobrac z linka strony, np. 
- dla https://www.medistore.com.pl/p/internista/ tekst po /p/ "internista" to url_key dla produktu Internista.
- dla https://www.medistore.com.pl/p/usg-ciazy/ url_key to "usg-ciazy"

## Stylowanie

Widget ma zaimplementowane podstawowe style css (glownie ustawienia flex), oraz podstawową responsywność (flex-wrap).

Kazdy element widgetu ma nadana klasę css, można go dodatkowo ostylować.

## Dodatkowe opcje

Istnieje mozliwosc konfiguracji kazdego widetu na stronie:

```
<div data-medicover="{url_key}" data-{opcja}="{wartosc}"></div>
```

Dostepne opcje:

|data-{opcja}|type|domyslna wartosc|opis|
|---|---|---|---|
|data-medicover|string|*wartość wymagana*|url-key produktu|
|data-store|string|"default"(1)|wybrany storecode np. default/synevo|
|data-language|pl/en|"pl"|jezyk widgetu|
|data-cta|string|"Kup teraz"|tekst, ktory pojawi się na przycisku CTA|
|data-image|bool|true|pokaz/ukryj zdjęcie|
|data-description|bool|true|pokaz/ukryj opis|
|data-price|bool|true|pokaz/ukryj cene|

(1) "default" odnosi się do medistore.com.pl


np. żeby wyświetlić widget dla produktu internista bez miniaturki:
```
<div data-medicover="internista" data-image="false"></div>
```

## Renderowanie

Po załadowaniu pliku js każdy poprawnie skonfigurowany element html z url-key w data-medicover uzupełni danymi produktu.

Istnieje możliwość uruchomienia ładowania widgetu na elementach html załadowanych później (np lazy-load), służy do tego metoda:

```
window.medistoreWidget.render()
```

## Playground

[Medistore demo page](https://playcode.io/1005933)
