async function createShortenedLinkCard(shortenedUrl) {

    const urlValue = document.querySelector("input").value;

    const externalDiv = document.createElement("div");
    externalDiv.className = "external-div";
    const originLinkDiv = document.createElement("div");
    originLinkDiv.className = "originLinkDiv";
    originLinkDiv.style.display = "flex";
    originLinkDiv.style.alignContent = "center";
    originLinkDiv.style.alignItems = "center";
    originLinkDiv.style.textAlign = "center";
    const shortenedLink = document.createElement("div");
    shortenedLink.className = "shortenedLink";


    const originalLinkText = document.createElement("p");
    originalLinkText.className = "original-link";
    originalLinkText.style.marginBottom = 0;
    originalLinkText.innerText = urlValue;
    originLinkDiv.appendChild(originalLinkText);

    const shortenedUrlText = document.createElement("p");
    shortenedUrlText.className = "shortened-url";
    shortenedUrlText.style.color = "darkturquoise";
    shortenedUrlText.style.marginBottom = 0;
    shortenedUrlText.innerText = shortenedUrl;
    shortenedLink.appendChild(shortenedUrlText);

    const copyButton = document.createElement("button");
    copyButton.innerText = "Copy!";
    copyButton.className = "copyButton";
    copyButton.setAttribute("onClick", "javascript: copyShortenedLink();");


    externalDiv.append(originLinkDiv, shortenedLink, copyButton);

    document.getElementsByClassName("action-area")[0].appendChild(externalDiv);

    return document.contains(externalDiv) ? 1 : 2;

}


function removeHttp(url) {
    return url.replace(/^https?:\/\//, '');
}


function shortenLink(event) {

    event.preventDefault();

    const urlValue = document.querySelector("input").value;

    if (urlValue === '') {
        console.log("Tried to shorten empty url");
        return;
    }

    try {
        //https://api.shrtco.de/v2/shorten?url=javatpoint.com/how-to-call-javascript-function-in-html

        const trimmedUrl = removeHttp(urlValue);

        const returnedResponse = fetch(`https://api.shrtco.de/v2/shorten?url=${trimmedUrl}`,{
            mode: "cors",

        }).then((response) => response.json()).then((responseJSON) => {
            console.log(responseJSON);
            if (responseJSON.error_code === 2) {
                console.log("shrtCode declared it an invalid link");
            } else {
                return createShortenedLinkCard(responseJSON.result.full_short_link);
            }
        });


    } catch
        (exception) {
        console.log(exception);
    }


}

async function copyShortenedLink() {

    const shortenedLinkText = document.getElementsByClassName("shortened-url")[0].textContent;
    await navigator.clipboard.writeText(shortenedLinkText);

}







