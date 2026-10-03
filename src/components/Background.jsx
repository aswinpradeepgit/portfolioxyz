// Fixed "living" backdrop: two slowly drifting amber glows plus film grain.
export default function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="drift-a absolute -left-[20vw] -top-[20vh] h-[70vh] w-[70vw] rounded-full bg-accent/[0.09] blur-[120px] motion-reduce:animate-none max-md:animate-none" />
      <div className="drift-b absolute -bottom-[25vh] -right-[15vw] h-[70vh] w-[60vw] rounded-full bg-orange-500/[0.07] blur-[120px] motion-reduce:animate-none max-md:animate-none" />
      <div className="grain absolute inset-0" />
    </div>
  );
}
