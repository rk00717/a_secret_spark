var current_index = 0;
var content_data = null;

async function initialize() {
    await fetchData();
    showText();
}

async function fetchData() {
    await fetch('./data/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            content_data = data;
            // console.log(content_data);
            console.log("data fetched...");
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
}
    
function showText() {
    if(content_data === null) {
        console.log("data not found. Returning...");
        return;
    }

    setButton(false);
    typeText(content_data[current_index], content, 24, ()=>{
        setButton(true);
    });
    
    if(current_index < content_data.length-1) {
        current_index ++;
        console.log(current_index);
    }
}

function typeText(content, container, time, callback) {
    let index = 0;
    let tempHTML = '';
    
    function type() {
        if (index < content.length) {
            tempHTML += content[index];
            container.innerHTML = tempHTML;
            index++;
            setTimeout(type, time);
        } else if(callback) {
            callback();
        }
    }
    
    type();
}

function setButton(status) {
    if(!status) {
        contentBtn.classList.add("hidden");
    }else {
        contentBtn.classList.remove("hidden");
    }
}