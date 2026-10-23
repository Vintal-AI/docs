---
layout: default
title: Wymagania SEO artykułów
parent: Kreator artykułów
nav_order: 2
permalink: /article-creator/wymagania-seo/
---

# Wymagania SEO artykułów

**Materiał wymagań przekazany 23 października 2026; podział wykonawczy do uzgodnienia.**

[Wytyczne SEO dla artykułu – moduł treści Magmari](https://docs.google.com/document/d/1U1hkE25TFvALh2xwARdsiMCv_KL9iTgKuDqPzSH4O_0/edit?tab=t.0) są podstawą doprecyzowania pracy agentów i walidatora. Dostęp do źródła zależy od jego ustawień w Google Docs. Powiązany [plan MVP]({{ '/article-creator/plan/' | relative_url }}) opisuje aktualną ofertę.

Wytyczne obejmują zarówno jakość pojedynczego artykułu, jak i analizę całej witryny oraz pracę po publikacji. Kontrole artykułu doprecyzowują kreator. Integracje GSC, płatne dane wyszukiwania, indeks witryny i monitoring wymagają osobnej decyzji o włączeniu do zakresu i kosztach.

## Jak wykorzystamy wymagania

| Odpowiedzialność | Zadanie |
| --- | --- |
| Przygotowanie materiałów | Brief, intencja, potwierdzone fakty, prawdziwe pytania klientów, wyróżniki marki i dostępne zdjęcia przed pisaniem |
| Agent piszący | Tekst odpowiadający na pytanie, oparty na materiałach; bez wymyślonych testów, cytatów, norm i doświadczeń |
| Walidator w kodzie | Nagłówki, długości, kompletność metadanych, linki, parametry obrazów i poprawność danych wyjściowych |
| Agenci recenzji i SEO | Pokrycie tematu, poparcie twierdzeń, naturalność, powtórzenia, sens FAQ i propozycje poprawek |
| Redaktor i osoba merytoryczna | Potwierdzenie faktów i autorstwa, rozstrzygnięcie uwag oraz akceptacja konkretnej wersji |

Progi i listy fraz będą edytowalne przez uprawnioną osobę z SEO lub redakcji, z zapisem autora i daty zmiany. Raport wskaże wersję zasad, miejsce problemu i działanie: blokadę generowania, blokadę akceptacji albo ostrzeżenie. Brak danych do sprawdzenia jest osobnym wynikiem, a nie zaliczoną kontrolą.

## Co doprecyzowuje kreator

Artykuł ma mieć jasną strukturę, lead, poprawne nagłówki, prawdziwe dane autora i FAQ oparte na rzeczywistych pytaniach. Potrzebne są odwołania twierdzeń do materiałów w panelu, kontrola pustych sformułowań, kontekstowe linki oraz obrazy z opisami. Nie publikujemy prywatnych materiałów źródłowych razem z tekstem.

Wytyczne wymagają co najmniej dwóch elementów własnej wiedzy przed generowaniem. To reguła redakcyjna do potwierdzenia dla poszczególnych typów treści, także krótkich haseł. Nie oznacza dwóch losowych załączników. Długość poza zakresem i cechy szablonowego stylu mają dawać ostrzeżenia. Twarde blokady wskazane w źródle zachowujemy w projekcie reguł; ich wyjątki i wartości zatwierdza zespół SEO.

Wymóg zdjęć i sekcji autora doprecyzowuje wcześniejszą opcjonalność ilustracji. Liczbę obrazów, źródła zdjęć i dane autorów należy uzgodnić przed odbiorem. Gotowy HTML i metadane przygotowuje kreator; ich poprawne umieszczenie w sklepie zależy od szablonu i uzgodnionej integracji Magmari.

## Co wymaga szerszego zakresu

| Obszar | Zależność |
| --- | --- |
| Duplikaty i podobne tematy | Indeks treści witryny, import lub crawl, odświeżanie i kalibracja wyszukiwania semantycznego; decyzja redaktora |
| Analiza TOP 5 lub TOP 10 | Usługa danych wyników wyszukiwania, odczyt stron, obsługa braków i koszt; podstawa porównania musi być jawna |
| GSC, wolumeny i pytania z wyszukiwarki | Dostęp do danych oraz wybrana usługa; brak danych nie może być zastąpiony wymyślonym wynikiem AI |
| Technika sklepu | Autorzy, JSON-LD, canonical, hreflang, OG, sitemap, warianty obrazów i wydajność szablonu |
| Praca po publikacji | Propozycje linków z istniejących stron, zadania redakcyjne i kontrola osieroconych stron po 30 dniach |

Te elementy są zapisanymi wymaganiami do uzgodnienia, a nie automatycznie dodanymi funkcjami MVP. Analizę TOP wyników można początkowo dostarczać w briefie, a listę stron i linków przez SEO. Taki wariant ogranicza automatyzację; nie jest wykonaniem pełnego procesu z dokumentu źródłowego.

## Reguły redakcyjne i zasady Google

Wymagania są w dużej części standardową praktyką redakcyjną i techniczną. Limity znaków, częstotliwość linków, mediana TOP wyników ±30% oraz próg podobieństwa są ustawieniami procesu. Google nie określa preferowanej liczby słów ani stałych limitów długości title i meta description. Zobacz [wskazówki o pomocnych treściach](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [tytułach](https://developers.google.com/search/docs/appearance/title-link) i [opisach](https://developers.google.com/search/docs/appearance/snippet).

Nie obiecujemy wykazania, że danej informacji nie ma w żadnym z TOP wyników. Agent może wskazać różnice w pobranej próbce i udokumentowaną wiedzę marki. Wartość dla odbiorcy ocenia redaktor.

Google dopuszcza użycie AI, ale masowa produkcja stron bez wartości może naruszać zasady antyspamowe. Własne źródła i redakcja pomagają tworzyć użyteczne treści; nie gwarantują indeksacji ani pozycji. Nie potrzebujemy funkcji obchodzenia detektorów AI. Zobacz [wytyczne o treściach AI](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content) i [scaled content abuse](https://developers.google.com/search/docs/essentials/spam-policies#scaled-content).

Automatyczne zgłaszanie zwykłych artykułów do indeksacji Google wymaga korekty założenia: [URL Inspection API odczytuje status](https://developers.google.com/webmaster-tools/v1/urlInspection.index/inspect), a [Indexing API](https://developers.google.com/search/apis/indexing-api/v3/using-api) ma ograniczone zastosowania, które nie obejmują zwykłego bloga. Sitemap i ręczna prośba w GSC nie gwarantują indeksacji. IndexNow jest osobną integracją.

Informacja w źródle o wycofaniu wyników rozszerzonych FAQ od 7 maja 2026 jest zgodna z [aktualizacją Google](https://developers.google.com/search/updates#may-2026). FAQ może być przydatne czytelnikowi; nie uzasadniamy go obietnicą wyniku rozszerzonego ani cytowania przez AI.

## Ustalenia przed implementacją

1. Potwierdzić profil reguł, blokady i wyjątki dla poradnika, porównania oraz krótkiego hasła.
2. Dostarczyć fakty i wyróżniki marki, tone of voice, prawdziwe FAQ, autorów oraz zdjęcia.
3. Wybrać zakres danych: materiały dostarczone przez SEO czy automatyczny indeks, GSC i analiza wyników wyszukiwania.
4. Sprawdzić możliwości sklepu i podział odpowiedzialności za szablon, metadane oraz publikację.
5. Uzgodnić dobre i błędne przykłady do odbioru, budżet zewnętrznych danych oraz pracę po publikacji.
