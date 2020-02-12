const URL = "https://api.github.com/users";
let users = [];
const searchUser = document.querySelector('#search');
const body = document.querySelector("#listUsers");

// Fetch users
const fetchUsers = () => {
    fetch(URL)
        .then(
            res => {
                res.json()
                    .then(data => {
                        users = data;
                        showUsers(data)
                    }
                    )
            })
        .catch(err =>
            console.log(err));
}

// show users
const showUsers = (users) => {
    let result = '';
    users.forEach(({ login, avatar_url }) => {
        result += `
            <li class="list-group-item ">
                <img src="${avatar_url}" alt=""> <span class="capitalize">${login}</span>
            </li>
        `
    });
    body.innerHTML = result;
}

//filter user
searchUser.addEventListener('input', e => {
    const ele = e.target.value.toLowerCase();
    const newUser = users
        .filter(user => user.login
            .toLowerCase()
            .includes(ele)
        )
    showUsers(newUser);
})

// show the users list on load
document.addEventListener("DOMContentLoaded", fetchUsers);