'use server'

import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function savePost(transcript: string, post: string, slides: any[]) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");
  
  const { data, error } = await supabase.from('posts').insert({
    user_id: userId,
    transcript,
    post,
    slides
  }).select().single();
  
  if (error) {
    console.error("Supabase Save Error:", error);
    throw new Error(error.message);
  }
  return data;
}

export async function getPosts() {
  const { userId } = auth();
  if (!userId) return [];
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error("Supabase Fetch Error:", error);
    return [];
  }
  return data;
}

export async function deletePosts(ids: string[]) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");
  
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('user_id', userId)
    .in('id', ids);
    
  if (error) {
    console.error("Supabase Delete Error:", error);
    throw new Error(error.message);
  }
  return true;
}
