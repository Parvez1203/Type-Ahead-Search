import { useState } from "react";
import useFetchPromise from "../customHooks/useFetchPromise";
import Listbox from "./Listbox";

function Searchbox({
  id,
  name,
  label,
  placeholder,
  autoComplete,
  maxItems,
  styles,
  debounceWait,
  noItemMessage,
  errorMessage,
  transformData,
}) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [isAutoComplete, setIsAutoComplete] = useState(autoComplete);
  const apiURL = query ? `https://swapi.dev/api/people/?search=${query}` : null; // completely customizable url
  const [data, error] = useFetchPromise(
    apiURL,
    transformData,
    debounceWait,
    isAutoComplete
  );
  const handeChange = (event) => {
    setQuery(event.target.value);
  };

  const handleKeyUp = (event) => {
    const keyCode = event.keyCode;
    if (keyCode === 13) {
      // user press enter

      if (activeIndex === null) return;
      else {
        setIsAutoComplete(false);
        setQuery(data[activeIndex].name);
        setActiveIndex(null);
        return;
      }
    }

    if (autoComplete === true) {
      setIsAutoComplete(true);
    }

    if (!data || data.length === 0) return;
    if (keyCode === 40) {
      // user press down
      if (activeIndex === null || activeIndex === data.length - 1) {
        setActiveIndex(0);
      } else {
        setActiveIndex((prevIndex) => prevIndex + 1);
      }
    } else if (keyCode === 38) {
      // user press up
      if (activeIndex === null || activeIndex === 0) {
        setActiveIndex(data.length - 1);
      } else {
        setActiveIndex((prevIndex) => prevIndex - 1);
      }
    }
  };
  return (
    <>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        type="text"
        id={id}
        className={styles.input}
        name={name}
        value={query}
        onChange={handeChange}
        placeholder={placeholder}
        autoComplete="off"
        onKeyUp={handleKeyUp}
      />

      {data && <Listbox items={data} activeIndex={activeIndex} />}
      {query && data?.length === 0 && noItemMessage()}
      {error && errorMessage()}
    </>
  );
}

export default Searchbox;
