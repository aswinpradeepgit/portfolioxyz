export default function Skills() {
  const skills = [
    "AI & LLMs",
    "Backend APIs",
    "FastAPI",
    "Spring Boot",
    "System Design",
    "Databases",
    "React"
  ];

  return (
    <section className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">
          What I work with
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {skills.map((skill) => (
            <div
              key={skill}
              className="
                glass glass-float
                p-6 text-center
              "
            >
              <span className="text-slate-800 font-medium">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
