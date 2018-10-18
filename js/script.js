const studentsList  = document.querySelector(".student-list");
const students      = Array.from(studentsList.children);
const studentsNum   = studentsList.children.length;
let shownStudents;
const mainDiv       = document.querySelector('.page');
const filterDiv     = document.createElement('div');
let searchedList    = Array.from(students);


// a function that takes a list of students and page index as inputs and returns a new list of the ten students on that list
function pageEdit(studentsList, pageIndex){
    firstIndex = Math.ceil((pageIndex - 1) * 10);
    lastIndex  = firstIndex + 9;
    newList    = [];

    // a loop over the main list and append the required indeces to the new initialized list
    for(let i = firstIndex; i <= lastIndex; i++){
        if(studentsList[i]){
            newList.push(studentsList[i]);
        }
    }
    return newList;
}


// a function that takes a list of students and a page index as inputs and show only the ten required students
function showPage(studentsList, pageIndex){
    shownStudents = pageEdit(studentsList, pageIndex);
    students.forEach((student, index) => {
        if(shownStudents.indexOf(student) != -1){
            student.style.display = "block";
        } else {
            student.style.display = "none";
        }
    })
}

// a function that takes the number of students as an input and append to the DOM the pagination links needed
function createPagination(studentsNum){
    const pageNum = Math.ceil(studentsNum / 10);
    const ul      = document.createElement('ul');

    // a loop that creates each pagination link and adds it to the DOM with the first link active
    for(let i = 0; i < pageNum; i++){

        const link = document.createElement('li');
        const aTag = document.createElement('a');
        aTag.href = '#';
        aTag.textContent = i + 1;
        if(i === 0){
            aTag.classList.add('active');
        }
        link.appendChild(aTag);
        ul.appendChild(link);
    }

    filterDiv.appendChild(ul);
    filterDiv.classList.add('pagination');
    mainDiv.appendChild(filterDiv);
}


// Listenenig to click events on the pagination links
filterDiv.addEventListener('click', (e) => {
    const targetedLink = e.target;
    const listItems    = filterDiv.children[0].children;
    const index        = parseInt(targetedLink.textContent);

    // remove "active" class from all list anchor tags
    for(let i = 0; i < listItems.length; i++){
        listItems[i].children[0].classList.remove('active');
    }

    // adding active mood to the current page only
    targetedLink.classList.add('active');

    // showing the students that exist on the specific index the user wants
    showPage(searchedList, index);
})

/*-----------------------------------------
-------------------------------------------
Search Bar addition and pagination response
-------------------------------------------
-----------------------------------------*/

// Creating search bar
const pageHeader  = document.querySelector('.page-header');

function createElement(elementName, property, value){
    const element = document.createElement(elementName);
    element[property] = value;
    return element;
}

function append(parent, children){
    for(let i = 0; i < children.length; i++){
        parent.appendChild(children[i]);
    }
}

const searchBar   =
    createElement('div', 'classList', 'student-search');
const searchInput =
    createElement('input','placeholder', 'Search for students...');
const searchBtn   =
    createElement('button', 'textContent', 'Search');

append(searchBar, [searchInput, searchBtn]);
append(pageHeader, [searchBar]);


// Adding search functionality
function search(){
        // Assure the search input is lower case to let the user search in upper case letters and still get the results
    const search = searchInput.value.toLowerCase();
    searchedList = [];

    for(let student of students){
        const studnetName =
            student.querySelector('h3').textContent.toLowerCase();

        if(studnetName.indexOf(search) == -1){
            student.style.display = 'none';
        } else {
            student.style.display = 'block';
            searchedList.push(student);
        }
    }

    // clearing the old pagination links
    const unOrderedList = filterDiv.querySelector('ul');
    unOrderedList.remove();

    if(searchedList.length === 0){
        alert("No matching results...");
    }

    // Initializing new pagination links that match the new search results
    createPagination(searchedList.length, 1);
    showPage(searchedList, 1);
}

// Listening to the keyboard keyup events
searchBar.addEventListener('keyup', (e) => {
    search();
})

// Listenenig to the search button click event
searchBtn.addEventListener('click', (e) => {
    search();
})

// Initializing the page with the first 10 students and pagination links that match number of pages
createPagination(students.length);
showPage(students, 1);
