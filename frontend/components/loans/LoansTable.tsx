export default function LoansTable({ data }) {
  console.log(data);
  return (
    <table
      border={1}
      cellPadding={10}
      style={{ width: "100%", marginTop: "20px" }}
    >
      <thead>
        <tr>
          <th>#</th>
          <th>Borrower</th>
          <th>Loan Amount</th>
          <th>Loan Type</th>
          <th>Total Payable</th>
          <th>Interest</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.map((loan, index) => (
          <tr
            key={loan.id}
            onClick={() => console.log("Go to loan:", loan.id)}
            style={{ cursor: "pointer" }}
          >
            <td>{index + 1}</td>
            <td>{loan.client.name}</td>
            <td>{loan.totalAmount}</td>
            <td>{loan.hasInstallments ? "installments" : "one-time"}</td>
            <td>{loan.totalPayable}</td>
            <td>
              {loan.interestRate}% -{" "}
              {loan.interestType.toLowerCase().slice(0, 4)}
            </td>
            <td>{loan.status.toLowerCase()}</td>

            <td>
              {loan.hasInstallments ? (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Add Payment", loan.id);
                    }}
                  >
                    Add Payment
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Reminder", loan.id);
                    }}
                    style={{ marginLeft: "8px" }}
                  >
                    Reminder
                  </button>
                </>
              ) : (
                <span>-</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
