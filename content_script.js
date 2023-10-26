document.addEventListener('load', main(), false)

function main(){
    if (location.href.includes('portswigger.net')){
        injectButton();
    }
    if (location.href.includes('exploit-server.net')){
        censorLabTitle('Exploit Server');
    }
    if (location.href.includes('web-security-academy.net')){
        censorLabTitle('MysteryLab');
    }
}

function injectButton(){
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
            let randomIndex = Math.round(Math.random() * links.length - 1);
            randomLab = links[randomIndex];
            // This is where the difficulty check will go in the future
            openLab(randomLab.href);
        });
    })
}

function openLab(labUrl){
    fetch(labUrl)
    .then((r)=>r.text())
    .then((data)=>{
        let x = new DOMParser().parseFromString(data, 'text/html');
        let labUrl = x.getElementsByClassName('icon-erlenmeyer')[0].parentElement.href;
        window.open(labUrl);
    })
}

function censorLabTitle(title){
    let academyLabHeader = document.getElementById('academyLabHeader')
    academyLabHeader.getElementsByTagName('h2')[0].innerText = title;
    document.title = title;
}