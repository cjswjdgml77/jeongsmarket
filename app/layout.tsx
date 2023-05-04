import "./globals.css";
import { Arvo } from "next/font/google";
import Nav from "./nav/Nav";
import RecoilContainer from "./components/RecoilContainer";
import LoginModal from "./components/modal/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RegisterModal from "./components/modal/RegisterModal";
const font = Arvo({
  weight: "400",
  subsets: ["latin"],
});
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <RecoilContainer>
          <LoginModal />
          <RegisterModal />
          <Nav currentUser={currentUser} />
          {children}
        </RecoilContainer>
      </body>
    </html>
  );
}
