-- Fix sort_order collision: shift Stitched and subsequent categories down
UPDATE categories SET sort_order = 7 WHERE slug = 'stitched';
UPDATE categories SET sort_order = 3 WHERE slug = 'luxury-pret';
UPDATE categories SET sort_order = 4 WHERE slug = 'sarees';
UPDATE categories SET sort_order = 5 WHERE slug = 'men';
UPDATE categories SET sort_order = 6 WHERE slug = 'accessories';
