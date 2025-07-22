// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
// a
use tauri::Emitter;

use db::{Db, Save};
use tauri::Manager;
mod db;


#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust mr/mrs.", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let db = tauri::async_runtime::block_on(Db::new()).expect("cout not open DB");
            app.manage(db);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet, my_command, ping, save, list_saves,delete_id,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn my_command() -> String {
    "Hello, ! this is kouhsik".to_string()
}

#[tauri::command]
fn ping(app: tauri::AppHandle) {
    app.emit("ping", "PINGPING PING FROM RUST PING PING")
        .unwrap();
}

#[tauri::command]
async fn save(save: Save, db: tauri::State<'_, Db>) -> Result<(), String> {
    db.save(save).await.map_err(|e| e.to_string())
}

#[tauri::command]
async fn list_saves(db: tauri::State<'_, Db>) -> Result<Vec<Save>, String> {
    db.list().await.map_err(|e| e.to_string())
}

#[tauri::command]
async fn delete_id(id: i64,db: tauri::State<'_, Db> ) -> Result<String,String> {
    db.delete(id).await.map_err(|e| e.to_string()).unwrap();

    let shik = format!("Here is your id THAT HAS BEEN DELETED FROM SERVER SIDE {}",id);

    Ok(shik)


// now i need to make it so the components are like square and 
// it will render the metadata from the links
}



















