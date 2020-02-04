/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.

Started by creating mainDiv to attach page numbers to later.
Also queried the student list(works for 44, 54, and 64 student lists)
Set initial page number to 1, but that will change as buttons are pushed.
Also set to 10 students per page.  I also ran it at perPage at 15, and that worked accurately as well.

***/
const mainDiv = document.querySelector('.page');
const studentList = document.querySelectorAll('ul li');

var pageNum = 1;
var perPage = 10;




/*** 
   Create the `showPage` function.  Iterates through all listed students, shows the correct ones, and hides the rest.
   Currently using studentList for my list, but as I add the search parameters, I can pass any list into it.
***/
function showPage(studentList) {
   const firstShown = (pageNum * perPage) - perPage;
   const lastShown = (pageNum * perPage);
   
   for (let i = 0; i < studentList.length; i += 1) {
      let li = studentList[i];
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


function appendPageLinks() {
   const numPages = Math.ceil(studentList.length / perPage);
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
   showPage(studentList);
}

//run appendPageLinks function, to generate initial page.
appendPageLinks();

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