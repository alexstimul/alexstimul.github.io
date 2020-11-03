export default function buildTree(items, map) {
    let mapMain = new Map();
    let childs = [];

    items.forEach((item) => {
        mapMain.set(item.id, item);
        if (item.parts) {
            item.children = [];
            for (let i = 0; i < item.parts.length; i++) {
                childs.push(item.parts[i]);
                let child = map.get(item.parts[i]);
                item.children.push(child);
            }
        }
    });
    
    childs.forEach((child) => {
        mapMain.delete(child);
    });

    let result = [];

    mapMain.forEach((el) => {
        result.push(el);
    });

    return result;
}