import { useState } from "react";
import { Button } from "../../components/ui/button";
import { AuroraRibbonHero } from "../../components/AuroraRibbonHero";

export const W = (): JSX.Element => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

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
              variant="ghost"
              onClick={() => setShowLoginModal(true)}
              className="w-[140px] h-[52px] bg-[#00000001] rounded-[54px] shadow-[0px_4px_8.6px_6px_#00000057,inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)] backdrop-blur-[2.0px] backdrop-brightness-[110%] [-webkit-backdrop-filter:blur(2.0px)_brightness(110%)] [font-family:'Century_Gothic-Regular',Helvetica] text-lg font-normal text-white tracking-[0] leading-[normal] hover:bg-[#00000020]"
            >
              Вход
            </Button>

            <Button
              variant="ghost"
              onClick={() => setShowRegisterModal(true)}
              className="w-[140px] h-[52px] bg-[#00000001] rounded-[54px] shadow-[0px_4px_8.6px_6px_#00000040,inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)] backdrop-blur-[2.0px] backdrop-brightness-[110%] [-webkit-backdrop-filter:blur(2.0px)_brightness(110%)] [font-family:'Century_Gothic-Regular',Helvetica] text-lg font-normal text-white tracking-[0] leading-[normal] hover:bg-[#00000020]"
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

      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowLoginModal(false)}>
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 w-[90%] max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white text-3xl font-light [font-family:'Soledago-Regular',Helvetica]">Вход</h3>
              <button onClick={() => setShowLoginModal(false)} className="text-white text-2xl hover:opacity-70">×</button>
            </div>

            <form className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Пароль"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-white/20 hover:bg-white/30 text-white rounded-xl backdrop-blur-sm border border-white/30"
              >
                Войти
              </Button>
            </form>
          </div>
        </div>
      )}

      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowRegisterModal(false)}>
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 w-[90%] max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white text-3xl font-light [font-family:'Soledago-Regular',Helvetica]">Регистрация</h3>
              <button onClick={() => setShowRegisterModal(false)} className="text-white text-2xl hover:opacity-70">×</button>
            </div>

            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Имя"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Пароль"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-white/20 hover:bg-white/30 text-white rounded-xl backdrop-blur-sm border border-white/30"
              >
                Зарегистрироваться
              </Button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};
