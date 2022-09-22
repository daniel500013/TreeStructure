using Microsoft.EntityFrameworkCore;

namespace Tree.Api
{
    internal class TreeConfiguration
    {
        private readonly ModelBuilder modelBuilder;

        public TreeConfiguration(ModelBuilder modelBuilder)
        {
            this.modelBuilder = modelBuilder;
        }

        public void Seed()
        {
            modelBuilder.Entity<Model.Tree>().HasData
            (
                new Model.Tree()
                {
                    TreeID = 1,
                    Name = "",
                    ParentID = 1
                },
                new Model.Tree()
                {
                    TreeID = 2,
                    Name = "Root",
                    ParentID = 1
                },
                new Model.Tree()
                {
                    TreeID = 3,
                    Name = "Dokumenty",
                    ParentID = 2
                },
                new Model.Tree()
                {
                    TreeID = 4,
                    Name = "Wideo",
                    ParentID = 2
                },
                new Model.Tree()
                {
                    TreeID = 5,
                    Name = "Obrazki",
                    ParentID = 2
                },
                new Model.Tree()
                {
                    TreeID = 6,
                    Name = "Moje zdjęcia",
                    ParentID = 5
                }
            );
        }
    }
}