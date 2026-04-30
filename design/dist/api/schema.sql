CREATE TABLE IF NOT EXISTS `gs_contact_messages` (
  `id` varchar(128) NOT NULL,
  `channel` varchar(80) NOT NULL DEFAULT 'website_contact',
  `campaign` varchar(120) DEFAULT NULL,
  `name` varchar(180) DEFAULT NULL,
  `first_name` varchar(120) DEFAULT NULL,
  `last_name` varchar(120) DEFAULT NULL,
  `email` varchar(180) DEFAULT NULL,
  `phone` varchar(80) DEFAULT NULL,
  `message` text,
  `source_url` varchar(500) DEFAULT NULL,
  `status` enum('new','read') NOT NULL DEFAULT 'new',
  `crm_status` varchar(40) NOT NULL DEFAULT 'pending',
  `crm_status_code` int DEFAULT NULL,
  `crm_response` mediumtext,
  `recaptcha_ok` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_created_at` (`created_at`),
  KEY `idx_status` (`status`),
  KEY `idx_crm_status` (`crm_status`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `gs_admin_users` (
  `id` varchar(64) NOT NULL,
  `username` varchar(80) NOT NULL,
  `display_name` varchar(160) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','editor') NOT NULL DEFAULT 'editor',
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `failed_count` int NOT NULL DEFAULT 0,
  `banned_until` datetime DEFAULT NULL,
  `last_failed_at` datetime DEFAULT NULL,
  `last_login_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `gs_cms_pages` (
  `id` varchar(64) NOT NULL,
  `slug` varchar(120) NOT NULL,
  `title` varchar(220) NOT NULL,
  `summary` text,
  `body` mediumtext NOT NULL,
  `status` enum('published','draft') NOT NULL DEFAULT 'draft',
  `show_in_menu` tinyint(1) NOT NULL DEFAULT 1,
  `menu_label` varchar(160) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_slug` (`slug`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `gs_cms_menu_items` (
  `id` varchar(64) NOT NULL,
  `label` varchar(160) NOT NULL,
  `href` varchar(500) NOT NULL,
  `kind` enum('internal','external','page') NOT NULL DEFAULT 'internal',
  `visible` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int NOT NULL DEFAULT 100,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_visible_order` (`visible`, `sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `gs_cms_images` (
  `id` varchar(64) NOT NULL,
  `title` varchar(220) NOT NULL,
  `alt` varchar(300) DEFAULT NULL,
  `file_name` varchar(255) NOT NULL,
  `mime_type` varchar(120) NOT NULL,
  `size_bytes` int NOT NULL DEFAULT 0,
  `data_url` longtext NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `gs_cms_menu_items` (`id`, `label`, `href`, `kind`, `visible`, `sort_order`) VALUES
('home', 'Acasă', '/', 'internal', 1, 10),
('shop', 'Magazin', 'https://shop.syshub.ro/', 'external', 1, 20),
('projects', 'Proiecte', '/proiecte', 'internal', 1, 30),
('funding', 'Finanțare UE', '/finantare-ue', 'internal', 1, 40),
('about', 'Despre Noi', '/#despre-noi', 'internal', 1, 50),
('services', 'Servicii', '/#servicii', 'internal', 1, 60),
('process', 'Proces', '/#proces', 'internal', 1, 70),
('certifications', 'Certificări', '/#certificari', 'internal', 1, 80)
ON DUPLICATE KEY UPDATE
  `label` = VALUES(`label`),
  `href` = VALUES(`href`),
  `kind` = VALUES(`kind`),
  `visible` = VALUES(`visible`),
  `sort_order` = VALUES(`sort_order`);
