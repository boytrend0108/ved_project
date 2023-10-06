
import router from "@/router";

export const createPath = (inputId, site_role, orderId, action) => { 
  const file_id = inputId.replace(/_/g, '-')
  if (router.currentRoute.value.name === 'provider-application') {
    site_role = 'customer'
  } 
  
   switch(file_id){
    case 'user-contract': return `/documents/order/${orderId}/${site_role}/contract/${action}`;
    case 'invoice':  return `/documents/order/${orderId}/${site_role}/invoice/${action}`;
    case 'contract-customs-clearance':  return `/documents/order/${orderId}/${site_role}/contract-customs-clearance/${action}`;
    default: return  `/documents/order/${orderId}/${file_id}/${action}`
   }
}


export function selectUserRole(){
  if( router.currentRoute.value.path === `/customer/bills/${router.currentRoute.value.params.id}` ||
      router.currentRoute.value.path === `/provider/bills/${router.currentRoute.value.params.id}`){  
    return 'provider'
  } return 'customer'
} 






