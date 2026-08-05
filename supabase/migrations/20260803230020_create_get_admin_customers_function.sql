-- Create a function that lets admins fetch all profiles WITH emails.
-- auth.users is not accessible to client queries, so we use SECURITY DEFINER
-- to join profiles with auth.users and return a safe subset of columns.

CREATE OR REPLACE FUNCTION get_admin_customers()
RETURNS TABLE (
  id uuid,
  full_name text,
  phone text,
  avatar_url text,
  role text,
  email text,
  created_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only admins can call this
  IF NOT EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  RETURN QUERY
  SELECT
    p.id,
    p.full_name,
    p.phone,
    p.avatar_url,
    p.role,
    u.email,
    p.created_at
  FROM profiles p
  LEFT JOIN auth.users u ON p.id = u.id
  ORDER BY p.created_at DESC;
END;
$$;

REVOKE EXECUTE ON FUNCTION get_admin_customers() FROM anon;
GRANT EXECUTE ON FUNCTION get_admin_customers() TO authenticated;
