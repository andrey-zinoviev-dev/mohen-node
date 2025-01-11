const express = require("express");

const transactionsRouter = express();

const { showTransactions, createTransaction, getTransaction } = require("../controllers/Transactions");

transactionsRouter.get("/:id/show", showTransactions);
transactionsRouter.get("/:id", getTransaction);
transactionsRouter.post("/create", createTransaction);

module.exports = {
    transactionsRouter,
}