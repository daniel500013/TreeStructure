# Backend
Aplikacja powinna działać pod adresem https://localhost:7052
<br/>
Jeżeli adres się różni od podanego powyżej zmień port inaczej aplikacja może działać niepoprawnie
## Wymagania
`` SQL Server >2016``
<br />
``.NET Core 6``
# Baza danych
### Konfiguracja
Aby nie wystąpił błąd przy połączeniu z bazą danych należy podmienić adres ip potrzebny do połączenia z bazą w pliku ``appsettings.json`` przy linij ``9``
### Dodawanie (Sposób 1)
Aby dodać baze z migracij użyj polecenia update-database w menadżerze pakietów lub 
#### Przykład
> PM> update-database

### Dodawanie (Sposób 2)
Aby dodać baze z migracij użyć gotowego skryptu w folderze Tools i uruchomić go w konsoli komendą
> ./migrations.sh

Uwaga
Do wykorzystania skryptu wymagane jest CLI i zainstalowanie pakirtu `dotnet tool install --global dotnet-ef`

# Uruchomienie (Sposób 1)
Aby uruchomić aplikacje należy włączyć projekt za pomocą visual studio 2022 a następnie kliknąć u góry zielony przycisk który pozwoli uruchomić program.
# Uruchomienie (Sposób 2)
Aby uruchomić aplikacje należy wejść do folderu z aplikacją (Tree.Api) a następnie wpisać w konsoli komende dotnet run (Wymagane dotnet cli)


