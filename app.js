// If user adds any note, add it to the localStorage
{
    let addBtn = document.getElementById('addBtn');
    let textarea = document.getElementById('textarea');
    let caption = document.getElementById('caption');
    let noteDiv = document.getElementById('notes');

    // get item from localStorage and assign it into the notesArray
    let notes = localStorage.getItem('notes'); // it is JSON format
    let notesArray; // here I will create an Array for the values of textarea  
    if (notes) {
        notesArray = JSON.parse(notes); // here JSON.parse create an Array
    } else {
        notesArray = [];
    };
    showNotes();

    // funtion to add new note
    const addNotes = () => {

        if(textarea.value){

            if(caption.value){
                const noteObj = {
                    title: caption.value,
                    note: textarea.value
                };
                notesArray.push(noteObj); // array of object
    
                localStorage.setItem('notes', JSON.stringify(notesArray)); // JSON.stingify create a json file in the local storage
                textarea.value = '';
                caption.value = '';
                showNotes();

                document.getElementById('writeCaption').style.display ="none";
            }else{
                document.getElementById('writeCaption').style.display ="block";
            };

            document.getElementById('writeNote').style.display ="none";    
        } else{
            document.getElementById('writeNote').style.display ="block";
        };
       
    };
    addBtn.addEventListener('click', addNotes);

    // funtion to show notes from local storage
    function showNotes() {   
        let html = '';
        notesArray.forEach((noteObject, index) => {
            html += `<div class="cardNote card m-2" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">Note ${index + 1}</h5>
                            <p class="card-text"><strong>Caption:</strong> ${noteObject.title}</p>
                            <p class="card-text">${noteObject.note}</p>
                            <button onclick="deleteNotes(this.id)" id="${index}" class="btn btn-primary" style="margin-top:10px;">Delete Note</button>
                        </div>
                    </div>`;
        });

        if(notesArray.length != 0){
            noteDiv.innerHTML = html
        }else {
            noteDiv.innerHTML = `Nothing to show! Use "Add a Note" section above to add note.`;
        }
    };

    // function to delete note
    function deleteNotes(index) { // arrow func will not work here
        notesArray.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notesArray));        
        showNotes();
    };

    // searching note
    let searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', () => {
        let inputValue = searchInput.value.toLowerCase();
        let noteCards = document.getElementsByClassName('cardNote'); // HTML collection

        Array.from(noteCards).forEach((element)=>{
            let noteText = element.getElementsByTagName('p')[1].textContent.toLowerCase(); // only text of <p> tag
            
            if(noteText.includes(inputValue)){
                element.style.display = "block";
            }else {
                element.style.display = "none";
            };
        });

    });

}