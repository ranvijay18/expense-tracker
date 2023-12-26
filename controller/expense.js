const Expense = require('../model/expense');


exports.getExpense = (req, res, next) => {
    Expense.findAll()
    .then(expenses => {
        res.status(201).json(expenses);
    })
    .catch(err => {
        console.log(err);
    })
}


exports.postExpense = (req, res, next) => {
    const amount = req.body.amount;
    const des = req.body.des;
    const cat = req.body.cat;
 
 
     Expense.create({
         amount: amount,
         description: des,
         category: cat
     })
     .then( (result) => {
         res.status(201).json({newDetails : result});
     })
     .catch(err=> {
         console.log(err);
     })
}

exports.getEditExpense = (req,res,next) => {
    const expenseId = req.params.expenseId;
    Expense.findByPk(expenseId)
    .then(expense => {
        res.status(201).json({editExpense: expense});
        expense.destroy();
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getDeleteExpense = (req,res,next) => {
    const expenseId = req.params.expenseId;
    Expense.findByPk(expenseId)
    .then(expense => {
        expense.destroy();
    })
    .catch(err => {
        console.log(err);
    })
}