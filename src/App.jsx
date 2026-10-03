import { MotionConfig } from "framer-motion";
import Nav from "./components/Nav";
import Background from "./components/Background";
import SmoothScroll from "./components/SmoothScroll";
import ScrollProgress from "./components/ScrollProgress";
import Cursor from "./components/Cursor";
import Home from "./pages/Home";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import { usePath } from "./lib/router";

function Page({ path }) {
  if (path === "/blog") return <BlogList />;
  const post = path.match(/^\/blog\/([^/]+)$/);
  if (post) return <BlogPost slug={post[1]} />;
  return <Home />;
}

function App() {
  const path = usePath();

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <Background />
      <Cursor />
      <div id="top" className="min-h-screen">
        <Nav />
        <ScrollProgress />
        <Page key={path} path={path} />
      </div>
    </MotionConfig>
  );
}

export default App;
