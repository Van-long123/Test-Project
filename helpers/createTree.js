let count =0; //định nghĩa thằng này là nó đc lưu vào server nó là biến toàn cục, server thì nó ko load lại ở brower  
const createTree=(arr,parentId="")=>{
    const tree=[];
    arr.forEach(item=>{
        if(item.parent_id==parentId){
            count++;
            const newItem=item;
            newItem.index=count;
            const children=createTree(arr,item.id);
            if(children.length>0){
                newItem.children=children;
            }
            tree.push(newItem)
        }
    })
    return tree;
}
module.exports.tree=(arr,parentId="")=>{
    count =0; //thì khi lòa lại trang nó sẽ chạy lại code bên controller gọi qua thằng này nó gán lại count =0
    const tree=createTree(arr,parentId="");
    return tree;
}