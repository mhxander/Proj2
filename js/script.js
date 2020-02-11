/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/*** 
Started by creating mainDiv to attach page numbers to later.
Also queried the student list(works for 44, 54, and 64 student lists)
Set initial page number to 1, but that will change as buttons are pushed.
Also set to 10 students per page.  I also ran it at perPage at 15, and that worked accurately as well.
Set initial searchStudents array at a blank array.
Created pageHeader, where the Search items will be appended to.
***/
const mainDiv = document.querySelector('.page');
const studentList = document.querySelectorAll('ul li');

var pageNum = 1;
var perPage = 10;

let searchStudents = [];
const pageHeader = document.querySelector('.page-header');

//Create Search bar and Search button
const searchDiv = document.createElement('div');
const searchBox = document.createElement('input');
const searchButton = document.createElement('button');
pageHeader.appendChild(searchDiv);
searchDiv.appendChild(searchBox);
searchDiv.appendChild(searchButton);

//Define Search Bar
searchDiv.className = 'student-search';
searchButton.textContent = 'Search';
searchBox.placeholder = 'Search within students...';

//If no results...
const noResultsDiv = document.createElement('div');
const noResultsMessage = document.createElement('h3');
noResultsMessage.textContent = 'Sorry, no one by that name.';
noResultsDiv.appendChild(noResultsMessage);
noResultsMessage.style.display = 'none';
mainDiv.appendChild(noResultsDiv);

//Function to remove page links    Work in progress...
// function removePageLinks() {
//    document.getElementsByClassName('pagination')[0].innerHTML = ' ';
//    mainDiv.firstChild.removeChild(document.querySelector('pagination'));
// }

//Create search function
function searchList(list) {
   for (let i = 0; i < list.length; i += 1) {
      const li = list[i];
      const name = li.firstElementChild.nth-Child[1];
      if(searchBox.textContent.length !== 0 && name.textContent.toLowerCase().includes(searchBox.textContent.toLowerCase())) {
         searchStudents.push(li);
      } else {
         li.style.display = 'none';
      }
   }
   console.log(searchStudents);
   if (searchStudents.length === 0) {
      noResultsDiv.style.display = '';
   } else {
      noResultsDiv.style.display = 'none';
   }
   appendPageLinks(searchStudents);
   searchStudents = [];
}

//create click and keyup event listeners, then remove old page links, and run appendPageLinks to add new ones and show the list
searchButton.addEventListener('click', (e) => {
   // removePageLinks();
   searchList(studentList);
})

searchBox.addEventListener('keyup', () => {
   // removePageLinks();
   searchList(studentList);
})


/*** 
   Create the `showPage` function.  Iterates through all listed students, shows the correct ones, and hides the rest.
   List could either be studentList for full list, or searchStudents when searching
***/
function showPage(list) {
   const firstShown = (pageNum * perPage) - perPage;
   const lastShown = (pageNum * perPage);
   
   for (let i = 0; i < list.length; i += 1) {
      let li = list[i];
      if (i < lastShown && i >= firstShown) {
         li.style.display = '';
      } else {
         li.style.display = 'none';
      }
   }
}

/*** 
   Created the `appendPageLinks' function.
   Created Elements for div, ul, il, and a.
   If only one page is needed, I took the page numbers off the screen.
   Appended a to li, li to ul, ul to div, and eventually, div to mainDiv.
   Set first page link to 'active', which will change with the event listner which I created next.
// ***/


function appendPageLinks(list) {
   const numPages = Math.ceil(list.length / perPage);
   const div = document.createElement('div');
   const ul = document.createElement('ul');
   ul.className = 'pagination';
   if (numPages === 1) {
      div.appendChild(ul);
   } else {
      for (let i = 1; i <= numPages; i += 1) {
         const li = document.createElement('li');
         const a = document.createElement('a');
         a.href = '#';
         a.textContent = i;
         li.appendChild(a);
         ul.appendChild(li);
         div.appendChild(ul);
      }
   }
   mainDiv.appendChild(div);
   ul.firstElementChild.firstElementChild.className = 'active';
   showPage(list);
}

//run appendPageLinks function, to generate initial page.
appendPageLinks(studentList);

/*
Create event listener for the links.
Set it on the Main Div, because I created it as a universal variable above.
Set the new target to active, and took active status off previous page.
Set pageNum to the new page number, and then ran showPage function, to show new page and correct list.
*/
mainDiv.addEventListener('click', (e) => {
   const newPage = event.target;
   const activeLink = document.querySelector('.active');
   pageNum = newPage.textContent;
   activeLink.className = '';
   newPage.className = 'active';
   showPage(studentList);
})