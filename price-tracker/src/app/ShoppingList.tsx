"use client";
import { useState, useEffect } from "react";

export default function ShoppingList() {
  const [items, setItems] = useState<Set<string>>(new Set());
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [shoppingList, setShoppingList] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);

  // Load shopping list from localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem("shoppingList");
    if (savedItems) {
      setShoppingList(JSON.parse(savedItems));
    }
  }, []);

  // Fetch items when switching to selection mode
  useEffect(() => {
    if (isSelecting) {
      fetch("/db/db.json")
        .then((res) => res.json())
        .then((data) => {
          const extractedItems = new Set<string>();
          data.forEach((store: any) => {
            const storePrices = store.prices[0];
            Object.keys(storePrices).forEach((item) => extractedItems.add(item));
          });
          setItems(extractedItems);
        })
        .catch((error) => console.error("Error fetching items:", error));
    }
  }, [isSelecting]);

  // Handle checkbox selection
  const handleCheckboxChange = (itemName: string) => {
    setSelectedItems((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(itemName)) {
        newSelection.delete(itemName);
      } else {
        newSelection.add(itemName);
      }
      return newSelection;
    });
  };

  // Save selection and return to main shopping list
  const saveSelection = () => {
    localStorage.setItem("shoppingList", JSON.stringify(Array.from(selectedItems)));
    setShoppingList(Array.from(selectedItems));
    setIsSelecting(false);
  };

  return (
    <div className="p-6">
      {isSelecting ? (
        // ✅ Selection Mode (Choose Items)
        <div className="text-left">
          <h2 className="text-2xl font-bold mb-4">Select Items</h2>
          {items.size > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {Array.from(items).map((itemName) => (
                <div key={itemName} className="flex items-center gap-3 border p-3 rounded">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={selectedItems.has(itemName)}
                    onChange={() => handleCheckboxChange(itemName)}
                  />
                  <label>{itemName}</label>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No items found. Try refreshing.</p>
          )}
          <button
            onClick={saveSelection}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save & Go Back
          </button>
        </div>
      ) : (
        // ✅ Shopping List Mode (Display Selected Items)
        <div className="text-left">
          <button
            onClick={() => setIsSelecting(true)}
            className="mb-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Select Items
          </button>

          <h2 className="text-xl font-bold mt-6">Shopping List</h2>
          <ul className="mt-2 list-disc pl-5">
            {shoppingList.length > 0 ? (
              shoppingList.map((item, index) => <li key={index}>{item}</li>)
            ) : (
              <p>No items added yet.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
