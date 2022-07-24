import "./style.css";

export const DatePicker = ({ setDate }) => {
  const actualDate = new Date().toISOString().slice(0, 10);
  const initialDate = "2022-06-01";
  const handleDateChange = (event) => setDate(event.target.value);

  return (
    <div>
      <input className="datePicker"
        type="date"
        min={initialDate}
        max={actualDate}
        onChange={handleDateChange}
      />
    </div>
  );
};
