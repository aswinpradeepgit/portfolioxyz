export default function Footer() {
    return (
      <footer className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">
            Want to build something meaningful?
          </h3>
  
          <p className="text-slate-600 mb-8">
            If you’re interested in AI, productivity, or thoughtful software —
            let’s talk.
          </p>
  
          <div className="space-y-2 text-slate-700">
            <p>
              📧{" "}
              <a
                href="mailto:aswinpradeep15@gmail.com"
                className="underline hover:text-blue-600"
              >
                aswinpradeep15@gmail.com
              </a>
            </p>
  
            <p>
              📞{" "}
              <a
                href="tel:6282442055"
                className="underline hover:text-purple-600"
              >
                62824 42055
              </a>
            </p>
          </div>
  
          <p className="text-slate-400 text-sm mt-12">
            © {new Date().getFullYear()} Aswin Pradeep
          </p>
        </div>
      </footer>
    );
  }
  