import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home1Main from "@/components/home/Home1Main";

export default function HomeOne() {
  return (
    <div className="main-wrapper">
      <Header />
      <main>
        <Home1Main />
      </main>
      <Footer />
    </div>
  );
}
