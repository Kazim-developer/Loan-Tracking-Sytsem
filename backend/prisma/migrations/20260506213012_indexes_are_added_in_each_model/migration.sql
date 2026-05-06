/*
  Warnings:

  - A unique constraint covering the columns `[accountId,email]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Client_accountId_idx" ON "Client"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Client_accountId_email_key" ON "Client"("accountId", "email");

-- CreateIndex
CREATE INDEX "Loan_accountId_idx" ON "Loan"("accountId");

-- CreateIndex
CREATE INDEX "Loan_accountId_status_idx" ON "Loan"("accountId", "status");

-- CreateIndex
CREATE INDEX "Loan_accountId_repaymentStatus_idx" ON "Loan"("accountId", "repaymentStatus");

-- CreateIndex
CREATE INDEX "Loan_accountId_createdAt_idx" ON "Loan"("accountId", "createdAt");

-- CreateIndex
CREATE INDEX "LoanInstallment_loanId_idx" ON "LoanInstallment"("loanId");

-- CreateIndex
CREATE INDEX "LoanInstallment_loanId_status_idx" ON "LoanInstallment"("loanId", "status");

-- CreateIndex
CREATE INDEX "LoanInstallment_loanId_dueDate_idx" ON "LoanInstallment"("loanId", "dueDate");

-- CreateIndex
CREATE INDEX "LoanPayment_loanId_idx" ON "LoanPayment"("loanId");

-- CreateIndex
CREATE INDEX "LoanPayment_loanId_paidAt_idx" ON "LoanPayment"("loanId", "paidAt");

-- CreateIndex
CREATE INDEX "Usage_accountId_idx" ON "Usage"("accountId");
