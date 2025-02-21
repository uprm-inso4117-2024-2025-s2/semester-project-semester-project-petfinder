import { supabase } from './supabaseClient';

export const signUp = async (email, password) => {
  const { user, session, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    console.error('Sign up error:', error.message);
    return { error };
  }
  console.log('User signed up:', user);
  return { user, session };
};

export const signIn = async (email, password) => {
  const { user, session, error } = await supabase.auth.signIn({
    email,
    password,
  });
  if (error) {
    console.error('Sign in error:', error.message);
    return { error };
  }
  console.log('User signed in:', user);
  return { user, session };
};
