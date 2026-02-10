import { useRef, useState } from "react";
import Button from "./Button";
import { Typography } from "./Text";
import { IoIosArrowDown, IoMdCheckmark } from "react-icons/io";
import type { Option } from "@/models/Option";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export function Dropdown<T extends string>({
  value,
  options,
  onChange,
  customClasses,
}: {
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
  customClasses?: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(
    popoverRef,
    triggerRef,
    () => {
      setOpen(false);
    },
    open,
  );

  return (
    <>
      <div className={`position-relative ${customClasses}`}>
        <Button
          ref={triggerRef}
          variant={open ? "outline" : "dropdown"}
          className="flex px-4 py-2 gap-4 full-width"
          onClick={() => setOpen(!open)}
          type="button"
        >
          <Typography className="text-primary">{selected?.label}</Typography>
          <IoIosArrowDown className={`dropdown-icon ${open ? "rotate" : ""}`} />
        </Button>

        {open && (
          <div
            ref={popoverRef}
            className="dropdown-popover position-absolute p-2 radius-10 bg-white"
          >
            {options.map((option) => (
              <button
                key={option.value}
                className={`dropdown-option ${
                  option.value === value ? "selected" : ""
                } px-3 py-2 radius-10 flex justify-content-space-between align-items-center text-sm bg-transparent full-width no-border`}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                type="button"
              >
                {option.label}
                {option.value === value && <IoMdCheckmark />}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
