"use client";
import "./globals.css";

import React, { useEffect, useRef, useState } from "react";
import { HexAlphaColorPicker } from "react-colorful";

import ModalPortal from "./components/ModalPortal";
import { generateColorStyles } from "./utils/hexToRgba";

interface ColorPickerProps {
  defaultValue: string;
  onChange: (color: string) => void;
  customClasses: string;
}

const GradientPicker: React.FC<ColorPickerProps> = ({
  defaultValue = "#ffffff",
  onChange,
  customClasses = "colorPicker",
}) => {
  const colorPickerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [color, setColor] = useState<string>(defaultValue);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const defaultColor = useRef(defaultValue);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    if (onChange) {
      onChange(newColor);
    }
  };

  const checkButtonVisibility = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const isInViewport =
        rect.top >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.left >= 0 &&
        rect.right <= window.innerWidth;

      const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setIsVisible(false);
          }
        });
      });

      intersectionObserver.observe(buttonRef.current);

      return isInViewport;
    }
    return false;
  };

  const updateModalPosition = () => {
    if (isVisible && buttonRef.current) {
      if (!checkButtonVisibility()) {
        setIsVisible(false);
        return;
      }

      const rect = buttonRef.current.getBoundingClientRect();
      const modalHeight = 200;
      const modalWidth = 254;

      const spaceAbove = rect.top + window.scrollY;
      //   const spaceBelow = window.innerHeight - rect.bottom;

      if (spaceAbove >= modalHeight) {
        setModalPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX + rect.width / 2 - modalWidth / 2,
        });
      } else {
        setModalPosition({
          top: rect.top + window.scrollY + 20, // - modalHeight,
          left: rect.left + window.scrollX + rect.width / 2 - modalWidth / 2,
        });
      }
    }
  };

  const handleColorClickOutside = (event: MouseEvent) => {
    if (
      colorPickerRef.current &&
      !colorPickerRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node) &&
      modalRef.current &&
      !modalRef.current.contains(event.target as Node)
    ) {
      setIsVisible(false);
    }
  };

  const handleColor = () => {
    if (!isVisible) {
      updateModalPosition();
    }
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousedown", handleColorClickOutside);
    } else {
      document.removeEventListener("mousedown", handleColorClickOutside);
      const parentContainer = colorPickerRef.current?.parentNode as HTMLElement;
      parentContainer?.removeEventListener("scroll", updateModalPosition);
    }

    return () => {
      document.removeEventListener("mousedown", handleColorClickOutside);
    };
  }, [isVisible]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => updateModalPosition());

    if (buttonRef.current) {
      resizeObserver.observe(buttonRef.current);
    }

    return () => {
      if (buttonRef.current) resizeObserver.unobserve(buttonRef.current);
    };
  }, [buttonRef?.current?.getBoundingClientRect()]);

  const resetColor = () => {
    setColor(defaultColor.current);

    if (onChange) {
      onChange(defaultColor.current);
    }
    setIsVisible(false);
  };

  return (
    <div className={customClasses}>
      <div
        className="relative flex items-center justify-center"
        ref={colorPickerRef}
      >
        <button
          aria-label="Open color picker"
          onClick={handleColor}
          ref={buttonRef}
        >
          <div
            className="h-6 w-6 rounded ring-1 ring-gray-200"
            style={{
              backgroundColor: color,
              border: color === "transparent" ? "1px solid #000" : "inherit",
              //Also add a diagonal line to indicate transparent color
              background:
                color === "transparent"
                  ? `linear-gradient(to top left,
             rgba(0,0,0,0) 0%,
             rgba(0,0,0,0) calc(50% - 0.8px),
             rgba(0,0,0,1) 50%,
             rgba(0,0,0,0) calc(50% + 0.8px),
             rgba(0,0,0,0) 100%)`
                  : color,
              opacity: color === "transparent" ? 0.2 : 1,
            }}
          />
        </button>
        {isVisible && (
          <ModalPortal>
            <div
              className={`z-100 absolute ${customClasses}`}
              style={{
                top: modalPosition.top + 20,
                left: modalPosition.left,
              }}
              ref={modalRef}
            >
              <div className="z-50 rounded-md border bg-white p-4 shadow-md">
                <div className="mb-2 flex items-center justify-between rounded-md bg-slate-200">
                  <button
                    className="w-1/2 rounded-md rounded-r-none bg-slate-300 px-3 py-2 text-sm font-medium"
                    type="button"
                  >
                    Solid
                  </button>
                  <button
                    className="w-1/2 px-3 py-1 text-sm font-medium text-gray-600"
                    type="button"
                  >
                    Gradient
                  </button>
                </div>
                <div className="picker">
                  <HexAlphaColorPicker
                    color={color}
                    onChange={handleColorChange}
                  />

                  <div className="bg-muted col-span-2 mb-3 mt-3 flex w-full flex-1 gap-1 rounded-md text-center uppercase">
                    <div className="flex w-1/2 gap-1 rounded-md bg-slate-200 p-2 font-medium">
                      <div
                        className="h-6 w-6 rounded-md border"
                        style={{
                          backgroundColor: color,
                        }}
                      />
                      <input
                        type="text"
                        size={7}
                        value={color}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="my-auto flex-1 text-left text-sm uppercase text-gray-500 bg-transparent border-none outline-none w-full"
                      />
                    </div>
                    <div className="flex w-1/2 gap-1 rounded-md bg-slate-200 p-2 font-medium">
                      <p className="my-auto flex-1 text-left text-sm uppercase text-gray-500">
                        {Math.round(
                          (parseInt(color.slice(1, 3), 16) / 255) * 100
                        )}{" "}
                        <span className="float-right">%</span>
                      </p>
                    </div>
                  </div>

                  <div className="border-b-2"></div>

                  <div className="mt-3 flex justify-between gap-1">
                    {[...Array(10)].map((_, i) => (
                      <button
                        aria-label={`Increment color ${i}`}
                        key={`increment-${i}`}
                        className="h-4 w-4 cursor-pointer rounded-sm border"
                        style={generateColorStyles(color, i * 10)}
                      />
                    ))}
                  </div>

                  <div className="mt-3 flex justify-between gap-1">
                    {[...Array(10)].map((_, i) => (
                      <button
                        aria-label={`Decrement color ${i}`}
                        key={`decrement-${i}`}
                        className="h-4 w-4 cursor-pointer rounded-sm border"
                        style={generateColorStyles(color, -i * 10)}
                      />
                    ))}
                  </div>
                </div>
                <button
                  onClick={resetColor}
                  className="mx-auto flex items-center gap-1 pt-4 text-sm font-semibold"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                  Reset Color
                </button>
              </div>
            </div>
          </ModalPortal>
        )}
      </div>
    </div>
  );
};

export default GradientPicker;
