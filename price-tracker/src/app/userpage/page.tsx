import React from "react";

const Userpage = () => {
    return (
        <>
            <div className="container mx-auto px-4">
                <h1>Welcome to the User's profile!</h1>
                <p>
                    Here you can change relevant settings such as:<br></br>
                    - Name<br></br>
                    - Display Picture<br></br>
                    - Email Adress<br></br>
                    - Password<br></br>
                    - etc <br></br>
                    <br></br><br></br><br></br>
                    ...
                </p>
                <div className="w-full h-screen bg-yellow-400"></div>
                <p>
                    End of page, to be replaced with a footer.
                </p>
            </div>
        </>
    );
};

export default Userpage;