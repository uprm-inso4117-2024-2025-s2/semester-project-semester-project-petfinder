import { supabase } from './supabaseClient';

export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    console.error('Sign up error:', error.message);
    return { error };
  }
  console.log('User signed up:', data.user);
  return data; // data contains user and session properties
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    console.error('Sign in error:', error.message);
    return { error };
  }
  console.log('User signed in:', data.user);
  return data; // data contains user and session properties
};
