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
            className={`tw-bg-cyan-900 tw-text-white tw-rounded-t-md ${
                active ? "" : "tw-rounded-b-md"
            } tw-w-64 tw-relative`}
        >
            <div
                onClick={() => setActive((s) => !s)}
                className="tw-py-2 tw-px-5 tw-w-full tw-h-full tw-flex tw-flex-row tw-items-center tw-justify-between"
            >
                <div>{value}</div>
                <div>
                    <BsChevronDown />
                </div>
            </div>

            {active && (
                <div className="tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-flex tw-flex-col tw-bg-white tw-translate-y-[100%] tw-z-20">
                    {options.map((option, index) => {
                        return (
                            <div
                                onClick={() => {
                                    handleChange(option.value);
                                }}
                                key={index}
                                className="tw-bg-cyan-900 tw-bg-opacity-70 tw-text-white hover:tw-bg-opacity-90 tw-px-5 tw-py-2"
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
