import { Search } from "lucide-react"

export const SearchForm = () => {
  return (
    <form className="flex items-center w-full max-w-150 mx-auto">
        <input className="p-2 max-w-150 min-[600px]:rounded-r-none border-2 rounded-md border-defaultBorder hover:border-borderHvr focus:border-primary focus-within:outline-0 w-full"/>
        <button type="button" className="p-2 text-white bg-primary border-2 border-primary rounded-r-md max-[600px]:hidden"><Search/></button>
    </form>
  )
}
