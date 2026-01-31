import { useRef, useState } from "react";

export default function FaqsCard({ faqsList }) {
  const answerElRef = useRef();
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState("0px");

  const toggle = () => {
    const h = answerElRef.current.childNodes[0].offsetHeight;
    setOpen(!open);
    setHeight(`${h + 20}px`);
  };

  return (
    <div
      onClick={toggle}
      className="mt-5 border-b overflow-hidden cursor-pointer"
    >
      <h4 className="flex justify-between text-lg font-medium text-gray-700 pb-4">
        {faqsList.q}
        {open ? "−" : "+"}
      </h4>

      <div
        ref={answerElRef}
        style={{ height: open ? height : "0px" }}
        className="transition-all duration-300"
      >
        <p className="text-gray-500 pb-4">{faqsList.a}</p>
      </div>
    </div>
  );
}