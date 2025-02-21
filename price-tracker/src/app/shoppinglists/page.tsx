import React from "react";
import ShoppingList from "../ShoppingList";

const ShoppingLists = () => {
  return (
    <>
      <div className="container mx-auto px-4">
        <h1>Hello world 2</h1>
        <p>
          This is content to make the page longer.<br></br>
          Lots of content.<br></br><br></br>

          lines<br></br>
          lines<br></br>
          lines
        </p>
        <ShoppingList />
        <div className="w-full h-screen bg-yellow-400"></div>
        <p>
          End of page, to be replaced with a footer.
        </p>
      </div>
    </>
  );
};

export default ShoppingLists;