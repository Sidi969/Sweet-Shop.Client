using Microsoft.EntityFrameworkCore;
using Sweet.API.Models;

namespace Sweet.API.Data
{
    public class SweetDbContext : DbContext
    {
        public SweetDbContext(DbContextOptions<SweetDbContext> options) : base(options) { }

        public DbSet<Sweet> Sweets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed data - produkte fillestare
            modelBuilder.Entity<Sweet>().HasData(
                new Sweet { Id = 1, Name = "Çokollatë Milka", Description = "Çokollatë qumështi me shije të butë", Category = "Çokollatë", Price = 2.50m, Stock = 100, ImageUrl = "", CreatedAt = DateTime.UtcNow },
                new Sweet { Id = 2, Name = "Karamele Haribo", Description = "Karamele frutash me ngjyra", Category = "Karamele", Price = 1.80m, Stock = 200, ImageUrl = "", CreatedAt = DateTime.UtcNow },
                new Sweet { Id = 3, Name = "Kek me Vanilje", Description = "Kek i freskët me krem vanilje", Category = "Kek", Price = 3.20m, Stock = 50, ImageUrl = "", CreatedAt = DateTime.UtcNow }
            );
        }
    }
}
