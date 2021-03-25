import React from "react";
import loading from "../assets/loading.svg";

const Loading = () => (
    <div className='spinner d-flex justify-content-center'>
        <img
            src={loading}
            alt='Loading'
        />
    </div>
);

export default Loading;