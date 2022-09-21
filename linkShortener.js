async function createShortenedLinkCard(shortenedUrl) {

    const urlValue = document.querySelector("input").value;

    const externalDiv = document.createElement("div");
    externalDiv.className = "external-div";
    const originLinkDiv = document.createElement("div");
    originLinkDiv.className = "originLinkDiv";
    const shortenedLink = document.createElement("div");
    shortenedLink.className = "shortenedLink";


    const originalLinkText = document.createElement("p");
    originalLinkText.innerText = urlValue;
    originLinkDiv.appendChild(originalLinkText);

    const shortenedUrlText = document.createElement("p");
    shortenedUrlText.innerText = shortenedUrl;
    shortenedLink.appendChild(shortenedUrlText);

    const copyButton = document.createElement("button");
    copyButton.innerText = "Copy!";
    copyButton.className = "copyButton";
    copyButton.setAttribute("onClick", "javascript: copyShortenedLink();");


    externalDiv.append(originLinkDiv, shortenedUrl, copyButton);

    document.getElementsByClassName("link-shortener-text-area")[0].appendChild(externalDiv);

    return document.contains(externalDiv) ? 1 : 2;

}

function shortenLink(event) {

    event.preventDefault();

    const urlValue = document.querySelector("input").value;
    let ok;

    try {
        //https://api.shrtco.de/v2/shorten?url=javatpoint.com/how-to-call-javascript-function-in-html

        const returnedResponse = fetch(`https://api.shrtco.de/v2/shorten?url=stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript`).then((response) => response.json()).then((responseJSON) => {
            console.log(responseJSON);
            console.log(responseJSON.result);
            return createShortenedLinkCard(responseJSON.result.full_short_link);
        });


    } catch
        (exception) {
        console.log(exception);
    }


}

async function copyShortenedLink() {

    const shortenedLinkText = document.getElementsByClassName("shortened-link")[0].querySelector("p").innerText;
    await navigator.clipboard.writeText(shortenedLinkText);

}







