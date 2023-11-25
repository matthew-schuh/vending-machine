#Vending Machine Application

Initially I had planned on writing both a "Vanilla" JS/jQuery version with a PHP endpoint and MySQL database.
I decided instead to dive right in to the Razor Pages version and learn that starting from 0. So the Razor folder is a working version of the app and Vanilla is non-working with a few placeholder files.

## Things I would change/add:
1. Make it mobile friendly. I used a bit of bootstrap here but didn't really flesh out a true mobile feel. The payment panel would fall below the vending machine section on small screens, which isn't really user friendly. Since I'm only running this on desktop, I decided against making it fully responsive.
2. Better looking UI. It's just black and white right now. It could look so much better.
3. I decided to make this function like a vending machine. Select one product, pay for it, and the payment is accepted as soon as you meet/exceed the cost of the product. Because this is on a webpage it could have a few QoL improvements, such as: Select quantities of each product (or allow change in selection at least), allow payment in more forms, including card, completely hide out-of-stock items (if nothing is in stock, display a special message).
4. Add validation to the back end. If multiple people had this open, you could easily get a products quantity below zero on one instance, but it wouldn't be reflected on the second instance. Because of that, the second instance could still "purchase" that product. It should return an error at the very least. Again, I assumed this runs like a regular vending machine where there is only one "user" at a time.
5. Add max name size, limit quantity to non-negative integers, limit price to non-negative two-digit decimals.
6. Add a return money button (like a real machine has a button to return your money without completing a purchase).
7. If a purchase fails, there should be a nice error message explaining why.
8. Add a random chance for a product to get stuck, or for the user to get multiples of a product. Not really though. But it would be fun to simulate a real vending machine. Maybe even add a "bang on it" button with a random chance to get a random product.
9. Technically you can "remote" manage it/restock it/remove products/add new products from the "products/edit" "products/delete" and "products/create" endpoints. They're just the autogenned endpoints and aren't manually styled in any way.
10. Add a "remaining" status text or change the "paid" text to instead show remaining.
11. Real time update instead of reloading the window after a purchase (success or failure).
12. Change the method for notifying the user of purchase success/failure. Alert is pretty basic and unstyled. We could instead go to a new page, or swap out the HTML using JS/jQuery.