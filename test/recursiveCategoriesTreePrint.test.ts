import Therefore, { recursiveCategoriesTreePrint } from "../dist/index.js"

test('Print CategorieTree recursively', async () => {
    const therefore = new Therefore('http://win-sn67tgr0bv0', 'rest', 'Mave-x1995')
    const categoriesTree = await therefore.getCategoriesTree()
    recursiveCategoriesTreePrint(categoriesTree)
    console.log(recursiveCategoriesTreePrint(categoriesTree))
    expect(recursiveCategoriesTreePrint).not.toBeNull
})