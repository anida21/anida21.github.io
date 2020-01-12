function login(korisnik, sifra) {
    const getJSONrequest = new XMLHttpRequest();
    getJSONrequest.onreadystatechange = () => {
        if (getJSONrequest.readyState === 4 && getJSONrequest.status === 200) {
            const sel = JSON.parse(getJSONrequest.responseText);
            var poruka = 'Odbijeno';
            sel.forEach(point => {
            	if(point.username === korisnik && point.password === sifra){
                    window.location.href="komentari/kom.html";
                } 
            });
        }
    };
    getJSONrequest.open('GET', 'login.json', true);
    getJSONrequest.send();
}
