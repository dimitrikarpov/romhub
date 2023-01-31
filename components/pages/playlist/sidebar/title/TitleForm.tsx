import { useForm, SubmitHandler } from "react-hook-form"
import { Button } from "@/components/ui/button/Button"
import styles from "../PlaylistSidebar.module.css"

export interface IFormInput {
  title: string
}

type Props = {
  toggleToView: () => void
  value: string
  onSubmit: (data: IFormInput) => void
}

export const TitleForm: React.FunctionComponent<Props> = ({
  value,
  toggleToView,
  onSubmit,
}) => {
  const { register, handleSubmit } = useForm<IFormInput>()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
      <div className={styles["input-underline"]}>
        <input
          type="text"
          className={styles["input"]}
          defaultValue={value}
          {...register("title")}
        />
      </div>

      <div className={styles["form-controls"]}>
        <Button variant="transparent-transpared" onClick={toggleToView}>
          Cancel
        </Button>
        <Button type="submit" variant="transparent-transpared">
          Submit
        </Button>
      </div>
    </form>
  )
}
