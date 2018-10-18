// Global Variables
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
