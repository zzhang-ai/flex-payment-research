"use client";

import { useState, useEffect, useCallback } from "react";

interface Comment {
  id: string;
  name: string;
  text: string;
  section?: string;
  createdAt: string;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch("/api/comments");
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, text }),
      });
      if (res.ok) {
        setText("");
        await fetchComments();
      }
    } catch {
      // silent fail
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mb-16">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Comments</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="border border-slate-200 rounded-xl p-5 mb-6 bg-white"
      >
        <div className="flex gap-3 mb-3">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/30 focus:border-cherry"
          />
        </div>
        <textarea
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherry/30 focus:border-cherry resize-none mb-3"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting || !name.trim() || !text.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </form>

      {/* Comments list */}
      {loading ? (
        <p className="text-sm text-slate-400">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-slate-400">
          No comments yet. Be the first to share your thoughts.
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div
              key={c.id}
              className="border border-slate-200 rounded-xl p-4 bg-white"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 text-xs font-bold flex items-center justify-center">
                  {c.name.charAt(0).toUpperCase()}
                </span>
                <span className="text-sm font-medium text-slate-800">
                  {c.name}
                </span>
                <span className="text-xs text-slate-400">
                  {timeAgo(c.createdAt)}
                </span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap pl-8">
                {c.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
