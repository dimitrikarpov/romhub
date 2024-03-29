import { useForm } from "react-hook-form"
import { YTButton } from "~/components/ui/button/YTButton"

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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="border-0 border-b border-b-white pb-[2px]">
        <input
          type="text"
          defaultValue={value}
          className="w-full border-none bg-transparent text-2xl font-bold leading-8 tracking-wider text-white outline-none	"
          {...register("title")}
        />
      </div>

      <div className="flex justify-end gap-4">
        <YTButton variant="transparent-transpared" onClick={toggleToView}>
          Cancel
        </YTButton>
        <YTButton type="submit" variant="transparent-transpared">
          Submit
        </YTButton>
      </div>
    </form>
  )
}
