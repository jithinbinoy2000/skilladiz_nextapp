import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home3Main from "@/components/home/Home3Main";
import { Cursor } from "../../components/ui/cursor";

export default function HomeThree() {
  return (
    <div className="main-wrapper">
      <Cursor/>
      <Header />
      <main>
        <Home3Main />
      </main>
      <Footer />
    </div>
  );
}
