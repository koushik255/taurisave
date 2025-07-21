import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { listen } from "@tauri-apps/api/event";
import { useNavigate } from "react-router-dom"; 

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [helloMsg, setHelloMsg] = useState("");
  const [pingMsg,setPingMsg] = useState("");
  const navigate = useNavigate(); 

  
  

  useEffect(() => {
    const unlisten = listen("ping",(e) => setPingMsg(e.payload));
    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }
  async function my_command() {
    setHelloMsg(await invoke("my_command", {helloMsg}));
  }
  async function ping() {
    await invoke("ping");
  }

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
          my_command();
          ping();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
      <p>{helloMsg}</p>
      <p>{pingMsg}</p>
      
      <button onClick={ ()=> navigate("/about")}>Go to about</button>
    </main>
  );
}

export default App;
