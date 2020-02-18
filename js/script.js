/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/*** 
Started by creating mainDiv to attach page numbers to later.
Also queried the student list(works for 44, 54, and 64 student lists)
Set initial page number to 1, but that will change as buttons are pushed.
Also set to 10 students per page.  I also ran it at perPage at 15, and that worked accurately as well.
Created pageHeader, where the Search items will be appended to.
Set searchStudents to a null set to start.
***/
const mainDiv = document.querySelector('.page');
const studentList = document.querySelectorAll('ul li');

var pageNum = 1;
var perPage = 10;
var count = 0;
const pageHeader = document.querySelector('.page-header');
let searchStudents = [];

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
noResultsDiv.className = 'noResult';
noResultsMessage.textContent = 'Sorry, no one by that name.';
noResultsDiv.appendChild(noResultsMessage);
noResultsMessage.style.display = 'none';
mainDiv.appendChild(noResultsDiv);

//Create search function
function searchList(list) {
   searchStudents = [];
   for (let i = 0; i < list.length; i += 1) {
      const li = list[i];
      const name = li.firstElementChild.querySelector(':nth-Child(2)');
      if(searchBox.value.length !== 0 && name.textContent.toLowerCase().includes(searchBox.value.toLowerCase())) {
         searchStudents.push(li);
      }
   }
   console.log(searchStudents.length);
   //clear previous list
   for (i = 0; i < studentList.length; i += 1) {
      const li = list[i];
      li.style.display = 'none';
   }
   //check searchStudents length.  If empty, display no results message.  If not, show list.
   let removePag = document.querySelector('.pagination');
   if (searchStudents.length === 0) {
      noResultsMessage.style.display = '';
      noResultsDiv.style.display = '';
      removePag.style.display = 'none';
      count = 0;
   } else {
      count = 1
      removePag.style.display = '';
      noResultsDiv.style.display = 'none';
      showPage(searchStudents);
      appendPageLinks(searchStudents);
      pageNum = 1;
   }
}

//create click and keyup event listeners, and run appendPageLinks, and show the list.
searchButton.addEventListener('click', (e) => {
   pageNum = 1;
   searchList(studentList);
   appendPageLinks(searchStudents);
   showPage(searchStudents);
})

searchBox.addEventListener('keyup', (e) => {
   pageNum = 1;
   searchList(studentList);
   appendPageLinks(searchStudents);
   showPage(searchStudents);
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
   if (document.querySelector('.pagination') !== null) {
      let removePageNum = document.querySelector('.pagination');
      mainDiv.lastElementChild.removeChild(removePageNum);
   }
   const numPages = Math.ceil(list.length / perPage);
   const pageDiv = document.querySelector('pagination');
   const div = document.createElement('div');
   const ul = document.createElement('ul');
   ul.className = 'pagination';

   if (numPages <= 1) {
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
      ul.firstElementChild.firstElementChild.className = 'active';
   }
   mainDiv.appendChild(div);
}

//run appendPageLinks function, to generate initial page.
appendPageLinks(studentList);
showPage(studentList);

/*
Create event listener for the links.
Loop through, and set it on each page number link.
Set the new target to active, and took active status off previous page.
Set pageNum to the new page number, and then ran showPage function, to show new page and correct list.
*/
const clicked = document.querySelectorAll('a');
for (i = 0; i < clicked.length; i++) {
   clicked[i].addEventListener('click', event => {
      const newPage = event.target;
      const activeLink = document.querySelector('.active');
      pageNum = newPage.textContent;
      console.log(pageNum);
      activeLink.className = '';
      newPage.className = 'active';
      showPage(studentList);
      if (count = 0) {
         showPage(studentList);
      } else {
         showPage(searchStudents);
      };
   });
};