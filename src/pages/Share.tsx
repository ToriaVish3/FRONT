import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AuroraRibbonHero } from "../components/AuroraRibbonHero";
import { ShareFileManager } from "../components/ShareFileManager";
import { Button } from "../components/ui/button";

export const Share = (): JSX.Element => {
  const { shareUsername } = useParams<{ shareUsername: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isLoggedIn = searchParams.get("logged") === "true";
  const [showWarningModal, setShowWarningModal] = useState(!isLoggedIn);
  const [currentUser] = useState("MyNickname");

  useEffect(() => {
    if (isLoggedIn) {
      setShowWarningModal(false);
    }
  }, [isLoggedIn]);

  const handleNavigateToCloud = () => {
    navigate(`/home/cloud/${currentUser}`);
  };

  const handleLogin = () => {
    navigate("/");
  };

  if (showWarningModal && !isLoggedIn) {
    return (
      <main className="w-full h-screen relative overflow-hidden">
        <AuroraRibbonHero />

        <div className="relative z-10 flex flex-col h-full">
          <header className="flex items-center justify-between px-8 md:px-16 lg:px-24 pt-8">
            <h1 className="[font-family:'Aquire-Light',Helvetica] font-light text-white text-2xl md:text-3xl tracking-[0] leading-[normal]">
              GlassCloud
            </h1>

            <nav className="flex gap-4">
              <Button
                onClick={handleLogin}
                className="w-[140px] h-[52px] bg-transparent border border-white/40 hover:bg-white/5 rounded-[54px] [font-family:'Century_Gothic-Regular',Helvetica] text-lg font-normal text-white tracking-[0] leading-[normal]"
              >
                Вход
              </Button>

              <Button
                onClick={handleLogin}
                className="w-[140px] h-[52px] bg-transparent border border-white/40 hover:bg-white/5 rounded-[54px] [font-family:'Century_Gothic-Regular',Helvetica] text-lg font-normal text-white tracking-[0] leading-[normal]"
              >
                Регистрация
              </Button>
            </nav>
          </header>

          <section className="flex flex-col justify-center flex-1 px-8 md:px-16 lg:px-24">
            <h2 className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Soledago-Regular',Helvetica] text-6xl md:text-7xl lg:text-8xl font-normal text-white tracking-[0] leading-tight">
              Попробуй <br />и влюбись
            </h2>

            <p className="mt-4 [text-shadow:7px_2px_2.7px_#00000040] [font-family:'Century_Gothic-Regular',Helvetica] text-xl md:text-2xl font-normal text-white tracking-[0] leading-[normal]">
              С заботой о пользовательском опыте
            </p>
          </section>
        </div>

        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 bg-white/12 border border-white/25 backdrop-blur-xl rounded-3xl p-10 w-[90%] max-w-md">
            <div className="text-center mb-6">
              <h3 className="text-white text-3xl font-light [font-family:'Century_Gothic-Regular',Helvetica] mb-4">
                Требуется авторизация
              </h3>
              <p className="text-white/80 text-lg [font-family:'Century_Gothic-Regular',Helvetica]">
                Чтобы посмотреть чем поделился пользователь {shareUsername}, необходимо войти в систему
              </p>
            </div>

            <Button
              onClick={handleLogin}
              className="w-full h-12 bg-gradient-to-r from-blue-500/80 via-violet-500/80 to-purple-600/80 hover:from-blue-500 hover:via-violet-500 hover:to-purple-600 text-white rounded-xl [font-family:'Century_Gothic-Regular',Helvetica] font-normal"
            >
              Войти
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full h-screen relative overflow-hidden">
      <AuroraRibbonHero />
      <ShareFileManager
        shareUserName={shareUsername ?? "UserShare"}
        currentUserName={currentUser}
        onNavigateToCloud={handleNavigateToCloud}
      />
    </main>
  );
};
