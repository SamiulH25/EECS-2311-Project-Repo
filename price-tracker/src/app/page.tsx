import Image from "next/image";
import ShoppingList from "./ShoppingList";

export default function Home() {
  return (
    <>
      <div className="container mx-auto px-4">
        <h1>Hello world</h1>
        <p>
          This is content to make the page longer.<br></br>
          Lots of content.<br></br><br></br>

          lines<br></br>
          lines<br></br>
          lines<br></br><br></br>
          Eventually will be filled up with lots of relevant content.
        </p>
        <div className="w-full h-screen bg-yellow-400"></div>
        <p>
          End of page, to be replaced with a footer.
        </p>
      </div>
    </>
  );
}