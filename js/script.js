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
paginationLinks(studentsNum);


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


// Initializing the page with the first 10 students and the first pagination link in the active mode
showLimit(students, 1);
