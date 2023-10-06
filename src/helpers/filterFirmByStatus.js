
function getActiveFirm(firmList){
  const activeFirm = firmList.filter(el => 
    el.data.state.status === 'ACTIVE'
  )
  return activeFirm
}

export default getActiveFirm