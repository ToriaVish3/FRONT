import { useNavigate, useParams } from "react-router-dom";
import { AuroraRibbonHero } from "../components/AuroraRibbonHero";
import { FileManager } from "../components/FileManager";

export const Cloud = (): JSX.Element => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <main className="w-full h-screen relative overflow-hidden">
      <AuroraRibbonHero />
      <FileManager userName={username ?? ""} onLogout={handleLogout} />
    </main>
  );
};
