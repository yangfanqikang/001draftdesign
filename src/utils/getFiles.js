export function getFiles(dir, isDeep= true, reg= /\.vue$/){
  return require.context(dir, isDeep, reg);

}
