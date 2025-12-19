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
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">What I work with</h2>
  
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {skills.map(skill => (
              <div
                key={skill}
                className="rounded-2xl p-6 border border-slate-200
                           hover:shadow-md transition bg-white"
              >
                <span className="text-slate-700 font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  