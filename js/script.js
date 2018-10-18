/*// Global Variables
const studentsList = document.querySelector(".student-list");
const students     = studentsList.children;
const studentsNum  = studentsList.children.length;
const mainDiv      = document.querySelector('.page');
const filterDiv    = document.createElement('div');


// a function that takes a list and a page index as inputs and filters list items to show only the students in that page
function showLimit(list, idx){

    // creating a range of students' names to show on a single page
    const firstStudentIndex = (idx - 1) * 10;
    const lastStudentIndex  = firstStudentIndex + 9;

    // Loop over the whole students list and show only the ones on the given index
    for (let i = 0; i < studentsNum; i++){
        if (i >= firstStudentIndex && i <= lastStudentIndex){
            students[i].style.display = 'block';
        } else {
            students[i].style.display = 'none';
        }
    }
}



// a function that creates pagination links based on the number of students that is given as an input
function paginationLinks(studentsNum){
    const linksNum  = Math.ceil(studentsNum / 10);

    // a loop that creates each pagination link and adds it to the DOM with the first link active
    for(let i = 0; i < linksNum; i++){
        const link = document.createElement('li');
        const aTag = document.createElement('a');
        aTag.href = '#';
        aTag.textContent = i + 1;
        if(i === 0){
            aTag.classList.add('active');
        }
        link.appendChild(aTag);
        filterDiv.appendChild(link);
    }

    filterDiv.classList.add('pagination');
    mainDiv.appendChild(filterDiv);
}



// Listenenig to click events on the pagination links
filterDiv.addEventListener('click', (e) => {
    // e.preventDefault();
    const targetedLink = e.target;
    const listItems    = filterDiv.children;
    const index        = parseInt(targetedLink.textContent);

    // remove "active" class from all list anchor tags
    for(let i = 0; i < listItems.length; i++){
        listItems[i].children[0].classList.remove('active');
    }

    targetedLink.classList.add('active');
    showLimit(students, index);
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


/*
// Adding search functionality
searchBar.addEventListener('keyup', (e) => {
    const search = searchInput.value.toLowerCase();

    for(let student of students){
        const studnetName =
            student.querySelector('h3').textContent.toLowerCase();

        if(studnetName.indexOf(search) == -1){
            student.style.display = 'none';
        } else {
            student.style.display = 'block';
        }
    }
})



// Initializing the page with the first 10 students and the first pagination link in the active mode
showLimit(students, 1);
paginationLinks(studentsNum);
*/
const studentsList  = document.querySelector(".student-list");
const students      = Array.from(studentsList.children);
const studentsNum   = studentsList.children.length;
let shownStudents;
const mainDiv       = document.querySelector('.page');
const filterDiv     = document.createElement('div');


function pageEdit(studentsList, pageIndex){
    firstIndex = Math.ceil((pageIndex - 1) * 10);
    lastIndex = firstIndex + 9;
    newList = [];

    for(let i = firstIndex; i <= lastIndex; i++){
        if(studentsList[i]){
            newList.push(studentsList[i]);
        }
    }
    return newList;
}

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

function createPagination(studentsNum){
    const pageNum = Math.ceil(studentsNum / 10);
    const ul   = document.createElement('ul');

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

let searchedList = Array.from(students);
// Listenenig to click events on the pagination links
filterDiv.addEventListener('click', (e) => {
    const targetedLink = e.target;
    const listItems    = filterDiv.children[0].children;
    const index        = parseInt(targetedLink.textContent);

    // remove "active" class from all list anchor tags
    for(let i = 0; i < listItems.length; i++){
        listItems[i].children[0].classList.remove('active');
    }

    targetedLink.classList.add('active');
    showPage(searchedList, index);
})

// Adding search functionality
searchBar.addEventListener('keyup', (e) => {
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
    const unOrderedList = filterDiv.querySelector('ul');
    unOrderedList.remove();
    createPagination(searchedList.length, 1);
    showPage(searchedList, 1);
})

createPagination(students.length);
showPage(students, 1);

