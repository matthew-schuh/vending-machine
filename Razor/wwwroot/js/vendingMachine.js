const PAYMENT_URL = '/Products/Purchase';
// Currently selected item's ID. All IDs are greater than 0.
let currentSelection = -1;
// Total amount due for this purchase.
let totalDue;
// Currently paid amount for this purchase.
let currentPaymentAmount = 0;
// jQuery objects used for setting status text of the current purchase.
let $productSelection, $productCost, $currentPaymentAmount;

// Once the DOM is ready, we can assign values to the above jQuery objects.
document.addEventListener('DOMContentLoaded', () => {
    $productSelection = $('#product-selection');
    $productCost = $('#product-cost');
    $currentPaymentAmount = $('#current-payment-amount');
}, false);

// Add 25 cents to the currently paid amount.
function addQuarter() {
    incrementPayment(0.25);
}

// Add 1 dollar to the currently paid amount.
function addDollar() {
    incrementPayment(1);
}

// Add 5 dollars to the currently paid amount.
function addFiveDollars() {
    incrementPayment(5);
}

// Increment the currently paid amount by the given value.
function incrementPayment(amount) {
    // Note these buttons should be disabled until a selection has been made,
    // however just in case we should only accept payment when a product has been selected.
    if (currentSelection >= 0) {
        // Add the paid value to the total paid amount so far.
        currentPaymentAmount += amount;
        // Update the status text.
        $currentPaymentAmount.text("Paid: $" + currentPaymentAmount.toFixed(2));
        // If the amount paid meets or exceeds the necessary amount to pay, submit the payment.
        if (currentPaymentAmount >= totalDue) {
            submitPayment(currentPaymentAmount, totalDue);
        }
    }
}

// Select a product to purchase.
function selectProduct(itemId, itemPrice, itemName) {
    currentSelection = itemId;
    totalDue = itemPrice;
    // Completely disable the product selection buttons by setting them to disabled and unsetting their onclick function.
    $('.product-select-button').attr('onclick', null).prop('disabled', true);
    // Enable the payment buttons to allow the user to pay for their product.
    $('.payment-button').prop('disabled', false);
    // Update the status text for product selection and amount due.
    $productSelection.text("Selection: " + itemName);
    $productCost.text("Price: $" + itemPrice.toFixed(2));
}

// Submit a payment to the server for processing.
function submitPayment(amountPaid, amountDue) {
    // Completely disable the payment buttons by setting them to disabled and unsetting their onclick function.
    $('.payment-button').attr('onclick', null).prop('disabled', true);
    // Calculate the amount of change to be dispensed.
    const changeDue = amountPaid - amountDue;
    // Send an AJAX request to the backend to process the payment.
    $.ajax({
        url: PAYMENT_URL + '/' + currentSelection,
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        success: (result) => {
            // If the payment is successful, notify the user that they can grab their item and, if applicable, change, and dispense the change.
            dispenseChange(changeDue);
            alert(`Your purchase was successful. Please grab your item` + (changeDue > 0 ? ` and your change in the amount of ${'$' + changeDue.toFixed(2)} (${changeDue / 0.25} Quarters)` : '') + `.`);
            // Refresh the window to allow for another purchase.
            window.location.reload();
        },
        error: (error) => {
            console.log(error);
            // Notify the user that there was an error with their purchase, and return their money. We should use a better message here.
            // We just use the dispenseChange function to return their money. Not ideal because it dispenses quarters, but the machine
            // doesn't have a method to return anything other than quarters.
            dispenseChange(amountPaid);
            alert(`I'm sorry, there was an error with your purchase. Please try again. Your money has been returned.`);
            // Refresh the window to allow for another purchase.
            window.location.reload();
        }
    });
}

// Dispense the customer's change. Does nothing, but it's here!
function dispenseChange(amountToDispense) {
    // TODO make sure this is actually a multiple of 25 cents. It should be unless somebody messed with values directly (e.g. in inspector).
    let numQuarters = amountToDispense / 0.25;
    // Return the quarters.
}