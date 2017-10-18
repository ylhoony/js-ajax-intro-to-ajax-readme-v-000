function showRepositories(event, data) {
  // this is set to the XMLHttpRequest object that fired the event

  // console.log(this.responseText);
  // let repoList = "<ul>";
  // for (var i = 0; i < this.responseText.length; i++) {
  //   repoList += "<li>" + this.responseText[i]["name"] + "</li>";
  // }
  // repoList += "</ul>";
  // document.getElementById("repositories").innerHTML = repoList;
  console.log('event: ', event);
  console.log('data:', data);

  const repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos.map(r => '<li>'+ r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;

}

function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  console.log('show:', showRepositories);
  req.open("GET", 'https://api.github.com/users/ylhoony/repos')
  req.send()
}

function showCommits() {
  // console.log('showCommits this:', this);
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong></li>').join('')}</ul>`;
  document.getElementById("commits").innerHTML = commitsList;
}

function getCommits(el) {
  console.log(el.dataset.repo);
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener("load", showCommits);
  req.open("GET", 'https://api.github.com/repos/ylhoony/' + name + '/commits');
  req.send();
}
