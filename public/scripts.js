
document.addEventListener("DOMContentLoaded", function () {
    const name1Input = document.getElementById("name1");
    const name2Input = document.getElementById("name2");

    // Event listener for pressing Enter key in both input fields
    name1Input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            showLoading();
        }
    });

    name2Input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            showLoading();
        } 
    });
});  


function showLoading() {
    document.getElementById("result").textContent = "";
    document.querySelector(".result").style.display = "none";
    document.getElementById("loading").style.display = "block";
    setTimeout(calculateFLAMES, 3000);
}

function calculateFLAMES() {
    const name1 = document.getElementById("name1").value.toLowerCase().replace(/[^a-zA-Z]/g, '');
    const name2 = document.getElementById("name2").value.toLowerCase().replace(/[^a-zA-Z]/g, '');

    if (name1 === "" || name2 === "") {
        document.getElementById("loading").style.display = "none";
        document.getElementById("result").textContent = "Please enter both names.";
        document.querySelector(".result").style.display = "block";
        return;
    }

    const count = getRemainingCount(name1, name2);
    const result = getFLAMESResult(count);
    document.getElementById("loading").style.display = "none";
    document.getElementById("result").textContent = result;
    document.querySelector(".result").style.display = "block";


    // Log to the server
    fetch('/log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name1, name2, result })
    }).then(response => {
        if (response.ok) {
            console.log('Data logged successfully');
        } else {
            console.error('Failed to log data');
        }
    }).catch(error => {
        console.error('Error:', error);
    });
}

function getRemainingCount(name1, name2) {
    let copyname1 = name1;
    for (let ch of copyname1) {
        if (name2.includes(ch)) {
            name1 = name1.replace(ch, "");
            name2 = name2.replace(ch, "");
        }
    }
    return name1.length + name2.length;
}

function getFLAMESResult(count) {
    const flames = ["Friends...👫", "Love...❤️", "Affection...😊", "Marriage...💍", "Enemy...👿", "Siblings...👭"];
    let index = 0;

    while (flames.length > 1) {
        index = (index + count - 1) % flames.length;
        flames.splice(index, 1);
    }

    return flames[0];
}
