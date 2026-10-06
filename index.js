let balance=document.querySelector("#balance");
let AddTransactionBox=document.querySelector(".addRecord");
let currentIncome=document.querySelector("#income");
let currentExpense=document.querySelector("#expense");
let records=document.querySelector(".record");

let allTransactions=[];

let UpdatedBalance=localStorage.getItem("balance");
if (UpdatedBalance!== null){
    balance.innerHTML=`${UpdatedBalance} Rs`;
}

let savedInc=localStorage.getItem("prevInc");
let savedExp=localStorage.getItem("prevExp");

let previousIncome;
let previousExpense;

if (savedInc !== null) {
    previousIncome = Number(savedInc);
    currentIncome.innerText = `${formatAmount(previousIncome)} Rs`;
} else {
    previousIncome = Number(currentIncome.innerText);
}

if (savedExp !== null) {
    previousExpense = Number(savedExp);
    currentExpense.innerText = `${formatAmount(previousExpense)} Rs`;
} else {
    previousExpense = Number(currentExpense.innerText);
}


let savedTransaction=localStorage.getItem("transactions");
if(savedTransaction !== null){
    allTransactions = JSON.parse(savedTransaction);
}


let newBalance;
let AmountToBeAdded;
let RecordDescription;
let DeleteButton;
let TypeOfAmount;
let AddButton;
let RecDiv;
let Type; 
let a;


function EditBalance(){
let currentBalance=balance.innerText;
   balance.innerHTML=`<input type="number" id="edited" value="${currentBalance}">`;
   newBalance=document.getElementById("edited");
   newBalance.focus();
   newBalance.addEventListener("keydown",function(e){
   if(e.key==="Enter"){
    balance.innerHTML=`Rs. ${newBalance.value}`;
    localStorage.setItem("balance",newBalance.value);
   }
   });
}


function createAddRecord(){
AddTransactionBox.innerHTML=`
<h1 style="font-size: larger;">Add Transaction</h1>
<div style="margin:10px">
<h2 id="descrip" style="font-size:15px;text-align:left;color:rgb(89, 87, 87);">Description</h2>
<textarea id="RecordDesc" placeholder="Enter description here" style="width:90%;height:40px;border-radius:5px;border:none;padding:10px;margin-right:10px;overflow-y:scroll;"></textarea>
<h2 style="font-size:15px;text-align:left;color:rgb(89, 87, 87);">Category</h2>

<select id="category" style="width:98%;height:30px;color:rgb(89, 87, 87);border-radius:5px;border:none;padding:0px 10px;">
<option value="">Select Category
<option value="income">Income
<option value="expense">Expense
</select>

<h2 style="font-size:15px;text-align:left;color:rgb(89, 87, 87);">Amount</h2>
<input type="number" id="NewAmount" placeholder="Enter amount" style="width:93%;height:30px;border-radius:5px;border:none;padding:0px 10px;">
<button id="addBtn" style="margin-top:20px;width:70px;height:30px;border-radius:5px;border:none;background-color:rgb(65, 101, 65);color:white;font-weight:bolder;cursor:pointer;">Add


</div>
`;
Type=document.querySelector("#category");
a=document.querySelector("#NewAmount");
AddButton=document.querySelector("#addBtn");
RecordDescription=document.querySelector("#RecordDesc");

RecordDescription.addEventListener("input", function(){
    localStorage.setItem("Description", RecordDescription.value);
});

Type.addEventListener("change", function(){
    localStorage.setItem("category", Type.value);
});

a.addEventListener("input", function(){
    localStorage.setItem("AddedAmount", a.value);
});


let SavedDesc = localStorage.getItem("Description");
let SavedType = localStorage.getItem("category");
let SavedAddedAmount = localStorage.getItem("AddedAmount");

if(SavedDesc){
    RecordDescription.value = SavedDesc;
}

if(SavedType){
    Type.value = SavedType;
}

if(SavedAddedAmount){
    a.value = SavedAddedAmount;
}

}

function formatAmount(amount) {
    amount = Number(amount);

    if (amount >= 1000000) {
        return (amount / 1000000).toFixed(1).replace(".0", "") + "M";
    }

    if (amount >= 1000) {
        return (amount / 1000).toFixed(1).replace(".0", "") + "K";
    }

    return amount;
}

function EditIncomeExpense() {

    if (TypeOfAmount === "income") {
        previousIncome = previousIncome + AmountToBeAdded;
        currentIncome.innerText = `${formatAmount(previousIncome)} Rs`;
        localStorage.setItem("prevInc",previousIncome);
    }

    else {
        previousExpense = previousExpense + AmountToBeAdded;
        currentExpense.innerText = `${formatAmount(previousExpense)} Rs`;
        localStorage.setItem("prevExp",previousExpense);
    }
}

function createRecordToDisplay(transaction){

let RecDiv=document.createElement("div");
RecDiv.classList.add("recDisplay");

RecDiv.innerHTML=`
<div style="max-width:80%;text-align:left;padding-right:10px;">
<h3 style="overflow-wrap: break-word;padding-left:10px;">${transaction.description}</h3>
<p style="padding-left:10px;">${transaction.category}</p>
</div>
<div style="overflow-wrap: break-word;width:20%;padding-right:10px;display:flex;flex-direction:column;justify-content:center;align-items:center;">
<p>${formatAmount(transaction.amount)} Rs</p>
<button class="delBtn" style="background-color: transparent;margin-bottom:10px;border:none;cursor:pointer;">❌</button>
</div>
`;
records.appendChild(RecDiv);
let DeleteButton=RecDiv.querySelector(".delBtn");

DeleteButton.addEventListener("click",function(){
 let index=allTransactions.indexOf(transaction);
 allTransactions.splice(index,1);
 localStorage.setItem(  "transactions",JSON.stringify(allTransactions));
 RecDiv.remove();
});

}

balance.addEventListener("dblclick",function(){
   EditBalance();
});

createAddRecord();

allTransactions.forEach(function(transaction){
    createRecordToDisplay(transaction);
});

AddButton.addEventListener("click",function(){

    let transaction = {
        description: RecordDescription.value,
        category: Type.value,
        amount: a.value
    };
     allTransactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(allTransactions));

TypeOfAmount=Type.value;
AmountToBeAdded=Number(a.value);
EditIncomeExpense();
createRecordToDisplay(transaction);
});




