using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using VendingMachine.Data;
using VendingMachine.Models;

namespace vending_machine.Pages_Products
{
    [IgnoreAntiforgeryToken(Order = 1001)]
    public class PurchaseModel : PageModel
    {
        private readonly VendingMachine.Data.ProductContext _context;

        public PurchaseModel(VendingMachine.Data.ProductContext context)
        {
            _context = context;
        }

        [BindProperty]
        public Product Product { get; set; } = default!;

        // List for POST requests with a single int.
        public IActionResult OnPost(int productId)
        {   
            // Grab the product from the db.
            Product? product = _context.Product.Find(productId);
            // If we successfully grab the product, decrement the quantity and save the new value in the db.
            if (product != null) {
                product.Quantity -= 1;
                if (product.Quantity < 0) {
                    product.Quantity = 0;
                }
                _context.SaveChangesAsync();
                return new JsonResult(product.Name);
            }
            // TODO better error result here.
            return new JsonResult("False");
        }

        private bool ProductExists(int id)
        {
            return _context.Product.Any(e => e.Id == id);
        }
    }
}
