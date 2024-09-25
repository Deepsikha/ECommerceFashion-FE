// import Image from "next/image";
// import { Header } from "@/components/Header";
// import { Footer } from "@/components/Footer";
import { Dashboard } from "./dashboard/page";
import styles from "./page.module.css";
// import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className={styles.page}>
      {/* <Header/> */}
      <Dashboard/>
      {/* <Footer/> */}
    </div>
  );
}
