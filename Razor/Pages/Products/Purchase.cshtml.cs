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

        public IActionResult OnGet() {
            return new JsonResult("test");
        }
        
        public IActionResult OnPost(int productId)
        {   
            Product? product = _context.Product.Find(productId);
            if (product != null) {
                return new JsonResult(product.Name);
            }
            return new JsonResult("False");
        }

        private bool ProductExists(int id)
        {
            return _context.Product.Any(e => e.Id == id);
        }
    }
}
