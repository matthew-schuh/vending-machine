const PAYMENT_URL = '/Products/Purchase';
let currentSelection = -1;
let totalDue;
let currentPaymentAmount = 0;
let $productSelection, $productCost, $currentPaymentAmount;

document.addEventListener('DOMContentLoaded', () => {
    $productSelection = $('#product-selection');
    $productCost = $('#product-cost');
    $currentPaymentAmount = $('#current-payment-amount');
}, false);

function addQuarter() {
    incrementPayment(0.25);
}

function addDollar() {
    incrementPayment(1);
}

function addFiveDollars() {
    incrementPayment(5);
}

function incrementPayment(amount) {
    if (currentSelection >= 0) {
        currentPaymentAmount += amount;
        $currentPaymentAmount.text("Paid: $" + currentPaymentAmount.toFixed(2));
        if (currentPaymentAmount >= totalDue) {
            submitPayment(currentPaymentAmount, totalDue);
        }
    }
}

function selectProduct(itemId, itemPrice, itemName) {
    currentSelection = itemId;
    totalDue = itemPrice;
    $('.product-select-button').attr('onclick', null).prop('disabled', true);
    $('.payment-button').prop('disabled', false);
    $productSelection.text("Selection: " + itemName);
    $productCost.text("Price: $" + itemPrice.toFixed(2));
}

function submitPayment(amountPaid, amountDue) {
    $('.payment-button').attr('onclick', null).prop('disabled', true);
    const changeDue = amountPaid - amountDue;
    $.ajax({
        url: PAYMENT_URL + '/' + currentSelection,
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        success: (result) => {
            alert(`Your purchase was successful. Please grab your item` + (changeDue > 0 ? ` and your change in the amount of ${changeDue} (${changeDue / 0.25} Quarters)` : '') + `.`);
            window.location.reload();
        },
        error: (error) => {
            console.log(error);
            alert(`I'm sorry, there was an error with your purchase. Please try again. Your money has been returned.`);
            window.location.reload();
        }
    });
}

function dispenseChange() {

}