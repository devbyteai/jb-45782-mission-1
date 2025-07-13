const STORAGE_KEY = "products";
const products = loadProductsFromStorage();

function addProduct(event) {
    event.preventDefault();

    const product = getProductFromForm();
    addProductToList(product);
    saveProductsToStorage();
    updateCartDisplay();
    clearForm();
}

function getProductFromForm() {
    const name = document.getElementById("product-name").value;
    const price = document.getElementById("product-price").value;
    const category = document.getElementById("product-category").value;
    const image = document.getElementById("product-image").value;

    return { name, price, category, image };
}

function addProductToList(product) {
    products.push(product);
}

function clearForm() {
    document.getElementById("product-form").reset();
}

function updateCartDisplay() {
    const tbody = document.getElementById("cart-body");
    tbody.innerHTML = "";

    products.forEach((product, index) => {
        const productHTML = createCartItem(product, index);
        tbody.innerHTML += productHTML;
    });
}

function createCartItem(product, index) {
    return `
    <tr>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.category}</td>
      <td><img src="${product.image}"></td>
      <td><button onclick="removeProduct(${index})">Delete</button></td>
    </tr>
  `;
}

function removeProduct(index) {
    products.splice(index, 1);
    saveProductsToStorage();
    updateCartDisplay();
}

function saveProductsToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function loadProductsFromStorage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
}

updateCartDisplay();
