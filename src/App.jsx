import DatePicker from "./components/datepicker";

const App = () => {
  return (
    <div>
      <div>
        <h1>Date Picker: no cross month</h1>
        <DatePicker task="no cross month" />
      </div>
      <div>
        <h1>Date Picker: cross month</h1>
        <DatePicker task="cross month" />
      </div>
    </div>
  );
};

export default App;
