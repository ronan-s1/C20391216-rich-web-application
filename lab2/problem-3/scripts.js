document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const searchButton = document.getElementById("search-button");
    const userContainer = document.getElementById("user-data");
    const userReposContainer = document.getElementById("user-repos")
    
    const apiUrl = "https://api.github.com/users";
  
    searchButton.addEventListener("click", () => {
      const username = searchInput.value;
      if (username) {
        fetch(`${apiUrl}/${username}`)
          .then((response) => response.json())
          .then((userData) => {
            displayUserInfo(userData);
            fetchRepos(userData.repos_url);
          })
          .catch((error) => console.error(error));
      }
    });

    function displayUserInfo(userData) {
        if (userData.message == "Not Found") {
            userReposContainer.innerHTML = "";
            userContainer.innerHTML = `
                <div class="alert alert-danger">
                    No user found.
                </div>
            `;
        } else {
            userContainer.innerHTML = `
                <img class="user-avatar" src="${userData.avatar_url}" alt="Avatar" width="340px">
                <table class="table table-striped table-borderless">
                    <tbody>
                        <tr>
                            <td><b>Name</b></td>
                            <td>${userData.name || "N/A"}</td>
                        </tr>
                        <tr>
                            <td><b>Username</b></td>
                            <td>${userData.login || "N/A"}</td>
                        </tr>
                        <tr>
                            <td><b>email</b></td>
                            <td>${userData.email || "N/A"}</td>
                        </tr>
                        <tr>
                            <td><b>Location</b></td>
                            <td>${userData.location || "N/A"}</td>
                        </tr>
                        <tr>
                            <td><b>Number of Gists</b></td>
                            <td>${userData.public_gists || 0}</td>
                        </tr>
                    </tbody>
                </table>
            `;
        }
    }
    

    function fetchRepos(reposUrl) {
        fetch(reposUrl)
          .then((response) => response.json())
          .then((reposData) => {
            displayRepos(reposData);
          })
          .catch((error) => console.error(error));
    }
    
    function displayRepos(reposData) {
        const repoList = document.createElement("div");
        repoList.id = "reposList";
        userReposContainer.innerHTML = "";
        
        if (reposData.length > 0) {
            if (reposData.length > 5) {
                repoList.classList.add("scrollable-repo-list"); // Apply CSS for scrolling
            }

            reposData.forEach((repo) => {
                const repoCard = document.createElement("div");
                repoCard.className = "card mb-3";
                repoCard.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${repo.name}</h5>
                        <p class="card-text">${repo.description || "No description available."}</p>
                        <a href="${repo.html_url}" target="_blank" class="btn">View on GitHub</a>
                    </div>
                `;
                repoList.appendChild(repoCard);
            });

            userReposContainer.appendChild(repoList);
        } else {
            userReposContainer.innerHTML = "<div class='alert alert-danger'>No repositories found.</div>";
        }
    }
});