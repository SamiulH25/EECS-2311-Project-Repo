document.addEventListener("DOMContentLoaded", function () {
    let shoppingList = [];
    let selectedItems = new Set(); // Store selected items
  
    // Fetch items from JSON database
    fetch("/db/db.json")
      .then((res) => res.json())
      .then((data) => {
        displayItems(data);
      })
      .catch((error) => console.error("Error fetching items:", error));
  
    function displayItems(stores) {
      const container = document.createElement("div");
      container.id = "shopping-container";
      container.style.padding = "20px";
  
      const title = document.createElement("h2");
      title.innerText = "Select Items";
      container.appendChild(title);
  
      const itemList = document.createElement("div");
      itemList.id = "item-list";
      itemList.style.display = "grid";
      itemList.style.gridTemplateColumns = "repeat(2, 1fr)";
      itemList.style.gap = "10px";
  
      // Extract item names from all stores
      let items = new Set();
      stores.forEach((store) => {
        const storePrices = store.prices[0];
        Object.keys(storePrices).forEach((item) => items.add(item));
      });
  
      // Render items with checkboxes
      items.forEach((itemName) => {
        const itemDiv = document.createElement("div");
        itemDiv.style.padding = "10px";
        itemDiv.style.border = "1px solid #ccc";
        itemDiv.style.borderRadius = "5px";
        itemDiv.style.textAlign = "center";
        itemDiv.style.display = "flex";
        itemDiv.style.alignItems = "center";
        itemDiv.style.gap = "10px";
  
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = itemName;
        checkbox.style.cursor = "pointer";
  
        checkbox.addEventListener("change", function () {
          if (this.checked) {
            selectedItems.add(itemName);
          } else {
            selectedItems.delete(itemName);
          }
        });
  
        const label = document.createElement("label");
        label.innerText = itemName;
  
        itemDiv.appendChild(checkbox);
        itemDiv.appendChild(label);
        itemList.appendChild(itemDiv);
      });
  
      container.appendChild(itemList);
  
      // Add "Add to Shopping List" button
      const addButton = document.createElement("button");
      addButton.innerText = "Add Selected to Shopping List";
      addButton.style.marginTop = "20px";
      addButton.style.padding = "10px";
      addButton.style.border = "none";
      addButton.style.background = "blue";
      addButton.style.color = "white";
      addButton.style.borderRadius = "5px";
      addButton.style.cursor = "pointer";
      addButton.style.display = "block";
  
      addButton.addEventListener("click", addToShoppingList);
      container.appendChild(addButton);
  
      document.body.appendChild(container);
  
      // Shopping List Section
      const shoppingListTitle = document.createElement("h2");
      shoppingListTitle.innerText = "Shopping List";
      shoppingListTitle.style.marginTop = "20px";
      container.appendChild(shoppingListTitle);
  
      const shoppingListContainer = document.createElement("ul");
      shoppingListContainer.id = "shopping-list";
      shoppingListContainer.style.padding = "10px";
      shoppingListContainer.style.border = "1px solid #ccc";
      shoppingListContainer.style.borderRadius = "5px";
      shoppingListContainer.style.minHeight = "50px";
      shoppingListContainer.style.background = "#f9f9f9";
      container.appendChild(shoppingListContainer);
    }
  
    function addToShoppingList() {
      const listContainer = document.getElementById("shopping-list");
  
      selectedItems.forEach((itemName) => {
        if (!shoppingList.includes(itemName)) {
          shoppingList.push(itemName);
  
          const listItem = document.createElement("li");
          listItem.innerText = itemName;
          listItem.style.padding = "5px 0";
          listContainer.appendChild(listItem);
        }
      });
  
      selectedItems.clear(); // Reset selection after adding
      document.querySelectorAll("#item-list input[type='checkbox']").forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
  });
  