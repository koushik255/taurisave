use serde::{Deserialize, Serialize};
use sqlx::{sqlite::SqlitePoolOptions, SqlitePool};

#[derive(Debug, Serialize, Deserialize)]
pub struct Save {
    pub id : Option<i64>,
    pub name: String,
    pub link: String,
}

#[derive(Debug)]
pub struct Db(pub SqlitePool);

impl Db {
    pub async fn new() -> Result<Self, sqlx::Error> {
        let pool = SqlitePoolOptions::new().connect("sqlite:saver.db").await?;

        sqlx::query(
            "CREATE TABLE IF NOT EXISTS saves (
                id   INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                link TEXT NOT NULL
            );",
        )
        .execute(&pool)
        .await?;

        Ok(Self(pool))
    }

    pub async fn save(&self, s: Save) -> Result<(), sqlx::Error> {
        sqlx::query!(
            "INSERT INTO saves (name, link) VALUES (?, ?)",
            s.name,
            s.link
        )
        .execute(&self.0)
        .await?;
        Ok(())
    }

    pub async fn list(&self) -> Result<Vec<Save>, sqlx::Error> {
        sqlx::query_as!(Save, "SELECT id, name, link FROM saves")
            .fetch_all(&self.0)
            .await
    }
    
    pub async fn delete(&self, id: i64) -> Result<(), sqlx::Error> {
    sqlx::query!("DELETE FROM saves WHERE id = ?", id)
        .execute(&self.0)
        .await?;
    Ok(())
}


}
