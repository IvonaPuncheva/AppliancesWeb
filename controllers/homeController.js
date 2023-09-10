const router = require('express').Router();


router.get('/', (req,res)=>{
    console.log(req.user)
    res.render('home')
})


router.get('/aboutUs', (req,res)=>{
    res.render('home/aboutus');
})

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}
router.get('/contacts', (req,res)=>{
    res.render('home/Contacts');
})
router.get('/delivery', (req,res)=>{
    res.render('home/Delivery');
})
router.get('/warranty', (req,res)=>{
    res.render('home/Warranty');
})

function updateCart() {
    const cartList = document.getElementById("cart");
    const totalSpan = document.getElementById("total");

    cartList.innerHTML = "";
    total = 0;

    cart.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        const removeButton = document.createElement("button");
        removeButton.textContent = "Премахни";
        removeButton.onclick = () => removeFromCart(index);
        listItem.appendChild(removeButton);
        cartList.appendChild(listItem);
        total += item.price;
    });

    totalSpan.textContent = total.toFixed(2);
}

function checkout() {
    // Тук можете да добавите логика за обработка на поръчката и плащане
    alert("Поръчката е изпратена!");
    cart = []; // Изчистване на количката след успешно плащане
    updateCart();
}

module.exports = router;