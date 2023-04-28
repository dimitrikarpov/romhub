import { useForm, SubmitHandler } from "react-hook-form"
import { Button } from "~/components/ui/button/Button"

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
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="[&>*:not(:last-child)]:mb-4"
    >
      <div className="flex flex-col">
        <label>Name</label>
        <input
          {...register("title", { required: true, maxLength: 150 })}
          placeholder="Enter playlist name..."
          className="border-0 border-b border-[#f1f1f1] bg-transparent"
        />
      </div>

      <div>
        <label>Privacy</label>
        <select {...register("privacy")} className="w-full bg-transparent">
          <option value="public" className="bg-[#212121]">
            Public
          </option>
          <option value="private" className="bg-[#212121]">
            Private
          </option>
        </select>
      </div>

      <div className="flex justify-end">
        <Button variant="transparent-blue" type="submit">
          Create
        </Button>
      </div>
    </form>
  )
}
