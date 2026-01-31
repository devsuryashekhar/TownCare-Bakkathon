import FaqsCard from "./FaqsCard";

export default function Faqs() {
  const faqsList = [
    { q: "What are some random questions to ask?", a: "Hundreds of questions are available." },
    { q: "Do you include common questions?", a: "We focus on uncommon, creative questions." },
    { q: "Can I use this for 21 questions?", a: "Yes, absolutely." },
    { q: "Are these questions gender neutral?", a: "Yes, completely." },
    { q: "What do you wish you had more talent doing?", a: "We help you explore curiosity." }
  ];

  return (
    <section className="max-w-3xl mx-auto mt-16 px-4">
      <h2 className="text-3xl font-semibold text-center">FAQs</h2>
      <div className="mt-10">
        {faqsList.map((item, i) => (
          <FaqsCard key={i} faqsList={item} />
        ))}
      </div>
    </section>
  );
}