import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home2Main from "@/components/home/Home2Main";
import { Cursor } from "../../components/ui/cursor";

export default function HomeTwo() {
  return (
    <div className="main-wrapper">
      <Cursor/>
      <Header />
      <main>
        <Home2Main />
      </main>
      <Footer />
    </div>
  );
}
