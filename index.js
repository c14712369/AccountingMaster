let transactions = [];
let incomeCategories = ["薪水", "獎金", "零用錢", "其他"]; // 默认的收入类别
let expenseCategories = ["食物", "娛樂", "交通"]; // 默认的支出类别

// 新增收入
function addIncome() {
    const dateInput = document.getElementById('date');
    const incomeInput = document.getElementById('income');
    const incomeCategoryInput = document.getElementById('incomeCategory');

    const date = dateInput.value;
    const income = parseFloat(incomeInput.value) || 0;
    const category = incomeCategoryInput.value;

    if (date.trim() === '') {
        alert('請選擇日期。');
        return; 
    }

    if (income === 0) {
        alert('請選擇收入金額。');
        return; 
    }

    transactions.push({ type: 'income', date, amount: income, category });

    updateTransactionList();
    updateFinancialSummary();

    // Reset input fields
    dateInput.value = '';
    incomeInput.value = '';
}

// 新增支出
function addExpense() {
    const dateInput = document.getElementById('date');
    const expenseInput = document.getElementById('expense');
    const expenseCategoryInput = document.getElementById('expenseCategory');

    const date = dateInput.value;
    const expense = parseFloat(expenseInput.value) || 0;
    const category = expenseCategoryInput.value;

    if (date.trim() === '') {
        alert('請選擇日期。');
        return; 
    }

    if (expense === 0) {
        alert('請選擇支出金額。');
        return; 
    }

    transactions.push({ type: 'expense', date, amount: expense, category });

    updateTransactionList();
    updateFinancialSummary();

    // Reset input fields
    dateInput.value = '';
    expenseInput.value = '';
}

// 新增類別
function addCustomCategory(type) {
    const categoryName = prompt(`請輸入新的${type === 'income' ? '收入' : '支出'}類別：`);
    
    if (categoryName) {
        if (type === 'income') {
            incomeCategories.push(categoryName);
        } else if (type === 'expense') {
            expenseCategories.push(categoryName);
        }
        updateCategoryOptions(type);
    }
}

// 更新使用明細
function updateTransactionList() {
    const transactionList = document.getElementById('transactionList');
    transactionList.innerHTML = '';

    transactions.forEach((transaction, index) => {
        const listItem = document.createElement('div');
        listItem.innerHTML = `交易 ${index + 1}. 日期 ${transaction.date}<br>金額： $${transaction.amount.toFixed(2)}  類別： ${transaction.category || '無'}`;
        transactionList.appendChild(listItem);
    });
}

// 更新支出、收入、餘額
function updateFinancialSummary() {
    const totalIncomeSpan = document.getElementById('totalIncome');
    const totalExpenseSpan = document.getElementById('totalExpense');
    const balanceSpan = document.getElementById('balance');

    const totalIncome = transactions
        .filter(transaction => transaction.type === 'income')
        .reduce((total, transaction) => total + transaction.amount, 0);

    const totalExpense = transactions
        .filter(transaction => transaction.type === 'expense')
        .reduce((total, transaction) => total + transaction.amount, 0);

    const balance = totalIncome - totalExpense;

    totalIncomeSpan.textContent = totalIncome.toFixed(2);
    totalExpenseSpan.textContent = totalExpense.toFixed(2);
    balanceSpan.textContent = balance.toFixed(2);
}

function updateCategoryOptions(type) {
    const categorySelect = document.getElementById(`${type}Category`);
    categorySelect.innerHTML = '';

    const categories = type === 'income' ? incomeCategories : expenseCategories;

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// 初始时更新类别选项
updateCategoryOptions('income');
updateCategoryOptions('expense');
