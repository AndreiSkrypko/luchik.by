# Решение проблемы 403 для изображений тренажеров

## Проблема
Изображения тренажеров не загружаются, сервер возвращает ошибку 403 (Forbidden).

## Решение

### 1. Проверьте наличие файлов .htaccess

Убедитесь, что на сервере есть **ДВА** файла `.htaccess`:

1. **Корневой файл:** `/home/robotlidab/luchik.by/.htaccess`
2. **Файл в папке img:** `/home/robotlidab/luchik.by/img/.htaccess`

### 2. Проверьте права доступа

Выполните через SSH или файловый менеджер:

```bash
# Права на .htaccess файлы
chmod 644 /home/robotlidab/luchik.by/.htaccess
chmod 644 /home/robotlidab/luchik.by/img/.htaccess

# Права на папки
chmod 755 /home/robotlidab/luchik.by/img
chmod 755 /home/robotlidab/luchik.by/img/trainers
chmod 755 /home/robotlidab/luchik.by/img/trainers/speed-reading
chmod 755 /home/robotlidab/luchik.by/img/trainers/mental-arithmetic

# Права на SVG файлы
find /home/robotlidab/luchik.by/img/trainers -name "*.svg" -exec chmod 644 {} \;
```

### 3. Проверьте логи Apache

Проверьте логи ошибок Apache на сервере. Обычно они находятся в:
- `/var/log/apache2/error.log` (Debian/Ubuntu)
- `/var/log/httpd/error_log` (CentOS/RHEL)
- Или в панели управления хостингом в разделе "Логи"

Ищите строки с ошибками 403 для файлов из папки `img/trainers/`.

### 4. Проверьте родительские .htaccess

Убедитесь, что нет других файлов `.htaccess` в родительских директориях, которые могут блокировать доступ.

### 5. Проверьте конфигурацию Apache

Если у вас есть доступ к конфигурации Apache, убедитесь, что:
- Модуль `mod_rewrite` включен
- Модуль `mod_authz_core` включен (для Apache 2.4)
- Директива `AllowOverride All` разрешена для вашей директории

### 6. Альтернативное решение

Если проблема сохраняется, попробуйте создать файл `.htaccess` в папке `trainers`:

**Создайте файл:** `/home/robotlidab/luchik.by/img/trainers/.htaccess`

С содержимым:
```apache
<IfModule mod_authz_core.c>
  Require all granted
</IfModule>
<IfModule !mod_authz_core.c>
  Order Allow,Deny
  Allow from all
</IfModule>
```

И установите права:
```bash
chmod 644 /home/robotlidab/luchik.by/img/trainers/.htaccess
```

### 7. Проверка через браузер

После применения изменений:
1. Очистите кэш браузера (Ctrl+Shift+Delete)
2. Попробуйте открыть изображение напрямую: `https://luchik.by/img/trainers/speed-reading/fading-text.svg`
3. Проверьте консоль браузера (F12) на наличие ошибок

## Контакты для поддержки

Если проблема не решается, обратитесь в поддержку хостинга Hoster.by с:
- Скриншотом ошибок из консоли браузера
- Логами Apache с ошибками 403
- Информацией о версии Apache на сервере

