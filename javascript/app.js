const loadProducts = (produtos, idDivParent) => {
    const parentDiv = document.querySelector(idDivParent)
    produtos.forEach( produto => {
        const html = `
        <article class="prato">
        <img src="${produto.image}" alt="${produto.title}">
        <h4>${produto.title}</h4>
        <h4>R$ ${produto.value}</h4>
        <p>${produto.description}</p>
        <button type="button" onclick="modalTrigger(${produto.id})">Quero este prato</button>
        </article>
        `
        parentDiv.insertAdjacentHTML('Beforeend', html)
    })
}

const modalTrigger = (productId) => {
    const modal = document.querySelector('.modal')

    if(productId != null) {
        const produto = produtos.filter(produto => produto.id == productId)[0]
        if(produto != null){
            modal.querySelector('#title').value = produto.title
        }
    } 

    modal.classList.contains('hide') == true ? modal.classList.remove('hide') : modal.classList.add('hide')
    
}

const whatsappLinkGeneretor = (phoneNumber, productTitle, productQuantity, buyerName, buyerAddress, buyerPayment) => `https://api.whatsapp.com/send?phone=${phoneNumber}&text=Olá eu quero: 
${productQuantity} ${productTitle} - Entregar para ${buyerName} no endereço: ${buyerAddress} - A forma de pagamento será: ${buyerPayment}`
    
const checkout = phoneNumber => {
    const form = document.querySelector('#form-product')

    form.addEventListener('submit', e => {
        e.preventDefault()

        const productTitle = form.querySelector('input#title').value
        const productQuantity = form.querySelector('input#quantity').value
        const buyerName = form.querySelector('input#name').value
        const buyerAddress = form.querySelector('input#address').value
        const buyerPayment = form.querySelector('select#payment').value
        
        const whatsappurl = whatsappLinkGeneretor(phoneNumber, productTitle, productQuantity, buyerName, buyerAddress, buyerPayment )
        window.location.href = whatsappurl
    })
}


loadProducts(produtos, '#product-div')
checkout('5584900000000')
