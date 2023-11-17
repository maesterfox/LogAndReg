// const person = {
//   name: "David",
//   walk() {},
//   talk() {
//     console.log(this);
//   },
// };

// person.talk();
// person.name = "";

// const targetMember = "name";
// person["name"] = "John";

// function sayHello() {
//   for (var i = 0; i < 5; i++) {
//     console.log(i);
//   }
// }

// sayHello();

// if ("geolocation" in navigator) {
//   navigator.geolocation.getCurrentPosition(
//     function (position) {
//       console.log("Latitude: " + position.coords.latitude);
//       console.log("Longitude: " + position.coords.longitude);
//     },
//     function (error) {
//       console.log("Error occurred: " + error.message);
//     }
//   );
// } else {
//   console.log("Geolocation is not supported by this browser.");
// }

// Object literal
// const book1 = {
//   title: "Book 1",
//   author: "john",
//   year: "2013",
//   getSummary: function () {
//     return `${this.title} was written by ${this.author} in ${this.year}`;
//   },
// };

// const book2 = {
//   title: "Book 2",
//   author: "jane",
//   year: "2018",
//   getSummary: function () {
//     return `${this.title} was written by ${this.author} in ${this.year}`;
//   },
// };

// console.log(book1.getSummary());

// Constructor

// class Book {
//   constructor(title, author, year) {
//     this.title = title;
//     this.author = author;
//     this.year = year;
//   }

//   getSummary() {
//     return `${this.title} was written by ${this.author} in ${this.year}`;
//   }

//   getAge() {
//     const years = new Date().getFullYear() - this.year;
//     return `${this.title} is ${years} years old`;
//   }

//   revise(newYear) {
//     this.year = newYear;
//     this.revised = true;
//   }
// }

// Initiate Object

// const book1 = new Book("The Prince", "Machiavelli", "1532");
// const book2 = new Book("American Psycho", "Bret Easton Ellis", "1991");

// displayBooks([book1, book2]);

// function displayBooks(books) {
//   const tableBody = document.getElementById("inner");
//   tableBody.innerHTML = "";
//   for (const book of books) {
//     const row = `
//               <tr>
//                   <td>${book.title}</td>
//                   <td>${book.author}</td>
//                   <td>${book.year}</td>
//               </tr>
//           `;
//     tableBody.insertAdjacentHTML("beforeend", row);
//   }
// }

// console.log(displayBooks);

let num = 3;
let newNum = 3.16;

console.log(typeof num);
console.log(typeof newNum);

let mill = 1e6;
console.log(mill);

let smallNum = 1e-6;
console.log(smallNum);

let score = new Number(100);
console.log(newNum.toExponential());
