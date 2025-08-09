const modules = import.meta.glob("./icons/*.svg", { eager: true })

const icons = Object.keys(modules).reduce((acc, path) => {
    // Extract the icon name from the file path (removes './' and '.svg')
    const iconName = path.split('/').pop().replace('.svg', '');
    // Each module exports ReactComponent (provided by vite-plugin-svgr)
    acc[iconName] = modules[path];
    return acc;
}, {});

export default icons;
