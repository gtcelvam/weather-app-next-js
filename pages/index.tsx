import Header from "@/components/header";
import WeatherProvider from "@/components/provider";
import MainComponent from "@/components/ui-group/mainBar";
import SideBar from "@/components/ui-group/sideBar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const mainClass = `w-full h-full flex items-start justify-between p-4 gap-4 ${inter.className}`;
const mainSection =
  "w-full h-full flex flex-col items-center justify-start gap-2";

export default function Home() {
  return (
    <WeatherProvider>
      <main className={mainClass}>
        <SideBar />
        <div className={mainSection}>
          <Header />
          <MainComponent />
        </div>
      </main>
    </WeatherProvider>
  );
}
