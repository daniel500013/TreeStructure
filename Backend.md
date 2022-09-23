# Backend
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
