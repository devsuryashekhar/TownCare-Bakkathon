import { useState } from "react";

export default function StepsLine() {
  const [steps] = useState({
    stepsItems: ["Profile", "Contact", "Identity", "Passport"],
    currentStep: 2,
  });

  return (
    <div className="max-w-3xl mx-auto mt-16 px-4">
      <ul className="md:flex text-gray-600">
        {steps.stepsItems.map((item, idx) => (
          <li key={idx} className="flex-1 flex md:items-center">
            <div className="flex-1 flex items-center gap-3 md:block">
              <span
                className={`block h-24 w-1 md:w-full md:h-1 ${
                  steps.currentStep > idx + 1 ? "bg-indigo-600" : "bg-gray-200"
                }`}
              />
              <div className="md:mt-2">
                <p className="text-sm">Step {idx + 1}</p>
                <h3 className="font-medium">{item}</h3>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}