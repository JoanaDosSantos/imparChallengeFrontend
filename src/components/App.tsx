import { useCard } from "../hooks/Card";
import Header from "./Header/Header";
import { Loader } from "./Loader/Loader";
import DataContent from "./CardModule/SearchResult";
import SearchSection from "./SearchSection/SearchSection";

export default function MainPage() {
  const { isLoading } = useCard()

  return (
    <>
      <Header />
      <SearchSection />
      <DataContent />

      {
        isLoading
          ? <Loader />
          : null
      }
    </>
  )
}