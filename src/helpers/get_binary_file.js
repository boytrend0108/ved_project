import store from "@/store"
function getBinaryFile(inputId, site_role){
  const docsName = inputId.replace(/-/g, '_') 
  let sendedFile
  if(inputId === 'contract-customs-clearance' || inputId === 'user-contract' || inputId === 'invoice'){
     sendedFile = store.getters.DOCS[docsName][site_role].binaryFile
  } else{
     sendedFile =  store.getters.DOCS[docsName].binaryFile
  }

  return sendedFile
}

export default getBinaryFile