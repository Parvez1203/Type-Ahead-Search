function Listbox({ items, activeIndex }) {
  return (
    <ul className="listBoxContainer">
      {items.map((item, index) => {
        return (
          <li
            className={`listBoxItem ${
              index === activeIndex ? "activeItem" : ""
            }`}
            key={index}
          >
            {item.name}
          </li>
        );
      })}
    </ul>
  );
}

export default Listbox;
