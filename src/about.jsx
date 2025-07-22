import { useNavigate } from "react-router-dom";
import { invoke } from "@tauri-apps/api/core";
import { useState, useEffect } from "react";

function About() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [saves, setSaves] = useState([]);
  const [id, setId] = useState([]);
  const [did, setDid] = useState([]);

  
  useEffect(() => {
    (async () => {
      const list = await invoke("list_saves");
      setSaves(list);
    })();
  }, []);

  const handleSave = async () => {
    if (!name.trim() || !link.trim()) return;
    await invoke("save", { save: { id: null, name, link } });
    setName("");
    setLink("");
    
    const list = await invoke("list_saves");
    setSaves(list);
  };

  async function handleDelete() {
    setDid(await invoke("delete_id", {id}));
    console.log(did);
  }

 

  
  return (
    <main className="container">
      <h1>About</h1>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>

      <h3>Saved items</h3>
      {saves.length === 0 ? (
        <p>No saves yet.</p>
      ) : (
        <ul>
          {saves.map((item, idx) => (
            <li key={idx}>
              <strong>{item.name}</strong> –{" "}
              <a href={item.link}>
                {item.link}
              </a>
              <div>

                <button onClick={() => setId(item.id)}>Delete</button>
                <button onClick={handleDelete}>PERMDEL</button>
              <p>{item.id}</p>
              <p>{id}</p>
              <p>{did}</p>
              </div>
            </li>
            
          ))}
        </ul>
      )}

      <button onClick={() => navigate("/")}>Go to main</button>
    </main>
  );
}

export default About;
