const express = require("express");

const transactionsRouter = express();

const { showTransactions, createTransaction } = require("../controllers/Transactions");

transactionsRouter.get("/:id/show", showTransactions);
transactionsRouter.post("/create", createTransaction);

module.exports = {
    transactionsRouter,
}