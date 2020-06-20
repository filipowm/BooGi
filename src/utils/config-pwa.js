const hasValue = value => value && value.length > 0;

const shortNameFromMetadata = (metadata) => calculateValue(metadata.short_name, metadata.name.replace(/\w+/, ''));

const calculateValue = (value, fallbackValue) => {
    return hasValue(value) ? value : hasValue(fallbackValue) ? fallbackValue : null;
}

const calculateIconLocalPath = (icon) => {
    if (icon.startsWith('/assets/')) {
        return `static${icon}`;
    } else if (icon.startsWith('assets/')) {
        return `static/${icon}`;
    }
    return icon;
}

const formatsMap = {
    gif: 'image/gif',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    pjp: 'image/jpeg',
    pjpeg: 'image/jpeg',
    png: 'image/png',
    tif: 'image/tiff',
    tiff: 'image/tiff',
    svg: 'image/svg+xml',
    webp: 'image/webp' 
}

const setIconsType = (icons) => {
    icons.forEach(icon => {
        if (!icon.type) {
            const splitted = icon.split('.');
            const extension = splitted.length > 0 ? splitted[splitted.length - 1].toLowerCase() : null;
            const type = formatsMap[extension];
            icon.type = type;
        }
    });
}

const postProcessConfig = (config) => {
    const manifest = { ...config.pwa.manifest }
    manifest.name = calculateValue(manifest.name, config.metadata.name);
    manifest.short_name = calculateValue(manifest.short_name, shortNameFromMetadata(config.metadata));
    manifest.description = calculateValue(manifest.description, config.metadata.description);
    manifest.start_url = calculateValue(manifest.start_url, config.metadata.pathPrefix);
    manifest.background_color = calculateValue(manifest.background_color, config.metadata.themeColor);
    manifest.theme_color = calculateValue(manifest.theme_color, config.metadata.themeColor);
    manifest.cache_busting_mode = 'none'; // enforce, because required to work with gatsby-plugin-offline
    const icon = calculateValue(manifest.icon, config.metadata.siteImage);
    manifest.icon = calculateIconLocalPath(icon);
    manifest.include_favicon = !hasValue(config.metadata.favicon);
    manifest.lang = calculateValue(config.metadata.language, null);
    if (manifest.icons) {
        setIconsType(manifest.icons);
    }
    config.pwa = {
        manifest: manifest,
        enabled: config.pwa.enabled
    };
}

module.exports = postProcessConfig;