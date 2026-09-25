# WP Engine staging import

## Source and snapshot

- Environment: `veritybuildstg` (staging)
- Portal: https://my.wpengine.com/installs/veritybuildstg
- Backup ID: `1790352562`
- Snapshot created: September 25, 2026, 12:09 PM EDT (16:09 UTC)
- Export: full WP Engine backup, including site files and database
- Local archive: `.local/backups/veritybuildstg-1790352562.zip`
- Archive SHA-256: `c2773d28c3a7c571daad6927fe4e909bfce3ac281e5eceae6b273b98af3941a9`

## Import result

Extracted the archive into the repository root without overwriting existing project documents. The archive contains 9,994 entries, including 8,600 files, totaling 307,274,043 uncompressed bytes. It includes WordPress core, themes, plugins, uploads, and the database export at `wp-content/mysql.sql`.

- WordPress version reported by the imported core: `7.1.1`
- Theme directories: `vbg`, `genesis-block-theme`, `twentytwentyfive`, `twentytwentyfour`, `twentytwentythree`
- Plugin directories: `wordpress-importer`, `akismet`, `classic-editor`, `redirection`, `duplicate-post`, `wp-scss`, `gravityforms`, `advanced-custom-fields-pro`, `wp-mail-smtp-pro`
- Upload files: 398

The raw archive, database exports, and `wp-config.php` remain local and are excluded from Git. The imported configuration retains its staging settings; do not use it to start a local site without replacing remote connection settings with a local configuration.

## Verification and limits

- ZIP CRC integrity check passed for all entries.
- Archive paths were checked for traversal, Git-directory entries, symlinks, and existing-path collisions before extraction.
- Every extracted file size matched the archive manifest.
- No restore or deployment was performed on staging or production.
- No files have been committed or pushed.
- Local runtime and database import have not been configured or tested.
- This is a full WP Engine backup, not an SFTP mirror. WP Engine excludes certain transient files, logs, caches, and other paths from backups; see https://wpengine.com/support/restore/ for its exclusion policy.

## Next phase

Inspect the custom theme and database-backed site configuration, confirm the requested site changes, and establish an isolated local runtime before implementation.
