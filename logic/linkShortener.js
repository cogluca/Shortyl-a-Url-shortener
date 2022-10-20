
async function copyShortenedLink() {

    const shortenedLinkText = document.getElementsByClassName("shortened-url")[0].textContent;
    await navigator.clipboard.writeText(shortenedLinkText);

}

function createShortenedLinkCard(shortenedUrl) {

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
    copyButton.onclick = copyShortenedLink;


    externalDiv.append(originLinkDiv, shortenedLink, copyButton);

    document.getElementsByClassName("action-area")[0].appendChild(externalDiv);

    return document.contains(externalDiv);

}


function removeHttpScheme(url) {
    return url.replace(/^https?:\/\//, '');
}


function shortenLink(event) {

    event.preventDefault();

    const urlValue = document.querySelector("input").value;

    if (urlValue === '' || urlValue === 'Shorten a link here') {
        console.log("Tried to shorten empty url");
        const inputField = document.querySelector("input");
        inputField.style.border = "1px solid red";
        inputField.value = "You forgot to add a link !";
        return;
    }

    try {

        const trimmedUrl = removeHttpScheme(urlValue);

        const returnedResponse = fetch(`https://api.shrtco.de/v2/shorten?url=${trimmedUrl}`, {
            mode: "cors",
            method: "GET",
            redirect: "follow",

        }).then((response) => response.json()).then((responseJSON) => {

            console.log(responseJSON);

            if (responseJSON.hasOwnProperty("error_code")) {

                switch (responseJSON.error_code) {

                    case 1:
                        console.log("No URL specified (\"url\" parameter is empty)");
                        return;

                    case 2:
                        console.log("Invalid URL submitted");
                        return;

                    case 3:
                        console.log("Rate limit reached. Wait a second and try again");
                        return;

                    case 4:
                        console.log("IP-Address has been blocked because of violating our terms of service");
                        return;

                    case 5:
                        console.log("shrtcode code (slug) already taken/in use");
                        return;

                    case 6:
                        console.log("Unknown error");
                        return;

                    case 7:
                        console.log("No code specified (\"code\" parameter is empty)");
                        return;

                    case 8:
                        console.log("Invalid code submitted (code not found/there is no such short-link)");
                        return;

                    case 9:
                        console.log("Missing required parameters");
                        return;

                    case 10:
                        console.log("Trying to shorten a disallowed Link");
                        return;

                }
            }

            if(responseJSON.result.hasOwnProperty("full_short_link")){
                return createShortenedLinkCard(responseJSON.result.full_short_link);
            }
            else{
                console.log("Unexpected error with Json response format");
            }

        });


    } catch
        (exception) {
        console.log(exception);
    }


}









