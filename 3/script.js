function checkLoanEligibility() {

  
  let income = Number(document.getElementById("income").value);
  let age = Number(document.getElementById("age").value);
  let existingEmi = Number(document.getElementById("existingEmi").value);

 
  const MAX_EMI_PERCENT = 50; // customer's EMI should not cross 50% of income

  let resultText = "";

  
  if (age >= 21 && age <= 60) {
    if (income >= 15000) {

      // logical operator (AND) used here
      let emiLimit = (income * MAX_EMI_PERCENT) / 100;

      if (existingEmi < emiLimit) {
        resultText = "Congratulations! You are eligible for a loan.";
      } else {
        resultText = "Sorry, your existing EMI is too high compared to income.";
      }

    } else {
      resultText = "Sorry, minimum income required is Rs 15000.";
    }
  } else {
    resultText = "Sorry, age must be between 21 and 60 years.";
  }

  document.getElementById("loanResult").innerHTML = resultText;
}




function calculateEMI() {

  let principal = Number(document.getElementById("principal").value);
  let annualRate = Number(document.getElementById("rate").value);
  let years = Number(document.getElementById("tenure").value);

  let emi = getEMI(principal, annualRate, years);

  document.getElementById("emiResult").innerHTML =
      "Your Monthly EMI is Rs " + emi.toFixed(2);
}


function getEMI(p, annualRate, years) {

  let monthlyRate = annualRate / 12 / 100;
  let months = years * 12;


  let emi = (p * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);

  return emi;
}




function calculateInterest() {

  let p = Number(document.getElementById("p2").value);
  let r = Number(document.getElementById("r2").value);
  let t = Number(document.getElementById("t2").value);
  let type = document.getElementById("interestType").value;

  let interest = 0;
  let totalAmount = 0;

  switch (type) {

    case "simple":
      interest = (p * r * t) / 100;
      totalAmount = p + interest;
      break;

    case "compound":
      totalAmount = p * Math.pow((1 + r / 100), t);
      interest = totalAmount - p;
      break;

    default:
      interest = 0;
  }

  let label = (type === "simple") ? "Simple Interest" : "Compound Interest";

  document.getElementById("interestResult").innerHTML =
      label + " = Rs " + interest.toFixed(2) +
      " | Total Amount = Rs " + totalAmount.toFixed(2);
}

function generateInterestTable() {

  let p = Number(document.getElementById("p3").value);
  let r = Number(document.getElementById("r3").value);
  let years = Number(document.getElementById("years3").value);

  let tableHtml = "<table><tr><th>Year</th><th>Amount (Rs)</th></tr>";

 
  for (let year = 1; year <= years; year++) {

    let amount = getCompoundAmount(p, r, year);

    tableHtml += "<tr><td>" + year + "</td><td>" + amount.toFixed(2) + "</td></tr>";
  }

  tableHtml += "</table>";

  document.getElementById("tableResult").innerHTML = tableHtml;
}

function getCompoundAmount(p, r, t) {
  return p * Math.pow((1 + r / 100), t);
}



function checkAccountType() {

  let code = Number(document.getElementById("acType").value);
  let accType = "";

  switch (code) {
    case 1:
      accType = "Savings Account";
      break;
    case 2:
      accType = "Current Account";
      break;
    case 3:
      accType = "Salary Account";
      break;
    default:
      accType = "Invalid Account Code";
  }

  document.getElementById("acResult").innerHTML = "Account Type: " + accType;
}



function calculateSavingsGoal() {

  let monthlyDeposit = Number(document.getElementById("monthlyDeposit").value);
  let target = Number(document.getElementById("targetAmount").value);

  let savedAmount = 0;
  let months = 0;


  if (monthlyDeposit <= 0) {
    document.getElementById("savingsResult").innerHTML =
        "Please enter a valid monthly deposit amount.";
    return;
  }


  do {
    savedAmount = savedAmount + monthlyDeposit;
    months = months + 1;
  } while (savedAmount < target);

  document.getElementById("savingsResult").innerHTML =
      "You will reach Rs " + target + " in " + months + " months.";
}

var globalVar = "I am declared with var (function/global scope)";

function scopeDemo() {

  const bankName = "Secure Bank Ltd"; 
  let branch = "Main Branch";         

  let output = "";
  output += globalVar + "<br>";
  output += "const bankName = " + bankName + "<br>";
  output += "let branch = " + branch + "<br>";

  if (true) {
    let branch = "City Branch";
    output += "Inside block, let branch = " + branch + "<br>";
  }

  output += "Outside block, let branch is still = " + branch;

  document.getElementById("scopeResult").innerHTML = output;
}