-- Create a SECURITY DEFINER function that upserts the caller's own profile.
-- This avoids RLS/column-privilege issues that can prevent profile creation/updates.
-- The function derives the user ID from auth.uid() — it cannot be forged.

CREATE OR REPLACE FUNCTION upsert_my_profile(p_full_name text DEFAULT NULL, p_phone text DEFAULT NULL)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  INSERT INTO profiles (id, full_name, phone)
  VALUES (auth.uid(), p_full_name, p_phone)
  ON CONFLICT (id) DO UPDATE
  SET
    full_name = COALESCE(p_full_name, profiles.full_name),
    phone = COALESCE(p_phone, profiles.phone),
    updated_at = now();
END;
$$;

REVOKE EXECUTE ON FUNCTION upsert_my_profile FROM anon;
GRANT EXECUTE ON FUNCTION upsert_my_profile TO authenticated;
