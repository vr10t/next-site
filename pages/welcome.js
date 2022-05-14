import Footer from "../src/components/Footer/Footer";
import Navbar from "../src/components/Navbar/Navbar"
import { useRouter } from "next/router";

export default function Welcome() {
  const router = useRouter();
  const { email } = router.query;
return (
    <div>
    <Navbar>

    </Navbar>
      <main>
      <div className="h-96 ">
        <p>
          Thank you for signing up. Please check your {email} inbox to verify
          your e-mail address!
        </p></div>
      </main>
      <Footer />

    </div>

);
}