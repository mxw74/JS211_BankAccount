"use strict";

class BankAccount {
  constructor(accountNumber, owner) {
    this.accountNumber = accountNumber;
    this.owner = owner;
    this.transaction = [];
  }

  balance() {
    let sum = 0;
    for (let i = 0; i < this.transaction.length; i++) {
      sum += this.transaction[i].amount;
    }
    return sum;
  }

  charge(payee, amount) {
    let currentBalance = this.balance();
    if (amount <= currentBalance) {
      let chargeTransaction = new Transaction(-amount, payee);
      this.transaction.push(chargeTransaction);
    }
  }

  deposit(amount) {
    if (amount < 0) {
      return;
    }
    let depositTransaction = new Transaction(amount, "deposit");
    this.transaction.push(depositTransaction);
  }
}

class Transaction {
  constructor(amount, payee) {
    this.amount = amount;
    this.payee = payee;
    this.date = new Date();
  }
}

const myTransaction = new Transaction(500, "Jenn Franco");
console.log(myTransaction);
const assert = require("assert");

if (typeof describe === "function") {
  describe("bank account creation", () => {
    it("should create a new bank account", () => {
      let myBankAccount = new BankAccount("00000", "Jenn Franco");
      assert.equal(myBankAccount.owner, "Jenn Franco");
      assert.equal(myBankAccount.accountNumber, "00000");
      assert.equal(myBankAccount.transaction.length, 0);
    });
  });

  describe("transaction creation", () => {
    it("should create a new transaction for a deposit", () => {
      let myTransaction = new Transaction(65, "Deposit");
      assert.equal(myTransaction.amount, 65);
      assert.equal(myTransaction.payee, "Deposit");
      assert.notEqual(myTransaction.date, null);
    });
    it("should create a new transaction for a charge", () => {
      let myTransaction = new Transaction(-55.25, "Pinthouse");
      assert.equal(myTransaction.amount, -55.25);
      assert.equal(myTransaction.payee, "Pinthouse");
      assert.notEqual(myTransaction.date, null);
    });
  });

  describe("account balance", () => {
    it("should update account balance", () => {
      let myBankAccount = new BankAccount("00000", "Jenn Franco");
      assert.equal(myBankAccount.balance(), 0);
      myBankAccount.deposit(42);
      assert.equal(myBankAccount.balance(), 42);
      myBankAccount.charge("Domino's", 25);
      assert.equal(myBankAccount.balance(), 17);
    });
    it("should not allow negative deposits", () => {
      let myBankAccount = new BankAccount("00000", "Jenn Franco");
      assert.equal(myBankAccount.balance(), 0);
      myBankAccount.deposit(42);
      assert.equal(myBankAccount.balance(), 42);
      myBankAccount.deposit(-100);
      assert.equal(myBankAccount.balance(), 42);
    });

    it("should not allow negative charges", () => {
      let myBankAccount = new BankAccount("00000", "Jenn Franco");
      assert.equal(myBankAccount.balance(), 0);
      myBankAccount.charge("Pizza-Hut", 68);
      assert.equal(myBankAccount.balance(), 0);
    });
  });
}