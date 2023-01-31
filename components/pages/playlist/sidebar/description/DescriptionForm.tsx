import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button/Button"
import styles from "../PlaylistSidebar.module.css"

export interface IFormInput {
  description: string
}

type Props = {
  toggleToView: () => void
  value: string
  onSubmit: (data: IFormInput) => void
}

export const DescriptionForm: React.FunctionComponent<Props> = ({
  value,
  toggleToView,
  onSubmit,
}) => {
  const { register, handleSubmit } = useForm<IFormInput>()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
      <div className={styles["input-underline"]}>
        <textarea
          className={styles["textarea"]}
          defaultValue={value}
          {...register("description")}
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
