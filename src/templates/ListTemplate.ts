// Import the FullList class from the "../model/FullList" module
import FullList from "../model/FullList";

// Define the interface DOMList with properties and methods needed for rendering a list
interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

// Create a class ListTemplate that implements the DOMList interface
export default class ListTemplate implements DOMList {
  // Declare a property to hold the <ul> element where items will be rendered
  ul: HTMLUListElement;
  
  // Define a static instance property to hold a single instance of ListTemplate
  static instance: ListTemplate = new ListTemplate();

  // Private constructor to initialize the ListTemplate class
  private constructor() {
    // Get the <ul> element with the id "listItems" and assign it to the 'ul' property
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }

  // Implement the clear method defined in the DOMList interface to clear the list
  clear(): void {
    this.ul.innerHTML = "";
  }

  // Implement the render method defined in the DOMList interface to render the fullList
  render(fullList: FullList): void {
    // Clear the existing list items
    this.clear();

    // Loop through each item in the fullList and render them
    fullList.list.forEach((item) => {
      // Create a <li> element to represent the list item
      const li = document.createElement("li") as HTMLLIElement;
      li.className = "item";

      // Create a checkbox input element
      const check = document.createElement("input") as HTMLInputElement;
      check.type = "checkbox";
      check.id = item.id;
      check.tabIndex = 0;
      check.checked = item.checked;
      li.append(check);

      // Add an event listener to the checkbox to update the item's status in the fullList
      check.addEventListener("change", () => {
        item.checked = !item.checked;
        fullList.save();
      });

      // Create a label element for displaying the item text
      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = item.id;
      label.textContent = item.item;
      li.append(label);

      // Create a button element to remove the item
      const button = document.createElement("button") as HTMLButtonElement;
      button.className = "button";
      button.textContent = "X";
      li.append(button);

      // Add an event listener to the button to remove the item from the fullList
      button.addEventListener("click", () => {   
        fullList.removeItem(item.id);
        this.render(fullList);
      });

      // Append the list item (<li>) to the <ul> element
      this.ul.append(li);
    });
  }
}

/* 
In summary, the code defines a class ListTemplate that implements the DOMList interface. 
The ListTemplate class is responsible for rendering a list of items on the DOM based on the FullList object passed to it. 
The render method clears the existing list items, creates new DOM elements for each item in the FullList, and attaches event listeners for interactions with the items. 
This class follows the Singleton pattern with a static instance property to ensure only one instance exists.
*/