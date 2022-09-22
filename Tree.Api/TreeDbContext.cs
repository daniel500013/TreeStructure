using Microsoft.EntityFrameworkCore;

namespace Tree.Api
{
    public class TreeDbContext : DbContext
    {
        public TreeDbContext(DbContextOptions<TreeDbContext> options) : base(options)
        {

        }

        public DbSet<Model.Tree> Tree { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            new TreeConfiguration(modelBuilder).Seed();
        }
    }
}
