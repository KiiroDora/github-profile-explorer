import { Octokit } from "octokit";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import image from "./linksymbol.svg";
import SkeletonCard from "./SkeletonCard";
import SkeletonRepo from "./SkeletonRepo";

//setting up github api with token
const octokit = new Octokit({ 
    auth: process.env.REACT_APP_API_KEY
  });

//getting user data from api
async function fetchUser(input) { 
    let response = await octokit.request('GET /users/{username}', {
        username: input,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
            }
    });

        return {
            name: response.data.name,
            login: response.data.login,
            public_repos: response.data.public_repos,
            followers: response.data.followers,
            following: response.data.following,
            html_url: response.data.html_url,
            avatar_url: response.data.avatar_url
        };
}  
    
//getting all repository data from api   
async function fetchRepos(input) { 
    let response = await octokit.request('GET /users/{username}/repos', {
        username: input,
        sort: 'updated',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    
        return response.data;
}  



const UserInfo = () => {

    const input = useLocation().pathname.slice(7).replace(" ", "");

    const [user, setUser] = useState(); //state variables for user data
    const [repos, setRepos] = useState(); //state variables for repository data

    const [error, setError] = useState(); //state variables for error message

    const getUser = fetchUser(input) //receive data from the async function and set the state variables for user
        .then((data) => setUser(data))
        .catch(() => {if (!error) {setError("Couldn't load the user profile.")}});

    const getRepos = fetchRepos(input) //receive data from the async function and set the state variables, mapping to an array of repos
        .then((data) => setRepos(data.map((value) => {
            return ({
                name: value.name,
                html_url: value.html_url,
                description: value.description,
                stargazers_count: value.stargazers_count,
            });
        })))
        .catch(() => {if (!error) {setError("Couldn't load the user profile.")}});

    return (
        <div className="CardWrapper">
            { user && (<div className="UserCard"> 

                <div className="Header">
                    <p className="Username">{user.name}</p>
                    <p className="Tag">@{user.login}</p>
                </div>
            
                <div className="NumberData">
                    <p>{user.public_repos}<br/>Repositories</p>
                    <p>{user.following}<br/>Following</p>
                    <p>{user.followers}<br/>Followers</p>
                </div>

                <div className="LinkGroup">
                    <Link className= "Link" to={user.html_url} target="_blank">View on Github</Link>
                    <img className= "LinkSymbol" src={image}/>
                </div>
            </div>
            )}
            
            {user && (<img className="Avatar" src={user.avatar_url} />) }
            {!user && (<SkeletonCard/>)}

            {repos && (<div className="Repos">
                <h3 className="RepoTitle">Repositories</h3>
                {repos.map(data => ( 
                <Link className="RepoBlock" to={data.html_url} target="_blank">
                    <p className="RepoListTitle">{data.name}</p>
                    <p className="Alt" style= {{width: "70%"}}>{data.description}</p>
                    <div className="Stars">
                    <p>{data.stargazers_count}</p>
                    <p className="Alt">Stars</p></div> 
                </Link>))}
            </div>)}
            {!repos && (<div className="Repos">
                {[...Array(3).keys()].map( () => (<SkeletonRepo/>))}
            </div>
            )}

            {error && <div className="ErrorMessage">
                <div className="ErrorMessageText">
                    <p>
                        {error}
                        <br/>
                        <p>Please try again.</p>
                    </p>
                </div>
            </div>}

        </div> 
    );
};

export default UserInfo;