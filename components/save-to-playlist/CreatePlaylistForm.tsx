import styles from "./save-to-playlist.module.css"

export const CreatePlaylistForm = () => {
  return (
    <form className={styles["form"]}>
      <div className={styles["input-wrapper"]}>
        <label htmlFor="title">Name</label>
        <input id="title" required placeholder="Enter playlist name..." />
      </div>

      <div className={styles["input-wrapper"]}>
        <label htmlFor="privacy">Privacy</label>
        <select id="privacy">
          <option value="">Public</option>
          <option value="">Private</option>
        </select>
      </div>

      <div className={styles["submit-wrapper"]}>
        <button className={styles["submit-btn"]} type="submit">
          Create
        </button>
      </div>
    </form>
  )
}
