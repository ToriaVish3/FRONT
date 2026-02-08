import { useMemo, useState } from "react";
import {
  Download,
  ChevronLeft,
  Folder,
  File,
  FolderOpen,
} from "lucide-react";

type ItemType = "file" | "folder";

interface Item {
  id: string;
  name: string;
  type: ItemType;
  parentId: string | null;
  file?: File;
}

interface ShareFileManagerProps {
  shareUserName: string;
  currentUserName: string;
  onNavigateToCloud: () => void;
}

export function ShareFileManager({ shareUserName, currentUserName, onNavigateToCloud }: ShareFileManagerProps) {
  const [items] = useState<Item[]>([
    { id: "1", name: "Документы", type: "folder", parentId: null },
    { id: "2", name: "Фотографии", type: "folder", parentId: null },
    { id: "3", name: "Readme.txt", type: "file", parentId: null },
  ]);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const currentItems = useMemo(
    () => items.filter((item) => item.parentId === currentFolderId),
    [items, currentFolderId],
  );

  const currentFolder = useMemo(
    () => items.find((item) => item.id === currentFolderId) || null,
    [items, currentFolderId],
  );

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedItemId) || null,
    [items, selectedItemId],
  );

  const handleItemClick = (item: Item) => {
    setSelectedItemId((prev) => (prev === item.id ? null : item.id));
  };

  const handleItemDoubleClick = (item: Item) => {
    if (item.type === "folder") {
      setCurrentFolderId(item.id);
      setSelectedItemId(null);
    }
  };

  const handleBack = () => {
    if (!currentFolder) return;
    setCurrentFolderId(currentFolder.parentId || null);
    setSelectedItemId(null);
  };

  const handleDownload = () => {
    if (!selectedItem) return;
    alert(`Скачивание: ${selectedItem.name}`);
  };

  const handleDownloadAll = () => {
    alert("Скачивание всех файлов");
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedItemId(null);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden px-8 py-6">
      <div className="w-full relative z-10">
        <div className="flex items-center justify-between mb-12 px-4">
          <h1 className="[font-family:'Aquire-Light',Helvetica] font-light text-white text-2xl md:text-3xl tracking-[0] leading-[normal]">
            GlassCloud
          </h1>
          <button
            onClick={onNavigateToCloud}
            className="absolute left-1/2 -translate-x-1/2 w-[420px] h-[52px] bg-transparent border border-white/40 rounded-[54px] [font-family:'Century_Gothic-Regular',Helvetica] text-lg font-normal text-white tracking-[0] leading-[normal] flex items-center justify-center hover:bg-white/5 transition-colors"
          >
            {currentUserName}
          </button>
          <div className="w-[140px]"></div>
        </div>

        <div
          className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-10 shadow-2xl"
          onClick={handleClickOutside}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {currentFolder && (
                <button
                  onClick={handleBack}
                  className="p-2 hover:bg-white/10 rounded-full transition-all"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
              )}
              <h2 className="text-2xl text-white font-light flex items-center gap-2">
                {currentFolder ? (
                  <>
                    <FolderOpen className="w-6 h-6" />
                    {currentFolder.name}
                  </>
                ) : (
                  shareUserName
                )}
              </h2>
            </div>
            <button
              onClick={handleDownloadAll}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all border border-white/30"
            >
              <Download className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="max-h-[500px] overflow-y-auto pr-3 space-y-3">
            {currentItems.length === 0 ? (
              <div className="text-white/60 text-center py-8">Папка пуста</div>
            ) : (
              currentItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                    selectedItem?.id === item.id
                      ? "bg-white/20 border border-white/40"
                      : "bg-white/5 border border-white/10 hover:bg-white/10"
                  }`}
                  onClick={() => handleItemClick(item)}
                  onDoubleClick={() => handleItemDoubleClick(item)}
                >
                  <div className="flex items-center gap-3 flex-1">
                    {item.type === "folder" ? (
                      <Folder className="w-5 h-5 text-yellow-300" />
                    ) : (
                      <File className="w-5 h-5 text-blue-300" />
                    )}
                    <span className="text-white">{item.name}</span>
                  </div>

                  {selectedItem?.id === item.id && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload();
                        }}
                        className="p-2 hover:bg-white/20 rounded-lg transition-all"
                        title="Скачать"
                      >
                        <Download className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
