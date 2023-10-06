import store from "@/store"
export const enumDeliveryType = type => {
	let deliveryType = ""
	switch (type) {
		case "Оптимальный (золотая середина между скоростью и стоимостью)": deliveryType = "medium"
			break
		case "Быстрый (подходит тем, кому поставка нужна ещё вчера)": deliveryType = "fast"
			break
		case "Бюджетный (для тех, кто располагает временем)": deliveryType = "slow"
			break
		case "Не имеет значения": deliveryType = "any"
			break
	}
	return deliveryType
}

export const enumDeliveryType2 = type => {
	let deliveryType = ""
	switch (type) {
		case "medium": deliveryType = "Оптимальный (золотая середина между скоростью и стоимостью)"
			break
		case "fast": deliveryType = "Быстрый (подходит тем, кому поставка нужна ещё вчера)"
			break
		case "slow": deliveryType = "Бюджетный (для тех, кто располагает временем)"
			break
		case  "any": deliveryType = "Не имеет значения"
			break
	}
	return deliveryType
}
//'certification', 'product_check', 'payment_from_the_contractor', 'insurance', 'other'
export const enumServices = services => {
	const enumServices = []
	if (store.getters.COMMENT_FOR_SERVICE) enumServices.push("other")
	services.forEach(el => {
		switch (el) {
			case "Логистика": enumServices.push("logistics") 
				break
			case "Таможенное оформление": enumServices.push("customs_clearance")
				break
			case "Сертификация": enumServices.push("certification")
				break
			case "Инспекция товара на фабрике": enumServices.push("product_check")
				break
			case "Оплата товара поставщику силами исполнителя": enumServices.push("payment_from_the_contractor")
				break
			case "Страхование груза": enumServices.push("insurance")
				break
		}
	})
	return enumServices
}

export const enumServices2 = types => {
  if (!types) return;
	const additional_services = []
	types.map(el => {
		switch (el) {
			case "logistics": additional_services.push("Логистика")
				break
			case "customs_clearance": additional_services.push("Таможенное оформление")
				break
			case "certification": additional_services.push("Сертификация")
				break
			case "product_check": additional_services.push("Инспекция товара на фабрике")
				break
			case "payment_from_the_contractor":
			additional_services.push("Оплата товара поставщику силами исполнителя")
				break
			case "insurance": additional_services.push("Страхование груза")
				break
		}
	})
	return additional_services;
} 