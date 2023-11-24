let currentSelection = -1;
let totalDue;
let currentPaymentAmount = 0;

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
        if (currentPaymentAmount >= totalDue) {
            submitPayment(currentPaymentAmount, totalDue);
        }
    }
}

function selectProduct(itemId, itemPrice) {
    currentSelection = itemId;
    totalDue = itemPrice;
    $('.product-select-button').attr('onclick', null).prop('disabled', true);
    $('.payment-button').prop('disabled', false);
}

function submitPayment(amountPaid, amountDue) {
    $('.payment-button').attr('onclick', null).prop('disabled', true);
    const changeDue = amountPaid - amountDue;
    console.log('submitting payment');
}

function dispenseChange() {

}