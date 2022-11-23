export function DateTimeFormatter(props) {
  const { date } = props
  const dateObj = new Date(date)

  return (
    <div className="pb-4">
      <span className="font-bold">Due Date: </span>
      <span>{`${
        LeadingZero({number: dateObj.getDate()}) +
        "/" +
        LeadingZero({number: dateObj.getMonth()}) +
        "/" +
        dateObj.getFullYear()
        } - ${
          LeadingZero({number:dateObj.getHours()}) +
          ":" +
          LeadingZero({number: dateObj.getMinutes()})
        }`}
      </span>
    </div>
  );
}

export function LeadingZero({number}) {
  return parseInt(number) < 10 ? "0" + number : number
}