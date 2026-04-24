import { put, head } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BLOB_PATH = "comments.json";

interface Comment {
  id: string;
  name: string;
  text: string;
  createdAt: string;
}

async function getComments(): Promise<Comment[]> {
  try {
    const blob = await head(BLOB_PATH);
    const res = await fetch(blob.url, { cache: "no-store" });
    return await res.json();
  } catch {
    return [];
  }
}

async function saveComments(comments: Comment[]) {
  await put(BLOB_PATH, JSON.stringify(comments), {
    contentType: "application/json",
    access: "public",
    addRandomSuffix: false,
  });
}

export async function GET() {
  const comments = await getComments();
  return NextResponse.json(comments);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, text } = body;

    if (!name?.trim() || !text?.trim()) {
      return NextResponse.json(
        { error: "Name and comment are required" },
        { status: 400 }
      );
    }

    const comments = await getComments();

    const comment: Comment = {
      id: crypto.randomUUID(),
      name: name.trim(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    comments.unshift(comment);
    await saveComments(comments);

    return NextResponse.json(comment, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}
