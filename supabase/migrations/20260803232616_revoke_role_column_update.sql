-- Revoke UPDATE on the role column so users can't self-escalate to admin.
-- Role changes must go through an admin SECURITY DEFINER function.
REVOKE UPDATE (role) ON profiles FROM authenticated;
REVOKE UPDATE (role) ON profiles FROM anon;
REVOKE INSERT (role) ON profiles FROM authenticated;
REVOKE INSERT (role) ON profiles FROM anon;
