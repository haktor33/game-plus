import React, { useState } from "react";
import "./App.css";
import logo from "./img/logo.png";
import logo2x from "./img/logo@2x.png";
import logo3x from "./img/logo@3x.png";

import shape from "./img/combined-shape.png";
import shape2x from "./img/combined-shape@2x.png";
import shape3x from "./img/combined-shape@3x.png";

import hero from "./img/gfn-motif-background-hero-2560-x-300-d-2-x.png";
import hero2x from "./img/gfn-motif-background-hero-2560-x-300-d-2-x@2x.png";
import hero3x from "./img/gfn-motif-background-hero-2560-x-300-d-2-x@3x.png";

import polygon from "./img/polygon.png";

let gameList = [
    { title: "Lorem ipsum dolor sit", genre: "Shooters", state: "Available", visible: true },
    { title: "Adipiscing consectetur dolor", genre: "Action", state: "Patching", visible: true },
    { title: "Adipiscing 2", genre: "Action", state: "Patching", visible: true },
    { title: "Adipiscing 3", genre: "Action", state: "Patching", visible: true },
    { title: "Adipiscing 4", genre: "Action", state: "Patching", visible: true },
    { title: "B Game 1", genre: "Action", state: "Patching", visible: true },
    { title: "B Game 2", genre: "Action", state: "Patching", visible: true },
    { title: "B Game 3", genre: "Action", state: "Patching", visible: true },
    { title: "Game 2", genre: "Action", state: "Maintenance", visible: true },
    { title: "Game 3", genre: "Action", state: "Available", visible: true },
    { title: "Game 4", genre: "Action", state: "Available", visible: true },
    { title: "Game 5", genre: "Action", state: "Available", visible: true },
    { title: "Game 6", genre: "Sports", state: "Available", visible: true },
    { title: "Game 7", genre: "Sports", state: "Available", visible: true },
    { title: "Game 8", genre: "Action", state: "Available", visible: true },
    { title: "Game 9", genre: "Action", state: "Available", visible: true },
    { title: "Haktor Game 1", genre: "Simulation", state: "Available", visible: true },
    { title: "Haktor Game 2", genre: "Simulation", state: "Available", visible: true },
];


const SearchBar = (props) => {
    const onSearch = (e) => {
        //console.log(e.target.value);
        props.setState(old => ({ ...old, searchKey: e.target.value }));
    }
    return (
        <div className="SearchBar Rectangle">
            <img src={shape} srcset={`${shape2x} 2x, ${shape3x} 3x`} className="Combined-Shape" />
            <input className="Search-Games" placeholder=" Search Games" onChange={onSearch} />
        </div>
    );
}

const sortType = { AZ: "A-Z", ZA: "Z-A" };

const SortDropdown = (props) => {

    const onChange = (e) => {
        //console.log(e.target.value);
        props.setState(old => ({ ...old, sortDirection: e.target.value }));
    }
    return (
        <select className="SortDropDown Rectangle" onChange={onChange}>
            <option className="Title-A-Z" value={sortType.AZ}>Title {sortType.AZ}</option>
            <option className="Title-A-Z" value={sortType.ZA}>Title {sortType.ZA}</option>
        </select>
    );
}

const Filter = (props) => {

    const onStateFilterChange = (e) => {
        const { checked, value } = e.target;
        let { stateFilter } = props.state;
        if (checked) {
            stateFilter.push(value);
        } else {
            stateFilter = stateFilter.filter(f => f !== value);
        }
        props.setState(old => ({ ...old, stateFilter }))
    }

    const onGenreFilterChange = (e) => {
        const { checked, value } = e.target;
        let { genreFilter } = props.state;
        if (checked) {
            genreFilter.push(value);
        } else {
            genreFilter = genreFilter.filter(f => f !== value);
        }
        props.setState(old => ({ ...old, genreFilter }))
    }

    const stateItems = ["Available", "Patching", "Maintenance"];
    const GenreItems = ["Shooters", "Action", "RPG", "Racing", "MOBA/MMO", "Simulation", "Strategy", "Sports", "Kids/Family", "Casual", "Demo", "Horror", "Platformer", "Battle Royale", "Adventure", "Open World",];

    return (
        <div class="filter bg-color">
            <span className="State">
                State
            </span>
            <div className="checkbox-text">
                {
                    stateItems.map(m =>
                        <div>
                            <input type="checkbox" value={m} defaultChecked={false} onChange={onStateFilterChange} />{m}
                        </div>)
                }
            </div>

            <span className="Genre-Filters">
                Genre Filters
            </span>
            <div className="checkbox-text">
                {
                    GenreItems.map(m =>
                        <div>
                            <input type="checkbox" value={m} defaultChecked={false} onChange={onGenreFilterChange} />{m}
                        </div>)
                }
            </div>

        </div>
    );
}


const CardList = (props) => {
    const { sortDirection, searchKey, stateFilter, genreFilter } = props.state;

    const category = [];

    //applyFilter
    gameList.forEach(f => !genreFilter.includes(f.genre) && genreFilter.length > 0 ? f.visible = false : f.visible = true);
    gameList.filter(f => f.visible).forEach(f => !stateFilter.includes(f.state) && stateFilter.length > 0 ? f.visible = false : f.visible = true);
    if (searchKey) {
        gameList.filter(f => f.visible).forEach(f => f.title.toLowerCase().indexOf(searchKey.toLowerCase()) === -1 ? f.visible = false : f.visible = true);
    }

    gameList.filter(f => f.visible).forEach(f => {
        const firstChar = f.title[0];
        if (!category.find(f => f === firstChar)) {
            category.push(firstChar);
        }
    });

    let sortedCategory;
    if (sortDirection === sortType.AZ) {
        sortedCategory = category.sort((a, b) => a.localeCompare(b));
        gameList = gameList.sort((a, b) => a.title.localeCompare(b.title));
    } else {
        sortedCategory = category.sort((a, b) => b.localeCompare(a));
        gameList = gameList.sort((a, b) => b.title.localeCompare(a.title));
    }
    return (
        <div className="card-list">
            {
                sortedCategory.map(m => <Card category={m} list={gameList.filter(f => f.visible && f.title.startsWith(m))} />)
            }
        </div>
    );
}

const Card = (props) => {

    return (
        <div className="card-bg-color">
            <div className="category-name" style={{ backgroundImage: `url(${polygon})` }}>
                <span className="category-name-label">{props.category}</span>
            </div>
            {props.list.map(m =>
                <span class="card-item Text-Style-2">
                    {m.title}
                </span>)}
        </div>
    );
}

const App = () => {
    const [state, setState] = useState({ sortDirection: sortType.AZ, searchKey: null, stateFilter: [], genreFilter: [] });

    return (<>
        <header className="bg-header">
            <img src={logo} srcset={`${logo2x} 2x, ${logo3x} 3x`} className="logo" />
            <span className="header-button">
                <span className="Games">
                    Games
                </span>
                <span className="Membership">
                    Membership
                </span>
                <span className="Download">
                    Download
                </span>
                <span className="Blog">
                    Blog
                </span>
                <span className="Support">
                    Support
                </span>
                <button type="primary" className="REGISTER Text-Style">
                    LET'S PLAY
                </button>
            </span>
        </header>
        <div className="gfn-motif-background-hero-2560x300-d2x" style={{ backgroundImage: `url(${hero})` }}>
            <div className="Lorem-ipsum-dolor-si">
                Lorem ipsum dolor sit amet consectetur
            </div>
            <div className="With-the-Cloud-Gamin">
                With the Cloud Gaming, you can join, play, and share games online with anyone in the world. Play any game on any device!
            </div>
            <SearchBar setState={setState} />
        </div>

        <div className="bg-color">
            <span className="Browse-Games">
                Browse Games
            </span>
            <SortDropdown setState={setState} />
            <div className="flexbox-container">
                <Filter state={state} setState={setState} />
                <CardList state={state} />
            </div>
        </div>
        {/*Footer*/}
        <div className="bg-color-white">
            <span className="Games-Membership-Dow">
                Games
                Membership
                Download
            </span>
            <span className="Contact-Us-Blog">
                Contact Us
                Blog
            </span>
            <span className="FAQs-Service-Status">
                FAQs
                Service Status
            </span>

            <span className="Follow-Us">
                Follow Us!
            </span>

            <span className="Site-Language">
                Site Language
            </span>

            <span className="Games-Membership-Dow">
            </span>
        </div>
        <div className="Footer Rectangle">
            <span className="Terms-of-Use">
                Terms of Use
            </span>
            <span className="Privacy-Policy">
                Privacy Policy
            </span>
            <span className="Cookies">
                Cookies
            </span>
            <span className="Tm-haklar-sakldr">
                Tüm hakları saklıdır.
            </span>
        </div>
    </>);
}

export default App;
