import { Header } from "@/components/header";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      {children}
      {/* <Footer /> */}
    </>
  );
}
