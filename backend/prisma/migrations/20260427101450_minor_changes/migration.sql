-- DropForeignKey
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_clientId_fkey";

-- DropForeignKey
ALTER TABLE "LoanInstallment" DROP CONSTRAINT "LoanInstallment_loanId_fkey";

-- DropForeignKey
ALTER TABLE "LoanPayment" DROP CONSTRAINT "LoanPayment_loanId_fkey";

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanInstallment" ADD CONSTRAINT "LoanInstallment_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanPayment" ADD CONSTRAINT "LoanPayment_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
