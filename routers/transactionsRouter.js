const express = require("express");

const transactionsRouter = express();

const { showTransactions } = require("../controllers/Transactions");

transactionsRouter.get("/:id/show", showTransactions);

module.exports = {
    transactionsRouter,
}