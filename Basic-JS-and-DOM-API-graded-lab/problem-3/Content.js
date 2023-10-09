//array of images
let catsImages = [
    "https://static.wikia.nocookie.net/e5f1cb7b-5790-440e-ac27-87e7ae3a83cc",
    "https://i.imgflip.com/5mziza.jpg?a471144",
    "https://tr.rbxcdn.com/d5a7a6b9ac9fe4b94c6d8a82476d6a1f/420/420/Hat/Png",
    "https://pfps.gg/assets/pfps/6853-angwy.png",
    "https://i.pinimg.com/564x/e8/d5/d5/e8d5d5a6cae8d675009520d10b56a9e8.jpg",
    "https://i.pinimg.com/474x/60/00/31/6000316cec202ba3d08374df3bd8d37e.jpg",
    "https://pfps.gg/assets/pfps/5609-cat-stare.png",
    "https://i.pinimg.com/1200x/da/c5/72/dac572d83bd6c98e1e5ec09e6b9b8719.jpg",
    "https://wallpapers.com/images/hd/zoomed-in-cute-cat-pfp-9vac913p144ym30z.jpg",
    "https://i.imgflip.com/7p9ysv.png?a471120",
    "https://i.ytimg.com/vi/NfUrT7t7NfI/maxresdefault.jpg",
    "https://tr.rbxcdn.com/6dfea7307dbe4bebfc402de5b0809f37/420/420/Hat/Png",
    "https://i.redd.it/fw1fph44m8hb1.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSielu1L_I04G_51Ds1rLySZRtRbh8wHQ04A&usqp=CAU",
    "https://e3.365dm.com/21/03/768x432/skynews-cats-missing-microchip_5315182.jpg?20210323142004",
];

//reverse through array of images
//getting random image from the array we created before (we use math.floor and math.random to grab a random index in the array)
// Function to change images
function changeImages() {
    const imgs = document.getElementsByTagName("img");
    for(let i = 0; i < imgs.length; i++) {
        const randomImg = Math.floor(Math.random() * catsImages.length);
        imgs[i].src = catsImages[randomImg];
    }
}
changeImages();

// call the func every second
setInterval(changeImages, 1000);

//do the same for h1 elements
const headers = document.getElementsByTagName("h1");
for (let i = 0; i < headers.length; i++){
    headers[i].innerText = "meow";
}

//do the same for p elements
const p = document.getElementsByTagName("p");
for (let i = 0; i < p.length; i++){
    p[i].innerText = "This website is now about cats.";
}

// trippy background colour
function getRandomColour() {
    const letters = "0123456789ABCDEF";
    let colour = "#";
    // generate random colour by picking 6 random hexadecimal characters
    for (let i = 0; i < 6; i++) {
        colour += letters[Math.floor(Math.random() * 16)];
    }
    return colour;
}

document.body.style.transition = "background-color 0.3s";
setInterval(() => {
    document.body.style.backgroundColor = getRandomColour();
}, 1000);


// get a random cat fact and alert it every 7 seconds approx
let canFetchFact = true;
async function fetchCatFact() {
    try {
        if (canFetchFact) {
            const response = await fetch("https://catfact.ninja/fact");
            const data = await response.json();

            if (data.fact) {
                await new Promise((resolve) => setTimeout(resolve, 0));
                alert("😱 CAT FACT TIME 😱\n\n" + data.fact);

                // Disable fetching for the next 5 seconds
                canFetchFact = false;
                setTimeout(() => {
                    canFetchFact = true;
                }, 6000);
            } else {
                console.error("No fact field in response :(");
            }
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

setInterval(fetchCatFact, 1000);
