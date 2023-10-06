/**
 * add class active
 * @param {*} event 
 */
export  const setActive = (event) => {
  const activeBtns = document.querySelectorAll('.active')
  activeBtns.forEach(el => {
    el.classList.remove('active')
  })
  event.target.classList.add('active')
}