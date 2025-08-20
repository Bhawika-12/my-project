// Array of product objects with name and category
const products = [
    { name: "Nike Air Max", category: "shoes" },
    { name: "Polo T-Shirt", category: "shirts" },
    { name: "Smart Watch", category: "gadgets" },
    { name: "Adidas Running Shoes", category: "shoes" },
    { name: "Bluetooth Speaker", category: "gadgets" },
    { name: "Formal Shirt", category: "shirts" }
];

// Get references
const categoryDropdown = document.getElementById("category");
const productList = document.getElementById("productList");

// Function to display products
function displayProducts(filteredProducts) {
    productList.innerHTML = ""; // clear old items

    filteredProducts.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product");
        div.setAttribute("data-category", product.category);
        div.textContent = product.name;
        productList.appendChild(div);
    });
}

// Initial load (show all)
displayProducts(products);

// Event listener for dropdown change
categoryDropdown.addEventListener("change", function () {
    const selectedCategory = this.value;

    if (selectedCategory === "all") {
        displayProducts(products); // show all
    } else {
        const filtered = products.filter(p => p.category === selectedCategory);
        displayProducts(filtered);
    }
});
