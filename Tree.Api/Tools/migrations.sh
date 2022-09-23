cd .. || exit

dotnet ef migrations add "init"
dotnet ef database update "init"