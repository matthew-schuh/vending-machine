using Microsoft.EntityFrameworkCore;
using VendingMachine.Data;

namespace VendingMachine.Models;

// Seed database with initial data (if none present)
public static class SeedData {
    public static void Initialize(IServiceProvider serviceProvider) {
        using (var context = new ProductContext(
            serviceProvider.GetRequiredService<
                DbContextOptions<ProductContext>>())) {
            if (context == null || context.Product == null) {
                throw new ArgumentNullException("Null ProductContext");
            }

            // Look for any products. If there are some in the database we don't want to seed it.
            if (context.Product.Any()) {
                return;   // DB has been seeded
            }

            // Create initial db data.
            context.Product.AddRange(
                new Product {
                    Name = "Twox",
                    Price = 1.25M,
                    Quantity = 20
                },
                new Product {
                    Name = "Ressees",
                    Price = 1.50M,
                    Quantity = 4
                },
                new Product {
                    Name = "Kat Kit",
                    Price = 1.25M,
                    Quantity = 12
                },
                new Product {
                    Name = "10 Grand",
                    Price = 2.00M,
                    Quantity = 18
                },
                new Product {
                    Name = "Cheez Ot",
                    Price = 3.00M,
                    Quantity = 2
                },
                new Product {
                    Name = "Stands Sour Cream and Onion",
                    Price = 2.75M,
                    Quantity = 0
                },
                new Product {
                    Name = "Stands Original",
                    Price = 2.50M,
                    Quantity = 10
                },
                new Product {
                    Name = "Dorifings Nacho",
                    Price = 4.00M,
                    Quantity = 14
                },
                new Product {
                    Name = "Dorifings Cool American",
                    Price = 3.75M,
                    Quantity = 12
                },
                new Product {
                    Name = "Fritus Original",
                    Price = 2.25M,
                    Quantity = 3
                },
                new Product {
                    Name = "Water",
                    Price = 1.00M,
                    Quantity = 15
                },
                new Product {
                    Name = "Soda",
                    Price = 2.50M,
                    Quantity = 20
                },
                new Product {
                    Name = "Juice",
                    Price = 2.50M,
                    Quantity = 18
                }
            );
            context.SaveChanges();
        }
    }
}