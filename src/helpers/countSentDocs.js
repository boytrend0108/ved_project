import store from "@/store";
import router from "@/router";

const docsArr = [
  "factory_contract", 
  "factory_invoice", 
  "logistics_contract", 
  "logistics_transportation_request", 
  "logistics_completion_certificate", 
  "customs_customs_clearance", 
  "customs_additional_agreement", 
  "customs_completion_certificate",
];

const getDocsFromServer = async () => {
  debugger;
  if (
    router.currentRoute.value.name === "customer-order" ||
    router.currentRoute.value.name === "provider-application"
  ) {
    const orderId = router.currentRoute.value.params.id;
    const site_role = store.getters.SITE_ROLE;
    docsArr.forEach((inputId) => {
      store.dispatch("GET_FILE_FROM_SERVER", { orderId, inputId, site_role });
    });
  }
};

const countSentDocs = () => {
  const docs = store.getters.DOCS;
  let sentDocs = 0;

  docsArr.forEach(el => {
    if (docs[el].href?.length) sentDocs++;
  });

  return sentDocs;
}

export {countSentDocs, getDocsFromServer};