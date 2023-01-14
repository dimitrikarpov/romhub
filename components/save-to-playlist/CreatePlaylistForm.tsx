import { useForm, SubmitHandler } from "react-hook-form"
import styles from "./save-to-playlist.module.css"

enum PrivacyEnum {
  public = "public",
  private = "private",
}

export interface IFormInput {
  title: string
  privacy: PrivacyEnum
}

type Props = {
  onSubmit: (data: IFormInput) => void
}

export const CreatePlaylistForm: React.FunctionComponent<Props> = ({
  onSubmit,
}) => {
  const { register, handleSubmit } = useForm<IFormInput>()

  const onFormSubmit: SubmitHandler<IFormInput> = (data) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className={styles["form"]}>
      <div className={styles["input-wrapper"]}>
        <label>Name</label>
        <input
          {...register("title", { required: true, maxLength: 150 })}
          placeholder="Enter playlist name..."
        />
      </div>

      <div className={styles["input-wrapper"]}>
        <label>Privacy</label>
        <select {...register("privacy")}>
          <option value="public">Public</option>
          <option value="private">Private</option>
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
