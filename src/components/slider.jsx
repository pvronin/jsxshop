import React, { useState, useEffect } from "react";

export default function PriceRangeSlider({
  min = 0,
  max = 1000,
  step = 1,
  initialMin = 100,
  initialMax = 800,
  onChange = () => {},
  currency = "تومان",
}) {
  const [low, setLow] = useState(initialMin);
  const [high, setHigh] = useState(initialMax);

  useEffect(() => {
    if (low > high) setLow(high);
    onChange({ min: low, max: high });
  }, [low, high]);

  const valueToPercent = (value) => ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full max-w-2xl p-4 bg-white rounded-2xl shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">فیلتر قیمت</h3>
        <div className="text-sm text-gray-600">
          {formatPrice(low, currency)} — {formatPrice(high, currency)}
        </div>
      </div>

      <div className="relative w-full h-6">
        {/* Track background */}
        <div className="absolute top-1/2 w-full h-2 bg-gray-200 rounded-full transform -translate-y-1/2"></div>

        {/* Active range */}
        <div
          className="absolute h-2 bg-indigo-500 rounded-full top-1/2 transform -translate-y-1/2 pointer-events-none"
          style={{
            left: `${valueToPercent(low)}%`,
            right: `${100 - valueToPercent(high)}%`,
          }}
        ></div>

        {/* مهم: اول high بعد low تا z-index طبیعی درست بشه */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={high}
          onChange={(e) => setHigh(Math.max(Number(e.target.value), low + step))}
          className="absolute w-full top-0 left-0 h-6 appearance-none bg-transparent z-20"
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={low}
          onChange={(e) => setLow(Math.min(Number(e.target.value), high - step))}
          className="absolute w-full top-0 left-0 h-6 appearance-none bg-transparent z-10"
        />

        <style>{`
          input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: white;
            border: 3px solid #6366f1;
            cursor: pointer;
            position: relative;
          }
          input[type=range]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: white;
            border: 3px solid #6366f1;
            cursor: pointer;
            position: relative;
          }
          input[type=range]:focus {
            outline: none;
          }
        `}</style>
      </div>
    </div>
  );
}

function formatPrice(value, currency) {
  return `${Number(value).toLocaleString("fa-IR")} ${currency}`;
}
