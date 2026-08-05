-- Update upsert_my_profile to RETURN the updated profile row
-- so the client can use it directly without a separate (potentially cached) fetch.
DROP FUNCTION IF EXISTS upsert_my_profile(text, text);

CREATE OR REPLACE FUNCTION upsert_my_profile(p_full_name text DEFAULT NULL, p_phone text DEFAULT NULL)
RETURNS profiles
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_result profiles;
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
    updated_at = now()
  RETURNING * INTO v_result;

  RETURN v_result;
END;
$$;

REVOKE EXECUTE ON FUNCTION upsert_my_profile FROM anon;
GRANT EXECUTE ON FUNCTION upsert_my_profile TO authenticated;
