import { useNavigate } from "react-router-dom";
import { invoke } from "@tauri-apps/api/core";
import { useEffect } from "react";

function About() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await invoke("save", {
        save: { name: "saveone", link: "https://x.com" },
      });
      const saves = await invoke("list_saves");
      console.log(saves);
    })();
  }, []);

  return (
    <main className="container">
      <h1>About</h1>
      <p>This is the about page.</p>
      <button onClick={() => navigate("/")}>Go to main</button>
    </main>
  );
}

export default About;
