import React from "react";
import { BsChevronDown } from "react-icons/bs";

const Dropdown = ({ options, value, onChange }) => {
  const [active, setActive] = React.useState(false);
  const ref = React.useRef();

  const handleChange = (value) => {
    onChange(value);
    setActive(false);
  };

  React.useEffect(() => {
    if (window && ref.current) {
      window.addEventListener("click", (e) => {
        if (ref.current?.contains(e.target)) {
        } else {
          setActive(false);
        }
      });
      return window.removeEventListener("click", () => {});
    }
  }, []);
  return (
    <div
      ref={ref}
      className={`bg-cyan-900 text-white rounded-t-md ${
        active ? "" : "rounded-b-md"
      } w-64 relative`}
    >
      <div
        onClick={() => setActive((s) => !s)}
        className="py-2 px-5 w-full h-full flex flex-row items-center justify-between"
      >
        <div>{value}</div>
        <div>
          <BsChevronDown />
        </div>
      </div>

      {active && (
        <div className="absolute bottom-0 left-0 w-full flex flex-col bg-white translate-y-[100%] z-20">
          {options.map((option, index) => {
            return (
              <div
                onClick={() => {
                  handleChange(option.value);
                }}
                key={index}
                className="bg-cyan-900 bg-opacity-70 text-white hover:bg-opacity-90 px-5 py-2"
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
