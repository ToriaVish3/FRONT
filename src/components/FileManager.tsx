import { useMemo, useRef, useState } from "react";
import {
  Plus,
  Download,
  Share2,
  Trash2,
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

interface FileManagerProps {
  userName: string;
  onLogout: () => void;
}

export function FileManager({ userName, onLogout }: FileManagerProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);

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

  const handleAddFolder = () => {
    const id = crypto.randomUUID();
    const newItem: Item = {
      id,
      name: "Папка",
      type: "folder",
      parentId: currentFolderId,
    };
    setItems((prev) => [...prev, newItem]);
    setEditingItemId(id);
    setEditingName(newItem.name);
    setShowAddModal(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const id = crypto.randomUUID();
    const newItem: Item = {
      id,
      name: file.name,
      type: "file",
      parentId: currentFolderId,
      file,
    };
    setItems((prev) => [...prev, newItem]);
    setShowAddModal(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRename = (itemId: string) => {
    const name = editingName.trim() || "Папка";
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, name } : item)),
    );
    setEditingItemId(null);
    setEditingName("");
  };

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
    if (selectedItem.type === "file" && selectedItem.file) {
      const url = URL.createObjectURL(selectedItem.file);
      const a = document.createElement("a");
      a.href = url;
      a.download = selectedItem.name;
      a.click();
      URL.revokeObjectURL(url);
    } else if (selectedItem.type === "folder") {
      alert("Скачивание папок будет реализовано позже");
    }
  };

  const handleShare = () => {
    if (!selectedItem) return;
    navigator.clipboard.writeText(selectedItem.id);
    alert("ID скопирован в буфер обмена");
  };

  const handleDelete = () => {
    if (!selectedItem) return;
    const idsToDelete = new Set<string>();
    const collect = (id: string) => {
      idsToDelete.add(id);
      items
        .filter((i) => i.parentId === id)
        .forEach((child) => collect(child.id));
    };
    collect(selectedItem.id);
    setItems((prev) => prev.filter((i) => !idsToDelete.has(i.id)));
    setSelectedItemId(null);
    setShowDeleteConfirm(false);
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
          <div className="absolute left-1/2 -translate-x-1/2 w-[420px] h-[52px] bg-transparent border border-white/40 rounded-[54px] [font-family:'Century_Gothic-Regular',Helvetica] text-lg font-normal text-white tracking-[0] leading-[normal] flex items-center justify-center">
            {userName}
          </div>
          <button
            onClick={onLogout}
            className="w-[140px] h-[52px] bg-transparent border border-white/40 hover:bg-white/5 rounded-[54px] [font-family:'Century_Gothic-Regular',Helvetica] text-lg font-normal text-white tracking-[0] leading-[normal]"
          >
            Выйти
          </button>
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
                  "Корневая папка"
                )}
              </h2>
            </div>
            <button
              ref={addButtonRef}
              onClick={() => setShowAddModal(true)}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all border border-white/30"
            >
              <Plus className="w-6 h-6 text-white" />
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
                    {editingItemId === item.id ? (
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onBlur={() => handleRename(item.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleRename(item.id);
                          if (e.key === "Escape") {
                            setEditingItemId(null);
                            setEditingName("");
                          }
                        }}
                        autoFocus
                        className="bg-white/20 text-white px-2 py-1 rounded outline-none border border-white/40"
                      />
                    ) : (
                      <span className="text-white">{item.name}</span>
                    )}
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
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare();
                        }}
                        className="p-2 hover:bg-white/20 rounded-lg transition-all"
                        title="Поделиться"
                      >
                        <Share2 className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDeleteConfirm(true);
                        }}
                        className="p-2 hover:bg-white/20 rounded-lg transition-all"
                        title="Удалить"
                      >
                        <Trash2 className="w-5 h-5 text-red-300" />
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {showAddModal && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="fixed bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 w-48 shadow-2xl"
            style={{
              top: addButtonRef.current
                ? addButtonRef.current.getBoundingClientRect().bottom + 10
                : "auto",
              right: addButtonRef.current
                ? window.innerWidth -
                  addButtonRef.current.getBoundingClientRect().right +
                  10
                : "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddFolder();
                }}
                className="w-full p-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all border border-white/20 flex items-center gap-2 text-sm"
              >
                <Folder className="w-4 h-4" />
                Папку
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                  setShowAddModal(false);
                }}
                className="w-full p-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all border border-white/20 flex items-center gap-2 text-sm"
              >
                <File className="w-4 h-4" />
                Файл
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl text-white mb-4 font-light">Подтверждение</h3>
            <p className="text-white/80 mb-6">
              Удалить {selectedItem?.type === "folder" ? "папку" : "файл"} "
              {selectedItem?.name}"?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="flex-1 p-3 bg-red-500/20 hover:bg-red-500/30 rounded-xl text-white transition-all border border-red-500/40"
              >
                Да
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all border border-white/20"
              >
                Нет
              </button>
            </div>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
