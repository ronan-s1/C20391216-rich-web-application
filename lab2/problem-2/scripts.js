// List all of the post titles having more than six words
async function listPostTitlesWithMoreThanSixWords() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();

    const titlesWithMoreThanSixWords = posts
        .filter(post => post.title.split(" ").length > 6)
        .map(post => post.title);

    console.log(titlesWithMoreThanSixWords)

    const titlesList = document.getElementById("titlesList");
    titlesWithMoreThanSixWords.forEach(title => {
        const li = document.createElement("li");
        li.textContent = title;
        titlesList.appendChild(li);
    });
}

listPostTitlesWithMoreThanSixWords();

// Show a word frequency map for all of the body contents of the posts
async function showWordFrequencyMap() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();

    const bodyText = posts.map(post => post.body);
    const words = bodyText.join(" ").split(" ")

    const wordFrequencyMap = words.reduce((frequencyMap, word) => {
        frequencyMap[word] = (frequencyMap[word] || 0) + 1;
        return frequencyMap;
    }, {});

    console.log(wordFrequencyMap)

    const wordFrequencyResult = document.getElementById("wordFrequencyResult");
    wordFrequencyResult.textContent = JSON.stringify(wordFrequencyMap, null, 2);
}

showWordFrequencyMap();