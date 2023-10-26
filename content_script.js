// Put all the javascript code here, that you want to execute after page load.
document.addEventListener('load', main(), false)

function main(){
    if (location.href.includes('portswigger.net')){
        portswiggerMain();
    }
    if (location.href.includes('web-security-academy.net')){
        labMain();
    }
}

function portswiggerMain(){
    console.log('portswiggerMainFired!');
    let examButton = document.createElement('button');
    examButton.classList = 'button-orange-small';
    examButton.innerText = 'Mystery Lab';
    document.getElementsByClassName('login-buttons')[0].appendChild(examButton); 
    examButton.addEventListener('click', ()=>{
        fetch('https://portswigger.net/web-security/all-labs')
        .then((r)=>r.text())
        .then((data)=>{
            let d = new DOMParser().parseFromString(data, 'text/html');
            let links = d.getElementById('all-labs').getElementsByTagName('a');
            let randomIndex = Math.round(Math.random() * links.length);
            randomLab = links[randomIndex];
            fetch(randomLab.href)
            .then((r)=>r.text())
            .then((data)=>{
                let x = new DOMParser().parseFromString(data, 'text/html');
                let labUrl = x.getElementsByClassName('icon-erlenmeyer')[0].parentElement.href;
                window.open(labUrl);
            })
        });
    })
}


// Spawn a lab challenge

function labMain(){
    censorLabTitle('MysteryLab');
}

// Censor the title of the lab
function censorLabTitle(title){
    let academyLabHeader = document.getElementById('academyLabHeader')
    academyLabHeader.getElementsByTagName('h2')[0].innerText = title;
    document.title = title;
}
