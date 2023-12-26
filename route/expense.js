const express = require('express');
const router = express.Router();

const expenseController = require('../controller/expense')


router.get('/expense' , expenseController.getExpense);

router.post('/expense', expenseController.postExpense);

router.get('/expense/edit/:expenseId', expenseController.getEditExpense);

router.get('/expense/delete/:expenseId', expenseController.getDeleteExpense);



module.exports = router;