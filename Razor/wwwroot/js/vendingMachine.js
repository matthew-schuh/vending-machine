const PAYMENT_URL = '/Products/Purchase';
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
    $.ajax({
        url: PAYMENT_URL + '/' + currentSelection,
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        success: (result) => {
            console.log('success');
            console.log(result);
        },
        error: (error) => {
            console.log('error');
            console.log(error);
        }
    });
}

function dispenseChange() {

}