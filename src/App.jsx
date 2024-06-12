import "./App.css";
import Searchbox from "./components/Searchbox";

function App() {
  const transformData = (data) => data.results; //will transform my data as per API responses.

  return (
    <>
      <div className="wrapper">
        <Searchbox
          id="personName"
          name="personName"
          label="Enter Character Name"
          placeholder="Enter you favourite Star wars character"
          autoComplete
          maxItems={5}
          styles={{
            lable: "",
            input: "input",
          }}
          debounceWait={400}
          noItemMessage={() => <div>Sorry no data found!</div>}
          errorMessage={() => <div>Something went wrong!</div>}
          transformData={transformData}
        />
      </div>
    </>
  );
}

export default App;
