"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Clock, ToggleLeft, ToggleRight } from "lucide-react";
import GameFormModal from "./GameFormModal";
import TimeSlotsModal from "./TimeSlotsModal";

export default function GamesManager() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editGame, setEditGame] = useState(null);
  const [slotsGame, setSlotsGame] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  const loadGames = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/games");
    const data = await res.json();
    setGames(data.data || []);
    setLoading(false);
  }, []);

  useEffect(() => { loadGames(); }, [loadGames]);

  const deleteGame = async (id) => {
    if (!confirm("Soft-delete this game? It will be hidden from booking but historical data is preserved.")) return;
    await fetch(`/api/games/${id}`, { method: "DELETE" });
    loadGames();
  };

  const parseImages = (raw) => {
    try {
      const arr = typeof raw === "string" ? JSON.parse(raw) : raw;
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Games</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage games and their available time slots
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
        >
          <Plus className="h-4 w-4" /> Add Game
        </button>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                {["Game", "Duration", "Slots", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : games.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-sm text-gray-400">
                    No games yet. Add your first game above.
                  </td>
                </tr>
              ) : (
                games.map((g) => {
                  const images = parseImages(g.image_urls);
                  return (
                    <tr key={g.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {images[0] ? (
                            <img
                              src={images[0]}
                              alt={g.title}
                              className="h-10 w-10 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                              <span className="text-lg">🎮</span>
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-gray-800 dark:text-white/90">{g.title}</p>
                            {g.description && (
                              <p className="line-clamp-1 text-xs text-gray-400">{g.description}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        {g.duration_minutes} min
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => setSlotsGame(g)}
                          className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                        >
                          <Clock className="h-3.5 w-3.5" /> Manage Slots
                        </button>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          g.active_status
                            ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                            : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                        }`}>
                          {g.active_status ? <ToggleRight className="h-3.5 w-3.5" /> : <ToggleLeft className="h-3.5 w-3.5" />}
                          {g.active_status ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditGame(g)}
                            className="rounded-lg p-1.5 text-gray-500 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteGame(g.id)}
                            className="rounded-lg p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showCreate && (
        <GameFormModal
          onClose={() => setShowCreate(false)}
          onSaved={() => { setShowCreate(false); loadGames(); }}
        />
      )}
      {editGame && (
        <GameFormModal
          game={editGame}
          onClose={() => setEditGame(null)}
          onSaved={() => { setEditGame(null); loadGames(); }}
        />
      )}
      {slotsGame && (
        <TimeSlotsModal game={slotsGame} onClose={() => setSlotsGame(null)} />
      )}
    </div>
  );
}
