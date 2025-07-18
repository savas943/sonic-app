import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { generateLyrics } from "@/lib/openai";

export async function POST(req: Request) {
  const body = await req.json();

  const lyrics = await generateLyrics(`Write lyrics for a song titled "${body.title}"`);

  const { error } = await supabase
    .from("songs")
    .insert([{ title: body.title, lyrics }]);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ lyrics });
}
