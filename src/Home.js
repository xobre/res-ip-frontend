import React, {useState} from 'react';

function Home() {
    const [query, setQuery] = useState("");

    return(
        <div>
            <h1>Res I.P.</h1>
            <h2>pronounced /ˈresəˌpē/</h2>
            <form>
                <label>
                    <input onChange={(e) => setQuery(e.target.value)} type="text" name="name" placeholder="i.e. Noodles" />
                </label>
                <button>search</button>
            </form>
        </div>
    );
}

export default Home;