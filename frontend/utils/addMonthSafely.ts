function addMonthsSafely(date: Date, months: number) {
  const d = new Date(date);
  const day = d.getDate();

  d.setMonth(d.getMonth() + months);

  if (d.getDate() < day) {
    d.setDate(0); // last day of previous month
  }

  return d;
}

export default addMonthsSafely;
