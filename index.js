let balance=document.querySelector("#balance");
let AddTransactionBox=document.querySelector(".addRecord");
let currentIncome=document.querySelector("#income");
let currentExpense=document.querySelector("#expense");
let records=document.querySelector(".record");

let previousIncome=Number(currentIncome.innerText);
let previousExpense=Number(currentExpense.innerText);
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
   let newBalance=document.getElementById("edited");
   newBalance.focus();
   newBalance.addEventListener("keydown",function(e){
   if(e.key==="Enter"){
    balance.innerHTML=`$. ${newBalance.value}`;
   }
   });
}


function createAddRecord(){
AddTransactionBox.innerHTML=`
<h1 style="font-size: larger;">Add Transaction</h1>
<div style="margin:10px">
<h2 style="font-size:15px;text-align:left;color:rgb(89, 87, 87);">Description</h2>
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

}

function EditIncomeExpense(){

if(TypeOfAmount==="income"){
    previousIncome+=AmountToBeAdded;
    currentIncome.innerText="";
    currentIncome.innerText=`${previousIncome} `;
}
else{
    previousExpense+=AmountToBeAdded;
    currentExpense.innerText="";
    currentExpense.innerText=`${previousExpense}`;
}
}

function createRecordToDisplay(){

let RecDiv=document.createElement("div");
RecDiv.classList.add("recDisplay");

RecDiv.innerHTML=`
<div style="max-width:80%;text-align:left;padding-right:10px;">
<h3 style="overflow-wrap: break-word;padding-left:10px;">${RecordDescription.value}</h3>
<p style="padding-left:10px;">${TypeOfAmount}</p>
</div>
<div style="overflow-wrap: break-word;width:20%;padding-right:10px;display:flex;flex-direction:column;justify-content:center;align-items:center;">
<p>${AmountToBeAdded} Rs</p>
<button class="delBtn" style="background-color: transparent;margin-bottom:10px;border:none;cursor:pointer;">❌</button>
</div>
`;
records.appendChild(RecDiv);
let DeleteButton=RecDiv.querySelector(".delBtn");

DeleteButton.addEventListener("click",function(){
 RecDiv.remove();
});

}

balance.addEventListener("dblclick",function(){
   EditBalance();
});

createAddRecord();

AddButton.addEventListener("click",function(){
TypeOfAmount=Type.value;
AmountToBeAdded=Number(a.value);
EditIncomeExpense();
createRecordToDisplay();
});




