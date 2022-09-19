function shortenLink() {

    const urlValue = document.querySelector("input").value;
    let ok;

    try {
        //https://api.shrtco.de/v2/shorten?url=javatpoint.com/how-to-call-javascript-function-in-html

        const returnedResponse = fetch("https://api.shrtco.de/v2/shorten?url=javatpoint.com/how-to-call-javascript-function-in-html").then((response) => response.json()).then((responseJSON) => {
            console.log(responseJSON);
            console.log(responseJSON.result);
        });
        console.log(returnedResponse);

    } catch
        (exception) {
        console.log(exception);
    }


}
