-- Contact form messages (Shelibaas)
-- Public can submit; admins can read/update/delete.

CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "contact_messages_public_insert" ON contact_messages;
CREATE POLICY "contact_messages_public_insert" ON contact_messages
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "contact_messages_admin_select" ON contact_messages;
CREATE POLICY "contact_messages_admin_select" ON contact_messages
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

DROP POLICY IF EXISTS "contact_messages_admin_update" ON contact_messages;
CREATE POLICY "contact_messages_admin_update" ON contact_messages
  FOR UPDATE TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

DROP POLICY IF EXISTS "contact_messages_admin_delete" ON contact_messages;
CREATE POLICY "contact_messages_admin_delete" ON contact_messages
  FOR DELETE TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
