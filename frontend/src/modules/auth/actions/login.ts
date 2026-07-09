"use server";

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function loginAction(email: string, password: string) {
  // Demo Login Bypass
  if (email.includes('@nexvelt.com')) {
    const cookieStore = await cookies();
    cookieStore.set('nexvelt_demo_auth', email, { path: '/' });
    revalidatePath('/', 'layout');
    return { error: null };
  }

  try {
    const supabase = await createClient();
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }
  } catch (err: any) {
    return { error: 'Authentication failed. Please check your Supabase configuration.' };
  }

  revalidatePath('/', 'layout');
  return { error: null };
}
