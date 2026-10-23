# Dokumentacja Vintal

Publiczna dokumentacja projektów: [vintal-ai.github.io/docs](https://vintal-ai.github.io/docs/).

Strona korzysta z motywu [Just the Docs](https://just-the-docs.github.io/just-the-docs/). Pliki Markdown są budowane przez Jekyll i publikowane na GitHub Pages.

## Aktualizacja dokumentów

1. Otwórz wybrany dokument na stronie i użyj odsyłacza „Edytuj tę stronę na GitHubie”.
2. Wprowadź zmianę w pliku Markdown, zachowując nagłówek konfiguracyjny pomiędzy `---`.
3. Zapisz zmianę w `main` lub przygotuj pull request do przeglądu. Po połączeniu zmiany z `main` publikacja uruchamia się automatycznie.
4. Sprawdź wynik w zakładce Actions i odczytaj opublikowaną stronę.

## Dodawanie dokumentów

Dodaj plik w katalogu projektu, z polami `layout`, `title`, `parent` i `permalink`. Nadaj mu jednoznaczny status oraz dodaj widoczny odsyłacz z nadrzędnego dokumentu. Do publicznego repozytorium trafiają wyłącznie materiały przeznaczone do publicznego udostępnienia.

## Budowanie i publikacja

Workflow `.github/workflows/pages.yml` instaluje zależności z `Gemfile.lock`, buduje stronę i publikuje ją na GitHub Pages. Źródło Pages w ustawieniach repozytorium musi być ustawione na GitHub Actions.

Przed budowaniem strony workflow generuje PDF planu kreatora artykułów z tego samego pliku Markdown. Skrypt `scripts/build_pdf.py` korzysta z ReportLab i czcionek DejaVu Sans na Linuxie lub Arial na macOS; inne ścieżki TTF można przekazać przez `DOCS_FONT_REGULAR` i `DOCS_FONT_BOLD`. Zależność jest przypięta w `scripts/requirements-pdf.txt`. PDF w `assets/pdf/` jest wynikiem generowania, a treść edytujemy w pliku planu. Zmiana nazw głównych sekcji wymaga aktualizacji mapowania w skrypcie. Plan kreatora jest dostępny pod `/article-creator/plan/`, a jego źródło znajduje się w `article-creator/plan.md`. Dawny adres `/social-posts-manager/seo-i-tresci/` przekierowuje na nowy i nie pojawia się w menu ani wynikach wyszukiwania. Adres PDF pozostaje bez zmian.

Weryfikacja lokalna może korzystać z kontenera Ruby 3.3: instalacja zależności poleceniem `bundle install`, następnie `bundle exec jekyll build --trace`. Podgląd to `bundle exec jekyll serve --host 0.0.0.0`; skonfigurowany prefiks adresu wynosi `/docs`. Instalowanie Ruby na komputerze nie jest wymagane.

## Następne kroki

Reguły SEO artykułu, akceptacje i zakres jednego wdrożenia należy uzgodnić z zespołem przed oznaczeniem szczegółów jako zatwierdzonych.
