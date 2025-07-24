import { MyInput } from "@components/ui/MyInput"
import { Search } from "lucide-react"

export const SearchForm = () => {
  return (
    <form className="flex items-center w-full max-w-150 mx-auto">
        <MyInput className="p-2 max-w-150 min-[600px]:rounded-r-none"/>
        <button type="button" className="p-2 text-white bg-primary border-2 border-primary rounded-r-md max-[600px]:hidden"><Search/></button>
    </form>
  )
}
