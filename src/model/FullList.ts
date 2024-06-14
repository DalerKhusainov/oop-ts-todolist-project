// Import the ListItem class from the "./ListItem" module
import ListItem from "./ListItem";

// Define the interface List with properties and methods for managing a list of ListItem objects
interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}

// Create a class FullList that implements the List interface
export default class FullList implements List {
  // Define a static instance property to hold a single instance of FullList
  static instance: FullList = new FullList();
  
  // Private constructor to initialize the FullList class with an optional initial list of items
  private constructor(private _list: ListItem[] = []) {}

  // Getter method to access the list of ListItem objects
  get list(): ListItem[] {
    return this._list;
  }

  // Method to load the list of items from localStorage
  load(): void {
    // Retrieve the stored list from localStorage
    const storedList: string | null = localStorage.getItem("myList");
    // Check if the storedList is not a string and return if it is null
    if (typeof storedList !== "string") return;

    // Parse the storedList into an array of objects
    const parsedList: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(storedList);

    // Iterate through the parsedList and create new ListItem objects
    parsedList.forEach((itemObj) => {
      const newListItem = new ListItem(
        itemObj._id,
        itemObj._item,
        itemObj._checked
      );
      // Add the new ListItem to the FullList instance
      FullList.instance.addItem(newListItem);
    });
  }

  // Method to save the current list of items to localStorage
  save(): void {
    localStorage.setItem("myList", JSON.stringify(this._list));
  }

  // Method to clear the list of items
  clearList(): void {
    this._list = [];
    this.save();
  }

  // Method to add a new ListItem to the list
  addItem(itemObj: ListItem): void {
    this._list.push(itemObj);
    this.save();
  }

  // Method to remove a ListItem from the list based on its id
  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }
}

/*
In summary, the code defines a class FullList that implements the List interface. 
The class includes methods to load, save, clear, add, and remove items from a list. 
The load method retrieves the list of items from the localStorage, the save method stores the list of items to localStorage, the clearList method clears the list, the addItem method adds a new item to the list, and the removeItem method removes an item from the list by its id. 
The class follows the Singleton pattern with a static instance property to ensure only one instance exists.
*/ 